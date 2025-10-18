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
}

const DocumentList: React.FC<DocumentListProps> = ({
  isLoading,
  documents,
  viewType = 'grid',
  onDocumentClick,
}) => {
  const isList = viewType === 'list';

  if (isLoading) {
    return <DocumentSkeleton skeletonCount={3} viewType={viewType} isLoading />;
  }

  if (!documents || documents.length === 0) {
    return (
      <div className="text-muted-foreground">
        No documents found. Please create a new document.
      </div>
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
