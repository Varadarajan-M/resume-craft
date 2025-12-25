"use client";

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
import { usePosthog } from "@/shared/hooks/usePosthog";
import { POSTHOG_EVENTS } from "@/shared/lib/constants";
import { AIContentSuggestion } from "@/shared/types/ai";
import { SparklesIcon } from "lucide-react";
import React, { useEffect } from "react";
import useContentEnhancerQuery from "../hooks/useContentEnhancerQuery";

interface EnhanceWithAIProps {
  /** The content to be enhanced. */
  children: React.ReactNode;
  /** The string content that the AI will use to generate suggestions. */
  content: string;
  /** Callback triggered when a suggestion is applied. */
  onEnhance: (enhancedContent: string) => void;
  /** Optional title for the enhancement dialog. */
  enhanceDialogTitle?: string;
}

interface AISuggestionsContentProps {
  suggestions: AIContentSuggestion[];
  onApply: (suggestionContent: string) => void;
}

/**
 * Renders the list of AI-generated content suggestions.
 */
const AISuggestionsContent = ({
  suggestions,
  onApply,
}: AISuggestionsContentProps) => {
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

/**
 * Skeleton loader for AI suggestions.
 */
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

/**
 * EnhanceWithAI component provides an interface to improve resume sections using AI suggestions.
 * It opens a dialog with suggestions generated based on the provided content.
 */
const EnhanceWithAI = ({
  children,
  content,
  onEnhance,
  enhanceDialogTitle = "Enhance with AI",
}: EnhanceWithAIProps) => {
  const [open, setOpen] = React.useState(false);
  const [renderKey, setRenderKey] = React.useState(0);

  const { data, isLoading } = useContentEnhancerQuery({
    content,
    enabled: open,
  });

  const { captureEvent } = usePosthog();

  // Track usage when the dialog opens with content
  useEffect(() => {
    if (open && content?.trim().length > 0) {
      captureEvent(POSTHOG_EVENTS.ENHANCE_WITH_AI_USED);
    }
  }, [open, captureEvent, content]);

  return (
    <div className="flex flex-col gap-4">
      <div key={renderKey}>{children}</div>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <TapAnimationButton className="w-fit self-end">
            <Button
              size={"sm"}
              variant="secondary"
              className="animate-pulse"
              onClick={() => setOpen(true)}
            >
              <SparklesIcon className="mr-1 h-3 w-3 dark:text-yellow-300" />
              <span className="text-xs"> Enhance with AI</span>
            </Button>
          </TapAnimationButton>
        </DialogTrigger>
        <DialogContent className="max-w-2xl overflow-auto max-h-[80dvh]">
          <DialogHeader className="text-sm font-semibold">
            {enhanceDialogTitle}
          </DialogHeader>
          {isLoading ? (
            <AISuggestionsSkeleton />
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
