"use client";
import { Button } from "@/shared/components/ui/button";
import {
  defaultLayoutPlugin,
  ToolbarSlot,
} from "@react-pdf-viewer/default-layout";
import { Minus, Plus } from "lucide-react";
import dynamic from "next/dynamic";

const Viewer = dynamic(
  () => import("@react-pdf-viewer/core").then((mod) => mod.Viewer),
  { ssr: false }
);

interface Props {
  fileUrl: string;
}

export default function PDFPreview({ fileUrl }: Props) {
  const defaultLayoutPluginInstance = defaultLayoutPlugin({
    // Remove all sidebar tabs:
    sidebarTabs: () => [],

    // Customize toolbar: hide download, print, full screen

    // Fully custom toolbar

    renderToolbar: (Toolbar) => (
      <Toolbar>
        {(slots: ToolbarSlot) => (
          <div className="flex items-center justify-between w-full py-2 bg-transparent text-foreground">
            {/* Left side: Zoom Controls */}
            <div className="flex items-center gap-2">
              <slots.ZoomOut>
                {(props) => (
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={props.onClick}
                    title="Zoom Out"
                  >
                    <Minus className="h-4 w-4" />
                  </Button>
                )}
              </slots.ZoomOut>

              <slots.ZoomIn>
                {(props) => (
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={props.onClick}
                    title="Zoom In"
                  >
                    <Plus className="h-4 w-4" />
                  </Button>
                )}
              </slots.ZoomIn>
            </div>

            {/* Right side: Search Box */}
          </div>
        )}
      </Toolbar>
    ),
  });

  return <Viewer fileUrl={fileUrl} plugins={[defaultLayoutPluginInstance]} />;
}
