#!/usr/bin/env node
/**
 * Build a self-contained HTML report using the shared style (lib/report.css).
 *
 * Why: an agent's report is the artifact it publishes to Figs and a human reviews. Inlining
 * lib/report.css keeps each report ONE portable file (opens anywhere, survives a forward) and
 * on one house style — agents write only the body, never hand-roll CSS, and add new components
 * to lib/report.css.
 *
 * Usage (run from anywhere; out-path resolves against your cwd):
 *   node <repo>/lib/report.mjs --title "..." --out reports/2026-06-05-slug.html --body body.html
 *   node <repo>/lib/report.mjs --title "..." --out reports/x.html < body.html   (body on stdin)
 *
 * --body / stdin is the INNER HTML (what goes inside <div class="container">): your `.topbar`,
 * `.lead`, `.section` blocks, `.grid`/`.card`, `.hbars`, `table`, `.footer`. See lib/report.css
 * for the class vocabulary. Keep raw user content OUT — aggregates, IDs, paraphrases only.
 */
import fs from "node:fs"
import path from "node:path"
import { fileURLToPath } from "node:url"

const here = path.dirname(fileURLToPath(import.meta.url))
const cssPath = path.join(here, "report.css")

const argv = process.argv.slice(2)
const opt = {}
for (let i = 0; i < argv.length; i++) {
  const a = argv[i]
  if (a === "--title") opt.title = argv[++i]
  else if (a === "--out") opt.out = argv[++i]
  else if (a === "--body") opt.body = argv[++i]
  else {
    console.error(`report.mjs: unknown arg "${a}"`)
    process.exit(1)
  }
}
if (!opt.title || !opt.out) {
  console.error('usage: node lib/report.mjs --title "..." --out <file.html> [--body <file>]  (body else from stdin)')
  process.exit(1)
}

const css = fs.readFileSync(cssPath, "utf8")
const body = opt.body ? fs.readFileSync(opt.body, "utf8") : fs.readFileSync(0, "utf8")
const esc = (s) => s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;")

const html = `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${esc(opt.title)}</title>
<style>
${css}</style>
</head>
<body>
<div class="container">
${body}
</div>
</body>
</html>
`

const cwd = process.env.INIT_CWD || process.cwd()
const outPath = path.isAbsolute(opt.out) ? opt.out : path.resolve(cwd, opt.out)
fs.mkdirSync(path.dirname(outPath), { recursive: true })
fs.writeFileSync(outPath, html)
console.log(`report written: ${outPath} (${(html.length / 1024).toFixed(1)} KB, self-contained)`)
