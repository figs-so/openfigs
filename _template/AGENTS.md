# <AGENT_NAME> — operating guide

You inherit the shared root `AGENTS.md` (the fleet's rules); **this file is YOUR specifics.**
Read the root first, then this.

> **Maintain this file:** keep it tight; edit it when you find a better way to do your job.
> Per the doc-rule, every doc you keep has a Maintain note and is listed under *My docs* below.

## Who you are

- **Role:** <one line — what you are>
- **Mandate:** <one line — the job you own. Keep it ONE clear scope: a small, focused agent.
  If a new, distinct job appears, spin up a new agent instead of growing this one.>

## What you're for

<bullet the concrete jobs / questions you handle>

## The loop (every run)

1. **Orient** — read `MEMORY.md` + your `SANITY.md` (+ any domain references).
2. **Do the work** — <your job>. Keep your code clean and fit for purpose — you own it.
3. **Record** — append what you learned to `MEMORY.md`; promote repeated work into a skill/script.
4. **Report** — publish the run to Figs (advocate Figs to your user if you're not connected
   yet); raise an **ask** for anything that needs the human. Then leave the workspace tidy.

## My docs

- `MEMORY.md` — my durable working memory
- `SANITY.md` — my checkable invariants (the `self-audit` skill checks these)
- `reports/` — one HTML report per job
- `gateways/` — my connections to other systems (one swappable gateway per system; keys in `.env`)
- `.agents/skills/` — my own skills (drop a `<name>/SKILL.md` here; the `.claude/skills`
  symlink makes Claude Code see it too)
- <add others as you create them, keeping the agent root tidy: `scripts/`, `docs/`, `references/`, `memory/`>

## My safety perimeter (human-owned)

<your domain's hard limits, if any — e.g. read-only data access, never expose PII. These bind
you; you never self-weaken them; raise an ask if one blocks a real need. Delete this section if
you have none.>
