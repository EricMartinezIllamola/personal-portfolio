# v2 Architecture Options

**Status:** Analysis and recommendation. Nothing implemented.

Three realistic strategies, assessed honestly, followed by a recommendation and
a stack proposal.

**A note on bias.** The default failure mode of an audit like this is to
recommend rebuilding because rebuilding is more interesting than repairing. I
have tried to argue against that instinct rather than with it — §5 sets out the
strongest case for *not* rebuilding, and §2 takes the incremental option
seriously rather than dismissing it. The conclusion still favours a rebuild, but
for a specific reason that is worth stating up front: **the refactor list and
the rebuild list turn out to be nearly the same list.**

---

## 1. The requirements any option must meet

Derived from the audit and from your stated constraints. An option that cannot
meet these is not viable regardless of its other merits.

| # | Requirement | Source |
|---|---|---|
| R1 | Content is editable without touching components | [audit §3.2](current-project-audit.md) — the reason the site went stale |
| R2 | Three languages, with completeness enforced mechanically | Your decision + 5 of 9 files silently untranslated |
| R3 | Locale in the URL, with `hreflang` | Two of three translations are currently unindexable and unshareable |
| R4 | Every page has a working, shareable, indexable URL | Deep links currently 404 |
| R5 | Real metadata per page — title, description, Open Graph | Currently absent entirely |
| R6 | Maintained build tooling | CRA deprecated February 2025 |
| R7 | Automated, reproducible deployment | Currently manual, and the build fails on Linux |
| R8 | Accessible baseline — alt text, keyboard, contrast, focus | Currently failing across the board |
| R9 | Sensible payload | Currently 13 MB of images and a 777 KB bundle |
| R10 | Finishable and maintainable by one person with a full-time job | The 2023 site stopped mid-translation |

**ASSESSMENT.** R1, R2 and R3 are the discriminating requirements. Every option
can eventually satisfy R4–R9 — those are bug fixes and configuration. R1–R3 are
architectural, and they are where the options genuinely diverge.

---

## 2. Option A — Incremental redesign

**Keep the current architecture. Progressively restyle and repair in place.**

Stay on Create React App and React 18. Keep the eleven components and three page
files. Fix the defects, rewrite the CSS section by section, update the content in
the existing translation JSON files.

### What it would involve

1. Fix the seven concrete defects — deep links (add a `404.html` redirect shim),
   the two 404 resource references, the manifest, the `pentaho.PNG` case bug, the
   9.7 MB image, the duplicate DOM ids, the silent form.
2. Replace `class`/`for` with `className`/`htmlFor` in 180 places.
3. Write alt text for 82 images.
4. Rewrite `index.css` section by section against a new visual language.
5. Rewrite content in place in the existing JSON files.
6. Add a professional experience section as a new component.
7. Add `react-helmet` or equivalent for per-page metadata.

### Advantages

- **Lowest risk of losing something.** The site keeps working throughout; there
  is never a moment where it is half-migrated.
- **Incremental and interruptible.** Each fix is independently shippable. Work
  can stop at any point and leave the site better than before.
- **No learning curve.** Everything is familiar.
- **Fastest route to "not embarrassing".** The seven defects could genuinely be
  fixed in a day, and that day would deliver most of the immediate credibility
  benefit.

### Disadvantages

- **Does not satisfy R1.** Adding a project still means editing `Projects.js`,
  adding a CSS class and editing three translation files. The friction that
  killed the 2023 site survives intact.
- **Does not satisfy R2 or R3 without substantial work.** Putting locale in the
  URL means restructuring routing; enforcing translation completeness means
  building tooling that does not exist.
- **Does not satisfy R6.** CRA remains deprecated. This is a growing liability,
  not a static one.
- **R5 is awkward.** Per-page metadata in a client-rendered SPA is possible but
  second-class — crawlers other than Google see the static `<head>`.
- **The CSS rewrite is not incremental in practice.** `index.css` is globally
  scoped with high specificity chains like `#SoftSkills .accordion
  .accordion-item .accordion-header .accordion-button`. Changing one section's
  styling reliably affects others. "Section by section" is optimistic.

