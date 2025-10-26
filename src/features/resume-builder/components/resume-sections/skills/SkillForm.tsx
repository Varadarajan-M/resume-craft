"use client";

import { useResumeStore } from "@/features/resume-builder/store/resume";
import { Input } from "@/shared/components/ui/input";
import ResumeItem from "../ResumeItem";
import { DeleteButton, SkillLevelSelect } from "./Skills";

interface SkillFormProps {
  categoryId: string;
  skillId: string;
}

const SkillForm = ({ categoryId, skillId }: SkillFormProps) => {
  const skill = useResumeStore((s) =>
    s.resume?.sections.skills?.categories
      ?.find((cat) => cat.id === categoryId)
      ?.skills?.find((sk) => sk.id === skillId)
  );
  const updateSkill = useResumeStore((s) => s.updateSkill);
  const deleteSkill = useResumeStore((s) => s.deleteSkill);

  if (!skill) return null;

  return (
    <div className="flex flex-col gap-2">
      <ResumeItem label="Skill Name" itemId={`${skillId}-name`} className="p-0">
        <Input
          id={`${skillId}-name`}
          value={skill.name}
          onChange={(e) =>
            updateSkill(categoryId, skillId, "name" , e.target.value)
          }
          placeholder="e.g., React"
        />
      </ResumeItem>

      <ResumeItem label="Proficiency" itemId={`${skillId}-level`} className="p-0">
        <SkillLevelSelect
          value={skill.level || ""}
          onValueChange={(level) =>
            updateSkill(categoryId, skillId, "level", level)
          }
        />
      </ResumeItem>

      <DeleteButton
        onDelete={() => deleteSkill(categoryId, skillId)}
        ariaLabel={`Delete ${skill.name || "skill"}`}
        tooltipText="Delete Skill"
      />
    </div>
  );
};

export default SkillForm;
