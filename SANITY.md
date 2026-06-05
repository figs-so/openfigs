# OpenFigs (root) — sanity checks (the fleet floor)

Fleet-wide invariants — the **global floor** every block is checked against. The `self-audit`
skill runs these for each agent, plus that agent's own `SANITY.md`.

> **Maintain:** add a check when you find a new way the fleet can drift. Keep each concrete
> and verifiable.

## Fleet floor (every block)

- [ ] the block has its standard files: `AGENTS.md` + `CLAUDE.md`→`AGENTS.md` · `MEMORY.md` · `SANITY.md`
- [ ] every doc carries a "Maintain:" note and is listed in its `AGENTS.md`
- [ ] symlinks intact: `CLAUDE.md`→`AGENTS.md`, `.claude/skills`→`.agents/skills`
- [ ] no secrets or raw user content committed
- [ ] **tidy block** — files are in the right folder (scripts in `scripts/`, docs in `docs/`,
      references in `references/`, gateways in `gateways/`); no stray loose files at a block root
- [ ] the roster (root `AGENTS.md` / `MEMORY.md`) matches the agents that actually exist
