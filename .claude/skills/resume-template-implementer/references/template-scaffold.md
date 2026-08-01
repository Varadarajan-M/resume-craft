# Template Scaffold — Target Structure + Copy-Ready Skeletons

The shapes a new template should follow. Adapt values to the spec; keep the structure. Every numeric
value in a style comes from a `THEME` token — the skeletons show this so "no magic numbers" is the
path of least resistance, not extra work.

## Target folder structure

```
src/features/pdf-templates/resume/<template-id>/
├── index.tsx          # Font.register (only if custom font), wrapper chain, ResumeDocument dispatch
├── styles.ts          # THEME tokens (source of truth) + shared StyleSheet (section title, dividers)
├── Header.tsx         # personalInfo lockup + contact row (PdfLucideIcon)
├── Summary.tsx        # summary.content via htmlParser
├── Experience.tsx
├── Education.tsx
├── Skills.tsx
├── Projects.tsx
├── Certifications.tsx
├── Achievements.tsx
└── Languages.tsx      # only if the spec includes it
```

Only create the section files the spec actually uses. Each section component is small, typed,
returns `null` when empty, and imports tokens from `./styles`. `SectionTitle` (and any bullet/row
helper) can live in `styles.ts` as a tiny component or in its own file — keep it template-local for
now and flag it for extraction in Implementation Notes.

## `styles.ts`

```ts
import { StyleSheet } from '@react-pdf/renderer';

// Single source of truth for this template's design tokens (translated from the spec).
export const THEME = {
  colors:      { primary: '#1a1a1a', secondary: '#555555', accent: '#1f7a4d', background: '#ffffff' },
  fonts:       { main: 'Helvetica' },                 // built-in → no Font.register needed
  spacing:     { xs: 2, sm: 4, md: 6, lg: 8, section: 12 },
  fontSizes:   { xs: 9, sm: 10, md: 10.5, lg: 11, headline: 11, name: 22 },
  lineHeights: { body: 1.3, display: 1.1 },
  page:        { paddingHorizontal: 22, paddingTop: 20, paddingBottom: 24 },
  rule:        { width: 20, height: 1.5 },            // the spec's "runway" marker
} as const;

// Shared, cross-section styles built from THEME (page frame + the section-title primitive).
export const baseStyles = StyleSheet.create({
  page: {
    fontFamily: THEME.fonts.main,
    fontSize: THEME.fontSizes.sm,
    lineHeight: THEME.lineHeights.body,
    color: THEME.colors.primary,
    backgroundColor: THEME.colors.background,
    paddingHorizontal: THEME.page.paddingHorizontal,
    paddingTop: THEME.page.paddingTop,
    paddingBottom: THEME.page.paddingBottom,
  },
  section: { marginTop: THEME.spacing.section },
  sectionTitle: {
    fontSize: THEME.fontSizes.lg,
    fontWeight: 'bold',
    textTransform: 'uppercase',
    letterSpacing: 0.75,
  },
  runwayRule: {
    width: THEME.rule.width,
    height: THEME.rule.height,
    backgroundColor: THEME.colors.accent,   // decorative only; greyscale-safe if removed
    marginTop: THEME.spacing.xs,
    marginBottom: THEME.spacing.sm,
  },
});
```

## `SectionTitle` (template-local primitive)

A tiny shared piece every section reuses — keep it here (or its own file). Flag it as an extraction
candidate.

```tsx
import { View, Text } from '@react-pdf/renderer';
import { baseStyles } from './styles';

const SectionTitle = ({ children }: { children: string }) => (
  <View wrap={false}>
    <Text style={baseStyles.sectionTitle}>{children}</Text>
    <View style={baseStyles.runwayRule} />
  </View>
);

export default SectionTitle;
```

## A section component — `Experience.tsx`

