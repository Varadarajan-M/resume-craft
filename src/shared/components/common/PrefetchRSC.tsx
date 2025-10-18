'use client';

import { useRouter } from 'next/navigation';
import { useEffect, useRef } from 'react';

const PrefetchRSC = ({ path }: { path: string }) => {
  const router = useRouter();
  const timerId = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    timerId.current = setTimeout(() => {
      if (path) {
        router.prefetch(path);
      }
    }, 1000); // Prefetch after 1 second delay
    return () => {
      clearTimeout(timerId.current!);
    };
  }, [path, router]);

  return null;
};

export default PrefetchRSC;
