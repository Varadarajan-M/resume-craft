import { ChevronRight } from "lucide-react";
import Link from "next/link";

import { TemplateList, useTemplatesQuery } from "@/features/templates";
import { Button } from "@/shared/components/ui/button";

const SuggestedTemplatesSection = () => {
  const templates = useTemplatesQuery();
  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <h2 className="text-base md:text-xl font-bold tracking-tight">
          Suggested Templates
        </h2>
        <Button variant={"link"} asChild className="text-xs">
          <Link href="/templates" className="flex items-center gap-1">
            Browse more <ChevronRight className="w-3 h-3" />
          </Link>
        </Button>
      </div>
      <TemplateList templates={templates} />
    </div>
  );
};

export default SuggestedTemplatesSection;
