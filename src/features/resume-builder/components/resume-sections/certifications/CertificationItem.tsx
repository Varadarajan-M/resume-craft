import { useResumeStore } from "@/features/resume-builder/store/resume";
import { Button } from "@/shared/components/ui/button";
import { Copy, Trash2 } from "lucide-react";
import ResumeItem from "../ResumeItem";
import CertificationForm from "./CertificationForm";

const CertificationItem = ({ id, index }: { id: string; index: number }) => {
  const handleDeleteCertificationItem = useResumeStore(
    (s) => s.deleteCertificationItem
  );
  const handleDuplicateCertificationItem = useResumeStore(
    (s) => s.duplicateCertificationItem
  );

  return (
    <ResumeItem
      label={`Certification ${index + 1}`}
      labelClassName="text-sm font-semibold"
      itemId={id}
      className="flex flex-col gap-4"
      renderHeaderAction={() => (
        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => handleDuplicateCertificationItem(id)}
          >
            <Copy className="w-4 h-4" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => handleDeleteCertificationItem(id)}
            className="text-red-500 hover:text-red-700"
          >
            <Trash2 className="w-4 h-4" />
          </Button>
        </div>
      )}
    >
      <CertificationForm id={id} />
    </ResumeItem>
  );
};

export default CertificationItem;
