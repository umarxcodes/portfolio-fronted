import { forwardRef } from "react";
import { cn } from "@/lib/cn";

export const Checkbox = forwardRef(function Checkbox({ className, label, id, ...props }, ref) {
  const input = (
    <input
      ref={ref}
      id={id}
      type="checkbox"
      className={cn(
        "h-4 w-4 rounded border-border text-brand-500 accent-brand-500 focus:ring-2 focus:ring-brand-500/40 focus:ring-offset-0",
        className
      )}
      {...props}
    />
  );
  if (!label) return input;
  return (
    <label className="inline-flex cursor-pointer items-center gap-2.5 text-sm text-content-primary">
      {input}
      <span>{label}</span>
    </label>
  );
});

export const Radio = forwardRef(function Radio({ className, label, id, ...props }, ref) {
  const input = (
    <input
      ref={ref}
      id={id}
      type="radio"
      className={cn(
        "h-4 w-4 border-border text-brand-500 accent-brand-500 focus:ring-2 focus:ring-brand-500/40",
        className
      )}
      {...props}
    />
  );
  if (!label) return input;
  return (
    <label className="inline-flex cursor-pointer items-center gap-2.5 text-sm text-content-primary">
      {input}
      <span>{label}</span>
    </label>
  );
});

export default Checkbox;
