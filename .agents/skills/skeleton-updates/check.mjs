#!/usr/bin/env node
/**
 * Skeleton drift check — compares this agent's reviewed skeleton revision
 * (`version` in package.json) against upstream figs-so/openfigs and prints any
 * CHANGELOG entries not yet reviewed here.
 *
 * Advisory only: always exits 0, says one quiet line when offline. Zero-dep,
 * Node ≥ 18. The repo root is resolved from this file's own location, so it
 * runs correctly from any subfolder.
 */
import { readFileSync } from "node:fs"
import { dirname, join } from "node:path"
import { fileURLToPath } from "node:url"

const UPSTREAM_RAW =
  process.env.OPENFIGS_UPSTREAM ??
  "https://raw.githubusercontent.com/figs-so/openfigs/main"

const root = join(dirname(fileURLToPath(import.meta.url)), "..", "..", "..")

// "0.2.1" → [0,2,1]; compare(a,b) <0 when a is older.
const parse = (v) => String(v).trim().split(".").map((n) => parseInt(n, 10) || 0)
function compare(a, b) {
  const [pa, pb] = [parse(a), parse(b)]
  for (let i = 0; i < Math.max(pa.length, pb.length); i++) {
    if ((pa[i] ?? 0) !== (pb[i] ?? 0)) return (pa[i] ?? 0) - (pb[i] ?? 0)
  }
  return 0
}

async function fetchText(url) {
  const res = await fetch(url, { signal: AbortSignal.timeout(10_000) })
  if (!res.ok) throw new Error(`${res.status} for ${url}`)
  return res.text()
}

const local = JSON.parse(readFileSync(join(root, "package.json"), "utf8")).version

let upstream
try {
  upstream = JSON.parse(await fetchText(`${UPSTREAM_RAW}/package.json`)).version
} catch {
  console.log("skeleton: couldn't reach upstream (offline?) — skipped the check.")
  process.exit(0)
}

if (compare(local, upstream) >= 0) {
  console.log(`skeleton: up to date — reviewed through ${local} (upstream ${upstream}).`)
  process.exit(0)
}

console.log(`skeleton: last reviewed ${local}; upstream is ${upstream} — unreviewed changes:\n`)

// Entries start "## [x.y.z] — …"; print only the ones newer than `local`.
try {
  const changelog = await fetchText(`${UPSTREAM_RAW}/CHANGELOG.md`)
  const sections = changelog.split(/^## /m).slice(1)
  let printed = 0
  for (const s of sections) {
    const version = s.match(/^\[([0-9.]+)\]/)?.[1]
    if (version && compare(version, local) > 0) {
      console.log(`## ${s.trim()}\n`)
      printed++
    }
  }
  if (!printed) console.log("(no matching CHANGELOG entries found — read it on GitHub)")
} catch {
  console.log(`(couldn't fetch the changelog — read ${UPSTREAM_RAW}/CHANGELOG.md)`)
}

console.log(
  `→ Discuss these with your user (adopt / skip), note skips in MEMORY.md, then set\n` +
    `  "version" in package.json to ${upstream} to mark them reviewed.`,
)
