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
  _id: "resume-001",
  userId: "user-001",
  category: "resume",
  status: "draft",
  title: "Placeholder Resume",
  templateId: "modern",
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

  sectionOrder: [
    "personalInfo",
    "summary",
    "experience",
    "education",
    "skills",
    "projects",
    "certifications",
    "achievements",
    "languages",
  ],

  sections: {
    personalInfo: {
      fullName: "Jane Doe",
      headline: "Full Stack Developer",
      email: "jane.doe@example.com",
      phone: "+1 (555) 123-4567",
      location: "San Francisco, CA",
      website: {
        label: "Portfolio",
        url: "https://janedoe.dev",
      },
      links: [
        { label: "GitHub", url: "https://github.com/janedoe" },
        { label: "LinkedIn", url: "https://linkedin.com/in/janedoe" },
      ],
    },
    summary: {
      content: `<p>Experienced full stack developer with a passion for building scalable web applications and delightful user experiences.</p>`,
    },
    experience: [
      {
        id: "exp-1",
        company: "Tech Solutions Inc.",
        title: "Senior Software Engineer",
        location: "Remote",
        timePeriod: "Jan 2022 – Present",
        description: `
        <ul>
          <li>Led frontend architecture for a B2B SaaS platform.</li>
          <li>Collaborated with cross-functional teams to design scalable APIs.</li>
          <li>Improved CI/CD pipeline reducing deployment time by 40%.</li>
           <li>Led frontend architecture for a B2B SaaS platform.</li>
          <li>Collaborated with cross-functional teams to design scalable APIs.</li>
          <li>Improved CI/CD pipeline reducing deployment time by 40%.</li> <li>Led frontend architecture for a B2B SaaS platform.</li>
          <li>Collaborated with cross-functional teams to design scalable APIs.</li>
          <li>Improved CI/CD pipeline reducing deployment time by 40%.</li> <li>Led frontend architecture for a B2B SaaS platform.</li>
          <li>Collaborated with cross-functional teams to design scalable APIs.</li>
          <li>Improved CI/CD pipeline reducing deployment time by 40%.</li> <li>Led frontend architecture for a B2B SaaS platform.</li>
          <li>Collaborated with cross-functional teams to design scalable APIs.</li>
          <li>Improved CI/CD pipeline reducing deployment time by 40%.</li> <li>Led frontend architecture for a B2B SaaS platform.</li>
          <li>Collaborated with cross-functional teams to design scalable APIs.</li>
          <li>Improved CI/CD pipeline reducing deployment time by 40%.</li> <li>Led frontend architecture for a B2B SaaS platform.</li>
          <li>Collaborated with cross-functional teams to design scalable APIs.</li>
          <li>Improved CI/CD pipeline reducing deployment time by 40%.</li>
        </ul>
      `,
      },
    ],
    education: [
      {
        id: "edu-1",
        institution: "University of California, Berkeley",
        fieldOfStudy: "B.S. in Computer Science",
        timePeriod: "2017 – 2021",
        gpa: "3.8/4.0",
        description: `
        <p><strong>Relevant coursework:</strong> Algorithms, Databases, UI/UX Design</p>
      `,
      },
    ],
    skills: {
      categories: [
        {
          id: "skill-cat-1",
          name: "Languages",
          skills: [
            { id: "s1", name: "JavaScript" },
            { id: "s2", name: "TypeScript" },
            { id: "s3", name: "Python" },
          ],
        },
        {
          id: "skill-cat-2",
          name: "Frameworks",
          skills: [
            { id: "s4", name: "React" },
            { id: "s5", name: "Node.js" },
            { id: "s6", name: "Express" },
          ],
        },
      ],
    },
    projects: [
      {
        id: "proj-1",
        name: "Personal Portfolio",
        description: `
        <ul>
          <li>Designed and built a responsive portfolio using <strong>Next.js</strong> and <strong>Tailwind CSS</strong>.</li>
          <li>Integrated analytics and deployed with <a href="https://vercel.com" target="_blank">Vercel</a>.</li>
        </ul>
      `,
        url: "https://janedoe.dev",
        technologies: ["Next.js", "Tailwind", "Vercel"],
      },
    ],
    certifications: [
      {
        id: "cert-1",
        name: "AWS Certified Developer – Associate",
        issuer: "Amazon Web Services",
        date: "June 2023",
        expirationDate: "June 2026",
        credentialUrl: "https://aws.amazon.com/certification/",
        description: `
        <p>Validated expertise in deploying and maintaining <strong>AWS</strong> applications efficiently using core services like <em>Lambda</em>, <em>API Gateway</em>, and <em>DynamoDB</em>.</p>
      `,
      },
    ],
    achievements: [
      {
        id: "achv-1",
        title: "Hackathon Winner",
        description: `
        <p>Won <strong>1st place</strong> at <em>Reactathon 2022</em> for building a collaborative whiteboard app with real-time drawing and chat features.</p>
      `,
      },
    ],
    languages: [
      {
        id: "lang-1",
        language: "English",
        proficiency: "Native",
      },
      {
        id: "lang-2",
        language: "Spanish",
        proficiency: "Professional",
      },
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
