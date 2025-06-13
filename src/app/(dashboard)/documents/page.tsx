import { Plus } from "lucide-react";
import Link from "next/link";

import { MyDocumentsSection } from "@/features/documents";
import { PageHeader } from "@/shared/components/common/PageHeader";
import { Button } from "@/shared/components/ui/button";

const DocumentsPage = () => {
  return (
    <section
      id="documents"
      className="flex flex-col gap-12  transition-all duration-200"
    >
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
      <MyDocumentsSection />
    </section>
  );
};

export default DocumentsPage;
