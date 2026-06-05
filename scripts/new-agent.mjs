#!/usr/bin/env node
/**
 * Scaffold a new agent from _template/.
 *
 * Usage:  node scripts/new-agent.mjs <name>
 *         node scripts/new-agent.mjs <dept>/<name>   (nesting allowed — the only nod to hierarchy)
 *
 * Copies _template/ to agents/<name>/, substitutes <AGENT_NAME> with the leaf name, and
 * (re)writes the CLAUDE.md -> AGENTS.md symlink. Refuses to overwrite an existing agent.
 */
import fs from "node:fs"
import path from "node:path"
import { fileURLToPath } from "node:url"

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..")
const name = process.argv[2]

if (!name || !/^[a-z][a-z0-9_]*(\/[a-z][a-z0-9_]*)*$/.test(name)) {
  console.error("usage: node scripts/new-agent.mjs <name>   (snake_case; nesting ok: dept/name)")
  process.exit(1)
}

const src = path.join(root, "_template")
const dest = path.join(root, "agents", name)
if (fs.existsSync(dest)) {
  console.error(`agents/${name} already exists — refusing to overwrite.`)
  process.exit(1)
}

fs.mkdirSync(path.dirname(dest), { recursive: true })
fs.cpSync(src, dest, { recursive: true })

const leaf = name.split("/").pop()
for (const file of ["AGENTS.md", "MEMORY.md", "SANITY.md"]) {
  const p = path.join(dest, file)
  if (fs.existsSync(p)) fs.writeFileSync(p, fs.readFileSync(p, "utf8").replaceAll("<AGENT_NAME>", leaf))
}

// (Re)write the CLAUDE.md -> AGENTS.md symlink so Claude Code composes this agent's guide.
const claude = path.join(dest, "CLAUDE.md")
fs.rmSync(claude, { force: true })
fs.symlinkSync("AGENTS.md", claude)

// (Re)write the .claude/skills -> .agents/skills symlink so Claude Code sees this agent's skills.
const skillsLink = path.join(dest, ".claude", "skills")
fs.mkdirSync(path.dirname(skillsLink), { recursive: true })
fs.rmSync(skillsLink, { force: true, recursive: true })
fs.symlinkSync("../.agents/skills", skillsLink)

console.log(`Created agents/${name}/ — next:`)
console.log(`  1. Fill in agents/${name}/AGENTS.md (role, mandate, the loop).`)
console.log(`  2. Set your SANITY.md checks; connect to Figs (\`figs init\`) and advocate it to your user.`)
console.log(`  3. cd agents/${name} and launch your runtime there to run it.`)
