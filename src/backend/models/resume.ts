import {
  ResumeAchievementItem,
  ResumeCertificationItem,
  ResumeEducationItem,
  ResumeExperienceItem,
  ResumeLanguageItem,
  ResumePersonalInfoItem,
  ResumeProfessionalSummaryItem,
  ResumeProjectItem,
  ResumeSkillCategoryItem,
  Resume as ResumeType,
} from "@/shared/types/resume";
import mongoose, {
  InferSchemaType,
  Document as MongooseDocument,
  Schema,
} from "mongoose";

const experienceSchema = new Schema<ResumeExperienceItem>(
  {
    id: { type: String, required: true },
    company: { type: String, required: true },
    title: { type: String, required: true },
    location: { type: String },
    timePeriod: { type: String },
    description: { type: String },
  },
  { _id: false }
);

const educationSchema = new Schema<ResumeEducationItem>(
  {
    id: { type: String, required: true },
    institution: { type: String, required: true },
    fieldOfStudy: { type: String },
    timePeriod: { type: String },
    description: { type: String },
    location: { type: String },
  },
  { _id: false }
);

const skillCategorySchema = new Schema<ResumeSkillCategoryItem>(
  {
    id: { type: String, required: true },
    name: { type: String, required: true },
    skills: [{ id: String, name: String }],
  },
  { _id: false }
);

const projectSchema = new Schema<ResumeProjectItem>(
  {
    id: { type: String, required: true },
    name: { type: String, required: true },
    description: { type: String },
    url: { type: String },
    technologies: [String],
  },
  { _id: false }
);

const certificationSchema = new Schema<ResumeCertificationItem>(
  {
    id: { type: String, required: true },
    name: { type: String, required: true },
    issuer: { type: String },
    date: { type: String },
    expirationDate: { type: String },
    credentialUrl: { type: String },
    description: { type: String },
  },
  { _id: false }
);

const achievementSchema = new Schema<ResumeAchievementItem>(
  {
    id: { type: String, required: true },
    title: { type: String, required: true },
    description: { type: String },
  },
  { _id: false }
);

const languageSchema = new Schema<ResumeLanguageItem>(
  {
    id: { type: String, required: true },
    language: { type: String, required: true },
    proficiency: { type: String },
  },
  { _id: false }
);

const personalInfoSchema = new Schema<ResumePersonalInfoItem>(
  {
    fullName: { type: String, required: true },
    headline: { type: String },
    email: { type: String },
    phone: { type: String },
    location: { type: String },
    website: { label: String, url: String },
    links: [{ id: String, label: String, url: String, iconName: String }],
  },
  { _id: false }
);

const summarySchema = new Schema<ResumeProfessionalSummaryItem>(
  {
    content: { type: String },
  },
  { _id: false }
);

// --- Main Resume Schema ---
const resumeSchema = new Schema<ResumeType & MongooseDocument>(
  {
    id: { type: String, required: true },
    image: { type: String },
    userId: { type: String, required: true },
    category: { type: String, required: true, default: "resume" },
    title: { type: String, required: true },
    status: {
      type: String,
      enum: ["draft", "published", "archived"],
      default: "draft",
    },
    templateId: { type: String, required: true },
    sections: {
      type: new Schema(
        {
          personalInfo: personalInfoSchema,
          summary: summarySchema,
          experience: [experienceSchema],
          education: [educationSchema],
          skills: {
            categories: [skillCategorySchema],
          },
          projects: [projectSchema],
          certifications: [certificationSchema],
          achievements: [achievementSchema],
          languages: [languageSchema],
        },
        { _id: false, strict: false }
      ),
      default: {},
    },
    config: {
      theme: { type: Object, default: {} }, // or define a ThemeConfig schema
      sectionDetails: {
        type: Map,
        of: new Schema(
          {
            id: { type: String, required: true },
            name: { type: String, required: true },
            visible: { type: Boolean, default: true },
          },
          { _id: false }
        ),
      },
      mainColumnSectionOrder: [String],
      sideColumnSectionOrder: [String],
    },
  },
  { timestamps: true }
);

type ResumeModel = InferSchemaType<typeof resumeSchema>;

const Resume =
  mongoose.models?.Resume ||
  mongoose.model<ResumeModel>("Resume", resumeSchema);

export default Resume as mongoose.Model<ResumeModel>;
