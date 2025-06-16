// CertificationSection.tsx

"use client";

import { BadgeCheck } from "lucide-react";
import { useState } from "react";

import Tip from "@/shared/components/common/Tip";
import AddNewButton from "../AddNewItemButton";
import ResumeSection from "../ResumeSection";

import { type ResumeCertificationItem } from "@/shared/types/resume";
import CertificationForm from "./CertificationForm";
import CertificationItem from "./CertificationItem";

const createNewCertificationItem = (): ResumeCertificationItem => ({
  id: "cert-" + Math.random().toString(36).substr(2, 9),
  name: "",
  issuer: "",
  date: "",
  expirationDate: "",
  credentialUrl: "",
  description: "",
});

const CertificationSection = () => {
  const [certifications, setCertifications] = useState<
    ResumeCertificationItem[]
  >([createNewCertificationItem()]);

  const handleAddCertification = () => {
    setCertifications((prev) => [...prev, createNewCertificationItem()]);
  };

  const handleCertificationChange = (
    id: string,
    key: keyof ResumeCertificationItem,
    value: string
  ) =>
    setCertifications((prev) =>
      prev.map((cert) => (cert.id === id ? { ...cert, [key]: value } : cert))
    );

  const handleDeleteCertification = (id: string) =>
    setCertifications((prev) => prev.filter((cert) => cert.id !== id));

  const handleDuplicateCertification = (
    id: string,
    index: number,
    cert: ResumeCertificationItem
  ) => {
    const newCert = {
      ...cert,
      name: cert.name + " (Copy)",
      id: "cert-" + Math.random().toString(36).substr(2, 9),
    };
    setCertifications((prev) => {
      const updated = [...prev];
      updated.splice(index + 1, 0, newCert);
      return updated;
    });
  };

  return (
    <ResumeSection
      icon={<BadgeCheck className="w-4 h-4" />}
      title="Certifications"
      subtitle="Relevant certifications and credentials."
    >
      {certifications.map((cert, index) => (
        <CertificationItem
          key={cert.id}
          certification={cert}
          index={index}
          onDeleteCertification={handleDeleteCertification}
          onDuplicateCertification={handleDuplicateCertification}
        >
          <CertificationForm
            certification={cert}
            onCertificationChange={(key, value) =>
              handleCertificationChange(cert.id, key, value)
            }
          />
        </CertificationItem>
      ))}

      <AddNewButton
        className="ml-1"
        onClick={handleAddCertification}
        label={"Add Certification"}
      />

      <Tip>
        Add certifications that validate your skills and accomplishments.
        Include issuer, dates, and optionally a credential URL.
      </Tip>
    </ResumeSection>
  );
};

export default CertificationSection;
