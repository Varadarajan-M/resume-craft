'use client';

import { useUser } from '@clerk/nextjs';
import posthog from 'posthog-js';
import { useEffect } from 'react';

const PosthogIdentify = () => {
  const { user, isLoaded, isSignedIn } = useUser();

  useEffect(() => {
    if (!isLoaded || !isSignedIn) return;

    const userId = user.id;
    const email = user.primaryEmailAddress?.emailAddress;

    posthog.identify(userId, { email });
  }, [isLoaded, isSignedIn, user]);

  return null;
};

export default PosthogIdentify;
