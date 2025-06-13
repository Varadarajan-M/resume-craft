import FadeInChildren from "@/shared/components/animated/FadeIn";
import { cn } from "@/shared/lib/utils";
import { Award, Book, Briefcase, Globe, Star, User } from "lucide-react";
import ResumeSection from "./ResumeSection";

interface ResumeSectionsPanelProps {
  className?: string;
}

const ResumeSectionsPanel = ({ className }: ResumeSectionsPanelProps) => {
  return (
    <FadeInChildren
      as="aside"
      childrenAs="section"
      className={cn("h-full border-r p-4 flex flex-col gap-4", className)}
    >
      <ResumeSection
        icon={<User className="w-4 h-4" />}
        title="Personal Information"
        subtitle="Basic contact details and personal info."
        defaultOpen
      >
        <div className="flex flex-col gap-2">
          <p className="text-sm text-muted-foreground">
            Add your name, email, phone number, and location.
          </p>
          <p className="text-xs text-muted-foreground">
            These details appear at the top of your resume.
          </p>
          <div className="rounded-md bg-muted p-2 text-xs text-muted-foreground border">
            💡 Tip: Use a professional email address and include your LinkedIn
            or portfolio link.
          </div>
        </div>
      </ResumeSection>

      <ResumeSection
        icon={<Briefcase className="w-4 h-4" />}
        title="Work Experience"
        subtitle="Your professional background."
        defaultOpen
      >
        <div className="flex flex-col gap-2">
          <p className="text-sm text-muted-foreground">
            Add jobs you've held, responsibilities, and accomplishments.
          </p>
          <p className="text-xs text-muted-foreground">
            List them in reverse chronological order for best results.
          </p>
        </div>
      </ResumeSection>

      <ResumeSection
        icon={<Book className="w-4 h-4" />}
        title="Education"
        subtitle="Your academic qualifications."
      >
        <div className="flex flex-col gap-2">
          <p className="text-sm text-muted-foreground">
            Include schools, degrees, and graduation dates.
          </p>
          <p className="text-xs text-muted-foreground">
            Highlight relevant coursework or honors if applicable.
          </p>
        </div>
      </ResumeSection>

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
