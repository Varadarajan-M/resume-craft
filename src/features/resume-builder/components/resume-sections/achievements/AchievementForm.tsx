import { Input } from "@/shared/components/ui/input";
import RichTextEditor from "@/shared/components/ui/rich-text-editor";
import { type ResumeAchievementItem } from "@/shared/types/resume";
import ResumeItem from "../ResumeItem";

interface AchievementFormProps {
  achievement: ResumeAchievementItem;
  onAchievementChange: (
    key: keyof ResumeAchievementItem,
    value: string
  ) => void;
}

const AchievementForm = ({
  achievement,
  onAchievementChange,
}: AchievementFormProps) => {
  return (
    <div className="flex flex-col gap-4">
      <ResumeItem
        label="Title"
        itemId={`${achievement.id}-title`}
        className="p-0"
      >
        <Input
          id={`${achievement.id}-title`}
          value={achievement.title}
          onChange={(e) => onAchievementChange("title", e.target.value)}
          placeholder="e.g., Winner - Hackathon 2024"
        />
      </ResumeItem>

      <ResumeItem
        label="Description"
        itemId={`${achievement.id}-description`}
        className="p-0"
      >
        <RichTextEditor
          id={`${achievement.id}-description`}
          content={achievement.description}
          onChange={(v) => onAchievementChange("description", v)}
          placeholder="Explain the context, what you did, and the result. e.g., Built an AI-powered resume parser that ranked 1st out of 100 teams."
        />
      </ResumeItem>
    </div>
  );
};

export default AchievementForm;
