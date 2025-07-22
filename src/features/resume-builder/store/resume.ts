import { getUniqId } from "@/shared/lib/utils";
import type {
  Resume,
  ResumeAchievementItem,
  ResumeCertificationItem,
  ResumeEducationItem,
  ResumeExperienceItem,
  ResumeLanguageItem,
  ResumePersonalInfoItem,
  ResumeProjectItem,
} from "@/shared/types/resume";
import { create } from "zustand";
import { immer } from "zustand/middleware/immer";

export const emptyResume = (): Resume => ({
  _id: "resume-000",
  userId: "user-000",
  category: "resume",
  status: "draft",
  title: "Jane Doe Resume",
  templateId: "clean-minimal",
  image: undefined,
  createdAt: new Date(),
  updatedAt: new Date(),

  theme: {
    fontFamily: "Inter",
    headingColor: "#000000",
    textColor: "#333333",
    backgroundColor: "#ffffff",
    linkColor: "#0066cc",
    headingFontSize: "1.25rem",
    textFontSize: "1rem",
  },

  mainColumnSectionOrder: [
    "personalInfo",
    "summary",
    "education",
    "skills",
    "experience",
    "projects",
    "certifications",
    "achievements",
    "languages",
  ],

  sections: {
    personalInfo: {
      fullName: "First Last",
      headline: "Software Engineer",
      email: "jane.doe@example.com",
      phone: "+1 (555) 123-4567",
      location: "123 Street Name, Town, State 12345",
      links: [
        {
          id: getUniqId(),
          label: "Portfolio",
          url: "https://janedoe.dev",
          iconName: "link",
        },
        {
          label: "GitHub",
          url: "https://github.com/janedoe",
          id: getUniqId(),
          iconName: "github",
        },
        {
          id: getUniqId(),
          label: "LinkedIn",
          url: "https://linkedin.com/in/janedoe",
          iconName: "linkedin",
        },
      ],
    },

    summary: {
      content: `
        <p>Dedicated <strong>Software Engineer</strong> with <strong>5 years of experience</strong> building web applications using React, Node.js, and cloud services. Skilled in designing scalable APIs, improving performance, and leading cross-functional teams to deliver high‑impact features on schedule.</p>
      `,
    },

    experience: [
      {
        id: getUniqId(),
        company: "TechFlow Inc.",
        title: "Senior Frontend Engineer",
        location: "San Francisco, CA",
        timePeriod: "Jan 2023 – Present",
        description: `
          <ul>
            <li>Led migration of a monolithic React app to micro‑frontend architecture, reducing load time by 60%.</li>
            <li>Implemented a shared component library with Storybook, cutting new feature delivery time by 30%.</li>
            <li>Mentored 4 junior developers, improving code quality and team velocity through code reviews and pairing.</li>
          </ul>
        `,
      },
      {
        id: getUniqId(),
        company: "DataSpark Corp.",
        title: "Full Stack Developer",
        location: "Seattle, WA",
        timePeriod: "Jun 2020 – Dec 2022",
        description: `
          <ul>
            <li>Designed and built RESTful APIs in Node.js and Express, serving over 100,000 daily users.</li>
            <li>Optimized database queries in PostgreSQL, reducing report generation time from 120s to under 5s.</li>
            <li>Collaborated with UX team to create responsive dashboards in React, increasing user engagement by 25%.</li>
          </ul>
        `,
      },
      {
        id: getUniqId(),
        company: "CloudWorks LLC",
        title: "Software Engineer",
        location: "Remote",
        timePeriod: "Aug 2018 – May 2020",
        description: `
          <ul>
            <li>Developed AWS Lambda functions and serverless workflows, reducing infrastructure costs by 40%.</li>
            <li>Integrated third‑party OAuth providers (Google, GitHub) to streamline user onboarding.</li>
            <li>Wrote unit and integration tests in Jest, achieving 95% code coverage across services.</li>
          </ul>
        `,
      },
      {
        id: getUniqId(),
        company: "StartupX",
        title: "Junior Web Developer",
        location: "Austin, TX",
        timePeriod: "Jul 2017 – Jul 2018",
        description: `
          <ul>
            <li>Built interactive UI features in Vue.js, increasing customer sign‑up conversion by 15%.</li>
            <li>Collaborated with design team to implement mobile‑first layouts using Tailwind CSS.</li>
            <li>Deployed applications to Docker and Kubernetes, automating CI/CD pipelines with GitLab CI.</li>
          </ul>
        `,
      },
    ],

    education: [
      {
        id: getUniqId(),
        institution: "State University",
        fieldOfStudy: "Bachelor of Science in Computer Science",
        gpa: "3.8",
        location: "City, State",
        timePeriod: "Sep. 2017 – May 2021",
        description: "",
      },
    ],

    skills: {
      categories: [
        {
          id: getUniqId(),
          name: "Languages",
          skills: [
            { id: getUniqId(), name: "JavaScript" },
            { id: getUniqId(), name: "TypeScript" },
            { id: getUniqId(), name: "Python" },
          ],
        },
        {
          id: getUniqId(),
          name: "Frameworks",
          skills: [
            { id: getUniqId(), name: "React" },
            { id: getUniqId(), name: "Node.js" },
            { id: getUniqId(), name: "Express" },
          ],
        },
      ],
    },

    projects: [
      {
        id: getUniqId(),
        name: "RealTime Chat Platform",
        description: `
          <ul>
            <li>Engineered a Node.js and Socket.IO chat service supporting 5,000+ concurrent users with end‑to‑end encryption.</li>
            <li>Built React dashboard for moderators with live analytics and message moderation tools.</li>
          </ul>
        `,
        url: "https://github.com/janedoe/chat-platform",
        technologies: ["React", "Node.js", "Socket.IO", "Docker"],
        timePeriod: "Jan 2024 - Mar 2024"
      },
    ],

    certifications: [
      {
        id: getUniqId(),
        name: "AWS Certified Solutions Architect – Associate",
        issuer: "Amazon Web Services",
        date: "April 2022",
        expirationDate: "April 2025",
        credentialUrl: "https://aws.amazon.com/certification/",
        description: `
          <p>Validated proficiency in designing scalable, cost‑efficient architectures on AWS using EC2, S3, RDS, and Lambda.</p>
        `,
      },
    ],

    achievements: [
      {
        id: getUniqId(),
        title: "Hackathon Champion",
        description: `
          <p>Awarded 1st place in TechCrunch Disrupt 2019 Hackathon for building an AI‑powered health monitoring app.</p>
        `,
      },
    ],

    languages: [
      { id: getUniqId(), language: "English", proficiency: "Native" },
      { id: getUniqId(), language: "Spanish", proficiency: "Professional" },
    ],
  },
});

