import { useTemplatesQuery } from "@/features/templates";
import { cn } from "@/shared/lib/utils";
import { DocumentTemplate } from "@/shared/types/document";
import { Resume } from "@/shared/types/resume";
import { LayoutTemplate } from "lucide-react";
import Image from "next/image";
import { useResumeStore } from "../../store/resume";
import ResumeSection from "../resume-sections/ResumeSection";

const TemplateSelection = () => {
  const { data: templates } = useTemplatesQuery();
  const resume = useResumeStore((state) => state.resume);
  const setResume = useResumeStore((state) => state.setResume);

  const handleTemplateClick = (template: DocumentTemplate) => {
    const sectionIdsFromTemplate = new Set(template?.mainColumnSectionOrder);

    /*  
    Resume.      Template       Result
    A            B              B
    B            A              A
    C.           D.             D
    D                           C
    E                           E
    */

    const newResume = {
      ...resume,
      category: "resume",
      templateId: template?.id,
      image: template?.image,
      mainColumnSectionOrder: template?.mainColumnSectionOrder,
    } as Resume;
    setResume(newResume);
  };

  return (
    <ResumeSection
      title="Template Selection"
      subtitle="Choose a template to customize your resume layout and design."
      icon={<LayoutTemplate className="h-4 w-4" />}
      defaultOpen
    >
      <div className="grid gap-4 grid-cols-[repeat(auto-fill,minmax(150px,1fr))]">
        {templates?.map((template) => (
          <div
            tabIndex={0}
            role="button"
            onClick={() => handleTemplateClick(template)}
            key={template.id}
            className={cn(
              "flex flex-col relative  overflow-hidden gap-2 items-center max-w-fit p-3 rounded-md hover:border-2 dark:hover:border-foreground group duration-200 cursor-pointer",
              {
                "border-2 border-foreground/60":
                  resume?.templateId === template.id,
              }
            )}
          >
            <div className="relative">
              <Image
                src={template.image || "/placeholder.jpg"}
                alt={template.name}
                width={250}
                height={150}
                priority
                className="w-50 h-50 object-cover"
              />
              {/* Light mask overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-background/60 via-transparent to-transparent" />
            </div>
            <h4 className="text-xs absolute bottom-4 text-center left-1/2 -translate-x-1/2 font-semibold underline text-foreground drop-shadow-md z-10">
              {template.name}
            </h4>
          </div>
        ))}
      </div>
    </ResumeSection>
  );
};

export default TemplateSelection;
