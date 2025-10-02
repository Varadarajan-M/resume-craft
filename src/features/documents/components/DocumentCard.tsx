import { Card, CardContent, CardHeader } from "@/shared/components/ui/card";
import { Skeleton } from "@/shared/components/ui/skeleton";
import { timeFromNow } from "@/shared/lib/datetime";
import { cn } from "@/shared/lib/utils";
import type { Document } from "@/shared/types/document";
import { Resume } from "@/shared/types/resume";
import { Clock } from "lucide-react";
import Image from "next/image";
import React from "react";

interface DocumentCardProps {
  document: Resume;
  onClick?: (document: Resume) => void;
}

const statusColorMap: Record<Document["status"], string> = {
  draft: "bg-yellow-100 text-yellow-800",
  published: "bg-green-100 text-green-800",
  archived: "bg-gray-200 text-gray-600",
};

const DocumentStatusTag: React.FC<{
  status: Document["status"];
  className?: string;
}> = ({ status, className }) => {
  return (
    <span
      className={cn(
        "text-xs px-2 py-0.5 rounded-full font-medium capitalize",
        statusColorMap[status],
        className
      )}
    >
      {status}
    </span>
  );
};

export const DocumentCardGrid: React.FC<DocumentCardProps> = ({
  document,
  onClick,
}) => {
  return (
    <Card
      tabIndex={0}
      aria-label="Card with document details"
      className="hover:shadow-md transition-shadow duration-200 bg-neutral-50 dark:bg-neutral-950/95 pt-5"
    >
      <CardHeader className="flex flex-row items-center justify-between px-4 pb-2 ">
        <Image
          src={document?.image || "/placeholder.jpg"}
          alt="Document Icon"
          width={200}
          height={200}
          className="m-auto object-cover w-full h-72 rounded-md [background-position:50%_10%]"
          loading="lazy"
          onClick={() => onClick?.(document)}
        />
      </CardHeader>
      <CardContent className="px-4 pb-4 flex flex-col gap-1">
        <h3
          onClick={() => onClick?.(document)}
          className="text-md font-semibold capitalize text-foreground line-clamp-1 tracking-tight cursor-pointer underline transition-colors hover:text-gray-400"
        >
          {document?.sections?.personalInfo?.fullName} -{" "}
          {document?.sections?.personalInfo?.headline || document?.category}
        </h3>
        <div className="flex items-center gap-1 mt-1 text-sm text-muted-foreground">
          <div className="flex gap-4 items-center justify-between w-100">
            <p className="text-xs flex items-center gap-1">
              <Clock className="w-3 h-3 shrink-0" />
              <span>{timeFromNow(document.updatedAt)}</span>
            </p>
            {/* <DocumentStatusTag status={document.status} /> */}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export const DocumentCardList: React.FC<DocumentCardProps> = ({
  document,
  onClick,
}) => {
  return (
    <Card
      tabIndex={0}
      aria-label="Card with document details"
      className="flex flex-row items-center gap-4 px-4 py-3 border border-border hover:shadow-sm bg-background transition-shadow"
    >
      <Image
        src={document?.image || "/placeholder.jpg"}
        alt="Document Icon"
        width={48}
        height={48}
        className="rounded-md w-18 h-18 object-cover"
        loading="lazy"
        onClick={() => onClick?.(document)}
      />
      <div className="flex flex-col gap-1 justify-center flex-1">
        <div className="flex justify-between items-center w-full">
          <h3
            onClick={() => onClick?.(document)}
            className="font-medium text-sm capitalize line-clamp-1 text-foreground cursor-pointer underline transition-colors hover:text-gray-400"
          >
            {document?.sections?.personalInfo?.fullName} -{" "}
            {document?.sections?.personalInfo?.headline || document?.category}
          </h3>
        </div>
        <p className="text-xs text-muted-foreground flex items-center gap-1">
          <Clock className="w-3 h-3" />
          {timeFromNow(document.updatedAt)}
        </p>
      </div>
      {/* <DocumentStatusTag status={document.status} /> */}
    </Card>
  );
};

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
