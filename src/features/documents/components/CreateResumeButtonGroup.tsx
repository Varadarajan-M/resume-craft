'use client';

import { ChevronDownIcon, Import, Loader2, Plus } from 'lucide-react';

import { useResumeStore } from '@/features/resume-builder/store/resume';
import { Button } from '@/shared/components/ui/button';
import { ButtonGroup } from '@/shared/components/ui/button-group';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/shared/components/ui/dropdown-menu';
import { usePosthog } from '@/shared/hooks/usePosthog';
import { POSTHOG_EVENTS } from '@/shared/lib/constants';
import { getPlaceholderResume } from '@/shared/lib/resume';
import { extractTextFromPdf } from '@/shared/lib/utils';
import { Resume } from '@/shared/types/resume';
import { useAuth } from '@clerk/nextjs';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { toast } from 'sonner';
import useCreateResumeFromTextMutation from '../hooks/useCreateResumeFromTextMutation';
import useCreateResumeMutation from '../hooks/useCreateResumeMutation';
import useIdbResume from '../hooks/useIdbResume';
import ImportPdfDialog from './ImportPdfDialog';

export default function CreateResumeButtonGroup() {
  const createResumeMutation = useCreateResumeMutation({});
  const createResumeFromTextMutation = useCreateResumeFromTextMutation({});
  const isSignedIn = useAuth()?.isSignedIn;

  const { createLocalResume: addLocalResume } = useIdbResume({
    enabled: !isSignedIn,
  });

  const { captureEvent } = usePosthog();

  const userId = useAuth()?.userId;
  const router = useRouter();
  const [isImportDialogOpen, setIsImportDialogOpen] = useState(false);

  const setResume = useResumeStore((state) => state.setResume);

  const handleNewClick = async () => {
    const placeholderResume = getPlaceholderResume(userId || undefined);

    const onSuccess = async (data: Resume) => {
      toast.success('Resume created successfully!');
      setResume(data);
      captureEvent(POSTHOG_EVENTS.RESUME_CREATED, {
        templateId: data?.templateId,
      });
      router.push(`/builder`);
    };

    if (!isSignedIn) {
      await addLocalResume(placeholderResume);
      return onSuccess(placeholderResume);
    }

    await createResumeMutation.mutateAsync(placeholderResume, {
      onSuccess,
      onError: (error) => {
        toast.error(`Failed to create resume: ${error.message}`);
      },
    });
  };

  const handleFileImport = async (file: File) => {
    if (!userId) return;

    const textContent = await extractTextFromPdf(file);

    if (!textContent) {
      toast.error('Failed to extract text from the PDF.');
      captureEvent(POSTHOG_EVENTS.RESUME_IMPORT_FAILED);
      return;
    }

    await createResumeFromTextMutation.mutateAsync(textContent, {
      onSuccess: (data: Resume) => {
        toast.success('Resume created successfully from PDF!');
        setResume(data);
        captureEvent(POSTHOG_EVENTS.RESUME_IMPORTED, {
          title: data.title,
        });
        router.push(`/builder`);
      },
      onError: (error) => {
        toast.error(`Failed to create resume from PDF: ${error.message}`);
      },
    });
  };

  return (
    <div className="relative">
      <ButtonGroup>
        <Button
          variant={'default'}
          className="flex items-center gap-1 cursor-pointer"
          onClick={handleNewClick}
          disabled={createResumeMutation.isPending}
        >
          <Plus className="h-3 w-3" />

          <span className="text-xs font-medium">Create Resume</span>
        </Button>

        <DropdownMenu modal={false}>
          <DropdownMenuTrigger asChild>
            <Button
              variant="default"
              className="pl-2!"
              disabled={createResumeMutation.isPending}
            >
              {createResumeMutation.isPending ? (
                <Loader2 className="animate-spin" />
              ) : (
                <ChevronDownIcon />
              )}
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="[--radius:1rem]">
            <DropdownMenuGroup>
              <DropdownMenuItem
                onClick={handleNewClick}
                disabled={createResumeMutation.isPending}
              >
                <Plus />
                From scratch
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => setIsImportDialogOpen(true)}
                disabled={createResumeMutation.isPending}
              >
                <Import />
                Import existing PDF
              </DropdownMenuItem>
            </DropdownMenuGroup>
          </DropdownMenuContent>
        </DropdownMenu>
      </ButtonGroup>

      {isSignedIn ? null : (
        <small className="text-muted-foreground absolute left-0 text-center -bottom-6.5">
          No sign-up needed
        </small>
      )}
      <ImportPdfDialog
        // To force remounting the dialog on open/close to reset internal state
        key={isImportDialogOpen ? 'open' : 'closed'}
        open={isImportDialogOpen}
        setOpen={setIsImportDialogOpen}
        onImport={handleFileImport}
      />
    </div>
  );
}
