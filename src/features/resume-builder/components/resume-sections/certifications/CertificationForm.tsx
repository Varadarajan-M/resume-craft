import { Input } from "@/shared/components/ui/input";
import RichTextEditor from "@/shared/components/ui/rich-text-editor";
import { type ResumeCertificationItem } from "@/shared/types/resume";
import ResumeItem from "../ResumeItem";
import TwoItemGrid from "../TwoItemGrid";

interface CertificationFormProps {
  certification: ResumeCertificationItem;
  onCertificationChange: (
    key: keyof ResumeCertificationItem,
    value: string
  ) => void;
}

const CertificationForm = ({
  certification,
  onCertificationChange,
}: CertificationFormProps) => {
  return (
    <div className="flex flex-col gap-4">
      <ResumeItem
        label="Certification Name"
        itemId={`${certification.id}-name`}
        className="p-0"
      >
        <Input
          id={`${certification.id}-name`}
          value={certification.name}
          onChange={(e) => onCertificationChange("name", e.target.value)}
          placeholder="e.g., AWS Certified Developer"
        />
      </ResumeItem>

      <TwoItemGrid>
        <ResumeItem
          label="Issuer"
          itemId={`${certification.id}-issuer`}
          className="p-0"
        >
          <Input
            id={`${certification.id}-issuer`}
            value={certification.issuer}
            onChange={(e) => onCertificationChange("issuer", e.target.value)}
            placeholder="e.g., Amazon Web Services"
          />
        </ResumeItem>

        <ResumeItem
          label="Issued Date"
          itemId={`${certification.id}-date`}
          className="p-0"
        >
          <Input
            id={`${certification.id}-date`}
            value={certification.date}
            onChange={(e) => onCertificationChange("date", e.target.value)}
            placeholder="e.g., June 2023"
          />
        </ResumeItem>
      </TwoItemGrid>

      <TwoItemGrid>
        <ResumeItem
          label="Expiration Date"
          itemId={`${certification.id}-expirationDate`}
          className="p-0"
        >
          <Input
            id={`${certification.id}-expirationDate`}
            value={certification.expirationDate}
            onChange={(e) =>
              onCertificationChange("expirationDate", e.target.value)
            }
            placeholder="Optional"
          />
        </ResumeItem>

        <ResumeItem
          label="Credential URL"
          itemId={`${certification.id}-credentialUrl`}
          className="p-0"
        >
          <Input
            id={`${certification.id}-credentialUrl`}
            value={certification.credentialUrl}
            onChange={(e) =>
              onCertificationChange("credentialUrl", e.target.value)
            }
            placeholder="https://..."
          />
        </ResumeItem>
      </TwoItemGrid>

      <ResumeItem
        label="Description"
        itemId={`${certification.id}-description`}
        className="p-0"
      >
        <RichTextEditor
          id={`${certification.id}-description`}
          content={certification.description}
          onChange={(v) => onCertificationChange("description", v)}
          placeholder="Mention key highlights, relevance, or what you learned."
        />
      </ResumeItem>
    </div>
  );
};

export default CertificationForm;
