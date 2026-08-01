# ResumeCraft Capabilities — What a Spec Can Actually Rely On

Read this before writing any Template Specification. It defines what the app renders **today** so
your specs are grounded and implementable. Anything not listed here as "real" is an **extension** —
usable in a spec, but flag it with ⚠️ and describe the implementation work.

Rendering pipeline: resume data → PDF template component (`@react-pdf/renderer`) → PDF. Templates
live in `src/features/pdf-templates/resume/{template-name}/index.tsx`. Two ship today:
`clean-minimal` and `standard` (registry: `.../resume-preview/ResumeRenderer.tsx`, fallback
`clean-minimal`).

## Table of contents
1. Sections and their fields (exact ids)
2. What actually controls layout (and what's inert)
3. Fonts that really exist
4. Sizing, page, and units
5. Rich-text and content limits
6. Layout primitives available
7. The two existing templates (your baseline to differ from)
8. Extension checklist (things to flag with ⚠️)

---

## 1. Sections and their fields (use these exact ids)

All under `Resume.sections`. **Section ids** (used in ordering/visibility and in your specs):
`personalInfo, summary, experience, education, skills, projects, certifications, achievements, languages`.

- **personalInfo** (single object): `fullName`, `headline`, `email`, `phone`, `location`,
  `website?{label,url}`, `links?[]` where each link = `{label, url, iconName?}`. `iconName` is a
  kebab-case Lucide name (e.g. `github`, `linkedin`, `mail`, `phone`, `map-pin`, `link`).
- **summary** (single object): `content` (HTML string).
- **experience[]**: `company, title, location?, timePeriod, description?` (description is HTML).
- **education[]**: `institution, fieldOfStudy?, location?, timePeriod, gpa?, description?`.
- **skills** (single object): `{ categories[] }`; each category = `{ name, skills[] }`; each skill =
  `{ name, level? }` where level ∈ Beginner/Intermediate/Advanced/Expert. **`level` is stored but
  not rendered** — both templates just join skill names with commas under the category name.
- **projects[]**: `name, description?, url?, technologies?: string[], timePeriod?`.
- **certifications[]**: `name, issuer?, date?, expirationDate?, credentialUrl?, description?`.
- **achievements[]**: `title, description?`.
- **languages[]**: `language, proficiency` (Native/Fluent/Professional/Intermediate/Basic).
  Proficiency is text; **no rendered meter/bar**.

Custom sections: a `CustomSection` type exists but is commented out — **not available**.

## 2. What actually controls layout (and what's inert)

`Resume.config` has: `theme`, `sectionDetails`, `mainColumnSectionOrder`, `sideColumnSectionOrder`.

- **`mainColumnSectionOrder: string[]`** — ordered section ids. This genuinely drives the render
  order. A section absent from this array will NOT render even if data exists.
- **`sectionDetails[id].visible`** — genuinely toggles a section on/off.
- **`sideColumnSectionOrder: string[]`** — exists in the model/schema but **no shipped template
  reads it**. The app is effectively **single-column**. ⚠️ Two-column = extension.
- **`theme` (fontFamily, headingColor, textColor, backgroundColor, linkColor, headingFontSize,
  textFontSize)** — **inert.** No template or renderer consumes `config.theme`. Each template
  hardcodes its own `THEME` constant. There is no color-picker or font-picker UI. So in a spec,
  colors and fonts are **per-template implementation choices baked into the component**, not user
  settings. (If you want user-configurable theming, that's an ⚠️ extension.)

Practical consequence: the only truly data-driven layout controls are **section order** and
**section visibility**. Everything else about a template is hardcoded in its component.

## 3. Fonts that really exist

- **Tinos** — serif, Times-compatible. Local `.ttf` files at `public/fonts/tinos/` (Regular, Bold,
  Italic, BoldItalic), all four registered in `standard`. This is the safest serif choice.
- **Helvetica** — sans-serif. `@react-pdf/renderer` has it built in (also `Times-Roman`,
  `Courier`). `clean-minimal` currently registers it from a remote gstatic URL (fragile — prefer
  the built-in). Safe sans choice: Helvetica.
- **Anything else (Inter, Lato, Roboto, Source Sans, a variable font, etc.)** — ⚠️ extension.
  Requires adding `.ttf` files to `public/fonts/<family>/` and a `Font.register` call in the
  template. Note `'Inter'` is named in the config default but is **not** registered anywhere.

So without new work, your palette of fonts is: **serif → Tinos**, **sans → Helvetica**. You can and
should still recommend a better-fitting font when it materially serves the design — just flag it.

## 4. Sizing, page, and units

- **Page:** A4 only (`<Page size="A4">`). No Letter option today (⚠️ if you need Letter).
- **Units:** unitless numbers = **points (pt)** in `@react-pdf` (`fontSize: 10` = 10pt). Padding,
  margins, and gaps are pt too. `flexBasis` uses `%`.
- **Existing baselines:** body text **10pt**, lineHeight **1.3**. Names 20–26pt. Section titles
  10pt (clean-minimal) to 12.4pt (standard). Page padding ≈ 20–22pt.
- Specify sizes in **pt** to match this system. (The inert `config.theme` uses `rem` strings — don't
  follow that; it isn't used.)

## 5. Rich-text and content limits

Description/summary fields are HTML, parsed by `src/shared/lib/html-parser.tsx`. **Supported tags
only:** `p, strong, em, u, a, ul, ol, li, br`.
- `strong` → bold (700), `em` → italic, `u` → underline, `a` → underline.
- **Links are forced black** (`#000000`) regardless of any color — `config.linkColor` is ignored.
- Lists render a manual small bullet (a 2pt black circle) + text.
- **No headings, tables, columns, or images inside descriptions.** Anything unsupported degrades to
  plain text.

So content richness lives in bold/italic/underline + bulleted lists. Design hierarchy comes from the
template's own styling of section titles, item titles, dates, etc. — not from rich markup.

## 6. Layout primitives available

`@react-pdf/renderer` only: `Document / Page / View / Text / Link / Svg` with **Flexbox**
(`flexDirection`, `justifyContent`, `alignItems`, `flexBasis`, `gap`).
- **No CSS grid, no floats.** Columns and side-by-side alignment (e.g. title left / date right) are
  done with `flexDirection: 'row'` + `flexBasis` percentages.
- Page-break control: `breakInside: 'avoid'` and `wrap={false}` on views to keep items/sections
  intact across page boundaries.
- Icons: Lucide icons converted to react-pdf SVG (`LucideToReactPdfIcon.tsx`), supporting simple
  shapes (path/rect/circle/line/polyline/polygon). Use Lucide kebab-case names.

Design implication: any layout you spec must be expressible as nested flex rows/columns with
percentage widths. That's plenty for single- and two-column resumes, sidebars, and title/date rows —
but not for overlapping or grid-tiled compositions.

## 7. The two existing templates (differ from these)

Know these so new templates are genuinely distinct, not near-duplicates.

**clean-minimal** — utilitarian sans:
- Helvetica; base 10pt / lineHeight 1.3; page padding H22/top20/bottom38; page `gap: 6`.
- Header is a **row**: left block (name 20pt bold, headline 14pt in `#444`, phone/email) at ~65%,
  right block (links, location) at ~35%. Contact items inline with Lucide icons.
- Section titles: 10pt, **bold, UPPERCASE**, with a full-width `borderBottom: 0.5 solid #000`
  (underline rule). Title/date rows via flexBasis (~68/30). `breakInside: 'avoid'`.
- Palette: primary `#000`, secondary `#444`, borders `#000`. Left-aligned, compact.

**standard** — classic serif:
- Tinos; base 10pt / lineHeight 1.3; page padding H22/V20; page `gap: 5`.
- Header **centered**: name UPPERCASE with a drop-cap effect (first letter of each word 26pt, rest
  20pt), letterSpacing 1; location 13pt; centered contact row with icons.
- Section titles: 12.4pt semibold, Capitalized, inside a `borderBottom: 0.5 solid grey` divider.
- Rich type scale (9 → 28pt) and spacing scale. Subsection descriptions italic; bullets indented.
- Palette: primary `#000`, secondary `#444`, border grey. Traditional, symmetric.

Gaps worth designing into: no two-column layout, no accent-color template (both are greyscale), no
high-density one-page template, no template explicitly tuned for a specific role (new-grad,
PM, designer), no template that renders skill levels or language proficiency visually.

## 8. Extension checklist — flag these with ⚠️ in Implementation Notes

Mark any of these as requiring implementation work beyond current capability:
- Two-column / sidebar layouts (needs `sideColumnSectionOrder` rendering support).
- Any font other than Tinos (serif) or Helvetica (sans) — needs `.ttf` + `Font.register`.
- **User-configurable** color/font/theming (wiring up the inert `config.theme`), non-black or colored
  **links**, or colored **text**. Note the boundary: **hardcoding a palette — including one accent
  color — into a template's own `THEME` constant is NOT an extension.** That's exactly what the
  shipped templates do (`clean-minimal` uses `#444`, `standard` uses grey), so a template that bakes
  in, say, a single navy section-rule is fully implementable today. Only three things here are real
  extension work: making color *user-adjustable*, overriding the *forced-black links*, or coloring
  *body text*. So don't flag a fixed per-template accent as an extension — flag only configurable
  theming or non-black links.
- Visual skill-level bars/dots or language-proficiency meters (data exists, rendering doesn't).
- Custom / user-defined sections (not wired up).
- Letter page size, images/photos, tables, or grid layouts.
- Icons beyond simple Lucide shapes.

Flagging isn't discouraging — it tells the implementer exactly what to add. A great spec can lean on
extensions as long as it's honest about them.
