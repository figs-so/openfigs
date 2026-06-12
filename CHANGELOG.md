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

## [0.7.0] — 2026-06-12 — sign-offs state their consequences; the guide stops duplicating the CLI

- **Type:** convention
- **What:** two changes in the root `AGENTS.md` Figs section. (1) **A sign-off states what
  approval sets in motion** — CLI 0.7.0 adds `--on-approve '<step>'` (repeatable, ordered,
  sign-off only): the steps an approval authorizes, rendered to the approver right next to the
  verdict buttons; flag anything irreversible in the step itself. The composed answer (verdict
  + cited path + note) is **one instruction** — and a note that changes the approved content
  itself is a change request: revise and re-raise on the same id. (2) **The section is slimmed
  to the loop + a pointer** — field-level conventions now live only in the canonical guide
  (`/llms.txt`) and in `figs <cmd> --help` (the CLI is the guide). Copies drift; the skeleton
  stops carrying one.
- **Why / who:** the 2026-06-12 sign-off-consequences decision (an approver should know exactly
  what clicking Approve causes — otherwise sign-off is rubber-stamping); every fleet agent that
  raises sign-offs.
- **Adopt:** replace your root `AGENTS.md` "Report to your human (Figs)" verb bullets with the
  new slimmed block (or hand-merge if you've customized them); teach your agents `--on-approve`
  by pointing them at `figs ask --help` — don't paste field docs into your own guide.
- **Requires:** CLI ≥ 0.7.0 (`--on-approve`); app deploy ≥ 2026-06-12 (renders the steps).
- **Diff:** the commit tagged 0.7.0.

## [0.6.0] — 2026-06-11 — three ask types: the type is the answer contract

- **Type:** breaking (CLI pairing) · convention
- **What:** ask types are now exactly **the answer contract** — what you want back:
  `needs-decision` (an answer: a decision, an input, an unblock) · `sign-off` (a verdict) ·
  `fyi` (nothing — a for-the-record note: self-edit flags, cycle-close notes; never counts as
  needing a human). **`blocked` is gone** (CLI 0.6.0 rejects it with a teaching error): a stuck
  *job* is the **run's** status — re-report onto the same job id; the thing you need from a
  human is a `needs-decision`. **Sign-off `--option`s are now first-class answer paths** —
  qualified verdicts the human can send as one event (verdict + chosen path + note together);
  write each option so it tells you exactly what to do next
  (`'Approved — file the 15'` / `'Hold — wait for the receipt'`), and your inbox's approved
  next-command will cite it for your close.
- **Why / who:** every agent. The first E2E dogfood showed agents never reach for `blocked`
  (everything became needs-decision/sign-off — correctly), and both fresh agents attached
  options to sign-offs unprompted while the app rendered them unanswerable. The taxonomy now
  matches how agents actually ask; rule of thumb: **status of work → run result;
  for-the-record flag → fyi.**
- **Adopt:** take the root `AGENTS.md` verbs-section diff (+ `_template/.figs/CONTRACT.md`
  wording). If your agents' own guides name `blocked`, reword to the run-status + needs-decision
  split; if they raise sign-offs, adopt the answer-path option style.
- **Requires:** `@figs-so/cli` ≥ **0.6.0** (older CLIs still accept `blocked`; 0.6.0 teaches
  the merge loudly).
- **Diff:** (this commit)

## [0.5.1] — 2026-06-11 — session auto-capture is gone · single-quote prose values

- **Type:** fix (doc truth; CLI pairing)
- **What (1 — trace):** `@figs-so/cli` 0.5.0 **no longer auto-captures the `session` trace** on
  `figs report` / `figs ask`. The CLI inferred it from "the newest transcript on this machine,"
  and in nested/headless runs (exactly how OpenFigs agents run — one folder per agent, often
  driven headless) it stamped the **wrong runtime and model** — a fabricated audit line shown to
  your manager. Removed under the rule **a trace must be true or absent, never false**. The
  spec's optional `session` block stays legal; include one only if you can copy provable values
  from your runtime's own records. Guide texts claiming auto-capture updated (root `AGENTS.md`
  verbs section, `README.md`, `_template/.figs/GUIDE.md`).
- **What (2 — quoting):** every command example in the guides now **single-quotes prose values**
  (`figs report --result '…'`), with one teaching line in the verbs section. Inside double
  quotes your shell expands `$` before the CLI runs — `"($4,474.63)"` arrived as `(,474.63)` in
  a real fleet's durable records (silent corruption, caught in the first E2E test). CLI 0.5.0
  pairs this: its own help/inbox templates teach single quotes, and it warns when a value looks
  shell-eaten (orphaned `,474`-style thousands group).
- **Why / who:** every connected agent — no false trace line, and no silently-mangled dollar
  amounts in runs/asks. Nothing to change in your loop except how you quote.
- **Adopt:** take the doc diffs (root `AGENTS.md`, `_template/AGENTS.md`, `README.md`,
  `_template/.figs/GUIDE.md`); if your own agents' guides copied double-quoted `figs` examples
  or "captures the session trace" wording, reword to match. Hand-built `session` blocks: honest
  runtime-record values only, else omit.
- **Requires:** `@figs-so/cli` ≥ 0.5.0 (older CLIs still auto-capture — and can still stamp a
  false trace; `npx …@latest` gets you off them).
- **Diff:** (this commit + the preceding trace-removal commit)

## [0.5.0] — 2026-06-11 — one run = one job (and a close is not a job)

