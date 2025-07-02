import { Navbar, ResumeSectionsPanel } from "@/features/resume-builder";
import { ResumePreviewPanel } from "@/features/resume-builder/components/resume-preview";

const ResumeBuilderPage = () => {
  return (
    <section
      id="builder"
      className="bg-background w-full h-dvh flex flex-col transition-all duration-200 overflow-hidden"
    >
      <Navbar />
      <div className="flex-1 flex gap-4 items-center-safe">
        <ResumeSectionsPanel className="basis-full lg:basis-[28%]" />

        <ResumePreviewPanel className="flex-1 " />
      </div>
    </section>
  );
};

export default ResumeBuilderPage;
