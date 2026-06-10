# Changelog — the OpenFigs skeleton

<!-- Maintain: any change to a shared skeleton file (root AGENTS.md, _template/, .agents/skills/,
     lib/, scripts/, services/) bumps "version" in package.json AND adds an entry here — same
     commit. Newest entry first. -->

Each entry is one **skeleton revision** (the `version` in `package.json`). In a cloned fleet,
the local `version` means **"the last revision this fleet reviewed"** — not what it adopted.
Your copy is yours (agents edit it), so updates are never applied mechanically: the
`skeleton-updates` skill finds unreviewed entries, you discuss them with your user, adopt what
fits, note what you skip (and why) in `MEMORY.md`, then bump your local `version` to mark the
review done.

Entry format: **Type** (`fix` · `convention` · `skill` · `service` · `breaking`) · **What** ·
**Why / who** · **Adopt** (how to reconcile it into a possibly-edited copy) · **Requires**
(paired CLI/app versions, when relevant) · **Diff** (the commit).

## [0.1.0] — 2026-06-10 — baseline

- **Type:** baseline
- **What:** first stamped skeleton revision — versioning, this changelog, and the
  `skeleton-updates` skill land together.
- **Why / who:** every fleet cloned or scaffolded from here on can detect skeleton improvements
  and review them deliberately instead of aging in silence.
- **Adopt:** nothing to do — clones and `npm create openfigs` scaffolds from this revision
  already include everything, among it this week's onboarding fixes: the figs CLI is invoked via
  `npx @figs-so/cli@latest` (no install), `figs login` opens the browser and walks a brand-new
  user through sign-up + their first workspace, and `figs init` picks your only workspace.
- **Requires:** `@figs-so/cli` ≥ 0.1.16 (agents on `npx …@latest` are always current).
