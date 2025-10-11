"use client";

import { useResumeStore } from "@/features/resume-builder/store/resume";
import { Input } from "@/shared/components/ui/input";
import RichTextEditor from "@/shared/components/ui/rich-text-editor";
import { memo } from "react";
import EnhanceWithAI from "../../EnhanceWithAI";
import ResumeItem from "../ResumeItem";

const ProjectForm = ({ id }: { id: string }) => {
  const project = useResumeStore((s) =>
    s.resume?.sections.projects?.find((p) => p.id === id)
  );
  const handleUpdateProject = useResumeStore((s) => s.updateProjectItem);

  if (!project) return null;

  return (
    <div className="flex flex-col gap-4">
      <ResumeItem label="Project Name" itemId={`${id}-name`} className="p-0">
        <Input
          id={`${id}-name`}
          value={project.name}
          onChange={(e) => handleUpdateProject(id, { name: e.target.value })}
          placeholder="e.g., Portfolio Website"
        />
      </ResumeItem>

      <ResumeItem label="URL" itemId={`${id}-url`} className="p-0">
        <Input
          id={`${id}-url`}
          value={project.url}
          onChange={(e) => handleUpdateProject(id, { url: e.target.value })}
          placeholder="e.g., https://github.com/username/project"
        />
      </ResumeItem>

      <ResumeItem
        label="Technologies Used"
        itemId={`${id}-tech`}
        className="p-0"
      >
        <Input
          id={`${id}-tech`}
          value={project.technologies?.join(", ") || ""}
          onChange={(e) =>
            handleUpdateProject(id, {
              technologies: [e.target.value],
            })
          }
          placeholder="e.g., React, Node.js, MongoDB"
        />
      </ResumeItem>

      <ResumeItem
        label="Time Period"
        itemId={`${id}-timePeriod`}
        className="p-0"
      >
        <Input
          id={`${id}-timePeriod`}
          value={project.timePeriod}
          onChange={(e) =>
            handleUpdateProject(id, { timePeriod: e.target.value })
          }
          placeholder="e.g., Jan 2024 - Mar 2024"
        />
      </ResumeItem>

      <DescriptionEditor id={id} />
    </div>
  );
};

const DescriptionEditor = memo(({ id }: { id: string }) => {
  const description = useResumeStore(
    (s) =>
      s.resume?.sections.projects?.find((p) => p.id === id)?.description || ""
  );
  const handleUpdateProject = useResumeStore((s) => s.updateProjectItem);

  return (
    <ResumeItem label="Description" itemId={`${id}-desc`} className="p-0">
      <EnhanceWithAI
        content={description}
        onEnhance={console.log}
        enhanceDialogTitle="Enhance Projects with AI"
      >
        <RichTextEditor
          id={`${id}-desc`}
          content={description}
          onChange={(v) => handleUpdateProject(id, { description: v })}
          placeholder="Briefly describe what the project does, and what you built."
        />
      </EnhanceWithAI>
    </ResumeItem>
  );
});

DescriptionEditor.displayName = "DescriptionEditor";

export default ProjectForm;
