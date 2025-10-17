'use client';

import Link from 'next/link';

import { ChevronRight } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { toast } from 'sonner';

import { DocumentList } from '@/features/documents';
import { useResumeStore } from '@/features/resume-builder/store/resume';
import { FadeIn } from '@/shared/components/animated/FadeIn';
import { Button } from '@/shared/components/ui/button';
import { Resume } from '@/shared/types/resume';

interface RecentDocumentSectionProps {
  documents: Resume[];
  error?: Error | null;
}

const RecentDocumentSection = ({
  documents,
  error,
}: RecentDocumentSectionProps) => {
  const router = useRouter();
  const setResume = useResumeStore((s) => s.setResume);

  const handleDocumentClick = <T extends Resume>(document: T) => {
    setResume(document);
    router.push(`/builder`);
  };

  useEffect(() => {
    if (error) {
      toast.error(error.message || 'Failed to fetch recent documents');
    }
  }, [error]);

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <FadeIn
          as="h2"
          transition={{ delay: 0.3 }}
          className="text-base md:text-xl font-semibold tracking-tight"
        >
          Recent Documents
        </FadeIn>
        <FadeIn transition={{ delay: 0.4 }}>
          <Button variant={'link'} asChild className="text-xs">
            <Link href="/documents" className="flex items-center gap-1">
              View all <ChevronRight className="w-3 h-3" />
            </Link>
          </Button>
        </FadeIn>
      </div>
      <FadeIn transition={{ delay: 0.3 }} className="w-full">
        <DocumentList
          documents={documents}
          onDocumentClick={handleDocumentClick}
        />
      </FadeIn>
    </div>
  );
};

export default RecentDocumentSection;
