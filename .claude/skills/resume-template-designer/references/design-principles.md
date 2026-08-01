# Resume Design Principles — ATS, Scanability, Typography, Spacing

Reference knowledge for designing specs. Use this to justify decisions when web research isn't
available or to go deeper than a quick search. Everything here is a *principle to synthesize from*,
not a template to copy. Always tie a recommendation back to one of the four priorities:
**ATS compatibility, recruiter scanability, professional aesthetics, print/PDF readability.**

## Table of contents
1. How ATS parsing actually works (and how to design for it)
2. The 6–10 second recruiter scan
3. Information hierarchy
4. Typography for resumes
5. Spacing and vertical rhythm
6. Layout patterns (single vs. two-column)
7. Color and dividers
8. Print / PDF readability
9. Audience-specific guidance
10. Originality without gimmicks

---

## 1. How ATS parsing actually works

Modern ATS parse the PDF's text layer into fields (name, contact, work history, education, skills).
Design decisions that help or hurt:

- **Real, selectable text only.** Text baked into an image is invisible to ATS. (ResumeCraft renders
  real text, so this is inherently satisfied — but never spec image-based headings.)
- **One unambiguous reading order.** Parsers read top-to-bottom, left-to-right. Multi-column layouts
  risk interleaving the two columns' text (e.g. a sidebar skill landing in the middle of a job
  bullet). If you spec two columns, keep the *critical, parse-sensitive* content (work history,
  education) in the main column and put only self-contained, order-tolerant content (skills,
  languages, contact) in the sidebar.
- **Standard section labels.** Use conventional headings — "Experience"/"Work Experience",
  "Education", "Skills", "Projects", "Certifications". Clever labels ("Where I've Made Dents") can
  fail keyword-based section detection.
- **No critical info in headers/footers.** Some parsers ignore the page header/footer region. Keep
  name and contact in the body's top block, not in a running header.
- **No meaning conveyed by color alone.** Color can fail to parse and fails for colorblind readers
  and B/W printing. Signal importance with size/weight/position, not hue.
- **Simple structure over decoration.** Tables, text boxes, and graphics can scramble parse order.
  Flex rows of plain text (title left / date right) are safe; tables are not.
- **Dates in a consistent, explicit format** ("Jan 2021 – Present"), same pattern everywhere, so the
  parser can pin roles to a timeline.

Design guidance: a truly ATS-first template is single-column with standard labels and a linear
reading order. Two-column can be ATS-acceptable if the sidebar is non-critical and order-tolerant —
but always name the tradeoff.

## 2. The 6–10 second recruiter scan

On the first pass a recruiter skims, they don't read. Eye-tracking shows an **F-pattern**: across the
top, down the left edge, with a second shorter horizontal sweep partway down. Design so the answers
to "who is this, what are they now, are they relevant" are captured in that path:

- **Top third is prime real estate.** Name, current/target title (the headline), and the single most
  important signal (top skills, or years/seniority) belong here.
- **Left edge carries the skim.** Company names, job titles, and section headings should sit on or
  near the left margin where the eye travels — not centered or right-shifted.
- **Most recent first.** Reverse-chronological within experience/education; the newest, most relevant
  role should be the first thing under the header.
- **Chunking beats density.** Clear section bands and whitespace let the eye jump; a dense grey wall
  forces reading and loses the skim. Aim for scannable "landing points."

The **Recruiter Scan Analysis** section of a spec should literally trace this: "In the first 6
seconds the eye lands on X (name/title), sweeps left down Y (companies), and catches Z (skills band)."

## 3. Information hierarchy

Establish 3–4 clear levels and apply them consistently:
1. **Identity** (name) — largest, boldest, top.
2. **Section titles** — clearly demarcated (weight, size, case, and/or a rule) so bands are obvious.
3. **Item titles** (job title, degree, project name) — heavier than body; often paired with a
   right-aligned date.
4. **Body / details** — the readable base size; supporting metadata (location, dates) can be lighter
   or a secondary grey.

