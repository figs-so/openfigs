# Contributing to OpenFigs

Thanks for your interest. OpenFigs is a **small, file-based skeleton** for building back-office
AI-employee agents that report to a human through [Figs](https://app.figs.so). It's
**MIT-licensed** and early — issues, ideas, and PRs are welcome.

> **Maintain:** keep this in step with the conventions in [`AGENTS.md`](./AGENTS.md) (the doc
> rules, the services contract, the symlink invariants). If a rule here and there disagree,
> `AGENTS.md` wins — fix this file.

The biggest thing to understand before contributing: **OpenFigs is infra, not dictation.** It
ships conventions and guardrails, not opinions about *what* an agent should do. Contributions
should make the skeleton smaller, clearer, or more reusable — not add machinery or prescribe
workflows. When in doubt, prefer fewer, denser files over more.

## Ways to contribute

- **Report a bug or propose an idea** — open an issue. For anything that changes a convention
  in `AGENTS.md` (the shared operating guide every agent inherits), open an issue to discuss
  *before* a PR — that file is load-bearing for every fleet.
- **Add a shared service** — the highest-value contribution (see below).
- **Improve a skill** (`recruit`, `self-audit`) or the report helper (`lib/`) — keep them lean.

## Adding a shared service (the expansion surface)

`services/` is where the community grows the fleet's reach: thin, stable, **tested** connectors
to one external system that many agents reuse (a DB, Slack, Snowflake, SAP…). This is the part
of the repo most likely to take a PR. The full contract is in
[`services/README.md`](./services/README.md); in short:

- **One service per system**, in `services/<system>/`.
- `index.mjs` exports a **small, stable** API and reads credentials from `process.env` —
  **never embed keys**.
- **Connection only — no business logic.** *What* to fetch and *how* to process it stays in the
  agent. A service that creeps into logic becomes the shared code that breaks agent B when it's
  "improved" for agent A.
- Ship a **`<system>.test.mjs`** (`node --test`) — many agents will depend on it, so it must be
  tested, and the test must stay green. Additive API changes are safe; breaking ones need a
  strong rationale.
- Add a `README.md` (what it does, env keys, exported API) and **list it in
  `services/README.md`**.

Model new services on `services/example/`.

## Conventions every PR should follow

These are enforced by the `self-audit` skill and CI — match them and review is fast:

- **Docs:** every doc carries a **"Maintain: when & how"** note and is **listed in the nearest
  `AGENTS.md`** index. Adding a doc means adding both, in the same change.
- **Symlinks:** `CLAUDE.md` → `AGENTS.md` and `.claude/skills` → `.agents/skills` at every
  block. Never edit, move, or commit-over a symlink — edit the canonical source (`AGENTS.md`,
  `.agents/skills/`). If they drift, `npm run fix-symlinks` repairs them.
- **No secrets, no raw user content** in the repo or in examples.
- **Lean & in control:** plain files and clear conventions over frameworks. Keep it auditable.
- **Match the surrounding style;** be kind in reviews and issues.

## Running locally

```bash
npm test                 # run all service tests (node --test)
npm run fix-symlinks      # repair symlinks (use --check in CI to only report drift)
npm run new-agent <name>  # scaffold an agent from _template/
```

CI (`.github/workflows/ci.yml`) runs `npm test` and a `fix-symlinks --check` on every PR.

## License

By contributing, you agree that your contributions are licensed under the **MIT License**.
