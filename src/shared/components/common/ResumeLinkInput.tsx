// components/ResumeLinkInput.tsx
import { Button } from "@/shared/components/ui/button";
import { Input } from "@/shared/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/shared/components/ui/popover";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/shared/components/ui/tooltip";
import { kebabToPascalCase } from "@/shared/lib/utils";
import { Trash2 } from "lucide-react";
import * as lucideIcons from "lucide-static";
import { useState } from "react";

type ResumeLinkInputProps = {
  id: string;
  label: string;
  url: string;
  iconName?: string;
  onChange: (
    id: string,
    field: "label" | "url" | "iconName",
    value: string
  ) => void;
  onRemove: (id: string) => void;
};

export function ResumeLinkInput({
  id,
  label,
  url,
  iconName = "link",
  onChange,
  onRemove,
}: ResumeLinkInputProps) {
  const [open, setOpen] = useState(false);
  const iconKey = kebabToPascalCase(iconName);
  const svgString = (lucideIcons as Record<string, string>)[iconKey];

  // Minimal rendering of static SVG
  const iconPreview = svgString ? (
    <span
      className="inline-block w-4 h-4"
      dangerouslySetInnerHTML={{ __html: svgString }}
    />
  ) : (
    <span className="text-xs">?</span>
  );

  return (
    <div className="grid grid-cols-2 md:[grid-template-columns:30px_1fr_1fr_30px] items-center gap-4">
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="ghost"
            size="icon"
            className="text-black hover:text-gray-700"
          >
            <Tooltip>
              <TooltipTrigger asChild>{iconPreview}</TooltipTrigger>
              <TooltipContent>
                {iconName ? `Icon: ${iconName}` : "Select Icon"}
              </TooltipContent>
            </Tooltip>
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-52 ms-2.5" side="top">
          <div className="space-y-2">
            <label className="text-xs font-medium text-gray-500">
              Icon Name (e.g. <code>linkedin</code>)
            </label>
            <Input
              value={iconName}
              onChange={(e) => onChange(id, "iconName", e.target.value)}
              placeholder="lucide icon slug"
            />
            <p className="text-xs text-gray-500">
              Browse at{" "}
              <a
                href="https://lucide.dev/icons"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-500 underline"
              >
                lucide.dev/icons
              </a>
            </p>
          </div>
        </PopoverContent>
      </Popover>

      <Input
        value={label}
        onChange={(e) => onChange(id, "label", e.target.value)}
        placeholder="Link Label"
        className="col-span-3 md:col-span-1"
      />
      <Input
        value={url}
        onChange={(e) => onChange(id, "url", e.target.value)}
        placeholder="https://example.com"
        type="url"
        className="col-span-2 md:col-span-1"
      />

      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => onRemove(id)}
            className="text-red-500 hover:text-red-700 justify-self-end"
          >
            <Trash2 className="w-4 h-4" />
          </Button>
        </TooltipTrigger>
        <TooltipContent>Delete Link</TooltipContent>
      </Tooltip>
    </div>
  );
}
