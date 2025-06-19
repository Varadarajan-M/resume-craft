"use client";

import { useResumeStore } from "@/features/resume-builder/store/resume";
import Tip from "@/shared/components/common/Tip";
import { Code2 } from "lucide-react";
import AddNewButton from "../AddNewItemButton";
import ResumeSection from "../ResumeSection";
import ProjectItem from "./ProjectItem";

const ProjectSection = () => {
  const projects = useResumeStore((s) => s.resume?.sections.projects ?? []);
  const handleAddProject = useResumeStore((s) => s.addProjectItem);

  return (
    <ResumeSection
      icon={<Code2 className="w-4 h-4" />}
      title="Projects"
      subtitle="Personal, academic or professional projects."
    >
      {projects.map((project, index) => (
        <ProjectItem key={project.id} id={project.id} index={index} />
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
