import { memo } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { cn } from "@/lib/cn";
import { motionEasing, motionDuration } from "@/motion";

export const Card = memo(function Card({ className, children, hover, ...props }) {
  const prefersReduced = useReducedMotion();
  const transition = { duration: motionDuration.base, ease: motionEasing.easeOutExpo };

  if (prefersReduced || !hover) {
    return (
      <div
        className={cn("rounded-lg border border-border bg-surface shadow-sm", className)}
        {...props}
      >
        {children}
      </div>
    );
  }

  return (
    <motion.div
      className={cn("rounded-lg border border-border bg-surface shadow-sm", className)}
      whileHover={{ y: -4, boxShadow: "0 10px 25px -12px rgb(var(--shadow-color) / 0.25)" }}
      transition={transition}
      {...props}
    >
      {children}
    </motion.div>
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
