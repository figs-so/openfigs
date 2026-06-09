<!-- Pointer to Figs. `figs init` writes this only when it's absent — it won't clobber your edits. -->
# Figs — this folder

This agent publishes to **Figs**, your manager's read-only window into what it does.

- **Charter** → `agent.json` (who I am) · **Contract** → `CONTRACT.md` (what I surface vs hold back).
- **Local activity log** (valuable even before you connect): `runs.jsonl` · `asks.jsonl` · `artifacts/`.
- **Connect** (no install — the CLI runs via `npx @figs-so/cli@latest <cmd>`): run `npx @figs-so/cli@latest login`, then `init --workspace <slug>` in this folder, then `push`.
  CLI (open source) + the hosted app live at **https://app.figs.so**.

Identity (`config.json`) is minted by `figs init` — never hand-author it.
