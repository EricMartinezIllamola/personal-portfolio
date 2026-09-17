# Content Audit — Positioning, Sections and Projects

**Audit date:** August 2026
**Content source:** `src/translations/{ca,es,en}/*.json` and the JSX that renders it
**Content last modified:** 2023-12-22 (commit `4a3e33c`)

This document assesses what the portfolio *says*, as opposed to how it is built.
The technical findings live in [current-project-audit.md](current-project-audit.md).

---

## 0. The headline finding

**FACT.** The site describes its owner as a **"Junior Data Scientist"** in four
places: the browser tab title, the hero `<h3>`, the About card body text, and
the footer.

**FACT.** There is **no professional experience section anywhere on the site**.
No employer, no job title, no dates of employment, no description of
responsibilities, no outcomes. The word "Catalonia" does not appear in any of the
12 translation files.

**FACT.** Every piece of biography on the site is educational: a Chemistry degree
(UB, July 2021), a postgraduate certificate (UOC, July 2023), and a bootcamp
(Fundació Esplai, September 2023).

**FACT.** All six showcased projects are academic coursework, bootcamp exercises
or hackathon output. None is professional work.

**ASSESSMENT.** The portfolio is not a slightly stale version of your current
professional identity. It is an accurate and well-executed description of a
**different person** — a career-changer in late 2023 who had just finished
retraining and had not yet started working in the field.

That framing is worth being blunt about. The most damaging thing on this site is
not the 9.7 MB image or the broken deep links. It is that a recruiter who reads
it carefully comes away believing you have zero professional experience, because
the site never says otherwise. Three years of work at Catalonia Hotels & Resorts
— the single most valuable thing you have to communicate — is entirely absent.

**ASSESSMENT.** There is a second-order effect worth naming. Because the site
claims "Junior" while linking to a LinkedIn profile that presumably says
otherwise, the two artefacts contradict each other. A stale portfolio that
undersells you is worse than no portfolio, because it actively argues against
your CV.

---

## 1. Positioning analysis

### What the site currently communicates

Reading the site as a stranger would, in order, the narrative is:

1. **Hero** — "Èric Martínez / Junior Data Scientist". A name and a seniority
   label. No specialism, no employer, no location, no value proposition.
2. **About** — A flip card. Front: two degrees and "Data, cheese and dogs lover
   [...] currently living in La Garriga, Barcelona". Back: the full curriculum of
   the UOC postgraduate, module by module. Then a third panel: the bootcamp.
3. **Hard Skills** — 25 technology logos in five unlabelled-by-item rows.
4. **Projects** — Six cards. Three R coursework articles, one hackathon
   notebook, two Streamlit demos.
5. **Soft Skills** — Two accordions explaining what studying at UOC taught about
   time management, and what a bootcamp taught about Scrum.
6. **Contact** — A four-field form.

**ASSESSMENT.** The centre of gravity of this content is *what I have studied*.
A professional portfolio's centre of gravity should be *what I have built and
what changed as a result*. The site is organised around credentials, not
outcomes.

**ASSESSMENT.** The UOC module list is the clearest example. Listing
"Fundamentals of Business Intelligence", "Fundamentals of Data Science" and
"Fundamentals of Big Data" as individual bullet points is what you do when the
coursework *is* the achievement, because there is nothing else yet. With three
years of professional work behind you, a module list actively subtracts — it
draws attention to the fact that the strongest thing on offer is a syllabus.

**ASSESSMENT.** The word "Fundamentals" appears three times on a page intended
to establish expertise.

### The seniority signal, itemised

**FACT.** Specific elements that read as junior:

