"use client";

import { RESUME_BUILDER_SECTIONS } from "@/features/resume-builder/lib/constants";
import { useResumeStore } from "@/features/resume-builder/store/resume";
import Tip from "@/shared/components/common/Tip";
import AddNewButton from "../AddNewItemButton";
import ResumeSection from "../ResumeSection";
import EducationItem from "./EducationItem";

const { icon: SectionIcon, ...rest } = RESUME_BUILDER_SECTIONS.education;

const sectionConfig = {
  ...rest,
  icon: <SectionIcon className="w-4 h-4" />,
};

const EducationSection = () => {
  const education = useResumeStore((s) => s.resume?.sections.education ?? []);
  const handleAddEducationItem = useResumeStore((s) => s.addEducationItem);

  return (
    <ResumeSection {...sectionConfig}>
      {education?.map(({ id }, index) => (
        <EducationItem key={id} id={id} index={index} />
      ))}

      <AddNewButton
        className="ml-1"
        onClick={handleAddEducationItem}
        label="Add Education"
      />

      <Tip>
        Include schools, degrees, and graduation dates. Highlight relevant
        coursework or honors.
      </Tip>
    </ResumeSection>
  );
};

export default EducationSection;
