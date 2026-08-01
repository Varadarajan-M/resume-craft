---
name: resume-template-registrar
description: >-
  Wires a NEW ResumeCraft resume template into the running app so it actually shows up and is
  selectable — not just renders. Registers the template everywhere it must be known and, crucially,
  provisions its MongoDB record via a reusable, non-destructive seed script, so the DB-driven
  template listing page, the dashboard "suggested templates", and the builder's template picker all
  display it. Use this whenever an implemented template isn't visible in the app, or the user wants
  to "wire up", "register", "publish", "activate", "hook up", or "add to the DB / listings / picker"
  a resume template, or asks why a newly built template doesn't appear in template selection or on
  the templates page. Handles the component registry, the preview image (placeholder + follow-up
  flag), the seed/DB record, the templates-cache gotcha, and (optionally) the landing-page grid.
  Idempotent — safe to run whether or not the template was already partly wired. It does NOT design
  the template or write its React-PDF component code — use resume-template-designer for the spec and
  resume-template-implementer for the component.
---

# Resume Template Registrar

You make an already-implemented ResumeCraft template **usable in the running app**. Building the
template component is the implementer's job; your job is everything that makes it *discoverable and
selectable* — most importantly, the database record the UI reads from.

## The core insight: the app's template surfaces are DB-driven

A brand-new template component renders in the preview but appears **nowhere** in the UI, because the
three places a user finds templates all read from MongoDB, not from code:

- the **templates listing page** (`/templates`),
- the **dashboard "suggested templates"** section,
- the **builder's template picker** (`TemplateSelection`).

All three go through `useTemplatesQuery → getAllTemplatesAction`, which queries the `ResumeTemplate`
collection. So **the #1 missing piece for any new template is its DB record.** There is *no*
string-literal union, enum, or template-metadata constant to update — `templateId` is a plain
`string` throughout (see `references/registration-checklist.md`). This is why "add it to the types /
constants" turns out to be a no-op here, and the real work is the DB seed.

## Prerequisites (this skill assumes, and verifies, but does not create)

- The template **component** exists at `src/features/pdf-templates/resume/<id>/` with a default
  export (built by `resume-template-implementer`).
- It's registered in `RESUME_TEMPLATE_MAPPING` in `ResumeRenderer.tsx` (the implementer does this).

This skill re-checks both idempotently and adds the registry entry if it's missing, but it will not
write the component itself. If the component doesn't exist, stop and point the user at
`resume-template-implementer`.

## Before you start

Read both references:
- `references/registration-checklist.md` — the complete surface map: every touchpoint, the exact
  DB record shape, the cache gotcha, and what is deliberately *not* needed (types/constants).
- `references/seed-setup.md` — the canonical seed script, data file, `package.json` script, and run
  command. Create these from it if they don't exist yet.

## Workflow (idempotent — skip any step already done)

1. **Gather the template's metadata.** You need: `id` (the folder name / registry key / `templateId`),
   `name`, `description`, `tags`, `mainColumnSectionOrder`, and `sideColumnSectionOrder`. Pull the
   section order and audience/description from the approved spec (its *Section Order* and *Target
   Audience* / *Design Philosophy*); derive a short human `name` from the id. If a spec isn't
   available, read the template's `index.tsx`/`styles.ts` and infer sensibly, then state what you
   assumed.

2. **Verify the component registry.** Confirm `RESUME_TEMPLATE_MAPPING` in
   `src/features/resume-builder/components/resume-preview/ResumeRenderer.tsx` has an entry for this
   `id`. Add the one `React.lazy` line if missing (exact shape in the checklist reference).

3. **Preview image.** Ensure `public/templates/<id>.webp` exists (the model's `image` field points at
   `/templates/<id>.webp`, and cards 404 rather than fall back if the path is set but the file is
   missing). If it's absent, create a **placeholder** by copying an existing template's `.webp`, and
   **flag prominently** that it currently shows another template's preview and must be replaced with a
   real render of this template. (Keeping the canonical `/templates/<id>.webp` path means swapping in
   the real image later is a file replacement with no DB change.)

4. **Seed infrastructure.** Ensure `scripts/seed-templates.mjs`, `scripts/templates.data.mjs`, and the
   `package.json` `"seed:templates"` script exist — create them from `references/seed-setup.md` if
   not. Then add (or update) this template's entry in `scripts/templates.data.mjs`. The seed upserts
   by `id`, so re-running is safe. **Do not add the manually-created built-ins (`clean-minimal`,
   `standard`) to the data file** unless the user explicitly wants to bring them under seed
   management — you don't have their exact current DB metadata and would risk overwriting it.

5. **Run the seed** — `pnpm seed:templates` (needs `DB_URL` in `.env.local`). This writes to a real
   database, so **confirm with the user before running it** unless they've clearly authorized it. On
   success the script logs each upsert.

6. **The cache gotcha — always surface this.** `getAllTemplatesAction` is a `'use cache'` function
   tagged `cacheTag('templates')` with `cacheLife('days')`, and nothing in the app calls
   `revalidateTag('templates')`. So even after a successful seed, the listing/picker may keep showing
   the stale list until the cache expires. Tell the user to **restart the dev server** (which clears
   the in-memory cache) to see the new template. If they never hear this, they'll think the wiring
   failed.

7. **Optional landing-page grid.** The public landing page uses a *hardcoded* array
   (`['Clean Minimal', 'Standard']` in `src/app/(landing)/TemplatesSection.tsx`) — a new template
   won't appear there unless you add its display name. Only do this if the user wants the template on
   the marketing page. Watch the gotcha: the id is derived via `name.replace(' ', '-').toLowerCase()`,
   which only replaces the *first* space — a 3+word name won't map to the right id (checklist ref).

8. **Verify.** Run `pnpm exec tsc --noEmit` and `pnpm lint` for any TS you touched. Confirm the seed
   logged the upsert. Then tell the user exactly how to see it: restart `pnpm dev`, open `/templates`
   and the builder's template picker, and confirm the card appears (with the placeholder image).

## Guardrails

- **Idempotent and non-destructive.** Upsert by `id`; never overwrite the hand-created built-in
  template documents; adding the same template twice is a no-op update.
- **No types/constants busywork.** There is no union/enum/metadata array to edit — don't invent one.
  If asked to "add it to the types", explain that `templateId` is already `string` and the real
  registration is the DB record.
- **Real-DB safety.** The seed mutates the user's actual MongoDB. Confirm before running, and prefer
  upsert (reversible by deleting the one doc) over bulk operations.
- **Honest placeholders.** A copied `.webp` is a stand-in — say so, and leave a clear follow-up to
  render the real preview.

## Report when done

- **Files created/changed** — the scripts, the `package.json` script, the image, and any registry or
  landing edit (with paths).
- **DB record** — the exact document upserted (id, name, section orders) and the seed output.
- **To see it live** — the dev-server restart step (the cache note), and where the card appears.
- **Follow-ups** — replace the placeholder image with a real render; optionally bring built-ins under
  seed management; optionally add to the landing grid.

## Self-check

- [ ] DB record upserted via the seed; upsert keyed on `id`; built-ins untouched.
- [ ] Component registry entry present; `public/templates/<id>.webp` exists (placeholder flagged).
- [ ] Seed script + data file + `package.json` script exist and run cleanly.
- [ ] Cache/restart step communicated to the user.
- [ ] `tsc --noEmit` and `lint` clean for touched TS; no types/constants invented.
- [ ] Clear report: what changed, the DB doc, how to see it, and the image follow-up.
