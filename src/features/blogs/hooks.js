import { keepPreviousData, useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { blogsApi } from "@/features/blogs/api";
import { queryKeys } from "@/constants/queryKeys";

export function useBlogs(params = {}) {
  return useQuery({
    queryKey: queryKeys.blogs.list(params),
    queryFn: () => blogsApi.list(params),
    placeholderData: keepPreviousData,
  });
}

export function useFeaturedBlogs(params = {}) {
  return useQuery({
    queryKey: queryKeys.blogs.featured(params),
    queryFn: () => blogsApi.featured(params),
    staleTime: 3 * 60 * 1000,
  });
}

export function useBlogsByCategory(category, params = {}) {
  return useQuery({
    queryKey: queryKeys.blogs.category(category, params),
    queryFn: () => blogsApi.byCategory(category, params),
    enabled: Boolean(category),
    placeholderData: keepPreviousData,
  });
}

export function useBlogsByTag(tag, params = {}) {
  return useQuery({
    queryKey: queryKeys.blogs.tag(tag, params),
    queryFn: () => blogsApi.byTag(tag, params),
    enabled: Boolean(tag),
    placeholderData: keepPreviousData,
  });
}

export function useBlogBySlug(slug, options = {}) {
  return useQuery({
    queryKey: queryKeys.blogs.slug(slug),
    queryFn: () => blogsApi.bySlug(slug),
    enabled: Boolean(slug),
    ...options,
  });
}

export function useBlogById(id) {
  return useQuery({
    queryKey: queryKeys.blogs.detail(id),
    queryFn: () => blogsApi.byId(id),
    enabled: Boolean(id),
  });
}

export function useCreateBlog() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (payload) => blogsApi.create(payload),
    onSuccess: () => qc.invalidateQueries({ queryKey: queryKeys.blogs.all }),
  });
}

export function useUpdateBlog() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: ({ id, payload }) => blogsApi.update(id, payload),
    onSuccess: () => qc.invalidateQueries({ queryKey: queryKeys.blogs.all }),
  });
}

export function useDeleteBlog() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (id) => blogsApi.remove(id),
    onSuccess: () => qc.invalidateQueries({ queryKey: queryKeys.blogs.all }),
  });
}
