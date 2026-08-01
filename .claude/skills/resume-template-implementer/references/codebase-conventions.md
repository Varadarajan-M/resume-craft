# ResumeCraft Template Conventions — Exact Code Facts

Read before implementing. These are the real signatures, import paths, and export names in the
repo — using them verbatim is what makes generated code drop in without cleanup. Path alias:
`@/*` → `./src/*`.

## Table of contents
1. Where things live
2. The component contract (wrapper + props)
3. Section dispatch + visibility gating
4. Shared primitives to reuse (exact names)
5. THEME / styling convention
6. Fonts
7. Types to import
8. Registry wiring (the one required edit)
9. Verify commands
10. Gotchas

---

## 1. Where things live

- Templates: `src/features/pdf-templates/resume/<template-id>/index.tsx` (existing:
  `clean-minimal`, `standard` — each is a single self-contained file today).
- Shared wrappers (one level up, NOT inside template folders):
  - `src/features/pdf-templates/PDFErrorBoundary.tsx` — default export
  - `src/features/pdf-templates/DocumentProvider.tsx` — default export
  - `src/features/pdf-templates/DestroyAndMountChildrenOnPropChange.tsx` — default export
- Rich-text parser: `src/shared/lib/html-parser.tsx` — **named** export `htmlParser`.
- Icon: `src/shared/components/common/LucideToReactPdfIcon.tsx` — **named** export `PdfLucideIcon`
  (the export name is NOT `LucideToReactPdfIcon`).
- Utils: `src/shared/lib/utils.ts` — `getUniqId()`, `kebabToPascalCase()`.
- Registry: `src/features/resume-builder/components/resume-preview/ResumeRenderer.tsx`.
- Types: `src/shared/types/resume.ts`.
- Fonts on disk: `public/fonts/<family>/<file>.ttf` (referenced in code as `/fonts/<family>/...`).
- **No barrel** exists for `pdf-templates` — templates are loaded by direct path import. Don't add
  or edit a barrel.

## 2. The component contract (wrapper + props)

Prop type (from `@/shared/types/resume`): `export interface ResumeTemplateComponentProps { resume: Resume; }`
— the ONLY prop is `resume`. Config is `resume.config`. There is no page-size prop.

The template's `index.tsx` must start with the **`'use client';`** directive (the wrapper chain pulls
in client-only code such as `DocumentProvider`), matching both shipped templates.

The default export is a thin wrapper; a nested `ResumeDocument` renders the actual `<Document>`.
Reproduce this chain exactly:

```tsx
const GreenfieldResumeTemplate = ({ resume }: ResumeTemplateComponentProps) => (
  <PDFErrorBoundary>
    <DestroyAndMountChildrenOnPropChange prop={resume}>
      {(key) => (
        <DocumentProvider key={key}>
          <ResumeDocument resume={resume} />
        </DocumentProvider>
      )}
    </DestroyAndMountChildrenOnPropChange>
  </PDFErrorBoundary>
);
export default GreenfieldResumeTemplate;
```

