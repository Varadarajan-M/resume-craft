"use client";

import { Grid, List } from "lucide-react";
import { useState } from "react";

import ViewTypeButton from "@/shared/components/common/ViewTypeButton";
import DocumentList from "./DocumentList";
import DocumentSearch from "./DocumentSearch";

import { FadeIn } from "@/shared/components/animated/FadeIn";
import { Document } from "@/shared/types/document";
import { useRouter } from "next/navigation";
import useDocumentListQuery from "../hooks/useDocumentListQuery";

const DocumentsSection = () => {
  const [activeView, setActiveView] = useState<"grid" | "list">("grid");
  const documents = useDocumentListQuery();

  const router = useRouter();

  const handleDocumentClick = <T extends Document>(document: T) => {
    // Handle document click logic here, e.g., navigate to document details
    console.log("Document clicked:", document);
    router.push(`/builder`);
  };

  return (
    <>
      <FadeIn transition={{ delay: 0.3 }} className="flex flex-row gap-4">
        <DocumentSearch />
        <div className="flex gap-2 items-center">
          <ViewTypeButton
            active={activeView === "grid"}
            icon={Grid}
            onClick={() => setActiveView("grid")}
            tooltipText="Grid View"
          />
          <ViewTypeButton
            active={activeView === "list"}
            icon={List}
            onClick={() => setActiveView("list")}
            tooltipText="List View"
          />
        </div>
      </FadeIn>
      <FadeIn transition={{ delay: 0.3 }} className="w-full">
        <DocumentList
          viewType={activeView}
          documents={documents}
          onDocumentClick={handleDocumentClick}
        />
      </FadeIn>
    </>
  );
};

export default DocumentsSection;
