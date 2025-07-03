import { BlobProvider } from "@react-pdf/renderer";
import { PDFPreview } from "../resume-builder/components/resume-preview";

interface DocumentProviderProps {
  // resume: ResumeTemplateComponentProps["resume"];
  children: React.JSX.Element;
}

const DocumentProvider = ({ children }: DocumentProviderProps) => {
  return (
    <BlobProvider document={children} key={Date.now()}>
      {({ url, loading }) => {
        if (url)
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
