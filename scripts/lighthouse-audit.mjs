import lighthouse from "lighthouse";
import { launch } from "chrome-launcher";
import { writeFile } from "node:fs/promises";
const chrome = await launch({
  chromePath: "C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe",
  chromeFlags: ["--headless", "--no-first-run"],
});
try {
  const { lhr, report } = await lighthouse("http://127.0.0.1:3000/", {
    port: chrome.port,
    output: ["json", "html"],
    onlyCategories: ["accessibility", "seo", "best-practices", "performance"],
  });
  await writeFile("verification/lighthouse-mobile.json", report[0]);
  await writeFile("verification/lighthouse-mobile.html", report[1]);
  console.log(
    Object.fromEntries(
      Object.entries(lhr.categories).map(([key, value]) => [
        key,
        Math.round(value.score * 100),
      ]),
    ),
  );
  console.log(
    Object.values(lhr.audits)
      .filter(
        (a) =>
          a.score !== null &&
          a.score < 1 &&
          a.scoreDisplayMode !== "informative",
      )
      .map((a) => ({ id: a.id, title: a.title, description: a.description })),
  );
} finally {
  await chrome.kill();
}
