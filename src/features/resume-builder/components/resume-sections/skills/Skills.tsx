import { Button } from "@/shared/components/ui/button";
import { Input } from "@/shared/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/shared/components/ui/select";
import { Skill, SkillCategory } from "@/shared/types/resume";
import { Trash2 } from "lucide-react";
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
    <SelectTrigger className="text-xs w-fit md:text-sm flex-1">
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

interface DeleteButtonProps {
  onDelete: () => void;
  ariaLabel: string;
  variant?: "ghost" | "destructive";
}

export const DeleteButton = ({
  onDelete,
  ariaLabel,
  variant = "ghost",
}: DeleteButtonProps) => (
  <Button
    variant={variant}
    size="icon"
    onClick={onDelete}
    aria-label={ariaLabel}
  >
    <Trash2 className="w-4 h-4 text-muted-foreground" />
  </Button>
);

interface SkillInputProps {
  skill: Skill;
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
  <div className="flex gap-4 items-center flex-wrap">
    <Input
      placeholder="Skill (e.g., React)"
      value={skill.name}
      onChange={(e) => onNameChange(e.target.value)}
      className="min-w-[200px] flex-1"
    />

    <SkillLevelSelect value={skill.level} onValueChange={onLevelChange} />

    <DeleteButton
      onDelete={onDelete}
      ariaLabel={`Delete ${skill.name || "skill"}`}
    />
  </div>
);

interface CategoryHeaderProps {
  name: string;
  onNameChange: (name: string) => void;
  onDelete: () => void;
}

export const CategoryHeader = ({
  name,
  onNameChange,
  onDelete,
}: CategoryHeaderProps) => (
  <div className="flex items-center gap-2 w-full">
    <Input
      className="flex-1"
      placeholder="e.g., Frontend, Soft Skills"
      value={name}
      onChange={(e) => onNameChange(e.target.value)}
    />
    <DeleteButton
      onDelete={onDelete}
      ariaLabel={`Delete ${name || "category"}`}
    />
  </div>
);

interface SkillsListProps {
  skills: Skill[];
  onSkillUpdate: (skillId: string, field: keyof Skill, value: string) => void;
  onSkillDelete: (skillId: string) => void;
  onAddSkill: () => void;
}

export const SkillsList = ({
  skills,
  onSkillUpdate,
  onSkillDelete,
  onAddSkill,
}: SkillsListProps) => (
  <div className="flex flex-col gap-8 md:gap-4">
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
  category: SkillCategory;
  onCategoryUpdate: (name: string) => void;
  onCategoryDelete: () => void;
  onSkillUpdate: (skillId: string, field: keyof Skill, value: string) => void;
  onSkillDelete: (skillId: string) => void;
  onAddSkill: () => void;
}

export const SkillCategoryItem = ({
  category,
  onCategoryUpdate,
  onCategoryDelete,
  onSkillUpdate,
  onSkillDelete,
  onAddSkill,
}: SkillCategoryItemProps) => (
  <div className="border border-primary/10 rounded-lg p-4">
    <div className="flex flex-col gap-4">
      <ResumeItem itemId={category.id} label="Category">
        <CategoryHeader
          name={category.name}
          onNameChange={onCategoryUpdate}
          onDelete={onCategoryDelete}
        />
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
