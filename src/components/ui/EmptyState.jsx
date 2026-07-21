import { cn } from "@/lib/cn";
import { Inbox, Search, AlertTriangle, FileX } from "lucide-react";

const ICONS = { empty: Inbox, search: Search, error: AlertTriangle, notFound: FileX };

export function EmptyState({ icon = "empty", title, description, action, className }) {
  const Icon = ICONS[icon] || ICONS.empty;
  return (
    <div
      className={cn(
        "flex flex-col items-center justify-center rounded-lg border border-dashed border-border bg-surface/40 px-6 py-12 text-center",
        className
      )}
    >
      <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-bg-muted text-content-muted">
        <Icon className="h-6 w-6" />
      </div>
      <h3 className="text-base font-semibold text-content-primary">{title}</h3>
      {description && <p className="mt-1.5 max-w-sm text-sm text-content-muted">{description}</p>}
      {action && <div className="mt-5">{action}</div>}
    </div>
  );
}

export default EmptyState;
