'use client';

import { useAuth } from '@clerk/nextjs';
import { ChevronDownIcon, Import, Loader2, Plus } from 'lucide-react';
import { useState } from 'react';
import { toast } from 'sonner';

import { Button } from '@/shared/components/ui/button';
import { ButtonGroup } from '@/shared/components/ui/button-group';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/shared/components/ui/dropdown-menu';
import ImportPdfDialog from './ImportPdfDialog';

import { extractTextFromPdf } from '@/shared/lib/utils';
import useResumeCreator from '../hooks/useResumeCreator';

export default function CreateResumeButtonGroup() {
  const { createFromPlaceholder, createFromPdfText, isPending } =
    useResumeCreator();
  const [isImportDialogOpen, setIsImportDialogOpen] = useState(false);
  const { isSignedIn } = useAuth();

  const handleFileImport = async (file: File) => {
    const text = await extractTextFromPdf(file);
    if (!text) {
      toast.error('Failed to extract text');
      return;
    }
    await createFromPdfText(text);
  };

  return (
    <div className="relative">
      <ButtonGroup>
        <Button onClick={createFromPlaceholder} disabled={isPending}>
          <Plus className="h-3 w-3" />
          <span className="text-xs font-medium">Create Resume</span>
        </Button>

        <DropdownMenu modal={false}>
          <DropdownMenuTrigger asChild>
            <Button disabled={isPending}>
              {isPending ? (
                <Loader2 className="animate-spin" />
              ) : (
                <ChevronDownIcon />
              )}
            </Button>
          </DropdownMenuTrigger>

          <DropdownMenuContent align="end">
            <DropdownMenuItem
              onClick={createFromPlaceholder}
              disabled={isPending}
            >
              <Plus /> From scratch
            </DropdownMenuItem>

            <DropdownMenuItem
              onClick={() => setIsImportDialogOpen(true)}
              disabled={isPending}
            >
              <Import /> Import existing PDF
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </ButtonGroup>

      {!isSignedIn && (
        <small className="text-muted-foreground absolute left-0 text-center -bottom-6.5">
          No sign-up needed
        </small>
      )}

      <ImportPdfDialog
        key={isImportDialogOpen ? 'open' : 'closed'}
        open={isImportDialogOpen}
        setOpen={setIsImportDialogOpen}
        onImport={handleFileImport}
      />
    </div>
  );
}
