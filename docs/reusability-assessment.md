# Reusability Assessment

**Audit date:** August 2026

What survives into v2, and in what form. Four buckets, applied across code,
components, styles, assets, content, translations and configuration.

This document assumes nothing about which architecture option is chosen — it
assesses each artefact on its own merits. The architectural decision is in
[v2-architecture-options.md](v2-architecture-options.md).

---

## Bucket definitions

| Bucket | Meaning |
|---|---|
| **DEFINITELY REUSABLE** | Good as-is or with cosmetic edits. Carry forward. |
| **POTENTIALLY REUSABLE** | The idea or content is worth keeping; the current implementation is not. Extract and rewrite. |
| **PROBABLY REPLACE** | Coupled to the old design or architecture. Rewriting is cheaper than adapting. |
| **REMOVE** | No longer provides value. Delete. |

---

## 1. Headline: the ratio

**ASSESSMENT.** Roughly **85% of the value in this repository is content, not
code.** The 925 lines of translation JSON and the 3,000 words of technical
writing inside them are the asset. The 1,294 lines of JavaScript and 1,084 lines
of CSS are scaffolding built to display it, tightly coupled to a visual design
that is being replaced.

This ratio is the single most useful input to the architecture decision. If the
code were the asset, an incremental refactor would be obvious. It is not.

---

## 2. DEFINITELY REUSABLE

### 2.1 The three project articles (prose)

**FACT.** `es/project_1.json`, `es/project_2.json`, `es/project_3.json`, plus
the genuinely Catalan `ca/project_1.json`. Approximately 3,000 words of original
technical exposition, with worked arithmetic and embedded R source.

**ASSESSMENT.** This is the most valuable thing in the repository. It cannot be
regenerated cheaply — it represents real hours of explanation-writing, and the
quality is good. See [content-audit.md](content-audit.md) §4.

**RECOMMENDATION.** Extract to Markdown/MDX before anything else happens. This
is the one migration step that must not be lost, and it is worth doing as a
standalone task independent of the architecture decision. Note the extraction is
mechanical but not trivial: the text uses literal `\n \n` sequences as paragraph
separators and stores R code in the same string values as prose, so both need
parsing back into structured content.

### 2.2 The homepage translations (`index` namespace)

**FACT.** `ca/index.json`, `es/index.json`, `en/index.json` — 75 keys each, all
three genuinely translated and at full key parity.

**ASSESSMENT.** Real, completed translation work. Navigation labels, section
headings, form field labels and button text are all done in three languages.
Much of this vocabulary survives any redesign — "Projects", "Contact",
"Language", "Name", "Email", "Message", "Download PDF" are needed regardless of
what the site looks like.

**RECOMMENDATION.** Carry the *vocabulary* forward even where the structure
changes. Fix the copy errors on the way through: `"Lenguage"`, `"Business
Inteligence"`, `"Data Managment"`, `"Artificial Inteligence"`, `"2nd Semestre"`,
`"daily metting"`, `"tecnologias"`.

### 2.3 The project result images

**FACT.** 74 images across `img_1/` (15), `img_2/` (19) and `img_3/` (21) —
word clouds, confusion matrices, elbow and silhouette plots, cluster
visualisations, console output. Total roughly 556 KB, all reasonably sized.

**ASSESSMENT.** These are the actual outputs of the analyses. They cannot be
regenerated without re-running the R scripts, which may no longer exist. Unlike
the technology logos, these are genuinely irreplaceable.

**RECOMMENDATION.** Preserve all of them. They need alt text written — currently
all 56 rendered ones have no `alt` attribute at all — and conversion to WebP or
AVIF, but the source files must survive.

**HUMAN INPUT REQUIRED.** Do the R scripts still exist? If not, these images are
the only surviving artefact of that work and should be treated accordingly.

### 2.4 The design tokens

**FACT.** Nine CSS custom properties in `:root`, defined identically in both
stylesheets.

**ASSESSMENT.** Not the specific values — the near-black `#16151C` and the two
oranges belong to the old design. What is reusable is the **practice**: define
tokens, use them consistently, never hardcode a colour in a rule. That habit
should carry forward and expand to spacing, type scale and radii.

### 2.5 The MIT licence

**FACT.** `LICENSE`, standard MIT.

**RECOMMENDATION.** Keep unchanged.

### 2.6 The git history

**FACT.** 46 commits documenting six months of genuine iteration.

**ASSESSMENT.** Worth preserving as a record of how you learned, and an argument
for keeping v2 in the same repository rather than starting a fresh one. It costs
nothing to keep and it is mildly interesting to anyone who looks.

**RECOMMENDATION.** Do not rewrite history. Do configure `user.name` and
`user.email` before v2 commits, so new work is attributed — most existing commits
show as `unknown`.

### 2.7 The profile photograph (source)

