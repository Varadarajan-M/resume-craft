"use client";

import { DocumentList, useDocumentListQuery } from "@/features/documents";
import { FadeIn } from "@/shared/components/animated/FadeIn";
import { Button } from "@/shared/components/ui/button";
import { Document } from "@/shared/types/document";
import { ChevronRight } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

const RecentDocumentSection = () => {
  const documents = useDocumentListQuery();
  const router = useRouter();

  const handleDocumentClick = <T extends Document>(document: T) => {
    // Handle document click logic here, e.g., navigate to document details
    console.log("Document clicked:", document);
    router.push(`/builder`);
  };

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <FadeIn
          as="h2"
          transition={{ delay: 0.3 }}
          className="text-base md:text-xl font-semibold tracking-tight"
        >
          Recent Documents
        </FadeIn>
        <FadeIn transition={{ delay: 0.4 }}>
          <Button variant={"link"} asChild className="text-xs">
            <Link href="/documents" className="flex items-center gap-1">
              View all <ChevronRight className="w-3 h-3" />
            </Link>
          </Button>
        </FadeIn>
      </div>
      <FadeIn transition={{ delay: 0.3 }} className="w-full">
        <DocumentList
          documents={documents}
          onDocumentClick={handleDocumentClick}
        />
      </FadeIn>
    </div>
  );
};

export default RecentDocumentSection;
