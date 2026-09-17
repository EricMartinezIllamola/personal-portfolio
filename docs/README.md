# Portfolio 2026 — Redesign Documentation

This directory holds the analysis and planning work for the 2026 rebuild of this
personal portfolio. It contains **no application code and no instructions that
have been executed against the app**. Nothing under `proyecto-frontend/` was
created, modified, deleted or upgraded to produce these documents.

The portfolio as it stands was built between July and December 2023. It has not
been touched since. The purpose of this documentation is to understand what is
actually there — honestly, with evidence — before deciding what the 2026 version
should be.

## Reading order

Read these in sequence. Each one assumes the previous.

### Phase 1 — Audit (August 2026)

| # | Document | What it answers |
|---|----------|-----------------|
| 1 | [current-project-audit.md](current-project-audit.md) | What is the current site, technically? What works, what is broken, what is obsolete? |
| 2 | [content-audit.md](content-audit.md) | What does the site *say*, and does it still represent the person who wrote it? |
| 3 | [reusability-assessment.md](reusability-assessment.md) | Of everything that exists, what survives into v2? |
| 4 | [v2-vision.md](v2-vision.md) | What should the 2026 portfolio be *for*? Positioning, audience, tone, principles. |
| 5 | [v2-architecture-options.md](v2-architecture-options.md) | Three realistic ways to get there, with a recommendation. |
| 6 | [v2-information-architecture.md](v2-information-architecture.md) | What sections the new site should have, and why. |

If you only read two, read [content-audit.md](content-audit.md) and
[v2-vision.md](v2-vision.md). The technical problems in this repository are real
but they are solvable in a weekend. The positioning problem is the one that
actually costs you something.

### Phase 2 — Content and positioning (September 2026)

The audit ended with a long list of things only Èric could answer. These three
documents are that conversation. **They are written in Spanish**, unlike the six
above, because they are working material rather than analysis to be read once.

| # | Document | What it answers |
|---|----------|-----------------|
| 7 | [content-interview.md](content-interview.md) | Raw answers: the chronology of three years at Catalonia Hotels & Resorts, told as *what I did*. Written by Èric. |
| 8 | [content-positioning.md](content-positioning.md) | The same material restructured into capabilities, professional patterns, differentiators, candidate positioning statements and a case study shortlist. |
| 9 | [content-interview-2.md](content-interview-2.md) | 17 targeted questions on the gaps that remain. Blocks the drafting of any final content. |

Two things in the phase 1 documents are **superseded** by phase 2 and should be
read with that in mind:

- The case study slot table in
  [v2-information-architecture.md](v2-information-architecture.md) §3.2 reserved
  the flagship position for KidSign. KidSign has since been reclassified as a
  personal project, so the replacement table is in
  [content-positioning.md](content-positioning.md) §8.3.
- The open questions about professional experience in
  [content-audit.md](content-audit.md) §5 and [v2-vision.md](v2-vision.md) §8 are
  largely answered by documents 7 and 8. What is still missing is consolidated in
  [content-positioning.md](content-positioning.md) §10.

## How claims are labelled

Every non-trivial statement in these documents is tagged so you can tell
observation from opinion:

- **FACT** — Observed directly in the repository, in git history, or over HTTP
  against the live site. Verifiable. If a FACT is wrong, the document is wrong.
- **ASSESSMENT** — A technical or professional judgement about what a fact
  means. Reasonable people could disagree.
- **RECOMMENDATION** — A proposed change. Not yet agreed, not yet implemented.
- **HUMAN INPUT REQUIRED** — Something that depends on information only you
  have. Deliberately left blank rather than guessed at.

The phase 2 documents use the same four labels in Spanish — **HECHO**,
**INFERENCIA**, **PROPUESTA** and **PENDIENTE** — with the equivalence stated in
[content-positioning.md](content-positioning.md) §0.

Nothing about your professional experience, your responsibilities at Catalonia
Hotels & Resorts, your achievements or your current tooling has been invented.
Where the documents needed that information and did not have it, they say so.

## Status and scope

- **Current phase:** Content and positioning. Awaiting answers to
  [content-interview-2.md](content-interview-2.md).
- **Phase 1 — Audit:** complete, August 2026.
- **Phase 2 — Content and positioning:** extraction complete, September 2026.
  Second interview pending.
- **Codebase audited:** `main` branch, 46 commits, last commit `6863fa8`
  (2023-12-23).
- **Live site audited:** `https://ericmartinezillamola.github.io/personal-portfolio/`,
  served from the `gh-pages` branch, last deployed 2023-12-23.

Not a single file under `proyecto-frontend/` has been created, modified, deleted
or upgraded across either phase. The live site is still the December 2023 build,
defects included.

### Explicitly out of scope

The `KidSign_Demo` repository has **not** been analysed, modified or integrated.
Phase 2 reclassified it from candidate flagship project to personal project, so
it no longer blocks the shape of the work section — but it still needs its own
look before anything is written about it.

Also out of scope so far: the Phase 0 fixes recommended in
[v2-architecture-options.md](v2-architecture-options.md) §7 (the 9.7 MB image,
the `pentaho.PNG` case bug, the deep-link 404s, the "Junior" title). They remain
worth doing independently of everything else.

## What happens next

1. **Answer [content-interview-2.md](content-interview-2.md)** — 17 questions,
   about half an hour. Everything else is blocked on this.
2. **Close the positioning** — final statement, role label, weighting between
   disciplines, and the three or four case studies to write.
3. **Phase 3 — write the content**, then build. The technical sequence is in
   [v2-architecture-options.md](v2-architecture-options.md) §7.

These documents end with decisions to make, not work already done. The open
questions are collected in
[content-positioning.md](content-positioning.md) §10, split between the ones
that change how the story gets told and the ones that merely complete it.
