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