### Technical risks

- **Medium-high: global CSS regression.** No scoping means every change has
  unbounded blast radius, with no tests to catch it.
- **Medium: the toolchain becomes a blocker.** Some future dependency will
  require a build feature CRA cannot provide, forcing the migration anyway — at a
  worse moment.
- **Low: the work is never finished.** Incremental work without a defined end
  state tends to stall. This is exactly what happened to the translations.

### Effort

**Roughly 25–40 focused hours.** One day for the defects, the rest for the
restyle and content.

### What is preserved / discarded

**Preserved:** all components, both stylesheets, routing, the i18n wiring, the
build setup, the deployment process.
**Discarded:** almost nothing.

### Long-term maintainability

**Poor.** This option treats the symptoms and preserves the cause. In two years
the site is on a build tool three years further into abandonment, still requires
a code change to publish a paragraph, and still cannot be indexed in two of its
three languages.

### Verdict

**Not viable as a strategy, but valuable as a tactic.**

**ASSESSMENT.** Option A cannot deliver the 2026 portfolio. It fails R1, R2, R3
and R6 — the requirements that actually matter.

**RECOMMENDATION.** However, a *subset* of Option A is worth doing immediately
and independently of any other decision. See §7: roughly a day of work would fix
the deep-link 404, the 9.7 MB image and the build bug. The site will remain live
for however long v2 takes; there is no reason to leave it visibly broken in the
meantime.

---

## 3. Option B — Refactor, then redesign

**Keep the repository and the React application. Modernise the architecture
first, then implement the new design on top of it.**

Migrate CRA to Vite. Introduce a content layer. Restructure routing to include
locale. Add prerendering for SEO. Then redesign.

### What it would involve

1. Migrate CRA → Vite: remove `react-scripts`, add `vite` and
   `@vitejs/plugin-react`, move `index.html` to the root, update scripts. Well
   documented, typically an afternoon for an app this size.
2. Add TypeScript. Optional but this is the moment.
3. Introduce a content layer — projects as data, project articles as MDX rather
   than JSON strings.
4. Restructure routing for `/:locale/…` paths with a locale-aware layout.
5. Add prerendering. This is the hard part: a Vite React SPA does not prerender
   by default, so this means adding `vite-plugin-ssr`/Vike, `react-router`'s
   framework mode, or a static-render step.
6. Rebuild the styling layer with scoping — CSS Modules, Tailwind, or
   vanilla-extract.
7. Build the translation completeness check.
8. Redesign and rewrite content.
9. Add CI and deployment.

### Advantages

- **Keeps you in React**, which is on your CV and which you already know.
- **The CRA → Vite migration is genuinely low-risk and well-trodden.** Build
  times improve dramatically as a side effect.
- **Can be sequenced** so the site stays deployable between steps.
- **Preserves the repository, history and URL.**
- **Satisfies every requirement** if all nine steps are completed.

### Disadvantages

- **Step 5 is disproportionately painful.** Adding prerendering to a React SPA
  retrofit is the single fiddliest thing in this document. Every option that
  meets R3 and R5 properly needs static output; in Option B this is bolted on,
  whereas in the alternatives it is the default.
- **Steps 3, 4, 6 and 7 are the same work as a rebuild.** Introducing a content
  layer means rewriting every component that renders content — which is all of
  them. Restructuring routing means rewriting `App.js`, `Header.js` and every
  `Link`. Rebuilding the styling layer means replacing both stylesheets.
- **Carrying the old code while working is a cost, not a benefit.** With a global
  stylesheet and no scoping, half-migrated states are genuinely unpleasant.
- **Sunk-cost pressure.** Having decided to "keep" the components, there is real
  psychological pull toward adapting `HardSkills.js` rather than deleting it —
  and it should be deleted.

### Technical risks

- **High: the prerendering retrofit.** The most likely place this stalls. The
  ecosystem here moves quickly and the integrations are less mature than
  purpose-built static generators.
