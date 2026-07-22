import { memo } from "react";
import { cn } from "@/lib/cn";

const TONES = {
  neutral: "bg-bg-muted text-content-secondary border-border",
  brand: "bg-brand-500/10 text-brand-600 dark:text-brand-300 border-brand-500/20",
  success: "bg-success/10 text-success border-success/20",
  warning: "bg-warning/10 text-warning border-warning/20",
  danger: "bg-danger/10 text-danger border-danger/20",
  info: "bg-info/10 text-info border-info/20",
  accent: "bg-accent/10 text-accent border-accent/20",
};

export const Badge = memo(function Badge({ children, tone = "neutral", className, size = "md" }) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full border font-medium capitalize",
        size === "sm" ? "px-2 py-0.5 text-2xs" : "px-2.5 py-1 text-xs",
        TONES[tone] || TONES.neutral,
        className
      )}
    >
      {children}
    </span>
  );
});

export default Badge;
