import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { searchApi } from "@/features/search/api";
import { queryKeys } from "@/constants/queryKeys";

export function useSearch(params) {
  const { q } = params || {};
  return useQuery({
    queryKey: queryKeys.search(params),
    queryFn: () => searchApi.query(params),
    enabled: Boolean(q && q.trim().length > 0),
    placeholderData: keepPreviousData,
    staleTime: 30 * 1000,
  });
}
