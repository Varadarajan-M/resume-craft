"use client";

import { useResumeStore } from "@/features/resume-builder/store/resume";
import Tip from "@/shared/components/common/Tip";
import AddNewButton from "../AddNewItemButton";
import ResumeSection from "../ResumeSection";
import ProjectItem from "./ProjectItem";

import { RESUME_BUILDER_SECTIONS } from "@/features/resume-builder/lib/constants";

const { icon: SectionIcon, ...rest } = RESUME_BUILDER_SECTIONS.projects;

const sectionConfig = {
  ...rest,
  icon: <SectionIcon className="w-4 h-4" />,
};

const ProjectSection = () => {
  const projects = useResumeStore((s) => s.resume?.sections?.projects);
  console.log("projects", projects);
  const handleAddProject = useResumeStore((s) => s.addProjectItem);

  return (
    <ResumeSection {...sectionConfig}>
      {projects?.map((project, index) => (
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
