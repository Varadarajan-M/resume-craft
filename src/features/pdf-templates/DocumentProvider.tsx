import { ResumeTemplateComponentProps } from "@/shared/types/resume";
import { BlobProvider } from "@react-pdf/renderer";
import { useEffect, useRef } from "react";
import { PDFPreview } from "../resume-builder/components/resume-preview";

interface DocumentProviderProps {
  resume: ResumeTemplateComponentProps["resume"];
  children: React.JSX.Element;
}

const DocumentProvider = ({ resume, children }: DocumentProviderProps) => {
  const ref = useRef<number>(0);

  useEffect(() => {
    // Force re-render when resume changes
    ref.current += 1; // Increment the ref to trigger re-render
  }, [resume]);

  return (
    <BlobProvider document={children} key={ref.current}>
      {({ url, loading }) => {
        if (loading) return <p>Loading PDF...</p>;
        return (
          <>
            <PDFPreview fileUrl={url ?? ""} />
          </>
        );
      }}
    </BlobProvider>
  );
};

export default DocumentProvider;
