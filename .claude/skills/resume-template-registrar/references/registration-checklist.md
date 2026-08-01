# Template Registration Surface — Complete Checklist

Every place a template id is known in ResumeCraft, what it does, and the exact edit to register a new
one. The headline finding: **the UI is DB-driven and there is no type/enum/constant to touch** — the
real work is the DB record. Verified against the codebase.

## The one thing that makes a template appear: the DB record

The templates page, dashboard "suggested", and builder picker all read from MongoDB via:

```
useTemplatesQuery()  →  getAllTemplatesAction()  →  ResumeTemplate.find()  (src/backend/actions/template.ts)
```

`TemplateCard` renders `template.image || "/placeholder.jpg"`, `template.name`, `template.description`,
`template.tags`. The builder's `TemplateSelection` sets, on click:

```ts
templateId: template.id,
image: template.image,
config: { ...resume.config,
  mainColumnSectionOrder: template.mainColumnSectionOrder || [],
  sideColumnSectionOrder: template.sideColumnSectionOrder || [] },
```

So **no DB doc → the template is invisible in all three surfaces**, even though it renders in preview.

### The `ResumeTemplate` document shape

Model: `src/backend/models/template.ts` (collection `resumetemplates`, `timestamps: true`). Matched to
code by the **string `id` field** (which equals the `RESUME_TEMPLATE_MAPPING` key and `resume.templateId`):

```json
{
  "id": "greenfield",
  "name": "Greenfield",
  "description": "One-line pitch shown on the card.",
  "image": "/templates/greenfield.webp",
  "tags": ["modern", "ats"],
  "mainColumnSectionOrder": ["personalInfo","summary","education","skills","projects","experience","certifications","achievements"],
  "sideColumnSectionOrder": []
}
```

There is **no** `templateId`, `thumbnail`, `config`, `isPublic`, or `category` field — just the above.
`mainColumnSectionOrder` is the template's default section order (from the spec); omit a section id to
hide it by default (e.g. `languages` left out).

### THE CACHE GOTCHA (surface this every time)

`getAllTemplatesAction` is a `'use cache'` function with `cacheTag('templates')` and
`cacheLife('days')`, and **no code anywhere calls `revalidateTag('templates')`**. A freshly inserted
document therefore may not appear until the cache expires. **Restarting the dev server clears the
in-memory cache** and is the reliable way to see a newly seeded template. If you skip telling the
user this, correct wiring will look broken.

## Full reference map (grep of `clean-minimal` / `standard`)

| # | File | What the reference does | New template? |
|---|------|-------------------------|---------------|
| 1 | `src/features/resume-builder/components/resume-preview/ResumeRenderer.tsx` | `RESUME_TEMPLATE_MAPPING` — maps id → lazy PDF component; fallback `clean-minimal` | **Required** (implementer usually does it; verify) |
| 2 | `src/features/pdf-templates/resume/<id>/index.tsx` | the component source | **Required** (implementer builds it) |
| 3 | MongoDB `resumetemplates` collection | the DB record all UI reads | **Required — the missing piece; seed it** |
| 4 | `public/templates/<id>.webp` | preview image (`image` field points here) | **Required** (placeholder ok) |
| 5 | `src/app/(landing)/TemplatesSection.tsx` | hardcoded `['Clean Minimal','Standard']` marketing grid | Optional (only if wanted on landing) |
| 6 | `src/app/(landing)/LandingSections.tsx`, `src/shared/components/common/JsonLd.tsx` | hardcoded CTA + SEO URLs | Optional / cosmetic |
| 7 | `src/shared/lib/resume.ts` | default `templateId`/`image` fallbacks for placeholder resume | No edit (works for any id) |

### Required registry entry (step 1), if missing

In `ResumeRenderer.tsx`, add to `RESUME_TEMPLATE_MAPPING`:

```tsx
greenfield: React.lazy(() =>
  import("@/features/pdf-templates/resume/greenfield").then((module) => ({ default: module.default }))),
```

## What is NOT needed (don't invent it)

- **Types** — `src/shared/types/document.ts`: `Document.templateId` is `string`, and
  `DocumentTemplate.id` is `string`. No union/enum to extend.
- **Constants** — `src/shared/lib/constants.ts` has no template list or id enum (only PostHog events,
  the Groq model, and an AI `RESUME_SCHEMA` where `templateId` is just `['string','null']`).
- **Server action** — `createTemplateAction` exists but is wired to nothing; the seed script is the
  supported provisioning path (per project decision).

## Gotchas

- **Image 404, not fallback.** `TemplateCard` uses `template.image || "/placeholder.jpg"` — a *set*
  `image` that points at a missing file does not fall back; it 404s. So the `.webp` must actually
  exist at the path you put in `image`.
- **Landing name→id.** `TemplatesSection.tsx` derives the id via `name.replace(' ', '-').toLowerCase()`,
  which replaces only the **first** space. `'Clean Minimal'`→`clean-minimal` works, but a 3-word name
  like `'Modern Tech Pro'`→`modern-tech pro` (broken). If adding a multi-word name to the landing
  grid, verify/adjust the id mapping.
- **`id` must match everywhere** — the folder name, the `RESUME_TEMPLATE_MAPPING` key, the DB `id`
  field, and any `?templateId=` link must all be the identical string.
- **Creation flow** (`useCreateResumeFromSearchParams`) builds a `DocumentTemplate` from just the URL
  `templateId`, so `?templateId=<id>` works before a DB record exists — but the template still won't
  show in the DB-driven *lists* until seeded.
