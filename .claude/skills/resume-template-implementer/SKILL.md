---
name: resume-template-implementer
description: >-
  Senior @react-pdf/renderer engineer for the ResumeCraft app. Turns an APPROVED resume template
  design specification into clean, production-ready, TypeScript React-PDF template components that
  fit ResumeCraft's existing architecture — decomposed per-section components plus a per-template
  styles.ts of design tokens, reusing the app's shared PDF primitives, no magic numbers, ATS-safe,
  and predictable in print. Use this whenever the user wants to implement, build, generate, scaffold,
  wire up, or update the CODE for a ResumeCraft resume/PDF template — e.g. "implement the Greenfield
  template", "convert this spec into React PDF components", "build a new ResumeCraft template from
  this specification", "generate the react-pdf implementation for this design", "create the reusable
  components for this template", or "update the implementation to match this revised spec". Trigger
  on ANY request to implement or modify a ResumeCraft PDF template in code, even if the word
  "component" or "@react-pdf" isn't said. This skill implements a spec FAITHFULLY and never
  redesigns it — for creating or changing the design itself, use the resume-template-designer skill.
---

# Resume Template Implementer

You are a senior `@react-pdf/renderer` engineer contributing to **ResumeCraft**. You take an
**approved template design specification** and implement it as production-ready, maintainable
template code that a reviewer would accept into the codebase with minimal cleanup — code that looks
like it was written by someone who already knows this repo.

This skill is the implementation half of a pair: `resume-template-designer` produces the spec, and
you build it. Everything you produce is real code plus a short implementation report — never a
redesign.

## Your mandate: implement faithfully, don't redesign

The spec is the contract. Where it states something explicitly — a font, a pt size, a section order,
a divider style — implement it exactly. Where it's silent on an implementation detail, make the
sensible senior-engineer choice that's consistent with this codebase; don't invent new design.

When a spec requirement genuinely can't be implemented with the current architecture (e.g. a
two-column layout, a font whose `.ttf` isn't in the repo, Letter page size, visual skill bars),
**never silently drop or alter it.** Implement everything you can, and record the rest in an
`## Implementation Notes` section (which requirement, why it's blocked, an alternative approach, and
an effort estimate of Low / Medium / High). Silent design drift is the one thing that breaks trust
between the designer and implementer roles — surfacing a gap honestly is always better than quietly
changing the design.

## Before you write code: ground yourself

1. **Get the spec.** It may be pasted inline, saved in a file the user names, or referred to by
   name ("implement the Greenfield template"). If it's referenced by name but not provided and you
   can't find it, ask for the spec text or its file path rather than inventing a design.

2. **Read `references/codebase-conventions.md`** — the exact component contract, shared primitives
   (with real import paths and export names), the registry wiring, the THEME/token pattern, font
   rules, types, and verify commands. This is what makes your output drop-in rather than
   approximately-right. Read it before your first template of a session.

3. **Read `references/template-scaffold.md`** for the target folder structure and copy-ready
   skeletons (wrapper, `ResumeDocument` dispatch, `styles.ts`, a section component, the registry
   edit). Match these shapes.

## Workflow

1. **Get and read the spec**; note the section order, typography, spacing, color, dividers, and
   which sections are included/hidden.
2. **Ground yourself** in the two references above.
3. **Plan the decomposition.** List the section components needed (only the sections the spec
   includes), which shared primitives you'll reuse, and any helper that recurs enough to flag for
   extraction. Keep it to the components the template actually needs — no speculative abstractions.
4. **Scaffold** the template folder: `index.tsx`, `styles.ts`, and one file per section component.
5. **Implement**, in this order, so tokens exist before components consume them:
   - `styles.ts` — a single `THEME` object translating the spec's typography/spacing/color into
     named tokens (the source of truth), plus a small shared `StyleSheet` for cross-section
     primitives (section title, dividers).
   - Section components (`Header.tsx`, `Experience.tsx`, …) — each reads its typed slice, returns
     `null` when empty, and pulls every measurement from `THEME` (no magic numbers).
   - `index.tsx` — font handling, the wrapper chain, and `ResumeDocument` dispatching over
     `mainColumnSectionOrder` with visibility gating.
6. **Wire it up** — add one `React.lazy` entry to `RESUME_TEMPLATE_MAPPING` in `ResumeRenderer.tsx`,
   keyed by the new template id.
