"use client";

import { htmlParser } from "@/shared/lib/html-parser";
import { ResumeTemplateComponentProps } from "@/shared/types/resume";
import { Document, Page, StyleSheet, Text, View } from "@react-pdf/renderer";

import DocumentProvider from "../../DocumentProvider";

const styles = StyleSheet.create({
  page: {
    fontFamily: "Helvetica",
    fontSize: 10,
    padding: 20,
    lineHeight: 1.2,
    color: "#000",
    backgroundColor: "#fff",
    gap: 5,
  },
  header: {
    // marginBottom: 15,
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
  jobTitle: {
    fontSize: 10,
    fontWeight: "bold",
    marginBottom: 1,
  },
  educationSection: {
    marginTop: -10,
  },
  skillsSection: {
    marginTop: -2,
  },
  section: {},
  companyLine: {
    fontSize: 9,
    fontStyle: "italic",
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
    fontSize: 8,
    fontStyle: "italic",
    marginHorizontal: 1,
  },
});

const ResumeDocument = ({ resume }: ResumeTemplateComponentProps) => {
  const {
    personalInfo,
    summary,
    experience,
    education,
    skills,
    projects,
    certifications,
    achievements,
    languages,
  } = resume.sections || {};

  return (
    <Document
      style={{
        flex: 1,
      }}
    >
      <Page size="A4" style={styles.page}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.name}>{personalInfo?.fullName}</Text>
          <View
            style={{ flexDirection: "row", justifyContent: "space-between" }}
          >
            <Text style={styles.contactLine}>
              Portfolio: {personalInfo?.website?.url}
            </Text>
            <Text style={styles.contactLine}>Email: {personalInfo?.email}</Text>
          </View>
          <View
            style={{ flexDirection: "row", justifyContent: "space-between" }}
          >
            <Text style={styles.contactLine}>
              Github:{" "}
              {personalInfo?.links?.find((l) => l.url.includes("github"))?.url}
            </Text>
            <Text style={styles.contactLine}>
              Mobile: {personalInfo?.phone}
            </Text>
          </View>
          <View style={{ alignItems: "flex-end" }}>
            <Text style={styles.contactLine}>
              Location: {personalInfo?.location}
            </Text>
          </View>
        </View>

        {/* Education */}
        {(education?.length ?? 0) > 0 && (
          <View style={styles.educationSection}>
            <Text style={styles.sectionTitle}>Education</Text>
            {education!.map((edu) => (
              <View key={edu.id} style={styles.subsection}>
                <View style={styles.educationHeader}>
                  <Text style={styles.institutionName}>{edu.institution}</Text>
                </View>
                <View style={styles.educationHeader}>
                  <Text style={styles.degree}>{edu.fieldOfStudy}</Text>
                  <Text style={styles.dateLocation}>{edu.timePeriod}</Text>
                </View>
              </View>
            ))}
          </View>
        )}

        {/* Skills */}
        {(skills?.categories?.length ?? 0) > 0 && (
          <View style={styles.skillsSection}>
            <Text style={styles.sectionTitle}>Skills</Text>
            {skills?.categories?.map((cat) => (
              <Text key={cat.id} style={styles.skillCategory}>
                <Text style={styles.skillCategoryName}>{cat.name}:</Text>{" "}
                {cat?.skills?.map((s) => s.name)?.join(", ")}
              </Text>
            ))}
          </View>
        )}

        {/* Experience */}
        {(experience?.length ?? 0) > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Experience</Text>
            {experience?.map((exp) => (
              <View key={exp.id} style={styles.subsection}>
                <View style={styles.experienceHeader}>
                  <Text style={styles.jobTitle}>{exp.company}</Text>
                  <Text style={styles.locationDate}>{exp.location}</Text>
                </View>
                <View style={[styles.experienceHeader, { marginBottom: 2 }]}>
                  <Text style={styles.companyLine}>{exp.title}</Text>
                  <Text style={styles.locationDate}>{exp.timePeriod}</Text>
                </View>
                {exp.description && <View>{htmlParser(exp.description)}</View>}
              </View>
            ))}
          </View>
        )}

        {/* Projects */}
        {(projects?.length ?? 0) > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Projects</Text>
            {projects?.map((proj, i) => (
              <View key={i} style={styles.subsection}>
                <View style={styles.projectHeader}>
                  <Text style={styles.projectName}>{proj.name}</Text>
                  {proj.url && (
                    <Text style={styles.dateLocation}>{proj.url}</Text>
                  )}
                </View>
                {proj.technologies && (
                  <Text style={styles.projectTech}>
                    {proj?.technologies?.join(", ")}
                    {proj?.technologies?.join(", ")}
                  </Text>
                )}
                {proj.description && (
                  <View>{htmlParser(proj.description)}</View>
                )}
              </View>
            ))}
          </View>
        )}

        {/* Summary */}
        {summary && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Summary</Text>
            <Text style={{ fontSize: 9 }}>{htmlParser(summary?.content)}</Text>
          </View>
        )}

        {/* Certifications */}
        {(certifications?.length ?? 0) > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Certifications</Text>
            {certifications?.map((cert, i) => (
              <Text key={i} style={{ fontSize: 9 }}>
                {cert.name} {cert.issuer ? `(${cert.issuer})` : ""}{" "}
                {cert.date ? `- ${cert.date}` : ""}
              </Text>
            ))}
          </View>
        )}

        {/* Achievements */}
        {(achievements?.length ?? 0) > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Achievements</Text>
            {achievements?.map((a, i) => (
              <View style={{ marginBottom: 2 }} key={i}>
                <Text style={{ fontSize: 9, fontWeight: "bold" }}>
                  {a.title}
                </Text>
                {a.description && (
                  <Text style={{ fontSize: 9 }}>
                    {htmlParser(a.description)}
                  </Text>
                )}
              </View>
            ))}
          </View>
        )}

        {/* Languages */}
        {(languages?.length ?? 0) > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Languages</Text>
            {languages?.map((l, i) => (
              <Text key={i} style={{ fontSize: 9 }}>
                {l.language} — {l.proficiency}
              </Text>
            ))}
          </View>
        )}
      </Page>
    </Document>
  );
};

const ModernResumeTemplate = ({ resume }: ResumeTemplateComponentProps) => {
  return (
    <DocumentProvider>
      <ResumeDocument resume={resume} />
    </DocumentProvider>
  );
};

export default ModernResumeTemplate;
