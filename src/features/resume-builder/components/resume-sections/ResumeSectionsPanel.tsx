import { Award, Globe, Star } from "lucide-react";

import FadeInChildren from "@/shared/components/animated/FadeIn";
import ResumeSection from "./ResumeSection";

import { PersonalInformationSection } from "./personal-info";
import { ProfessionalSummarySection } from "./professional-summary";

import { cn } from "@/shared/lib/utils";
import { EducationSection } from "./education";
import { WorkExperienceSection } from "./work-experience";

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

      <ResumeSection
        icon={<Globe className="w-4 h-4" />}
        title="Languages"
        subtitle="Languages you can speak or write."
      >
        <div className="flex flex-col gap-2">
          <p className="text-sm text-muted-foreground">
            Mention proficiency levels for each language.
          </p>
          <p className="text-xs text-muted-foreground">
            Especially useful for international roles.
          </p>
        </div>
      </ResumeSection>

      <ResumeSection
        icon={<Star className="w-4 h-4" />}
        title="Skills"
        subtitle="Your core competencies."
      >
        <div className="flex flex-col gap-2">
          <p className="text-sm text-muted-foreground">
            Add technical or soft skills relevant to your role.
          </p>
          <p className="text-xs text-muted-foreground">
            Keep them concise and grouped where possible.
          </p>
        </div>
      </ResumeSection>
    </FadeInChildren>
  );
};

export default ResumeSectionsPanel;
