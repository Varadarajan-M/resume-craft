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
import { getPlaceholderResume } from '@/shared/lib/resume';
import { extractTextFromPdf } from '@/shared/lib/utils';
import { Resume } from '@/shared/types/resume';
import { useAuth } from '@clerk/nextjs';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { toast } from 'sonner';
import useCreateResumeFromTextMutation from '../hooks/useCreateResumeFromTextMutation';
import useCreateResumeMutation from '../hooks/useCreateResumeMutation';
import ImportPdfDialog from './ImportPdfDialog';

export default function CreateResumeButtonGroup() {
  const createResumeMutation = useCreateResumeMutation({});
  const createResumeFromTextMutation = useCreateResumeFromTextMutation({});

  const userId = useAuth()?.userId;
  const router = useRouter();
  const [isImportDialogOpen, setIsImportDialogOpen] = useState(false);

  const setResume = useResumeStore((state) => state.setResume);

  const handleNewClick = async () => {
    if (!userId) return;

    await createResumeMutation.mutateAsync(getPlaceholderResume(userId), {
      onSuccess: (data: Resume) => {
        toast.success('Resume created successfully!');
        setResume(data);
        router.push(`/builder`);
      },
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
      return;
    }

    await createResumeFromTextMutation.mutateAsync(textContent, {
      onSuccess: (data: Resume) => {
        toast.success('Resume created successfully from PDF!');
        setResume(data);
        router.push(`/builder`);
      },
      onError: (error) => {
        toast.error(`Failed to create resume from PDF: ${error.message}`);
      },
    });
  };

  return (
    <>
      <ButtonGroup>
        <Button
          variant={'default'}
          className="flex items-center gap-1 cursor-pointer"
          onClick={handleNewClick}
          disabled={createResumeMutation.isPending}
        >
          {createResumeMutation.isPending ? (
            <Loader2 className="h-3 w-3" />
          ) : (
            <Plus className="h-3 w-3" />
          )}

          <span className="text-xs font-medium">Create Resume</span>
        </Button>

        <DropdownMenu modal={false}>
          <DropdownMenuTrigger asChild>
            <Button variant="default" className="!pl-2">
              <ChevronDownIcon />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="[--radius:1rem]">
            <DropdownMenuGroup>
              <DropdownMenuItem onClick={handleNewClick}>
                <Plus />
                From scratch
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setIsImportDialogOpen(true)}>
                <Import />
                Import existing PDF
              </DropdownMenuItem>
            </DropdownMenuGroup>
          </DropdownMenuContent>
        </DropdownMenu>
      </ButtonGroup>
      <ImportPdfDialog
        // To force remounting the dialog on open/close to reset internal state
        key={isImportDialogOpen ? 'open' : 'closed'}
        open={isImportDialogOpen}
        setOpen={setIsImportDialogOpen}
        onImport={handleFileImport}
      />
    </>
  );
}
