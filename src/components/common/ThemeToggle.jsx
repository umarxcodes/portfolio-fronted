import { Moon, Sun, Monitor } from "lucide-react";
import { useTheme } from "@/context";
import { cn } from "@/lib/cn";

const OPTIONS = [
  { value: "light", icon: Sun, label: "Light" },
  { value: "dark", icon: Moon, label: "Dark" },
  { value: "system", icon: Monitor, label: "System" },
];

export function ThemeToggle({ variant = "segment" }) {
  const { theme, setTheme } = useTheme();

  if (variant === "button") {
    const next = theme === "dark" ? "light" : "dark";
    return (
      <button
        type="button"
        onClick={() => setTheme(next)}
        aria-label="Toggle theme"
        className="inline-flex h-9 w-9 items-center justify-center rounded-md border border-border text-content-secondary transition-colors hover:bg-surface-hover hover:text-content-primary"
      >
        {theme === "dark" ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
      </button>
    );
  }

  return (
    <div className="inline-flex items-center gap-0.5 rounded-lg border border-border bg-bg-subtle p-0.5">
      {OPTIONS.map((opt) => {
        const Icon = opt.icon;
        const active = theme === opt.value;
        return (
          <button
            key={opt.value}
            type="button"
            onClick={() => setTheme(opt.value)}
            aria-label={`${opt.label} theme`}
            aria-pressed={active}
            className={cn(
              "inline-flex h-7 w-7 items-center justify-center rounded-md transition-colors",
              active
                ? "bg-surface text-brand-600 shadow-sm dark:text-brand-300"
                : "text-content-muted hover:text-content-primary"
            )}
          >
            <Icon className="h-4 w-4" />
          </button>
        );
      })}
    </div>
  );
}

export default ThemeToggle;
