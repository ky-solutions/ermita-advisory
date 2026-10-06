const ts = require("typescript");
const fs = require("fs");
const Module = require("module");
const assert = require("node:assert/strict");
let contact;
function compile(path) {
  const output = ts.transpileModule(fs.readFileSync(path, "utf8"), {
    compilerOptions: {
      module: ts.ModuleKind.CommonJS,
      target: ts.ScriptTarget.ES2022,
    },
  }).outputText;
  const mod = new Module(path, module);
  mod.paths = module.paths;
  mod.require = (id) => (id === "@/lib/contact" ? contact : require(id));
  mod._compile(output, path);
  return mod.exports;
}
contact = compile("lib/contact.ts");
const { POST } = compile("app/api/contact/route.ts");
const good = {
  name: "Test Local",
  email: "test@example.test",
  company: "",
  phone: "",
  expertise: "Ingénierie financière",
  message: "Demande de test strictement locale.",
  website: "",
};
const request = (data) =>
  new Request("http://localhost:3000/api/contact", {
    method: "POST",
    headers: {
      origin: "http://localhost:3000",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
(async () => {
  assert.ok(contact.validateContact({}).errors.name);
  assert.ok(contact.validateContact({ ...good, message: "a" }).errors.message);
  assert.ok(
    contact.validateContact({ ...good, email: "invalid" }).errors.email,
  );
  assert.ok(
    contact.validateContact({ ...good, message: "a".repeat(5001) }).errors
      .message,
  );
  for (const k of [
    "RESEND_API_KEY",
    "CONTACT_FROM",
    "CONTACT_TO",
    "UPSTASH_REDIS_REST_URL",
    "UPSTASH_REDIS_REST_TOKEN",
    "RATE_LIMIT_SALT",
  ])
    delete process.env[k];
  assert.equal((await POST(request(good))).status, 503);
  assert.equal((await POST(request({}))).status, 400);
  assert.equal((await POST(request({ ...good, website: "spam" }))).status, 204);
  assert.equal(
    (
      await POST(
        new Request("http://localhost:3000/api/contact", {
          method: "POST",
          headers: { origin: "https://other.test" },
          body: "{}",
        }),
      )
    ).status,
    403,
  );
  Object.assign(process.env, {
    RESEND_API_KEY: "local-test",
    CONTACT_FROM: "sender@example.test",
    CONTACT_TO: "recipient@example.test",
    UPSTASH_REDIS_REST_URL: "https://redis.example.test",
    UPSTASH_REDIS_REST_TOKEN: "local-test",
    RATE_LIMIT_SALT: "local-test-salt",
  });
  let mode = "success";
  let sends = 0;
  const original = global.fetch;
  global.fetch = async (url, options) => {
    if (String(url).includes("redis"))
      return Response.json({ result: mode === "limited" ? 6 : 1 });
    sends++;
    const body = JSON.parse(options.body);
    assert.equal(body.from, "sender@example.test");
    assert.equal(body.reply_to, good.email);
    return mode === "failure"
      ? Response.json({ error: "rejected" }, { status: 500 })
      : Response.json({ id: "mock-confirmed-id" });
  };
  assert.equal((await POST(request(good))).status, 200);
  mode = "failure";
  assert.equal((await POST(request(good))).status, 502);
  mode = "limited";
  assert.equal((await POST(request(good))).status, 429);
  assert.equal(sends, 2);
  global.fetch = original;
  fs.writeFileSync(
    "verification/contact-results.json",
    JSON.stringify(
      {
        validation: "passed",
        missingConfig: 503,
        honeypot: 204,
        foreignOrigin: 403,
        providerAcceptanceMock: 200,
        providerFailureMock: 502,
        rateLimitMock: 429,
        realEmailSent: false,
      },
      null,
      2,
    ),
  );
  console.log("Contact checks passed. Providers mocked; no real email sent.");
})().catch((e) => {
  console.error(e);
  process.exit(1);
});
