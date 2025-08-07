import { DocumentTemplate } from "@/shared/types/document";
import mongoose, { InferSchemaType } from "mongoose";

const templateSchema = new mongoose.Schema<DocumentTemplate>(
  {
    id: { type: String, required: true },
    name: { type: String, required: true },
    image: { type: String },
    description: { type: String, required: true },
    tags: [{ type: String }],
    mainColumnSectionOrder: [{ type: String }],
    sideColumnSectionOrder: [{ type: String }],
  },
  {
    timestamps: true,
  }
);

type ResumeTemplateModel = InferSchemaType<typeof templateSchema>;

const ResumeTemplate =
  mongoose.models?.ResumeTemplate ||
  mongoose.model<ResumeTemplateModel>("ResumeTemplate", templateSchema);

export default ResumeTemplate as mongoose.Model<ResumeTemplateModel>;
