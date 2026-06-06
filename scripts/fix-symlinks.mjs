#!/usr/bin/env node
/**
 * Regenerate the runtime symlinks every block relies on:
 *   CLAUDE.md       -> AGENTS.md          (next to any AGENTS.md)
 *   .claude/skills  -> ../.agents/skills  (next to any .agents/skills/)
 *
 * Why this exists: the multi-runtime design (Claude Code reads CLAUDE.md / .claude/skills;
 * Codex + opencode read AGENTS.md / .agents/skills) depends on these links. `git clone`,
 * `degit`, and "Use this template" preserve them — but GitHub's "Download ZIP" turns them into
 * plain text files. Run this to repair them.
 *
 * Usage:  node scripts/fix-symlinks.mjs            # fix any drift
 *         node scripts/fix-symlinks.mjs --check    # report drift, change nothing, exit 1 if any (CI)
 */
import fs from "node:fs"
import path from "node:path"
import { fileURLToPath } from "node:url"

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..")
const check = process.argv.includes("--check")
const SKIP = new Set([".git", "node_modules"])

const drift = enforceSymlinks(root, check)

if (drift.length === 0) {
  console.log(check ? "✔ symlinks intact" : "✔ nothing to fix — symlinks already intact")
} else if (check) {
  console.error(`✖ ${drift.length} symlink(s) wrong or missing:`)
  for (const p of drift) console.error(`  ${path.relative(root, p)}`)
  console.error("run `npm run fix-symlinks` to repair.")
  process.exit(1)
} else {
  console.log(`Fixed ${drift.length} symlink(s):`)
  for (const p of drift) console.log(`  ${path.relative(root, p)}`)
}

/**
 * Walk `dir`, enforcing the two symlink invariants. Returns the links that were (or, with
 * `dryRun`, would be) created/repaired.
 */
function enforceSymlinks(dir, dryRun = false, found = []) {
  const entries = fs.readdirSync(dir, { withFileTypes: true })

  if (entries.some((e) => e.name === "AGENTS.md" && e.isFile()))
    reconcile(path.join(dir, "CLAUDE.md"), "AGENTS.md", dryRun, found)

  const agentsSkills = path.join(dir, ".agents", "skills")
  if (fs.existsSync(agentsSkills) && fs.statSync(agentsSkills).isDirectory()) {
    if (!dryRun) fs.mkdirSync(path.join(dir, ".claude"), { recursive: true })
    reconcile(path.join(dir, ".claude", "skills"), "../.agents/skills", dryRun, found)
  }

  for (const e of entries)
    if (e.isDirectory() && !e.isSymbolicLink() && !SKIP.has(e.name))
      enforceSymlinks(path.join(dir, e.name), dryRun, found)

  return found
}

function reconcile(linkPath, target, dryRun, found) {
  let current = null
  try {
    current = fs.readlinkSync(linkPath)
  } catch {
    /* missing or not a symlink */
  }
  if (current === target) return
  found.push(linkPath)
  if (dryRun) return
  fs.rmSync(linkPath, { force: true, recursive: true })
  fs.symlinkSync(target, linkPath)
}
