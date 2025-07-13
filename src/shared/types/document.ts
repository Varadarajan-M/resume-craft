type DocumentCategory = "resume" | "cv";
type DocumentStatus = "draft" | "published" | "archived";

export interface Document {
  _id: string;
  image?: string;
  userId: string;
  category: DocumentCategory;
  title: string;
  createdAt: Date;
  updatedAt: Date;
  status: DocumentStatus;
  templateId: string; // or templateKey
}

export interface DocumentTemplate {
  _id: string;
  slug: string;
  image?: string;
  title: string;
  description?: string;
  tags?: string[];
}
