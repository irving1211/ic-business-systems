// Static build: renders each page template once per language.
//   node _src/build.mjs          -> writes index.html, audit.html, thanks.html, es/*.html
//   node _src/build.mjs --check  -> exits 1 if the committed output is stale
// _src/ is ignored by GitHub Pages (Jekyll skips underscore folders), so templates never ship.
import { readFileSync, writeFileSync, mkdirSync, existsSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { strings } from "./strings.mjs";

const SRC = dirname(fileURLToPath(import.meta.url));
const ROOT = join(SRC, "..");
const ORIGIN = "https://icbusinesssystems.com";
const ASSET_VERSION = "20";

const PAGES = {
  index: { en: "/", es: "/es/", out: { en: "index.html", es: "es/index.html" } },
  audit: { en: "/audit.html", es: "/es/audit.html", out: { en: "audit.html", es: "es/audit.html" } },
  thanks: { en: "/thanks.html", es: "/es/gracias.html", out: { en: "thanks.html", es: "es/gracias.html" } },
};

const escapeHtml = (s) => String(s)
  .replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
// git on Windows may check files out with CRLF; templates and --check compare on LF.
const readLf = (p) => readFileSync(p, "utf8").replace(/\r\n/g, "\n");

function checkParity() {
  const en = Object.keys(strings.en), es = Object.keys(strings.es);
  const missingEs = en.filter((k) => !(k in strings.es));
  const missingEn = es.filter((k) => !(k in strings.en));
  if (missingEs.length || missingEn.length) {
    throw new Error(`Translation parity failed.\n  missing in es: ${missingEs.join(", ")}\n  missing in en: ${missingEn.join(", ")}`);
  }
}

function render(tpl, lang, page) {
  const other = lang === "en" ? "es" : "en";
  const vars = {
    lang,
    base: lang === "en" ? "/" : "/es/",
    url: PAGES[page][lang],
    canonical: ORIGIN + PAGES[page][lang],
    altUrl: PAGES[page][other],
    hrefEn: ORIGIN + PAGES[page].en,
    hrefEs: ORIGIN + PAGES[page].es,
    ogLocale: lang === "en" ? "en_US" : "es_US",
    ogLocaleAlt: lang === "en" ? "es_US" : "en_US",
    thanksAbs: ORIGIN + PAGES.thanks[lang],
    thanksPath: PAGES.thanks[lang],
    auditPath: PAGES.audit[lang],
    v: ASSET_VERSION,
  };
  // includes first (one level is enough for this site; repeat for nested partials)
  for (let i = 0; i < 3; i++) {
    tpl = tpl.replace(/\{\{>\s*([\w-]+)\s*\}\}/g, (_, name) => readLf(join(SRC, "partials", name + ".html")));
  }
  const used = new Set();
  let out = tpl
    // {{j:key}} = the string JSON-escaped (no HTML entities), for use inside ld+json blocks
    .replace(/\{\{j:([\w.]+)\}\}/g, (_, key) => {
      if (!(key in strings[lang])) throw new Error(`Unknown string key "${key}" in ${page}`);
      used.add(key);
      return JSON.stringify(strings[lang][key]).slice(1, -1);
    })
    .replace(/\{\{t:([\w.]+)\}\}/g, (_, key) => {
      if (!(key in strings[lang])) throw new Error(`Unknown string key "${key}" in ${page}`);
      used.add(key);
      return escapeHtml(strings[lang][key]);
    })
    .replace(/\{\{@(\w+)\}\}/g, (_, name) => {
      if (!(name in vars)) throw new Error(`Unknown variable @${name} in ${page}`);
      return vars[name];
    })
    .replace(/\{\{if:(en|es)\}\}([\s\S]*?)\{\{\/if\}\}/g, (_, l, body) => (l === lang ? body : ""));
  if (/\{\{/.test(out)) throw new Error(`Unrendered template tag left in ${page} (${lang}): ${out.match(/\{\{[^}]*\}\}/)[0]}`);
  return { html: out, used };
}

checkParity();
const check = process.argv.includes("--check");
let stale = 0;
const allUsed = new Set();
for (const page of Object.keys(PAGES)) {
  const tpl = readLf(join(SRC, "pages", page + ".html"));
  for (const lang of ["en", "es"]) {
    const { html, used } = render(tpl, lang, page);
    used.forEach((k) => allUsed.add(k));
    const outPath = join(ROOT, PAGES[page].out[lang]);
    if (check) {
      if (!existsSync(outPath) || readLf(outPath) !== html) { console.error("stale:", PAGES[page].out[lang]); stale++; }
      continue;
    }
    mkdirSync(dirname(outPath), { recursive: true });
    writeFileSync(outPath, html);
    console.log("wrote", PAGES[page].out[lang], (html.length / 1024).toFixed(1) + " KB");
  }
}
// sitemap.xml (indexable pages only; thanks pages are noindex) with hreflang alternates, plus robots.txt
const INDEXABLE = ["index", "audit"];
const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">
${INDEXABLE.flatMap((page) => ["en", "es"].map((lang) => `  <url>
    <loc>${ORIGIN + PAGES[page][lang]}</loc>
    <xhtml:link rel="alternate" hreflang="en" href="${ORIGIN + PAGES[page].en}"/>
    <xhtml:link rel="alternate" hreflang="es" href="${ORIGIN + PAGES[page].es}"/>
    <xhtml:link rel="alternate" hreflang="x-default" href="${ORIGIN + PAGES[page].en}"/>
  </url>`)).join("\n")}
</urlset>
`;
const robots = `User-agent: *\nAllow: /\n\nSitemap: ${ORIGIN}/sitemap.xml\n`;
for (const [name, body] of [["sitemap.xml", sitemap], ["robots.txt", robots]]) {
  const outPath = join(ROOT, name);
  if (check) { if (!existsSync(outPath) || readLf(outPath) !== body) { console.error("stale:", name); stale++; } continue; }
  writeFileSync(outPath, body);
  console.log("wrote", name);
}

const unused = Object.keys(strings.en).filter((k) => !allUsed.has(k));
if (unused.length) console.warn("unused string keys:", unused.join(", "));
if (check && stale) process.exit(1);
