---
name: skeleton-updates
description: Check whether the OpenFigs skeleton this agent was built from has new upstream revisions, pitch the benefits briefly, and discuss with the user what to adopt. Use during maintenance (a dedicated upkeep session) — never in the middle of a job run.
---

# Skeleton updates — review what's new upstream

The skeleton this agent was built from keeps improving. Your copy is **yours** — you edit it — so
updates are never applied mechanically. Your job is to *review* what changed with your user and
adopt what fits. Adoption is always their call.

## When

During **maintenance** — a dedicated upkeep session, or any time you're not mid-job. **Never during
a job run** — don't detour working into update talk.

## How

1. **Check:** `npm run check-skeleton` (or `node .agents/skills/skeleton-updates/check.mjs`).
   Up to date, or offline → done; say nothing more.
2. **Pitch, briefly.** Behind? Read the printed entries and give your user one or two lines per
   entry, leading with the benefit (*"login now opens the browser — one less onboarding step"*).
   Ask if they're interested in updating.
3. **Discuss each entry — adopt or skip.** Apply only what's agreed. Each entry's `Adopt:` line
   says how; your copy may have diverged, so reconcile by hand — never paste blindly, and mind
   each entry's `Requires:` (CLI/app versions it pairs with).
4. **Close the review:** note skipped entries (and why) in `MEMORY.md`; set `"version"` in
   `package.json` to the upstream version — it means **"reviewed up to here"**, even if you adopted
   nothing.

## Pitfalls

- Don't re-pitch entries your user already declined — the version bump plus the `MEMORY.md` note
  exist precisely so a later session knows the review happened.
- Don't auto-apply, even "obvious" fixes — this repo's self-edit rule applies: flag loudly.
- Don't run this opportunistically mid-job to look proactive; a maintenance session is the moment.
