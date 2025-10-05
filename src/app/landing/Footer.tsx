import ResumeCraftBrand from "@/shared/components/common/ResumeCraftBrand";

export function Footer() {
  return (
    <footer className="border-t border-border/40 py-12">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <ResumeCraftBrand className="text-lg" />
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} ResumeCraft. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
