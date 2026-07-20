import { cn } from "@/lib/cn";

export function Spinner({ size = "md", className }) {
  const sizes = { sm: "h-4 w-4", md: "h-6 w-6", lg: "h-9 w-9" };
  return (
    <span
      role="status"
      aria-label="Loading"
      className={cn(
        "inline-block animate-spin rounded-full border-2 border-current border-t-transparent text-brand-500",
        sizes[size],
        className
      )}
    />
  );
}

export function LoadingOverlay({ label }) {
  return (
    <div className="flex min-h-[40vh] flex-col items-center justify-center gap-3 text-content-muted">
      <Spinner size="lg" />
      {label && <p className="text-sm">{label}</p>}
    </div>
  );
}

export default Spinner;
