"use client";

import { useResumeStore } from "@/features/resume-builder/store/resume";
import Tip from "@/shared/components/common/Tip";
import AddNewButton from "../AddNewItemButton";
import ResumeSection from "../ResumeSection";
import CertificationItem from "./CertificationItem";

import { RESUME_BUILDER_SECTIONS } from "@/features/resume-builder/lib/constants";

const { icon: SectionIcon, ...rest } = RESUME_BUILDER_SECTIONS.certifications;

const sectionConfig = {
  ...rest,
  icon: <SectionIcon className="w-4 h-4" />,
};

const CertificationSection = () => {
  const certifications = useResumeStore(
    (s) => s.resume?.sections?.certifications
  );
  const handleAddCertificationItem = useResumeStore(
    (s) => s.addCertificationItem
  );

  return (
    <ResumeSection {...sectionConfig}>
      {certifications?.map((cert, index) => (
        <CertificationItem key={cert.id} id={cert.id} index={index} />
      ))}

      <AddNewButton
        className="ml-1"
        onClick={handleAddCertificationItem}
        label="Add Certification"
      />

      <Tip>
        Add certifications that validate your skills and accomplishments.
        Include issuer, dates, and optionally a credential URL.
      </Tip>
    </ResumeSection>
  );
};

export default CertificationSection;
