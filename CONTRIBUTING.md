# Contributing to OpenFigs

Thanks for your interest. OpenFigs is a **small, file-based skeleton** for building one back-office
AI employee that reports to a human through [Figs](https://app.figs.so). It's **MIT-licensed** and
early — issues, ideas, and PRs are welcome.

> **Maintain:** keep this in step with the conventions in [`AGENTS.md`](./AGENTS.md) (the doc rules,
> the connector contract, the symlink invariant). If a rule here and there disagree, `AGENTS.md`
> wins — fix this file.

The biggest thing to understand before contributing: **OpenFigs is infra, not dictation.** It ships
conventions and guardrails, not opinions about *what* an agent should do. And **one repo = one
employee** — there's no fleet machinery here; a team is several agents pointing at one Figs
workspace. Contributions should make the skeleton smaller, clearer, or more reusable — not add
machinery or prescribe workflows. When in doubt, prefer fewer, denser files over more.

## Ways to contribute

- **Report a bug or propose an idea** — open an issue. For anything that changes a convention in
  `AGENTS.md` (the operating guide every agent inherits), open an issue to discuss *before* a PR —
  that file is load-bearing for every agent built from this skeleton.
- **Improve a skill** (`self-audit`, `skeleton-updates`) or the report helper (`lib/`) — keep them lean.
- **Sharpen the skeleton** — the charter/contract templates, the loop, the connector conventions.

## A note on connectors

This skeleton has **one** connector concept: `gateways/` — a thin, swappable, env-keyed, **tested**
connector to one external system (connection only; *what*/*how* stays in the agent's job logic). A
connector that several **different employees** should share doesn't live here — it travels as a
**versioned package** they each depend on, so one agent upgrading it never breaks another mid-job.
(The pre-1.0 fleet model had a shared `services/` folder; the package is its single-employee
replacement.)

## Conventions every PR should follow

These are enforced by the `self-audit` skill and CI — match them and review is fast:

- **Docs:** every doc carries a **"Maintain: when & how"** note and is **listed in `AGENTS.md`**'s
  index. Adding a doc means adding both, in the same change.
- **Symlinks:** `CLAUDE.md` → `AGENTS.md` and `.claude/skills` → `.agents/skills`. Never edit, move,
  or commit-over a symlink — edit the canonical source. If they drift, `npm run fix-symlinks` repairs them.
- **Skeleton revisions:** any change to a skeleton file (`AGENTS.md`, `.agents/skills/`, `lib/`,
  `scripts/`, the `.figs/` templates) bumps `version` in `package.json` **and** adds a
  `CHANGELOG.md` entry — same commit. That's how existing clones learn about your change.
- **No secrets, no raw user content** in the repo or in examples.
- **Lean & in control:** plain files and clear conventions over frameworks. Keep it auditable.
- **Match the surrounding style;** be kind in reviews and issues.

## Running locally

```bash
npm test                 # run any tests (node --test)
npm run fix-symlinks     # repair symlinks (use --check in CI to only report drift)
npm run check-skeleton   # see unreviewed upstream skeleton revisions
```

CI (`.github/workflows/ci.yml`) runs `npm test` and a `fix-symlinks --check` on every PR.

## License

By contributing, you agree that your contributions are licensed under the **MIT License**.
