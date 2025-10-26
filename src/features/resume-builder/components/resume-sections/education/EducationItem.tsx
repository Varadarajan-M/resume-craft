import { useResumeStore } from "@/features/resume-builder/store/resume";
import { TooltipButton } from "@/shared/components/common/ToolTipButton";
import { Copy } from "lucide-react";
import ResumeItem from "../ResumeItem";
import { DeleteButton } from "@/shared/components/common/DeleteButton";
import EducationForm from "./EducationForm";

const EducationItem = ({ id, index }: { id: string; index: number }) => {
  const removeEducation = useResumeStore((s) => s.deleteEducationItem);
  const duplicateEducation = useResumeStore((s) => s.duplicateEducationItem);

  return (
    <ResumeItem
      label={`Education ${index + 1}`}
      itemId={id}
      labelClassName="text-sm font-semibold"
      className="flex flex-col gap-4"
      renderHeaderAction={() => (
        <div className="flex items-center gap-2">
          <TooltipButton
            icon={Copy}
            tooltipText="Duplicate Education"
            onClick={() => duplicateEducation(id)}
            variant="ghost"
          />
          <DeleteButton
            onDelete={() => removeEducation(id)}
            tooltipText="Delete Education"
            variant="ghost"
          />
        </div>
      )}
    >
      <EducationForm id={id} />
    </ResumeItem>
  );
};

export default EducationItem;
