"use client";
import { Button } from "@/shared/components/ui/button";
import { Input } from "@/shared/components/ui/input";
import {
  defaultLayoutPlugin,
  ToolbarSlot,
} from "@react-pdf-viewer/default-layout";
import { Minus, Plus } from "lucide-react";
import dynamic from "next/dynamic";
import { useState } from "react";

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
            <slots.Search>
              {(searchProps) => {
                const [readyToSearch, setReadyToSearch] = useState(false);

                return (
                  <div className="flex items-center gap-2">
                    {/* Search Input */}
                    <div className="flex items-center border border-border rounded overflow-hidden">
                      <Input
                        className="px-2 py-1 w-48 text-sm border-none focus-visible:ring-0"
                        placeholder="Search..."
                        value={searchProps.keyword}
                        onChange={(e) => {
                          setReadyToSearch(false);
                          searchProps.setKeyword(e.target.value);
                        }}
                        onKeyDown={(e) => {
                          if (e.key === "Enter" && searchProps.keyword) {
                            setReadyToSearch(true);
                            searchProps.search();
                          }
                        }}
                      />

                      <Button
                        variant={searchProps.matchCase ? "default" : "ghost"}
                        size="sm"
                        onClick={() =>
                          searchProps.changeMatchCase(!searchProps.matchCase)
                        }
                        title="Match case"
                        className="rounded-none"
                      >
                        Aa
                      </Button>
                    </div>

                    {/* Search status */}
                    {readyToSearch && searchProps.keyword && (
                      <span className="text-xs text-muted-foreground">
                        {searchProps.numberOfMatches === 0
                          ? "Not found"
                          : `${searchProps.currentMatch} of ${searchProps.numberOfMatches}`}
                      </span>
                    )}

                    {/* Navigation buttons */}
                    {searchProps.numberOfMatches > 0 && (
                      <>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={searchProps.jumpToPreviousMatch}
                          title="Previous match"
                        >
                          Prev
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={searchProps.jumpToNextMatch}
                          title="Next match"
                        >
                          Next
                        </Button>
                      </>
                    )}
                  </div>
                );
              }}
            </slots.Search>
          </div>
        )}
      </Toolbar>
    ),
  });

  return <Viewer fileUrl={fileUrl} plugins={[defaultLayoutPluginInstance]} />;
}
