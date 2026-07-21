import { keepPreviousData, useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { certificatesApi } from "@/features/certificates/api";
import { queryKeys } from "@/constants/queryKeys";

export function useCertificates(params = {}) {
  return useQuery({
    queryKey: queryKeys.certificates.list(params),
    queryFn: () => certificatesApi.list(params),
    staleTime: 5 * 60 * 1000,
    placeholderData: keepPreviousData,
  });
}

export function useCertificateById(id) {
  return useQuery({
    queryKey: queryKeys.certificates.detail(id),
    queryFn: () => certificatesApi.byId(id),
    enabled: Boolean(id),
  });
}

export function useCreateCertificate() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (payload) => certificatesApi.create(payload),
    onSuccess: () => qc.invalidateQueries({ queryKey: queryKeys.certificates.all }),
  });
}

export function useUpdateCertificate() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: ({ id, payload }) => certificatesApi.update(id, payload),
    onSuccess: () => qc.invalidateQueries({ queryKey: queryKeys.certificates.all }),
  });
}

export function useDeleteCertificate() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (id) => certificatesApi.remove(id),
    onSuccess: () => qc.invalidateQueries({ queryKey: queryKeys.certificates.all }),
  });
}
