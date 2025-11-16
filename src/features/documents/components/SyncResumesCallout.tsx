import { useIdbResume } from '@/features/documents';
import {
  Alert,
  AlertDescription,
  AlertTitle,
} from '@/shared/components/ui/alert';
import { Button } from '@/shared/components/ui/button';
import { useAuth } from '@clerk/nextjs';
import { BadgeInfoIcon } from 'lucide-react';
import { toast } from 'sonner';
import useResumeSyncWithLocalDelete from '../hooks/useResumeSyncWithLocalDelete';

const SyncLocalResumesCallout = () => {
  const userId = useAuth()?.userId;
  const storageAlertDismissalKey = `resume-craft:local-resumes-dismissed:${userId}`;

  const { syncResumes, isSyncing } = useResumeSyncWithLocalDelete();

  const { localResumes, clearAllLocalResumes } = useIdbResume({
    enabled: !!userId,
  });

  if (
    !userId ||
    localResumes?.length === 0 ||
    localStorage.getItem(storageAlertDismissalKey) !== 'true'
  )
    return null;

  const handleClear = async () => {
    await clearAllLocalResumes();
    toast.success('Local resumes cleared from this device.');
  };

  return (
    <Alert className="border-yellow-400/30 bg-yellow-50/70 dark:border-yellow-200/20 dark:bg-card w-fit">
      <BadgeInfoIcon className="h-4 w-4" />
      <AlertTitle>Unsynced Local Resumes</AlertTitle>

      <AlertDescription className="flex flex-col gap-2">
        You have {localResumes.length} resume
        {localResumes.length > 1 ? 's' : ''} stored on this device. Sync them to
        your account to access them anywhere.
        <div className="flex gap-2 pt-1">
          <Button size="sm" onClick={syncResumes} disabled={isSyncing}>
            {isSyncing ? 'Syncing...' : 'Sync Resumes'}
          </Button>

          <Button
            variant="outline"
            size="sm"
            onClick={handleClear}
            disabled={isSyncing}
          >
            Clear Local
          </Button>
        </div>
      </AlertDescription>
    </Alert>
  );
};

export default SyncLocalResumesCallout;
