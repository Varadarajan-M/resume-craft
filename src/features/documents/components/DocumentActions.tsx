import { Button } from '@/shared/components/ui/button';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/shared/components/ui/popover';
import { cn } from '@/shared/lib/utils';
import { MoreVertical } from 'lucide-react';

type Action = {
  label: string;
  icon: React.ReactNode;
  onClick: () => void;
  labelClass?: string;
};

interface DocumentActionsProps {
  actions: Action[];
}

const DocumentActions = ({ actions }: DocumentActionsProps) => {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant="secondary"
          size="icon"
          className="bg-transparent"
          onClick={(e) => e.stopPropagation()}
        >
          <MoreVertical className="w-4 h-4" />
        </Button>
      </PopoverTrigger>
      <PopoverContent
        side="bottom"
        align="end"
        className="w-36 p-1 rounded-md shadow-lg border border-border bg-popover text-sm"
        onClick={(e) => e.stopPropagation()}
      >
        {actions.map((action, index) => (
          <button
            key={index}
            className={cn(
              'flex items-center w-full px-3 py-2 rounded-md hover:bg-accent hover:text-accent-foreground transition-colors',
              action?.labelClass
            )}
            onClick={action.onClick}
          >
            {action.icon}
            <span className="ml-2">{action.label}</span>
          </button>
        ))}
      </PopoverContent>
    </Popover>
  );
};

export default DocumentActions;