| Element | Text | Why it signals junior |
|---|---|---|
| `<title>` | "Èric Martínez - Junior Data Scientist" | Self-declared junior in the tab and in every search result |
| `home.h3` | "Junior Data Scientist" | The largest positioning statement on the page |
| `about.front.p1` | "Junior Data Scientist, currently living in La Garriga" | Repeats it |
| Footer | Renders `home.h3` again | Repeats it a third time |
| `about.back.*` | Nine bullets of postgraduate module names | Coursework as the main evidence |
| `about.card.l3` | "+500 hours" bootcamp | Hours studied is a student metric |
| `soft.p1` | "UOC's methodology is based on delivering projects every X time" | Explains what university taught about deadlines |
| `soft.p2` | "The final project of the Fundació Esplai's bootcamp [...] carried out in groups of 3 people" | A three-week group exercise presented as teamwork evidence |
| `projects.*` | Six projects, all academic or bootcamp | No professional work |

**ASSESSMENT.** Individually, most of these were correct and honest in 2023.
Collectively, in 2026, they establish a consistent and wrong impression.

### What is missing entirely

**FACT.** Absent from the site:

- Any employer, role or employment date.
- Any description of professional responsibilities.
- Any outcome, impact or scale ("I built X, which did Y for Z users/rows/euros").
- Any mention of Microsoft Fabric, PySpark, or any tool from the current role.
- Any indication of *when* anything happened — the site has no timeline and no
  "last updated" signal, so a visitor cannot tell whether it is current.
- A visible email address. Contact is form-only.
- Any writing that is not either a project tutorial or a credential.

**ASSESSMENT.** The missing timeline deserves emphasis. Nothing on the site
carries a date later than September 2023, but nothing says so either. A visitor
must infer staleness from the content itself — which means the most likely
reading is not "this is out of date" but "this is who he is".

---

## 2. Section-by-section classification

### 2.1 Hero (`Home` + `Expand_Home`) — **REWORK**

**FACT.** Renders `<h1>` "Èric Martínez" and `<h3>` "Junior Data Scientist",
above an animated circular button that scrolls to About. `Expand_Home` is an
empty 20vh spacer section.

**ASSESSMENT.** The visual treatment is striking and the animation is
well-executed. The *content* is close to empty: after five seconds a visitor
knows your name and that you consider yourself junior. No specialism, no current
role, no reason to keep scrolling.

**ASSESSMENT.** The animated circle is also an unlabelled control. It looks
decorative, and a visitor may not realise it is the primary call to action.

**RECOMMENDATION.** Keep the idea of a confident, uncluttered opening. Replace
the content with a one-line positioning statement that answers "who is this and
why should I read on" — current role, employer, domain, and the two or three
technologies that actually define your work. Add explicit primary and secondary
actions rather than an ambiguous circle. Merge `Expand_Home` away; spacing is a
styling concern, not a component.

**HUMAN INPUT REQUIRED.** The exact wording depends on how you want to describe
your current role, which only you can supply. See §5.

---

### 2.2 About (`About`) — **REWORK**

**FACT.** A 350×400px card that flips on click to reveal education detail, then
slides aside to reveal a third panel with the bootcamp and the CV download.

**FACT.** Front content: two degree titles, plus `"Data, cheese and dogs lover.
Junior Data Scientist, currently living in La Garriga, Barcelona."`

**FACT.** Back content: the UB Chemistry degree with date, the UOC postgraduate
with date, and nine bullets naming its two specialisations and six modules.

**FACT.** Third panel: the Fundació Esplai bootcamp ("+500 hours", September
2023), two bullets naming its two tracks, and buttons for CV / LinkedIn / GitHub.

**ASSESSMENT.** The interaction is the most technically impressive thing on the
site — a hand-written 3D card flip with a secondary slide-out, no library. It is
also the wrong container for this information. Three sequential clicks are
required to reach the CV download, and nothing on the card indicates it is
clickable. A recruiter with 40 seconds will not find the third panel.

**ASSESSMENT.** "Data, cheese and dogs lover" is the only sentence on the entire
site with a human voice, and it is genuinely good — it is the one moment the
portfolio sounds like a person. It is buried on the front of a card, in a
paragraph that immediately undercuts it with "Junior Data Scientist".

**FACT.** The personality does not survive translation: the Spanish and Catalan
versions mention only cheese. The dogs exist only in English.

