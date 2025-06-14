import { Label } from "@/shared/components/ui/label";
import { cn } from "@/shared/lib/utils";
import React from "react";

interface ResumeItemProps {
  children: React.ReactNode;
  itemId: string;
  label: string;
  description?: React.ReactNode;
  className?: string;
  labelClassName?: string;
}
const ResumeItem = ({
  label,
  itemId,
  children,
  className,
  description,
  labelClassName,
}: ResumeItemProps) => {
  return (
    <div
      className={cn("flex flex-col gap-1.5 px-1", className)}
      aria-label={`This item represents ${label} of the resume`}
    >
      <Label
        className={cn("text-sm text-foreground font-medium", labelClassName)}
        htmlFor={itemId}
      >
        {label}
      </Label>
      {description && (
        <small className="text-xs -mt-1 text-muted-foreground ">
          {description}
        </small>
      )}
      {children}
    </div>
  );
};

export default ResumeItem;
