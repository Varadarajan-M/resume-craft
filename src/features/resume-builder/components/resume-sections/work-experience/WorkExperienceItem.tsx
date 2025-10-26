import { useResumeStore } from "@/features/resume-builder/store/resume";
import { TooltipButton } from "@/shared/components/common/ToolTipButton";
import { Copy } from "lucide-react";
import ResumeItem from "../ResumeItem";
import { DeleteButton } from "@/shared/components/common/DeleteButton";
import WorkExperienceForm from "./WorkExperienceForm";

const WorkExperienceItem = ({ id, index }: { id: string; index: number }) => {
  const handleDeleteExperience = useResumeStore((s) => s.deleteExperienceItem);
  const handleDuplicateExperience = useResumeStore(
    (s) => s.duplicateExperienceItem
  );

  return (
    <ResumeItem
      label={`Experience ${index + 1}`}
      itemId={id}
      labelClassName="text-sm font-semibold"
      className="flex flex-col gap-4"
      renderHeaderAction={() => (
        <div className="flex items-center gap-2">
          <TooltipButton
            icon={Copy}
            tooltipText="Duplicate Experience"
            onClick={() => handleDuplicateExperience(id)}
            variant="ghost"
          />
          <DeleteButton
            onDelete={() => handleDeleteExperience(id)}
            tooltipText="Delete Experience"
            variant="ghost"
          />
        </div>
      )}
    >
      <WorkExperienceForm id={id} />
    </ResumeItem>
  );
};

export default WorkExperienceItem;
