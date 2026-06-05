# <AGENT_NAME> — sanity checks

My **checkable invariants** — what must stay true for me to be healthy. The `self-audit` skill
checks these (plus the global doc-rules) on a schedule, fixes the safe issues, flags the rest,
and tracks the result over time. Keep these **checkable, not prose**; build on the global floor.

> **Maintain:** add a check when you find a new way you can drift; keep each one concrete and
> verifiable. Editing this is a flagged self-edit — never quietly lower your own bar.

## Global floor (every agent)

- [ ] every doc has a "Maintain:" note and is listed in its `AGENTS.md`
- [ ] `MEMORY.md` is a lean current view (rolled over to `memory/<YYYY-MM>.md` when long)
- [ ] every script / query has a one-line purpose comment
- [ ] no secrets or raw user content committed anywhere
- [ ] `CLAUDE.md` → `AGENTS.md` symlink intact

## My checks (agent-specific)

- [ ] <add checks specific to your job — e.g. "every customer has a test fixture", "no script
      over ~200 lines without a comment">