**RECOMMENDATION.** Split this into two things. A short, prose About section
with a real voice, kept deliberately human — and a separate, scannable
Experience/Education timeline where employment comes first and education is
compressed to institution, qualification and year. Cut the nine module bullets
entirely. Make the CV a persistent, one-click action, not a reward for
discovering a third panel.

**RECOMMENDATION.** Keep the personal register. Decide on one version of it and
translate that version properly into all three languages.

**HUMAN INPUT REQUIRED.** Whether you still want the informal note, and whether
"cheese and dogs" still represents you.

---

### 2.3 Hard Skills (`HardSkills`) — **REWORK** (as a concept), **REMOVE** (as built)

**FACT.** 25 technology logos in five rows:

| Row label | Logos |
|---|---|
| Data Mining | Power BI, "Machine Learning", Python, RStudio, Visual Studio |
| Databases | SQL Server, MySQL, MongoDB, Neo4j |
| ETL and Data Management | Pentaho, Alteryx/Trifacta, Collibra |
| Web Development | HTML5, CSS3, JavaScript, React, Bootstrap, Node.js, jQuery |
| Big Data, Cloud and GitHub | Hadoop, Spark, AWS, Azure, Google Cloud, GitHub |

**FACT.** There is no proficiency indication, no context, no recency and no
distinction between "used daily in production" and "covered in one postgraduate
module".

**ASSESSMENT.** This is an inventory, not a capability statement. A logo wall
tells a technical reader nothing they can act on: it does not distinguish the
tools you would be productive in on day one from the ones you touched once in
2022. The implicit claim — 25 technologies, equal weight — is not credible for
anyone, which means an experienced reader discounts the whole section.

**ASSESSMENT.** Several entries actively work against you now:

- **jQuery** alongside React signals a 2015 skill set.
- **Hadoop** is largely legacy in 2026 and sits oddly next to Spark.
- **"Machine Learning"** is not a technology and has a logo standing in for a
  discipline.
- **Visual Studio** is an IDE, listed as a data mining skill.
- **Pentaho, Alteryx/Trifacta, Collibra** are enterprise tools that read as
  course exposure unless backed by real usage.
- **AWS, Azure and Google Cloud** all three, at equal weight, is the classic
  junior tell. Nobody is equally competent in three clouds.

**ASSESSMENT.** More damaging than what is listed is what is not. **Microsoft
Fabric, PySpark and the rest of your current daily toolset do not appear
anywhere on this site.** The skills section describes the tools you learned in
2023, not the ones you have spent three years using.

**FACT.** The section is also invisible to screen readers — all 25 logos carry
`alt=''`, so there is no text alternative at all. See
[current-project-audit.md](current-project-audit.md) §8.1.

**RECOMMENDATION.** Remove the logo wall. Replace it with grouped, honest,
text-first capability statements that distinguish depth from familiarity —
something a reader can calibrate against. Fewer entries, each meaning more.
Order by what you actually do now, not by what you studied.

**HUMAN INPUT REQUIRED.** Your real current toolset and honest proficiency
levels. This cannot be inferred and will not be guessed. See §5.

---

### 2.4 Projects (`Projects` + three project pages) — **REWORK**

Covered in detail in §3. Summary: the long-form writing is the best content
asset on the site and should be preserved; the selection and framing should
change substantially.

---

### 2.5 Soft Skills (`SoftSkills`) — **REMOVE**

**FACT.** Two Bootstrap accordions:

1. *"Time management, Perseverance and Autonomy — UOC"*, explaining that UOC's
   methodology involves delivering projects on a schedule and that this taught
   organisation and perseverance.
2. *"Agile methodologies, Scrum and Teamwork — Bootcamp Fundació Esplai"*, a
   textbook definition of Scrum (sprints, daily meeting, scrum master) followed
   by the note that the bootcamp's three-to-four-week final project was done in
   groups of three using Scrum.

**ASSESSMENT.** This section should go, for three separate reasons.

First, **the evidence is student evidence.** Both claims are sourced to
education. Someone with three years of professional experience citing a
three-week group exercise as their teamwork credential invites the question of
why they did not cite work.

