import FadeInChildren from "@/shared/components/animated/FadeIn";

import { EducationSection } from "./education";
import { PersonalInformationSection } from "./personal-info";
import { ProfessionalSummarySection } from "./professional-summary";
import { SkillsSection } from "./skills";
import { WorkExperienceSection } from "./work-experience";

import { cn } from "@/shared/lib/utils";
import { AchievementSection } from "./achievements";
import { CertificationSection } from "./certifications";
import { LanguageSection } from "./languages";
import { ProjectSection } from "./projects";

interface ResumeSectionsPanelProps {
  className?: string;
}

const ResumeSectionsPanel = ({ className }: ResumeSectionsPanelProps) => {
  return (
    <FadeInChildren
      as="aside"
      childrenAs="section"
      className={cn(
        "h-[calc(100dvh_-_56px)] border-r py-4 px-5 flex flex-col gap-4 overflow-y-auto",
        className
      )}
    >
      <PersonalInformationSection />
      <ProfessionalSummarySection />
      <WorkExperienceSection />
      <EducationSection />
      <SkillsSection />
      <ProjectSection />
      <CertificationSection />
      <AchievementSection />
      <LanguageSection />
    </FadeInChildren>
  );
};

export default ResumeSectionsPanel;
