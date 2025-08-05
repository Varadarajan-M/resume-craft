type DocumentCategory = "resume" | "cv";
type DocumentStatus = "draft" | "published" | "archived";

export type ResumeTemplateId = "clean-minimal" | "standard";

export interface Document {
  id: string;
  image?: string;
  userId: string;
  category: DocumentCategory;
  title: string;
  createdAt: Date;
  updatedAt: Date;
  status: DocumentStatus;
  templateId: ResumeTemplateId; // or templateKey
}

export interface DocumentTemplate {
  id: string;
  slug: string;
  image?: string;
  title: string;
  description?: string;
  tags?: string[];
}
