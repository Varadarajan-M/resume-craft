"use client";

import { DocumentList } from "@/features/document-listing/components";
import { Button } from "@/shared/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/shared/components/ui/tooltip";
import { Grid, List } from "lucide-react";
import { useState } from "react";
import DocumentSearch from "./DocumentSearch";

const GridAndListButton = ({
  active,
  icon: Icon,
  tooltipText,
  onClick = () => {},
}: {
  active: boolean;
  icon: React.ComponentType<{ className?: string }>;
  onClick?: () => void;
  tooltipText?: string;
}) => (
  <Tooltip>
    <TooltipTrigger asChild>
      <Button
        variant={active ? "default" : "secondary"}
        size="sm"
        onClick={onClick}
      >
        {<Icon className="h-4 w-4" />}
      </Button>
    </TooltipTrigger>
    <TooltipContent className="w-max">{tooltipText}</TooltipContent>
  </Tooltip>
);

const DocumentsSection = () => {
  const [activeView, setActiveView] = useState<"grid" | "list">("grid");

  return (
    <>
      <div className="flex gap-4">
        <DocumentSearch />
        <div className="flex gap-2 items-center">
          <GridAndListButton
            active={activeView === "grid"}
            icon={Grid}
            onClick={() => setActiveView("grid")}
            tooltipText="Grid View"
          />
          <GridAndListButton
            active={activeView === "list"}
            icon={List}
            onClick={() => setActiveView("list")}
            tooltipText="List View"
          />
        </div>
      </div>
      <DocumentList numberOfDocuments={10} viewType={activeView} />
    </>
  );
};

export default DocumentsSection;
