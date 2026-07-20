import { cn } from "@/lib/cn";
import { ChevronUp, ChevronDown, ChevronsUpDown } from "lucide-react";
import { EmptyState } from "./EmptyState";
import { Skeleton } from "./Skeleton";

export function DataTable({
  columns,
  data,
  loading,
  onRowClick,
  emptyTitle = "No records",
  emptyDescription,
  rowKey = (row) => row._id,
  className,
}) {
  if (loading) {
    return (
      <div className="space-y-2">
        {Array.from({ length: 5 }).map((_, i) => (
          <Skeleton key={i} className="h-12 w-full rounded-lg" />
        ))}
      </div>
    );
  }

  if (!data || data.length === 0) {
    return <EmptyState icon="empty" title={emptyTitle} description={emptyDescription} />;
  }

  return (
    <div className={cn("overflow-hidden rounded-lg border border-border", className)}>
      <div className="overflow-x-auto">
        <table className="w-full min-w-[640px] border-collapse text-left text-sm">
          <thead>
            <tr className="border-b border-border bg-bg-subtle text-xs uppercase tracking-wide text-content-muted">
              {columns.map((col) => (
                <th key={col.key} className="px-4 py-3 font-semibold">
                  {col.sortable ? (
                    <button
                      type="button"
                      onClick={() => col.onSort?.(col.key)}
                      className="inline-flex items-center gap-1 hover:text-content-primary"
                    >
                      {col.label}
                      {col.sortDir === "asc" ? (
                        <ChevronUp className="h-3.5 w-3.5" />
                      ) : col.sortDir === "desc" ? (
                        <ChevronDown className="h-3.5 w-3.5" />
                      ) : (
                        <ChevronsUpDown className="h-3.5 w-3.5 opacity-50" />
                      )}
                    </button>
                  ) : (
                    col.label
                  )}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {data.map((row) => (
              <tr
                key={rowKey(row)}
                onClick={() => onRowClick?.(row)}
                className={cn(
                  "border-b border-border last:border-0 transition-colors",
                  onRowClick && "cursor-pointer hover:bg-surface-hover"
                )}
              >
                {columns.map((col) => (
                  <td key={col.key} className="px-4 py-3 text-content-secondary">
                    {col.render ? col.render(row) : row[col.key]}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default DataTable;
