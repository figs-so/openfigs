# <AGENT_NAME> — sanity checks

My **checkable invariants** — what must stay true for me to be healthy. The `self-audit` skill
checks these (plus the global doc-rules) on a schedule, fixes the safe issues, flags the rest,
and tracks the result over time. Keep these **checkable, not prose**; build on the global floor.

> **Maintain:** add a check when you find a new way you can drift; keep each one concrete and
> verifiable. Editing this is a flagged self-edit — never quietly lower your own bar.

## The fleet floor

The structural global checks (Maintain notes · doc-index · symlinks · no-secrets · tidy block)
live once in the **root `SANITY.md`**, and the `self-audit` skill applies them to you
automatically. Add only **your own** checks below.

## My checks (agent-specific)

- [ ] every script / query has a one-line purpose comment
- [ ] `MEMORY.md` stays a lean current view (rolled over to `memory/<YYYY-MM>.md` when long)
- [ ] <add checks specific to your job — e.g. "every customer has a test fixture">
