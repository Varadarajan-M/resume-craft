import { SuggestedTemplatesSection } from '@/features/dashboard';
import { CreateResumeButton, DocumentSkeleton } from '@/features/documents';
import { FadeIn } from '@/shared/components/animated/FadeIn';
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
          <div className="flex flex-col gap-4 min-h-[200px]">
            <FadeIn
              as="h2"
              transition={{ delay: 0.3 }}
              className="text-base md:text-xl font-semibold tracking-tight"
            >
              Recent Documents
            </FadeIn>
            <DocumentSkeleton
              skeletonCount={3}
              viewType="grid"
              isLoading={true}
            />
          </div>
        }
      >
        <RecentDocumentSectionRsc />
      </Suspense>

      <SuggestedTemplatesSection />
    </section>
  );
}
