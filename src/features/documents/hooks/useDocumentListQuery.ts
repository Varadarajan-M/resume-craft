"use client";

import { useQuery } from "@tanstack/react-query";

import { getAllResumesAction } from "@/backend/actions/resume";

const fetcher = async (limit?: number) => {
  const res = await getAllResumesAction(limit);

  if (!res?.success) {
    throw new Error((res?.error as string) || "Failed to fetch documents");
  }

  return res?.data;
};

type UseDocumentListQueryParams = {
  params?: {
    limit?: number;
  };
};

const useDocumentListQuery = ({ params }: UseDocumentListQueryParams) => {
  const query = useQuery({
    queryKey: ["documents", { ...params }],
    queryFn: () => fetcher(params?.limit),
    refetchOnWindowFocus: false,
    staleTime: 60 * 1000, // 60 seconds
  });

  return query;
};

export default useDocumentListQuery;
