import { cn } from "@/shared/lib/utils";
import { Document } from "@/shared/types/document";
import { DocumentCardGrid, DocumentCardList } from "./DocumentCard";

interface DocumentListProps {
  viewType?: "grid" | "list";
  documents: Document[];
}

const DocumentList: React.FC<DocumentListProps> = ({
  documents,
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
      {documents?.map((document) =>
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