**FACT.** `img/foto_perfil.jpg`, 749.8 KB.

**ASSESSMENT.** The file is 40× larger than it needs to be for a 98×140px
display, but the photograph itself is a content asset.

**RECOMMENDATION.** Keep the image, resize and re-encode it. Consider whether a
more recent photo is warranted — this one is at least three years old.

---

## 3. POTENTIALLY REUSABLE

### 3.1 The i18n *architecture* — but not its implementation

**ASSESSMENT.** Three design decisions here were correct and should survive:
namespacing translations per page rather than one giant file; keeping strict key
parity across locales; and separating translation content from component code.

**ASSESSMENT.** Three decisions must change: eager-loading all 12 files into the
main bundle; storing locale only in `localStorage` instead of the URL; and
relying on human discipline to keep translations complete — which demonstrably
failed, since five of nine project files are untranslated Spanish and nothing
detected it.

**RECOMMENDATION.** Reuse the concept, replace the mechanism. Critically, add a
**build-time completeness check** that fails the build when a locale file is
missing keys *or* is byte-identical to another locale's content. That second
check is the one that would have caught the actual failure — the files were never
missing keys, they were duplicates. See
[v2-architecture-options.md](v2-architecture-options.md).

### 3.2 The card-flip interaction

**FACT.** `.total_card` / `.perfil_card` / `.card_backside` in `index.css` lines
313–425 — a hand-written 3D flip using `transform-style: preserve-3d`,
`backface-visibility` and a `rotateY(-180deg)` transition, plus a secondary
slide-out panel.

**ASSESSMENT.** The most accomplished CSS in the project and a genuine piece of
craft. But it is built on fixed 350×400px dimensions with absolutely positioned
text at hardcoded offsets, which is why it cannot hold translated content
safely, and it hides the CV download behind three clicks.

**RECOMMENDATION.** Keep the technique in your pocket, not on the About section.
If a flourish like this is wanted in v2, apply it somewhere it does not gate
important information — and rebuild it fluid rather than fixed. As the primary
route to your CV, it is actively harmful.

### 3.3 The form validation schema

**FACT.** A four-field Yup schema in `Contact.js` lines 9–14, wired through
`@hookform/resolvers`.

**ASSESSMENT.** The right pattern — declarative, schema-driven validation rather
than hand-rolled regex. The specific schema needs work: `motivo` should probably
go, `email` should use `type="email"`, and the messages must be translated
rather than falling back to Yup's English defaults.

**RECOMMENDATION.** Reuse if a form is kept. But first decide whether a form is
wanted at all — see [content-audit.md](content-audit.md) §2.6.

### 3.4 The animation vocabulary

**FACT.** 700ms nav underline scale-in, 500ms card reveal, 500ms floating
labels.

**ASSESSMENT.** Consistent timing and restrained easing. The *durations* are on
the slow side for 2026 taste — 700ms for a hover underline is sluggish — but the
discipline of a shared vocabulary is right.

**RECOMMENDATION.** Rebuild with a tightened scale (150–300ms for micro-
interactions), and this time include a `prefers-reduced-motion` block, which is
currently absent entirely.

### 3.5 The section rhythm and palette discipline

**ASSESSMENT.** Alternating light and dark full-width sections with consistent
`11vh` top padding gives the current site a coherent vertical rhythm. The
mechanism (`vh` units, fixed `100vh` sections) is broken on mobile, but the
underlying idea of a consistent, generous section rhythm is worth keeping.

### 3.6 The CV PDF

**FACT.** `public/CV_Èric Martínez.pdf`, 565 KB, last committed December 2023.

**ASSESSMENT.** The artefact is essential; this specific file is almost certainly
outdated.

**RECOMMENDATION.** Replace with a current CV. Rename to remove the space and
the non-ASCII character — `eric-martinez-cv.pdf` — which fixes the URL-encoding
fragility described in [current-project-audit.md](current-project-audit.md) §3.4.

---

## 4. PROBABLY REPLACE

### 4.1 All eleven components and all three pages

**FACT.** `App`, `Header`, `Main`, `Home`, `Expand_Home`, `About`, `HardSkills`,
`Projects`, `SoftSkills`, `Contact`, `Footer`, `Project_1`, `Project_2`,
`Project_3`.

**ASSESSMENT.** None of these is reusable, for a consistent reason: they are not
components, they are hardcoded markup for one specific design. `Projects.js`
repeats an identical card block six times with no data layer. The three project
pages are 680 lines of hand-written JSX that would be one templated route over a
content collection. `HardSkills.js` is 25 hardcoded `require()` calls padded with
15 empty spacer divs.

**ASSESSMENT.** There is no `Card`, no `Section`, no `Button`, no `Layout` — no
abstraction to carry forward. Rewriting is not just cheaper than adapting, it is
substantially cheaper: the v2 equivalents are shorter than the originals.

