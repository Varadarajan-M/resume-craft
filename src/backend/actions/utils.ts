import { auth } from '@clerk/nextjs/server';
import { cache } from 'react';

// Cache auth verification for 1 render pass
export const verifyAuth = cache(async () => {
  const user = await auth();

  if (!user) {
    throw new Error('User not authenticated');
  }

  return user?.userId;
});
