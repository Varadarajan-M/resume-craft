"use client";

import { useResumeStore } from "@/features/resume-builder/store/resume";
import Tip from "@/shared/components/common/Tip";
import { Book } from "lucide-react";
import AddNewButton from "../AddNewItemButton";
import ResumeSection from "../ResumeSection";
import EducationItem from "./EducationItem";

const EducationSection = () => {
  const education = useResumeStore((s) => s.resume?.sections.education ?? []);
  const handleAddEducationItem = useResumeStore((s) => s.addEducationItem);

  return (
    <ResumeSection
      icon={<Book className="w-4 h-4" />}
      title="Education"
      subtitle="Your academic qualifications."
    >
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
