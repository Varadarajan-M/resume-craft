"use client";

import { htmlParser } from "@/shared/lib/html-parser";
import { Resume, ResumeTemplateComponentProps } from "@/shared/types/resume";
import { Document, Page, StyleSheet, Text, View } from "@react-pdf/renderer";

import { Fragment, JSX, useEffect, useRef } from "react";
import DocumentProvider from "../../DocumentProvider";

const styles = StyleSheet.create({
  page: {
    fontFamily: "Helvetica",
    fontSize: 10,
    padding: 24,
    lineHeight: 1.2,
    color: "#000",
    backgroundColor: "#fff",
    gap: 5,
  },
  header: {},
  headerRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-end",
  },
  headerRowSpaceBetween: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  headerAlignEnd: {
    alignItems: "flex-end",
  },
  name: {
    fontSize: 17,
    fontWeight: "bold",
    marginBottom: 10,
  },
  contactLine: {
    fontSize: 9,
    color: "#000",
    marginBottom: 1,
  },
  sectionTitle: {
    fontSize: 10,
    fontWeight: "bold",
    marginBottom: 4,
    borderBottom: "0.5 solid #000",
    textTransform: "uppercase",
    letterSpacing: 0.5,
  },
  subsection: {
    marginTop: -1,
  },
  experienceHeader: {
    marginBottom: 0,
  },
  experienceHeaderWithMargin: {
    marginBottom: 2,
  },
  jobTitle: {
    fontSize: 10,
    fontWeight: "bold",
    marginBottom: 1,
  },
  section: {},
  companyLine: {
    fontSize: 9,
    marginBottom: 1,
  },
  locationDate: {
    fontSize: 9,
    textAlign: "right",
    marginTop: -12,
  },
  bulletPoint: {
    fontSize: 9,
    marginBottom: 1,
    paddingLeft: 8,
  },
  educationHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: 1,
  },
  institutionName: {
    fontSize: 10,
    fontWeight: "bold",
  },
  degree: {
    fontSize: 9,
    fontStyle: "italic",
  },
  dateLocation: {
    fontSize: 9,
    textAlign: "right",
  },
  skillCategory: {
    fontSize: 9,
    marginBottom: 1,
  },
  skillCategoryName: {
    fontWeight: "bold",
  },
  projectHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: 1,
  },
  projectName: {
    fontSize: 10,
    fontWeight: "bold",
  },
  projectTech: {
    fontSize: 9,
    fontStyle: "italic",
    marginHorizontal: 1,
  },
  summaryText: {
    fontSize: 10,
  },
  certificationRow: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  certificationContent: {
    marginBottom: 2,
  },
  certificationDescription: {
    marginTop: 2,
  },
  languageText: {
    fontSize: 10,
    marginBottom: 2,
  },
  achievementItem: {
    marginBottom: 2,
  },
  achievementDescription: {
    marginTop: 2,
  },
});

const sectionRenderers: Record<
  string,
  (section: Resume["sections"], id?: string) => JSX.Element | null
