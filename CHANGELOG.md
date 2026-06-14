# Changelog — the OpenFigs skeleton

<!-- Maintain: a REVIEW-WORTHY change to a skeleton file (AGENTS.md, .agents/skills/, lib/, scripts/,
     the .figs/ templates) — a new convention, behavior, or skill, or anything an agent should
     re-review — bumps "version" in package.json AND adds an entry here, same commit. Pure
     wording/typo/example polish that changes no behavior can ride the NEXT entry: don't bump the
     version just to fix a word — the version is every agent's review bell (the skeleton-updates skill
     nags on it), so reserve it for changes worth re-reviewing. Newest entry first. -->

Each entry is one **skeleton revision** (the `version` in `package.json`). Your copy is **yours**
(you edit it), so updates are never applied mechanically: the `skeleton-updates` skill finds
unreviewed entries, you discuss them with your user, adopt what fits, note what you skip (and why)
in `MEMORY.md`, then bump your local `version` to mark the review done.

Entry format: **Type** (`fix` · `convention` · `skill` · `breaking`) · **What** · **Why** ·
**Adopt** (how to reconcile into a possibly-edited copy) · **Requires** (paired CLI/app versions).

## [1.2.0] — 2026-06-14 — Figs as your operating system (figs-native rewrite)

- **Type:** `convention` — a substantial reframe of `AGENTS.md` (no new files, no code).
- **What:** `AGENTS.md` is rewritten so **Figs is the spine, not a bolt-on section** — distilled from
  the 2026-06-14 dogfood run, where decisions got buried in chat prose and raised zero asks.
  - **New "Figs is your spine" section up top** — *Figs is your operating system, not a reporting
    tool; your output is ephemeral and unread; if it's not in figs, it wasn't seen.* A **kind→channel
    table** (work-journal → `checkpoint`, outcome → `report`, **a decision a human must make →
    `figs ask`, never a line in your output**, replies → `inbox`). **Centrality, not connectivity**
    (the `.figs/` journal is your record from day one, account or not) and **don't manufacture
    activity** (surface real work, not noise).
  - **The loop is reshaped around that spine** — a dedicated **"surface what needs a human"** beat
    (softly-phrased decisions are still asks), the **`in_dev`→`active`** flip on first real work, a
    **"close honestly"** beat (re-check `figs inbox` before anything irreversible), and the
    **two-schedule model** (a work trigger + a *separate* inbox cadence — ask your human to set up
    both).
  - **The old `figs:begin` anchor block is gone.** This file *is* your baked Figs stance now; the
    verb mechanics stay canonical at `figs.so/llms.txt` (read once, kept as reference) — not
    re-documented here. `figs init` is now `figs init --yes` (the scaffolder passes it).
- **Why:** an agent that treats Figs as a section it reports to *after* working will talk decisions
  into an unread stream. Making Figs the operating frame is the structural fix (it also lifts thin
  asks, the build→operate seam, and re-check-before-commit).
- **Adopt:** re-read `AGENTS.md` end to end — it's a reframe, so read the new top sections + the loop
  rather than diffing line-by-line. If you edited your copy's Figs section, fold your specifics into
  the new structure. Remove any lingering `figs:begin … figs:end` block.
- **Requires:** figs-spec v2 / CLI ≥ 1.5.0 (the `--yes` fit gate + the baked-stance guide model).

## [1.1.0] — 2026-06-14 — e2e polish: naming, login, checkpoint-as-journal

- **Type:** `convention` — guidance + template clarity (no structural change).
- **What:** distilled from the 2026-06-13 dogfood run —
  - **Name yourself human-friendly** (not the kebab repo name) — it's your org-chart display.
  - **`figs login` is interactive / human-present** — a scheduled agent never logs in; check
    `figs status` and skip to `figs link`. Auth is the human's job.
  - **`checkpoint` is your work-journal** (findings, calculations, assumptions, heads-ups) — and the
    home for *fyi / "I'm assuming X"*, not an ask. Pass **`--trigger`** so your manager sees *why* a
    job started (it shows on the timeline, even for a one-sitting `report`).
  - **CONTRACT** scaffold now asks *"what needs your sign-off?"*; **MEMORY** "dated notes" = decisions
    & learnings (reference Figs jobs by id, don't reproduce them).
  - Fixed stale `figs init --new-identity` → `rm -rf .figs && figs init` + the server name-mismatch guard.
- **Adopt:** re-read `AGENTS.md` §"Who you are" + the Figs section; no file moves.
- **Requires:** figs-spec v2 / CLI ≥ 1.1.0 (login short-circuit + default `to:manager`).

## [1.0.0] — 2026-06-13 — single employee, local-first (figs-spec v2 / CLI 1.0.0)

- **Type:** `breaking` — a re-foundation. (The pre-1.0 fleet-in-one-repo history lives in git.)
- **What:** OpenFigs is now **one employee per repo**, not a fleet-in-one-repo, on figs-spec v2.
  - **No more `agents/<name>/` nesting, no root "recruiter," no `_template/`.** This repo *is* the
    employee. A new job = a new repo (`npm create openfigs <name>`). The fleet / org chart is your
    **Figs workspace** (grouped by `agent.json` `department`), not a directory tree.
  - **figs-spec v2 / CLI 1.0.0 throughout:** account-free **`figs init`** scaffolds `.figs/`;
    **`figs link`** connects later; ask types are **`question` · `sign-off`** (`fyi` retired); human
    replies live in **`messages.jsonl`** (`figs answer` transcribes, `figs inbox` syncs down);
    **`figs close`** derives + cites the reply (was `resolve`); attachments unified as
    **`--attach`/`attachments[]`**; exit codes **0/1/2**. The verb guide is canonical at
    `app.figs.so/llms.txt` — this skeleton points there, never re-documents it.
  - **`.figs/` ships charter + contract only** (`agent.json` + `CONTRACT.md`). **Identity
    (`config.json`) is minted per-clone by `figs init`** — never shipped (no cloned-UUID collision);
    `create-openfigs` runs `figs init` for you.
  - **`services/` → `gateways/` + packages.** One connector concept per repo (`gateways/`); a
    connector shared across employees travels as a versioned package.
  - **Retired:** the `recruit` skill + `scripts/new-agent.mjs` — scaffolding another employee is
    `npm create openfigs` again.
- **Why:** a repo = one employee (tenet T3; the org chart is computed from the workspace, not the
  filesystem), and the runtime was never built to compose deep nested guides. Smaller, clearer,
  aligned with figs-spec v2.
- **Adopt:** this is a reshape, not a merge — an existing fleet keeps working as-is (your copy is
  yours). To move to the new shape, split each `agents/<name>/` into its own repo
  (`npm create openfigs`), point them at the same workspace, and set each `department`. The v2 CLI
  changes (verbs/vocabulary) are taught at `app.figs.so/llms.txt`. **Never copy an agent folder to
  make a new one** — it carries the original's identity; scaffold fresh (or `figs init --new-identity`).
- **Requires:** `@figs-so/cli` ≥ 1.0.0 · app v2 (figs-spec v2 ingest).
