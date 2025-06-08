import { Card, CardContent, CardHeader } from "@/shared/components/ui/card";
import { timeFromNow } from "@/shared/lib/datetime";
import { cn } from "@/shared/lib/utils";
import type { Document } from "@/shared/types/document";
import { Clock } from "lucide-react";
import Image from "next/image";
import React from "react";

interface DocumentCardProps {
  document: Document;
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

export const DocumentCardGrid: React.FC<DocumentCardProps> = ({ document }) => {
  return (
    <Card className="hover:shadow-md transition-shadow duration-200 bg-neutral-50 dark:bg-neutral-950/95">
      <CardHeader className="flex flex-row items-center justify-between px-4 pb-2">
        <Image
          src={document?.image || "/placeholder.svg"}
          alt="Document Icon"
          width={200}
          height={200}
          className="m-auto object-cover w-full h-full rounded-md"
        />
      </CardHeader>
      <CardContent className="px-4 pb-4 flex flex-col gap-1">
        <h3 className="text-md font-semibold text-foreground line-clamp-1 tracking-tight">
          {document.title}
        </h3>
        <div className="flex items-center gap-1 mt-1 text-sm text-muted-foreground">
          <div className="flex gap-4 items-center justify-between w-100">
            <p className="text-xs flex items-center gap-1">
              <Clock className="w-3 h-3 shrink-0" />
              <span>{timeFromNow(document.updatedAt)}</span>
            </p>
            <DocumentStatusTag status={document.status} />
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export const DocumentCardList: React.FC<{ document: Document }> = ({
  document,
}) => {
  return (
    <Card className="flex flex-row items-center gap-4 px-4 py-3 border border-border hover:shadow-sm bg-background transition-shadow">
      <Image
        src={document.image || "/placeholder.svg"}
        alt="Document Icon"
        width={48}
        height={48}
        className="rounded-md w-18 h-18 object-cover"
      />
      <div className="flex flex-col gap-1 justify-center flex-1">
        <div className="flex justify-between items-center w-full">
          <h3 className="font-medium text-sm line-clamp-1 text-foreground">
            {document.title}
          </h3>
        </div>
        <p className="text-xs text-muted-foreground flex items-center gap-1">
          <Clock className="w-3 h-3" />
          {timeFromNow(document.updatedAt)}
        </p>
      </div>
      <DocumentStatusTag status={document.status} />
    </Card>
  );
};
