import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { profileApi } from "@/features/profile/api";
import { queryKeys } from "@/constants/queryKeys";

export function useProfile(options = {}) {
  return useQuery({
    queryKey: queryKeys.profile,
    queryFn: profileApi.get,
    staleTime: 4 * 60 * 1000,
    ...options,
  });
}

export function useUpdateProfile() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (payload) => profileApi.update(payload),
    onSuccess: (data) => {
      qc.setQueryData(queryKeys.profile, { profile: data.profile });
      qc.invalidateQueries({ queryKey: queryKeys.profile });
    },
  });
}
