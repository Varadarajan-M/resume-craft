"use client";

import { RESUME_BUILDER_SECTIONS } from "@/features/resume-builder/lib/constants";
import Tip from "@/shared/components/common/Tip";
import ResumeSection from "../ResumeSection";
import ProfessionalSummaryEditor from "./ProfessionalSummaryEditor";

const { icon: SectionIcon, ...rest } = RESUME_BUILDER_SECTIONS.summary;

const sectionConfig = {
  ...rest,
  icon: <SectionIcon className="w-4 h-4" />,
};

const ProfessionalSummarySection = () => {
  return (
    <ResumeSection {...sectionConfig}>
      <ProfessionalSummaryEditor />
      <Tip>
        Write a concise summary of your professional experience, skills, and
        career goals. Aim for 2–3 sentences max. Keep it clean, keyword-rich,
        and focused.
      </Tip>
    </ResumeSection>
  );
};

export default ProfessionalSummarySection;
