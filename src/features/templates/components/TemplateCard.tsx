import { Card, CardContent, CardHeader } from "@/shared/components/ui/card";
import { Skeleton } from "@/shared/components/ui/skeleton";
import { DocumentTemplate } from "@/shared/types/document";
import Image from "next/image";
import React from "react";

interface TemplateCardProps {
  /** The template to display. */
  template: DocumentTemplate;
  /** Callback triggered when the template is clicked. */
  onClick?: (template: DocumentTemplate) => void;
}

/**
 * Shared component for rendering template tags.
 */
const TemplateTags = ({ tags, limit }: { tags?: string[]; limit?: number }) => {
  if (!tags || tags.length === 0) return null;

  const displayTags = limit ? tags.slice(0, limit) : tags;
  const remainingCount = limit ? Math.max(0, tags.length - limit) : 0;

  return (
    <div className="flex flex-wrap gap-2 mt-2">
      {displayTags.map((tag) => (
        <span
          key={tag}
          className="text-xs font-medium capitalize bg-neutral-200 text-neutral-700 px-2 py-0.5 rounded-full dark:bg-neutral-800 dark:text-neutral-300"
        >
          {tag}
        </span>
      ))}
      {remainingCount > 0 && (
        <span className="text-xs text-muted-foreground self-center">
          +{remainingCount}
        </span>
      )}
    </div>
  );
};

/**
 * Grid view representation of a template card.
 */
export const TemplateCardGrid: React.FC<TemplateCardProps> = ({
  template,
  onClick,
}) => {
  return (
    <Card
      tabIndex={0}
      className="hover:shadow-md transition-shadow duration-200 bg-neutral-50 dark:bg-neutral-950/95 pt-5 flex flex-col h-full"
    >
      <CardHeader className="flex flex-row items-center justify-between px-4 pb-2">
        <Image
          src={template.image || "/placeholder.jpg"}
          alt={template.name}
          width={200}
          height={200}
          className="m-auto object-cover w-full h-72 rounded-md [background-position:50%_10%] cursor-pointer"
          onClick={() => onClick?.(template)}
        />
      </CardHeader>
      <CardContent className="p-4 pt-0 flex flex-col gap-2 flex-grow">
        <h3
          className="text-base font-semibold text-foreground line-clamp-1 cursor-pointer underline hover:text-gray-400 transition"
          onClick={() => onClick?.(template)}
        >
          {template?.name}
        </h3>
        {template.description && (
          <p className="text-sm text-muted-foreground line-clamp-2">
            {template?.description}
          </p>
        )}
        <TemplateTags tags={template.tags} />
      </CardContent>
    </Card>
  );
};

/**
 * List view representation of a template card.
 */
export const TemplateCardList: React.FC<TemplateCardProps> = ({
  template,
  onClick,
}) => {
  return (
    <Card
      tabIndex={0}
      className="flex flex-row items-center gap-4 px-4 py-3 border border-border hover:shadow-sm bg-background transition-shadow"
    >
      <Image
        src={template?.image || "/placeholder.jpg"}
        alt={template?.name}
        width={64}
        height={64}
        className="rounded-md w-16 h-16 object-cover cursor-pointer"
        onClick={() => onClick?.(template)}
        loading="lazy"
      />

      <div className="flex flex-col gap-1 justify-center flex-1">
        <h3
          className="font-medium text-sm line-clamp-1 text-foreground cursor-pointer underline hover:text-gray-400 transition"
          onClick={() => onClick?.(template)}
        >
          {template.name}
        </h3>

        {template.description && (
          <p className="text-xs text-muted-foreground line-clamp-1">
            {template.description}
          </p>
        )}

        <TemplateTags tags={template.tags} limit={5} />
      </div>
    </Card>
  );
};

/**
 * Skeleton loader for grid view.
 */
export const TemplateCardGridSkeleton = () => {
  return (
    <Card className="bg-background border border-border hover:shadow-md transition-shadow duration-200">
      <CardHeader className="flex justify-center px-4 pb-2">
        <Skeleton className="w-full h-[200px] rounded-md bg-muted" />
      </CardHeader>
      <CardContent className="px-4 pb-4 flex flex-col gap-2">
        <Skeleton className="h-4 w-3/4 bg-muted" />
        <Skeleton className="h-3 w-1/3 bg-muted" />
        <div className="flex items-center justify-between gap-3 mt-1">
          <Skeleton className="h-4 w-12 rounded-full bg-muted" />
          <Skeleton className="h-4 w-12 rounded-full bg-muted" />
          <Skeleton className="h-4 w-12 rounded-full bg-muted" />
        </div>
      </CardContent>
    </Card>
  );
};

/**
 * Skeleton loader for list view.
 */
export const TemplateCardListSkeleton = () => {
  return (
    <Card className="flex flex-row items-center gap-4 px-4 py-3 border border-border bg-background hover:shadow-sm transition-shadow">
      <Skeleton className="w-12 h-12 rounded-md bg-muted" />
      <div className="flex flex-col gap-2 flex-1">
        <Skeleton className="h-4 w-2/3 bg-muted" />
        <Skeleton className="h-3 w-1/4 bg-muted" />
      </div>
      <Skeleton className="h-4 w-12 rounded-full bg-muted" />
    </Card>
  );
};