- **Medium: scope ambiguity.** "Refactor then redesign" has no clear boundary.
  Nine sequential steps before any visible improvement is a motivation problem
  for a side project.
- **Low-medium: partial migration.** Steps 1–2 are satisfying and quick; steps
  3–7 are not. A real risk of stopping after the fun part.

### Effort

**Roughly 45–70 focused hours.** Migration 4–8, content layer 8–12, routing and
i18n 8–12, prerendering 6–15 (high variance), styling 10–15, tooling and CI 4–6,
content 10+.

### What is preserved / discarded

**Preserved:** repository, history, React, the Yup schema, project content and
assets, the general idea of the component boundaries.
**Discarded:** CRA, both stylesheets, the internals of every component, the
routing, the i18n loading strategy, the logo wall.

### Long-term maintainability

**Good**, if completed. The end state is a modern, typed, prerendered React app
with a content layer.

### Verdict

**Viable. The main risk is that it is nine steps of infrastructure before
anything looks different, and the largest single step — prerendering — is
retrofitting something the alternatives get for free.**

---

## 4. Option C — Rebuild the shell, harvest the content

**Treat the current `src/` as a content archive. Build a new, content-first
application inside the same repository.**

Not a new repository, not a blank page. A new application directory, with
content deliberately migrated across as the first task.

### What it would involve

1. **Extract content first.** The three project articles from JSON to Markdown,
   the 74 result images, the homepage translations. This is the irreplaceable
   part and it happens before anything else.
2. Scaffold a new content-first static site at the repository root.
3. Define the content model — projects, experience, capabilities — as
   typed collections.
4. Build the layout and the six or seven page templates.
5. Migrate content in, writing the new professional content as it goes.
6. Add the translation completeness check.
7. CI and deployment.
8. Delete `proyecto-frontend/`.

### Advantages

- **Directly satisfies R1.** A content-first generator makes "add a project" mean
  "add a file". This is the requirement the current site fails hardest.
- **R3, R4 and R5 come free.** Locale-prefixed routing, static output, per-page
  metadata and `hreflang` are default behaviour rather than retrofits.
- **No migration state.** Nothing is half-converted; the old site keeps running
  until the new one replaces it.
- **Sheds all the accumulated cruft at once** — Bootstrap, jQuery, the logo wall,
  the vanilla JS, the boilerplate tests, the stray root files.
- **Smaller end result.** The v2 equivalents of these components are genuinely
  shorter — a templated route over a content collection replaces 680 lines of
  hand-written project JSX.
- **The site itself becomes a better work sample** than a repaired 2023 app.

### Disadvantages

- **Content extraction is real, fiddly work.** The project prose uses literal
  `\n \n` as paragraph separators and stores R code in the same string values as
  prose. Roughly 3,000 words across four genuinely-translated files need parsing
  back into structured Markdown. This must not be rushed.
- **A learning curve, if the stack is unfamiliar.** Real, though small for
  someone who knows React and JSX.
- **Loses the incremental safety net.** There is no half-finished v2 worth
  shipping; it is done or it is not.
- **"Rebuild" is a word that invites scope creep.** The temptation to also add a
  blog, a dark mode toggle, and an animated hero is strongest here.
- **Discards genuinely good work,** including the card flip. Worth acknowledging
  even though the flip should not gate the CV.

### Technical risks

- **Medium: scope creep.** The largest risk in this option, and it is a
  discipline problem rather than a technical one. Mitigated by a fixed
  information architecture agreed in advance — which is what
  [v2-information-architecture.md](v2-information-architecture.md) is for.
- **Low-medium: content loss during extraction.** Mitigated by doing extraction
  first, as its own reviewed step, while the old site is untouched.
- **Low: choosing a stack you do not enjoy maintaining.** Mitigated by keeping
  React available for the interactive parts.

### Effort

**Roughly 40–60 focused hours.** Content extraction 6–10, scaffold and content
model 4–6, layout and templates 12–18, content migration and writing 12–20,
i18n tooling 3–5, CI and deployment 2–4.

