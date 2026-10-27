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
const ASSET_VERSION = "21";

// Service pages share _src/pages/service.html. `svc` picks the strings prefix (svc.<svc>.*),
// `rel` the three related service pages linked at the bottom.
const service = (svc, en, es, rel) => ({
  en, es, tpl: "service", svc, rel,
  out: { en: en.slice(1) + "index.html", es: es.slice(1) + "index.html" },
});
const PAGES = {
  index: { en: "/", es: "/es/", out: { en: "index.html", es: "es/index.html" } },
  audit: { en: "/audit.html", es: "/es/audit.html", out: { en: "audit.html", es: "es/audit.html" } },
  thanks: { en: "/thanks.html", es: "/es/gracias.html", out: { en: "thanks.html", es: "es/gracias.html" } },
  web: service("web", "/websites-for-plumbers-hvac/", "/es/sitios-web-para-plomeros-hvac/", ["gbp", "analytics", "squarespace"]),
  gbp: service("gbp", "/google-business-profile/", "/es/perfil-de-google-business/", ["gbpSuspended", "web", "aiCheck"]),
  gbpSuspended: service("gbpSuspended", "/google-business-profile-suspended/", "/es/perfil-de-google-suspendido/", ["gbp", "aiCheck", "web"]),
  aiCheck: service("aiCheck", "/ai-search-check/", "/es/revision-de-busqueda-con-ia/", ["gbp", "web", "analytics"]),
  analytics: service("analytics", "/google-analytics-search-console-setup/", "/es/configuracion-google-analytics-search-console/", ["web", "gbp", "aiCheck"]),
  squarespace: service("squarespace", "/squarespace-website-fixes/", "/es/arreglos-sitio-squarespace/", ["web", "analytics", "video"]),
  video: service("video", "/website-promo-video/", "/es/video-promocional-de-sitio-web/", ["web", "squarespace", "aiCheck"]),
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
  // service template: {{svc}} -> this page's strings prefix, {{rel1}}..{{rel3}} -> related page keys
  const def = PAGES[page];
  tpl = tpl.replace(/\{\{(svc|rel[1-3])\}\}/g, (_, name) => {
    const v = name === "svc" ? def.svc : def.rel && def.rel[Number(name.slice(3)) - 1];
    if (!v) throw new Error(`{{${name}}} used in ${page}, which has no value for it`);
    return v;
  });
  // {{url:pageKey}} = that page's path in the current language
  tpl = tpl.replace(/\{\{url:(\w+)\}\}/g, (_, key) => {
    if (!PAGES[key]) throw new Error(`Unknown page "${key}" in {{url:}} (${page})`);
    return PAGES[key][lang];
  });
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
  const tpl = readLf(join(SRC, "pages", (PAGES[page].tpl || page) + ".html"));
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
const INDEXABLE = Object.keys(PAGES).filter((page) => page !== "thanks");
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
