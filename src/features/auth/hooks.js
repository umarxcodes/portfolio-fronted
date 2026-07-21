import { useMutation, useQuery } from "@tanstack/react-query";
import api from "@/api/client";
import { endpoints } from "@/api/endpoints";
import { useAuth } from "@/context";
import { queryKeys } from "@/constants/queryKeys";

export function useLogin() {
  const { login } = useAuth();
  return useMutation({
    mutationFn: ({ email, password }) => login({ email, password }),
  });
}

export function useLogout() {
  const { logout } = useAuth();
  return useMutation({ mutationFn: () => logout() });
}

export function useChangePassword() {
  const { changePassword } = useAuth();
  return useMutation({
    mutationFn: (payload) => changePassword(payload),
  });
}

export function useAuthProfile() {
  return useQuery({
    queryKey: queryKeys.auth.profile,
    queryFn: () => api.get(endpoints.auth.profile),
    retry: false,
  });
}