**RECOMMENDATION.** Replace all. Read them for content and structure, then
delete.

### 4.2 Both stylesheets

**FACT.** `index.css` (998 lines), `project_A.css` (86 lines).

**ASSESSMENT.** Coupled to the old design at every level — fixed pixel card
dimensions, absolutely positioned card text, hover-only dropdowns, `100vh`
sections with `overflow: hidden`, positional class names like `img_P1_14`,
globally hidden scrollbars, an orange-on-white heading colour failing WCAG AA at
roughly 2:1, and `* { font-family: Garamond }` with no fallback stack.

**ASSESSMENT.** Fixing these individually would mean rewriting most of the file
while retaining its structure — which is the worst of both options.

**RECOMMENDATION.** Replace. Salvage the token *practice* (§2.4), the animation
*vocabulary* (§3.4) and the section rhythm *idea* (§3.5); discard the rules.

### 4.3 Routing

**FACT.** `BrowserRouter` with four routes, each hardcoding the
`/personal-portfolio/` prefix, plus `react-router-hash-link` for anchor
scrolling.

**ASSESSMENT.** Broken in production — deep links 404 (see
[current-project-audit.md](current-project-audit.md) D1) — and welded to the
GitHub Pages subpath in seven places. It also has no notion of locale, which the
three-language requirement now demands.

**RECOMMENDATION.** Replace with file-based routing that includes locale in the
path (`/en/…`, `/es/…`, `/ca/…`) and prerenders to real files, which eliminates
the 404 class of bug entirely.

### 4.4 The technology logos

**FACT.** 25 logo images in `img/`, totalling roughly 12.6 MB — dominated by
`rstudio.png` at 9.9 MB.

**ASSESSMENT.** Both the assets and the concept should go. The logo wall is an
inventory that omits your current toolset, and it is invisible to screen readers.
See [content-audit.md](content-audit.md) §2.3.

**RECOMMENDATION.** Delete the images. If v2 uses any technology icons at all,
use an icon font or SVG set rather than committing PNG logos — every one of these
is a third-party trademark stored as a bitmap at the wrong resolution.

### 4.5 Bootstrap and the grid

**FACT.** Bootstrap 5.3.0 CSS and JS loaded from CDN, used for the 12-column
grid in three components and the accordion component on four pages.

**ASSESSMENT.** Bootstrap is doing very little here. The grid usage is simple
enough for CSS Grid or Flexbox; the accordions are `<details>`/`<summary>` in
disguise, and using the native element would remove the JavaScript dependency
entirely and be more accessible by default.

**RECOMMENDATION.** Drop Bootstrap. This removes two render-blocking CDN
requests, the jQuery-adjacent baggage, and the `data-bs-*` attribute soup that
makes the project pages hard to read.

### 4.6 EmailJS integration

**FACT.** `@emailjs/browser` with hardcoded service, template and public key
identifiers.

**ASSESSMENT.** Works, but it is a third-party SaaS dependency for a form with
no feedback, no spam protection and untranslated errors.

**RECOMMENDATION.** Reconsider from first principles rather than porting. A
`mailto:` link has no dependency and no failure mode. If a form is genuinely
wanted, a modern static host provides form handling natively with spam filtering
included.

### 4.7 Build and deployment configuration

**FACT.** `react-scripts` 5.0.1, `gh-pages` CLI deployment, `browserslist`
config, CRA `eslintConfig`, `homepage` field.

**ASSESSMENT.** CRA is deprecated with no maintainers. Deployment is manual from
a developer machine and cannot be automated without first fixing the
case-sensitivity build bug.

**RECOMMENDATION.** Replace wholesale, and add a CI workflow — the repository has
no `.github/` directory at all.

---

## 5. REMOVE

Delete outright. No value in any architecture.

