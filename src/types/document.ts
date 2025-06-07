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
}

export interface DocumentTemplate {
  _id: string;
  image?: string;
  title: string;
  description?: string;
  tags?: string[];
}
