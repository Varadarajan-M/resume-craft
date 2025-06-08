import { cn } from "@/shared/lib/utils";
import { Document } from "@/shared/types/document";
import { DocumentCardGrid, DocumentCardList } from "./DocumentCard";

interface DocumentListProps {
  numberOfDocuments: number;
  viewType?: "grid" | "list";
}

const documents: Document[] = [
  {
    _id: "1",
    image: "/placeholder.jpg",
    userId: "user1",
    category: "resume",
    title: "Software Engineer Resume",
    createdAt: new Date(),
    updatedAt: new Date(),
    status: "draft",
  },
  {
    _id: "2",
    image: "/placeholder.jpg",
    userId: "user2",
    category: "cv",
    title: "Data Scientist CV",
    createdAt: new Date(),
    updatedAt: new Date(),
    status: "published",
  },
  {
    _id: "3",
    image: "/placeholder.jpg",
    userId: "user3",
    category: "resume",
    title: "Product Manager Resume",
    createdAt: new Date(),
    updatedAt: new Date(),
    status: "archived",
  },
];

const DocumentList: React.FC<DocumentListProps> = ({
  numberOfDocuments,
  viewType = "grid",
}) => {
  const isList = viewType === "list";

  return (
    <div
      className={cn(
        isList
          ? "flex flex-col gap-4"
          : "grid gap-8 grid-cols-[repeat(auto-fill,minmax(250px,1fr))]"
      )}
    >
      {documents.map((document) =>
        isList ? (
          <DocumentCardList key={document._id} document={document} />
        ) : (
          <DocumentCardGrid key={document._id} document={document} />
        )
      )}
    </div>
  );
};

export default DocumentList;
