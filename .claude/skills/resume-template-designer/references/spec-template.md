# Template Specification — Annotated Format + Worked Example

Two parts: (1) the spec skeleton with per-section authoring notes, and (2) a full worked example to
calibrate depth, concreteness, and tone. Match the example's level of detail — quantified where an
implementer needs it, and every notable choice carrying a *why*.

---

## Part 1 — Annotated skeleton

```md
# Template Specification: [Name]

## Template Name
A short, evocative, original name. Not a copy of a known template's name.

## Target Audience
The specific role/seniority/industry this is optimized for, and why they need something different
from a generic template.

## Design Philosophy
2–4 sentences: the core idea and the feeling. What is the one structural or typographic idea that
makes this template itself?

## ATS Compatibility
Plain statement of how ATS-safe this is and why (reading order, labels, single vs. two-column,
color-independence). If there's a tradeoff, name it here, not just in the footnotes.

## Visual Style
The overall aesthetic in a sentence or two (e.g. "editorial serif, generous whitespace, one hairline
accent"). What a viewer feels at a glance.

## Strengths
Bulleted. What this template does better than alternatives, each tied to a priority.

## Potential Weaknesses
Bulleted and honest. Where it's not ideal (length, density, audiences it doesn't fit). Credibility
comes from naming real tradeoffs.

## Page Structure
The page from top to bottom: header lockup, then the band structure. Describe regions and how the eye
moves through them. Note A4 and single- vs. two-column (flag two-column as ⚠️ extension).

## Section Order
Ordered list using the exact ResumeCraft section ids, and the reasoning for this order for this
audience. Note any sections hidden by default.

## Typography
- **Font Family** — the real font (Tinos/Helvetica) or an ⚠️ extension font, with the reason it fits
  the audience.
- **Font Sizes** — in pt, for each level: name, headline, section title, item title, body, metadata.
- **Font Weights** — which elements are bold/semibold/regular; any uppercase + letterspacing.
- **Line Heights** — body and display values.

## Spacing System
The spacing scale (pt values) and the section > item > line gradient. Page padding. Intended density
(one page vs. two).

## Alignment Rules
What's left / centered / right. Title-vs-date row behavior. Header alignment.

## Color Usage
The palette in a greyscale-safe way (near-black text, greys, optional single accent). State that
color is per-template in ResumeCraft and never carries meaning; flag any accent as an ⚠️ extension
if it needs configurable theming.

## Divider Strategy
How sections are separated (whitespace / hairline / rule / band) and why, applied consistently.

## Component Requirements
The reusable pieces an implementer builds: header lockup, section title, experience item row,
skills block, contact row (Lucide icons), etc. Enough that they can enumerate components.

## ATS Considerations
The concrete ATS checklist for this template: reading order, standard labels, no color-dependence,
date format, header-in-body. Reiterate any two-column caveat.

## Recruiter Scan Analysis
Trace the 6–10 second F-pattern on THIS layout: what the eye hits first, sweeps down, and catches
second — and how the design guarantees the key facts land in that path.

## Why This Design Works
A short synthesizing argument (not a restatement) tying the whole design back to the four priorities
and this audience. The paragraph a reviewer reads to be convinced.

## Implementation Notes
ResumeCraft-specific guidance: exact section ids to include/hide, which font is real vs. ⚠️ needs
adding, single- vs. two-column reality, `breakInside`/`wrap` for page breaks, and every ⚠️ extension
this template depends on with what to build.
```

---

## Part 2 — Worked example

# Template Specification: Ledger

## Template Name
**Ledger** — an accounting metaphor: clean ruled bands, everything accounted for, nothing wasted.

## Target Audience
Senior and staff software engineers (8+ years). They have more signal than fits comfortably — many
roles, a deep skill set, notable scope — and need a template that stays dense yet scannable and reads
as senior without decoration.

## Design Philosophy
Impact-first and quietly authoritative. A tight summary and a scannable skills band sit up top so a
recruiter grasps seniority and stack in seconds; ruled horizontal bands then organize a lot of
history without turning into a grey wall. The one idea: **hairline rules as an organizing grid**, not
ornament.

## ATS Compatibility
High. Single-column, standard section labels, strict reverse-chronological order, one linear reading
path, and zero reliance on color — safe for keyword and structure parsing. No sidebar to scramble
parse order.

## Visual Style
Modern sans, generous top-third breathing room tightening into efficient ruled bands below. Monochrome
with a single near-black ink; the only "decoration" is a consistent 0.5pt rule system.

## Strengths
- Front-loads seniority signals (summary + skills band) into the recruiter's first 6 seconds — serves
  scanability.
- Ruled bands let a long history stay dense but navigable — serves scanability and print.
- Fully single-column, color-independent — serves ATS and greyscale print.
- Restrained, confident tone appropriate to senior roles — serves aesthetics.

