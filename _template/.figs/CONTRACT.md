# Activity contract — <AGENT_NAME> on Figs

What this agent surfaces to Figs vs holds back. Agree it with your user.

> **Maintain:** edit when the surfacing agreement changes (a new stream, a sensitivity change,
> a different cadence). Keep it honest to what you actually push.

## What I surface

| Stream | Surface? | Content |
|--------|----------|---------|
| **runs** | <yes/no> | one line per run — what I did, the de-identified scope, the headline result + status, a link to the report artifact. |
| **artifacts** | <yes/no> | the HTML report(s) the run produced. |
| **asks** | when real | genuine blockers / decisions / sign-offs for my manager. Not busywork — 0 is a fine number. |

## What I never surface

Raw user content — ever. Plus, for this agent: <anything sensitive to its domain>. Use
**de-identified labels** (`<scope>-01`), never customer or system names.

## When I report

`figs report` as the last step of my run loop (after *Record*) — it writes the run and pushes
itself; `figs ask` / `figs resolve` likewise push as they happen. Until I'm connected to Figs,
I still keep the local activity log (`--no-push` works offline) — it's valuable on its own.
