"use client";
import { defaultLayoutPlugin } from "@react-pdf-viewer/default-layout";
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
    renderToolbar: () => <></>,
  });

  return <Viewer fileUrl={fileUrl} plugins={[defaultLayoutPluginInstance]} />;
}
