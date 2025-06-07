import { Button } from "@/components/ui/button";
import {
  PageHeader,
  RecentDocumentsSection,
  SuggestedTemplatesSection,
} from "@/features/dashboard-page/components";
import { Plus } from "lucide-react";
import Link from "next/link";

export default function DashboardPage() {
  return (
    <section id="dashboard" className="flex flex-col gap-12 ">
      <PageHeader
        title="My Dashboard"
        description="Welcome to your dashboard! Here you can manage your resumes, templates, and more."
        renderAction={() => (
          <Button
            variant={"default"}
            size={"sm"}
            className="flex items-center gap-1"
          >
            <Plus className="h-3 w-3" />
            <Link href="/builder" className="text-xs font-medium">
              Create New Resume
            </Link>
          </Button>
        )}
      />
      <RecentDocumentsSection />
      <SuggestedTemplatesSection />
    </section>
  );
}
