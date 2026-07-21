import { Skeleton } from "@/components/ui";

/**
 * Lightweight, layout-aware fallback used while lazily-loaded route chunks
 * resolve. Uses skeletons (not a spinner) to avoid layout-shift jank and
 * keep the transition non-jarring. Fades in gently.
 */
export function RouteFallback() {
  return (
    <div className="container-page animate-fade-in py-16" aria-busy="true" aria-live="polite">
      <span className="sr-only">Loading…</span>
      <div className="space-y-6">
        <Skeleton className="h-9 w-2/3 max-w-md" />
        <Skeleton className="h-5 w-1/2 max-w-sm" />
        <div className="grid gap-5 pt-6 md:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 6 }).map((_, i) => (
            <Skeleton key={i} className="h-44 rounded-lg" />
          ))}
        </div>
      </div>
    </div>
  );
}

export default RouteFallback;
