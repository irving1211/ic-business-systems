// Local preview server for the static site (no dependencies). node _src/serve.mjs [port]
import { createServer } from "node:http";
import { readFile, stat } from "node:fs/promises";
import { join, extname, dirname, normalize } from "node:path";
import { fileURLToPath } from "node:url";
const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");
const PORT = Number(process.argv[2] || 4321);
const TYPES = { ".html": "text/html; charset=utf-8", ".css": "text/css", ".js": "text/javascript", ".mjs": "text/javascript", ".webp": "image/webp", ".png": "image/png", ".jpg": "image/jpeg", ".svg": "image/svg+xml", ".json": "application/json" };
createServer(async (req, res) => {
  let p = decodeURIComponent(new URL(req.url, "http://x").pathname);
  if (p.endsWith("/")) p += "index.html";
  const file = normalize(join(ROOT, p));
  if (!file.startsWith(ROOT) || /[\/](_src|\.git|\.claude)([\/]|$)/.test(file.slice(ROOT.length))) { res.writeHead(404).end("not found"); return; }
  try {
    const s = await stat(file);
    if (s.isDirectory()) { res.writeHead(301, { Location: p + "/" }).end(); return; }
    res.writeHead(200, { "Content-Type": TYPES[extname(file)] || "application/octet-stream", "Cache-Control": "no-store" });
    res.end(await readFile(file));
  } catch { res.writeHead(404, { "Content-Type": "text/plain" }).end("not found"); }
}).listen(PORT, () => console.log("preview on http://localhost:" + PORT));