| Artefact | Size | Why |
|---|---|---|
| `src/js/index.js` | 3.7 KB | Pre-React vanilla validation. Dead three ways: not imported, loaded only via a 404ing script tag, superseded by React Hook Form. Contains implicit globals that would throw under strict mode, and a copy-paste bug where three validators set the same flag. |
| `src/js/temp` | 0.4 KB | Four commented-out lines of scratch notes. |
| `src/logo.svg` | 2.6 KB | CRA boilerplate, unreferenced. |
| `src/App.test.js` | 246 B | CRA boilerplate asserting a "learn react" link. Imports `./App`, which does not exist at that path — the test cannot even resolve. |
| `src/reportWebVitals.js` | 362 B | Called with no callback, so it measures and discards. |
| `src/setupTests.js` | 241 B | CRA boilerplate for tests that do not exist. |
| `src/img/rstudio.png` | 9.9 MB | A 9.7 MB PNG for a 50px logo. The single worst asset in the repository. |
| `src/img/pentaho.png` | 49.6 KB | Orphaned — the code references `pentaho.PNG`, which does not exist. |
| `src/img/javascript.png` | 43.6 KB | Superseded by `javascript2.png`. |
| `src/img/django.png` | 5.5 KB | Never referenced. Django is not claimed as a skill. |
| `src/img/sunset.jpg` | 259.6 KB | Decorative stock-style backdrop for the contact form. |
| `src/img/linkedin.png`, `github.png` | 45 + 22 KB | Social icons as bitmaps. Use SVG. |
| `public/manifest.json` | — | "Create React App Sample", referencing three icons that were deleted in `cf4695f` and 404 live. Rewrite from scratch, do not edit. |
| `public/index.html` | — | Contains two resource references that 404 on every page load, a hardcoded `lang="es"`, an unused jQuery tag, and a `<title>` saying "Junior Data Scientist". |
| Root `package.json` | 87 B | Stray artefact of an `npm install` in the wrong directory, added in `ffc7cf6`. Two dependencies, no name, no scripts. |
| Root `package-lock.json` | 17 KB | Lockfile for the above. |
| `proyecto-frontend/README.md` | 3.4 KB | Unmodified CRA template. |
| Root `README.md` | 1 byte | Empty. Replace with real content. |
| `contact.error.*` keys | 33 strings | Hand-written across three locales, never referenced by any code. |
| `footer: {}` | — | Empty namespace in all three locales. |
| 5 untranslated project files | ~600 lines | `en/project_1`, `ca/project_2`, `en/project_2`, `ca/project_3`, `en/project_3` are Spanish duplicates. They are not translations and keeping them perpetuates the illusion that they are. Delete and re-translate from the Spanish source, or leave the locale genuinely absent with an explicit fallback notice. |
| `Expand_Home.js` | 8 lines | An empty section used as a spacer. Spacing is a styling concern. |

**ASSESSMENT on the untranslated files.** These are worth deleting rather than
keeping as placeholders precisely because they are *silently* wrong. A missing
file produces a visible fallback; a Spanish file labelled English produces a page
that looks fine and is not. Removing them converts an invisible failure into a
visible one, which is strictly better.

---

## 6. Summary by category

| Category | Definitely reusable | Potentially reusable | Probably replace | Remove |
|---|---|---|---|---|
| **Code** | — | Yup schema | All 14 components/pages, routing, i18n wiring | `js/index.js`, `js/temp`, tests, `reportWebVitals` |
| **Styles** | Token practice | Animation vocabulary, section rhythm, flip technique | Both stylesheets in full | Hidden scrollbars, `100vh` sections, Garamond rule |
| **Assets** | 74 project result images, profile photo | CV PDF (needs refresh) | — | 25 tech logos (12.6 MB), sunset backdrop, social PNGs, `logo.svg` |
| **Content** | 3,000 words of project prose | Section vocabulary | Project selection and framing | Soft Skills section, UOC module list |
| **Translations** | `index` namespace ×3 | Namespacing concept, key-parity discipline | Eager loading, `localStorage`-only locale | 5 duplicate files, `contact.error.*`, `footer: {}` |
| **Config** | `LICENSE`, git history | — | Build tool, deployment, ESLint, browserslist | Root `package.json`/lock, `manifest.json`, both READMEs |

---

## 7. What this implies

**ASSESSMENT.** Reading down the table, a pattern is clear. Almost everything in
the **content** and **assets** rows survives. Almost nothing in the **code** and
**config** rows does. The styles row is split — the *practices* survive, the
*rules* do not.

**ASSESSMENT.** This is the strongest available argument about architecture, and
it points in one direction: the sensible move is to preserve the content
deliberately and rebuild the shell, rather than to refactor a shell whose every
component is on the replace list. That argument is developed properly, with
counterarguments, in
[v2-architecture-options.md](v2-architecture-options.md).

**RECOMMENDATION — regardless of which option is chosen.** Extract the project
prose to Markdown as a standalone first task. It is the irreplaceable asset, the
extraction is fiddly enough to deserve its own attention, and doing it first means
no subsequent decision can put it at risk.

---

## HUMAN INPUT REQUIRED

1. **Do the R scripts and Streamlit repositories still exist?** If not, the 74
   result images are the only surviving artefact of those projects and their
   preservation priority rises accordingly.
2. **Is the December 2023 CV PDF still accurate,** or is there a current one?
3. **Is the profile photograph still current,** or worth retaking?
4. **Should the three untranslated project pages be re-translated, or should the
   archive be Spanish-only with a clear notice?** Re-translating roughly 2,000
   words × 2 languages is real work; an explicit "this article is available in
   Spanish" notice is honest and free.
5. **Is the `/personal-portfolio` URL linked anywhere that matters** — LinkedIn,
   CV, email signature? This determines whether the path must be preserved or
   can be improved.
