import { Skeleton } from "@/shared/components/ui/skeleton";

const Loading = () => {
  return (
    <div className="flex items-center justify-center h-[600px]">
      <Skeleton className="h-[600px] w-full" />
    </div>
  );
};

export default Loading;
