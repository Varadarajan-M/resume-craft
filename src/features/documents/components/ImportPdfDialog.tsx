'use client';

import { CheckCircle2, FileText, Loader2 } from 'lucide-react';
import { useState } from 'react';

import { Button } from '@/shared/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/shared/components/ui/dialog';
import {
  FileInput,
  FileUploader,
  FileUploaderContent,
  FileUploaderItem,
} from '@/shared/components/ui/fileupload';

interface ImportPdfDialogProps {
  open: boolean;
  setOpen: (value: boolean) => void;
  onImport: (file: File) => Promise<void>;
  isSubmitting?: boolean;
}

const ImportPdfDialog = ({ open, setOpen, onImport }: ImportPdfDialogProps) => {
  const [files, setFiles] = useState<File[] | null>(null);
  const [isImporting, setIsImporting] = useState(false);

  const handleImport = async () => {
    if (!files || files.length === 0) return;
    setIsImporting(true);
    await onImport(files[0]);
    setIsImporting(false);
    setOpen(false);
    setFiles(null);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-lg font-semibold">
            Import Existing Resume
          </DialogTitle>
          <DialogDescription>
            Upload a PDF version of your resume to automatically extract and
            prefill your information.
          </DialogDescription>
        </DialogHeader>

        <div className="mt-5 space-y-3">
          <FileUploader
            value={files}
            onValueChange={setFiles}
            dropzoneOptions={{
              accept: { 'application/pdf': ['.pdf'] },
              maxFiles: 1,
              multiple: false,
              maxSize: 5 * 1024 * 1024, // 5MB
            }}
            orientation="vertical"
            className="border border-dashed rounded-lg p-3 bg-muted/20"
          >
            <FileInput className="border-2 border-dashed border-gray-300 hover:border-primary/50 transition-colors rounded-md p-8 flex flex-col items-center justify-center text-center gap-3 bg-background/60">
              <FileText className="w-10 h-10 text-primary/70" />
              <div>
                <p className="text-sm font-medium text-foreground mb-1">
                  Drag & drop your PDF here
                </p>
                <p className="text-xs text-muted-foreground">
                  or click to browse your files
                </p>
              </div>
              <p className="text-xs text-muted-foreground mt-3">
                Supports only <strong>PDF</strong> files up to{' '}
                <strong>5MB</strong>
              </p>
            </FileInput>

            {files && files.length > 0 && (
              <FileUploaderContent className="mt-4 space-y-2">
                {files.map((file, index) => (
                  <FileUploaderItem
                    key={index}
                    index={index}
                    className="flex items-center gap-2 shadow-sm border rounded-md py-2 px-3"
                  >
                    <CheckCircle2 className="w-4 h-4 text-green-600" />
                    <span className="truncate text-sm font-medium max-w-[85%]">
                      {file.name}
                    </span>
                  </FileUploaderItem>
                ))}
              </FileUploaderContent>
            )}
          </FileUploader>
        </div>

        <DialogFooter className="mt-6 flex justify-end gap-2">
          <Button
            variant="ghost"
            onClick={() => setOpen(false)}
            disabled={isImporting}
          >
            Cancel
          </Button>
          <Button
            onClick={handleImport}
            disabled={!files || files.length === 0 || isImporting}
            className="flex items-center gap-2"
          >
            {isImporting && <Loader2 className="w-4 h-4 animate-spin" />}
            {isImporting ? 'Importing...' : 'Import'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ImportPdfDialog;
