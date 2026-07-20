import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { settingsApi } from "@/features/settings/api";
import { queryKeys } from "@/constants/queryKeys";

export function useSettings(options = {}) {
  return useQuery({
    queryKey: queryKeys.settings,
    queryFn: settingsApi.get,
    staleTime: 5 * 60 * 1000,
    ...options,
  });
}

export function useUpdateSettings() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (payload) => settingsApi.update(payload),
    onSuccess: (data) => {
      qc.setQueryData(queryKeys.settings, { settings: data.settings });
    },
  });
}
