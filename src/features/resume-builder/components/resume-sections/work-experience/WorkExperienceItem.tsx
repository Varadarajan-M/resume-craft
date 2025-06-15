import { Button } from "@/shared/components/ui/button";
import { ResumeExperienceItem } from "@/shared/types/resume";
import { Copy, Trash2 } from "lucide-react";
import { ReactNode } from "react";
import ResumeItem from "../ResumeItem";

interface WorkExperienceItemProps {
  experience: ResumeExperienceItem;
  index: number;
  onDeleteExperience: (id: string) => void;
  onDuplicateExperience: (
    id: string,
    index: number,
    experience: ResumeExperienceItem
  ) => void;
  children: ReactNode;
}

const EducationItemActions = ({
  index,
  onDeleteExperience,
  onDuplicateExperience,
  experience,
}: Omit<WorkExperienceItemProps, "children">) => (
  <div className="flex items-center gap-2">
    <Button
      variant="ghost"
      size="icon"
      onClick={() => onDuplicateExperience(experience?.id, index, experience)}
      aria-label={`Delete ${experience?.company} experience item`}
      title="Duplicate Experience Item"
    >
      <Copy className="w-4 h-4" />
    </Button>
    <Button
      variant="ghost"
      size="icon"
      onClick={() => onDeleteExperience(experience?.id)}
      aria-label={`Delete ${experience?.company} experience item`}
      className="text-red-500 hover:text-red-700"
      title="Delete Experience Item"
    >
      <Trash2 className="w-4 h-4" />
    </Button>
  </div>
);

const WorkExperienceItem = ({
  experience,
  index,
  children,
  onDeleteExperience,
  onDuplicateExperience,
}: WorkExperienceItemProps) => {
  return (
    <ResumeItem
      label={`Experience ${index + 1}`}
      itemId={experience.id}
      key={experience.id}
      className="flex flex-col gap-4"
      labelClassName="text-sm font-semibold"
      renderHeaderAction={() => (
        <EducationItemActions
          index={index}
          onDeleteExperience={onDeleteExperience}
          onDuplicateExperience={onDuplicateExperience}
          experience={experience}
        />
      )}
    >
      {children}
    </ResumeItem>
  );
};

export default WorkExperienceItem;
