import { memo } from "react";
import ResumeItem from "../ResumeItem";
import SkillForm from "./SkillForm";

interface SkillItemProps {
  categoryId: string;
  skillId: string;
  index: number;
}

const SkillItem = memo(({ categoryId, skillId, index }: SkillItemProps) => {
  return (
    <ResumeItem
      label={`Skill ${index + 1}`}
      labelClassName="text-sm font-semibold"
      itemId={skillId}
      className="flex flex-col gap-2"
    >
      <SkillForm categoryId={categoryId} skillId={skillId} />
    </ResumeItem>
  );
});

SkillItem.displayName = "SkillItem";

export default SkillItem;
