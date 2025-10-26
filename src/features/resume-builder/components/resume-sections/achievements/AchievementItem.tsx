import { useResumeStore } from "@/features/resume-builder/store/resume";
import { DeleteButton } from "@/shared/components/common/DeleteButton";
import { TooltipButton } from "@/shared/components/common/ToolTipButton";
import { Copy } from "lucide-react";
import ResumeItem from "../ResumeItem";
import AchievementForm from "./AchievementForm";

const AchievementItem = ({ id, index }: { id: string; index: number }) => {
  const handleDeleteAchievement = useResumeStore(
    (s) => s.deleteAchievementItem
  );
  const handleDuplicateAchievement = useResumeStore(
    (s) => s.duplicateAchievementItem
  );

  return (
    <ResumeItem
      label={`Achievement ${index + 1}`}
      labelClassName="text-sm font-semibold"
      itemId={id}
      className="flex flex-col gap-4"
      renderHeaderAction={() => (
        <div className="flex items-center gap-2">
          <TooltipButton
            icon={Copy}
            tooltipText="Duplicate Achievement"
            onClick={() => handleDuplicateAchievement(id)}
            variant="ghost"
          />
          <DeleteButton
            tooltipText="Delete Achievement"
            onDelete={() => handleDeleteAchievement(id)}
            variant="ghost"
          />
        </div>
      )}
    >
      <AchievementForm id={id} />
    </ResumeItem>
  );
};

export default AchievementItem;
