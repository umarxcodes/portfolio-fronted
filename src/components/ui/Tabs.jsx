import { cn } from "@/lib/cn";

export function Tabs({ tabs, value, onChange, className }) {
  return (
    <div
      className={cn(
        "flex flex-wrap gap-1 rounded-lg border border-border bg-bg-subtle p-1",
        className
      )}
    >
      {tabs.map((tab) => {
        const active = tab.value === value;
        return (
          <button
            key={tab.value}
            type="button"
            onClick={() => onChange?.(tab.value)}
            className={cn(
              "relative rounded-md px-3.5 py-1.5 text-sm font-medium transition-colors duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500/50",
              active
                ? "bg-surface text-content-primary shadow-sm"
                : "text-content-muted hover:text-content-primary"
            )}
          >
            {tab.label}
            {tab.count != null && (
              <span className="ml-1.5 text-xs text-content-muted">{tab.count}</span>
            )}
          </button>
        );
      })}
    </div>
  );
}

export default Tabs;
