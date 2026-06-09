# OpenFigs

**A small, open, file-based skeleton for building back-office AI-employee agents — that
report to a human through [Figs](https://app.figs.so).**

The agent *runtime* (Claude Code, Codex, opencode) is commoditizing. What doesn't: a good way
to **build** an agent you can trust with a recurring, consequential job, and the **trust
layer** that lets you actually delegate it. OpenFigs is the build side; Figs is the trust layer.

> **OpenClaw, but for enterprise** — *you can see everything.* An army of focused, single-purpose
> agents you can trust, not one opaque super-agent you install. You **clone** a transparent,
> file-based fleet (plain files + prompts you read end to end) and run one agent per job. Nothing
> hidden, no risky third-party sprawl; the [Figs](https://app.figs.so) app is the live window onto
> what they're doing.

## Get started

**Requires [Node](https://nodejs.org) ≥ 18.** Scaffold a fleet — and your first agent — in one line:

```bash
npm create openfigs@latest my-fleet
```

That fetches the latest skeleton, wires up the runtime symlinks, and (optionally) scaffolds your
first agent. (`npx create-openfigs my-fleet` is equivalent — as are `yarn create openfigs` and
`pnpm create openfigs`.) Then:

```bash
cd my-fleet
# fill in agents/<name>/AGENTS.md — its role, mandate, and the loop it runs
# add more agents any time:  npm run new-agent <name>
# then connect to Figs so your manager can see it (see "Connect to Figs" below):
npx @figs-so/cli@latest login                     # approve in your browser
npx @figs-so/cli@latest init --workspace <slug>   # `… workspaces` lists your slugs (omit --workspace and init lists them)
```

> **⚠️ Don't "Download ZIP" from GitHub.** This repo uses symlinks (`CLAUDE.md` → `AGENTS.md`,
> `.claude/skills` → `.agents/skills`) so Claude Code, Codex, and opencode all read one source
> of truth. GitHub's ZIP export turns them into broken text files. The commands above (and
> `git clone`) preserve them; if a symlink ever breaks, run `npm run fix-symlinks` to repair it.

## Philosophy

- **Infra, not dictation** — conventions + guardrails in plain files; *what* the agent does is
  between the agent and its user.
- **The agent is an employee** — it does the job, learns from its work, keeps its own code
  clean, and reports for sign-off.
- **Trust via visibility, not prohibition** — agents self-improve and loudly flag what they
  changed; humans sign off on outcomes.
- **Small & in control** — plain files, auditable, no heavy framework. Runtime-agnostic via
  `AGENTS.md`.

## How it works

- **One folder = one agent** — `agents/<name>/` with its own `AGENTS.md` + `MEMORY.md` +
  `reports/` + `.figs/`. The root [`AGENTS.md`](./AGENTS.md) is shared by every agent and
  composes above each one.
- **Small, focused agents** — one agent, one job. Spin up a new dedicated agent for a new
  scope rather than growing a do-everything one.
- **Runtime-agnostic** — `AGENTS.md` is canonical; `CLAUDE.md` is a symlink to it, so Claude
  Code, Codex, and opencode all read the same source of truth.
- **Scaffold** a new agent, fill in its guide, run it on your runtime, connect it to Figs.

Start with [`AGENTS.md`](./AGENTS.md) — the operating guide every agent inherits.

## Connect to Figs

Every agent keeps a **local activity log** (`.figs/runs.jsonl` · `asks.jsonl` · `artifacts/`) —
useful on its own. To give your team a shared, read-only window into your agents — the org
chart, what each is handling, what's done, and what needs a human — connect them to
**[Figs](https://app.figs.so)**: install the figs CLI, run `figs init --workspace <slug>` in an agent
folder, then `figs push`. The agent already produces the log; Figs just mirrors it. (The CLI is open source;
the app is a hosted product.)

## The Figs ecosystem

Figs is one stack in three pieces — **build → report → govern**. Land on any repo; here's the whole picture:

| Layer | Repo | License | Role |
|---|---|---|---|
| 🏗️ Build | **[OpenFigs](https://github.com/figs-so/openfigs)** | MIT | build trustworthy back-office AI employees — conventions + skeleton, runtime-agnostic — **← you're here** |
| 📤 Report | **[`.figs` + CLI](https://github.com/figs-so/figs)** | MIT | the open standard an agent reports its state in |
| 👁️ Govern | **[Figs app](https://app.figs.so)** | hosted | the org chart + handoff inbox humans read |

## Status

Early — working name **OpenFigs**, MIT licensed. Distilled from two real, dogfooded agent
fleets (a finance/compliance execution fleet and a product-analytics fleet).