**ASSESSMENT.** Note this is *less* than Option B, not more. The difference is
step 5 of Option B — the prerendering retrofit — plus the overhead of adapting
components rather than writing them fresh against a content model.

### What is preserved / discarded

**Preserved:** the repository, the full git history, the URL, all project prose,
all 74 result images, the complete homepage translations, the CV, the licence,
the design-token practice, the animation vocabulary.
**Discarded:** all fourteen components and pages, both stylesheets, the routing,
the CRA toolchain, Bootstrap, jQuery, EmailJS, the 25 technology logos, the
vanilla JS, the boilerplate.

### Long-term maintainability

**Best of the three.** Publishing becomes a file operation. Translation gaps
fail the build rather than shipping silently. Deployment is automatic. The
maintenance burden is close to zero when nothing is being added, which is the
realistic steady state.

### Verdict

**Recommended.** See §5 for the argument, including the case against.

---

## 5. Recommendation

### Recommended: Option C, executed inside the existing repository

### The argument

**ASSESSMENT.** The decisive observation is not that the code is old. It is
this: **when you list what Option B must refactor, and what Option C must build,
the two lists are nearly identical.**

| Work item | Option B (refactor) | Option C (rebuild) |
|---|---|---|
| Build tooling | Replace CRA with Vite | Choose a generator |
| Styling layer | Replace both stylesheets | Write new styles |
| Content model | Introduce — rewriting every component | Define up front |
| Routing | Restructure for locale | File-based, free |
| i18n loading | Replace eager imports | Built in |
| Prerendering | **Retrofit — the hard part** | Default |
| Components | Rewrite internals of all 14 | Write ~8 fresh |
| Translation tooling | Build | Build |
| CI/CD | Add | Add |
| Content rewrite | Required | Required |

Every row is shared except one, and that row — prerendering — is *harder* in
Option B. Option B's advantage is supposed to be that it preserves the existing
work. But the table shows there is almost no existing work left to preserve
after the refactor. The components survive in name only.

**ASSESSMENT.** This is corroborated by
[reusability-assessment.md](reusability-assessment.md): every one of the
fourteen components and both stylesheets fall into "probably replace". Nothing
in the code layer is in "definitely reusable". Option B preserves a directory
structure and a set of filenames, not code.

**ASSESSMENT.** The second supporting observation is scale. This is a **small
application** — 1,294 lines of JavaScript and 1,084 lines of CSS. A rebuild is a
handful of evenings, not a quarter. "Rebuild" sounds drastic in proportion to
the phrase; it is not drastic in proportion to this codebase.

**ASSESSMENT.** The third is that the design language is being replaced anyway.
The CSS is bound to fixed-size flip cards, hover-only dropdowns, `100vh`
sections and an orange-on-white palette that fails contrast. Keeping it while
replacing the design it encodes is not a saving.

### Why "inside the existing repository" matters

**RECOMMENDATION.** Same repository, same remote, same history. Specifically:

- Preserves 46 commits documenting how you learned. That record has value and
  costs nothing to keep.
- Preserves the `personal-portfolio` URL and any inbound links.
- The old code stays in history, so nothing is truly lost — `proyecto-frontend/`
  can be deleted in a commit and recovered at any time.
- A fresh repository would look like the project started in 2026, which is less
  honest and less interesting.

**RECOMMENDATION.** Structure the transition as: build the new site at the
repository root alongside `proyecto-frontend/`, then delete `proyecto-frontend/`
in a single clearly-messaged commit once the new site is live.

### The case against rebuilding — taken seriously

**ASSESSMENT.** Three genuine counterarguments, none of which I find decisive
but all of which are honest:

1. **"The site works. It is live and it is not embarrassing."** True, and a
   substantial point. It is a competent-looking site. But it works while saying
   "Junior Data Scientist", with two of six projects behind login walls and
   project pages that 404 on direct access. It works at doing the wrong job.

2. **"A rebuild might not get finished, and a broken v1 beats no v2."** The
   strongest objection, and the 2023 translations are direct evidence of the
   risk. Two mitigations: the old site stays live and untouched until v2 is
   ready, so there is no window of nothing; and the day of quick fixes in §7
   means the live site improves immediately regardless of whether v2 ever ships.

