'use client';

import Link from 'next/link';

import { ChevronRight } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { toast } from 'sonner';

import {
  DocumentList,
  useDeleteDocumentMutation as useDeleteResumeMutation,
  useDocumentListQuery,
  useDuplicateResumeMutation,
} from '@/features/documents';
import { useResumeStore } from '@/features/resume-builder/store/resume';
import { FadeIn } from '@/shared/components/animated/FadeIn';
import LocalDocumentsAlert from '@/shared/components/common/LocalDocumentsAlert';
import { Button } from '@/shared/components/ui/button';
import { usePosthog } from '@/shared/hooks/usePosthog';
import { POSTHOG_EVENTS } from '@/shared/lib/constants';
import { Resume } from '@/shared/types/resume';
import { useAuth } from '@clerk/nextjs';

const RecentDocumentSection = () => {
  const isSignedIn = useAuth().isSignedIn;

  const {
    data: documents = [],
    error,
    isLoading,
  } = useDocumentListQuery({ limit: 3, enabled: !!isSignedIn });

  const { mutate: deleteResumeMutation } = useDeleteResumeMutation({});
  const { captureEvent } = usePosthog();

  const { mutate: handleDocumentDuplication } = useDuplicateResumeMutation();

  const router = useRouter();
  const setResume = useResumeStore((s) => s.setResume);

  const handleDocumentClick = <T extends Resume>(document: T) => {
    setResume(document);
    router.push(`/builder`);
  };

  const handleDeleteDocument = <T extends Resume>(document: T) => {
    deleteResumeMutation(document.id, {
      onSuccess: () => {
        toast.success('Document deleted successfully!');
        captureEvent(POSTHOG_EVENTS.RESUME_DELETED);
      },
      onError: (error) => {
        toast.error(`Failed to delete document: ${error.message}`);
      },
    });
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
        {documents?.length > 0 && (
          <FadeIn transition={{ delay: 0.4 }}>
            <Button variant={'link'} asChild className="text-xs">
              <Link href="/documents" className="flex items-center gap-1">
                View all <ChevronRight className="w-3 h-3" />
              </Link>
            </Button>
          </FadeIn>
        )}
      </div>

      {!isSignedIn && documents?.length > 0 ? (
        <FadeIn transition={{ delay: 0.3 }} className="mb-3">
          <LocalDocumentsAlert />
        </FadeIn>
      ) : null}

      <FadeIn transition={{ delay: 0.3 }} className="w-full">
        <DocumentList
          isSignedIn={isSignedIn}
          isLoading={isLoading}
          documents={documents}
          onDocumentClick={handleDocumentClick}
          onDocumentCopy={handleDocumentDuplication}
          onDocumentDelete={handleDeleteDocument}
        />
      </FadeIn>
    </div>
  );
};

export default RecentDocumentSection;
