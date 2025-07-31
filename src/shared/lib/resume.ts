import { Resume } from "../types/resume";
import { getUniqId } from "./utils";

type TemplateConfig = {
  id: string;
  mainColumnSectionOrder?: string[];
  sideColumnSectionOrder?: string[];
};

export const getPlaceholderResume = (
  userId?: string,
  templateConfig?: TemplateConfig
): Resume => ({
  id: getUniqId(),
  userId: userId || "anonymous",
  category: "resume",
  status: "draft",
  title: "Jane Doe Resume",
  templateId: templateConfig?.id || "standard",
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

  mainColumnSectionOrder: templateConfig?.mainColumnSectionOrder || [
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

  sideColumnSectionOrder: templateConfig?.sideColumnSectionOrder || [],

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
        timePeriod: "Jan 2024 - Mar 2024",
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
          <ul>
          <li>Validated proficiency in designing scalable, cost‑efficient architectures on AWS using EC2, S3, RDS, and Lambda.</li>
          </ul>
        `,
      },
    ],

    achievements: [
      {
        id: getUniqId(),
        title: "Hackathon Champion",
        description: `
          <ul>
          <li>Awarded 1st place in TechCrunch Disrupt 2019 Hackathon for building an AI‑powered health monitoring app.</li>
          </ul>
        `,
      },
    ],

    languages: [
      { id: getUniqId(), language: "English", proficiency: "Native" },
      { id: getUniqId(), language: "Spanish", proficiency: "Professional" },
    ],
  },
});
