import { Skeleton } from "@/shared/components/ui/skeleton";
import { cn } from "@/shared/lib/utils";

interface PreviewSkeletonProps {
  className?: string;
}
const PageSkeleton = ({ className }: PreviewSkeletonProps) => (
  <Skeleton className={cn("w-full h-[3508px] rounded-lg", className)} />
);

export default PageSkeleton;
