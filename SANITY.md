# <AGENT_NAME> — sanity checks

Your checkable invariants — the `self-audit` skill verifies these. Keep each concrete and verifiable.

> **Maintain:** add a check when you find a new way you can drift. A check that keeps failing is a
> **signal**, not something to delete. Editing a check is a flagged self-edit — never quietly weaken one.

## Checks

- [ ] standard files present: `AGENTS.md` (+ `CLAUDE.md`→`AGENTS.md` symlink) · `MEMORY.md` · `SANITY.md`
- [ ] symlinks intact: `CLAUDE.md`→`AGENTS.md`, `.claude/skills`→`.agents/skills`
- [ ] every doc carries a "Maintain:" note and is listed in `AGENTS.md`
- [ ] no secrets or raw user content committed
- [ ] `.figs/config.json` holds my **real** identity (a minted UUID, not a placeholder — and not a copy of another agent's)
- [ ] `.figs/agent.json` charter is current + placeholder-free (`figs doctor` passes)
- [ ] tidy workspace — files in their folders (scripts in `scripts/`, gateways in `gateways/`, docs in `docs/`); no stray loose files at the root
- [ ] each gateway has a passing test (`node --test`)