type ResumeStore = {
  resume: Resume | null;
  setResume: (resume: Resume) => void;

  updatePersonalInfoField: <T>(
    key: keyof ResumePersonalInfoItem,
    value: T
  ) => void;

  updateSummary: (content: string) => void;

  // experience section

  updateExperienceItem: (
    id: string,
    data: Partial<ResumeExperienceItem>
  ) => void;
  addExperienceItem: () => void;
  deleteExperienceItem: (id: string) => void;
  duplicateExperienceItem: (id: string) => void;

  // education section

  updateEducationItem: (id: string, data: Partial<ResumeEducationItem>) => void;
  addEducationItem: () => void;
  deleteEducationItem: (id: string) => void;
  duplicateEducationItem: (id: string) => void;

  // certification section

  updateCertificationItem: (
    id: string,
    data: Partial<ResumeCertificationItem>
  ) => void;
  addCertificationItem: () => void;
  deleteCertificationItem: (id: string) => void;
  duplicateCertificationItem: (id: string) => void;

  // achievements section

  updateAchievementItem: (
    id: string,
    data: Partial<ResumeAchievementItem>
  ) => void;
  addAchievementItem: () => void;
  deleteAchievementItem: (id: string) => void;
  duplicateAchievementItem: (id: string) => void;

  // languages section
  addLanguageItem: () => void;
  updateLanguageItem: (id: string, data: Partial<ResumeLanguageItem>) => void;
  deleteLanguageItem: (id: string) => void;

  // projects section

  addProjectItem: () => void;
  updateProjectItem: (id: string, data: Partial<ResumeProjectItem>) => void;
  deleteProjectItem: (id: string) => void;
  duplicateProjectItem: (id: string) => void;

  // other updaters can be added below like:
  // updateExperienceItem: (id: string, data: Partial<ResumeExperienceItem>) => void;
};

