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
import { JSX } from "react";
import DestroyAndMountChildrenOnPropChange from "../../DestroyAndMountChildrenOnPropChange";
import DocumentProvider from "../../DocumentProvider";
import PDFErrorBoundary from "../../PDFErrorBoundary";

// Font registration
Font.register({
  family: "Helvetica",
  fonts: [
    { src: "https://fonts.gstatic.com/s/helvetica/v6/92z6d3FZvzFvD.ttf" },
    {
      src: "https://fonts.gstatic.com/s/helvetica/v6/92z6d3FZvzFvD-Bold.ttf",
      fontWeight: "bold",
    },
  ],
});

// Theme and Styles
const THEME = {
  fontFamily: "Helvetica",
  fontSize: 10,
  spacing: 6,
  colors: {
    primary: "#000",
    secondary: "#444",
    border: "#000",
  },
};

const styles = StyleSheet.create({
  page: {
    fontFamily: THEME.fontFamily,
    fontSize: THEME.fontSize,
    padding: 24,
    lineHeight: 1.3,
    color: THEME.colors.primary,
    backgroundColor: "#fff",
    gap: 6,
  },
  section: {},
  headerRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: THEME.spacing,
    flex: 1,
  },
  sectionTitle: {
    fontSize: 10,
    fontWeight: "bold",
    textTransform: "uppercase",
    marginBottom: 4,
    borderBottom: `0.5 solid ${THEME.colors.border}`,
  },
  subsection: {
    marginBottom: 5,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    // flexWrap: "wrap",
  },
  contactRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    columnGap: 12,
    rowGap: 5,
    marginBottom: 7,
  },
  contactItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  contactLink: {
    fontSize: 10,
    textDecoration: "underline",
    color: THEME.colors.primary,
  },
  name: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 6,
    flexShrink: 1,
    lineHeight: 1,
  },
  headline: {
    fontSize: 14,
    color: THEME.colors.secondary,
    marginBottom: 5,
    lineHeight: 1.2,
  },
  labelSemibold: {
    fontWeight: "semibold",
  },
  labelBold: { fontWeight: "bold" },
  labelItalic: { fontStyle: "italic" },
  textRight: { textAlign: "right" },
  smallText: { fontSize: 9.4 },

  flexBasis30: { flexBasis: "30%" },
  flexBasis68: { flexBasis: "68%" },
  flexBasis35: { flexBasis: "35%" },
  flexBasis65: { flexBasis: "65%" },
});

// Reusable Components
const Section = ({
  title,
  children,
}: {
  title: string;
  children: JSX.Element | JSX.Element[];
}) => (
  <View style={styles.section}>
    <Text style={styles.sectionTitle}>{title}</Text>
    {children}
  </View>
);

const SubsectionRow = ({
  left,
  right,
}: {
  left?: JSX.Element;
  right?: JSX.Element;
}) => (
  <View style={styles.row}>
    {left}
    {right}
  </View>
);

const ContactItem = ({
  icon,
  href,
  label,
}: {
  icon?: string;
  href: string;
  label: string;
}) => (
  <View style={styles.contactItem}>
    {icon && <PdfLucideIcon name={icon} size={10} />}
    <Link src={href} style={styles.contactLink}>
      {label}
    </Link>
  </View>
);

// Section Renderers
const sectionRenderers: Record<
  string,
  (
    sections: Resume["sections"],
    id: keyof Resume["sections"]
  ) => JSX.Element | null