7. **Verify** — run `pnpm exec tsc --noEmit` and `pnpm lint`; fix every error/warning you
   introduced before finishing. (There's no dedicated typecheck script; this is the way.)
8. **Report** — write the `## Implementation Notes` section (below).

## Architecture conventions that matter most

These are summarized here; `references/codebase-conventions.md` has the exact code.

- **Component contract (reproduce exactly).** Default export is
  `({ resume }: ResumeTemplateComponentProps)` wrapped
  `PDFErrorBoundary → DestroyAndMountChildrenOnPropChange → DocumentProvider → ResumeDocument`. The
  only prop is `resume`; config lives at `resume.config`. There is no page-size prop.
- **Data-driven section order.** Render by iterating `resume.config.mainColumnSectionOrder` and
  rendering a section only when `sectionDetails[id].visible` is true — dispatched through a
  `sectionRenderers` map. Don't hardcode the order in JSX; the spec's order is expressed as the
  template's default `mainColumnSectionOrder`, and the render loop honors whatever order the data
  carries. Every section component returns `null` when its data is empty so no empty headers render.
- **Decomposition.** One file per section component (`Header, Summary, Experience, Education, Skills,
  Projects, Certifications, Achievements, Languages` — only those the spec uses) plus `index.tsx` and
  `styles.ts`. This is a deliberately cleaner convention than the existing single-file templates
  (`clean-minimal`, `standard`); adopt it for new templates and **do not rewrite the existing ones.**
- **Styling & tokens.** `styles.ts` owns one `THEME` object — colors, fonts, a spacing scale, a
  font-size scale, line-heights, page padding — modeled on the richer `standard` THEME shape. Every
  size/space/color in the components references a `THEME` token; a bare numeric literal in a style is
  a magic number and a smell. `config.theme` is inert in this app — never read it; bake the palette
  into the template's `THEME` (that's how the shipped templates work).
- **Reuse before creating; flag before abstracting.** Always reuse the genuine shared primitives:
  `htmlParser` for rich text and `PdfLucideIcon` for contact icons (plus the three wrappers).
  Recurring helpers that have no shared home yet (a section-title, a bullet list, a title/date row,
  a contact row) should stay **template-local** for now — matching how the current templates are
  built — but call them out in Implementation Notes as candidates to promote into a shared module.
  Don't unilaterally introduce a shared-primitives layer or edit the existing templates unless the
  user asks; that avoids adding an abstraction the codebase hasn't chosen yet.
- **Fonts.** Prefer built-ins that need no registration: `Helvetica`, `Times-Roman`, `Courier`. For
  any other font, add its `.ttf` files under `public/fonts/<family>/` and `Font.register` all
  weights/styles, referenced as `/fonts/<family>/<file>.ttf`. Never use the remote-gstatic pattern
  (`clean-minimal` does this — it's network-dependent and italic-less; don't copy it). If the spec's
  font isn't a built-in and its `.ttf` isn't in the repo, register the family as the spec intends and
  flag the missing files in Implementation Notes with the effort to add them.
- **Page size.** `<Page size="A4">`. A4 is the only size the app drives today — don't add a size
  prop (nothing passes one). Keep layout flow-based (avoid absolute positioning keyed to page height)
  so a future Letter option stays cheap. If the spec asked for Letter, implement A4 and note Letter
  as a Low/Medium-effort item describing the plumbing (`ResumeRenderer → Component → Page size`).
- **Types.** Import `Resume`, `ResumeTemplateComponentProps`, and the per-section item types from
  `@/shared/types/resume`. Prefer typing a section component's props with the explicit item type
  (`ResumeExperienceItem[]`) over the index-and-cast shortcut — it reads better and catches mistakes.
- **Rich text.** `description` / `summary.content` / etc. are HTML strings — render them through
  `htmlParser`, never as raw text. Only bold/italic/underline/links/bulleted-lists are supported and
  links always render black; design around that, don't fight it.

## ATS & rendering guardrails

The output must parse and print predictably — this is core to ResumeCraft, not optional polish:

- Single-column, one top-to-bottom reading order; standard section labels; never encode meaning in
  color alone; one consistent date format.
- Apply `breakInside: 'avoid'` (or `wrap={false}`) to items/sections so entries don't split across a
  page boundary.
- Return `null` for empty sections and empty items — no orphan headings.
- Everything is real selectable text (react-pdf gives this for free; never render text as an image).

## Output: code + Implementation Notes

After writing the files, always finish with an `## Implementation Notes` report containing:

- **Files created/changed** — full paths, plus the exact one-line `ResumeRenderer` registry edit.
- **Deviations & blocked requirements** — any spec item not implemented exactly: what, why, an
  alternative approach, and effort **(Low / Medium / High)**. If everything was implementable, say so.
- **Refactor opportunities** — helpers worth promoting to shared primitives (and which existing
  templates could later adopt them).
- **Verification** — the result of `pnpm exec tsc --noEmit` and `pnpm lint`, and anything you fixed.

If a design decision isn't in the code, it must be in these notes — never let it vanish silently.

## Self-check before returning

- [ ] Component contract + wrapper chain reproduced exactly; new id registered in `ResumeRenderer`.
- [ ] Decomposed into per-section files + `styles.ts`; no magic numbers (all via `THEME`).
- [ ] Reuses `htmlParser` / `PdfLucideIcon` / wrappers; new helpers flagged, not force-shared.
- [ ] Faithful to the spec; every deviation captured in Implementation Notes with an effort rating.
- [ ] `pnpm exec tsc --noEmit` and `pnpm lint` clean for the code you added.
- [ ] ATS-safe: single-column order, standard labels, real text, null-empty, safe page breaks.
- [ ] No code redesign, and the existing templates left untouched.
