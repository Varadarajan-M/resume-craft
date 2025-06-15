"use client";

import Tip from "@/shared/components/common/Tip";
import { ResumeExperienceItem } from "@/shared/types/resume";
import { Briefcase } from "lucide-react";
import { useState } from "react";
import AddNewButton from "../AddNewItemButton";
import ResumeSection from "../ResumeSection";
import WorkExperienceForm from "./WorkExperienceForm";
import WorkExperienceItem from "./WorkExperienceItem";

const createNewExperienceItem = (): ResumeExperienceItem => ({
  id: `experience-${Date.now()}`,
  title: "",
  company: "",
  timePeriod: "",
  description: "",
});

const ExperienceSection = () => {
  const [experiences, setExperiences] = useState<ResumeExperienceItem[]>([
    createNewExperienceItem(),
  ]);

  const handleAddExperienceClick = () => {
    const newId = `experience-${Date.now()}`;
    setExperiences((prev) => [
      ...prev,
      { ...createNewExperienceItem(), id: newId },
    ]);
  };

  const handleExperienceItemChange = (
    id: string,
    key: keyof ResumeExperienceItem,
    value: string
  ) =>
    setExperiences((prev) =>
      prev.map((experience) =>
        experience.id === id ? { ...experience, [key]: value } : experience
      )
    );
  const handleDeleteExperience = (id: string) =>
    setExperiences((prev) => prev.filter((experience) => experience.id !== id));

  const handleDuplicateExperience = (
    id: string,
    index: number,
    experience: ResumeExperienceItem
  ) => {
    const newExperience = {
      ...experience,
      title: experience.title + " (Copy)",
      id: `experience-${Date.now()}`,
    };
    setExperiences((prev) => {
      const updatedExperiences = [...prev];
      updatedExperiences.splice(index + 1, 0, newExperience);
      return updatedExperiences;
    });
  };

  return (
    <ResumeSection
      icon={<Briefcase className="w-4 h-4" />}
      title="Work Experience"
      subtitle="Your relevant roles, starting from the most recent."
      defaultOpen
    >
      <div className="flex flex-col gap-6">
        {experiences.map((experience, index) => (
          <WorkExperienceItem
            key={experience.id}
            experience={experience}
            index={index}
            onDeleteExperience={handleDeleteExperience}
            onDuplicateExperience={handleDuplicateExperience}
          >
            <WorkExperienceForm
              key={experience.id}
              experience={experience}
              onExperienceChange={(key, value) =>
                handleExperienceItemChange(experience.id, key, value)
              }
            />
          </WorkExperienceItem>
        ))}

        <AddNewButton
          className="ml-1.5"
          onClick={handleAddExperienceClick}
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
