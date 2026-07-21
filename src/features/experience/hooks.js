import { keepPreviousData, useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { experienceApi } from "@/features/experience/api";
import { queryKeys } from "@/constants/queryKeys";

export function useExperience(params = {}) {
  return useQuery({
    queryKey: queryKeys.experience.list(params),
    queryFn: () => experienceApi.list(params),
    staleTime: 5 * 60 * 1000,
    placeholderData: keepPreviousData,
  });
}

export function useExperienceById(id) {
  return useQuery({
    queryKey: queryKeys.experience.detail(id),
    queryFn: () => experienceApi.byId(id),
    enabled: Boolean(id),
  });
}

export function useCreateExperience() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (payload) => experienceApi.create(payload),
    onSuccess: () => qc.invalidateQueries({ queryKey: queryKeys.experience.all }),
  });
}

export function useUpdateExperience() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: ({ id, payload }) => experienceApi.update(id, payload),
    onSuccess: () => qc.invalidateQueries({ queryKey: queryKeys.experience.all }),
  });
}

export function useDeleteExperience() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (id) => experienceApi.remove(id),
    onSuccess: () => qc.invalidateQueries({ queryKey: queryKeys.experience.all }),
  });
}