> = {
  personalInfo: (sections, id) => {
    const s = sections?.[id] as Resume["sections"]["personalInfo"];
    if (!s) return null;
    return (
      <View style={[styles.row, { marginBottom: 6, alignItems: "flex-start" }]}>
        <View style={{ gap: 2, flexBasis: "65%" }}>
          <Text style={styles.name}>{s.fullName}</Text>
          {s.headline && <Text style={styles.headline}>{s.headline}</Text>}
          {s.phone && (
            <ContactItem href={`tel:${s.phone}`} label={`Phone: ${s.phone}`} />
          )}
          {s.email && (
            <ContactItem
              href={`mailto:${s.email}`}
              label={`Email: ${s.email}`}
            />
          )}
        </View>
        <View
          style={{
            gap: 3,
            flexBasis: "35%",
            marginLeft: "auto",
          }}
        >
          {s?.links?.map((link) => (
            <ContactItem
              icon={link?.iconName}
              key={link.id}
              href={link.url}
              label={link.url}
            />
          ))}
          {s?.location && (
            <ContactItem
              icon="map-pin"
              href={
                "https://www.google.com/maps/search/?api=1&query=" +
                encodeURIComponent(s?.location)
              }
              label={`${s.location}`}
            />
          )}
        </View>
      </View>
    );
  },

  summary: (sections, id) => {
    const s = sections[
      id as keyof Resume["sections"]
    ] as Resume["sections"]["summary"];
    if (!s?.content || s?.content?.length <= 7) return null;
    return (
      <Section title="Summary">
        <Text>{htmlParser(s.content)}</Text>
      </Section>
    );
  },
  skills: (sections, id) => {
    const s = sections[id] as Resume["sections"]["skills"];
    if (!s?.categories?.length) return null;
    return (
      <Section title="Skills">
        {s.categories.map((cat) => (
          <Text key={cat.id} style={styles.smallText}>
            <Text style={styles.labelBold}>{cat.name}:</Text>{" "}
            {cat.skills.map((s) => s.name).join(", ")}
          </Text>
        ))}
      </Section>
    );
  },
  education: (sections, id) => {
    const s = sections[id] as Resume["sections"]["education"];
    if (!s?.length) return null;
    return (
      <Section title="Education">
        {s.map((edu) => (
          <View key={edu.id} style={styles.subsection}>
            <SubsectionRow
              left={
                <Text style={[styles.labelBold, styles.flexBasis68]}>
                  {edu.institution}
                </Text>
              }
              right={
                <Text
                  style={[
                    styles.textRight,
                    styles.smallText,
                    styles.labelSemibold,
                    styles.flexBasis30,
                  ]}
                >
                  {edu.timePeriod}
                </Text>
              }
            />
            <SubsectionRow
              left={<Text style={styles.flexBasis68}>{edu.fieldOfStudy}</Text>}
              right={
                edu.location ? (
                  <Text
                    style={[
                      styles.textRight,
                      styles.smallText,
                      styles.flexBasis30,
                    ]}
                  >
                    {edu.location}
                  </Text>
                ) : undefined
              }
            />
            {edu.description && <View>{htmlParser(edu.description)}</View>}
          </View>
        ))}
      </Section>
    );
  },
  experience: (sections, id) => {
    const s = sections[id] as Resume["sections"]["experience"];
    if (!s?.length) return null;
    return (
      <Section title="Experience">
        {s.map((exp) => (
          <View key={exp.id} style={styles.subsection}>
            <SubsectionRow
              left={
                <Text style={[styles.labelBold, styles.flexBasis68]}>
                  {exp.company}
                </Text>
              }
              right={
                <Text
                  style={[
                    styles.textRight,
                    styles.smallText,
                    styles.labelSemibold,
                    styles.flexBasis30,
                  ]}
                >
                  {exp.timePeriod}
                </Text>
              }
            />
            <SubsectionRow
              left={
                <Text style={[styles.smallText, styles.flexBasis68]}>
                  {exp.title}
                </Text>
              }
              right={
                <Text
                  style={[
                    styles.textRight,
                    styles.smallText,
                    styles.flexBasis30,
                  ]}
                >
                  {exp.location}
                </Text>
              }
            />
            {exp.description && <View>{htmlParser(exp.description)}</View>}
          </View>
        ))}
      </Section>
    );
  },
  projects: (sections, id) => {
    const s = sections[id] as Resume["sections"]["projects"];
    if (!s?.length) return null;
    return (
      <Section title="Projects">
        {s.map((proj) => (
          <View key={proj.id} style={styles.subsection}>
            <SubsectionRow
              left={<Text style={[styles.labelBold]}>{proj.name}</Text>}
              right={
                (proj?.timePeriod?.length || 0) > 0 ? (
                  <Text style={styles.labelSemibold}>{proj.timePeriod}</Text>
                ) : undefined
              }
            />
            <SubsectionRow
              left={
                (proj?.technologies?.length || 0) > 0 ? (
                  <Text style={[styles.labelItalic, { flexBasis: "68%" }]}>
                    {proj.technologies?.join(", ")}
                  </Text>
                ) : undefined
              }
              right={
                proj.url ? (
                  <Text style={{ textAlign: "right", flexBasis: "30%" }}>
                    {htmlParser(
                      `<a href="${proj.url}" style="text-decoration:underline;color:black">${proj.url}</a>`
                    )}
                  </Text>
                ) : undefined
              }
            />
            {proj.description && <View>{htmlParser(proj.description)}</View>}
          </View>
        ))}
      </Section>
    );
  },
  certifications: (sections, id) => {
    const s = sections[id] as Resume["sections"]["certifications"];
    if (!s?.length) return null;
    return (
      <Section title="Certifications">
        {s.map((cert) => (
          <View key={cert.id} style={styles.subsection}>
            <SubsectionRow
              left={
                <Text style={[styles.labelBold, styles.flexBasis68]}>
                  {cert.name} {cert.issuer && `(${cert.issuer})`}
                </Text>
              }
              right={
                <Text
                  style={[
                    styles.smallText,
                    styles.labelSemibold,
                    styles.flexBasis30,
                  ]}
                >
                  {cert.date}
                  {cert.expirationDate ? ` – ${cert.expirationDate}` : ""}
                </Text>
              }
            />
            {cert.credentialUrl && (
              <Text style={[styles.smallText]}>
                {htmlParser(
                  `<a href="${cert.credentialUrl}" style="text-decoration:underline;color:black">${cert.credentialUrl}</a>`
                )}
              </Text>
            )}
            {cert.description && <View>{htmlParser(cert.description)}</View>}
          </View>
        ))}
      </Section>
    );
  },
  languages: (sections, id) => {
    const s = sections[id] as Resume["sections"]["languages"];
    if (!s?.length) return null;
    return (
      <Section title="Languages">
        {s.map((lang) => (
          <Text key={lang.id} style={styles.smallText}>
            {lang.language} — {lang.proficiency}
          </Text>
        ))}
      </Section>
    );
  },
  achievements: (sections, id) => {
    const s = sections[id] as Resume["sections"]["achievements"];
    if (!s?.length) return null;
    return (
      <Section title="Achievements">
        {s.map((ach) => (
          <View key={ach.id} style={styles.subsection}>
            <Text style={styles.labelBold}>{ach.title}</Text>
            {ach.description && <View>{htmlParser(ach.description)}</View>}
          </View>
        ))}
      </Section>
    );
  },
};

// Document Renderer
const ResumeDocument = ({ resume }: ResumeTemplateComponentProps) => {
  const order = resume?.config?.mainColumnSectionOrder;
  const sectionDetails = resume?.config?.sectionDetails;

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        {order?.map((id) => {
          if (!sectionDetails?.[id]?.visible) return null;

          return sectionRenderers?.[id]?.(
            resume.sections,
            id as keyof Resume["sections"]
          );
        })}
      </Page>
    </Document>
  );
};

const CleanMinimalResumeTemplate = ({
  resume,
}: ResumeTemplateComponentProps) => {
  return (
    <>
      <PDFErrorBoundary>
        <DestroyAndMountChildrenOnPropChange prop={resume}>
          {(key) => (
            <DocumentProvider key={key}>
              <ResumeDocument resume={resume} />
            </DocumentProvider>
          )}
        </DestroyAndMountChildrenOnPropChange>
      </PDFErrorBoundary>
    </>
  );
};

export default CleanMinimalResumeTemplate;