3. **"React is on your CV; rebuilding in something else weakens that."** Fair,
   and it is why the recommendation keeps React for interactive components rather
   than eliminating it. Discussed in §6.

**ASSESSMENT.** If any of these lands harder for you than it does for me — and in
particular if the completion risk feels high given your actual available time —
**Option B is a reasonable choice and I would not argue strongly against it.**
The end states are similar. The difference is mostly about which sequence you are
more likely to finish, and you know that better than I do.

### Confidence

**Moderate-to-high on the strategy** (rebuild rather than refactor): the
overlapping-work-lists argument is fairly robust.
**Moderate on the specific stack** (§6): more than one reasonable answer exists,
and this depends on preferences I do not have visibility into.

---

## 6. Stack proposal

### Recommended: Astro, with MDX content collections, TypeScript, and React islands

**RECOMMENDATION.** The reasoning, mapped to the requirements:

- **Your content is articles.** Three long-form technical write-ups with embedded
  code and images, plus future case studies. Astro's content collections are
  built exactly for this: Markdown/MDX files with typed frontmatter, validated at
  build time. This is R1 solved by default — adding a project is adding a file.
- **Near-zero JavaScript by default.** Astro ships HTML and CSS unless you
  explicitly opt into interactivity. Directly addresses the 777 KB bundle (R9).
  A portfolio is a document; it should not need a runtime to display text.
- **First-class i18n routing.** Locale-prefixed paths, per-locale content
  collections and `hreflang` are supported patterns rather than retrofits.
  Satisfies R2 and R3, the requirements that are hardest everywhere else.
- **Prerendered static output.** Every page is a real file with real metadata.
  R4 and R5 become impossible to get wrong — deep links cannot 404 because the
  files exist.
- **React where it earns its place.** Astro's island architecture lets you write
  genuine React components for the language switcher, any contact form, and —
  relevantly — a future embedded KidSign demo, while everything static stays
  static.
- **Deploys anywhere.** Plain static output, so GitHub Pages, Cloudflare Pages,
  Vercel and Netlify are all equally viable. No lock-in (R7).

**ASSESSMENT — the honest tension.** React is a skill you list, and there is a
real argument that a developer's portfolio should be built in the thing they
claim. Two responses. First, the interactive parts genuinely *are* React, so the
claim stays true. Second, and more importantly: you no longer position primarily
as a frontend developer. You position as a data and integration professional who
can build things end to end. Choosing a tool because it fits the content problem
— rather than because it is the one you already know — is itself the more senior
signal.

**ASSESSMENT — the learning curve is small.** Astro components are HTML with
JSX-like expressions and frontmatter. For someone who knows React, this is days
of familiarity, not weeks.

### Alternatives, fairly assessed

**Next.js with static export.** Entirely reasonable. Keeps you fully in React, has
the largest ecosystem, has mature built-in i18n patterns and excellent MDX
support, and `output: 'export'` produces deployable static files.

*Against:* substantially more framework than a portfolio needs. The App Router,
server components and the client/server boundary are real conceptual overhead
for a static site, and much of it is inert when statically exported. You will
also ship more JavaScript than Astro for the same result.

*Choose this if:* staying entirely in React matters to you, or you expect the
site to grow server-side features later.

**Vite + React + a static-render step.** The minimal-change option, and
effectively Option B's endpoint. Familiar, fast, flexible.

*Against:* you assemble i18n routing, prerendering, content collections and
metadata handling yourself from separate pieces. That is more code you own and
maintain, for a result the other two provide as defaults. The prerendering piece
in particular is the fiddliest part of this whole document.

*Choose this if:* you want maximum control and minimum framework, and enjoy that
kind of assembly.

**Eleventy, Hugo, or plain HTML.** Genuinely worth naming rather than dismissing.
A portfolio is a small static site, and these would all work — Hugo in
particular is extremely fast and has solid multilingual support.

*Against:* no React path at all, which forecloses the KidSign demo embed and
sits oddly with a CV that lists React.

