import { Button } from "@/components/ui/button";
import { TemplateList } from "@/features/template-listing/components";
import { ChevronRight } from "lucide-react";
import Link from "next/link";

const SuggestedTemplatesSection = () => {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold tracking-tight">
          Suggested Templates
        </h2>
        <Button variant={"link"} asChild className="text-xs">
          <Link href="/templates" className="flex items-center gap-1">
            Browse more <ChevronRight className="w-3 h-3" />
          </Link>
        </Button>
      </div>
      <TemplateList />
    </div>
  );
};

export default SuggestedTemplatesSection;
