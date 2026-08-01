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
