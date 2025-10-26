import { useResumeStore } from "@/features/resume-builder/store/resume";
import { DeleteButton } from "@/shared/components/common/DeleteButton";
import { TooltipButton } from "@/shared/components/common/ToolTipButton";
import { Copy } from "lucide-react";
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
          <TooltipButton
            icon={Copy}
            tooltipText="Duplicate Project"
            onClick={() => handleDuplicateProject(id)}
            variant="ghost"
          />
          <DeleteButton
            onDelete={() => handleDeleteProject(id)}
            tooltipText="Delete Project"
            variant="ghost"
          />
        </div>
      )}
    >
      <ProjectForm id={id} />
    </ResumeItem>
  );
};

export default ProjectItem;
