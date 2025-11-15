import FadeInChildren from '@/shared/components/animated/FadeIn';
import { cn } from '@/shared/lib/utils';
import { Resume } from '@/shared/types/resume';
import { DocumentCardGrid, DocumentCardList } from './DocumentCard';
import DocumentSkeleton from './DocumentSkeleton';

interface DocumentListProps {
  viewType?: 'grid' | 'list';
  isLoading?: boolean;
  documents: Resume[];
  onDocumentClick?: <T extends Resume>(document: T) => void;
  onDocumentDelete?: <T extends Resume>(document: T) => void;
  onDocumentCopy?: <T extends Resume>(document: T) => void;
  isSignedIn?: boolean;
}

const DocumentList: React.FC<DocumentListProps> = ({
  isLoading,
  isSignedIn,
  documents,
  viewType = 'grid',
  onDocumentClick,
  onDocumentCopy,
  onDocumentDelete,
}) => {
  const isList = viewType === 'list';

  if (isLoading) {
    return <DocumentSkeleton skeletonCount={3} viewType={viewType} isLoading />;
  }

  if (!documents || documents.length === 0) {
    return (
      <p className="text-muted-foreground text-sm md:text-base -mt-3">
        No documents yet. Create resumes without an account — they’ll sync when
        you sign in.
      </p>
    );
  }
  return (
    <FadeInChildren
      key={isList ? 'list' : 'grid'}
      className={cn(
        isList
          ? 'flex flex-col gap-4'
          : 'grid gap-8 grid-cols-[repeat(auto-fill,minmax(250px,1fr))]'
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
