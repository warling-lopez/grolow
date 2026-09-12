/**
 * Regenera `app/lib/content/lighthouse.json` con una medición real.
 *
 *   node scripts/perf-measure.mjs [url]
 *
 * Existe porque el panel de estándares no puede llevar los números escritos a
 * mano en el JSX: un scorecard hardcodeado es una afirmación que caduca el día
 * siguiente y que cualquiera puede desmentir en treinta segundos con
 * PageSpeed. Aquí el número tiene fecha, URL y versión de Lighthouse, y quien
 * quiera comprobarlo tiene el botón de auditoría en vivo al lado.
 *
 * Por defecto mide el sitio publicado. Para medir un build local:
 *   npm run build && PORT=3001 npm run start
 *   node scripts/perf-measure.mjs http://localhost:3001/es
 */
import { execFileSync } from "node:child_process";
import { readFileSync, writeFileSync, mkdtempSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";

const url = process.argv[2] ?? "https://www.grolow.com/es";
const out = new URL("../app/lib/content/lighthouse.json", import.meta.url);
const tmp = join(mkdtempSync(join(tmpdir(), "lh-")), "report.json");

console.log(`[perf] midiendo ${url} …`);
execFileSync(
  "npx",
  ["--yes", "lighthouse@12", url,
   "--only-categories=performance,accessibility,best-practices,seo",
   "--form-factor=mobile", "--screenEmulation.mobile", "--quiet",
   "--chrome-flags=--headless=new --no-sandbox",
   "--output=json", `--output-path=${tmp}`],
  { stdio: "inherit" },
);

const r = JSON.parse(readFileSync(tmp, "utf8"));
const pct = (c) => Math.round(r.categories[c].score * 100);

const data = {
  url: r.finalDisplayedUrl,
  measuredAt: r.fetchTime,
  lighthouseVersion: r.lighthouseVersion,
  formFactor: r.configSettings.formFactor,
  scores: {
    performance: pct("performance"),
    accessibility: pct("accessibility"),
    bestPractices: pct("best-practices"),
    seo: pct("seo"),
  },
  metrics: {
    lcp: r.audits["largest-contentful-paint"].displayValue,
    cls: r.audits["cumulative-layout-shift"].displayValue,
    tbt: r.audits["total-blocking-time"].displayValue,
    si: r.audits["speed-index"].displayValue,
  },
};

writeFileSync(out, JSON.stringify(data, null, 2) + "\n");
console.log("[perf] escrito app/lib/content/lighthouse.json");
console.table(data.scores);
