import { AllTemplatesSection } from "@/features/templates";
import { PageHeader } from "@/shared/components/common/PageHeader";

const TemplatesPage = () => {
  return (
    <section
      id="templates"
      className="flex flex-col gap-12 transition-all duration-200"
    >
      <PageHeader
        title="Templates"
        description="Browse and select from a variety of resume templates to kickstart your job application process."
      />
      <AllTemplatesSection />
    </section>
  );
};

export default TemplatesPage;
