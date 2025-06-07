import { Button } from "@/components/ui/button";
import PageHeader from "@/features/dashboard-page/components/PageHeader";
import { DocumentsSection } from "@/features/documents-page/components";
import { Plus } from "lucide-react";
import Link from "next/link";

const DocumentsPage = () => {
  return (
    <section id="documents" className="flex flex-col gap-12">
      <PageHeader
        title="My Documents"
        description="Manage your resumes, cover letters, and other documents here."
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
      <DocumentsSection />
    </section>
  );
};

export default DocumentsPage;