### Summary

| | Astro | Next.js static | Vite + React | Hugo/11ty |
|---|---|---|---|---|
| Content-first | Excellent | Good | Manual | Excellent |
| i18n routing | Built in | Built in | Manual | Built in |
| Prerendering | Default | Default | Retrofit | Default |
| JS shipped | Minimal | Moderate | Moderate | None |
| React available | Islands | Fully | Fully | No |
| Complexity | Low | Medium-high | Medium | Low |
| Learning curve | Small | Medium | None | Medium |

**HUMAN INPUT REQUIRED.** How much does staying entirely in React matter to you?
This is the one input that could flip the recommendation from Astro to Next.js,
and it is a preference rather than a technical question.

### Supporting choices

**RECOMMENDATION.** With lower confidence, and easily overridden:

- **TypeScript.** Worth it for typed content frontmatter alone — it turns "I
  forgot a field on this project" into a build error.
- **Styling.** Either plain CSS with modern features (nesting, custom
  properties, `@layer`) scoped per component, or Tailwind. Plain CSS keeps the
  hand-built character of the original, which has some sentimental and practical
  merit; Tailwind is faster to iterate in and harder to make inconsistent. Either
  is fine. The non-negotiable part is *scoping* — the current global stylesheet
  is what makes any change risky.
- **Images.** Astro's image pipeline handles resizing, format conversion and
  `srcset` automatically. Point it at the 74 result images and R9 largely solves
  itself.
- **No CSS framework.** Bootstrap is not needed. The accordions should be native
  `<details>`/`<summary>`, which removes a JavaScript dependency and is more
  accessible by default.

---

## 7. Recommended sequence

### Phase 0 — Stop the bleeding (about one day, do this regardless)

**RECOMMENDATION.** The current site stays live for however long v2 takes. These
fixes are cheap, are not wasted whichever option is chosen, and remove the most
visible problems immediately:

1. Resize `rstudio.png` — 9.7 MB to roughly 8 KB. Biggest single win in the repo.
2. Fix the `pentaho.PNG` → `pentaho.png` case bug, which unblocks building on
   Linux and therefore any CI.
3. Add a `404.html` redirect shim so deep links stop 404ing.
4. Remove the two dead resource references from `public/index.html`.
5. Change the `<title>` and the hero subtitle so the site stops saying "Junior".
6. Add a meta description and Open Graph tags so shared links look like
   something.
7. Compress the remaining oversized images.

**ASSESSMENT.** Items 5 and 6 are content changes of a few words that
disproportionately affect how the site reads. Item 1 is a single file. There is
no good reason to leave these for v2.

### Phase 1 — Rescue the content (before any building)

1. Extract the three project articles from JSON to Markdown, preserving prose,
   code blocks and image references.
2. Extract the trilingual homepage strings.
3. Inventory and preserve the 74 result images.
4. Commit this as a standalone, reviewable step.

**ASSESSMENT.** Doing this first means the irreplaceable asset is safe before any
decision can put it at risk, and it can be reviewed on its own terms rather than
buried in a larger change.

### Phase 2 — Decide the content

**HUMAN INPUT REQUIRED.** Blocked on you, and worth resolving before building
rather than during. See [v2-vision.md](v2-vision.md) §8 and
[content-audit.md](content-audit.md) §5 — principally the positioning statement,
the professional experience content, and the honest current toolset.

### Phase 3 — Build

Scaffold, content model, layout, templates, then content. Detailed shape in
[v2-information-architecture.md](v2-information-architecture.md).

### Phase 4 — Ship and clean up

CI, deployment, then delete `proyecto-frontend/` in one clearly-messaged commit.

### Phase 5 — KidSign

Separate audit, then integrate as the flagship case study. Explicitly out of
scope for now.

---

## 8. Two things that must be built, not hoped for

### 8.1 The translation completeness gate

**FACT.** The current site's translation failure was invisible to every
automated signal. The five untranslated files have perfect key parity — they are
complete Spanish *copies*, so nothing was missing, nothing warned, nothing broke.

