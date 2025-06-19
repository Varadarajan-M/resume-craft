import { useResumeStore } from "@/features/resume-builder/store/resume";
import { Button } from "@/shared/components/ui/button";
import { Copy, Trash2 } from "lucide-react";
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
          <Button
            variant="ghost"
            size="icon"
            onClick={() => handleDuplicateAchievement(id)}
            title="Duplicate Achievement"
          >
            <Copy className="w-4 h-4" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => handleDeleteAchievement(id)}
            title="Delete Achievement"
            className="text-red-500 hover:text-red-700"
          >
            <Trash2 className="w-4 h-4" />
          </Button>
        </div>
      )}
    >
      <AchievementForm id={id} />
    </ResumeItem>
  );
};

export default AchievementItem;
