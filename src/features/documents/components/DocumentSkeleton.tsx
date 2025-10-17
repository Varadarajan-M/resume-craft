import { cn } from '@/shared/lib/utils';
import {
  DocumentCardGridSkeleton,
  DocumentCardListSkeleton,
} from './DocumentCard';

interface DocumentSkeletonProps {
  viewType?: 'grid' | 'list';
  skeletonCount?: number;
  isLoading?: boolean;
}

const DocumentSkeleton = ({
  viewType = 'grid',
  skeletonCount = 3,
  isLoading,
}: DocumentSkeletonProps) => {
  const isList = viewType === 'list';
  if (isLoading) {
    return (
      <div
        className={cn(
          isList
            ? 'flex flex-col gap-4'
            : 'grid gap-8 grid-cols-[repeat(auto-fill,minmax(250px,1fr))]'
        )}
      >
        {Array.from({ length: skeletonCount }).map((_, index) =>
          isList ? (
            <DocumentCardListSkeleton key={index} />
          ) : (
            <DocumentCardGridSkeleton key={index} />
          )
        )}
      </div>
    );
  }
};

export default DocumentSkeleton;
