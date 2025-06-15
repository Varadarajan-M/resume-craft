import { Button } from "@/shared/components/ui/button";
import { ResumeEducationItem } from "@/shared/types/resume";
import { Copy, Trash2 } from "lucide-react";
import { ReactNode } from "react";
import ResumeItem from "../ResumeItem";

interface EducationItemProps {
  education: ResumeEducationItem;
  index: number;
  onDeleteEducation: (id: string) => void;
  onDuplicateEducation: (
    id: string,
    index: number,
    education: ResumeEducationItem
  ) => void;
  children: ReactNode;
}

const EducationItemActions = ({
  index,
  onDeleteEducation,
  onDuplicateEducation,
  education,
}: Omit<EducationItemProps, "children">) => (
  <div className="flex items-center gap-2">
    <Button
      variant="ghost"
      size="icon"
      onClick={() => onDuplicateEducation(education?.id, index, education)}
      aria-label={`Delete ${education?.institution} education item`}
      title="Duplicate Education Item"
    >
      <Copy className="w-4 h-4" />
    </Button>
    <Button
      variant="ghost"
      size="icon"
      onClick={() => onDeleteEducation(education?.id)}
      aria-label={`Delete ${education?.institution} education item`}
      className="text-red-500 hover:text-red-700"
      title="Delete Education Item"
    >
      <Trash2 className="w-4 h-4" />
    </Button>
  </div>
);

const EducationItem = ({
  education,
  index,
  onDeleteEducation,
  onDuplicateEducation,
  children,
}: EducationItemProps) => {
  return (
    <ResumeItem
      label={`Education ${index + 1}`}
      labelClassName="text-sm font-semibold"
      itemId={education.id}
      className="flex flex-col gap-4"
      renderHeaderAction={() => (
        <EducationItemActions
          index={index}
          education={education}
          onDeleteEducation={onDeleteEducation}
          onDuplicateEducation={onDuplicateEducation}
        />
      )}
    >
      {children}
    </ResumeItem>
  );
};

export default EducationItem;
