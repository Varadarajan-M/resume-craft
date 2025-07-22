"use client";

import { AlertCircle } from "lucide-react";
import { useMemo } from "react";

import Tip from "@/shared/components/common/Tip";
import { Alert, AlertDescription } from "@/shared/components/ui/alert";
import AddNewButton from "../AddNewItemButton";
import ResumeSection from "../ResumeSection";
import { SkillCategoryItem } from "./Skills";
import { useSkillsReducer } from "./store";

import { RESUME_BUILDER_SECTIONS } from "@/features/resume-builder/lib/constants";

const { icon: SectionIcon, ...rest } = RESUME_BUILDER_SECTIONS.skills;

const sectionConfig = {
  ...rest,
  icon: <SectionIcon className="w-4 h-4" />,
};

const SkillsSection = () => {
  const { state, actions } = useSkillsReducer();

  const hasEmptyCategories = useMemo(
    () => state.categories.some((cat) => !cat.name.trim()),
    [state.categories]
  );

  const hasEmptySkills = useMemo(
    () =>
      state.categories.some((cat) =>
        cat.skills.some((skill) => !skill.name.trim())
      ),
    [state.categories]
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

        {state.categories.map((category) => (
          <SkillCategoryItem
            key={category.id}
            category={category}
            onCategoryUpdate={(name) =>
              actions.updateCategory(category.id, name)
            }
            onCategoryDelete={() => actions.deleteCategory(category.id)}
            onSkillUpdate={(skillId, field, value) =>
              actions.updateSkill(category.id, skillId, field, value)
            }
            onSkillDelete={(skillId) =>
              actions.deleteSkill(category.id, skillId)
            }
            onAddSkill={() => actions.addSkill(category.id)}
          />
        ))}

        <AddNewButton onClick={actions.addCategory} label="Add Category" />
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
