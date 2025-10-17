import FadeInChildren from "@/shared/components/animated/FadeIn";
import { cn } from "@/shared/lib/utils";
import { DocumentTemplate } from "@/shared/types/document";
import {
  TemplateCardGrid,
  TemplateCardGridSkeleton,
  TemplateCardList,
  TemplateCardListSkeleton,
} from "./TemplateCard";
interface TemplateListProps {
  viewType?: "grid" | "list";
  skeletonCount?: number;
  isLoading?: boolean;
  templates: DocumentTemplate[] | undefined;
  onTemplateClick?: (template: DocumentTemplate) => void;
}

const TemplateList: React.FC<TemplateListProps> = ({
  templates,
  viewType,
  onTemplateClick,
  isLoading,
  skeletonCount = 6,
}) => {
  const isList = viewType === "list";

  if (isLoading) {
    return (
      <div
        className={cn(
          isList
            ? "flex flex-col gap-4"
            : "grid gap-8 grid-cols-[repeat(auto-fill,minmax(250px,1fr))]"
        )}
      >
        {Array.from({ length: skeletonCount }).map((_, index) =>
          isList ? (
            <TemplateCardListSkeleton key={index} />
          ) : (
            <TemplateCardGridSkeleton key={index} />
          )
        )}
      </div>
    );
  }

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
            key={template.id}
            template={template}
            onClick={onTemplateClick}
          />
        ) : (
          <TemplateCardGrid
            key={template.id}
            template={template}
            onClick={onTemplateClick}
          />
        )
      )}
    </FadeInChildren>
  );
};

export default TemplateList;
