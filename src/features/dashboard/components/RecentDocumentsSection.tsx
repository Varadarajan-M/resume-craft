"use client";

import { DocumentList, useDocumentListQuery } from "@/features/documents";
import { FadeIn } from "@/shared/components/animated/FadeIn";
import { Button } from "@/shared/components/ui/button";
import { ChevronRight } from "lucide-react";
import Link from "next/link";

const RecentDocumentSection = () => {
  const documents = useDocumentListQuery();

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <FadeIn
          as="h2"
          transition={{ delay: 0.3 }}
          className="text-base md:text-xl font-bold tracking-tight"
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
        <DocumentList documents={documents} />
      </FadeIn>
    </div>
  );
};

export default RecentDocumentSection;
