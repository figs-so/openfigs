# OpenFigs

**A thin, open, file-based skeleton for building one back-office AI employee — an agent that owns a
recurring job, learns from its work, and reports to a human through [Figs](https://app.figs.so).**

> **OpenClaw, but for enterprise — *you can see everything.*** Deliberately **thin**: you clone a
> transparent, file-based agent (a few plain files + prompts you read end to end) and run it on the
> runtime you already use — not one opaque super-agent you install. Want a team? Run one per job, point
> them at the same Figs workspace, and the org chart draws itself.

## Get started

**Requires [Node](https://nodejs.org) ≥ 18.** Two ways to scaffold one employee:

**1 · You run it** (in your terminal):

```bash
npm create openfigs@latest my-agent
```

**2 · Your agent runs it** — paste this to the coding agent you already use:

```
Set me up a Figs employee — a focused AI agent that owns one recurring job and reports to me.
1. Scaffold it:  npm create openfigs@latest <name>   (name it for the job, e.g. "invoice-recon")
2. cd in, then read the full guide once, end to end:  https://figs.so/llms.txt
3. Fill the charter (AGENTS.md + .figs/agent.json) from what we're building, then delete the
   read-me block at the top of AGENTS.md.
Then tell me what it'll do before it does any real work.
```

Either way, the scaffolder fetches the latest skeleton, wires the runtime symlink, and runs
**`figs init --yes`** — so your agent has a local identity + activity journal and is ready to work,
**no account needed.** When your team should see it: `figs login → link → push` to appear on the org
chart.

> **One repo = one employee.** A new, distinct job is a **new** agent — run `npm create openfigs`
> again, never copy a folder (a copy carries the original's identity). A "fleet" isn't a directory —
> it's a **Figs workspace** that several agents report to.
>
> **⚠️ Don't "Download ZIP"** — this repo uses a symlink (`CLAUDE.md` → `AGENTS.md`) so every runtime
> reads one source of truth; ZIP breaks it. `git clone` and the commands above preserve it.

## Why thin

- **Transparent, not a framework** — plain files you read end to end; nothing hidden, nothing to trust
  blindly.
- **One employee, one job** — a focused agent beats a sprawling one; a new job is a new agent.
- **Trust via visibility** — the agent self-improves and loudly flags what it changed; humans sign off
  on outcomes.
- **Runtime-agnostic** — `AGENTS.md` is canonical; `CLAUDE.md` symlinks to it, so Claude Code, Codex,
  and opencode read the same source.

## How it reports (Figs)

The agent keeps a **local activity journal** from day one (account-free). Connect to
**[Figs](https://app.figs.so)** (`figs login → link → push`) to give your team a read-only window — the
org chart, what each agent's handling, what's done, and what needs a human. The agent records itself
with the CLI verbs (`checkpoint` / `report` / `ask` / `answer` / `close`); the full guide is canonical
at **[figs.so/llms.txt](https://figs.so/llms.txt)**.

## Running on a schedule

Figs can't run your agent — wire it up yourself (cron, launchd, CI). An autonomous employee needs **two
schedules**: a **work trigger** (what kicks off the job) and a **separate inbox cadence** (`figs inbox`
→ act → `figs close`, to catch replies that arrive while it's away).

## Staying current

A clone is **yours** — skeleton improvements are never pushed into it. `CHANGELOG.md` records each
revision; `npm run check-skeleton` (the `skeleton-updates` skill) shows what you haven't reviewed, so
you decide what to adopt. Humans: **Watch → Releases**.

## The Figs ecosystem

Figs is one stack in three pieces — **build → report → govern**. Land on any repo; here's the whole picture:

| Layer | Repo | License | Role |
|---|---|---|---|
| 🏗️ Build | **[OpenFigs](https://github.com/figs-so/openfigs)** | MIT | build a trustworthy back-office AI employee — conventions + skeleton, runtime-agnostic — **← you're here** |
| 📤 Report | **[`.figs` + CLI](https://github.com/figs-so/figs)** | MIT | the open standard an agent reports its state in |
| 👁️ Govern | **[Figs app](https://app.figs.so)** | hosted | the org chart + handoff inbox humans read |