Wrapper roles (don't reimplement them — just wrap):
- `PDFErrorBoundary` — class boundary; catches react-pdf errors and auto-retries. Props
  `{ children: ReactElement; fallback?; onError?; retryDelay? }`.
- `DestroyAndMountChildrenOnPropChange` — `{ prop: unknown; children: (key: string) => ReactNode }`;
  gives an incrementing `key` on `resume` change to force a clean remount.
- `DocumentProvider` — wraps its single child in react-pdf's `BlobProvider` and renders the preview;
  also owns zoom. It is NOT a React context and exposes no hook — consume it purely structurally.
  Its `children` prop is a single `React.JSX.Element`.

## 3. Section dispatch + visibility gating

`ResumeDocument` builds a `sectionRenderers` map and iterates `mainColumnSectionOrder`, rendering a
section only when it's both mapped and visible. This is the canonical pattern:

```tsx
const sections = resume?.sections;
const { mainColumnSectionOrder, sectionDetails } = resume?.config ?? {};

const sectionRenderers: Record<string, () => JSX.Element | null> = {
  personalInfo:  () => <Header data={sections?.personalInfo} />,
  summary:       () => <Summary data={sections?.summary} />,
  experience:    () => <Experience data={sections?.experience} />,
  education:     () => <Education data={sections?.education} />,
  skills:        () => <Skills data={sections?.skills} />,
  projects:      () => <Projects data={sections?.projects} />,
  certifications:() => <Certifications data={sections?.certifications} />,
  achievements:  () => <Achievements data={sections?.achievements} />,
  languages:     () => <Languages data={sections?.languages} />,
};

return (
  <Document>
    <Page size="A4" style={baseStyles.page}>
      {mainColumnSectionOrder?.map((id) => {
        const render = sectionRenderers[id];
        if (render && sectionDetails?.[id]?.visible) {
          return <Fragment key={id}>{render()}</Fragment>;
        }
        return null;
      })}
    </Page>
  </Document>
);
```

- `Fragment` and `JSX` are imported from `react`: `import { Fragment, JSX } from 'react'`. Use bare
  `JSX.Element` (not `React.JSX.Element` — the `React` namespace isn't imported).
- Only include renderer entries for sections the template actually supports; but keying by the exact
  section ids (`personalInfo, summary, experience, education, skills, projects, certifications,
  achievements, languages`) is required — these are the ids used in `mainColumnSectionOrder` and
  `sectionDetails`.
- `config.sideColumnSectionOrder` exists in the type but no template renders it (single-column app).

## 4. Shared primitives to reuse (exact names)

- **Rich text** — `import { htmlParser } from '@/shared/lib/html-parser'`. Signature
  `htmlParser(html: string | null): JSX.Element`. **Wrap in a `<View>`, never a `<Text>`** —
  `htmlParser` emits block-level `<View>`s for `ul/ol/li`, and react-pdf throws on a `<View>` nested
  inside a `<Text>` (this is how `clean-minimal` does it). So: `<View>{htmlParser(exp.description)}</View>`.
  Also **guard before calling**: HTML fields are typed `string | undefined` while `htmlParser` takes
  `string | null`, so write `exp.description ? <View>{htmlParser(exp.description)}</View> : null`.
  Supports `p, strong, em, u, a, ul, ol, li, br`; `li` renders an SVG bullet; links render black. Use
  it for every HTML field (`summary.content`, `exp.description`, `edu.description`,
  `project.description`, `certification.description`, `achievement.description`).
- **Contact icons** — `import { PdfLucideIcon } from '@/shared/components/common/LucideToReactPdfIcon'`.
  Props `{ name: string; size?: number; color?: string }`; `name` is a kebab-case Lucide name
  (`mail`, `phone`, `map-pin`, `link`, `github`, `linkedin`). Usage:
  `<PdfLucideIcon name="mail" size={10} color={THEME.colors.secondary} />`. `personalInfo.links[]`
  items carry their own `iconName`.
- **Utils** — `import { getUniqId, kebabToPascalCase } from '@/shared/lib/utils'` if needed (items
  already carry `id`s, so you rarely need `getUniqId` in a template).

There are **no** shared `Section` / `ContactRow` / `SubsectionRow` / `BulletList` components — those
are declared locally inside each existing template. Reuse the primitives above; keep your own such
helpers template-local and flag them for extraction (see SKILL.md).

## 5. THEME / styling convention

Pattern: a plain `const THEME` object of tokens, then `StyleSheet.create({...})` referencing THEME,
with occasional inline style arrays at call sites (`style={[styles.a, { marginTop: THEME.spacing.xs }]}`).
Model the richer `standard` shape (add what the spec needs):

```ts
const THEME = {
  colors:    { primary: '#000', secondary: '#444', border: 'grey', background: '#fff' },
  fonts:     { main: 'Helvetica' },
  spacing:   { xs: 2, sm: 4, md: 6, lg: 8, xl: 12 },
  fontSizes: { xs: 9, sm: 10, md: 10.5, lg: 11, xl: 12.4, name: 22 },
  lineHeights:{ body: 1.3, display: 1.1 },
  page:      { paddingHorizontal: 22, paddingTop: 20, paddingBottom: 24 },
} as const;
```

Rules:
- Put THEME in `styles.ts` and export it; components import tokens from there. This is the "styling
  centralized / design tokens" convention — one place to tune the design system.
- Every measurement in a component comes from a THEME token. No bare numbers in styles.
- Sizes are **points** (unitless numbers = pt in react-pdf). `flexBasis` uses `%` strings. Alignment
  of title-left / date-right is `flexDirection: 'row'` + `flexBasis` percentages (no grid, no floats).
- `config.theme` (`ThemeConfig`) is declared in the types but consumed by NO template — do not read
  it. Colors/fonts are hardcoded per template via THEME (this is the intended pattern, not a bug).

## 6. Fonts

- **Built-in, no registration:** `Helvetica`, `Times-Roman`, `Courier` (and their bold/oblique
  variants) — just set `fontFamily: 'Helvetica'`. Prefer these when the spec's font matches.
- **Local .ttf (preferred for custom fonts)** — mirror `standard`:

```ts
Font.register({ family: 'Tinos', fonts: [
  { src: '/fonts/tinos/Tinos-Regular.ttf' },
  { src: '/fonts/tinos/Tinos-Bold.ttf', fontWeight: 'bold' },
  { src: '/fonts/tinos/Tinos-Italic.ttf', fontStyle: 'italic' },
  { src: '/fonts/tinos/Tinos-BoldItalic.ttf', fontWeight: 'bold', fontStyle: 'italic' },
]});
```
  Call `Font.register` once at module top level (outside the component). Only `Tinos` ships today.
- **Do NOT** copy `clean-minimal`'s remote gstatic Helvetica registration — it's network-dependent
  and has no italic. If a spec needs a font whose `.ttf` isn't in `public/fonts/`, register it as
  intended and flag the missing files (with effort) in Implementation Notes.

## 7. Types to import

From `@/shared/types/resume`:
- `Resume`, `ResumeTemplateComponentProps`.
- Section item types: `ResumePersonalInfoItem`, `ResumeProfessionalSummaryItem` (`.content` HTML),
  `ResumeExperienceItem`, `ResumeEducationItem`, `ResumeSkillItem` (`.categories`),
  `ResumeSkillCategoryItem`, `ResumeSkill`, `ResumeProjectItem`, `ResumeCertificationItem`,
  `ResumeAchievementItem`, `ResumeLanguageItem`, `ResumeLinkItem`.

Type each section component's props with the explicit item type, e.g.
`({ data }: { data?: ResumeExperienceItem[] })` for list sections and
`({ data }: { data?: ResumePersonalInfoItem })` for the single-object sections
(`personalInfo`, `summary`, `skills`). This is cleaner than the `Resume["sections"]["experience"]`
index-and-cast the existing templates use. `ThemeConfig`/`SectionMeta` are not exported and not
needed.

Note field shapes: `skills` is `{ categories: [{ name, skills: [{ name, level? }] }] }` — render
category name + comma-joined skill names; `level` is not rendered by convention. `languages[]` have
`.proficiency` (text, no meter). Rendering skill-level or proficiency visually is an extension —
flag it, don't invent it.

## 8. Registry wiring (the one required edit)

In `ResumeRenderer.tsx`, `RESUME_TEMPLATE_MAPPING` maps `templateId` → lazy component. Add one entry:

```tsx
const RESUME_TEMPLATE_MAPPING: Record<string, React.ComponentType<Pick<ResumeRendererProps, "resume">>> = {
  "clean-minimal": React.lazy(() => import("@/features/pdf-templates/resume/clean-minimal").then((m) => ({ default: m.default }))),
  standard:        React.lazy(() => import("@/features/pdf-templates/resume/standard").then((m) => ({ default: m.default }))),
  greenfield:      React.lazy(() => import("@/features/pdf-templates/resume/greenfield").then((m) => ({ default: m.default }))), // ← add
};
```

The lazy `import("@/features/pdf-templates/resume/<id>")` resolves to that folder's `index.tsx`
default export. Fallback is `clean-minimal`. That's the only wiring change — no barrels, no other
files. The `templateId` reaches here from `resume.templateId` (set by the `?templateId=` param or
defaulting to `clean-minimal`).

## 9. Verify commands

Package manager: **pnpm**. No dedicated typecheck script exists. Use:
- Typecheck: `pnpm exec tsc --noEmit` (tsconfig has `noEmit: true`).
- Lint: `pnpm lint` (`next lint`).
- Full build (heavier; also typechecks + lints): `pnpm build` — run only if asked or if tsc/lint pass
  but you want end-to-end confidence.

Fix every error/warning you introduce before finishing.

## 10. Gotchas

- `index.tsx` must begin with `'use client';` (both shipped templates do) and import `JSX` from
  `react` — use bare `JSX.Element`, not `React.JSX.Element`.
- `htmlParser(...)` output goes inside a `<View>`, never a `<Text>` (it emits block `<View>`s for
  lists; react-pdf forbids `<View>` in `<Text>`).
- Import only the types you use — an unused `Resume`/type import trips `no-unused-vars` under
  `pnpm lint`.
- Export name is `PdfLucideIcon`, not the filename `LucideToReactPdfIcon`.
- `DocumentProvider` takes a single child element — pass exactly one `ResumeDocument`.
- Return `null` from a section renderer when its data is missing/empty (existing pattern) so
  `mainColumnSectionOrder` can list a section that has no data yet without rendering an empty block.
- react-pdf `StyleSheet` doesn't support every CSS prop — stick to flexbox layout, spacing, borders,
  colors, and text styles used by the existing templates. No CSS grid, floats, box-shadow, or
  background images.
- `fontWeight: 'bold'` / `fontStyle: 'italic'` only work if that weight/style was registered (for
  custom fonts) — register all needed variants.
