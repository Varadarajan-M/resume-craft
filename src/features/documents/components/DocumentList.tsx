/**
 * @file DocumentList.tsx
 * @description Renders a list/grid of resume documents with appropriate skeletons for loading state.
 */

import FadeInChildren from "@/shared/components/animated/FadeIn";
import { cn } from "@/shared/lib/utils";
import { Resume } from "@/shared/types/resume";
import { DocumentCardGrid, DocumentCardList } from "./DocumentCard";
import DocumentSkeleton from "./DocumentSkeleton";

interface DocumentListProps {
  /** The view type (grid or list). */
  viewType?: "grid" | "list";
  /** Whether the document list is currently loading. */
  isLoading?: boolean;
  /** The collection of resumes to display. */
  documents: Resume[];
  /** Callback for when a document is clicked/selected. */
  onDocumentClick?: <T extends Resume>(document: T) => void;
  /** Callback for when a document deletion is requested. */
  onDocumentDelete?: <T extends Resume>(document: T) => void;
  /** Callback for when a document duplication is requested. */
  onDocumentCopy?: <T extends Resume>(document: T) => void;
  /** Whether the user is signed in. */
  isSignedIn?: boolean;
}

/**
 * Component that renders the appropriate document card for each document in the list.
 */
const DocumentList: React.FC<DocumentListProps> = ({
  isLoading,
  documents,
  viewType = "grid",
  onDocumentClick,
  onDocumentCopy,
  onDocumentDelete,
}) => {
  const isList = viewType === "list";

  if (isLoading) {
    return <DocumentSkeleton skeletonCount={3} viewType={viewType} isLoading />;
  }

  if ((!documents || documents.length === 0) && !isLoading) {
    return (
      <p className="text-muted-foreground text-sm md:text-base -mt-3">
        No documents yet. Create resumes without an account — they’ll sync when
        you sign in.
      </p>
    );
  }

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
            onDelete={onDocumentDelete}
            onCopy={onDocumentCopy}
          />
        ) : (
          <DocumentCardGrid
            key={document.id}
            document={document}
            onClick={onDocumentClick}
            onDelete={onDocumentDelete}
            onCopy={onDocumentCopy}
          />
        )
      )}
    </FadeInChildren>
  );
};

export default DocumentList;
