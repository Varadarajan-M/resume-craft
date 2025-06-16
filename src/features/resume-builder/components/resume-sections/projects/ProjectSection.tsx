"use client";

import { Code2 } from "lucide-react";
import { useState } from "react";

import Tip from "@/shared/components/common/Tip";
import AddNewButton from "../AddNewItemButton";
import ResumeSection from "../ResumeSection";

import { type ResumeProjectItem } from "@/shared/types/resume";
import ProjectForm from "./ProjectForm";
import ProjectItem from "./ProjectItem";

const createNewProject = (): ResumeProjectItem & { id: string } => ({
  id: "proj-" + Math.random().toString(36).substring(2, 9),
  name: "",
  description: "",
  url: "",
  technologies: [],
});

const ProjectSection = () => {
  const [projects, setProjects] = useState<
    (ResumeProjectItem & { id: string })[]
  >([createNewProject()]);

  const handleAddProject = () => {
    setProjects((prev) => [...prev, createNewProject()]);
  };

  const handleProjectChange = (
    id: string,
    key: keyof ResumeProjectItem,
    value: any
  ) =>
    setProjects((prev) =>
      prev.map((proj) => (proj.id === id ? { ...proj, [key]: value } : proj))
    );

  const handleDeleteProject = (id: string) =>
    setProjects((prev) => prev.filter((proj) => proj.id !== id));

  const handleDuplicateProject = (
    id: string,
    index: number,
    project: ResumeProjectItem & { id: string }
  ) => {
    const newProject = {
      ...project,
      name: project.name + " (Copy)",
      id: "proj-" + Math.random().toString(36).substring(2, 9),
    };
    setProjects((prev) => {
      const copy = [...prev];
      copy.splice(index + 1, 0, newProject);
      return copy;
    });
  };

  return (
    <ResumeSection
      icon={<Code2 className="w-4 h-4" />}
      title="Projects"
      subtitle="Personal, academic or professional projects."
    >
      {projects.map((project, index) => (
        <ProjectItem
          key={project.id}
          project={project}
          index={index}
          onDeleteProject={handleDeleteProject}
          onDuplicateProject={handleDuplicateProject}
        >
          <ProjectForm
            project={project}
            onProjectChange={(key, value) =>
              handleProjectChange(project.id, key, value)
            }
          />
        </ProjectItem>
      ))}

      <AddNewButton
        onClick={handleAddProject}
        label="Add Project"
        className="ml-1"
      />

      <Tip>
        Highlight 2–3 major projects. Focus on your impact, what problems you
        solved, and the technologies used.
      </Tip>
    </ResumeSection>
  );
};

export default ProjectSection;
