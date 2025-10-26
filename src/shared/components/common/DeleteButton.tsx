import { Trash2 } from "lucide-react";
import { TooltipButton } from "./ToolTipButton";

export const DELETE_ICON_PROPS = {
  className: "text-red-500 hover:text-red-600",
};

interface DeleteButtonProps {
  onDelete: () => void;
  tooltipText: string;
  ariaLabel?: string;
  variant?: "ghost" | "destructive";
}

export const DeleteButton = ({
  onDelete,
  tooltipText,
  variant = "ghost",
}: DeleteButtonProps) => (
  <TooltipButton
    icon={Trash2}
    tooltipText={tooltipText}
    onClick={onDelete}
    variant={variant}
    iconProps={DELETE_ICON_PROPS}
  />
);
