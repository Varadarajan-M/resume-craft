import PageHeader from "@/features/dashboard/components/page-header";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import Link from "next/link";
import React from "react";

const DocumentsPage = () => {
  return (
    <section id="documents">
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

    </section>
  );
};

export default DocumentsPage;
