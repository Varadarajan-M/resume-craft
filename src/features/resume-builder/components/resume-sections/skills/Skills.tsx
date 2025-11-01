import { DeleteButton } from "@/shared/components/common/DeleteButton";
import { TooltipButton } from "@/shared/components/common/ToolTipButton";
import { Input } from "@/shared/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/shared/components/ui/select";
import { ResumeSkill, ResumeSkillCategoryItem } from "@/shared/types/resume";
import { Copy } from "lucide-react";
import AddNewButton from "../AddNewItemButton";
import ResumeItem from "../ResumeItem";

const SKILL_LEVELS = [
  "Beginner",
  "Intermediate",
  "Advanced",
  "Expert",
] as const;

interface SkillLevelSelectProps {
  value?: string;
  onValueChange: (value: string) => void;
  placeholder?: string;
}

export const SkillLevelSelect = ({
  value = "",
  onValueChange,
  placeholder = "Level",
}: SkillLevelSelectProps) => (
  <Select value={value} onValueChange={onValueChange}>
    <SelectTrigger className="text-xs sm:max-w-[100px] 	md:text-sm">
      <SelectValue placeholder={placeholder} />
    </SelectTrigger>
    <SelectContent>
      {SKILL_LEVELS.map((level) => (
        <SelectItem key={level} value={level} className="text-xs md:text-sm">
          {level}
        </SelectItem>
      ))}
    </SelectContent>
  </Select>
);

interface CategoryHeaderProps {
  name: string;
  onNameChange: (name: string) => void;
}

export const CategoryHeader = ({ name, onNameChange }: CategoryHeaderProps) => (
  <Input
    className="flex-1"
    placeholder="e.g., Frontend, Soft Skills"
    value={name}
    onChange={(e) => onNameChange(e.target.value)}
  />
);

interface SkillInputProps {
  skill: ResumeSkill;
  onNameChange: (name: string) => void;
  onLevelChange: (level: string) => void;
  onDelete: () => void;
}

export const SkillInput = ({
  skill,
  onNameChange,
  onLevelChange,
  onDelete,
}: SkillInputProps) => (
  <div className="grid grid-cols-[1fr_auto] md:grid-cols-[1fr_auto_auto] items-center gap-2">
    <Input
      placeholder="Skill (e.g., React)"
      value={skill.name}
      onChange={(e) => onNameChange(e.target.value)}
    />

    <div className="flex items-center gap-3">
      <div className="min-w-[100px]">
        <SkillLevelSelect value={skill.level} onValueChange={onLevelChange} />
      </div>

      <DeleteButton
        onDelete={onDelete}
        ariaLabel={`Delete ${skill.name || "skill"}`}
        tooltipText="Delete Skill"
      />
    </div>
  </div>
);

interface SkillsListProps {
  skills: ResumeSkill[];
  onSkillUpdate: (
    skillId: string,
    field: keyof ResumeSkill,
    value: string
  ) => void;
  onSkillDelete: (skillId: string) => void;
  onAddSkill: () => void;
}

export const SkillsList = ({
  skills,
  onSkillUpdate,
  onSkillDelete,
  onAddSkill,
}: SkillsListProps) => (
  <div className="flex flex-col gap-4">
    {skills.map((skill) => (
      <SkillInput
        key={skill.id}
        skill={skill}
        onNameChange={(name) => onSkillUpdate(skill.id, "name", name)}
        onLevelChange={(level) => onSkillUpdate(skill.id, "level", level)}
        onDelete={() => onSkillDelete(skill.id)}
      />
    ))}

    <AddNewButton onClick={onAddSkill} label="Add Skill" />
  </div>
);

interface SkillCategoryItemProps {
  category: ResumeSkillCategoryItem;
  index: number;
  onCategoryUpdate: (name: string) => void;
  onCategoryDelete: () => void;
  onCategoryDuplicate: () => void;
  onSkillUpdate: (
    skillId: string,
    field: keyof ResumeSkill,
    value: string
  ) => void;
  onSkillDelete: (skillId: string) => void;
  onAddSkill: () => void;
}

export const SkillCategoryItem = ({
  category,
  index,
  onCategoryUpdate,
  onCategoryDelete,
  onCategoryDuplicate,
  onSkillUpdate,
  onSkillDelete,
  onAddSkill,
}: SkillCategoryItemProps) => (
  <div className="border border-primary/10 rounded-lg p-3">
    <div className="flex flex-col gap-4">
      <ResumeItem
        itemId={category.id}
        label={`Category ${index + 1}`}
        labelClassName="mb-3 flex items-center m-0 p-0"
        renderHeaderAction={() => (
          <div className="flex items-center gap-1">
            <TooltipButton
              icon={Copy}
              tooltipText="Duplicate Category"
              onClick={onCategoryDuplicate}
              variant="ghost"
            />
            <DeleteButton
              onDelete={onCategoryDelete}
              ariaLabel={`Delete ${category.name || "category"}`}
              tooltipText="Delete Category"
            />
          </div>
        )}
      >
        <CategoryHeader name={category.name} onNameChange={onCategoryUpdate} />
      </ResumeItem>

      <ResumeItem
        itemId={`${category.id}-skills`}
        label={`Skills in ${category.name || "this category"}`}
        className="flex flex-col gap-4"
      >
        <SkillsList
          skills={category.skills}
          onSkillUpdate={onSkillUpdate}
          onSkillDelete={onSkillDelete}
          onAddSkill={onAddSkill}
        />
      </ResumeItem>
    </div>
  </div>
);
