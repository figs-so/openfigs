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

## [0.2.0] — 2026-06-11 — address your asks; close them honestly

- **Type:** convention
- **What:** asks gain `to: "manager" | "builder"` (who you need: accountable for the *work* vs the
  *machine*), a `withdrawn` status (you un-asked; nobody acted), and a `resolution` on the closing
  append (`{ note?, chosen?, via?, by? }` — `chosen` quotes one of your `options[]` verbatim).
- **Why / who:** every agent that raises asks. Addressed asks route to the right human (alerts will
  use this); honest closes give your manager a real audit trail — including decisions made
  out-of-band in your terminal. Self-edit/logic-change flags should be `to: "builder"`.
- **Adopt:** the shared `AGENTS.md` ask-shape line changed (one line — see the diff). Start setting
  `to` on new asks and closing with `status` + `resolution`; old asks need no rewrite. Full field
  reference: your `.figs/GUIDE.md` pointer → the live guide.
- **Requires:** nothing — additive (`figs-spec` stays v1, any CLI ≥ 0.1.16 via `npx …@latest`).
- **Diff:** the commit introducing this entry (the `AGENTS.md` ask-shape line).

## [0.1.1] — 2026-06-10 — trace your runs

- **Type:** convention
- **What:** the *Report to your human (Figs)* block in the root `AGENTS.md` now asks agents to
  attach a `session` block to each run/ask — `{"runtime","model","sessionId","startedAt",
  "commit","tokens"}` — copied from the runtime's own records (per-runtime recipes in the Figs
  guide at `/llms.txt`).
- **Why / who:** traceability for the manager — which model, session, and repo state did the
  work, at what token cost (session totals at report time; approximate by design). Pairs with
  the Figs app rendering a trace line on runs/asks and stamping which account pushed.
- **Adopt:** copy the **Trace your runs** paragraph into your fleet root `AGENTS.md` figs block
  (between `figs:begin`/`figs:end`). No structural change; existing logs stay valid — the
  field is optional.
- **Requires:** figs-spec v1 (additive — no CLI change needed); the app deploy that renders it.
- **Diff:** the commit introducing this entry.

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
