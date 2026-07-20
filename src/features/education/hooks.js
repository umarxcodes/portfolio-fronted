import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { educationApi } from "@/features/education/api";
import { queryKeys } from "@/constants/queryKeys";

export function useEducation(params = {}) {
  return useQuery({
    queryKey: queryKeys.education.list(params),
    queryFn: () => educationApi.list(params),
    staleTime: 5 * 60 * 1000,
  });
}

export function useCurrentEducation() {
  return useQuery({
    queryKey: queryKeys.education.current,
    queryFn: educationApi.current,
    staleTime: 5 * 60 * 1000,
  });
}

export function useEducationById(id) {
  return useQuery({
    queryKey: queryKeys.education.detail(id),
    queryFn: () => educationApi.byId(id),
    enabled: Boolean(id),
  });
}

export function useCreateEducation() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (payload) => educationApi.create(payload),
    onSuccess: () => qc.invalidateQueries({ queryKey: queryKeys.education.all }),
  });
}

export function useUpdateEducation() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: ({ id, payload }) => educationApi.update(id, payload),
    onSuccess: () => qc.invalidateQueries({ queryKey: queryKeys.education.all }),
  });
}

export function useDeleteEducation() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (id) => educationApi.remove(id),
    onSuccess: () => qc.invalidateQueries({ queryKey: queryKeys.education.all }),
  });
}
