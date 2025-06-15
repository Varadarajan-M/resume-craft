"use client";

import { Book } from "lucide-react";
import { useState } from "react";

import Tip from "@/shared/components/common/Tip";
import ResumeSection from "../ResumeSection";

import { type ResumeEducationItem } from "@/shared/types/resume";
import AddNewButton from "../AddNewItemButton";
import EducationForm from "./EducationForm";
import EducationItem from "./EducationItem";

const createNeEducationItem = (): ResumeEducationItem => ({
  id: "edu-" + Math.random().toString(36).substr(2, 9),
  institution: "",
  fieldOfStudy: "",
  timePeriod: "",
  gpa: "",
  description: "",
});

const EducationSection = () => {
  const [educations, setEducations] = useState<ResumeEducationItem[]>([
    createNeEducationItem(),
    createNeEducationItem(),
  ]);

  const handleAddEducationClick = () => {
    setEducations((prev) => [...prev, createNeEducationItem()]);
  };

  const handleEducationItemChange = (
    id: string,
    key: keyof ResumeEducationItem,
    value: string
  ) =>
    setEducations((prev) =>
      prev.map((education) =>
        education.id === id ? { ...education, [key]: value } : education
      )
    );

  const handleDeleteEducation = (id: string) =>
    setEducations((prev) => prev.filter((education) => education?.id !== id));

  const handleDuplicateEducation = (
    id: string,
    index: number,
    education: ResumeEducationItem
  ) => {
    const newEducation = {
      ...education,
      institution: education.institution + " (Copy)",
      id: "edu-" + Math.random().toString(36).substr(2, 9),
    };
    setEducations((prev) => {
      const updatedEducations = [...prev];
      updatedEducations.splice(index + 1, 0, newEducation);
      return updatedEducations;
    });
  };

  return (
    <ResumeSection
      icon={<Book className="w-4 h-4" />}
      title="Education"
      subtitle="Your academic qualifications."
    >
      {educations.map((education, index) => (
        <EducationItem
          key={education.id}
          education={education}
          index={index}
          onDeleteEducation={handleDeleteEducation}
          onDuplicateEducation={handleDuplicateEducation}
        >
          <EducationForm
            key={education.id}
            education={education}
            onEducationChange={(key, value) =>
              handleEducationItemChange(education?.id, key, value)
            }
          />
        </EducationItem>
      ))}

      <AddNewButton
        className="ml-1"
        onClick={handleAddEducationClick}
        label={"Add Education"}
      />

      <Tip>
        Include schools, degrees, and graduation dates. Highlight relevant
        coursework or honors if applicable.
      </Tip>
    </ResumeSection>
  );
};
export default EducationSection;
