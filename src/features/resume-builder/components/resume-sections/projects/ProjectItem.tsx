import { Button } from "@/shared/components/ui/button";
import { type ResumeProjectItem } from "@/shared/types/resume";
import { Copy, Trash2 } from "lucide-react";
import { ReactNode } from "react";
import ResumeItem from "../ResumeItem";

interface ProjectItemProps {
  project: ResumeProjectItem & { id: string };
  index: number;
  onDeleteProject: (id: string) => void;
  onDuplicateProject: (
    id: string,
    index: number,
    project: ResumeProjectItem & { id: string }
  ) => void;
  children: ReactNode;
}

const ProjectItemActions = ({
  index,
  onDeleteProject,
  onDuplicateProject,
  project,
}: Omit<ProjectItemProps, "children">) => (
  <div className="flex items-center gap-2">
    <Button
      variant="ghost"
      size="icon"
      onClick={() => onDuplicateProject(project.id, index, project)}
      title="Duplicate Project"
    >
      <Copy className="w-4 h-4" />
    </Button>
    <Button
      variant="ghost"
      size="icon"
      onClick={() => onDeleteProject(project.id)}
      title="Delete Project"
      className="text-red-500 hover:text-red-700"
    >
      <Trash2 className="w-4 h-4" />
    </Button>
  </div>
);

const ProjectItem = ({
  project,
  index,
  onDeleteProject,
  onDuplicateProject,
  children,
}: ProjectItemProps) => {
  return (
    <ResumeItem
      label={`Project ${index + 1}`}
      labelClassName="text-sm font-semibold"
      itemId={project.id}
      className="flex flex-col gap-4"
      renderHeaderAction={() => (
        <ProjectItemActions
          index={index}
          project={project}
          onDeleteProject={onDeleteProject}
          onDuplicateProject={onDuplicateProject}
        />
      )}
    >
      {children}
    </ResumeItem>
  );
};

export default ProjectItem;
