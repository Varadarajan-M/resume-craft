import { SuggestedTemplatesSection } from '@/features/dashboard';
import { CreateResumeButton, DocumentSkeleton } from '@/features/documents';
import { PageHeader } from '@/shared/components/common/PageHeader';
import { Suspense } from 'react';
import RecentDocumentSectionRsc from './_components/RecentDocumentsSectionRsc';

export default function DashboardPage() {
  return (
    <section id="dashboard" className="flex flex-col gap-12 ">
      <PageHeader
        title="My Dashboard"
        description="Welcome to your dashboard! Here you can manage your resumes, templates, and more."
        renderAction={() => <CreateResumeButton />}
      />
      <Suspense
        fallback={
          <DocumentSkeleton
            skeletonCount={3}
            viewType="grid"
            isLoading={true}
          />
        }
      >
        <RecentDocumentSectionRsc />
      </Suspense>

      <SuggestedTemplatesSection />
    </section>
  );
}