- **Type:** breaking (CLI pairing) · convention
- **What:** a **run is a job** — a unit of work your *manager* would recognize, under a stable,
  meaningful id (`recon-acme-2026-11`); **the runs list is the job list**. Sittings/sessions
  never mint runs: pausing to wait for a human, report what's true so far **onto the same job
  id** (records fold by id; the row evolves blocked → ok). Consequently
  **`figs report --resolves` is gone** (CLI 0.4.0 deletes it — first dogfood produced a phantom
  "I read the approval" run): closing an ask is **only** `figs resolve`, which still auto-cites
  the answer event it acted on (`via: "figs"`). Fork on what an answer unlocked: nothing left
  to do → resolve right away; real work → do the job, report it under its own id, *then*
  resolve (cite the job in `--note`). Shared `AGENTS.md` verbs section + `_template` loop
  step 4 updated.
- **Why / who:** every agent. The runs ledger stays a clean list of actual jobs — no
  bookkeeping ceremonies dressed as work; one verb per ledger (report → runs, ask/resolve → asks).
- **Adopt:** take the `AGENTS.md` + `_template` diffs; if your agents' own loops say "end every
  sitting with `figs report`" or close with `report --resolves`, reword to the job model + the
  resolve fork.
- **Requires:** `@figs-so/cli` ≥ **0.4.0** (`npx …@latest`; `--resolves` is an unknown flag from
  0.4.0 — old guides will error loudly, not silently misbehave).

## [0.4.0] — 2026-06-11 — the loop closes: start every session with `figs inbox`

- **Type:** convention
- **What:** your humans now answer your asks **in the Figs app**, and you read them with
  **`figs inbox`** — answers/verdicts verbatim + the exact next command per ask;
  `figs inbox <ask-id>` is the full handoff package (the ask, the whole thread, its artifacts
  restored to `.figs/artifacts/`, hash-verified). The loop becomes four verbs with inbox first:
  **inbox → work → report/ask → resolve**. Closes are now **verified** when the answer came
  through Figs: the CLI cites the exact answer event (`resolution.via: "figs"` +
  `resolution.answer`) automatically — no hand-written attribution. A human can also **reject**
  an ask in the app (it closes immediately; acknowledge with `figs resolve <id> --rejected`).
  Shared `AGENTS.md` + `_template` loop step 1 + the `.figs/GUIDE.md` stubs all updated.
- **Why / who:** every agent. This is the moment Figs stops being write-only for you — the
  handoff loop (ask → answer → act → report) runs end to end through one channel, recorded on
  both sides.
- **Adopt:** take the `AGENTS.md` + `_template` diffs; add "start with `figs inbox`" to your
  agents' own loops if they restate orientation steps.
- **Requires:** `@figs-so/cli` ≥ **0.3.0** (`npx …@latest`).

## [0.3.1] — 2026-06-11 — link runs by explicit id (no "last")

- **Type:** fix
- **What:** `figs ask --run last` is gone (CLI ≥ 0.2.1 rejects it): concurrent sessions of the
  same agent report runs in parallel, so "the latest run" can silently be another session's.
  Link with the **explicit run id** — `figs report` prints the id of what it wrote. The shared
  `AGENTS.md` line is updated. Also new: `figs resolve --rejected` records a human's
  out-of-band "no" (three closes: resolved = need met · withdrawn = you retracted ·
  rejected = a human declined; rejected is terminal — re-raise as a new ask).
- **Why / who:** every agent that links asks to runs or closes asks.
- **Adopt:** take the `AGENTS.md` diff; if your agents' own guides mention `--run last`, fix them.
- **Requires:** `@figs-so/cli` ≥ **0.2.1** (`npx …@latest`).

## [0.3.0] — 2026-06-11 — the CLI verbs: report your work in one stroke

- **Type:** convention
- **What:** the daily Figs loop is now **three CLI verbs** — `figs report --result "…"` (end
  every sitting of work: stamps id + real clock time, **auto-captures your session trace** from
  your runtime's own records, `--attach`es artifacts, validates, pushes itself) · `figs ask`
  (self-contained asks: `--option`/`--detail`/`--attach` repeatable, `--run last`, `--stdin`;
  sign-offs attach the exact content + a brief) · `figs resolve` (verbatim-checked `--chosen`,
  `--withdrawn`; or `figs report --resolves <ask-id>` to record-and-close in one stroke). The
  shared `AGENTS.md` Figs section, the `_template`, and the `.figs/GUIDE.md` pointers are
  rewritten around them. Hand-writing the JSONL stays legal — the files are the protocol; bare
  `figs push` is only for hand-edits / `--no-push` batching. Two conventions now stated
  explicitly: **write every ask for a stranger** (a zero-context session must be able to act
  from the record alone), and **artifacts are immutable once published** (new version = new
  name).
- **Why / who:** every agent. The verbs kill the per-run failure points — guessed timestamps,
  invented ids, hand-parsed token counts, forgotten pushes — and make the session trace *more*
  reliable, not less. Spec cleanup rides along: ask type `confirm-assumption` and agent
  `type` are gone (never used by this skeleton's flow).
- **Adopt:** take the new shared-`AGENTS.md` "Report to your human (Figs)" section + the
  `_template` loop step 4 (see the diff); update your agents' own guides if they restate the
  old `doctor → push` loop. No data rewrite — old runs/asks stay valid.
- **Requires:** `@figs-so/cli` ≥ **0.2.0** (`npx …@latest` gets it automatically).

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
