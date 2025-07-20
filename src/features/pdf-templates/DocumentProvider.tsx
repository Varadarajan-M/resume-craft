import { BlobProvider } from "@react-pdf/renderer";
import { PDFPreview } from "../resume-builder/components/resume-preview";

interface DocumentProviderProps {
  // resume: ResumeTemplateComponentProps["resume"];
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
