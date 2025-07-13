import type { ResumeTemplateComponentProps } from "@/shared/types/resume";

const ModernResumeTemplate = ({ resume }: ResumeTemplateComponentProps) => {
  return (
    <div>
      {/* Render the modern resume template using the provided resume data */}
      <h1>{resume.title} in Modern Template</h1>
      <p>{resume?.sections?.summary?.content}</p>
      {/* Add more sections as needed */}
    </div>
  );
};

export default ModernResumeTemplate;
