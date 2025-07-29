import FadeInChildren from "@/shared/components/animated/FadeIn";
import { cn } from "@/shared/lib/utils";
import { Document } from "@/shared/types/document";
import { DocumentCardGrid, DocumentCardList } from "./DocumentCard";

interface DocumentListProps {
  viewType?: "grid" | "list";
  documents: Document[];
  onDocumentClick?: (document: Document) => void;
}

const DocumentList: React.FC<DocumentListProps> = ({
  documents,
  viewType = "grid",
  onDocumentClick,
}) => {
  const isList = viewType === "list";

  return (
    <FadeInChildren
      key={isList ? "list" : "grid"}
      className={cn(
        isList
          ? "flex flex-col gap-4"
          : "grid gap-8 grid-cols-[repeat(auto-fill,minmax(250px,1fr))]"
      )}
    >
      {documents?.map((document) =>
        isList ? (
          <DocumentCardList
            key={document.id}
            document={document}
            onClick={onDocumentClick}
          />
        ) : (
          <DocumentCardGrid
            key={document.id}
            document={document}
            onClick={onDocumentClick}
          />
        )
      )}
    </FadeInChildren>
  );
};

export default DocumentList;
