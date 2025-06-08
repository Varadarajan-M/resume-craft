import { DocumentTemplate } from "@/shared/types/document";
import TemplateCard from "./TemplateCard";

interface TemplateListProps {
  templates: DocumentTemplate[];
}

const TemplateList = ({ templates }: TemplateListProps) => {
  return (
    <div className="grid gap-6 sm:gap-8 grid-cols-[repeat(auto-fill,minmax(250px,1fr))]">
      {templates?.map((template) => (
        <TemplateCard key={template._id} template={template} />
      ))}
    </div>
  );
};

export default TemplateList;