The template for every list section (title-left / date-right row, rich-text description, null-empty,
`wrap={false}` so items don't split across pages, all sizes from THEME):

```tsx
import { View, Text, StyleSheet } from '@react-pdf/renderer';
import { htmlParser } from '@/shared/lib/html-parser';
import { ResumeExperienceItem } from '@/shared/types/resume';
import { THEME, baseStyles } from './styles';
import SectionTitle from './SectionTitle';

const styles = StyleSheet.create({
  item:     { marginBottom: THEME.spacing.md },
  row:      { flexDirection: 'row', justifyContent: 'space-between' },
  titleCol: { flexBasis: '72%' },
  metaCol:  { flexBasis: '28%', textAlign: 'right', color: THEME.colors.secondary, fontSize: THEME.fontSizes.xs },
  title:    { fontSize: THEME.fontSizes.md, fontWeight: 'bold' },
  company:  { fontSize: THEME.fontSizes.sm },
});

const Experience = ({ data }: { data?: ResumeExperienceItem[] }) => {
  if (!data?.length) return null;

  return (
    <View style={baseStyles.section}>
      <SectionTitle>Experience</SectionTitle>
      {data.map((exp) => (
        <View key={exp.id} style={styles.item} wrap={false}>
          <View style={styles.row}>
            <View style={styles.titleCol}>
              <Text style={styles.title}>{exp.title}</Text>
              <Text style={styles.company}>{exp.company}</Text>
            </View>
            <View style={styles.metaCol}>
              <Text>{exp.timePeriod}</Text>
              {exp.location ? <Text>{exp.location}</Text> : null}
            </View>
          </View>
          {/* htmlParser emits block <View>s for lists — wrap in <View>, never <Text> */}
          {exp.description ? <View>{htmlParser(exp.description)}</View> : null}
        </View>
      ))}
    </View>
  );
};

export default Experience;
```

## `Header.tsx` (personalInfo + contact row)

Shows `PdfLucideIcon` usage and the links array. Header has no `SectionTitle`.

```tsx
import { View, Text, StyleSheet } from '@react-pdf/renderer';
import { PdfLucideIcon } from '@/shared/components/common/LucideToReactPdfIcon';
import { ResumePersonalInfoItem } from '@/shared/types/resume';
import { THEME } from './styles';

const styles = StyleSheet.create({
  header:   { marginBottom: THEME.spacing.sm },
  name:     { fontSize: THEME.fontSizes.name, fontWeight: 'bold', lineHeight: THEME.lineHeights.display },
  headline: { fontSize: THEME.fontSizes.headline, color: THEME.colors.secondary, marginTop: THEME.spacing.xs },
  contacts: { flexDirection: 'row', flexWrap: 'wrap', gap: THEME.spacing.md, marginTop: THEME.spacing.sm },
  contact:  { flexDirection: 'row', alignItems: 'center', gap: THEME.spacing.xs },
  contactText: { fontSize: THEME.fontSizes.xs, color: THEME.colors.secondary },
});

const Contact = ({ icon, text }: { icon: string; text: string }) => (
  <View style={styles.contact}>
    <PdfLucideIcon name={icon} size={THEME.fontSizes.xs} color={THEME.colors.secondary} />
    <Text style={styles.contactText}>{text}</Text>
  </View>
);

const Header = ({ data }: { data?: ResumePersonalInfoItem }) => {
  if (!data) return null;

  return (
    <View style={styles.header}>
      <Text style={styles.name}>{data.fullName}</Text>
      {data.headline ? <Text style={styles.headline}>{data.headline}</Text> : null}
      <View style={styles.contacts}>
        {data.email ? <Contact icon="mail" text={data.email} /> : null}
        {data.phone ? <Contact icon="phone" text={data.phone} /> : null}
        {data.location ? <Contact icon="map-pin" text={data.location} /> : null}
        {data.links?.map((link) => (
          <Contact key={link.id} icon={link.iconName ?? 'link'} text={link.label} />
        ))}
      </View>
    </View>
  );
};

export default Header;
```

## `index.tsx` (font + wrapper + dispatch)

```tsx
'use client'; // required: the wrapper chain pulls in client-only code (DocumentProvider)

import { Fragment, JSX } from 'react'; // import JSX from react; use bare JSX.Element (no `React.` namespace)
import { Document, Page } from '@react-pdf/renderer';
// import { Font } from '@react-pdf/renderer'; // only if using a custom (non-built-in) font
import PDFErrorBoundary from '@/features/pdf-templates/PDFErrorBoundary';
import DocumentProvider from '@/features/pdf-templates/DocumentProvider';
import DestroyAndMountChildrenOnPropChange from '@/features/pdf-templates/DestroyAndMountChildrenOnPropChange';
import { ResumeTemplateComponentProps } from '@/shared/types/resume'; // import only what you use
import { baseStyles } from './styles';
import Header from './Header';
import Summary from './Summary';
import Experience from './Experience';
import Education from './Education';
import Skills from './Skills';
import Projects from './Projects';
import Certifications from './Certifications';
import Achievements from './Achievements';

// Helvetica is built in — no Font.register. For a custom font, register all weights here (see conventions).

const ResumeDocument = ({ resume }: ResumeTemplateComponentProps) => {
  const sections = resume?.sections;
  const { mainColumnSectionOrder, sectionDetails } = resume?.config ?? {};

  const sectionRenderers: Record<string, () => JSX.Element | null> = {
    personalInfo:   () => <Header data={sections?.personalInfo} />,
    summary:        () => <Summary data={sections?.summary} />,
    education:      () => <Education data={sections?.education} />,
    skills:         () => <Skills data={sections?.skills} />,
    projects:       () => <Projects data={sections?.projects} />,
    experience:     () => <Experience data={sections?.experience} />,
    certifications: () => <Certifications data={sections?.certifications} />,
    achievements:   () => <Achievements data={sections?.achievements} />,
  };

  return (
    <Document>
      <Page size="A4" style={baseStyles.page}>
        {mainColumnSectionOrder?.map((id) => {
          const render = sectionRenderers[id];
          if (render && sectionDetails?.[id as keyof typeof sectionDetails]?.visible) {
            return <Fragment key={id}>{render()}</Fragment>;
          }
          return null;
        })}
      </Page>
    </Document>
  );
};

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

## Registry edit (`ResumeRenderer.tsx`)

Add one keyed entry to `RESUME_TEMPLATE_MAPPING`:

```tsx
greenfield: React.lazy(() =>
  import("@/features/pdf-templates/resume/greenfield").then((m) => ({ default: m.default }))),
```

## Notes on the skeletons

- These are structural templates, not the final design — pull the actual pt sizes, colors, spacing,
  section order, and divider treatment from the spec, and set them as THEME tokens.
- `Summary`, `Education`, `Skills`, `Projects`, `Certifications`, `Achievements`, `Languages` follow
  the same shape as `Experience`: typed props, `null` when empty, `SectionTitle`, sizes from THEME.
  - `Summary`: single object; render `data.content ? <View>{htmlParser(data.content)}</View> : null`
    (wrap in `<View>`, and guard first — HTML fields are `string | undefined`, `htmlParser` takes
    `string | null`).
  - `Skills`: single object with `.categories`; per category render `category.name` + skills joined
    by `', '` (don't render `level`).
  - `Languages`: list; render `language` + `proficiency` as text (no meter).
- Keep the `sectionRenderers` order irrelevant to output — the render loop follows
  `mainColumnSectionOrder`, so the template's intended order lives in that config array (the spec's
  Section Order), not in JSX.
