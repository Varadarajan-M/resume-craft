import { Card, CardContent, CardHeader } from "@/shared/components/ui/card";
import { DocumentTemplate } from "@/shared/types/document";
import Image from "next/image";
import React from "react";

interface TemplateCardProps {
  template: DocumentTemplate;
}

const TemplateCard: React.FC<TemplateCardProps> = ({ template }) => {
  return (
    <Card className="hover:shadow-md transition-shadow duration-200 bg-neutral-50 dark:bg-neutral-950/95">
      <CardHeader className="p-4 pb-0 flex items-center justify-center">
        <Image
          src={template.image || "/placeholder.svg"}
          alt={template.title}
          width={200}
          height={200}
          className="m-auto object-cover w-16 h-16 rounded-md"
        />
      </CardHeader>
      <CardContent className="p-4 flex flex-col gap-2">
        <h3 className="text-base font-semibold text-foreground line-clamp-1">
          {template.title}
        </h3>
        {template.description && (
          <p className="text-sm text-muted-foreground line-clamp-2">
            {template.description}
          </p>
        )}
        {(template?.tags?.length || 0) > 0 && (
          <div className="flex flex-wrap gap-2 mt-2">
            {template.tags?.map((tag) => (
              <span
                key={tag}
                className="text-xs font-medium capitalize bg-neutral-200 text-neutral-700 px-2 py-1 rounded-full dark:bg-neutral-800 dark:text-neutral-300"
              >
                {tag}
              </span>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default TemplateCard;
