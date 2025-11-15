import { Input } from '@/shared/components/ui/input';
import { cn } from '@/shared/lib/utils';

interface DocumentSearchProps {
  className?: string;
  onChange?: (value: string) => void;
}

const DocumentSearch = ({ className, onChange }: DocumentSearchProps) => {
  return (
    <Input
      className={cn(
        'w-full max-w-md text-xs md:text-sm',
        'bg-white dark:bg-neutral-950 text-neutral-900 dark:text-neutral-100',
        'border border-neutral-300 dark:border-neutral-700 focus:border-blue-500 focus:ring-blue-500',
        'placeholder:text-neutral-500 dark:placeholder:text-neutral-400',
        className
      )}
      placeholder="Search your documents..."
      type="search"
      onChange={(e) => onChange?.(e.target.value)}
    />
  );
};

export default DocumentSearch;
