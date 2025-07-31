"use client";

import { RESUME_BUILDER_SECTIONS } from "@/features/resume-builder/lib/constants";
import { useResumeStore } from "@/features/resume-builder/store/resume";
import Tip from "@/shared/components/common/Tip";
import AddNewButton from "../AddNewItemButton";
import ResumeSection from "../ResumeSection";
import WorkExperienceItem from "./WorkExperienceItem";

const { icon: SectionIcon, ...rest } = RESUME_BUILDER_SECTIONS.experience;

const sectionConfig = {
  ...rest,
  icon: <SectionIcon className="w-4 h-4" />,
};

const ExperienceSection = () => {
  const experiences = useResumeStore((s) => s.resume?.sections?.experience);
  const handleAddExperienceItem = useResumeStore((s) => s.addExperienceItem);

  return (
    <ResumeSection {...sectionConfig}>
      <div className="flex flex-col gap-6">
        {experiences?.map((exp, index) => (
          <WorkExperienceItem key={exp.id} id={exp.id} index={index} />
        ))}

        <AddNewButton
          className="ml-1.5"
          onClick={handleAddExperienceItem}
          label="Add Experience"
        />

        <Tip>
          Focus on results. Start bullet points with action verbs and include
          metrics where possible.
        </Tip>
      </div>
    </ResumeSection>
  );
};

export default ExperienceSection;
