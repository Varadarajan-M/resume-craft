'use client';

import { useUser } from '@clerk/nextjs';
import React from 'react';

const PosthogIdentify = () => {
  const user2 = useUser();
  const email = user2?.isSignedIn
    ? user2?.user?.primaryEmailAddress?.emailAddress || 'unknown'
    : null;

  const userId = user2?.isSignedIn ? user2?.user?.id : null;

  React.useEffect(() => {
    if (email && typeof window !== 'undefined') {
      import('posthog-js').then((posthog) => {
        posthog.default.identify(email, {
          email,
          userId,
          time: new Date().toISOString(),
        });
      });
    }
  }, [email, userId]);

  return null;
};

export default PosthogIdentify;
