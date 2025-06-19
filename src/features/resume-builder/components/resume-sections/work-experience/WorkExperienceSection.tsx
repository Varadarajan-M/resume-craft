"use client";

import { useResumeStore } from "@/features/resume-builder/store/resume";
import Tip from "@/shared/components/common/Tip";
import { Briefcase } from "lucide-react";
import AddNewButton from "../AddNewItemButton";
import ResumeSection from "../ResumeSection";
import WorkExperienceItem from "./WorkExperienceItem";

const ExperienceSection = () => {
  const experiences = useResumeStore(
    (s) => s.resume?.sections.experience ?? []
  );
  const handleAddExperienceItem = useResumeStore((s) => s.addExperienceItem);

  return (
    <ResumeSection
      icon={<Briefcase className="w-4 h-4" />}
      title="Work Experience"
      subtitle="Your relevant roles, starting from the most recent."
      defaultOpen
    >
      <div className="flex flex-col gap-6">
        {experiences.map((exp, index) => (
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
