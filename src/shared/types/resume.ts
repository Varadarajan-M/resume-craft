import type { Document } from "./document";

type SectionMeta = {
  id: string; // Unique identifier for the section
  name: string; // This will be used to identify the section in the resume
  visible: boolean; // Whether the section is visible in the resume
};

export type ResumeLinkItem = {
  id: string;
  label: string;
  url: string;
  iconName?: string; // Optional field for icon name
};
export interface ResumePersonalInfoItem {
  fullName: string;
  headline: string;
  email: string;
  phone: string;
  location: string;
  website?: { label: string; url: string }; // Optional field for personal website or portfolio
  links?: ResumeLinkItem[];
}

export interface ResumeExperienceItem {
  id: string; // Unique identifier for the experience item
  company: string;
  title: string;
  location?: string;
  timePeriod: string; // e.g., "Jan 2020 - Present"
  description?: string; // A brief description of the role
}

export interface ResumeEducationItem {
  id: string; // Unique identifier for the education item
  institution: string;
  fieldOfStudy?: string;
  location?: string;
  timePeriod: string;
  gpa?: string;
  description?: string;
}

export interface Skill {
  id: string;
  name: string;
  level?: "Beginner" | "Intermediate" | "Advanced" | "Expert";
}

export interface ResumeSkillCategoryItem {
  id: string;
  name: string;
  skills: Skill[];
}
export interface ResumeSkillItem {
  categories: ResumeSkillCategoryItem[];
}

export interface ResumeProjectItem {
  id: string; // Unique identifier for the project item
  name: string;
  description?: string;
  url?: string;
  technologies?: string[];
  timePeriod?: string;
}

export interface ResumeProfessionalSummaryItem {
  content: string;
}

export interface ResumeCertificationItem {
  id: string; // Unique identifier for the certification item
  name: string;
  issuer?: string;
  date?: string;
  expirationDate?: string;
  credentialUrl?: string;
  description?: string;
}

export interface ResumeLanguageItem {
  id: string; // Unique identifier for the language item
  language: string;
  proficiency: "Native" | "Fluent" | "Professional" | "Intermediate" | "Basic";
}

export interface CustomSection {
  id: string;
  title: string;
  content: string | unknown; // can support markdown, rich text, etc.
}

export interface ResumeAchievementItem {
  id: string;
  title: string;
  description?: string;
}

export interface Resume extends Document {
  category: "resume";
  sections: {
    personalInfo?: ResumePersonalInfoItem;
    summary?: ResumeProfessionalSummaryItem;
    experience?: ResumeExperienceItem[];
    education?: ResumeEducationItem[];
    skills?: ResumeSkillItem;
    projects?: ResumeProjectItem[];
    certifications?: ResumeCertificationItem[];
    achievements?: ResumeAchievementItem[];
    languages?: ResumeLanguageItem[];
    // [k ]: CustomSection;
  }; // for custom sections
  config: {
    theme: ThemeConfig;
    sectionDetails?: {
      [key: string]: SectionMeta;
    };
    mainColumnSectionOrder?: string[]; // order of sections in the main column
    sideColumnSectionOrder?: string[]; // order of sections in the side column
  };
}

interface ThemeConfig {
  fontFamily: string;
  headingColor: string;
  textColor: string;
  backgroundColor: string;
  linkColor: string;
  headingFontSize: string;
  textFontSize: string;
}

export interface ResumeTemplateComponentProps {
  resume: Resume;
}
