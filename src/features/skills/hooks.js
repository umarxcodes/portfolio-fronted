import { keepPreviousData, useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { skillsApi } from "@/features/skills/api";
import { queryKeys } from "@/constants/queryKeys";

export function useSkills(params = {}) {
  return useQuery({
    queryKey: queryKeys.skills.list(params),
    queryFn: () => skillsApi.list(params),
    staleTime: 5 * 60 * 1000,
    placeholderData: keepPreviousData,
  });
}

export function useSkillsByCategory(category, params = {}) {
  return useQuery({
    queryKey: queryKeys.skills.category(category, params),
    queryFn: () => skillsApi.byCategory(category, params),
    enabled: Boolean(category),
    staleTime: 5 * 60 * 1000,
  });
}

export function useSkillById(id) {
  return useQuery({
    queryKey: queryKeys.skills.detail(id),
    queryFn: () => skillsApi.byId(id),
    enabled: Boolean(id),
  });
}

export function useCreateSkill() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (payload) => skillsApi.create(payload),
    onSuccess: () => qc.invalidateQueries({ queryKey: queryKeys.skills.all }),
  });
}

export function useUpdateSkill() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: ({ id, payload }) => skillsApi.update(id, payload),
    onSuccess: () => qc.invalidateQueries({ queryKey: queryKeys.skills.all }),
  });
}

export function useDeleteSkill() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (id) => skillsApi.remove(id),
    onSuccess: () => qc.invalidateQueries({ queryKey: queryKeys.skills.all }),
  });
}
