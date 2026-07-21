import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import api from "@/api/client";
import { endpoints } from "@/api/endpoints";
import { tokenStorage } from "@/lib/token";
import { SESSION_EXPIRED_EVENT } from "@/api/axios";
import { queryClient } from "@/api/queryClient";
import { useToast } from "./ToastContext";

const AuthContext = createContext(null);

function loadAdmin() {
  try {
    const raw = localStorage.getItem("portfolio.cms.admin");
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

export function AuthProvider({ children }) {
  const [admin, setAdmin] = useState(() => (tokenStorage.get() ? loadAdmin() : null));
  const [status, setStatus] = useState("idle");
  const { toast } = useToast();

  const setSession = useCallback(({ accessToken, admin: adminData }) => {
    tokenStorage.set(accessToken);
    setAdmin(adminData);
    try {
      localStorage.setItem("portfolio.cms.admin", JSON.stringify(adminData));
    } catch {
      /* ignore */
    }
  }, []);

  const clearSession = useCallback(() => {
    tokenStorage.clear();
    setAdmin(null);
    queryClient.clear();
  }, []);

  const login = useCallback(
    async ({ email, password }) => {
      setStatus("loading");
      try {
        const data = await api.post(endpoints.auth.login, { email, password });
        setSession({ accessToken: data.accessToken, admin: data.admin });
        setStatus("idle");
        return data.admin;
      } catch (error) {
        setStatus("error");
        throw error;
      }
    },
    [setSession]
  );

  const logout = useCallback(async () => {
    try {
      await api.post(endpoints.auth.logout, {});
    } catch {
      /* ignore — local clear is authoritative */
    }
    clearSession();
  }, [clearSession]);

  const changePassword = useCallback(async (payload) => {
    return api.patch(endpoints.auth.changePassword, payload);
  }, []);

  // Bootstrap the admin profile on mount if a token exists.
  useEffect(() => {
    let mounted = true;
    if (!tokenStorage.get()) return;
    setStatus("loading");
    api
      .get(endpoints.auth.profile)
      .then((data) => {
        if (!mounted) return;
        setAdmin(data.admin);
        setStatus("idle");
      })
      .catch(() => {
        if (!mounted) return;
        clearSession();
        setStatus("idle");
      });
    return () => {
      mounted = false;
    };
  }, [clearSession]);

  // Global 401 / session-expired handling.
  useEffect(() => {
    const handler = () => {
      clearSession();
      toast.warning("Your session has expired. Please sign in again.");
    };
    window.addEventListener(SESSION_EXPIRED_EVENT, handler);
    return () => window.removeEventListener(SESSION_EXPIRED_EVENT, handler);
  }, [clearSession, toast]);

  const value = useMemo(
    () => ({
      admin,
      isAuthenticated: Boolean(admin),
      status,
      isLoading: status === "loading",
      login,
      logout,
      changePassword,
    }),
    [admin, status, login, logout, changePassword]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}

export default AuthContext;