Second, **the second accordion explains Scrum to the reader.** Roughly 150 words
define what a sprint is, what a daily meeting is, and what a scrum master does.
Explaining Scrum to a technical recruiter or an engineering manager inverts the
expertise relationship — it reads as demonstrating that you know the definition,
which is a thing juniors need to prove and seniors never do.

Third, **self-declared soft skills carry no information.** Everyone claims
autonomy, perseverance and teamwork. The claims are unfalsifiable and therefore
ignored.

**RECOMMENDATION.** Delete the section. Soft skills are far more convincing when
demonstrated implicitly — through how a project case study describes trade-offs,
constraints, stakeholders and what you would do differently — than when asserted
in an accordion. If a specific competency genuinely matters (for example,
working with non-technical hotel operations stakeholders), it belongs inside an
experience or project narrative as a concrete story, not as a labelled panel.

**ASSESSMENT.** The prose itself is competent and clearly written. This is not a
quality judgement — it is that the entire category works against a mid-level
professional.

---

### 2.6 Contact (`Contact`) — **REWORK**

**FACT.** A four-field form — Name, Email, About/Motivo, Message — with floating
labels, Yup validation and EmailJS submission, over a full-bleed sunset
photograph.

**FACT.** No email address is displayed anywhere on the site. The form is the
only contact route apart from the LinkedIn and GitHub icons.

**FACT.** Submission produces no user-visible feedback of any kind — success and
failure are both logged to the console only.

**FACT.** Validation error messages always render in English regardless of the
selected language, because the hand-written `contact.error.*` translations are
never used. See [current-project-audit.md](current-project-audit.md) §4.3.

**ASSESSMENT.** The form is the single conversion point of the entire site and
it is the least trustworthy element on it. A visitor submits and receives
silence — no confirmation, no error, just a cleared form. Most people will
assume it failed. Some will try again; most will leave.

**ASSESSMENT.** The "Motivo" field (rendered as "About" in English) is
friction. Requiring a subject line with a 2–70 character validation rule before
someone can say hello is one field too many.

**ASSESSMENT.** Not showing an email address is a deliberate anti-spam choice
with a real cost: it forces every contact through a mechanism that visibly does
not confirm anything, and it removes the option to simply copy an address.

**RECOMMENDATION.** Lead with a plain, visible email address and the LinkedIn
link. If a form is kept, it must have loading, success and error states, and its
validation messages must be translated. Reduce it to three fields.

**HUMAN INPUT REQUIRED.** Whether you want a form at all. Given that recruiters
overwhelmingly use LinkedIn and email, a visible address plus LinkedIn may be
strictly better than a form — and it removes a dependency, a failure mode and a
spam surface. See §5.

---

### 2.7 Footer (`Footer`) — **REWORK**

**FACT.** Renders the name, the "Junior Data Scientist" line again, a CV
download button, and LinkedIn and GitHub icons.

**ASSESSMENT.** Reasonable content for a footer, undermined by repeating the
outdated title a third time. It also lacks the things a footer usefully carries:
a copyright line, a "last updated" date, a language switcher fallback, and a
link to the source repository.

**RECOMMENDATION.** Keep the shape. Update the title, add a last-updated
indicator, and link the repository — for a technical portfolio, linking your own
source is a small credibility signal.

---

### 2.8 Navigation (`Header`) — **REWORK**

**FACT.** Seven top-level items: Home, About me, Hard Skills, Projects
(dropdown with six entries), Soft Skills, Contact, Language (dropdown with
three).

**ASSESSMENT.** Seven items plus two dropdowns is heavy navigation for a
single-page site with three sub-pages. The Projects dropdown duplicates the
Projects section wholesale, so the same six links appear twice.

**ASSESSMENT.** Both dropdowns are hover-only, making them unreliable on touch
and unreachable by keyboard — which means the language switcher, the only way to
change language, is effectively broken on mobile. See
[current-project-audit.md](current-project-audit.md) §5.3 and §8.2.

**RECOMMENDATION.** Reduce to four or five items. Drop the Projects dropdown —
the section itself is the index. Make the language switcher a first-class,
keyboard-operable control tied to the URL rather than to `localStorage`.

