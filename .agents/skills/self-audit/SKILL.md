---
name: self-audit
description: Audit this agent for drift — check the doc-rules and its SANITY.md invariants, fix the safe issues, flag the rest, and log the result so health is tracked over time. Use on a schedule, or when asked to check that things are clean.
---

# Self-audit

## When to use
On a regular cadence (your maintenance run), or whenever you're asked to "check health / clean
up / audit." This is what keeps a self-improving agent from rotting as it edits its own memory,
code, and docs over many runs.

## Procedure
1. **Run the checks** — your `SANITY.md` invariants + the doc-rules in `AGENTS.md` (every doc has
   a "Maintain:" note and is listed in the index; symlinks intact; tidy workspace; no secrets).
2. **Fix vs flag** — fix the safe, obvious things (add a missing Maintain note, add a missing index
   line, move a stray file into its folder). Anything judgment-laden or risky: **don't auto-fix —
   flag it.**
3. **Track it** — append one line per audit to a history (`.figs/runs.jsonl` or a dedicated
   `audit-log.jsonl`): date · checks run · issues found · issues fixed. The **trend over time** is
   the health signal — the key to a sustainable agent.
4. **Report** — a short summary; raise a Figs **ask** for anything that needs the human.

## Pitfalls
- Editing `SANITY.md` itself is a flagged self-edit — never quietly weaken a check.
- A check that keeps failing is a **signal**, not something to delete.
