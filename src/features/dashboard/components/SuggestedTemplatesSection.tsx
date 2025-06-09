import { ChevronRight } from "lucide-react";
import Link from "next/link";

import { TemplateList, useTemplatesQuery } from "@/features/templates";
import { FadeIn } from "@/shared/components/animated/FadeIn";
import { Button } from "@/shared/components/ui/button";

const SuggestedTemplatesSection = () => {
  const templates = useTemplatesQuery();
  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <FadeIn
          as="h2"
          transition={{ delay: 0.3 }}
          className="text-base md:text-xl font-bold tracking-tight"
        >
          Suggested Templates
        </FadeIn>
        <Button variant={"link"} asChild className="text-xs">
          <FadeIn as="span" transition={{ delay: 0.4 }}>
            <Link href="/templates" className="flex items-center gap-1">
              Browse more <ChevronRight className="w-3 h-3" />
            </Link>
          </FadeIn>
        </Button>
      </div>
      <FadeIn transition={{ delay: 0.3 }} className="w-full">
        <TemplateList templates={templates} />
      </FadeIn>
    </div>
  );
};

export default SuggestedTemplatesSection;
