import { forwardRef } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { cn } from "@/lib/cn";

const VARIANTS = {
  primary: "bg-brand-500 text-brand-fg shadow-sm hover:bg-brand-600 active:bg-brand-700",
  secondary: "bg-surface text-content-primary border border-border hover:bg-surface-hover",
  ghost: "text-content-secondary hover:bg-surface-hover hover:text-content-primary",
  danger: "bg-danger/10 text-danger border border-danger/30 hover:bg-danger/20",
  outline: "border border-brand-500/50 text-brand-600 dark:text-brand-400 hover:bg-brand-500/10",
  link: "text-brand-600 dark:text-brand-400 underline-offset-4 hover:underline",
};

const SIZES = {
  xs: "h-7 px-2.5 text-xs gap-1.5",
  sm: "h-8 px-3 text-xs gap-1.5",
  md: "h-10 px-4 text-sm gap-2",
  lg: "h-12 px-6 text-base gap-2.5",
  icon: "h-9 w-9 p-0",
};

const Button = forwardRef(function Button(
  {
    as: Comp = "button",
    variant = "primary",
    size = "md",
    className,
    children,
    isLoading,
    loadingText,
    leftIcon,
    rightIcon,
    disabled,
    fullWidth,
    ...props
  },
  ref
) {
  const prefersReduced = useReducedMotion();
  const tapAnimation = prefersReduced
    ? { scale: 1 }
    : { scale: 0.97, transition: { duration: 0.12, ease: "easeOut" } };

  return (
    <motion.div
      whileTap={tapAnimation}
      whileHover={prefersReduced ? {} : { y: -1 }}
      transition={{ duration: 0.18, ease: [0.33, 1, 0.68, 1] }}
    >
      <Comp
        ref={ref}
        disabled={disabled || isLoading}
        className={cn(
          "inline-flex select-none items-center justify-center rounded-md font-medium transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500/60 focus-visible:ring-offset-2 focus-visible:ring-offset-bg-base disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:translate-y-0",
          VARIANTS[variant],
          SIZES[size],
          fullWidth && "w-full",
          className
        )}
        {...props}
      >
        {isLoading ? (
          <>
            <span className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
            {loadingText || children}
          </>
        ) : (
          <>
            {leftIcon && <span className="shrink-0">{leftIcon}</span>}
            {children}
            {rightIcon && <span className="shrink-0">{rightIcon}</span>}
          </>
        )}
      </Comp>
    </motion.div>
  );
});

export { Button };
export default Button;
