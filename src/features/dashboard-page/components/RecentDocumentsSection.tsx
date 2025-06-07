import { Button } from "@/components/ui/button";
import { DocumentList } from "@/features/document-listing/components";
import { ChevronRight } from "lucide-react";
import Link from "next/link";

const RecentDocumentSection = () => {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold tracking-tight">Recent Documents</h2>
        <Button variant={"link"} asChild className="text-xs">
          <Link href="/documents" className="flex items-center gap-1">
            View all <ChevronRight className="w-3 h-3" />
          </Link>
        </Button>
      </div>
      <DocumentList numberOfDocuments={0} />
    </div>
  );
};

export default RecentDocumentSection;
