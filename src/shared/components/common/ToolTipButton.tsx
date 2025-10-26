import React from "react";
import { Button } from "@/shared/components/ui/button";
import { Tooltip, TooltipTrigger, TooltipContent } from "@/shared/components/ui/tooltip";

interface TooltipButtonProps {
  buttonIcon: React.ReactNode;
  tooltipText: string;
  onClickAction: () => void;
  variant?: "default" | "secondary" | "ghost" | "link" | "outline" | "destructive";
}

export const TooltipButton: React.FC<TooltipButtonProps> = ({
  buttonIcon,
  tooltipText,
  onClickAction,
  variant = "ghost", // Default to 'ghost' if not provided
}) => {
  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <Button
          variant={variant}
          size="icon"
          onClick={onClickAction}
        >
          {buttonIcon}
        </Button>
      </TooltipTrigger>
      <TooltipContent sideOffset={5}>
        {tooltipText}
      </TooltipContent>
    </Tooltip>
  );
};