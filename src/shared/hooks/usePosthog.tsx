'use client';

import { useUser } from '@clerk/nextjs';
import posthog from 'posthog-js';
import { useCallback } from 'react';

export const usePosthog = () => {
  const { user, isSignedIn } = useUser();

  const captureEvent = useCallback(
    (eventName: string, properties?: Record<string, any>) => {
      const userId = isSignedIn ? user?.id : undefined;
      const email = isSignedIn
        ? user?.emailAddresses?.[0]?.emailAddress
        : undefined;

      posthog.capture(eventName, {
        ...(userId && { userId }),
        ...(email && { email }),
        ...properties,
        time: new Date().toISOString(),
      });
    },
    [isSignedIn, user?.id, user?.emailAddresses?.[0]?.emailAddress]
  );

  return { captureEvent };
};
