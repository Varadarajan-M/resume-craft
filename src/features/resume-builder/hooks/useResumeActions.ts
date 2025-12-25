import { usePosthog } from '@/shared/hooks/usePosthog';
import { POSTHOG_EVENTS } from '@/shared/lib/constants';
import { downloadFile } from '@/shared/lib/utils';
import { useCallback, useEffect } from 'react';
import { toast } from 'sonner';

/**
 * Helper to get the PDF blob URL from the DOM.
 */
const getPdfBlobUrl = (): string | null =>
  document
    .querySelector('[data-pdf-blob-url]')
    ?.getAttribute('data-pdf-blob-url') ?? null;

/**
 * Custom hook to handle resume actions like download and share.
 * 
 * @param resumeTitle - The title of the resume for file naming.
 * @returns An object with handleDownload and handleShare functions.
 */
export const useResumeActions = (resumeTitle: string) => {
  const { captureEvent } = usePosthog();

  const handleDownload = useCallback(() => {
    const url = getPdfBlobUrl();
    if (!url) {
      toast.error('PDF not ready for download. Please wait.');
      return;
    }
    
    downloadFile(url, resumeTitle);
    captureEvent(POSTHOG_EVENTS.RESUME_DOWNLOADED, { title: resumeTitle });
  }, [resumeTitle, captureEvent]);

  const handleShare = useCallback(async () => {
    try {
      const url = getPdfBlobUrl();
      if (!url) {
        toast.error('PDF not ready for sharing. Please wait.');
        return;
      }

      const response = await fetch(url);
      const pdfBlob = await response.blob();
      const file = new File([pdfBlob], 'resume.pdf', { type: pdfBlob.type });

      if (navigator.share && navigator.canShare?.({ files: [file] })) {
        await navigator.share({
          files: [file],
          title: resumeTitle,
          text: 'Check out this resume!',
        });
        toast.success('Resume shared successfully!');
        captureEvent(POSTHOG_EVENTS.RESUME_SHARED, { title: resumeTitle });
      } else {
        toast.error('Sharing is not supported on this device.');
      }
    } catch (e: unknown) {
      toast.error(`Sharing failed: ${(e as Error)?.message}`);
    }
  }, [resumeTitle, captureEvent]);

  // Keyboard shortcut: Cmd/Ctrl + S for download
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 's') {
        e.preventDefault();
        handleDownload();
      }
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [handleDownload]);

  return {
    handleDownload,
    handleShare,
  };
};
