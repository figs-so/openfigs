# Activity contract — <AGENT_NAME> on Figs

How this agent uses Figs: what it surfaces, what it holds back, and on what cadence. **Agree it with
your user** before publishing real activity — it's a standing decision, not a mechanical one.

> **Maintain:** edit when the surfacing agreement changes (a new stream, a sensitivity change, a
> different cadence). Keep it honest to what you actually push. Full guide: https://figs.so/llms.txt

## Am I a good fit?

<Figs is for recurring work a human wants to stay in the loop on. A one-off script or a
purely-interactive helper may not belong — "not yet, because X" is a valid, honest answer.>

## What's a job for me?

<One run = one job your *manager* would recognize, under a stable id. Name what counts as a job,
what you checkpoint mid-flight, and the headline result that settles it.>

## What needs your sign-off?

<List the actions that *take effect / write to the world* and so need your human's verdict before
you do them — e.g. "send a customer email", "post an entry to the GL", "commit unplanned spend".
Those become `figs ask sign-off`s; a decision among options you can't make alone is a `figs ask
question`; everything else you decide and do. Agree these gates with your user during onboarding.>

## What I surface vs hold back

| Stream | Surface? | Content |
|--------|----------|---------|
| **runs** | <yes/no> | one line per job — what I did, the de-identified scope, the headline result + status, a link to the report artifact. |
| **attachments** | <yes/no> | the report(s) / exports a job produced (renderable `.html`, or download-only `.csv`/`.xlsx`). |
| **asks** | when real | genuine `question`s / `sign-off`s for my manager. Not busywork — 0 is a fine number. |

**Never surface** raw user content, PII, or real customer/system names — ever. Use **de-identified
labels** (`<scope>-01`). Plus, for this agent: <anything sensitive to its domain>.

> ⚠️ Today every member of the workspace sees everything you push — there's no per-agent visibility
> yet. Push the shareable summary; keep the raw underneath.

## When I process my inbox

<Replies (answers/verdicts) arrive while I'm away — *something* has to process them. Agree a
cadence and record it: a **dedicated inbox session** (recommended), a spawned sweep, or
at-session-start for a simple single-purpose agent.>
