# Seed Setup — Canonical Files

The reusable, non-destructive seed for provisioning template DB records. Create these once if they
don't exist; thereafter just append entries to the data file. Runs with **plain Node ESM** — no
`tsx`/`ts-node`/`dotenv` needed (the repo has none). Node ≥ 20.6 provides `--env-file`; this repo runs
Node 24. `mongoose` is already a dependency.

Design choices and why:
- **Self-contained `.mjs`** — defines its own schema (mirroring `src/backend/models/template.ts`) so
  it doesn't import through the `@/` path alias, which plain Node can't resolve. Same model name
  (`ResumeTemplate`) → same `resumetemplates` collection the app reads.
- **Upsert by `id`** — idempotent; re-running never duplicates and only touches the templates listed
  in the data file, so hand-created built-ins are never clobbered.
- **Data file as source of truth** — the app has no template-metadata registry in code; this becomes a
  small, version-controlled one for templates you manage.

## `scripts/templates.data.mjs`

```js
// Source of truth for resume templates managed by the seed script.
// Each entry mirrors the ResumeTemplate model (src/backend/models/template.ts).
// The seed upserts by `id`, so re-running is safe and idempotent.
//
// NOTE: the original built-in templates (clean-minimal, standard) were inserted
// manually and are intentionally NOT listed here, so the seed never overwrites
// their existing DB metadata. Add each NEW template you create below.

/**
 * @typedef {Object} TemplateSeed
 * @property {string} id            // must match the folder name, RESUME_TEMPLATE_MAPPING key, and templateId
 * @property {string} name
 * @property {string} description
 * @property {string} image         // "/templates/<id>.webp"
 * @property {string[]} tags
 * @property {string[]} mainColumnSectionOrder  // default section order; omit an id to hide it
 * @property {string[]} sideColumnSectionOrder
 */

/** @type {TemplateSeed[]} */
export const templates = [
  {
    id: 'greenfield',
    name: 'Greenfield',
    description:
      'A potential-forward, ATS-friendly single-column template for new grads and early-career candidates — leads with education, skills, and projects.',
    image: '/templates/greenfield.webp',
    tags: ['modern', 'ats', 'new-grad', 'single-column'],
    mainColumnSectionOrder: [
      'personalInfo',
      'summary',
      'education',
      'skills',
      'projects',
      'experience',
      'certifications',
      'achievements',
    ],
    sideColumnSectionOrder: [],
  },
];
```

## `scripts/seed-templates.mjs`

```js
// Upserts every template in templates.data.mjs into MongoDB.
// Run:  pnpm seed:templates   (loads DB_URL from .env.local via node --env-file)
import mongoose from 'mongoose';
import { templates } from './templates.data.mjs';

const uri = process.env.DB_URL;
if (!uri) {
  console.error('✗ DB_URL is not set. Ensure it exists in .env.local (loaded via node --env-file).');
  process.exit(1);
}

// Mirrors src/backend/models/template.ts — same model name => same `resumetemplates` collection.
const templateSchema = new mongoose.Schema(
  {
    id: { type: String, required: true },
    name: { type: String, required: true },
    image: { type: String },
    description: { type: String, required: true },
    tags: [{ type: String }],
    mainColumnSectionOrder: [{ type: String }],
    sideColumnSectionOrder: [{ type: String }],
  },
  { timestamps: true },
);

const ResumeTemplate =
  mongoose.models.ResumeTemplate || mongoose.model('ResumeTemplate', templateSchema);

async function main() {
  await mongoose.connect(uri, { serverApi: { version: '1', deprecationErrors: true } });
  console.log(`Connected. Upserting ${templates.length} template(s)…`);

  for (const t of templates) {
    if (!t.id || !t.name || !t.description) {
      console.warn(`  ⚠ skipped invalid entry: ${JSON.stringify(t)}`);
      continue;
    }
    const res = await ResumeTemplate.updateOne({ id: t.id }, { $set: t }, { upsert: true });
    console.log(`  ✓ ${t.id} (${res.upsertedCount ? 'inserted' : 'updated'})`);
  }

  await mongoose.disconnect();
  console.log(
    'Done. NOTE: the templates list is cached (cacheTag "templates", cacheLife "days") with no ' +
      'revalidation — restart the dev server to see changes in the app.',
  );
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
```

## `package.json` script

Add to `"scripts"`:

```json
"seed:templates": "node --env-file=.env.local scripts/seed-templates.mjs"
```

## Running it

```bash
pnpm seed:templates
```

- Requires `DB_URL` in `.env.local` (the same var the app uses).
- **Writes to the real database** — confirm the target before running.
- Idempotent: re-running upserts by `id`. To remove a seeded template, delete its data-file entry and
  drop the document (`db.resumetemplates.deleteOne({ id: '<id>' })`).
- After it runs, **restart the dev server** so the cached templates list refreshes.

## Adding future templates

Append one object to `templates` in `scripts/templates.data.mjs` and re-run `pnpm seed:templates`.
That's the whole recurring workflow — no changes to the seed script itself.
