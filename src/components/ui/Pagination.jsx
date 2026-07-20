import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/cn";

function getPageRange(current, totalPages) {
  const delta = 1;
  const range = [];
  const start = Math.max(1, current - delta);
  const end = Math.min(totalPages, current + delta);
  if (start > 1) range.push(1, ...(start > 2 ? ["…"] : []));
  for (let i = start; i <= end; i++) range.push(i);
  if (end < totalPages) range.push(...(end < totalPages - 1 ? ["…"] : []), totalPages);
  return range;
}

export function Pagination({ page, totalPages, onChange, className }) {
  if (!totalPages || totalPages <= 1) return null;
  const pages = getPageRange(page, totalPages);

  return (
    <nav
      className={cn("flex items-center justify-center gap-1", className)}
      aria-label="Pagination"
    >
      <button
        type="button"
        onClick={() => onChange?.(page - 1)}
        disabled={page <= 1}
        className="inline-flex h-9 items-center gap-1 rounded-md border border-border px-3 text-sm text-content-secondary transition-colors hover:bg-surface-hover disabled:cursor-not-allowed disabled:opacity-40"
      >
        <ChevronLeft className="h-4 w-4" /> Prev
      </button>
      {pages.map((p, i) =>
        p === "…" ? (
          <span key={`gap-${i}`} className="px-2 text-content-muted">
            …
          </span>
        ) : (
          <button
            key={p}
            type="button"
            onClick={() => onChange?.(p)}
            aria-current={p === page ? "page" : undefined}
            className={cn(
              "h-9 min-w-9 rounded-md border px-3 text-sm transition-colors",
              p === page
                ? "border-brand-500 bg-brand-500 text-brand-fg"
                : "border-border text-content-secondary hover:bg-surface-hover"
            )}
          >
            {p}
          </button>
        )
      )}
      <button
        type="button"
        onClick={() => onChange?.(page + 1)}
        disabled={page >= totalPages}
        className="inline-flex h-9 items-center gap-1 rounded-md border border-border px-3 text-sm text-content-secondary transition-colors hover:bg-surface-hover disabled:cursor-not-allowed disabled:opacity-40"
      >
        Next <ChevronRight className="h-4 w-4" />
      </button>
    </nav>
  );
}

export default Pagination;
