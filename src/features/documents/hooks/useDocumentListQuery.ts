'use client';

import { useQuery } from '@tanstack/react-query';

import { getAllResumesAction } from '@/backend/actions/resume';

const fetcher = async (limit?: number) => {
  const res = await getAllResumesAction(limit);

  if (!res?.success) {
    throw new Error((res?.error as string) || 'Failed to fetch documents');
  }

  return res?.data;
};

type UseDocumentListQueryParams = { limit?: number };

const useDocumentListQuery = ({ limit }: UseDocumentListQueryParams) => {
  const query = useQuery({
    queryKey: ['documents', limit],
    queryFn: () => fetcher(limit),
    refetchOnWindowFocus: false,
    staleTime: 3 * 60 * 1000, // 3 minutes
  });

  return query;
};

export default useDocumentListQuery;
