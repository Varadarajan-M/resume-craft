# CLAUDE.md — Resume Craft Project Context

> This file provides essential context for AI assistants working on this codebase.
> Read this before making any changes.

## Project Overview

**Resume Craft** is an open-source, AI-powered resume builder web application. Users can create professional, ATS-friendly resumes using modern templates, a real-time WYSIWYG editor, AI-powered content suggestions, and smart PDF import. The app supports both authenticated (Clerk) and anonymous (IndexedDB) users.

**Live URL**: `https://theresumecraft.vercel.app`
**Repository**: `https://github.com/Varadarajan-M/resume-craft`

---

## Tech Stack

| Layer            | Technology                                                     |
| ---------------- | -------------------------------------------------------------- |
| Framework        | **Next.js 15** (App Router, Turbopack, React Compiler enabled) |
| Language         | **TypeScript** (strict mode)                                   |
| Styling          | **Tailwind CSS v4** + `tw-animate-css`                         |
| UI Components    | **shadcn/ui** (new-york style) + **Radix UI** primitives       |
| State Management | **Zustand** with **Immer** middleware                          |
| Data Fetching    | **TanStack React Query v5**                                    |
| Authentication   | **Clerk** (`@clerk/nextjs`)                                    |
| Database         | **MongoDB** via **Mongoose**                                   |
| PDF Generation   | **@react-pdf/renderer** (server-rendered PDF components)       |
| PDF Viewing      | **@react-pdf-viewer** + **pdfjs-dist 3.4.120**                 |
| AI               | **Groq SDK** (default model: `meta-llama/llama-4-scout-17b`)   |
| Rich Text Editor | **TipTap** (ProseMirror-based)                                 |
| Animations       | **Motion** (Framer Motion successor)                           |
| Analytics        | **PostHog** (client-side instrumentation)                      |
| Package Manager  | **pnpm**                                                       |
| Font             | **Poppins** (Google Fonts, via `next/font`)                    |

---

## Project Structure (Feature-Sliced Design)

```
src/
├── app/                          # Next.js App Router
│   ├── (landing)/                # Public landing page (route group)
│   ├── (dashboard_group)/        # Authenticated pages (dashboard, documents, templates)
│   │   ├── dashboard/
│   │   ├── documents/
│   │   └── templates/
│   ├── builder/                  # Resume builder page (client-only)
│   ├── sign-in/ & sign-up/      # Clerk auth pages
│   ├── layout.tsx                # Root layout (providers: Theme, Clerk, ReactQuery)
│   └── globals.css               # Design tokens (oklch), Tailwind config, custom utilities
│
├── backend/                      # Server-side only code
│   ├── actions/                  # Next.js Server Actions ("use server")
│   │   ├── ai.ts                 # AI content enhancement & PDF text extraction
│   │   ├── resume.ts             # CRUD operations for resumes
│   │   ├── template.ts           # Template fetching/creation
│   │   └── utils.ts              # Auth verification (Clerk + React cache)
│   ├── config/
│   │   └── connection.ts         # MongoDB connection (singleton, React cache)
│   └── models/                   # Mongoose schemas
│       ├── resume.ts             # Resume document model
│       ├── template.ts           # Template model
│       └── config.ts             # AppConfig model (stores AI prompts)
│
├── features/                     # Feature modules (self-contained)
│   ├── dashboard/                # Dashboard page components
│   ├── documents/                # Document list, CRUD hooks (mutations/queries)
│   ├── templates/                # Template browsing & selection
│   ├── pdf-templates/            # @react-pdf/renderer template components
│   │   └── resume/
│   │       ├── clean-minimal/    # Minimal single-column template
│   │       └── standard/         # Standard single-column template
│   └── resume-builder/           # Core builder feature
│       ├── components/           # Builder UI (sections, preview, config panel)
│       ├── hooks/                # Auto-save, content enhancement, PDF text sync
│       ├── store/                # Zustand store (resume state + Immer mutations)
│       ├── lib/                  # Builder-specific constants
│       └── index.ts              # Public API (barrel exports)
│
├── shared/                       # Cross-feature shared code
│   ├── components/
│   │   ├── ui/                   # shadcn/ui components (button, dialog, input, etc.)
│   │   ├── common/               # App-wide components (ThemeSwitcher, AuthGuard, etc.)
│   │   └── animated/             # Motion/Framer animation wrappers
│   ├── hooks/                    # Global hooks (debounce, localStorage, mobile detect)
│   ├── lib/                      # Utilities, constants, providers
│   │   ├── utils.ts              # cn(), getUniqId(), safeJsonParse(), extractTextFromPdf()
│   │   ├── resume.ts             # Resume factory functions, placeholder data
│   │   ├── constants.ts          # GROQ_AI_MODEL, RESUME_SCHEMA, PostHog events
│   │   ├── html-parser.tsx       # HTML → @react-pdf components converter
│   │   ├── clerk.tsx             # Clerk provider wrapper
│   │   ├── next-themes.tsx       # Theme provider wrapper
│   │   ├── react-query.tsx       # React Query provider
│   │   └── queryClient.ts        # Singleton QueryClient (SSR-safe)
│   ├── types/                    # Shared TypeScript interfaces
│   │   ├── resume.ts             # Resume, section item interfaces, ThemeConfig
│   │   ├── document.ts           # Document, DocumentTemplate base interfaces
│   │   └── ai.ts                 # AIContentSuggestion type
│   └── assets/                   # Static assets (SVGs, etc.)
│
└── middleware.ts                  # Clerk auth middleware + route redirects
```

---

## Key Architecture Patterns

### 1. Server Actions (Not API Routes)

All backend mutations/queries use **Next.js Server Actions** (`"use server"` directive). There are **no API routes** — everything goes through server actions in `src/backend/actions/`.

