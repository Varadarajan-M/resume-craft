import { DocumentTemplate } from "@/shared/types/document";
import TemplateCard from "./TemplateCard";

const templates: DocumentTemplate[] = [
  {
    _id: "1",
    image: "/globe.svg?width=300&height=300",
    title: "Modern Resume",
    description: "A clean, minimal template for tech professionals.",
    tags: ["minimal", "professional"],
  },
  {
    _id: "2",
    image: "/globe.svg?width=300&height=300",
    title: "Creative CV",
    description: "Show your creative work with flair.",
    tags: ["creative", "portfolio"],
  },
  {
    _id: "3",
    image: "/globe.svg?width=300&height=300",
    title: "Executive Resume",
    description: "Perfect for leadership roles.",
    tags: ["executive", "bold"],
  },
];

const TemplateList = () => {
  return (
    <div className="grid gap-6 sm:gap-8 grid-cols-[repeat(auto-fill,minmax(280px,1fr))]">
      {templates.map((template) => (
        <TemplateCard key={template._id} template={template} />
      ))}
    </div>
  );
};

export default TemplateList;
