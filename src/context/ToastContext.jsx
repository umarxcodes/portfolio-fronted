import { createContext, useCallback, useContext, useMemo, useState } from "react";

const ToastContext = createContext(null);

let idCounter = 0;

export function ToastProvider({ children }) {
  const [toasts, setToasts] = useState([]);

  const dismiss = useCallback((id) => {
    setToasts((current) => current.filter((t) => t.id !== id));
  }, []);

  const push = useCallback(
    (toast) => {
      const id = ++idCounter;
      const entry = {
        id,
        tone: "info",
        duration: 4000,
        ...toast,
      };
      setToasts((current) => [...current, entry]);
      if (entry.duration) {
        setTimeout(() => dismiss(id), entry.duration);
      }
      return id;
    },
    [dismiss]
  );

  const value = useMemo(
    () => ({
      toasts,
      dismiss,
      toast: {
        success: (message, opts) => push({ tone: "success", message, ...opts }),
        error: (message, opts) => push({ tone: "danger", message, duration: 6000, ...opts }),
        info: (message, opts) => push({ tone: "info", message, ...opts }),
        warning: (message, opts) => push({ tone: "warning", message, ...opts }),
      },
    }),
    [toasts, dismiss, push]
  );

  return <ToastContext.Provider value={value}>{children}</ToastContext.Provider>;
}

export function useToast() {
  const ctx = useContext(ToastContext);
  if (!ctx) throw new Error("useToast must be used within ToastProvider");
  return ctx;
}

export default ToastContext;
