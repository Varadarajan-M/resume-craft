import {
  RecentDocumentsSection,
  SuggestedTemplatesSection,
} from "@/features/dashboard";
import { CreateResumeButton } from "@/features/documents";
import { PageHeader } from "@/shared/components/common/PageHeader";

export default function DashboardPage() {
  return (
    <section id="dashboard" className="flex flex-col gap-12 ">
      <PageHeader
        title="My Dashboard"
        description="Welcome to your dashboard! Here you can manage your resumes, templates, and more."
        renderAction={() => <CreateResumeButton />}
      />
      <RecentDocumentsSection />
      <SuggestedTemplatesSection />
    </section>
  );
}