---

### 2.9 Classification summary

| Section | Verdict | One-line reason |
|---|---|---|
| Hero | **REWORK** | Strong visual, near-empty content, wrong title |
| About | **REWORK** | Education-heavy, personality buried, CV three clicks deep |
| Hard Skills | **REMOVE** as built | Logo inventory; omits current toolset; invisible to AT |
| Projects | **REWORK** | Excellent writing, wrong selection and framing |
| — Text Mining page | **KEEP** (demoted) | Genuine technical writing, but academic |
| — Clustering pages ×2 | **KEEP** (demoted, merged) | Two near-identical K-means articles |
| Soft Skills | **REMOVE** | Student-sourced, self-declared, explains Scrum to the reader |
| Contact | **REWORK** | Silent form; no visible email; untranslated errors |
| Footer | **REWORK** | Repeats outdated title; missing repo link and date |
| Navigation | **REWORK** | Too many items; dropdowns broken on touch and keyboard |
| Professional Experience | **MISSING** | Does not exist. The critical gap. |
| Writing / notes | **MISSING** | No evidence of thinking outside project tutorials |

---

## 3. Project audit

### 3.1 Project 1 — Text Mining

**FACT.** A 230-line internal page with 15 images and 11 collapsible R code
blocks. Topic classification over the Reuters corpus: two topics (`acq`, `earn`),
corpus cleaning with `tm`, term-document matrices, sparsity analysis, word
clouds, then K-NN classification via both `class::knn()` and `caret::train()`,
validated with a confusion matrix. Reported accuracy 97–98%.

**FACT.** Card description: *"Data Science, Machine Learning, RStudio, Text
Mining, Topic Model, K-NN"*.

**FACT.** Fully translated into Spanish and Catalan. The English file contains
Spanish text.

**Demonstrates:** R, the `tm` / `class` / `caret` ecosystem, text preprocessing,
supervised classification, model validation, and — most importantly — the
ability to explain a technical process clearly to a non-expert.

**ASSESSMENT — technical interest: MEDIUM.** K-NN on a bag-of-words
representation of the Reuters corpus is a standard teaching exercise. The
execution is careful and the sparsity arithmetic is worked through honestly, but
the technique is introductory and the dataset is the canonical example dataset.

**ASSESSMENT — professional relevance: LOW.** It is 2023 postgraduate coursework
in R, and R is not part of your current professional stack.

**ASSESSMENT — writing quality: HIGH.** This is the best-written content you
have. The extended analogy of teaching a child to distinguish dogs from cats
before showing it a giraffe is a genuinely good piece of technical exposition.
The section explaining why even values of k are problematic shows real
understanding rather than recitation.

**Verdict: MEDIUM VALUE — keep the content, demote the placement.**

**RECOMMENDATION.** Do not delete. Move into an "Earlier work" archive with a
short summary rather than a top-level slot. Its value in 2026 is as evidence
that you can write about technical subjects well, not as evidence of current
capability. If you ever want a writing sample, this is it.

**HUMAN INPUT REQUIRED.** Is the R source still available? The site has prose
and screenshots but no repository link.

---

### 3.2 Project 2 — Clustering: Countries

**FACT.** A 231-line internal page with 20 images. K-means over socio-economic
indicators for 167 countries (child mortality, exports, health spend, imports,
income, inflation, life expectancy, fertility, GDP per capita). Explores k=2
through k=5, with elbow and silhouette analysis.

**FACT.** Card description: *"Data Science, Machine Learning, RStudio,
Clustering, K-Means"*.

**FACT.** Translated into Spanish only. Both the Catalan and English files
contain Spanish text.

**Demonstrates:** R, unsupervised learning, cluster count selection, exploratory
data analysis, interpretation of clusters against real-world meaning.

