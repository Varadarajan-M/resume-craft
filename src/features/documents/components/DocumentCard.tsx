/**
 * @file DocumentCard.tsx
 * @description Components for rendering individual resume documents in both grid and list views.
 */

import { Card, CardContent, CardHeader } from "@/shared/components/ui/card";
import { Skeleton } from "@/shared/components/ui/skeleton";
import { timeFromNow } from "@/shared/lib/datetime";
import { Resume } from "@/shared/types/resume";
import { Clock, Copy, Trash2 } from "lucide-react";
import Image from "next/image";
import React from "react";
import DocumentActions from "./DocumentActions";

interface DocumentCardProps {
  /** The resume document to display. */
  document: Resume;
  /** Callback triggered when the card is clicked. */
  onClick?: (document: Resume) => void;
  /** Callback triggered when the delete action is selected. */
  onDelete?: (document: Resume) => void;
  /** Callback triggered when the copy/duplicate action is selected. */
  onCopy?: (document: Resume) => void;
}

/**
 * Shared component for the document title and headline.
 */
const DocumentTitle = ({
  document,
  onClick,
}: {
  document: Resume;
  onClick?: (doc: Resume) => void;
}) => {
  const fullName = document?.sections?.personalInfo?.fullName || "Untitled";
  const headline =
    document?.sections?.personalInfo?.headline || document?.category || "";

  return (
    <h3
      onClick={() => onClick?.(document)}
      className="text-sm font-semibold capitalize text-foreground line-clamp-1 tracking-tight cursor-pointer underline transition-colors hover:text-gray-400 flex-1"
    >
      {fullName} {headline ? `- ${headline}` : ""}
    </h3>
  );
};

/**
 * Grid view representation of a document card.
 */
export const DocumentCardGrid: React.FC<DocumentCardProps> = ({
  document,
  onClick,
  onDelete,
  onCopy,
}) => {
  return (
    <Card
      tabIndex={0}
      className="relative hover:shadow-md transition-all duration-200 bg-neutral-50 dark:bg-neutral-950/95 pt-5 overflow-hidden"
    >
      <CardHeader className="relative px-4 pb-2">
        <div className="relative w-full">
          <Image
            src={document?.image || "/placeholder.jpg"}
            alt={`${
              document?.sections?.personalInfo?.fullName || "Document"
            } preview`}
            width={200}
            height={200}
            className="m-auto object-cover w-full h-72 rounded-md [background-position:50%_10%] cursor-pointer"
            onClick={() => onClick?.(document)}
            fetchPriority="high"
          />
        </div>
      </CardHeader>

      <CardContent className="px-4 pb-4 flex flex-col gap-1">
        <div className="flex justify-between items-center gap-4">
          <DocumentTitle document={document} onClick={onClick} />
          <DocumentActions
            actions={[
              {
                label: "Duplicate",
                icon: <Copy className="w-4 h-4 mr-2" />,
                onClick: () => onCopy?.(document),
              },
              {
                label: "Delete",
                icon: <Trash2 className="w-4 h-4 mr-2" />,
                onClick: () => onDelete?.(document),
                labelClass: "text-red-600 hover:bg-red-100 hover:text-red-800",
              },
            ]}
          />
        </div>

        <div className="flex items-center gap-1 mt-1 text-sm text-muted-foreground">
          <p className="text-xs flex items-center gap-1">
            <Clock className="w-3 h-3 shrink-0" />
            <span>{timeFromNow(document.updatedAt)}</span>
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

/**
 * List view representation of a document card.
 */
export const DocumentCardList: React.FC<DocumentCardProps> = ({
  document,
  onClick,
  onDelete,
  onCopy,
}) => {
  return (
    <Card
      tabIndex={0}
      className="flex flex-row items-center gap-4 px-4 py-3 border border-border hover:shadow-sm bg-background transition-shadow"
    >
      <Image
        src={document?.image || "/placeholder.jpg"}
        alt="Document Icon"
        width={48}
        height={48}
        className="rounded-md w-18 h-18 object-cover cursor-pointer"
        onClick={() => onClick?.(document)}
        fetchPriority="high"
      />
      <div className="flex flex-col gap-1 justify-center flex-1">
        <div className="flex justify-between items-center w-full">
          <DocumentTitle document={document} onClick={onClick} />
          <DocumentActions
            actions={[
              {
                label: "Copy",
                icon: <Copy className="w-4 h-4 mr-2" />,
                onClick: () => onCopy?.(document),
              },
              {
                label: "Delete",
                icon: <Trash2 className="w-4 h-4 mr-2" />,
                onClick: () => onDelete?.(document),
                labelClass: "text-red-600 hover:bg-red-100 hover:text-red-800",
              },
            ]}
          />
        </div>
        <p className="text-xs text-muted-foreground flex items-center gap-1">
          <Clock className="w-3 h-3" />
          {timeFromNow(document.updatedAt)}
        </p>
      </div>
    </Card>
  );
};

/**
 * Skeleton loader for grid view.
 */
export const DocumentCardGridSkeleton = () => {
  return (
    <Card className="bg-background border border-border hover:shadow-md transition-shadow duration-200">
      <CardHeader className="flex justify-center px-4 pb-2">
        <Skeleton className="w-full h-[200px] rounded-md bg-muted" />
      </CardHeader>
      <CardContent className="px-4 pb-4 flex flex-col gap-2">
        <Skeleton className="h-4 w-3/4 bg-muted" />
        <div className="flex items-center justify-between mt-1">
          <Skeleton className="h-3 w-1/3 bg-muted" />
          <Skeleton className="h-4 w-12 rounded-full bg-muted" />
        </div>
      </CardContent>
    </Card>
  );
};

/**
 * Skeleton loader for list view.
 */
export const DocumentCardListSkeleton = () => {
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
