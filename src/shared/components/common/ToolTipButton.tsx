import { Button } from "@/shared/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/shared/components/ui/tooltip";
import { cn } from "@/shared/lib/utils";
import { LucideIcon } from "lucide-react";
import React, { ComponentProps } from "react";

interface TooltipButtonProps extends ComponentProps<typeof Button> {
  icon: LucideIcon;
  tooltipText: string;
  iconProps?: React.ComponentPropsWithoutRef<"svg">;
  side?: ComponentProps<typeof TooltipContent>["side"];
}

export const TooltipButton: React.FC<TooltipButtonProps> = ({
  icon: Icon,
  tooltipText,
  onClick,
  variant = "ghost",
  iconProps = {},
  side = "top",
  ...props
}) => {
  const baseIconClasses = "h-4 w-4";

  const { className: customClassString, ...otherIconProps } = iconProps;

  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <Button
          variant={variant}
          size="icon"
          onClick={onClick}
          {...props}
        >
          <Icon {...otherIconProps} className={cn(baseIconClasses, customClassString)} />
        </Button>
      </TooltipTrigger>
      <TooltipContent sideOffset={5} side={side}>{tooltipText}</TooltipContent>
    </Tooltip>
  );
};
