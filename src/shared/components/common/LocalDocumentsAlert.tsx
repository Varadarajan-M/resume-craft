import { BadgeInfoIcon } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from '../ui/alert';
import AuthGuard from './AuthGuard';

const LocalDocumentsAlert = () => {
  return (
    <Alert className="w-fit border-yellow-400/30 bg-yellow-50/70 dark:border-yellow-200/20 dark:bg-card">
      <BadgeInfoIcon />
      <AlertTitle>Working Locally</AlertTitle>
      <AlertDescription>
        <AuthGuard
          signedInContent={null}
          signedOutContent={
            <span className="cursor-pointer">
              Your resumes stay on this device. <u>Sign in</u> to sync across
              devices.
            </span>
          }
        />{' '}
      </AlertDescription>
    </Alert>
  );
};

export default LocalDocumentsAlert;
