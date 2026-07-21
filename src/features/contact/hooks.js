import { keepPreviousData, useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { contactApi } from "@/features/contact/api";
import { queryKeys } from "@/constants/queryKeys";

export function useSubmitContact() {
  return useMutation({
    mutationFn: (payload) => contactApi.submit(payload),
  });
}

export function useContacts(params = {}) {
  return useQuery({
    queryKey: queryKeys.contact.list(params),
    queryFn: () => contactApi.list(params),
    placeholderData: keepPreviousData,
    refetchOnWindowFocus: true,
  });
}

export function useContactById(id) {
  return useQuery({
    queryKey: queryKeys.contact.detail(id),
    queryFn: () => contactApi.byId(id),
    enabled: Boolean(id),
  });
}

export function useContactUnreadCount() {
  return useQuery({
    queryKey: queryKeys.contact.unreadCount,
    queryFn: async () => {
      const data = await contactApi.list({ status: "unread", limit: 1 });
      return data?.pagination?.total ?? 0;
    },
    refetchInterval: 60 * 1000,
  });
}

export function useUpdateContactStatus() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: ({ id, status }) => contactApi.updateStatus(id, status),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: queryKeys.contact.all });
      qc.invalidateQueries({ queryKey: queryKeys.contact.unreadCount });
    },
  });
}

export function useDeleteContact() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (id) => contactApi.remove(id),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: queryKeys.contact.all });
      qc.invalidateQueries({ queryKey: queryKeys.contact.unreadCount });
    },
  });
}
