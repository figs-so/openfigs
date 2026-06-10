---
name: skeleton-updates
description: Check whether the OpenFigs skeleton this fleet was built from has new upstream revisions, pitch the benefits briefly, and discuss with the user what to adopt. Use during fleet upkeep at the repo root — recruiting, maintenance, development sessions — never in the middle of an agent's job run.
---

# Skeleton updates — review what's new upstream

The skeleton this fleet was built from keeps improving. Your copy is **yours** — agents edit it —
so updates are never applied mechanically. Your job is to *review* what changed with your user and
adopt what fits. Adoption is always their call.

## When

During **fleet upkeep at the root**: recruiting a new agent, maintaining fleet rules, or a
development session. **Never during an agent's job run** — don't detour a working agent into
update talk.

## How

1. **Check:** `npm run check-skeleton` (or `node .agents/skills/skeleton-updates/check.mjs`).
   Up to date, or offline → done; say nothing more.
2. **Pitch, briefly.** Behind? Read the printed entries and give your user one or two lines per
   entry, leading with the benefit (*"login now opens the browser — one less onboarding step"*).
   Ask if they're interested in updating.
3. **Discuss each entry — adopt or skip.** Apply only what's agreed. Each entry's `Adopt:` line
   says how; your copy may have diverged, so reconcile by hand — never paste blindly, and mind
   each entry's `Requires:` (CLI/app versions it pairs with).
4. **Close the review:** note skipped entries (and why) in `MEMORY.md`; set `"version"` in the
   root `package.json` to the upstream version — it means **"reviewed up to here"**, even if you
   adopted nothing. Optionally raise a Figs `fyi` ask summarizing what changed.

## Pitfalls

- Don't re-pitch entries your user already declined — the version bump plus the `MEMORY.md` note
  exist precisely so a later session knows the review happened.
- Don't auto-apply, even "obvious" fixes — this repo's self-edit rule applies: flag loudly.
- Don't run this opportunistically mid-job to look proactive; fleet upkeep is the moment.