```
Pattern: Component → Server Action → Mongoose Model → MongoDB
```

### 2. State Management (Zustand + Immer)

The resume builder uses a single **Zustand store** with **Immer middleware** for immutable state updates:

- Store: `src/features/resume-builder/store/resume.ts`
- The store exposes granular mutators for each resume section (experience, education, skills, etc.)
- Each item has a UUID `id` field generated by `getUniqId()` (uuid v7)

### 3. Dual Persistence (Authenticated + Anonymous)

- **Authenticated users**: Auto-saved to MongoDB via server actions every 2 seconds, plus localStorage backup
- **Anonymous users**: Saved to **IndexedDB** via `idb-keyval` — no server interaction required
- Hook: `src/features/resume-builder/hooks/useAutoSaveAndLoadResume.ts`

### 4. PDF Rendering Architecture

- PDF templates are **@react-pdf/renderer** components (NOT browser DOM — they use `<Document>`, `<Page>`, `<View>`, `<Text>`)
- HTML from TipTap editor is parsed to react-pdf elements via `src/shared/lib/html-parser.tsx`
- `ResumePreviewPanel` is **dynamically imported** with `ssr: false` (PDF rendering is client-only)
- Template components live in `src/features/pdf-templates/resume/{template-name}/index.tsx`

### 5. Caching Strategy

- **Server-side**: `"use cache"` directive with `cacheTag()` + `cacheLife()` (Next.js experimental)
- **Client-side**: React Query with 10s default `staleTime`
- **DB connection**: Singleton via React `cache()` wrapper
- **AI prompts**: In-memory `Map` cache in `src/backend/actions/ai.ts`

### 6. Feature Barrel Exports

Each feature module has an `index.ts` that re-exports its public API. **Always import from the barrel file**, not internal paths (except for dynamic imports like PDF preview).

---

## Important Conventions

### Path Aliases

- `@/*` maps to `./src/*` (configured in tsconfig.json)

### shadcn/ui Configuration

```json
{
  "style": "new-york",
  "rsc": true,
  "aliases": {
    "components": "@/shared/components",
    "utils": "@/shared/lib/utils",
    "ui": "@/shared/components/ui",
    "lib": "@/shared/lib",
    "hooks": "@/shared/hooks"
  }
}
```

### Styling

- **Tailwind CSS v4** with `@theme inline` block in `globals.css`
- Design tokens use **oklch** color space
- Dark mode via `next-themes` (class-based: `.dark`)
- Custom utilities: `mesh-background`, `dot-pattern`, `highlight`
- Scrollbars are hidden globally (`::-webkit-scrollbar { display: none }`)

### IDs

- All entities use **UUID v7** via `getUniqId()` from `@/shared/lib/utils`
- Resume items have both `id` (app-level UUID) and `_id` (Mongoose ObjectId, excluded from clones)

### Authentication Flow

- **All routes are public** (`isPublicRoute` matches `/(.*)`); Clerk middleware handles redirects
- Authenticated users on `/`, `/sign-in`, `/sign-up` → redirect to `/dashboard`
- `/landing` → redirect to `/`
- Auth verification: `verifyAuth()` in `src/backend/actions/utils.ts` (cached per render)

### Error Handling

Server actions return a consistent shape:

```ts
{ success: boolean; message: string; data?: T; error?: string }
```

---

## Resume Data Model

The core `Resume` type extends `Document` and contains:

- **sections**: `personalInfo`, `summary`, `experience[]`, `education[]`, `skills.categories[]`, `projects[]`, `certifications[]`, `achievements[]`, `languages[]`
- **config**: `theme` (fonts, colors), `sectionDetails` (visibility map), `mainColumnSectionOrder`, `sideColumnSectionOrder`
- **templateId**: References a template name (e.g., `"clean-minimal"`, `"standard"`)

See full types in `src/shared/types/resume.ts`.

---

## Environment Variables

| Variable                            | Required | Description                  |
| ----------------------------------- | -------- | ---------------------------- |
| `DB_URL`                            | Yes      | MongoDB connection string    |
| `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY` | Yes      | Clerk publishable key        |
| `CLERK_SECRET_KEY`                  | Yes      | Clerk secret key             |
| `GROQ_API_KEY`                      | Yes      | Groq API key for AI features |
| `GROQ_AI_MODEL`                     | No       | Override default AI model    |
| `NEXT_PUBLIC_POSTHOG_KEY`           | No       | PostHog analytics key        |
| `NEXT_PUBLIC_POSTHOG_HOST`          | No       | PostHog host URL             |

---

## Commands

| Command      | Description                  |
| ------------ | ---------------------------- |
| `pnpm dev`   | Start dev server (Turbopack) |
| `pnpm build` | Production build             |
| `pnpm start` | Start production server      |
| `pnpm lint`  | Run ESLint                   |

---

## Critical Warnings

1. **DO NOT use `<img>` or browser DOM in PDF templates** — `@react-pdf/renderer` components use their own primitives (`View`, `Text`, `Image`, `Link`, etc.)
2. **PDF preview is client-only** — always use `dynamic(() => ..., { ssr: false })` for any component that renders PDF
3. **`canvas` is aliased to `false`** in webpack config for Node.js runtime (prevents pdfjs-dist server errors)
4. **React Compiler is enabled** (`experimental.reactCompiler: true`) — avoid patterns that break compiler assumptions (manual memo/ref tricks may behave differently)
5. **`"use cache"` is experimental** — currently used for resume fetching and template listing
6. **AI system prompts are stored in MongoDB** (`AppConfig` collection), not in code — they're fetched and cached at runtime
7. **The Zustand store uses Immer** — all state mutations inside `set()` should mutate the draft directly, not return new objects
