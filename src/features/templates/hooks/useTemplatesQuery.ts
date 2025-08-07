"use client";

import { getAllTemplatesAction } from "@/backend/actions/template";
import { DocumentTemplate } from "@/shared/types/document";
import { useQuery } from "@tanstack/react-query";

const fetcher = async (limit?: number) => {
  const response = await getAllTemplatesAction(limit);
  if (!response.success) {
    throw new Error(response.message);
  }
  return response.data as DocumentTemplate[];
};
const useTemplatesQuery = (limit?: number) => {
  return useQuery({
    queryKey: ["templates"],
    queryFn: () => fetcher(limit),
    staleTime: 1000 * 60 * 5, // 5 minutes
  });
};

export default useTemplatesQuery;
