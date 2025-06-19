import { useResumeStore } from "@/features/resume-builder/store/resume";
import { Button } from "@/shared/components/ui/button";
import { Copy, Trash2 } from "lucide-react";
import ResumeItem from "../ResumeItem";
import WorkExperienceForm from "./WorkExperienceForm";

const WorkExperienceItem = ({ id, index }: { id: string; index: number }) => {
  const handleDeleteExperience = useResumeStore((s) => s.deleteExperienceItem);
  const handleDuplicateExperience = useResumeStore(
    (s) => s.duplicateExperienceItem
  );

  return (
    <ResumeItem
      label={`Experience ${index + 1}`}
      itemId={id}
      labelClassName="text-sm font-semibold"
      className="flex flex-col gap-4"
      renderHeaderAction={() => (
        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => handleDuplicateExperience(id)}
            title="Duplicate Experience Item"
          >
            <Copy className="w-4 h-4" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => handleDeleteExperience(id)}
            title="Delete Experience Item"
            className="text-red-500 hover:text-red-700"
          >
            <Trash2 className="w-4 h-4" />
          </Button>
        </div>
      )}
    >
      <WorkExperienceForm id={id} />
    </ResumeItem>
  );
};

export default WorkExperienceItem;
