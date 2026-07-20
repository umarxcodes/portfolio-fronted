import { createPortal } from "react-dom";
import { CheckCircle2, XCircle, Info, AlertTriangle, X } from "lucide-react";
import { cn } from "@/lib/cn";
import { useToast } from "@/context";

const TONES = {
  success: { icon: CheckCircle2, ring: "border-success/30 bg-success/10 text-success" },
  danger: { icon: XCircle, ring: "border-danger/30 bg-danger/10 text-danger" },
  info: { icon: Info, ring: "border-info/30 bg-info/10 text-info" },
  warning: { icon: AlertTriangle, ring: "border-warning/30 bg-warning/10 text-warning" },
};

export function ToastViewport() {
  const { toasts, dismiss } = useToast();
  if (!toasts.length) return null;

  return createPortal(
    <div className="pointer-events-none fixed inset-x-0 bottom-4 z-[60] flex flex-col items-center gap-2 px-4 sm:bottom-6 sm:right-6 sm:left-auto sm:items-end">
      {toasts.map((toast) => {
        const tone = TONES[toast.tone] || TONES.info;
        const Icon = tone.icon;
        return (
          <div
            key={toast.id}
            role="status"
            className={cn(
              "pointer-events-auto flex w-full max-w-sm animate-fade-up items-start gap-3 rounded-lg border bg-surface px-4 py-3 shadow-lg",
              tone.ring
            )}
          >
            <Icon className="mt-0.5 h-5 w-5 shrink-0" />
            <p className="flex-1 text-sm text-content-primary">{toast.message}</p>
            <button
              type="button"
              onClick={() => dismiss(toast.id)}
              aria-label="Dismiss"
              className="text-content-muted transition-colors hover:text-content-primary"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        );
      })}
    </div>,
    document.body
  );
}

export default ToastViewport;
