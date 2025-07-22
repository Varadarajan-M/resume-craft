"use client";

import { PdfLucideIcon } from "@/shared/components/common/LucideToReactPdfIcon";
import { htmlParser } from "@/shared/lib/html-parser";
import { Resume, ResumeTemplateComponentProps } from "@/shared/types/resume";
import {
  Document,
  Font,
  Link,
  Page,
  StyleSheet,
  Text,
  View,
} from "@react-pdf/renderer";
import { Fragment, JSX } from "react";
import DestroyAndMountChildrenOnPropChange from "../../DestroyAndMountChildrenOnPropChange";
import DocumentProvider from "../../DocumentProvider";
import PDFErrorBoundary from "../../PDFErrorBoundary";

// Font registration
Font.register({
  family: "Tinos",
  fonts: [
    {
      src: "https://raw.githubusercontent.com/google/fonts/main/apache/tinos/Tinos-Regular.ttf",
    },
    {
      src: "https://raw.githubusercontent.com/google/fonts/main/apache/tinos/Tinos-Bold.ttf",
      fontWeight: "bold",
    },
    {
      src: "https://raw.githubusercontent.com/google/fonts/main/apache/tinos/Tinos-Italic.ttf",
      fontStyle: "italic",
    },
    {
      src: "https://raw.githubusercontent.com/google/fonts/main/apache/tinos/Tinos-BoldItalic.ttf",
      fontWeight: "bold",
      fontStyle: "italic",
    },
  ],
});

// Constants for consistent styling
const THEME = {
  colors: {
    primary: "#000",
    secondary: "#444",
    border: "grey",
    background: "#fff",
  },
  fonts: {
    main: "Tinos",
  },
  spacing: {
    xs: 1,
    sm: 2,
    md: 4,
    lg: 6,
    xl: 8,
    xxl: 12,
  },
  fontSizes: {
    xs: 9,
    sm: 10,
    smd: 10.5,
    md: 11,
    lg: 12,
    xl: 12.4,
    xxl: 14,
    name: 20,
    nameFirst: 26,
    hero: 28,
  },
} as const;