> = {
  personalInfo: (sections, id) => {
    const personalInfo = sections?.[
      id as keyof typeof sections
    ] as Resume["sections"]["personalInfo"];
    if (!personalInfo) return null;

    return (
      <View style={styles.header}>
        <View style={styles.headerRow}>
          <Text style={styles.name}>{personalInfo?.fullName}</Text>
          <Text style={styles.contactLine}>Email: {personalInfo?.email}</Text>
        </View>
        <View style={styles.headerRowSpaceBetween}>
          <Text style={styles.contactLine}>
            Portfolio:{" "}
            {
              personalInfo?.links?.find((l) =>
                l.label?.toLowerCase()?.includes("portfolio")
              )?.url
            }
          </Text>
          <Text style={styles.contactLine}>Mobile: {personalInfo?.phone}</Text>
        </View>
        <View style={styles.headerRowSpaceBetween}>
          <Text style={styles.contactLine}>
            Github:{" "}
            {personalInfo?.links?.find((l) => l.url.includes("github"))?.url}
          </Text>
          <Text style={styles.contactLine}>
            Location: {personalInfo?.location}
          </Text>
        </View>
        <View style={styles.headerAlignEnd}></View>
      </View>
    );
  },

  summary: (sections, id) => {
    const summary = sections?.[
      id as keyof typeof sections
    ] as Resume["sections"]["summary"];
    if (!summary || !summary.content) return null;

    return (
      <View style={styles.section}>
        <Text style={styles.summaryText}>{htmlParser(summary?.content)}</Text>
      </View>
    );
  },

  education: (sections, id) => {
    const education = sections?.[
      id as keyof typeof sections
    ] as Resume["sections"]["education"];
    if (!education || education.length === 0) return null;

    return (
      <View>
        <Text style={styles.sectionTitle}>Education</Text>
        {education?.map((edu) => (
          <View key={edu.id} style={styles.subsection}>
            <View style={styles.educationHeader}>
              <Text style={styles.institutionName}>{edu.institution}</Text>
            </View>
            <View style={styles.educationHeader}>
              <Text style={styles.degree}>{edu.fieldOfStudy}</Text>
              <Text style={styles.dateLocation}>{edu.timePeriod}</Text>
            </View>
            {edu.description && <View>{htmlParser(edu.description)}</View>}
          </View>
        ))}
      </View>
    );
  },

  skills: (sections, id) => {
    const skills = sections?.[
      id as keyof typeof sections
    ] as Resume["sections"]["skills"];
    if (!skills || skills.categories.length === 0) return null;

    return (
      <View>
        <Text style={styles.sectionTitle}>Skills</Text>
        {skills?.categories?.map((cat) => (
          <Text key={cat.id} style={styles.skillCategory}>
            <Text style={styles.skillCategoryName}>{cat.name}:</Text>{" "}
            {cat?.skills?.map((s) => s.name)?.join(", ")}
          </Text>
        ))}
      </View>
    );
  },

  experience: (sections, id) => {
    const experience = sections?.[
      id as keyof typeof sections
    ] as Resume["sections"]["experience"];
    if (!experience || experience.length === 0) return null;

    return (
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Experience</Text>
        {experience?.map((exp) => (
          <View key={exp.id} style={styles.subsection}>
            <View style={styles.experienceHeader}>
              <Text style={styles.jobTitle}>{exp.company}</Text>
              <Text style={styles.locationDate}>{exp.location}</Text>
            </View>
            <View
              style={[
                styles.experienceHeader,
                styles.experienceHeaderWithMargin,
              ]}
            >
              <Text style={styles.companyLine}>{exp.title}</Text>
              <Text style={styles.locationDate}>{exp.timePeriod}</Text>
            </View>
            {exp.description && <View>{htmlParser(exp.description)}</View>}
          </View>
        ))}
      </View>
    );
  },

  projects: (sections, id) => {
    const projects = sections?.[
      id as keyof typeof sections
    ] as Resume["sections"]["projects"];
    if (!projects || projects.length === 0) return null;

    return (
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Projects</Text>
        {projects?.map((proj, i) => (
          <View key={i} style={styles.subsection}>
            <View style={styles.projectHeader}>
              <Text style={styles.projectName}>{proj.name}</Text>
              {proj.url && (
                <Text style={styles.dateLocation}>
                  {htmlParser(
                    `<a href="${proj.url}" style="text-decoration:underline">${proj?.url}</a>`
                  )}
                </Text>
              )}
            </View>
            {proj.technologies && (
              <Text style={styles.projectTech}>
                {proj?.technologies?.join(", ")}
              </Text>
            )}
            {proj.description && <View>{htmlParser(proj.description)}</View>}
          </View>
        ))}
      </View>
    );
  },

  certifications: (sections, id) => {
    const certifications = sections?.[
      id as keyof typeof sections
    ] as Resume["sections"]["certifications"];
    if (!certifications || certifications.length === 0) return null;

    return (
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Certifications</Text>
        {certifications?.map((cert) => (
          <View key={cert.id} style={styles.subsection}>
            <View style={styles.certificationRow}>
              <View>
                <Text style={styles.jobTitle}>
                  {cert.name}
                  {cert.issuer ? ` (${cert.issuer})` : ""}
                </Text>
                {cert.credentialUrl && (
                  <Text style={styles.certificationContent}>
                    {htmlParser(
                      `<a href="${cert?.credentialUrl}">${cert.credentialUrl}</a>`
                    )}
                  </Text>
                )}
              </View>
              <Text style={styles.dateLocation}>
                {cert.date}
                {cert.expirationDate ? ` – ${cert.expirationDate}` : ""}
              </Text>
            </View>
            {cert.description && (
              <View style={styles.certificationDescription}>
                {htmlParser(cert.description)}
              </View>
            )}
          </View>
        ))}
      </View>
    );
  },

  languages: (sections, id) => {
    const languages = sections?.[
      id as keyof typeof sections
    ] as Resume["sections"]["languages"];
    if (!languages || languages.length === 0) return null;

    return (
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Languages</Text>
        {languages?.map((lang) => (
          <Text key={lang.id} style={styles.languageText}>
            {lang.language} — {lang.proficiency}
          </Text>
        ))}
      </View>
    );
  },

  achievements: (sections, id) => {
    const achievements = sections?.[
      id as keyof typeof sections
    ] as Resume["sections"]["achievements"];
    if (!achievements || achievements.length === 0) return null;

    return (
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Achievements</Text>
        {achievements?.map((ach) => (
          <View key={ach.id} style={styles.achievementItem}>
            <Text style={styles.jobTitle}>{ach.title}</Text>
            {ach.description && (
              <View style={styles.achievementDescription}>
                {htmlParser(ach.description)}
              </View>
            )}
          </View>
        ))}
      </View>
    );
  },
};

const ResumeDocument = ({ resume }: ResumeTemplateComponentProps) => {
  const mainColumnSectionOrder = resume?.mainColumnSectionOrder || [];

  return (
    <Document style={{ flex: 1 }}>
      <Page size="A4" style={[styles.page, { padding: 20 }]}>
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

const CleanMinimalResumeTemplate = ({
  resume,
}: ResumeTemplateComponentProps) => {
  const ref = useRef<number>(0);

  useEffect(() => {
    ref.current += 1;
  }, [resume]);

  return (
    // this is used to prevent EO is not a function error in react-pdf/renderer when resume content is updated.
    // ref: https://stackoverflow.com/a/79653680
    <DocumentProvider key={ref.current}>
      <ResumeDocument resume={resume} />
    </DocumentProvider>
  );
};

export default CleanMinimalResumeTemplate;
