import { memo } from "react";
import { cn } from "@/lib/cn";

export const Card = memo(function Card({ className, children, hover, ...props }) {
  return (
    <div
      className={cn(
        "rounded-lg border border-border bg-surface shadow-sm transition-all duration-300 ease-out-expo",
        hover && "hover:-translate-y-0.5 hover:border-brand-500/40 hover:shadow-md",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
});

export const CardHeader = memo(function CardHeader({ className, children, ...props }) {
  return (
    <div
      className={cn(
        "flex items-center justify-between gap-4 border-b border-border px-5 py-4",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
});

export const CardTitle = memo(function CardTitle({ className, children, ...props }) {
  return (
    <h3 className={cn("text-base font-semibold text-content-primary", className)} {...props}>
      {children}
    </h3>
  );
});

export const CardBody = memo(function CardBody({ className, children, ...props }) {
  return (
    <div className={cn("p-5", className)} {...props}>
      {children}
    </div>
  );
});

export const CardFooter = memo(function CardFooter({ className, children, ...props }) {
  return (
    <div className={cn("border-t border-border px-5 py-4", className)} {...props}>
      {children}
    </div>
  );
});

export default Card;
