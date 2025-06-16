import { Button } from "@/shared/components/ui/button";
import { type ResumeCertificationItem } from "@/shared/types/resume";
import { Copy, Trash2 } from "lucide-react";
import { ReactNode } from "react";
import ResumeItem from "../ResumeItem";

interface CertificationItemProps {
  certification: ResumeCertificationItem;
  index: number;
  onDeleteCertification: (id: string) => void;
  onDuplicateCertification: (
    id: string,
    index: number,
    cert: ResumeCertificationItem
  ) => void;
  children: ReactNode;
}

const CertificationItemActions = ({
  index,
  onDeleteCertification,
  onDuplicateCertification,
  certification,
}: Omit<CertificationItemProps, "children">) => (
  <div className="flex items-center gap-2">
    <Button
      variant="ghost"
      size="icon"
      onClick={() =>
        onDuplicateCertification(certification.id, index, certification)
      }
      title="Duplicate Certification"
    >
      <Copy className="w-4 h-4" />
    </Button>
    <Button
      variant="ghost"
      size="icon"
      onClick={() => onDeleteCertification(certification.id)}
      title="Delete Certification"
      className="text-red-500 hover:text-red-700"
    >
      <Trash2 className="w-4 h-4" />
    </Button>
  </div>
);

const CertificationItem = ({
  certification,
  index,
  onDeleteCertification,
  onDuplicateCertification,
  children,
}: CertificationItemProps) => {
  return (
    <ResumeItem
      label={`Certification ${index + 1}`}
      labelClassName="text-sm font-semibold"
      itemId={certification.id}
      className="flex flex-col gap-4"
      renderHeaderAction={() => (
        <CertificationItemActions
          index={index}
          certification={certification}
          onDeleteCertification={onDeleteCertification}
          onDuplicateCertification={onDuplicateCertification}
        />
      )}
    >
      {children}
    </ResumeItem>
  );
};

export default CertificationItem;
