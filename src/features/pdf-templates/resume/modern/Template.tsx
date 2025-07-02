"use client";

import { htmlParser } from "@/shared/lib/html-parser";
import { ResumeTemplateComponentProps } from "@/shared/types/resume";
import {
  BlobProvider,
  Document,
  Font,
  Page,
  StyleSheet,
  Text,
  View,
} from "@react-pdf/renderer";

import dynamic from "next/dynamic";
import { useEffect, useRef } from "react";

const PDFViewer = dynamic(
  () => import("@react-pdf/renderer").then((mod) => mod.PDFViewer),
  {
    ssr: false,
    loading: () => <p>Loading...</p>,
  }
);

Font.register({
  family: "Inter",
  fonts: [
    { src: "https://fonts.gstatic.com/s/inter/v12/UcC2gJk2kqEgLZRFO-Z0.ttf" },
  ],
});

const styles = StyleSheet.create({
  page: {
    // fontFamily: "Inter",
    fontSize: 11,
    padding: 40,
    lineHeight: 1.6,
    color: "#000",
    backgroundColor: "#fff",
  },
  header: {
    alignItems: "center",
    marginBottom: 20,
  },
  name: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 8,
  },
  contact: {
    fontSize: 10,
    color: "#444",
  },
  section: {
    marginBottom: 18,
  },
  sectionTitle: {
    fontSize: 12,
    fontWeight: "bold",
    marginBottom: 6,
    borderBottom: "1 solid #000",
    textTransform: "uppercase",
  },
  subsection: {
    marginBottom: 6,
  },
  titleLine: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  bold: {
    fontWeight: "bold",
  },
  italic: {
    fontStyle: "italic",
  },
  bulletList: {
    paddingLeft: 4,
  },
  bullet: {
    marginBottom: 2,
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
          <Text style={styles.contact}>
            {personalInfo?.email} | {personalInfo?.phone} |{" "}
            {personalInfo?.location}
          </Text>
          <Text style={styles.contact}>
            {[
              personalInfo?.website?.url,
              ...(personalInfo?.links || []).map((l) => l.url),
            ]
              .filter(Boolean)
              .join(" | ")}
          </Text>
        </View>

        {/* Summary */}
        {summary && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Summary</Text>
            <Text>{htmlParser(summary?.content)}</Text>
          </View>
        )}

        {/* Education */}
        {(education?.length ?? 0) > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Education</Text>
            {education!.map((edu) => (
              <View key={edu.id} style={styles.subsection}>
                <View style={styles.titleLine}>
                  <Text style={styles.bold}>{edu.institution}</Text>
                  <Text>{edu.timePeriod}</Text>
                </View>
                <Text style={styles.italic}>{edu.fieldOfStudy}</Text>
              </View>
            ))}
          </View>
        )}

        {/* Experience */}
        {(experience?.length ?? 0) > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Experience</Text>
            {experience?.map((exp) => (
              <View key={exp.id} style={styles.subsection}>
                <View style={styles.titleLine}>
                  <Text style={styles.bold}>{exp.title}</Text>
                  <Text>{exp.timePeriod}</Text>
                </View>
                <Text style={styles.italic}>
                  {exp.company}
                  {exp.location ? ", " + exp.location : ""}
                </Text>
                {exp.description && (
                  <View style={styles.bulletList}>
                    {htmlParser(exp.description)}
                  </View>
                )}
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
                <View style={styles.titleLine}>
                  <Text style={styles.bold}>{proj.name}</Text>
                  {proj.url && <Text>{proj.url}</Text>}
                </View>
                {proj.description && (
                  <View style={styles.bulletList}>
                    {htmlParser(proj.description)}
                  </View>
                )}
              </View>
            ))}
          </View>
        )}

        {/* Skills */}
        {(skills?.categories?.length ?? 0) > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Technical Skills</Text>
            {skills?.categories?.map((cat) => (
              <Text key={cat.id}>
                <Text style={styles.bold}>{cat.name}:</Text>{" "}
                {cat?.skills?.map((s) => s.name)?.join(", ")}
              </Text>
            ))}
          </View>
        )}

        {/* Certifications */}
        {(certifications?.length ?? 0) > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Certifications</Text>
            {certifications?.map((cert, i) => (
              <Text key={i}>
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
              <View style={[styles.bullet]} key={i}>
                <Text key={i} style={{ fontWeight: 700 }}>
                  {a.title}
                </Text>
                {a.description && htmlParser(a.description)}
              </View>
            ))}
          </View>
        )}

        {/* Languages */}
        {(languages?.length ?? 0) > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Languages</Text>
            {languages?.map((l, i) => (
              <Text key={i}>
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
  const ref = useRef<number>(0);
  useEffect(() => {
    ref.current += 1;
  }, [resume]);

  return (
    // <PDFViewer
    //   style={{
    //     width: "100%",
    //     height: "100%",
    //     border: "none",
    //   }}
    //   showToolbar={false}
    //   key={ref.current} // Force re-render on resume change
    // >
    //   <ResumeDocument resume={resume} />
    // </PDFViewer>

    <BlobProvider document={<ResumeDocument resume={resume} />}>
      {({ url, loading }) => {
        if (loading) return <p>Loading PDF...</p>;

        // Hide PDFViewer, use iframe with clean styling
        return (
          <iframe
            src={url ?? ""}
            style={{
              width: "100%",
              height: "100vh",
              border: "none",
              background: "#fff", // Ensures the iframe itself is white
            }}
          />
        );
      }}
    </BlobProvider>
  );
};

export default ModernResumeTemplate;
