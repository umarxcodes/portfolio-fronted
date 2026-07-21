import { cn } from "@/lib/cn";

export function Tooltip({ label, children, side = "top", className }) {
  const pos = {
    top: "bottom-full left-1/2 -translate-x-1/2 mb-2",
    bottom: "top-full left-1/2 -translate-x-1/2 mt-2",
    left: "right-full top-1/2 -translate-y-1/2 mr-2",
    right: "left-full top-1/2 -translate-y-1/2 ml-2",
  };
  return (
    <span className={cn("group/tooltip relative inline-flex", className)}>
      {children}
      <span
        role="tooltip"
        className={cn(
          "pointer-events-none absolute z-50 whitespace-nowrap rounded-md bg-content-primary px-2 py-1 text-2xs font-medium text-bg-base opacity-0 shadow-md transition-opacity duration-150 group-hover/tooltip:opacity-100",
          pos[side]
        )}
      >
        {label}
      </span>
    </span>
  );
}

export default Tooltip;
