# Changelog — the OpenFigs skeleton

<!-- Maintain: any change to a skeleton file (AGENTS.md, .agents/skills/, lib/, scripts/, the
     .figs/ templates) bumps "version" in package.json AND adds an entry here — same commit.
     Newest entry first. -->

Each entry is one **skeleton revision** (the `version` in `package.json`). Your copy is **yours**
(you edit it), so updates are never applied mechanically: the `skeleton-updates` skill finds
unreviewed entries, you discuss them with your user, adopt what fits, note what you skip (and why)
in `MEMORY.md`, then bump your local `version` to mark the review done.

Entry format: **Type** (`fix` · `convention` · `skill` · `breaking`) · **What** · **Why** ·
**Adopt** (how to reconcile into a possibly-edited copy) · **Requires** (paired CLI/app versions).

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
