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
  title: "Varadarajan M Resume",
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
    "education",
    "skills",
    "experience",
    "projects",
  ],

  sections: {
    personalInfo: {
      fullName: "Varadarajan M",
      headline: "Software Engineer",
      email: "varad2k19@gmail.com",
      phone: "+91-8281357494",
      location: "Palakkad, Kerala, India",
      website: {
        label: "Portfolio",
        url: "varadarajan-m.vercel.app",
      },
      links: [{ label: "Github", url: "github.com/Varadarajan-M" }],
    },
    education: [
      {
        id: "edu-1",
        institution: "SCSVMV University",
        fieldOfStudy: "Bachelor of Computer Science and Engineering; CGPA: 8.5",
        timePeriod: "Aug 2017 - May 2021",
        description: "",
      },
    ],
    skills: {
      categories: [
        {
          id: "skill-cat-1",
          name: "Languages",
          skills: [
            { id: "s1", name: "JavaScript ES6+" },
            { id: "s2", name: "TypeScript" },
          ],
        },
        {
          id: "skill-cat-2",
          name: "Web Technologies",
          skills: [
            { id: "s3", name: "Next JS" },
            { id: "s4", name: "React JS" },
            { id: "s5", name: "HTML5" },
            { id: "s6", name: "CSS3" },
            { id: "s7", name: "SCSS" },
            { id: "s8", name: "Tailwind CSS" },
            { id: "s9", name: "Redux Toolkit" },
            { id: "s10", name: "Zustand" },
            { id: "s11", name: "RTK Query" },
            { id: "s12", name: "Tanstack Query" },
            { id: "s13", name: "Cypress" },
            { id: "s14", name: "Angular" },
          ],
        },
        {
          id: "skill-cat-3",
          name: "Server Side Technologies",
          skills: [
            { id: "s14", name: "Node JS" },
            { id: "s15", name: "Express" },
            { id: "s16", name: "MongoDB" },
            { id: "s17", name: "PostgreSQL" },
          ],
        },
        {
          id: "skill-cat-4",
          name: "Tools",
          skills: [
            { id: "s18", name: "Git" },
            { id: "s19", name: "GitLab" },
            { id: "s20", name: "Jira" },
            { id: "s21", name: "Notion" },
            { id: "s22", name: "GitHub" },
            { id: "s23", name: "Vercel" },
            { id: "s24", name: "Airtable" },
          ],
        },
      ],
    },
    experience: [
      {
        id: "exp-1",
        company: "Rize Ag-Tech.",
        title: "Mid-level Frontend Engineer",
        location: "Bangalore, India",
        timePeriod: "Sept 2024 – Present",
        description: `
        <ul>
          <li>Delivered a Package Tracker Dashboard (<strong>React, Spring Boot, Postgres</strong>) efficiently tracking <strong>20K+ packages</strong> with sub-200ms APIs offering advanced search, filters, <strong>G2Plot visualizations</strong> enabling operations to track and resolve stuck shipments, <strong>cutting resolution time by 40%</strong>.</li>
          <li>Engineered a Sales Pipeline with a <strong>config-driven React UI</strong> that adapted to country specific needs leveraging <strong>Airtable APIs</strong> enabling sales team to <strong>manage over 200+ leads weekly</strong>, eliminating third-party SaaS tools and <strong>saving $50/user/month</strong>.</li>
          <li>Optimized application performance by migrating all data fetching to <strong>TanStack Query, boosting load speed by over 50%</strong> and eliminating cumulative layout shift (<strong>CLS</strong>) via smart caching and prefetching.</li>
          <li>Architected a robust frontend <strong>RBAC system, scaling permission control from 4 to 17+ pages</strong> via a declarative component based model.</li>
        </ul>
      `,
      },
      {
        id: "exp-2",
        company: "Genpro Research.",
        title: "Frontend Engineer",
        location: "Trivandrum, India",
        timePeriod: "Jul 2023 – Sept 2024",
        description: `
        <ul>
          <li>Delivered an <strong>AI-powered Semantic Search Chat interface</strong> for medical writers with rich features like follow-ups, response regeneration, and one-click content insertion with citation tracing <strong>accelerating authoring workflows by over 80%</strong> by streamlining cross-document research and enabling scroll-to-source <strong>PDFs</strong> in over 10k articles.</li>
          <li>Developed and published a scalable internal UI component library as an <strong>npm package</strong> using <strong>React, Rollup.js, Storybook</strong>, and <strong>Jest</strong> which accelerated UI development by <strong>70%</strong> and improved design consistency, contributing to a <strong>50% increase</strong> in user retention across products.</li>
        </ul>
      `,
      },
      {
        id: "exp-3",
        company: "Infosys",
        title: "Systems Engineer",
        location: "Chennai, India",
        timePeriod: "Dec 2021 – Jul 2023",
        description: `
        <ul>
          <li>Contributed as a <strong>Cybersecurity Engineer</strong> on the SOAR team, developing automated workflows and an incident response workbench that increased closure rate by <strong>35%</strong> and reduced resolution time by <strong>25%</strong>.</li>
        </ul>
      `,
      },
      {
        id: "exp-4",
        company: "Tech RSR",
        title: "Full Stack Engineer",
        location: "Chennai, India",
        timePeriod: "May 2021 – Nov 2021",
        description: `
        <ul>
          <li>Designed and implemented core project management features in the <strong>HPM Web App</strong> using <strong>React.js, Material UI</strong>, and <strong>Recharts</strong> including Kanban boards, list views, and real-time comments with <strong>WebSockets</strong> boosting team collaboration and <strong>improving workflow efficiency by 60%</strong>.</li>
          <li>Optimized search performance with <strong>debouncing</strong>, minimizing redundant API calls and enhancing responsiveness <strong>improving perceived speed and user experience</strong> during high-frequency interactions</li>
        </ul>
      `,
      },
    ],
    projects: [
      {
        id: "proj-1",
        name: "FormCraft – AI-Powered No-Code Visual Form Builder",
        description: `
        <ul>
          <li>Architected and built an <strong>AI-powered form builder</strong> with ultra-modern drag-and-drop UI and <strong>Gemini AI-powered multi-page forms</strong> offering robust conditional logic, <strong>validations, analytics</strong>, and key integrations (<strong>Airtable, Google Sheets, webhooks</strong>), empowering users to ship complex forms in minutes.</li>
          <li>Crafted <strong>real-time previews, form templates, mobile optimizations</strong>, and theme-based UI customizations resulting in smoother UX, faster form creation, and cut down setup effort even for non-technical users.</li>
        </ul>
      `,
        url: "",
        technologies: [
          "Next.js 14",
          "React 18",
          "TypeScript",
          "Tailwind CSS",
          "MongoDB",
          "Clerk Auth",
          "React Hook Form",
          "Gemini AI",
          "DnD-Kit",
          "Airtable",
        ],
      },
      {
        id: "proj-2",
        name: "V1 Messenger – Real-Time Chat App",
        description: `
        <ul>
          <li>Developed a <strong>feature-rich chat app from scratch</strong> with real-time personal/group chats and <strong>AI streaming responses (Llama 3)</strong> supporting diverse <strong>multimedia sharing, message reactions/replies</strong>, read receipts, online stats and so much more.</li>
          <li>Engineered offline caching strategies leveraging <strong>service workers and Intersection Observers</strong>, decreasing media load times from <strong>2.1 seconds to 18 ms</strong> and <strong>optimizing network consumption by 98%</strong>.</li>
        </ul>
      `,
        url: "",
        technologies: [
          "React",
          "TypeScript",
          "Tailwind CSS",
          "Socket.IO",
          "Zustand",
          "Service workers",
          "MongoDB",
          "Node.js",
          "Express JS",
          "AI",
        ],
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
