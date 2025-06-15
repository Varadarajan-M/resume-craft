import { Button } from "@/shared/components/ui/button";
import { cn } from "@/shared/lib/utils";
import { Plus } from "lucide-react";

const AddNewButton = ({
  onClick,
  label,
  className,
}: {
  onClick: () => void;
  label: React.ReactNode;
  className?: string;
}) => {
  return (
    <Button
      onClick={onClick}
      variant="outline"
      size="sm"
      className={cn("w-fit text-xs md:text-sm", className)}
    >
      <Plus className="w-4 h-4 mr-1" />
      {label}
    </Button>
  );
};

export default AddNewButton;
