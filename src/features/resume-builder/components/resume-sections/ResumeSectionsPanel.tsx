import { Award } from "lucide-react";

import FadeInChildren from "@/shared/components/animated/FadeIn";
import ResumeSection from "./ResumeSection";

import { EducationSection } from "./education";
import { PersonalInformationSection } from "./personal-info";
import { ProfessionalSummarySection } from "./professional-summary";
import { SkillsSection } from "./skills";
import { WorkExperienceSection } from "./work-experience";

import { cn } from "@/shared/lib/utils";
import { LanguageSection } from "./languages";

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

      <ResumeSection
        icon={<Award className="w-4 h-4" />}
        title="Achievements"
        subtitle="Notable awards and recognitions."
      >
        <div className="flex flex-col gap-2">
          <p className="text-sm text-muted-foreground">
            Add any awards, certifications, or recognitions.
          </p>
          <p className="text-xs text-muted-foreground">
            Great way to stand out from the crowd.
          </p>
        </div>
      </ResumeSection>

      <LanguageSection />
    </FadeInChildren>
  );
};

export default ResumeSectionsPanel;
