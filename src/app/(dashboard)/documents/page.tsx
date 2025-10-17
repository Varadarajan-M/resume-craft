import {
  CreateResumeButton,
  DocumentSearch,
  DocumentSkeleton,
} from '@/features/documents';
import { FadeIn } from '@/shared/components/animated/FadeIn';
import { PageHeader } from '@/shared/components/common/PageHeader';
import ViewTypeButton from '@/shared/components/common/ViewTypeButton';
import { Grid, List } from 'lucide-react';
import { Suspense } from 'react';
import MyDocumentsSectionRsc from '../_components/MyDocumentsSectionRsc';

const DocumentsPage = async ({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) => {
  const { view } = (await searchParams) as { view?: 'grid' | 'list' };
  return (
    <section
      id="documents"
      className="flex flex-col gap-12  transition-all duration-200"
    >
      <PageHeader
        title="My Documents"
        description="Manage your resumes, cover letters, and other documents here."
        renderAction={() => <CreateResumeButton />}
      />
      <Suspense
        fallback={
          <>
            <FadeIn transition={{ delay: 0.3 }} className="flex flex-row gap-4">
              <DocumentSearch />
              <div className="flex gap-2 items-center">
                <ViewTypeButton
                  active
                  icon={Grid}
                  onClick={() => {}}
                  tooltipText="Grid View"
                />
                <ViewTypeButton
                  active={false}
                  icon={List}
                  onClick={() => {}}
                  tooltipText="List View"
                />
              </div>
            </FadeIn>
            <DocumentSkeleton
              skeletonCount={8}
              viewType={view || 'grid'}
              isLoading={true}
            />
          </>
        }
      >
        <MyDocumentsSectionRsc />
      </Suspense>
    </section>
  );
};

export default DocumentsPage;
