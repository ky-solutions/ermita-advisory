const { chromium } = require("@playwright/test");
const AxeBuilder = require("@axe-core/playwright").default;
const fs = require("node:fs/promises");
const assert = require("node:assert/strict");
const sharp = require("sharp");
const routes = [
  "/",
  "/le-cabinet",
  "/contact",
  "/expertises/ingenierie-financiere",
  "/expertises/pilotage-et-performance",
  "/expertises/strategie-et-management",
  "/expertises/accompagnement-de-projets",
  "/mentions-legales",
  "/confidentialite",
];
const origin = "http://127.0.0.1:3000";
const indexable = process.env.AUDIT_INDEXABLE !== "false";
const siteOrigin = process.env.AUDIT_SITE_URL || origin;
async function main() {
  const browser = await chromium.launch({ channel: "msedge", headless: true });
  const context = await browser.newContext();
  const page = await context.newPage();
  await page.emulateMedia({ reducedMotion: "reduce" });
  const violations = [],
    consoleErrors = [],
    summaries = [];
  page.on("pageerror", (e) => consoleErrors.push(e.message));
  page.on("console", (m) => {
    if (
      m.type() === "error" &&
      /Content Security Policy|Refused to|violat/i.test(m.text())
    )
      consoleErrors.push(m.text());
  });
  for (const path of routes) {
    await page.setViewportSize({ width: 390, height: 844 });
    const response = await page.goto(origin + path);
    assert.equal(response.status(), 200);
    await page.evaluate(() => document.fonts.ready);
    const title = await page.title();
    assert.equal(
      await page.locator('meta[property="og:title"]').getAttribute("content"),
      title,
    );
    assert.equal(await page.locator('link[rel="canonical"]').count(), 1);
    assert.equal(
      await page.locator('link[rel="canonical"]').getAttribute("href"),
      path === "/" ? siteOrigin : siteOrigin + path,
    );
    for (const name of [
      "og:description",
      "og:url",
      "og:locale",
      "og:site_name",
      "og:type",
      "og:image",
    ])
      assert.ok(
        await page.locator(`meta[property="${name}"]`).getAttribute("content"),
      );
    assert.equal(
      await page.locator('meta[name="twitter:card"]').getAttribute("content"),
      "summary_large_image",
    );
    const imageUrl = await page
      .locator('meta[property="og:image"]')
      .getAttribute("content");
    assert.ok(new URL(imageUrl).origin === siteOrigin);
    const image = await page.request.get(
      origin + new URL(imageUrl).pathname + new URL(imageUrl).search,
    );
    assert.equal(image.status(), 200);
    const dimensions = await sharp(await image.body()).metadata();
    assert.equal(dimensions.width, 1200);
    assert.equal(dimensions.height, 630);
    const robots = await page
      .locator('meta[name="robots"]')
      .getAttribute("content");
    assert.equal(robots.includes("noindex"), !indexable);
    const headers = response.headers();
    for (const h of [
      "x-content-type-options",
      "referrer-policy",
      "permissions-policy",
      "x-frame-options",
    ])
      assert.ok(headers[h]);
    assert.ok(!headers["x-powered-by"]);
    assert.ok(
      headers["content-security-policy"] ||
        headers["content-security-policy-report-only"],
    );
    assert.ok(!headers["strict-transport-security"]);
    const sections = await page.locator("section").evaluateAll((nodes) =>
      nodes
        .filter((el) => el.querySelector("h1,h2"))
        .map((el) => ({
          label: el.getAttribute("aria-labelledby"),
          exists: Boolean(
            document.getElementById(el.getAttribute("aria-labelledby")),
          ),
        })),
    );
    assert.ok(sections.every((s) => s.label && s.exists));
    const axe = await new AxeBuilder({ page }).analyze();
    violations.push(
      ...axe.violations.map((v) => ({
        route: path,
        id: v.id,
        impact: v.impact,
        nodes: v.nodes.map((n) => ({
          target: n.target,
          summary: n.failureSummary,
        })),
      })),
    );
    for (const width of [360, 390, 768, 1440]) {
      await page.setViewportSize({ width, height: width === 360 ? 800 : 844 });
      assert.ok(
        await page.evaluate(
          () => document.documentElement.scrollWidth <= innerWidth,
        ),
        `${path}: overflow ${width}`,
      );
    }
    const json = await page
      .locator('script[type="application/ld+json"]')
      .allTextContents();
    const data = json.map(JSON.parse);
    assert.ok(data.some((x) => x["@type"] === "ProfessionalService"));
    if (path.startsWith("/expertises/")) {
      assert.ok(data.some((x) => x["@type"] === "Service"));
      assert.ok(data.some((x) => x["@type"] === "BreadcrumbList"));
    }
    summaries.push({
      path,
      title,
      description: await page
        .locator('meta[name="description"]')
        .getAttribute("content"),
      image: imageUrl,
      axeViolations: axe.violations.length,
    });
  }
  assert.equal(new Set(summaries.map((s) => s.description)).size, 9);
  for (const path of ["/inconnue", "/expertises/inconnue"]) {
    const res = await page.goto(origin + path);
    assert.equal(res.status(), 404);
    assert.match(await page.title(), /Page introuvable/);
    assert.ok(
      (
        await page
          .locator('meta[name="robots"]')
          .first()
          .getAttribute("content")
      ).includes("noindex"),
    );
    assert.ok(
      await page
        .getByRole("link", { name: "Nous contacter", exact: true })
        .isVisible(),
    );
  }
  await page.goto(origin);
  await page.setViewportSize({ width: 390, height: 844 });
  const button = page.locator(".menu-toggle");
  await button.focus();
  await page.keyboard.press("Enter");
  assert.equal(await button.getAttribute("aria-expanded"), "true");
  assert.equal(
    await page.evaluate(() => document.activeElement?.getAttribute("href")),
    "/",
  );
  assert.equal(
    await page.evaluate(() => document.body.style.overflow),
    "hidden",
  );
  const menuAxe = await new AxeBuilder({ page }).analyze();
  violations.push(
    ...menuAxe.violations.map((v) => ({
      route: "menu ouvert",
      id: v.id,
      impact: v.impact,
      nodes: v.nodes.map((n) => ({
        target: n.target,
        summary: n.failureSummary,
      })),
    })),
  );
  await page.keyboard.press("Escape");
  assert.equal(await button.getAttribute("aria-expanded"), "false");
  assert.ok(await button.evaluate((el) => el === document.activeElement));
  assert.notEqual(
    await page.evaluate(() => document.body.style.overflow),
    "hidden",
  );
  for (const card of await page.locator(".expertise-card").all()) {
    const name = await card.locator("h3").textContent();
    assert.equal(
      await card.getAttribute("aria-labelledby"),
      await card.locator("h3").getAttribute("id"),
    );
    assert.ok(name);
  }
  await page.goto(origin + "/contact");
  await page
    .locator("form")
    .evaluate((form) =>
      form.dispatchEvent(
        new Event("submit", { bubbles: true, cancelable: true }),
      ),
    );
  assert.equal(await page.evaluate(() => document.activeElement.id), "name");
  assert.equal(
    await page.locator("#name").getAttribute("aria-invalid"),
    "true",
  );
  assert.equal(
    await page.locator("#name").getAttribute("aria-describedby"),
    "name-error",
  );
  for (const resource of ["/favicon.ico", "/icon.svg", "/apple-icon.png"])
    assert.equal((await page.request.get(origin + resource)).status(), 200);
  const sitemap = await (
    await page.request.get(origin + "/sitemap.xml")
  ).text();
  assert.equal((sitemap.match(/<url>/g) || []).length, indexable ? 9 : 0);
  const robots = await (await page.request.get(origin + "/robots.txt")).text();
  if (indexable) {
    assert.match(robots, /Allow: \//);
    assert.match(robots, /Sitemap:/);
  } else {
    assert.match(robots, /Disallow: \//);
    assert.ok(!robots.includes("Sitemap:"));
  }
  const preload = await page
    .locator('link[rel="preload"][as="font"]')
    .evaluateAll((nodes) => nodes.map((n) => n.getAttribute("href")));
  assert.ok(preload.every((url) => url.includes(".woff2")));
  const report = {
    summaries,
    violations,
    consoleErrors,
    sitemapCount: indexable ? 9 : 0,
    indexable,
    fonts: preload,
    mobile: "passed",
    headers: "passed",
  };
  await fs.writeFile(
    indexable
      ? "verification/audit-results.json"
      : "verification/audit-preview-results.json",
    JSON.stringify(report, null, 2),
  );
  await browser.close();
  console.log(
    `Audit: ${violations.length} axe violations; ${consoleErrors.length} CSP/JS errors.`,
  );
  assert.equal(
    violations.filter((v) => ["serious", "critical"].includes(v.impact)).length,
    0,
  );
  assert.deepEqual(consoleErrors, []);
}
main().catch((e) => {
  console.error(e);
  process.exit(1);
});
