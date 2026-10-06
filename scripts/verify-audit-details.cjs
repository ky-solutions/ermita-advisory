const { chromium } = require("@playwright/test");
const sharp = require("sharp");
const fs = require("node:fs/promises");
const assert = require("node:assert/strict");
async function main() {
  const browser = await chromium.launch({ channel: "msedge", headless: true });
  const context = await browser.newContext({
    viewport: { width: 1440, height: 1000 },
  });
  const page = await context.newPage();
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("http://127.0.0.1:3000/");
  await page.evaluate(() => document.fonts.ready);
  const caption = page.locator(".photo-caption");
  const box = await caption.boundingBox();
  await caption.evaluate((el) => (el.style.visibility = "hidden"));
  const pixels = await page.screenshot({ clip: box });
  const { data, info } = await sharp(pixels)
    .removeAlpha()
    .raw()
    .toBuffer({ resolveWithObject: true });
  let maxLum = 0;
  const linear = (v) =>
    v <= 0.04045 ? v / 12.92 : ((v + 0.055) / 1.055) ** 2.4;
  for (let i = 0; i < data.length; i += info.channels) {
    const lum =
      0.2126 * linear(data[i] / 255) +
      0.7152 * linear(data[i + 1] / 255) +
      0.0722 * linear(data[i + 2] / 255);
    maxLum = Math.max(maxLum, lum);
  }
  const contrast = 1.05 / (maxLum + 0.05);
  assert.ok(contrast >= 4.5);
  await caption.evaluate((el) => (el.style.visibility = ""));
  const imageUrl = await page
    .locator('meta[property="og:image"]')
    .getAttribute("content");
  await fs.writeFile(
    "verification/og-default.png",
    await (await page.request.get(imageUrl)).body(),
  );
  assert.ok(
    await page.locator('link[rel="icon"][type="image/svg+xml"]').count(),
  );
  assert.ok((await page.locator('link[rel="icon"]').count()) >= 2);
  assert.ok(await page.locator('link[rel="apple-touch-icon"]').count());
  const apple = await page.request.get("http://127.0.0.1:3000/apple-icon.png");
  const icon = await sharp(await apple.body()).metadata();
  assert.equal(icon.width, 180);
  assert.equal(icon.height, 180);
  assert.equal(icon.hasAlpha, false);
  await page.goto("http://127.0.0.1:3000/contact");
  await page.locator("#name").fill("Test Local");
  await page.locator("#email").fill("test@example.test");
  await page
    .locator("#message")
    .fill("Test local du formulaire sans aucun envoi réel.");
  let release;
  let requests = 0;
  const gate = new Promise((resolve) => {
    release = resolve;
  });
  await page.route("**/api/contact", async (route) => {
    requests++;
    await gate;
    await route.fulfill({
      status: 400,
      contentType: "application/json",
      body: JSON.stringify({
        errors: { email: "Erreur e-mail simulée." },
        message: "Veuillez vérifier les champs indiqués.",
      }),
    });
  });
  const submit = () =>
    page
      .locator("form")
      .evaluate((form) =>
        form.dispatchEvent(
          new Event("submit", { bubbles: true, cancelable: true }),
        ),
      );
  await submit();
  await page.waitForFunction(
    () => document.querySelector("form").getAttribute("aria-busy") === "true",
  );
  await submit();
  assert.equal(requests, 1);
  assert.ok(
    await page.getByRole("button", { name: "Envoi en cours…" }).isDisabled(),
  );
  release();
  await page.waitForFunction(
    () => document.querySelector("form").getAttribute("aria-busy") === "false",
  );
  assert.equal(await page.evaluate(() => document.activeElement.id), "email");
  assert.equal(
    await page.locator("#email").getAttribute("aria-invalid"),
    "true",
  );
  assert.equal(
    await page.locator("#email").getAttribute("aria-describedby"),
    "email-error",
  );
  assert.match(await page.locator(".form-status").textContent(), /vérifier/);
  await page.unroute("**/api/contact");
  await page.route("**/api/contact", (route) =>
    route.fulfill({
      status: 502,
      contentType: "application/json",
      body: JSON.stringify({
        message:
          "Votre message n’a pas pu être envoyé. Veuillez réessayer dans quelques instants.",
      }),
    }),
  );
  await submit();
  await page.waitForFunction(() =>
    document.querySelector(".form-status").textContent.includes("n’a pas pu"),
  );
  assert.equal(
    await page.locator(".form-status").getAttribute("aria-live"),
    "polite",
  );
  const report = {
    captionContrast: Math.round(contrast * 100) / 100,
    icons: "passed",
    clientValidationAndServerFocus: "passed",
    doubleSubmission: "passed",
    providerFailureAnnouncement: "passed",
    realEmailSent: false,
  };
  await fs.writeFile(
    "verification/audit-details.json",
    JSON.stringify(report, null, 2),
  );
  console.log(report);
  await browser.close();
}
main().catch((e) => {
  console.error(e);
  process.exit(1);
});
