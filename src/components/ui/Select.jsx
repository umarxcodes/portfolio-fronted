import { forwardRef } from "react";
import { cn } from "@/lib/cn";

export const Select = forwardRef(function Select({ className, error, children, ...props }, ref) {
  return (
    <select
      ref={ref}
      className={cn(
        "h-10 w-full rounded-md border border-border bg-surface px-3 text-sm text-content-primary transition-colors duration-150 focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-500/30 disabled:cursor-not-allowed disabled:opacity-60",
        error && "border-danger focus:border-danger focus:ring-danger/30",
        className
      )}
      {...props}
    >
      {children}
    </select>
  );
});

export default Select;
