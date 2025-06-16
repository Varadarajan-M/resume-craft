import { Button } from "@/shared/components/ui/button";
import { type ResumeAchievementItem } from "@/shared/types/resume";
import { Copy, Trash2 } from "lucide-react";
import { ReactNode } from "react";
import ResumeItem from "../ResumeItem";

interface AchievementItemProps {
  achievement: ResumeAchievementItem;
  index: number;
  onDeleteAchievement: (id: string) => void;
  onDuplicateAchievement: (
    id: string,
    index: number,
    achievement: ResumeAchievementItem
  ) => void;
  children: ReactNode;
}

const AchievementItemActions = ({
  index,
  onDeleteAchievement,
  onDuplicateAchievement,
  achievement,
}: Omit<AchievementItemProps, "children">) => (
  <div className="flex items-center gap-2">
    <Button
      variant="ghost"
      size="icon"
      onClick={() => onDuplicateAchievement(achievement.id, index, achievement)}
      title="Duplicate Achievement"
    >
      <Copy className="w-4 h-4" />
    </Button>
    <Button
      variant="ghost"
      size="icon"
      onClick={() => onDeleteAchievement(achievement.id)}
      title="Delete Achievement"
      className="text-red-500 hover:text-red-700"
    >
      <Trash2 className="w-4 h-4" />
    </Button>
  </div>
);

const AchievementItem = ({
  achievement,
  index,
  onDeleteAchievement,
  onDuplicateAchievement,
  children,
}: AchievementItemProps) => {
  return (
    <ResumeItem
      label={`Achievement ${index + 1}`}
      labelClassName="text-sm font-semibold"
      itemId={achievement.id}
      className="flex flex-col gap-4"
      renderHeaderAction={() => (
        <AchievementItemActions
          index={index}
          achievement={achievement}
          onDeleteAchievement={onDeleteAchievement}
          onDuplicateAchievement={onDuplicateAchievement}
        />
      )}
    >
      {children}
    </ResumeItem>
  );
};

export default AchievementItem;
