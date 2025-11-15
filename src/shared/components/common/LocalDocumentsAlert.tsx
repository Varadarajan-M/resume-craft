import { BadgeInfoIcon } from 'lucide-react';
import { Alert, AlertTitle } from '../ui/alert';

const LocalDocumentsAlert = () => {
  return (
    <Alert>
      <BadgeInfoIcon />
      <AlertTitle>
        Your resume is saved locally. Sign in to sync across devices.
      </AlertTitle>
      {/* <AlertDescription>
        <AuthGuard
          signedInContent={null}
          signedOutContent={
            <span>
              Please <strong>Sign In </strong> to sync your work to view it in
              other devices.
            </span>
          }
        />{' '}
      </AlertDescription> */}
    </Alert>
  );
};

export default LocalDocumentsAlert;
