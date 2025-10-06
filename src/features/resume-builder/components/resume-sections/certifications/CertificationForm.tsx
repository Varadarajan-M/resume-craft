"use client";

import { useResumeStore } from "@/features/resume-builder/store/resume";
import { Input } from "@/shared/components/ui/input";
import RichTextEditor from "@/shared/components/ui/rich-text-editor";
import { memo } from "react";
import EnhanceWithAI from "../../EnhanceWithAI";
import ResumeItem from "../ResumeItem";
import TwoItemGrid from "../TwoItemGrid";

const CertificationForm = ({ id }: { id: string }) => {
  const cert = useResumeStore((s) =>
    s.resume?.sections.certifications?.find((c) => c.id === id)
  );
  const handleUpdateCertificationItem = useResumeStore(
    (s) => s.updateCertificationItem
  );

  if (!cert) return null;

  return (
    <div className="flex flex-col gap-4">
      <ResumeItem label="Certification Name" itemId={`${id}-name`}>
        <Input
          value={cert.name}
          onChange={(e) =>
            handleUpdateCertificationItem(id, { name: e.target.value })
          }
          placeholder="e.g., AWS Certified Developer"
        />
      </ResumeItem>

      <TwoItemGrid>
        <ResumeItem label="Issuer" itemId={`${id}-issuer`}>
          <Input
            value={cert.issuer}
            onChange={(e) =>
              handleUpdateCertificationItem(id, { issuer: e.target.value })
            }
            placeholder="e.g., Amazon Web Services"
          />
        </ResumeItem>
        <ResumeItem label="Issued Date" itemId={`${id}-date`}>
          <Input
            value={cert.date}
            onChange={(e) =>
              handleUpdateCertificationItem(id, { date: e.target.value })
            }
            placeholder="e.g., June 2023"
          />
        </ResumeItem>
      </TwoItemGrid>

      <TwoItemGrid>
        <ResumeItem label="Expiration Date" itemId={`${id}-expirationDate`}>
          <Input
            value={cert.expirationDate}
            onChange={(e) =>
              handleUpdateCertificationItem(id, {
                expirationDate: e.target.value,
              })
            }
            placeholder="Optional"
          />
        </ResumeItem>
        <ResumeItem label="Credential URL" itemId={`${id}-credentialUrl`}>
          <Input
            value={cert.credentialUrl}
            onChange={(e) =>
              handleUpdateCertificationItem(id, {
                credentialUrl: e.target.value,
              })
            }
            placeholder="https://..."
          />
        </ResumeItem>
      </TwoItemGrid>

      <DescriptionEditor id={id} />
    </div>
  );
};

const DescriptionEditor = memo(({ id }: { id: string }) => {
  const description = useResumeStore(
    (s) =>
      s.resume?.sections.certifications?.find((c) => c.id === id)
        ?.description || ""
  );
  const handleUpdateCertificationItem = useResumeStore(
    (s) => s.updateCertificationItem
  );

  return (
    <ResumeItem label="Description" itemId={`${id}-description`}>
      <EnhanceWithAI
        content={description}
        onEnhance={console.log}
        enhanceDialogTitle="Enhance Certification with AI"
      >
        <RichTextEditor
          content={description}
          onChange={(v) =>
            handleUpdateCertificationItem(id, { description: v })
          }
          placeholder="Mention key highlights, relevance, or what you learned."
        />
      </EnhanceWithAI>
    </ResumeItem>
  );
});

DescriptionEditor.displayName = "DescriptionEditor";

export default CertificationForm;
