"use client";

const BlobProvider = dynamic(() =>
  import("@react-pdf/renderer").then((module) => module.BlobProvider)
);

import dynamic from "next/dynamic";
import React from "react";
import { PDFPreview } from "../resume-builder/components/resume-preview";

interface DocumentProviderProps {
  children: React.JSX.Element;
}

const DocumentProvider = ({ children }: DocumentProviderProps) => {
  return (
    <BlobProvider document={children}>
      {({ url }) => {
        if (url)
          return (
            <div className="h-screen w-full" data-pdf-blob-url={url}>
              <PDFPreview fileUrl={url ?? ""} />
            </div>
          );
      }}
    </BlobProvider>
  );
};

export default DocumentProvider;