export const useResumeStore = create<ResumeStore>()(
  immer((set) => ({
    resume: emptyResume(),
    setResume: (resume) => set({ resume }),
    updatePersonalInfoField: (key, value) =>
      set((state) => {
        if (!state.resume) return;

        const section = state.resume.sections;

        // Ensure personalInfo exists before updating
        section.personalInfo ??= {
          fullName: "",
          headline: "",
          email: "",
          phone: "",
          location: "",
          website: undefined,
          links: [],
        };

        section.personalInfo[key] = value as any;
      }),
    updateSummary: (content: string) =>
      set((state) => {
        if (!state.resume) return;
        state.resume.sections.summary = { content };
      }),
    updateExperienceItem: (id, data) =>
      set((state) => {
        const experiences = state.resume?.sections.experience ?? [];
        const updated = experiences.map((item) =>
          item.id === id ? { ...item, ...data } : item
        );
        state.resume!.sections.experience = updated;
      }),

    addExperienceItem: () =>
      set((state) => {
        const newItem: ResumeExperienceItem = {
          id: getUniqId(),
          title: "",
          company: "",
          timePeriod: "",
          description: "",
        };
        const prev = state.resume?.sections.experience ?? [];
        state.resume!.sections.experience = [...prev, newItem];
      }),

    deleteExperienceItem: (id) =>
      set((state) => {
        const prev = state.resume?.sections.experience ?? [];
        state.resume!.sections.experience = prev.filter(
          (item) => item.id !== id
        );
      }),

    duplicateExperienceItem: (id) =>
      set((state) => {
        const experiences = state.resume?.sections.experience ?? [];
        const index = experiences.findIndex((item) => item.id === id);
        const original = experiences[index];
        const copy = {
          ...original,
          id: getUniqId(),
          title: `${original.title} (Copy)`,
        };
        const updated = [...experiences];
        updated.splice(index + 1, 0, copy);
        state.resume!.sections.experience = updated;
      }),

    updateEducationItem: (id, data) =>
      set((state) => {
        const items = state.resume?.sections.education ?? [];
        state.resume!.sections.education = items?.map((item) =>
          item.id === id ? { ...item, ...data } : item
        );
      }),

    addEducationItem: () =>
      set((state) => {
        const newItem: ResumeEducationItem = {
          id: getUniqId(),
          institution: "",
          fieldOfStudy: "",
          timePeriod: "",
          gpa: "",
          description: "",
        };
        state.resume!.sections.education = [
          ...(state.resume?.sections.education ?? []),
          newItem,
        ];
      }),

    deleteEducationItem: (id) =>
      set((state) => {
        state.resume!.sections.education = (
          state.resume?.sections.education ?? []
        ).filter((item) => item.id !== id);
      }),

    duplicateEducationItem: (id) =>
      set((state) => {
        const items = state.resume?.sections.education ?? [];
        const index = items.findIndex((item) => item.id === id);
        const original = items[index];
        const copy = {
          ...original,
          id: getUniqId(),
          institution: `${original.institution} (Copy)`,
        };
        const updated = [...items];
        updated.splice(index + 1, 0, copy);
        state.resume!.sections.education = updated;
      }),

    updateCertificationItem: (id, data) =>
      set((state) => {
        const items = state.resume?.sections.certifications ?? [];
        state.resume!.sections.certifications = items.map((item) =>
          item.id === id ? { ...item, ...data } : item
        );
      }),

    addCertificationItem: () =>
      set((state) => {
        const newItem: ResumeCertificationItem = {
          id: getUniqId(),
          name: "",
          issuer: "",
          date: "",
          expirationDate: "",
          credentialUrl: "",
          description: "",
        };
        state.resume!.sections.certifications = [
          ...(state.resume?.sections.certifications ?? []),
          newItem,
        ];
      }),

    deleteCertificationItem: (id) =>
      set((state) => {
        const list = state.resume?.sections.certifications ?? [];
        state.resume!.sections.certifications = list.filter(
          (item) => item.id !== id
        );
      }),

    duplicateCertificationItem: (id) =>
      set((state) => {
        const list = state.resume?.sections.certifications ?? [];
        const index = list.findIndex((item) => item.id === id);
        const original = list[index];
        const copy = {
          ...original,
          id: getUniqId(),
          name: original.name + " (Copy)",
        };
        const updated = [...list];
        updated.splice(index + 1, 0, copy);
        state.resume!.sections.certifications = updated;
      }),

    updateAchievementItem: (id, data) =>
      set((state) => {
        const items = state.resume?.sections.achievements ?? [];
        state.resume!.sections.achievements = items.map((item) =>
          item.id === id ? { ...item, ...data } : item
        );
      }),

    addAchievementItem: () =>
      set((state) => {
        const newItem: ResumeAchievementItem = {
          id: getUniqId(),
          title: "",
          description: "",
        };
        state.resume!.sections.achievements = [
          ...(state.resume?.sections.achievements ?? []),
          newItem,
        ];
      }),

    deleteAchievementItem: (id) =>
      set((state) => {
        state.resume!.sections.achievements =
          state.resume?.sections.achievements?.filter((a) => a.id !== id) ?? [];
      }),

    duplicateAchievementItem: (id) =>
      set((state) => {
        const items = state.resume?.sections.achievements ?? [];
        const index = items.findIndex((item) => item.id === id);
        const original = items[index];
        const copy = {
          ...original,
          id: getUniqId(),
          title: `${original.title} (Copy)`,
        };
        const updated = [...items];
        updated.splice(index + 1, 0, copy);
        state.resume!.sections.achievements = updated;
      }),

    addLanguageItem: () =>
      set((state) => {
        const newItem = {
          id: getUniqId(),
          language: "",
          proficiency: "Fluent",
        } as ResumeLanguageItem;
        state.resume!.sections.languages = [
          ...(state.resume?.sections.languages ?? []),
          newItem,
        ];
      }),

    updateLanguageItem: (id, data) =>
      set((state) => {
        const langs = state.resume?.sections.languages ?? [];
        state.resume!.sections.languages = langs?.map((lang) =>
          lang?.id === id ? { ...lang, ...data } : lang
        );
      }),

    deleteLanguageItem: (id) =>
      set((state) => {
        const langs = state.resume?.sections.languages ?? [];
        state.resume!.sections.languages = langs.filter(
          (lang) => lang?.id !== id
        );
      }),

    addProjectItem: () =>
      set((state) => {
        const newItem = {
          id: getUniqId(),
          name: "",
          description: "",
          url: "",
          technologies: [],
        } as ResumeProjectItem;
        state.resume!.sections.projects = [
          ...(state.resume?.sections.projects ?? []),
          newItem,
        ];
      }),

    updateProjectItem: (id, data) =>
      set((state) => {
        const items = state.resume?.sections.projects ?? [];
        state.resume!.sections.projects = items.map((item) =>
          item.id === id ? { ...item, ...data } : item
        );
      }),

    deleteProjectItem: (id) =>
      set((state) => {
        const items = state.resume?.sections.projects ?? [];
        state.resume!.sections.projects = items.filter(
          (item) => item.id !== id
        );
      }),

    duplicateProjectItem: (id) =>
      set((state) => {
        const items = state.resume?.sections.projects ?? [];
        const index = items.findIndex((item) => item?.id === id);
        const original = items[index];
        const copy = {
          ...original,
          id: getUniqId(),
          name: original?.name + " (Copy)",
        };
        const updated = [...items];
        updated.splice(index + 1, 0, copy);
        state.resume!.sections.projects = updated;
      }),
  }))
);
