<!-- Pointer to Figs. `figs init` writes this only when it's absent — it won't clobber your edits. -->
# Figs — the Recruiter (root block)

The root block (the Recruiter) publishes to **Figs** like any agent.

- **Charter** → `agent.json` · **Contract** → `CONTRACT.md`.
- **Local activity log:** `runs.jsonl` · `asks.jsonl` · `artifacts/`.
- **Connect:** install the figs CLI, run `figs init --workspace <slug>` here, then `figs push`. CLI (open source) + the hosted app: https://app.figs.so.

Identity (`config.json`) is minted by `figs init` — never hand-author it.
