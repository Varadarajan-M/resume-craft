import { useResumeStore } from "@/features/resume-builder/store/resume";
import { Button } from "@/shared/components/ui/button";
import { Copy, Trash2 } from "lucide-react";
import ResumeItem from "../ResumeItem";
import ProjectForm from "./ProjectForm";

const ProjectItem = ({ id, index }: { id: string; index: number }) => {
  const handleDeleteProject = useResumeStore((s) => s.deleteProjectItem);
  const handleDuplicateProject = useResumeStore((s) => s.duplicateProjectItem);

  return (
    <ResumeItem
      label={`Project ${index + 1}`}
      labelClassName="text-sm font-semibold"
      itemId={id}
      className="flex flex-col gap-4"
      renderHeaderAction={() => (
        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => handleDuplicateProject(id)}
            title="Duplicate Project"
          >
            <Copy className="w-4 h-4" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => handleDeleteProject(id)}
            title="Delete Project"
            className="text-red-500 hover:text-red-700"
          >
            <Trash2 className="w-4 h-4" />
          </Button>
        </div>
      )}
    >
      <ProjectForm id={id} />
    </ResumeItem>
  );
};

export default ProjectItem;
