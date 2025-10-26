"use client";

import { AlertCircle } from "lucide-react";
import { useMemo } from "react";

import Tip from "@/shared/components/common/Tip";
import { useResumeStore } from "@/features/resume-builder/store/resume";
import AddNewButton from "../AddNewItemButton";
import ResumeSection from "../ResumeSection";
import { SkillCategoryItem } from "./Skills";
import { Alert, AlertDescription } from "@/shared/components/ui/alert";

import { RESUME_BUILDER_SECTIONS } from "@/features/resume-builder/lib/constants";

const { icon: SectionIcon, ...rest } = RESUME_BUILDER_SECTIONS.skills;

const sectionConfig = {
  ...rest,
  icon: <SectionIcon className="w-4 h-4" />,
};

const SkillsSection = () => {
  const categories = useResumeStore(
    (s) => s.resume?.sections.skills?.categories
  );
  const addCategory = useResumeStore((s) => s.addCategory);
  const updateCategory = useResumeStore((s) => s.updateCategory);
  const deleteCategory = useResumeStore((s) => s.deleteCategory);
  const duplicateCategory = useResumeStore((s) => s.duplicateCategory);
  const addSkill = useResumeStore((s) => s.addSkill);
  const updateSkill = useResumeStore((s) => s.updateSkill);
  const deleteSkill = useResumeStore((s) => s.deleteSkill);

  const hasEmptyCategories = useMemo(
    () => categories?.some((c) => !c.name.trim()),
    [categories]
  );
  const hasEmptySkills = useMemo(
    () => categories?.some((c) => c.skills.some((s) => !s.name.trim())),
    [categories]
  );
  const hasValidationErrors = hasEmptyCategories || hasEmptySkills;

  return (
    <ResumeSection {...sectionConfig}>
      <div className="flex flex-col gap-6">
        {hasValidationErrors && (
          <Alert>
            <AlertCircle className="h-4 w-4" />
            <AlertDescription className="text-sm">
              Please fill in all category names and skill names before saving.
            </AlertDescription>
          </Alert>
        )}

        {categories?.map((category, index) => (
          <SkillCategoryItem
            key={category.id}
            category={category}
            index={index}
            onCategoryUpdate={(name) => updateCategory(category.id, name)}
            onCategoryDelete={() => deleteCategory(category.id)}
            onCategoryDuplicate={() => duplicateCategory(category.id)}
            onSkillUpdate={(skillId, field, value) =>
              updateSkill(category.id, skillId, field, value)
            }
            onSkillDelete={(skillId) => deleteSkill(category.id, skillId)}
            onAddSkill={() => addSkill(category.id)}
          />
        ))}

        <AddNewButton onClick={addCategory} label="Add Category" />
      </div>
      <Tip>
        Group your skills into categories like languages, frameworks, tools, or
        soft skills. You can optionally assign proficiency levels.
        <br />
        <br />
        Focus on skills most relevant to your target role. Quality over quantity
        makes a stronger impression.
      </Tip>
    </ResumeSection>
  );
};
export default SkillsSection;
