import type { Document } from "./document";

interface HeaderSection {
  fullName: string;
  title: string;
  email: string;
  phone?: string;
  location?: string;
  links?: { label: string; url: string }[];
}

interface ExperienceSection {
  company: string;
  position: string;
  location?: string;
  startDate: string;
  endDate?: string;
  currentlyWorking?: boolean;
  summary?: string;
  bulletPoints?: string[];
}

interface EducationSection {
  institution: string;
  degree: string;
  fieldOfStudy?: string;
  startDate: string;
  endDate?: string;
  grade?: string;
  bulletPoints?: string[];
}

interface SkillSection {
  categories: {
    name: string;
    skills: {
      name: string;
      level?: "Beginner" | "Intermediate" | "Advanced" | "Expert";
    }[];
  };
}

interface ProjectSection {
  name: string;
  description?: string;
  url?: string;
  technologies?: string[];
}

interface SummarySection {
  content: string;
}

interface CertificationSection {
  name: string;
  issuer?: string;
  date?: string;
  expirationDate?: string;
  credentialId?: string;
  credentialUrl?: string;
  description?: string;
}

interface LanguageSection {
  language: string;
  proficiency: "Native" | "Fluent" | "Professional" | "Intermediate" | "Basic";
}

interface CustomSection {
  id: string;
  title: string;
  content: string | any; // can support markdown, rich text, etc.
}

export interface Resume extends Document {
  category: "resume";
  theme: ThemeConfig;
  sectionOrder: string[]; // e.g., ['header', 'experience', 'education', 'skills'] - order of sections in the resume
  sections: {
    header?: HeaderSection;
    experience?: ExperienceSection[];
    education?: EducationSection[];
    skills?: SkillSection;
    projects?: ProjectSection[];
    summary?: SummarySection;
    certifications?: CertificationSection[];
    languages?: LanguageSection;
  } & Record<string, CustomSection>; // for custom sections
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
