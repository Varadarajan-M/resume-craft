import { Navbar, ResumeSectionsPanel } from "@/features/resume-builder";

const ResumeBuilderPage = () => {
  return (
    <section
      id="builder"
      className="bg-background w-full h-dvh flex flex-col transition-all duration-200"
    >
      <Navbar />
      <div className="flex-1 flex gap-4">
        <ResumeSectionsPanel className="basis-full md:basis-1/5" />
      </div>
    </section>
  );
};

export default ResumeBuilderPage;
