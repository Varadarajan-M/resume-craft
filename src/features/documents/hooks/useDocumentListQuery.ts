'use client';

import { useQuery } from '@tanstack/react-query';

import { getAllResumesAction } from '@/backend/actions/resume';
import { useUser } from '@clerk/nextjs';

const fetcher = async (limit?: number) => {
  const res = await getAllResumesAction(limit);

  if (!res?.success) {
    throw new Error((res?.error as string) || 'Failed to fetch documents');
  }

  return res?.data;
};

type UseDocumentListQueryParams = { limit?: number; enabled: boolean };

const useDocumentListQuery = ({
  limit,
  enabled,
}: UseDocumentListQueryParams) => {
  const userId = useUser()?.user?.id;
  const query = useQuery({
    queryKey: ['documents', limit, userId],
    queryFn: () => fetcher(limit),
    refetchOnWindowFocus: false,
    staleTime: 3 * 60 * 1000, // 3 minutes
    enabled,
  });

  return query;
};

export default useDocumentListQuery;
