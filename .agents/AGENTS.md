# AGENTS.md — Resume Craft Coding Rules

> Project-scoped rules for AI agents working on this codebase.

## Code Style & Conventions

### TypeScript
- Use **strict TypeScript** — no `any` unless absolutely necessary (ESLint rule is off, but prefer strong types).
- Import types with `import type { ... }` when importing only type information.
- Use interfaces for object shapes, types for unions/aliases.
- Always use the `@/*` path alias (maps to `./src/*`). Never use relative paths that traverse above `src/`.

### React
- Use **function components** exclusively (no class components).
- Use **named exports** for components that are re-exported from barrel files.
- Use **default exports** for page components and components imported dynamically.
- Prefer `const Component = () => { ... }` arrow function style (project convention).
- Use **React 19** features where appropriate (server components are default).

### Naming
- Files: `PascalCase.tsx` for components, `camelCase.ts` for utilities/hooks.
- Hooks: `use` prefix (e.g., `useAutoSaveResume`, `useDocumentListQuery`).
- Server Actions: `*Action` suffix (e.g., `createResumeAction`, `getAllResumesAction`).
- Constants: `UPPER_SNAKE_CASE` (e.g., `GROQ_AI_MODEL`, `RESUME_BUILDER_SECTIONS`).

### State Management
- All resume state goes through the Zustand store at `src/features/resume-builder/store/resume.ts`.
- Use **Immer-style mutations** inside `set()` — mutate the draft object directly.
- Never create new Zustand stores for resume data — extend the existing one.
- For server-state, use **React Query** hooks (queries for reads, mutations for writes).

### Styling
- Use **Tailwind CSS v4** utility classes.
- Use **oklch** color tokens defined in `globals.css` via CSS custom properties.
- Use `cn()` from `@/shared/lib/utils` for conditional class merging (clsx + tailwind-merge).
- Dark mode is class-based (`.dark`); use `dark:` variant in Tailwind.
- Never use inline styles in React components (except in @react-pdf/renderer templates where Tailwind doesn't apply).

## Architecture Rules

### Feature Module Boundaries
- Features are self-contained in `src/features/{feature-name}/`.
- Features export their public API via `index.ts` barrel file.
- **Import from barrel files** (`@/features/documents`) not internal paths (`@/features/documents/components/DocumentList`).
- Exception: dynamic imports and circular dependency avoidance.
- Features can depend on `shared/` but NOT on other features' internal modules.

### Server Actions
- All server actions must include `"use server"` at the top of the file.
- Always call `connectDb()` before any database operation.
- Always call `verifyAuth()` for authenticated operations.
- Return the standard response shape: `{ success: boolean; message: string; data?: T; error?: string }`.
- Use `revalidateTag()` after mutations to bust the cache.
- Convert Mongoose documents to plain objects via `JSON.parse(JSON.stringify(doc))`.

### Components
- shadcn/ui components live in `src/shared/components/ui/` — do not modify unless adding variants.
- Common reusable components go in `src/shared/components/common/`.
- Feature-specific components go in `src/features/{feature}/components/`.
- PDF template components go in `src/features/pdf-templates/resume/{template-name}/`.

### PDF Templates
- Use only `@react-pdf/renderer` primitives: `Document`, `Page`, `View`, `Text`, `Image`, `Link`, `Svg`.
- Style with inline JS style objects (CSS-in-JS) — Tailwind does NOT work in PDF context.
- Use `htmlParser()` from `@/shared/lib/html-parser.tsx` to convert rich text HTML to PDF elements.
- Always render PDF components client-side with `dynamic(() => ..., { ssr: false })`.

## Documentation
- Preserve all existing comments and JSDoc annotations.
- Add JSDoc for new server actions and exported functions.
- Keep the CLAUDE.md updated when making architectural changes.

## Testing
- No test framework is currently configured.
- When adding tests, co-locate test files with source (`*.test.ts` / `*.test.tsx`).

## Git
- Commit messages should be descriptive and conventional (e.g., `feat:`, `fix:`, `refactor:`).
- Do not commit `.env.local` or any files with secrets.
