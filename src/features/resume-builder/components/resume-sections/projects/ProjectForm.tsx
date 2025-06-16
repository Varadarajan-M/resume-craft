import { Input } from "@/shared/components/ui/input";
import RichTextEditor from "@/shared/components/ui/rich-text-editor";
import { type ResumeProjectItem } from "@/shared/types/resume";
import ResumeItem from "../ResumeItem";

interface ProjectFormProps {
  project: ResumeProjectItem & { id: string };
  onProjectChange: (key: keyof ResumeProjectItem, value: any) => void;
}

const ProjectForm = ({ project, onProjectChange }: ProjectFormProps) => {
  return (
    <div className="flex flex-col gap-4">
      <ResumeItem
        label="Project Name"
        itemId={`${project.id}-name`}
        className="p-0"
      >
        <Input
          id={`${project.id}-name`}
          value={project.name}
          onChange={(e) => onProjectChange("name", e.target.value)}
          placeholder="e.g., Portfolio Website"
        />
      </ResumeItem>

      <ResumeItem
        label="Description"
        itemId={`${project.id}-desc`}
        className="p-0"
      >
        <RichTextEditor
          id={`${project.id}-desc`}
          content={project.description}
          onChange={(v) => onProjectChange("description", v)}
          placeholder="Briefly describe what the project does, and what you built."
        />
      </ResumeItem>

      <ResumeItem label="URL" itemId={`${project.id}-url`} className="p-0">
        <Input
          id={`${project.id}-url`}
          value={project.url}
          onChange={(e) => onProjectChange("url", e.target.value)}
          placeholder="e.g., https://github.com/username/project"
        />
      </ResumeItem>

      <ResumeItem
        label="Technologies Used"
        itemId={`${project.id}-tech`}
        className="p-0"
      >
        <Input
          id={`${project.id}-tech`}
          value={project.technologies?.join(", ") || ""}
          onChange={(e) =>
            onProjectChange(
              "technologies",
              e.target.value.split(",").map((tech) => tech?.trim())
            )
          }
          placeholder="e.g., React, Node.js, MongoDB"
        />
      </ResumeItem>
    </div>
  );
};

export default ProjectForm;
