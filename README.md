# OpenFigs

**A small, open, file-based skeleton for building back-office AI-employee agents — that
report to a human through [Figs](https://app.figs.so).**

The agent *runtime* (Claude Code, Codex, opencode) is commoditizing. What doesn't: a good way
to **build** an agent you can trust with a recurring, consequential job, and the **trust
layer** that lets you actually delegate it. OpenFigs is the build side; Figs is the trust layer.

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
  `reports/` + `.figs/`. The root [`AGENTS.md`](./AGENTS.md) composes above every agent.
- **Scaffold** a new agent, fill in its guide, run it on your runtime, connect it to Figs.

Start with [`AGENTS.md`](./AGENTS.md) — the operating guide every agent inherits.

## Status

Early — working name **OpenFigs**, MIT licensed. Distilled from two real, dogfooded agent
fleets (a finance/compliance execution fleet and a product-analytics fleet).