Hierarchy tools, in rough order of scannability impact: **position → size → weight → case/letter-
spacing → color → rules/dividers**. Prefer the earlier tools; reserve color for last (and remember
ResumeCraft's color is per-template and links are black).

## 4. Typography for resumes

- **Serif vs. sans.** Serif (e.g. Tinos) reads as classic, traditional, editorial — good for law,
  academia, finance, senior/executive. Sans (e.g. Helvetica) reads as modern, clean, neutral — good
  for tech, design, startups, new grads. Choose to fit the audience and say why.
- **One family, earn a second.** A single family with a strong weight range usually looks more
  intentional than two mixed families. If pairing, pair a sans for headings with a serif for body (or
  vice-versa) and keep it deliberate.
- **Size scale.** With a ~10pt body (ResumeCraft's baseline), a workable scale is roughly: body
  9.5–10.5pt, item titles 10.5–11.5pt, section titles 11–13pt, name 20–28pt. Keep steps distinct
  enough to read as different levels but not so large they waste space.
- **Weight and case.** Bold for names/titles; UPPERCASE + letterspacing (0.5–1pt) reads well for
  *section labels* but is tiring for body — never uppercase running text. Small-caps-like effects
  can add polish without shouting.
- **Line-height.** ~1.2–1.4 for body (1.3 is ResumeCraft's default and prints well). Tighter for
  large display type (names), looser for dense paragraphs.
- **Line length.** In a single column on A4 with ~22pt side padding, lines are long; bulleted lists
  and short phrases scan better than wide paragraphs. Two-column narrows measure (good for
  readability) at the ATS cost above.

## 5. Spacing and vertical rhythm

Whitespace is a primary design material on a resume — it creates the bands that make scanning
possible.

- **Define a spacing scale** (e.g. 2 / 4 / 6 / 8 / 12 pt) and use it consistently rather than ad-hoc
  values; consistency is what makes a layout feel designed.
- **Space between sections > space within a section > space within an item.** This gradient is what
  visually groups related content. If inter-section and intra-section gaps are equal, the page reads
  as undifferentiated.
- **Generous but efficient margins.** ~18–24pt page padding balances breathing room against fitting
  content on one page. Too tight looks cramped and risks print cutoff; too loose wastes a page.
- **One-page density.** For early-career, aim to fill one page without crowding; for senior/executive
  two pages is acceptable. Spec the intended density and how spacing supports it.

## 6. Layout patterns

- **Single-column (recommended default, and ResumeCraft's real capability).** Safest for ATS,
  simplest reading order, most flexible for length. Distinctiveness comes from typography, section
  styling, spacing, and header treatment — not from columns.
- **Two-column / sidebar (⚠️ extension in ResumeCraft).** Sidebar typically holds contact, skills,
  languages, certifications; main column holds summary, experience, education, projects. Looks modern
  and uses horizontal space, but see §1 for the ATS reading-order caveat — keep the sidebar
  order-tolerant. Always state the ATS tradeoff when you spec it.
- **Header treatments.** Left-aligned header (name/contact on the left) supports the F-pattern and
  packs contact info efficiently; centered header reads more formal/traditional (as in `standard`).
  A thin full-width name band or a name-plus-headline lockup are distinctive without hurting parsing.

## 7. Color and dividers

- **Color.** A single restrained accent (one hue for section titles or a header rule) can feel modern
  and premium; more than one accent usually cheapens it. Keep body text near-black on white for
  contrast and print. In ResumeCraft, color is hardcoded per template and links render black — so a
  color scheme is a per-template implementation choice; note it, and never rely on color to carry
  meaning (ATS + accessibility).
- **Dividers.** Options, roughly least→most assertive: whitespace only, a hairline rule under section
  titles (0.5pt), a full-width rule, a short accent rule, or a filled band. Dividers create the
  scannable bands from §2 — choose a strategy and apply it uniformly. Whitespace-only can look the
  most refined but demands disciplined spacing to keep sections legible.

## 8. Print / PDF readability

- Design for **A4** at 100% with real margins; assume it may be printed in **black and white** — so
  contrast and non-color hierarchy must hold up in greyscale.
- **Minimum readable sizes:** keep body ≥ ~9.5pt and never put essential text below ~8pt.
- **Graceful page breaks:** sections and individual items should avoid splitting mid-item across
  pages (ResumeCraft supports `breakInside: 'avoid'` / `wrap={false}` — call this out in
  Implementation Notes when relevant).
- **No screen-only affordances:** hover states, background tints that don't print, or link colors as
  the only cue all fail on paper.

## 9. Audience-specific guidance

- **Fresh graduates / early career:** one page; lead with education and projects/skills over thin
  experience; sans or clean serif; emphasize potential and relevant coursework/projects. Density
  should feel full but not padded.
- **Senior / staff engineers:** lead with a tight summary + a scannable skills/impact band, then
  reverse-chron experience emphasizing scope and outcomes; two pages acceptable; restrained,
  confident typography.
- **Product managers:** foreground outcomes/metrics and cross-functional scope; a summary and a
  results-forward experience section; clean modern sans; consider a compact metrics-friendly layout.
- **Designers / creatives:** more visual latitude (accent color, distinctive type) while staying ATS-
  safe; often a portfolio link is prominent. Balance personality with parseability.
- **Career-changers:** skills-forward / functional-leaning emphasis with a strong summary framing the
  transition, while keeping standard section labels for ATS.

Always adapt to the *specific* role/seniority in the request rather than defaulting to a generic
professional.

## 10. Originality without gimmicks

Distinctiveness should come from **intentional, restrained choices** — a considered type scale, a
signature header lockup, a consistent divider system, disciplined whitespace, one confident accent —
not from novelty for its own sake (rainbow colors, icons everywhere, skill percentage bars, photos,
unusual section names). The test: every distinctive element should also serve ATS, scanability,
aesthetics, or print. If a flourish serves none of the four, cut it. A template can be immediately
recognizable and still be boringly parseable to a machine — that's the target.
