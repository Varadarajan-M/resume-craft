import { CreateResumeButton, DocumentSkeleton } from '@/features/documents';
import { PageHeader } from '@/shared/components/common/PageHeader';
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
          <DocumentSkeleton
            skeletonCount={8}
            viewType={view || 'grid'}
            isLoading={true}
          />
        }
      >
        <MyDocumentsSectionRsc />
      </Suspense>
    </section>
  );
};

export default DocumentsPage;
