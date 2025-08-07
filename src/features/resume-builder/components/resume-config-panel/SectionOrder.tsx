import { Grip } from "lucide-react";
import { Reorder } from "motion/react";
import { RESUME_BUILDER_SECTIONS } from "../../lib/constants";
import { useResumeStore } from "../../store/resume";
import ResumeSection from "../resume-sections/ResumeSection";

const SectionOrder = () => {
  const mainColumnSectionOrder = useResumeStore(
    (state) => state.resume?.mainColumnSectionOrder
  );

  const getSectionTitle = (sectionId: string) => {
    const section =
      RESUME_BUILDER_SECTIONS[
        sectionId as keyof typeof RESUME_BUILDER_SECTIONS
      ];
    return section ? section.title : "Unknown Section";
  };

  const sideColumnSectionOrder = useResumeStore(
    (state) => state.resume?.sideColumnSectionOrder
  );
  return (
    <ResumeSection
      title="Section Order"
      subtitle="Drag and drop to reorder the sections of your resume."
      icon={<Grip className="h-4 w-4" />}
      defaultOpen
    >
      <div className="flex flex-col gap-2 border border-accent border-dashed rounded-md p-2 bg-neutral-200/35 dark:bg-neutral-800/35">
        <h3 className="text-sm font-medium underline p-2">
          Main Column Sections
        </h3>
        <Reorder.Group
          axis="y"
          values={mainColumnSectionOrder || []}
          onReorder={(newOrder) => {
            console.log("New Order:", newOrder);
          }}
          className="flex flex-col gap-3"
        >
          {mainColumnSectionOrder?.map((sectionId) => (
            <Reorder.Item
              key={sectionId}
              value={sectionId}
              className="flex items-center gap-2 p-3 rounded-md bg-background hover:bg-accent

                dark:hover:bg-accent/50 cursor-pointer"
            >
              <Grip className="h-3.5 w-3.5" />
              <span className="text-xs font-medium">
                {getSectionTitle(sectionId)}
              </span>
            </Reorder.Item>
          ))}
        </Reorder.Group>
      </div>
    </ResumeSection>
  );
};

export default SectionOrder;
