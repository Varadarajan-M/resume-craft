import { LucideLightbulb } from "lucide-react";

const Tip = ({ children }: { children: React.ReactNode }) => (
  <div className="rounded-md my-1 text-xs text-muted-foreground bg-yellow-50 dark:bg-[#0d0f0c] p-3">
    <LucideLightbulb className="inline w-4 h-4 fill-yellow-200 stroke-yellow-500" />
    <span>Tip:</span> {children}
  </div>
);
export default Tip;
