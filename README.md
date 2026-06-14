# OpenFigs

**A small, open, file-based skeleton for building one back-office AI employee — an agent that owns
a recurring job, learns from its work, and reports to a human through [Figs](https://app.figs.so).**

The agent *runtime* (Claude Code, Codex, opencode) is commoditizing. What doesn't: a good way to
**build** an agent you can trust with a recurring, consequential job, and the **trust layer** that
lets you actually delegate it. OpenFigs is the build side; Figs is the trust layer.

> **OpenClaw, but for enterprise** — *you can see everything.* A focused, single-purpose employee
> you can trust, not one opaque super-agent you install. You **clone** a transparent, file-based
> agent (plain files + prompts you read end to end) and run it on the runtime you already use. Want
> a team? Run one per job and point them at the same Figs workspace — the org chart draws itself.
> Nothing hidden, no risky third-party sprawl; the [Figs](https://app.figs.so) app is the live
> window onto what they're doing.

## Get started

**Requires [Node](https://nodejs.org) ≥ 18.** Scaffold one employee in a line:

```bash
npm create openfigs@latest my-agent
```

That fetches the latest skeleton, wires up the runtime symlink, and runs **`figs init --yes`** — so
your agent has a local identity + activity journal and is ready to work, **no account needed**.
(`npx create-openfigs my-agent` is equivalent — as are `yarn create openfigs` and
`pnpm create openfigs`.) Then:

```bash
cd my-agent
# fill in AGENTS.md (role, mandate, the loop) + .figs/agent.json (your charter)
# work — figs records you locally from day one:
#   figs report / checkpoint / ask / answer / close   (no account needed)
# when your team should see it, connect to Figs:
npx @figs-so/cli@latest login     # opens your browser — sign up & approve
npx @figs-so/cli@latest link      # join a workspace
npx @figs-so/cli@latest push      # appear on the org chart
```

> **One repo = one employee.** A new, distinct job is a **new** agent — run `npm create openfigs`
> again, never copy a folder (a copy carries the original's identity; see `AGENTS.md`). A "fleet"
> isn't a directory of agents — it's a **Figs workspace** that several agents report to.

> **⚠️ Don't "Download ZIP" from GitHub.** This repo uses a symlink (`CLAUDE.md` → `AGENTS.md`) so
> Claude Code, Codex, and opencode all read one source of truth. ZIP export turns it into a broken
> text file; `git clone` and the commands above preserve it (run `npm run fix-symlinks` to repair).

## Philosophy

- **Infra, not dictation** — conventions + guardrails in plain files; *what* the agent does is
  between it and its user.
- **The agent is an employee** — it does the job, learns from its work, keeps its own code clean,
  and reports for sign-off.
- **One employee, one job** — a focused agent beats a sprawling one; a new job is a new agent.
- **Trust via visibility, not prohibition** — agents self-improve and loudly flag what they changed;
  humans sign off on outcomes.
- **Small & in control** — plain files, auditable, no heavy framework. Runtime-agnostic via `AGENTS.md`.

## How it works

- **This repo is one agent** — `AGENTS.md` (its operating guide) + `MEMORY.md` + `SANITY.md` +
  `.figs/` (its charter, contract, and activity journal). Start with [`AGENTS.md`](./AGENTS.md).
- **Account-free from day one** — `figs init` (run by the scaffolder) gives a local identity + a
  work journal; the whole loop (record jobs, raise asks, recover across sessions, validate) runs
  with **no account**. Linking adds the hosted layer — publishing, the org chart, your humans' replies.
- **The fleet is a workspace** — run one agent per job and point them all at the same Figs
  workspace; the org chart groups them by each agent's `department`. You don't nest agents in folders.
- **Runtime-agnostic** — `AGENTS.md` is canonical; `CLAUDE.md` symlinks to it, so Claude Code,
  Codex, and opencode read the same source of truth.

## Report to your human (Figs)

Every agent keeps a **local activity journal** (`.figs/runs.jsonl` · `asks.jsonl` ·
`messages.jsonl` · `artifacts/`) — useful on its own. To give your team a shared, read-only window
— the org chart, what each agent's handling, what's done, and what needs a human — connect to
**[Figs](https://app.figs.so)** (`figs login` → `figs link` → `figs push`). Day to day the agent
records itself with the CLI's verbs — **`figs checkpoint`** (open a job), **`figs report`** (its
outcome), **`figs ask`** (a `question` or `sign-off`), **`figs answer`** (transcribe a human's
reply), **`figs close`** (end an ask, citing the reply) — each pushes itself when linked. The full
verb guide is canonical at **[figs.so/llms.txt](https://figs.so/llms.txt)**. (The CLI is
open source; the app is a hosted product.)

## Running on a schedule

An autonomous employee needs **two schedules** — Figs can't run your agent (it has no reach into the
repo), so this is your job to wire up (cron, launchd, CI, your runtime's scheduler):

- **A work trigger** — what kicks off a run of the agent's actual job (a cron like "monthly close", an
  event, or on-demand).
- **An inbox cadence** — a *separate* scheduled run whose only job is `figs inbox` → act on replies →
  `figs close`. Replies arrive while the agent is away; something has to catch them.

Keep them separate: a run woken for a job should stay on it, and replies still need handling when no
job is running.

## Staying current

A clone is **yours** — you and your agent edit it — so skeleton improvements are never pushed into
it. Instead: `CHANGELOG.md` records every skeleton revision, your `package.json` `version` marks the
last one you reviewed, and `npm run check-skeleton` (the `skeleton-updates` skill — your agent runs
it during upkeep) prints what you haven't seen, so you decide together what to adopt. Humans:
**Watch → Releases** on this repo does the same job.

## The Figs ecosystem

Figs is one stack in three pieces — **build → report → govern**. Land on any repo; here's the whole picture:

| Layer | Repo | License | Role |
|---|---|---|---|
| 🏗️ Build | **[OpenFigs](https://github.com/figs-so/openfigs)** | MIT | build a trustworthy back-office AI employee — conventions + skeleton, runtime-agnostic — **← you're here** |
| 📤 Report | **[`.figs` + CLI](https://github.com/figs-so/figs)** | MIT | the open standard an agent reports its state in |
| 👁️ Govern | **[Figs app](https://app.figs.so)** | hosted | the org chart + handoff inbox humans read |

## Status

Early — **OpenFigs 1.0.0** (figs-spec v2), MIT licensed. Distilled from real, dogfooded agents
(a finance/compliance fleet and a product-analytics fleet).
