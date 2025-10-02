"use client";

import { useQuery } from "@tanstack/react-query";

import { getAIEnhancedContentAction } from "@/backend/actions/ai";

const fetcher = async (content: string) => {
  const res = await getAIEnhancedContentAction(content);

  if (!res?.success) {
    throw new Error((res?.error as string) || "Failed to enhance content");
  }

  return res?.data;
};

type UseContentEnhancerQueryParams = {
  enabled?: boolean;
  content: string;
};

const useContentEnhancerQuery = ({
  enabled = true,
  content,
}: UseContentEnhancerQueryParams) => {
  const query = useQuery({
    queryKey: ["enhancedContent", { content }],
    queryFn: () => fetcher(content),
    refetchOnWindowFocus: false,
    enabled: !!content?.trim()?.length && enabled,
    staleTime: 60 * 1000, // 60 seconds
  });

  return query;
};

export default useContentEnhancerQuery;
