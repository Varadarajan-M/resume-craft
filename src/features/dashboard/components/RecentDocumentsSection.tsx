import { DocumentList, useDocumentListQuery } from "@/features/documents";
import { Button } from "@/shared/components/ui/button";
import { ChevronRight } from "lucide-react";
import Link from "next/link";

const RecentDocumentSection = () => {
  const documents = useDocumentListQuery();

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <h2 className="text-base md:text-xl font-bold tracking-tight">
          Recent Documents
        </h2>
        <Button variant={"link"} asChild className="text-xs">
          <Link href="/documents" className="flex items-center gap-1">
            View all <ChevronRight className="w-3 h-3" />
          </Link>
        </Button>
      </div>
      <DocumentList documents={documents} />
    </div>
  );
};

export default RecentDocumentSection;