**ASSESSMENT.** This is why "translation discipline" cannot be the answer. The
2023 attempt did not fail from carelessness; it failed because nothing could
detect the failure. Any solution that relies on remembering to check will fail
the same way.

**RECOMMENDATION.** A build-time check that fails on:

1. **Missing keys** — a locale lacking a key another locale has.
2. **Duplicate content across locales** — a non-trivial string byte-identical
   between two locales. This is the check that would have caught the actual
   failure, and it is the one nobody thinks to write.
3. **Missing content files** — a project article existing in one locale and not
   another.

**RECOMMENDATION.** Where a translation genuinely does not exist, the site should
say so explicitly — "this article is available in Spanish" with a link — rather
than silently serving the wrong language. Honest by construction, per
[v2-vision.md](v2-vision.md) §6.

### 8.2 Automated deployment

**FACT.** There is no `.github/` directory. Deployment is `npm run deploy` from a
developer machine, and the build currently fails on Linux.

**RECOMMENDATION.** A GitHub Actions workflow building and deploying on push to
`main`. This removes the "only builds on my machine" problem permanently, and it
is where the translation gate runs.

---

## 9. Hosting

You expressed no preference, so this is assessed on merit.

| | GitHub Pages (current) | GitHub Pages + domain | Cloudflare Pages | Vercel |
|---|---|---|---|---|
| Cost | Free | Domain only | Free | Free tier |
| Custom domain | No | Yes | Yes | Yes |
| Deploy previews | No | No | Yes | Yes |
| Analytics | No | No | Free, privacy-friendly | Paid |
| Subpath problem | Yes | Solved | Solved | Solved |
| Form handling | No | No | Yes | Yes |

**RECOMMENDATION.** **Cloudflare Pages with a custom domain**, with GitHub Pages
plus a custom domain as the low-friction fallback.

The reasoning, in order of weight:

1. **A custom domain is the highest-value change here**, independent of host.
   `ericmartinez.dev` or similar on a CV is materially more professional than a
   `github.io` subpath, and it makes you permanently portable between hosts.
2. **It eliminates the subpath.** The `/personal-portfolio` prefix is what forced
   the hardcoded route strings in seven places in the current code. Serving from
   a domain root removes an entire category of configuration bug.
3. **Deploy previews** let you see a change before it is live, which matters
   when you edit the site rarely and have forgotten the details each time.
4. **Free privacy-respecting analytics** answers a question you cannot currently
   answer at all: does anyone actually visit this?

**ASSESSMENT.** Static output means this decision is reversible at any time —
worth making, not worth agonising over.

**RECOMMENDATION.** If you do move, keep the GitHub Pages URL alive with a
redirect. It may be linked from your LinkedIn or an old CV.

**HUMAN INPUT REQUIRED.** Is `ericmartinezillamola.github.io/personal-portfolio`
linked anywhere that matters? And do you want to register a domain — it is a
small annual cost and the only part of this with a recurring bill.

---

## 10. Summary

| | Option A | Option B | Option C |
|---|---|---|---|
| Meets R1 (content model) | No | Yes | Yes |
| Meets R2/R3 (i18n, URLs) | Barely | Yes | Yes |
| Meets R6 (maintained tooling) | No | Yes | Yes |
| Effort | 25–40 h | 45–70 h | 40–60 h |
| Risk | Low, but wrong target | Medium — prerendering retrofit | Medium — scope creep |
| Maintainability | Poor | Good | Best |
| Preserves history/URL | Yes | Yes | Yes |
| Verdict | Tactic, not strategy | Viable | **Recommended** |

**Recommended path:** Phase 0 immediately (one day, fixes the worst of the live
site). Then Option C — rebuild inside the existing repository, Astro with MDX
content collections and React islands, deployed via GitHub Actions to Cloudflare
Pages on a custom domain.

**The single most important next step** is not technical. It is Phase 2 — the
content decisions in [v2-vision.md](v2-vision.md) §8. The architecture is
solvable in a few evenings by anyone; the positioning and the professional
experience content can only come from you, and no amount of good architecture
compensates for their absence.
