/**
 * @file MyDocumentsSection.tsx
 * @description Main dashboard section for displaying and managing the user's resumes.
 */

"use client";

import { FadeIn } from "@/shared/components/animated/FadeIn";
import LocalDocumentsAlert from "@/shared/components/common/LocalDocumentsAlert";
import ViewTypeButton from "@/shared/components/common/ViewTypeButton";
import { cn } from "@/shared/lib/utils";
import { Grid, List } from "lucide-react";
import { useDocumentsSection } from "../hooks/useDocumentsSection";
import DocumentList from "./DocumentList";
import DocumentSearch from "./DocumentSearch";
import SyncLocalResumesCallout from "./SyncResumesCallout";

/**
 * MyDocumentsSection component orchestrates the display, search, and management
 * of both local and remote resumes.
 */
const MyDocumentsSection = () => {
  const {
    activeView,
    setActiveView,
    setSearchQuery,
    filteredDocuments,
    isLoading,
    isSignedIn,
    isLoaded,
    handleDocumentClick,
    handleDocumentDuplication,
    handleDeleteDocument,
  } = useDocumentsSection();

  return (
    <div className="flex flex-col gap-6 w-full">
      <FadeIn transition={{ delay: 0.3 }} className="flex flex-row gap-4">
        <DocumentSearch onChange={setSearchQuery} />
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

      {!isSignedIn && filteredDocuments?.length > 0 && isLoaded ? (
        <FadeIn transition={{ delay: 0.3 }} className="my-2">
          <LocalDocumentsAlert />
        </FadeIn>
      ) : null}

      {isSignedIn && isLoaded && (
        <FadeIn transition={{ delay: 0.2 }}>
          <SyncLocalResumesCallout />
        </FadeIn>
      )}

      <FadeIn
        transition={{ delay: 0.3 }}
        className={cn("w-full", filteredDocuments?.length === 0 && "mt-4")}
      >
        <DocumentList
          isLoading={isLoading}
          viewType={activeView}
          documents={filteredDocuments!}
          onDocumentClick={handleDocumentClick}
          onDocumentCopy={handleDocumentDuplication}
          onDocumentDelete={handleDeleteDocument}
        />
      </FadeIn>
    </div>
  );
};

export default MyDocumentsSection;
