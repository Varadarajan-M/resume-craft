import { SuggestedTemplatesSection } from '@/features/dashboard';
import RecentDocumentSection from '@/features/dashboard/components/RecentDocumentsSection';
import { CreateResumeButton } from '@/features/documents';
import { PageHeader } from '@/shared/components/common/PageHeader';

export const revalidate = 100; // Revalidate this page every 100 seconds

export default function DashboardPage() {
  return (
    <section id="dashboard" className="flex flex-col gap-12 ">
      <PageHeader
        title="My Dashboard"
        description="Welcome to your dashboard! Here you can manage your resumes, templates, and more."
        renderAction={() => <CreateResumeButton />}
      />
      <RecentDocumentSection />
      <SuggestedTemplatesSection />
    </section>
  );
}
