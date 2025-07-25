import FadeInChildren from "@/shared/components/animated/FadeIn";
import { DocumentTemplate } from "@/shared/types/document";
import { TemplateCardGrid, TemplateCardList } from "./TemplateCard";
import { cn } from "@/shared/lib/utils";
interface TemplateListProps {
  viewType?: "grid" | "list";
  templates: DocumentTemplate[];
  onTemplateClick?: (template: DocumentTemplate) => void;
}

const TemplateList: React.FC<TemplateListProps> = ({
  templates,
  viewType,
  onTemplateClick,
}) => {
  const isList = viewType === "list";

    return (
      <FadeInChildren
        key={isList ? "list" : "grid"}
        className={cn(
          isList
            ? "flex flex-col gap-4"
            : "grid gap-8 grid-cols-[repeat(auto-fill,minmax(250px,1fr))]"
        )}
      >
        {templates?.map((template) =>
          isList ? (
            <TemplateCardList
              key={template._id}
              template={template}
              onClick={onTemplateClick}
            />
          ) : (
            <TemplateCardGrid
              key={template._id}
              template={template}
              onClick={onTemplateClick}
            />
          )
        )}
      </FadeInChildren>
    );
};

export default TemplateList;
