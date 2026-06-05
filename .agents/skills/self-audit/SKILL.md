---
name: self-audit
description: Audit an agent (or the whole repo) for drift — check the global doc-rules and the agent's SANITY.md invariants, fix the safe issues, flag the rest, and log the result so health is tracked over time. Use on a schedule, or when asked to check that things are clean.
---

# Self-audit

## When to use
On a regular cadence (your maintenance run), or whenever you're asked to "check health / clean
up / audit." This is what keeps a self-improving agent from rotting as it edits its own memory,
code, and docs over many runs.

## Procedure
1. **Scope it** — one agent (the agent folder you're in) or the whole repo.
2. **Global rules** (every agent):
   - every doc carries a "**Maintain:**" note;
   - every doc is listed in its nearest `AGENTS.md` index;
   - no secrets or raw user content are committed;
   - symlinks intact: each `CLAUDE.md` → `AGENTS.md`, and `.claude/skills` → `.agents/skills`.
3. **Agent invariants** — run the checks in the agent's `SANITY.md`.
4. **Fix vs flag** — fix the safe, obvious things (add a missing Maintain note, add a missing
   index line, tidy a stray file). Anything judgment-laden or risky: **don't auto-fix — flag it.**
5. **Track it** — append one line per audit to the agent's history (`.figs/runs.jsonl` or a
   dedicated `audit-log.jsonl`): date · checks run · issues found · issues fixed. The **trend
   over time** is the health signal — the key to a sustainable agent.
6. **Report** — a short summary; raise a Figs **ask** for anything that needs the human.

## Pitfalls
- Editing `SANITY.md` itself is a flagged self-edit — never quietly weaken a check.
- A check that keeps failing is a **signal**, not something to delete.
