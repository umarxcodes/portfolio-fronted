import { keepPreviousData, useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { projectsApi } from "@/features/projects/api";
import { queryKeys } from "@/constants/queryKeys";

export function useProjects(params = {}) {
  return useQuery({
    queryKey: queryKeys.projects.list(params),
    queryFn: () => projectsApi.list(params),
    placeholderData: keepPreviousData,
  });
}

export function useFeaturedProjects(params = {}) {
  return useQuery({
    queryKey: queryKeys.projects.featured(params),
    queryFn: () => projectsApi.featured(params),
    staleTime: 3 * 60 * 1000,
  });
}

export function useProjectsByCategory(category, params = {}) {
  return useQuery({
    queryKey: queryKeys.projects.category(category, params),
    queryFn: () => projectsApi.byCategory(category, params),
    enabled: Boolean(category),
    placeholderData: keepPreviousData,
  });
}

export function useProjectBySlug(slug, options = {}) {
  return useQuery({
    queryKey: queryKeys.projects.slug(slug),
    queryFn: () => projectsApi.bySlug(slug),
    enabled: Boolean(slug),
    ...options,
  });
}

export function useProjectById(id) {
  return useQuery({
    queryKey: queryKeys.projects.detail(id),
    queryFn: () => projectsApi.byId(id),
    enabled: Boolean(id),
  });
}

export function useCreateProject() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (payload) => projectsApi.create(payload),
    onSuccess: () => qc.invalidateQueries({ queryKey: queryKeys.projects.all }),
  });
}

export function useUpdateProject() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: ({ id, payload }) => projectsApi.update(id, payload),
    onSuccess: () => qc.invalidateQueries({ queryKey: queryKeys.projects.all }),
  });
}

export function useDeleteProject() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (id) => projectsApi.remove(id),
    onSuccess: () => qc.invalidateQueries({ queryKey: queryKeys.projects.all }),
  });
}