// Centralized styles with consistent naming and values
const styles = StyleSheet.create({
  // Page layout
  page: {
    fontFamily: THEME.fonts.main,
    fontSize: THEME.fontSizes.sm,
    paddingHorizontal: 22,
    paddingVertical: 20,
    lineHeight: 1.2,
    color: THEME.colors.primary,
    backgroundColor: THEME.colors.background,
    gap: 5,
  },

  // Typography
  textXs: {
    fontSize: THEME.fontSizes.xs,
    fontFamily: THEME.fonts.main,
  },
  textSm: {
    fontSize: THEME.fontSizes.sm,
    fontFamily: THEME.fonts.main,
  },
  textMd: {
    fontSize: THEME.fontSizes.md,
    fontFamily: THEME.fonts.main,
  },
  textLg: {
    fontSize: THEME.fontSizes.lg,
    fontFamily: THEME.fonts.main,
  },
  textXl: {
    fontSize: THEME.fontSizes.xl,
    fontFamily: THEME.fonts.main,
  },
  textXxl: {
    fontSize: THEME.fontSizes.xxl,
    fontFamily: THEME.fonts.main,
  },

  // Text variants
  textBold: {
    fontWeight: "bold",
  },
  textItalic: {
    fontStyle: "italic",
  },
  textCapitalize: {
    textTransform: "capitalize",
  },
  textUppercase: {
    textTransform: "uppercase",
  },
  textRight: {
    textAlign: "right",
  },
  textCenter: {
    textAlign: "center",
  },

  // Layout components
  row: {
    flexDirection: "row",
  },
  rowBetween: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
  },
  rowCenter: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  rowWrap: {
    flexDirection: "row",
    flexWrap: "wrap",
  },

  // Spacing
  mb1: { marginBottom: THEME.spacing.xs },
  mb2: { marginBottom: THEME.spacing.sm },
  mb3: { marginBottom: 3 },
  mb4: { marginBottom: THEME.spacing.md },
  mb5: { marginBottom: 5 },
  mb6: { marginBottom: THEME.spacing.lg },
  mb7: { marginBottom: 7 },
  mb17: { marginBottom: 17 },

  mt2: { marginTop: THEME.spacing.sm },
  mt_1: { marginTop: -1 },
  mt_12: { marginTop: -12 },

  pl8: { paddingLeft: THEME.spacing.xl },

  gap4: { gap: THEME.spacing.md },
  gap5: { gap: 5 },
  gap12: { gap: THEME.spacing.xxl },

  // Header styles
  header: {
    alignItems: "center",
  },
  nameFirst: {
    fontSize: THEME.fontSizes.nameFirst,
    fontFamily: THEME.fonts.main,
    textTransform: "uppercase",
    letterSpacing: 1,
  },
  nameRest: {
    fontSize: THEME.fontSizes.name,
    fontFamily: THEME.fonts.main,
    textTransform: "uppercase",
    letterSpacing: 1,
  },
  location: {
    fontSize: 13,
    fontFamily: THEME.fonts.main,
    textTransform: "capitalize",
  },
  headline: {
    fontSize: THEME.fontSizes.xxl,
    color: THEME.colors.secondary,
  },

  // Contact styles
  contactRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    columnGap: THEME.spacing.xxl,
    rowGap: 5,
  },
  contactItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: THEME.spacing.md,
  },
  contactLink: {
    fontSize: THEME.fontSizes.sm,
    textDecoration: "underline",
    color: THEME.colors.primary,
    textAlign: "center",
  },

  // Section styles
  section: {},
  sectionTitle: {
    fontSize: THEME.fontSizes.xl,
    fontWeight: "semibold",
    fontFamily: THEME.fonts.main,
    textTransform: "capitalize",
  },
  sectionDivider: {
    borderBottom: `0.5 solid ${THEME.colors.border}`,
  },

  // Subsection styles
  subsection: {},
  subsectionHeader: {
    fontSize: THEME.fontSizes.md,
    fontWeight: "bold",
    fontFamily: THEME.fonts.main,
  },
  subsectionDescription: {
    fontSize: THEME.fontSizes.sm,
    fontStyle: "italic",
    fontFamily: THEME.fonts.main,
    marginVertical: THEME.spacing.xs,
  },

  // Content styles
  contentText: {
    fontSize: THEME.fontSizes.sm,
    fontFamily: THEME.fonts.main,
  },
  bulletPoint: {
    fontSize: THEME.fontSizes.md,
    paddingLeft: THEME.spacing.sm,
  },

  // Specific component styles
  skillCategory: {
    fontSize: THEME.fontSizes.smd,
  },
  projectTech: {
    fontSize: THEME.fontSizes.xs,
    fontStyle: "italic",
    marginHorizontal: THEME.spacing.xs,
  },
  summaryText: {
    fontSize: THEME.fontSizes.md,
  },
  languageText: {
    fontSize: THEME.fontSizes.smd,
  },
});

// Reusable components
const Section = ({
  children,
  title,
}: {
  title: string;
  children: JSX.Element | JSX.Element[];
}) => {
  return (
    <View style={styles.section}>
      <View style={[styles.sectionDivider, styles.mb3]}>
        <Text style={[styles.sectionTitle, styles.mb3]}>{title}</Text>
      </View>
      {children}
    </View>
  );
};

const SubsectionRow = ({
  left,
  right,
  style,
}: {
  left?: JSX.Element;
  right?: JSX.Element;
  style?: any;
}) => (
  <View style={[styles.rowBetween, styles.mb1, style]}>
    {left}
    {right}
  </View>
);

const ContactItem = ({
  icon,
  href,
  label,
}: {
  icon: string;
  href: string;
  label: string;
}) => (
  <View style={styles.contactItem}>
    <PdfLucideIcon name={icon} size={10} />
    <Link src={href} style={styles.contactLink}>
      {label}
    </Link>
  </View>
);

type CustomTextComponentProps = {
  children: React.ReactNode;
  style?: Record<string, string | number> | undefined;
};

const TimePeriodText = ({ children, style = {} }: CustomTextComponentProps) => (
  <Text style={[styles.textXs, styles.textBold, styles.textRight, style]}>
    {children}
  </Text>
);

const DescriptionText = ({
  children,
  style = {},
}: CustomTextComponentProps) => (
  <Text style={[styles.subsectionDescription, style]}>{children}</Text>
);

const HeaderText = ({ children, style = {} }: CustomTextComponentProps) => (
  <Text style={[styles.subsectionHeader, style]}>{children}</Text>
);

