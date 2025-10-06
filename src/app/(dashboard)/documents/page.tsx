import { CreateResumeButton, MyDocumentsSection } from "@/features/documents";
import { PageHeader } from "@/shared/components/common/PageHeader";
import { Loader2 } from "lucide-react";
import { Suspense } from "react";

const DocumentsPage = () => {
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
      <Suspense fallback={<Loader2 className="animate-spin mx-auto" />}>
        <MyDocumentsSection />
      </Suspense>
    </section>
  );
};

export default DocumentsPage;
