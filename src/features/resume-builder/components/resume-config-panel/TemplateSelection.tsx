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
      <div className="grid gap-6 grid-cols-[repeat(auto-fill,minmax(150px,1fr))]">
        {templates?.map((template) => (
          <div
            tabIndex={0}
            role="button"
            onClick={() => handleTemplateClick(template)}
            key={template.id}
            className={cn(
              "flex flex-col items-center max-w-fit pb-3  hover:border-2 dark:hover:border-foreground  group duration-200 cursor-pointer",
              {
                "border-2 border-accent-foreground":
                  resume?.templateId === template.id,
              }
            )}
          >
            <Image
              src={template.image || "/placeholder.jpg"}
              alt={template.name}
              width={250}
              height={150}
              priority
              className="w-50 h-50 rounded-lg object-contain"
            />
            <h4 className="text-xs font-semibold underline text-foreground -mt-1">
              {template.name}
            </h4>
          </div>
        ))}
      </div>
    </ResumeSection>
  );
};

export default TemplateSelection;