## Potential Weaknesses
- Density suits experienced candidates; a new grad would look sparse in it.
- Monochrome discipline may read as "plain" to those wanting visible color.
- Two-page by nature for very long histories — not a one-page format.

## Page Structure
A4, single-column. Top to bottom:
1. **Header lockup** (left-aligned): name (large), target title/headline beneath, contact row with
   Lucide icons.
2. **Summary band** — 2–3 line positioning statement.
3. **Skills band** — categories as compact labeled rows, scannable at a glance.
4. **Experience** — the bulk; ruled bands, most recent first.
5. **Projects → Education → Certifications** — supporting bands.
Eye enters top-left at the name, drops to summary, catches the skills band, then sweeps down job
titles on the left edge.

## Section Order
`personalInfo, summary, skills, experience, projects, education, certifications` (achievements and
languages hidden by default; add if relevant). Rationale: for senior engineers, current capability
(skills) and impact (summary) outrank education, so skills is pulled above experience and education
drops near the bottom — the opposite of a new-grad ordering.

## Typography
- **Font Family** — Helvetica (real, built-in). Neutral, modern, unfussy; the right register for
  senior tech without needing a custom font.
- **Font Sizes (pt)** — name 24; headline 12; section titles 11 (uppercase); item titles 10.5; body
  10; metadata (dates/location) 9.
- **Font Weights** — name bold; section titles bold + UPPERCASE + 0.75pt letterspacing; item titles
  semibold; body regular; metadata regular in secondary grey.
- **Line Heights** — body 1.3; name ~1.1.

## Spacing System
Scale: 2 / 4 / 6 / 10 / 16 pt. Gradient: 16pt above each section title, 6pt between items, 2pt
between an item's lines. Page padding 22pt horizontal, 20pt top / 28pt bottom. Density: efficient
two-page for a full senior history; the top third stays airy for scanning, bands below tighten.

## Alignment Rules
Everything left-aligned to a single left margin (supports the F-pattern skim). Each experience item is
a row: title + company on the left, dates + location right-aligned (flex row, ~70/30 flexBasis).
Header left-aligned, contact row wraps left-to-right.

## Color Usage
Near-black ink `#111` for primary text, secondary grey `#555` for metadata, white background. Rules in
`#111` at 0.5pt. No accent — greyscale-safe, meaning never carried by color. (In ResumeCraft this
palette is hardcoded in the template; links render black regardless.)

## Divider Strategy
A **hairline rule (0.5pt) directly under each section title**, full content width — the signature
"ledger line." Uniform across all sections; no other dividers, so whitespace + the single rule system
does all the separating.

## Component Requirements
- Header lockup (name + headline + Lucide contact row).
- Section title with underlining hairline rule.
- Experience item row (title/company left, date/location right; bulleted description).
- Skills block (category label + comma-joined skills per row).
- Generic supporting item (projects/education/certifications).

## ATS Considerations
Single-column linear order; standard labels ("Experience", "Skills", "Education", "Projects",
"Certifications"); dates as "Mon YYYY – Mon YYYY / Present" consistently; name + contact in body top
block, not a running header; no color-encoded meaning; no tables. Nothing here jeopardizes parsing.

## Recruiter Scan Analysis
Second 1–2: eye lands top-left on the **name + headline** → seniority and target role. Seconds 3–5:
drops to the **summary** and the **skills band** → stack and scope confirmed. Seconds 6–10: sweeps the
left edge down **job titles/companies** with dates anchored right → trajectory read. The ruled bands
give the eye stopping points so a long history doesn't blur. Everything needed to decide "relevant?"
is above the first fold.

## Why This Design Works
Senior engineers are penalized by both extremes — a sparse one-pager hides their depth, a dense wall
buries it. Ledger resolves the tension by spending its whitespace budget where the scan happens (the
top third) and its structure budget where the volume is (the ruled experience bands), so the document
is simultaneously authoritative, scannable, and machine-parseable. The monochrome, single-rule system
reads as intentional restraint — senior signaling — while keeping the template fully ATS- and
print-safe.

## Implementation Notes
- Section ids to render (in `mainColumnSectionOrder`): `personalInfo, summary, skills, experience,
  projects, education, certifications`. Hide `achievements`, `languages` by default via
  `sectionDetails.visible = false`.
- Font: **Helvetica** — real (react-pdf built-in), no extension needed.
- **Single-column** — matches current capability; no two-column work required.
- Use `breakInside: 'avoid'` on each experience/section item so ruled bands don't split across the
  page boundary.
- ✅ No extensions required — this template is implementable with today's capabilities (hardcode the
  `#111`/`#555` palette and 0.5pt rules in the template's `THEME`).
