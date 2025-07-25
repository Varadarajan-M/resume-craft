import {
  BadgeCheck,
  Book,
  Briefcase,
  Code2,
  FileText,
  LanguagesIcon,
  Star,
  Trophy,
  User,
} from "lucide-react";

export const RESUME_BUILDER_SECTIONS = {
  personalInfo: {
    sectionId: "personalInfo",
    icon: User,
    title: "Personal Information",
    subtitle: "Basic contact details and personal info.",
    defaultOpen: true,
  },
  summary: {
    sectionId: "summary",
    icon: FileText,
    title: "Professional Summary",
    subtitle: "A brief overview of your professional background and strengths.",
    defaultOpen: true,
  },
  experience: {
    sectionId: "experience",
    icon: Briefcase,
    title: "Work Experience",
    subtitle: "Your relevant roles, starting from the most recent.",
    defaultOpen: true,
  },
  education: {
    sectionId: "education",
    icon: Book,
    title: "Education",
    subtitle: "Your academic qualifications, including schools and degrees.",
    defaultOpen: false,
  },
  skills: {
    sectionId: "skills",
    icon: Star,
    title: "Skills",
    subtitle: "Your core competencies.",
    defaultOpen: false,
  },
  projects: {
    sectionId: "projects",
    icon: Code2,
    title: "Projects",
    subtitle: "Personal, academic or professional projects.",
    defaultOpen: false,
  },
  certifications: {
    sectionId: "certifications",
    icon: BadgeCheck,
    title: "Certifications",
    subtitle: "Relevant certifications and credentials.",
    defaultOpen: false,
  },
  achievements: {
    sectionId: "achievements",
    icon: Trophy,
    title: "Achievements",
    subtitle: "Key milestones or accomplishments that showcase your impact.",
    defaultOpen: false,
  },
  languages: {
    sectionId: "languages",
    icon: LanguagesIcon,
    title: "Languages",
    subtitle: "List the languages you know and your proficiency level.",
    defaultOpen: false,
  },
};
