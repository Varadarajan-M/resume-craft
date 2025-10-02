import { TapAnimationButton } from "@/shared/components/animated/TapAnimationButton";
import { Button } from "@/shared/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/shared/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTrigger,
} from "@/shared/components/ui/dialog";
import RichTextEditor from "@/shared/components/ui/rich-text-editor";
import { Skeleton } from "@/shared/components/ui/skeleton";
import { AIContentSuggestion } from "@/shared/types/ai";
import { SparklesIcon } from "lucide-react";
import React from "react";
import useContentEnhancerQuery from "../hooks/useContentEnhancerQuery";

interface EnhanceWithAIProps {
  children: React.ReactNode;
  content: string;
  onEnhance: (enhancedContent: string) => void;
  enhanceDialogTitle?: string;
}

interface DialogContentProps {
  suggestions: AIContentSuggestion[];
  onApply: (suggestionContent: string) => void;
}

const AISuggestionsContent = ({ suggestions, onApply }: DialogContentProps) => {
  return (
    <div className="flex flex-col gap-4">
      {suggestions.map((suggestion, index) => (
        <Card
          key={suggestion.id}
          className="w-full min-h-[unset] bg-background text-foreground gap-3 px-2 py-4"
        >
          <CardHeader className="px-2">
            <h3 className="text-sm font-semibold">{`Suggestion ${
              index + 1
            }`}</h3>
          </CardHeader>
          <CardContent className="max-h-max px-2">
            <RichTextEditor
              showToolbar={false}
              content={suggestion.content}
              readOnly
              rootClassName="no-border"
              className="max-h-unset"
            />
          </CardContent>
          <CardFooter className="flex justify-end p-2">
            <TapAnimationButton>
              <Button
                size="sm"
                variant="default"
                onClick={() => onApply(suggestion?.content)}
                className="text-xs flex items-center"
              >
                <SparklesIcon className="mr-1 h-3 w-3" />
                Apply
              </Button>
            </TapAnimationButton>
          </CardFooter>
        </Card>
      ))}
    </div>
  );
};

const AISuggestionsSkeleton = () => {
  return (
    <div className="flex flex-col gap-4">
      {Array.from({ length: 3 }).map((_, index) => (
        <Card
          key={index}
          className="w-full min-h-[unset] bg-background text-foreground gap-3 px-2 py-4"
        >
          <CardHeader className="px-2">
            <Skeleton className="h-4 w-32" />
          </CardHeader>
          <CardContent className="px-2 space-y-2">
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-11/12" />
            <Skeleton className="h-4 w-3/4" />
          </CardContent>
          <CardFooter className="flex justify-end p-2">
            <Skeleton className="h-6 w-16 rounded-md" />
          </CardFooter>
        </Card>
      ))}
    </div>
  );
};

const EnhanceWithAI = (props: EnhanceWithAIProps) => {
  const {
    children,
    content,
    onEnhance,
    enhanceDialogTitle = "Enhance with AI",
  } = props;

  const [open, setOpen] = React.useState(false);
  const [renderKey, setRenderKey] = React.useState(0);

  const { data, isLoading } = useContentEnhancerQuery({
    content,
    enabled: open,
  });

  return (
    <div className="flex flex-col gap-4">
      <div key={renderKey}>{children}</div>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger className="self-end">
          <TapAnimationButton className="w-fit self-end">
            <Button size={"sm"} variant="secondary">
              <SparklesIcon className="mr-1 h-2 w-2" />
              <span className="text-xs"> Enhance with AI</span>
            </Button>
          </TapAnimationButton>
        </DialogTrigger>
        <DialogContent className="max-w-2xl overflow-auto max-h-[80dvh]">
          <DialogHeader className="text-base font-semibold">
            {enhanceDialogTitle}
          </DialogHeader>
          {isLoading ? (
            <>
              <AISuggestionsSkeleton />
            </>
          ) : (
            <AISuggestionsContent
              suggestions={Array.isArray(data) ? data : []}
              onApply={(v) => {
                setRenderKey((rk) => rk + 1);
                onEnhance(v);
                setOpen(false);
              }}
            />
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default EnhanceWithAI;
