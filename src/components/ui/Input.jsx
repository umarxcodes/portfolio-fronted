import { forwardRef } from "react";
import { cn } from "@/lib/cn";

export const Field = ({ label, error, hint, required, htmlFor, children, className }) => (
  <div className={cn("grid gap-1.5", className)}>
    {label && (
      <label htmlFor={htmlFor} className="text-sm font-medium text-content-primary">
        {label}
        {required && <span className="ml-0.5 text-danger">*</span>}
      </label>
    )}
    {children}
    {error ? (
      <p className="text-xs text-danger">{error}</p>
    ) : hint ? (
      <p className="text-xs text-content-muted">{hint}</p>
    ) : null}
  </div>
);

const baseControl =
  "w-full rounded-md border border-border bg-surface px-3 text-sm text-content-primary placeholder:text-content-muted transition-colors duration-150 focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-500/30 disabled:cursor-not-allowed disabled:opacity-60";

export const Input = forwardRef(function Input({ className, error, ...props }, ref) {
  return (
    <input
      ref={ref}
      className={cn(
        baseControl,
        "h-10",
        error && "border-danger focus:border-danger focus:ring-danger/30",
        className
      )}
      {...props}
    />
  );
});

export const Textarea = forwardRef(function Textarea(
  { className, error, rows = 4, ...props },
  ref
) {
  return (
    <textarea
      ref={ref}
      rows={rows}
      className={cn(
        baseControl,
        "py-2.5 leading-relaxed",
        error && "border-danger focus:border-danger focus:ring-danger/30",
        className
      )}
      {...props}
    />
  );
});

export default Input;
