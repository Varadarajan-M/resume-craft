'use client';

import { Grid, List } from 'lucide-react';

import ViewTypeButton from '@/shared/components/common/ViewTypeButton';
import DocumentList from './DocumentList';
import DocumentSearch from './DocumentSearch';

import { useResumeStore } from '@/features/resume-builder/store/resume';
import { FadeIn } from '@/shared/components/animated/FadeIn';
import { Resume } from '@/shared/types/resume';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';

type ViewType = 'grid' | 'list' | undefined;

interface DocumentsSectionProps {
  documents: Resume[];
  isLoading?: boolean;
}
const DocumentsSection = ({ documents }: DocumentsSectionProps) => {
  const setResume = useResumeStore((s) => s.setResume);
  const searchParams = useSearchParams();
  const pathname = usePathname();

  const activeView = (searchParams.get('view') || 'grid') as ViewType;

  const router = useRouter();

  // set the resume in the store and navigate to the builder page
  const handleDocumentClick = <T extends Resume>(document: T) => {
    setResume(document);
    router.push(`/builder`);
  };

  // push the new view type to the URL
  const handleViewChange = (newView: 'grid' | 'list') => {
    const params = new URLSearchParams(searchParams.toString());
    params.set('view', newView);
    router.push(pathname + `?${params.toString()}`);
  };

  return (
    <>
      <FadeIn transition={{ delay: 0.3 }} className="flex flex-row gap-4">
        <DocumentSearch />
        <div className="flex gap-2 items-center">
          <ViewTypeButton
            active={activeView === 'grid'}
            icon={Grid}
            onClick={() => handleViewChange('grid')}
            tooltipText="Grid View"
          />
          <ViewTypeButton
            active={activeView === 'list'}
            icon={List}
            onClick={() => handleViewChange('list')}
            tooltipText="List View"
          />
        </div>
      </FadeIn>

      <FadeIn transition={{ delay: 0.3 }} className="w-full">
        <DocumentList
          viewType={activeView}
          documents={documents}
          onDocumentClick={handleDocumentClick}
        />
      </FadeIn>
    </>
  );
};

export default DocumentsSection;
