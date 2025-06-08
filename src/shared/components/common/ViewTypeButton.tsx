import { Button } from "@/shared/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/shared/components/ui/tooltip";

const ViewTypeButton = ({
  active,
  icon: Icon,
  tooltipText,
  onClick = () => {},
}: {
  active: boolean;
  icon: React.ComponentType<{ className?: string }>;
  onClick?: () => void;
  tooltipText?: string;
}) => (
  <Tooltip>
    <TooltipTrigger asChild>
      <Button
        variant={active ? "default" : "secondary"}
        size="sm"
        onClick={onClick}
      >
        {<Icon className="h-4 w-4" />}
      </Button>
    </TooltipTrigger>
    <TooltipContent className="w-max">{tooltipText}</TooltipContent>
  </Tooltip>
);

export default ViewTypeButton;
