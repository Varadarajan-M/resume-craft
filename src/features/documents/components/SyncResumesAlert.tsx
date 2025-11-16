'use client';

import { useEffect, useState } from 'react';

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/shared/components/ui/alert-dialog';

import { useAuth } from '@clerk/nextjs';
import useResumeSyncWithLocalDelete from '../hooks/useResumeSyncWithLocalDelete';

const SyncResumesAlert = () => {
  const userId = useAuth()?.userId;
  const {
    count,
    hasLocalResumes: shouldShowDialog,
    loading,
    isSyncing,
    syncResumes,
  } = useResumeSyncWithLocalDelete();

  const storageAlertDismissalKey = `resume-craft:local-resumes-dismissed:${userId}`;

  const [open, setOpen] = useState(false);

  useEffect(() => {
    const hasDismissed =
      localStorage.getItem(storageAlertDismissalKey) === 'true';
    if (shouldShowDialog && !hasDismissed) {
      setOpen(true);
    }
  }, [shouldShowDialog, storageAlertDismissalKey]);

  const handleSync = async () => {
    await syncResumes();
    localStorage.removeItem(storageAlertDismissalKey);
    setOpen(false);
  };

  const handleSkip = () => {
    localStorage.setItem(storageAlertDismissalKey, 'true');
    setOpen(false);
  };

  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Sync your resumes?</AlertDialogTitle>

          <AlertDialogDescription>
            We found <strong>{count}</strong> local resume{count > 1 ? 's' : ''}
            . Sync them to your account to back them up and access them across
            devices.
            <br />
            <br />• <strong>Sync Now</strong> — Uploads your local resumes to
            your account.
            <br />• <strong>Keep on This Device</strong> — They’ll remain stored
            only in this browser.
            <br />
            <br />
            You can always sync these later from the <strong>
              Documents
            </strong>{' '}
            tab.
          </AlertDialogDescription>
        </AlertDialogHeader>

        <AlertDialogFooter>
          <AlertDialogCancel
            onClick={handleSkip}
            disabled={loading || isSyncing}
          >
            Keep on This Device
          </AlertDialogCancel>

          <AlertDialogAction
            onClick={handleSync}
            disabled={loading || isSyncing}
          >
            {isSyncing ? 'Syncing...' : 'Sync Now'}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default SyncResumesAlert;