**ASSESSMENT — technical interest: MEDIUM-LOW.** The "Country-data" dataset is a
well-known Kaggle teaching set and K-means on it is a standard exercise. The
analysis is competent and the framing questions ("do all rich countries achieve
good health outcomes?") are more thoughtful than most.

**ASSESSMENT — professional relevance: LOW.** Coursework, in R, from 2023.

**Verdict: LOW-MEDIUM VALUE.**

**RECOMMENDATION.** Archive. See §3.3 — it should be merged with Project 3.

---

### 3.3 Project 3 — Clustering: Seguros

**FACT.** A 220-line internal page with 21 images. K-means over an insurance
portfolio (age, gender, experience, loyalty, claims, vehicle type), with elbow
and silhouette analysis at k=5 and k=7.

**FACT.** Card description: identical to Project 2 — *"Data Science, Machine
Learning, RStudio, Clustering, K-Means"*.

**FACT.** Its own opening line states it is *"a procedure very similar to the
previous project (Clustering - Countries)"*.

**FACT.** Translated into Spanish only.

**ASSESSMENT — technical interest: LOW.** The project itself concedes it repeats
the previous one with a different dataset. Customer segmentation on an insurance
portfolio is a marginally more business-relevant application than clustering
countries, but methodologically it is the same exercise.

**ASSESSMENT.** Two of the six showcased projects being the same technique with
the same tool and the same card description is a curation problem, not a content
problem. It reads as inventory: everything I have done, listed. Showing two
near-identical K-means analyses signals that there was not a third distinct thing
to show.

**Verdict: LOW VALUE as a separate entry.**

**RECOMMENDATION.** Merge Projects 2 and 3 into a single archived entry —
"Unsupervised segmentation with K-means: two case studies" — keeping both
datasets as sections within one article. This halves the apparent volume while
losing nothing, and turns a repetition into a comparison.

---

### 3.4 Project 4 — Rental Prices BCN

**FACT.** An external link, opening in a new tab, to a Jupyter notebook rendered
by nbviewer from the `J2D23_Hackaton` repository, pinned to commit
`48114150cdc0d41967224d6b165528c787b2314d`.

**FACT.** Card description: *"Data Science, Python, Pandas, PCA, Data
Visualization"*. Titled "Alquiler BCN" / "Lloguers BCN" / "Rental Prices BCN".

**FACT.** Verified live: returns HTTP 200. This is the only external project
link that still works.

**Demonstrates:** Python, Pandas, PCA, data visualisation, and — implicitly —
working to a hackathon deadline.

**ASSESSMENT — technical interest: UNKNOWN.** The notebook content was not
analysed as part of this audit. It is the only Python project on the site, which
makes it the closest thing to your current stack.

**ASSESSMENT — professional relevance: MEDIUM.** Python and Pandas are current.
A hackathon has a real constraint and a real deliverable, which is a better story
than coursework. Barcelona rental prices is also a subject a local reader has an
immediate opinion about — that is an advantage, not a triviality.

**ASSESSMENT — presentation: POOR.** It is a raw link to a raw notebook on a
third-party renderer. There is no context, no problem statement, no result and
no takeaway on the portfolio itself. A visitor leaves the site to read
unformatted code and never comes back. Pinning to a commit SHA is technically
sound but makes the URL fragile and opaque.

**Verdict: MEDIUM VALUE — worth rescuing with better framing.**

**RECOMMENDATION.** Give this a real page: what the hackathon was, what the
question was, what the data was, what you found, and what you would do
differently. Link the notebook as supporting evidence rather than as the
destination.

**HUMAN INPUT REQUIRED.** What was the hackathon (J2D23)? Team or solo? What was
the actual finding? Was there a placement or outcome?

---

### 3.5 Project 5 — Tesco FAQs

**FACT.** An external link to a Streamlit Community Cloud app. Card description:
*"AI, NLP, LLM, LangChain, FAISS, GooglePaLM, Streamlit"*.

**FACT.** Verified live: the URL redirects anonymous visitors into an
authentication loop, terminating after 50 redirects at `/-/login`. The app is
not reachable without a Streamlit login.

**Demonstrates:** LangChain, vector search with FAISS, retrieval-augmented
generation, LLM application development, Streamlit.

**ASSESSMENT — technical interest: MEDIUM-HIGH in principle.** A RAG pipeline
over an FAQ corpus is a genuinely relevant pattern and remains so in 2026. In
late 2023 this was current work.

**ASSESSMENT — professional relevance: HIGH in principle.** This is the closest
thing on the site to the AI work you describe as part of your current role. It is
the only project touching LLMs.

**ASSESSMENT — actual value today: ZERO.** A recruiter clicking it hits a login
wall. Worse, Google PaLM — the model it was built on — has been superseded by
Gemini, so even if the login wall were removed the app may no longer run.

**ASSESSMENT.** There is a broader lesson here worth carrying into v2: **a
portfolio project hosted on someone else's free tier has a half-life.** Two of
your six projects died without you doing anything, and you had no way of knowing.

**Verdict: HIGH POTENTIAL, currently BROKEN.**

**RECOMMENDATION.** Do not link a live demo you do not control unless the
portfolio can survive its death. Write the project up properly — architecture,
retrieval strategy, chunking decisions, what worked and what did not — so the
case study stands alone. Link the source repository, which does not rot. If a
demo is offered, treat it as a bonus and monitor it.

**HUMAN INPUT REQUIRED.** Does the source repository still exist? Is it public?
Is it worth reviving on current tooling, or is it better presented as archived
work?

---

### 3.6 Project 6 — InnovaTech SQL

**FACT.** An external link to a Streamlit app. Card description: *"AI, SQL, LLM,
LangChain, SQLite, GooglePaLM, Streamlit"*.

**FACT.** Verified live: same authentication loop as Project 5. Unreachable.

**Demonstrates:** Natural-language-to-SQL with an LLM, LangChain, SQLite.

**ASSESSMENT — technical interest: MEDIUM-HIGH in principle.** Text-to-SQL is a
harder and more interesting problem than FAQ retrieval, with real failure modes
— schema grounding, query validation, hallucinated columns.

**ASSESSMENT — professional relevance: HIGH in principle.** This is arguably the
most relevant project on the entire site: it sits exactly at the intersection of
SQL, data platforms and AI, which is where you now work.

**ASSESSMENT — actual value today: ZERO.** Same login wall, same deprecated
model.

**Verdict: HIGH POTENTIAL, currently BROKEN.**

**RECOMMENDATION.** Of the six existing projects, this is the one whose *subject*
most deserves a place in the 2026 portfolio — but almost certainly rewritten
rather than resurrected. A 2026 text-to-SQL case study informed by three years
of professional SQL and data platform work would be a substantially stronger
piece than the 2023 version.

**HUMAN INPUT REQUIRED.** Same as §3.5, plus: is there anything from your
professional Fabric work that overlaps and could be written up instead, at a
level of detail your employer would permit?

---

### 3.7 Project ranking

| # | Project | Technical | Professional relevance | Status | Verdict |
|---|---|---|---|---|---|
| 6 | InnovaTech SQL | Medium-High | **High** | Broken link | **HIGH POTENTIAL** — rewrite |
| 5 | Tesco FAQs | Medium-High | **High** | Broken link | **HIGH POTENTIAL** — rewrite |
| 4 | Rental Prices BCN | Unknown | Medium | Works, badly framed | **MEDIUM** — reframe |
| 1 | Text Mining | Medium | Low | Works | **MEDIUM** — archive, keep as writing sample |
| 2 | Clustering Countries | Medium-Low | Low | Works | **LOW-MEDIUM** — archive, merge with 3 |
| 3 | Clustering Seguros | Low | Low | Works | **LOW** — archive, merge with 2 |
| — | **KidSign** | **Not audited** | **Likely high** | Not linked | **HUMAN INPUT REQUIRED** |

**ASSESSMENT.** The ranking inverts the site's own presentation. The three
projects given full internal pages, dedicated routes and 3,000 words of prose
are the three *least* professionally relevant. The two most relevant are bare
external links that no longer work.

**ASSESSMENT.** This inversion is a direct consequence of the architecture
problem in [current-project-audit.md](current-project-audit.md) §3.2. Writing a
full internal page cost a 230-line React component plus three translation files;
adding an external link cost one line. So the effort went where the friction was
lowest, not where the value was highest. The content model shaped the content.

**ASSESSMENT — on KidSign.** Based only on your description — a web app with
webcam capture, a computer vision model recognising ASL letters and numbers, and
several games — it would be the most technically substantial project in this
portfolio by a wide margin, and the only one that is a *product* rather than an
analysis. It is also the only one that would demonstrate end-to-end delivery:
model, interface, interaction, deployment. Every existing project is a notebook,
an article or a demo script.

**RECOMMENDATION.** Reserve the flagship position for KidSign, pending its own
audit. Do not integrate or modify anything in that repository yet.

---

## 4. Content assets worth preserving

**ASSESSMENT.** Being explicit about what is *good*, because the recommendations
above are mostly subtractive.

1. **Roughly 3,000 words of clear technical exposition.** The project articles
   explain sparsity, k selection, confusion matrices and sensitivity/specificity
   with worked arithmetic. Whatever else changes, this proves you can write, and
   writing is the rarest skill in a technical portfolio.

2. **The dog-and-cat analogy for supervised learning.** A genuinely good piece
   of explanatory writing, reusable in any future context.

3. **The trilingual `index` namespace.** All three locales are complete and
   correct for the homepage. The navigation, section headings and form labels
   are done. That is real translation work already paid for.

4. **The instinct to explain rather than display.** The most valuable thing to
   carry forward is not any specific text but the editorial decision behind it:
   these pages teach rather than showcase. Most portfolios post a screenshot and
   a tech-stack list. This one reasons through a problem. Keep that, and point it
   at better subject matter.

5. **The personal voice, where it appears.** One sentence, but the right
   instinct.

---

## 5. HUMAN INPUT REQUIRED

Nothing below has been guessed at. These gaps are why the v2 content cannot be
drafted yet.

### Critical — blocks the rewrite

1. **Your role history at Catalonia Hotels & Resorts.** Exact job titles, start
   and end dates for each, and the transition from Data Scientist to Integration
   Specialist. What changed in the work when the title changed?

2. **What you actually build now.** You mention the Fabric platform with Python,
   PySpark, SQL and AI. What does that mean concretely — what do you own, what
   does it do, who uses it, at what scale? Two or three specifics are worth more
   than a paragraph of generalities.

3. **What you can say publicly.** Employer work usually has confidentiality
   limits. What can be described in terms of architecture, scale and outcome
   without disclosing anything sensitive? This constrains everything in the
   Experience section.

4. **One professional accomplishment with a result.** A single concrete story —
   a problem, what you did, and what measurably changed — would do more for your
   positioning than every other change in this document combined.

5. **Your current honest toolset.** Which tools are daily production, which are
   occasional, which are historical? The 2023 logo wall cannot be updated without
   this.

### Important — shapes the content

6. **How you want to be described in one line.** "Data Engineer"? "Integration
   Specialist"? "Data & Integration Engineer"? Something broader? This becomes
   the hero, the title tag and the meta description.

7. **What the portfolio is *for* in 2026.** You are not job-hunting. Is this a
   professional presence, a place to publish writing, a proof of craft, or
   insurance for a future search? It changes what belongs on it. Discussed
   further in [v2-vision.md](v2-vision.md).

8. **Whether the personal register stays.** Cheese and dogs — in or out, and in
   all three languages if in.

9. **Contact preference.** Visible email, form, or both?

10. **Anything since 2023 that is not on the site.** Certifications, conference
    talks, internal presentations, open-source contributions, Fabric or Azure
    credentials, writing published elsewhere.

### For the projects specifically

11. **Do the source repositories still exist** for the three R projects and the
    two Streamlit apps?

12. **Is reviving the LLM apps worthwhile,** given the PaLM deprecation, or is a
    fresh project a better use of the same effort?

13. **KidSign** — deferred to its own audit, but the key question is what the
    machine learning component actually does: model architecture, training data,
    where inference runs, and accuracy.

14. **Is there any professional work** that could be written up as a case study
    with permission, even anonymised? One real production case study would
    outweigh all six existing projects.
