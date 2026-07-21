import { cn } from "@/lib/cn";
import { initials } from "@/lib/format";

export function Avatar({ src, name = "", size = "md", className }) {
  const sizes = {
    sm: "h-8 w-8 text-xs",
    md: "h-10 w-10 text-sm",
    lg: "h-14 w-14 text-lg",
    xl: "h-20 w-20 text-2xl",
  };
  if (src) {
    return (
      <img
        src={src}
        alt={name}
        className={cn("rounded-full object-cover ring-2 ring-border", sizes[size], className)}
      />
    );
  }
  return (
    <span
      className={cn(
        "inline-flex items-center justify-center rounded-full bg-brand-500/15 font-semibold text-brand-600 dark:text-brand-300 ring-2 ring-border",
        sizes[size],
        className
      )}
    >
      {initials(name)}
    </span>
  );
}

export default Avatar;