const BulletPoints = ({ children, style = {} }: CustomTextComponentProps) => (
  <View style={[styles.bulletPoint, style]}>{children}</View>
);

const LinkText = ({
  children,
  href,
  style = {},
}: CustomTextComponentProps & { href: string }) =>
  href ? (
    <Text style={[style]}>
      {htmlParser(
        `<a href="${href}" style="text-decoration:underline;color:black">${children}</a>`
      )}
    </Text>
  ) : undefined;

const sectionRenderers: Record<
  string,
  (section: Resume["sections"], id?: string) => JSX.Element | null
> = {
  personalInfo: (sections, id) => {
    const personalInfo = sections?.[
      id as keyof typeof sections
    ] as Resume["sections"]["personalInfo"];
    if (!personalInfo) return null;

    const fullName = personalInfo.fullName || "First Last";

    return (
      <View style={styles.header}>
        <Text style={styles.mb17}>
          {fullName.split(" ").map((namePart, index) => (
            <Fragment key={index}>
              <Text key={`${namePart}-first`} style={styles.nameFirst}>
                {namePart?.charAt(0)}
              </Text>
              <Text key={`${namePart}-rest`} style={styles.nameRest}>
                {namePart?.slice(1)}
              </Text>
              {"  "}
            </Fragment>
          ))}
        </Text>

        {personalInfo?.location && (
          <Text style={[styles.location, styles.mb7]}>
            {personalInfo?.location}
          </Text>
        )}

        <View style={[styles.contactRow, styles.mb4]}>
          {personalInfo?.phone && (
            <ContactItem
              icon="phone"
              href={`tel:${personalInfo.phone}`}
              label={personalInfo.phone}
            />
          )}

          {personalInfo?.email && (
            <ContactItem
              icon="mail"
              href={`mailto:${personalInfo.email}`}
              label={personalInfo.email}
            />
          )}

          {personalInfo.links?.map((link) => (
            <ContactItem
              key={link.id}
              icon={link?.iconName!}
              href={link.url}
              label={link.label}
            />
          ))}
        </View>
      </View>
    );
  },

  summary: (sections, id) => {
    const summary = sections?.[
      id as keyof typeof sections
    ] as Resume["sections"]["summary"];
    if (!summary || !(summary.content?.toString()?.trim().length > 7))
      return null;

    return (
      <Section title="Professional Summary">
        <Text style={styles.summaryText}>{htmlParser(summary?.content)}</Text>
      </Section>
    );
  },

  education: (sections, id) => {
    const education = sections?.[
      id as keyof typeof sections
    ] as Resume["sections"]["education"];
    if (!education || education.length === 0) return null;

    return (
      <Section title="Education">
        {education?.map((edu) => (
          <View key={edu.id} style={[styles.subsection, styles.mt_1]}>
            <SubsectionRow
              left={<HeaderText>{edu.institution}</HeaderText>}
              right={<TimePeriodText>{edu.timePeriod}</TimePeriodText>}
            />
            <SubsectionRow
              left={<DescriptionText>{edu.fieldOfStudy}</DescriptionText>}
              right={
                edu.location ? (
                  <DescriptionText>
                    <Text style={styles.textRight}>{edu.location}</Text>
                  </DescriptionText>
                ) : undefined
              }
            />
            {edu.description && (
              <BulletPoints>{htmlParser(edu.description)}</BulletPoints>
            )}
          </View>
        ))}
      </Section>
    );
  },

  skills: (sections, id) => {
    const skills = sections?.[
      id as keyof typeof sections
    ] as Resume["sections"]["skills"];
    if (!skills || skills.categories.length === 0) return null;

    return (
      <Section title="Skills">
        {skills?.categories?.map((cat) => (
          <Text key={cat.id} style={[styles.skillCategory, styles.mb1]}>
            <Text style={styles.textBold}>{cat.name}:</Text>{" "}
            {cat?.skills?.map((s) => s.name)?.join(", ")}
          </Text>
        ))}
      </Section>
    );
  },

  experience: (sections, id) => {
    const experience = sections?.[
      id as keyof typeof sections
    ] as Resume["sections"]["experience"];
    if (!experience || experience.length === 0) return null;

    return (
      <Section title="Experience">
        {experience?.map((exp) => (
          <View key={exp.id} style={[styles.subsection, styles.mt_1]}>
            <SubsectionRow
              left={<HeaderText>{exp.company}</HeaderText>}
              right={<TimePeriodText>{exp.timePeriod}</TimePeriodText>}
            />
            <SubsectionRow
              left={<DescriptionText>{exp.title}</DescriptionText>}
              right={
                <DescriptionText>
                  <Text style={styles.textRight}>{exp.location}</Text>
                </DescriptionText>
              }
            />
            {exp.description && (
              <BulletPoints>{htmlParser(exp.description)}</BulletPoints>
            )}
          </View>
        ))}
      </Section>
    );
  },

  projects: (sections, id) => {
    const projects = sections?.[
      id as keyof typeof sections
    ] as Resume["sections"]["projects"];
    if (!projects || projects.length === 0) return null;

    return (
      <Section title="Projects">
        {projects?.map((proj, i) => (
          <View key={i} style={[styles.subsection, styles.mt_1]}>
            <SubsectionRow
              left={<HeaderText>{proj.name}</HeaderText>}
              right={<TimePeriodText>{proj.timePeriod}</TimePeriodText>}
            />
            <SubsectionRow
              left={
                proj.technologies ? (
                  <DescriptionText>
                    {proj?.technologies?.join(", ")}
                  </DescriptionText>
                ) : undefined
              }
              right={<LinkText href={proj.url!}>{proj?.url}</LinkText>}
            />

            {proj.description && (
              <BulletPoints>{htmlParser(proj.description)}</BulletPoints>
            )}
          </View>
        ))}
      </Section>
    );
  },

  certifications: (sections, id) => {
    const certifications = sections?.[
      id as keyof typeof sections
    ] as Resume["sections"]["certifications"];
    if (!certifications || certifications.length === 0) return null;

    return (
      <Section title="Certifications">
        {certifications?.map((cert) => (
          <View key={cert.id} style={[styles.subsection]}>
            <SubsectionRow
              left={
                <HeaderText style={{ fontSize: THEME.fontSizes.smd }}>
                  {cert.name}
                </HeaderText>
              }
              right={
                <TimePeriodText>
                  {cert.date}
                  {cert.expirationDate ? ` – ${cert.expirationDate}` : ""}
                </TimePeriodText>
              }
            />
            <SubsectionRow
              left={
                <DescriptionText>
                  {cert.issuer}
                </DescriptionText>
              }
              right={
                <LinkText href={cert.credentialUrl!}>
                  {cert.credentialUrl}
                </LinkText>
              }
            />
            {cert.description && (
              <BulletPoints>{htmlParser(cert?.description!)}</BulletPoints>
            )}
          </View>
        ))}
      </Section>
    );
  },

  languages: (sections, id) => {
    const languages = sections?.[
      id as keyof typeof sections
    ] as Resume["sections"]["languages"];
    if (!languages || languages.length === 0) return null;

    return (
      <Section title="Languages">
        {languages?.map((lang) => (
          <Text key={lang.id} style={[styles.languageText, styles.mb2]}>
            {lang.language} — {lang.proficiency}
          </Text>
        ))}
      </Section>
    );
  },

  achievements: (sections, id) => {
    const achievements = sections?.[
      id as keyof typeof sections
    ] as Resume["sections"]["achievements"];
    if (!achievements || achievements.length === 0) return null;

    return (
      <Section title="Achievements">
        {achievements?.map((ach) => (
          <View key={ach.id} style={[styles.subsection, styles.mt_1]}>
            <HeaderText style={{ fontSize: THEME.fontSizes.smd }}>
              {ach.title}
            </HeaderText>
            {ach.description && (
              <BulletPoints>{htmlParser(ach.description)}</BulletPoints>
            )}
          </View>
        ))}
      </Section>
    );
  },
};

const ResumeDocument = ({ resume }: ResumeTemplateComponentProps) => {
  const mainColumnSectionOrder = resume?.mainColumnSectionOrder || [];

  return (
    <Document style={{ flex: 1 }}>
      <Page size="A4" style={styles.page}>
        {mainColumnSectionOrder?.map((sectionId) => {
          const renderer = sectionRenderers[sectionId];
          if (renderer) {
            return (
              <Fragment key={sectionId}>
                {renderer(resume?.sections, sectionId)}
              </Fragment>
            );
          }
          return null;
        })}
      </Page>
    </Document>
  );
};

const StandardResumeTemplate = ({ resume }: ResumeTemplateComponentProps) => {
  return (
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
};

export default StandardResumeTemplate;
