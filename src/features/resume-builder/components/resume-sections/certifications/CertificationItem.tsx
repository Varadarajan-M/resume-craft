import { useResumeStore } from "@/features/resume-builder/store/resume";
import { TooltipButton } from "@/shared/components/common/ToolTipButton";
import { Copy } from "lucide-react";
import ResumeItem from "../ResumeItem";
import { DeleteButton } from "@/shared/components/common/DeleteButton";
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
          <TooltipButton
            icon={Copy}
            tooltipText="Duplicate Certification"
            onClick={() => handleDuplicateCertificationItem(id)}
            variant="ghost"
          />
          <DeleteButton
            onDelete={() => handleDeleteCertificationItem(id)}
            tooltipText="Delete Certification"
            variant="ghost"
          />
        </div>
      )}
    >
      <CertificationForm id={id} />
    </ResumeItem>
  );
};

export default CertificationItem;
