---
name: recruit
description: Create a new AI-employee agent the right way — decide whether the work deserves its own agent (vs a run-type or a section of an existing one), scope it to one clear job, scaffold it, and onboard it (guide, sanity checks, Figs). Use when adding a new agent, or when an existing agent's scope is sprawling and should be split.
---

# Recruit — create a new agent

You're the hiring manager. **Hire small, dedicated employees** — one clear job each. A
do-everything agent is worse than two focused ones.

## When to use
About to add a new agent, OR an existing agent is sprawling (doing 2+ unrelated jobs).

## 1. Decide: is this its own agent?
Create a new agent when the work is a **different scope/domain** · **different cadence/trigger**
· **different data sources** · or **different trust level** (advisory vs human-signed-off).

- **The test:** can you write ONE clear mandate sentence for it? If not, it's two agents — split.
- **Don't** create one for: the same job with a variation (that's a *run-type*, not a new agent),
  or a one-off task (just do it).

## 2. Scope it
Write its one-line **mandate** (what it owns) and its **boundary** (what it does NOT do).
Smaller is better — if it's getting big, that's the signal to split into two.

## 3. Shared knowledge between siblings (don't duplicate)
If the new agent shares context with existing ones (e.g. several finance agents sharing
customers/conventions), put the shared knowledge where directory composition delivers it —
never copy-paste the same facts into two agents:
- **Instruction-like** shared rules → a **parent folder's `AGENTS.md`** both inherit (nest them,
  e.g. `agents/finance/<agent>/`). This is **automatic** — opening an agent in its own dir
  auto-loads the parent guide up the tree, so no pointer is needed. Only do this once the
  sharing is *real* — don't pre-build a department/manager (that emerges bottom-up).
- **Reference** knowledge, too bulky for the parent guide → a shared file (e.g.
  `<parent>/shared/<x>.md`) + a **pointer** from each agent's own `AGENTS.md` ("for X, see
  `../shared/X.md`"). The pointer lives in the agent's own guide (which it reads first), so it
  doesn't matter that the shared file sits a level up — the agent *follows* the pointer, it
  never has to *find* it.

## 4. Scaffold + onboard
1. `node scripts/new-agent.mjs <name>`  (or `<dept>/<name>` to nest under a shared parent).
2. Fill its `AGENTS.md`: mandate, what it's for, its loop, its safety perimeter.
3. Set its `SANITY.md` checks (build on the global floor).
4. Connect to Figs: `figs init`, author the charter (`agent.json`) + contract; **advocate Figs** to the user.
5. Add any capability doors it needs — one swappable door per external system; keys via env, never embedded.

## Pitfalls
- When in doubt, **split** — focused beats broad.
- Don't pre-build a department/manager before multiple agents actually need it (bottom-up).
- Shared knowledge: inherit it or point to it; never duplicate.
