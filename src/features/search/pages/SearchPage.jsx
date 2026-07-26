import { useState } from "react";
import { Link } from "react-router-dom";
import { Search, X } from "lucide-react";
import { Input, Tabs, EmptyState, ErrorState, Spinner } from "@/components/ui";
import { Field } from "@/components/ui";
import { Reveal } from "@/components/common/Reveal";
import { useSearch } from "@/features/search";
import { useDebounce } from "@/hooks";
import { SEARCH_TYPES } from "@/constants/enums";
import { truncate } from "@/lib/format";
import { getErrorMessage } from "@/lib/errorHandler";
import { cn } from "@/lib/cn";

const LABELS = {
  projects: "Projects",
  blogs: "Blog",
  skills: "Skills",
  experience: "Experience",
  education: "Education",
  certificates: "Certificates",
};

function ResultRow({ item }) {
  const title = item.title || item.name || item.company || item.degree || item.subject;
  const sub =
    item.excerpt || item.shortDescription || item.description || item.category || item.issuer;
  const to =
    item.slug && (item.category || item.publishedAt !== undefined)
      ? `/blog/${item.slug}`
      : item.slug
        ? `/projects/${item.slug}`
        : null;
  const content = (
    <div className="flex items-center justify-between gap-3 border-b border-border px-4 py-3 last:border-0 hover:bg-surface-hover">
      <div className="min-w-0">
        <p className="truncate font-medium text-content-primary">{title}</p>
        {sub && <p className="truncate text-sm text-content-muted">{truncate(sub, 80)}</p>}
      </div>
      <span className="text-2xs text-content-muted">{item.category || item.level || ""}</span>
    </div>
  );
  return to ? <Link to={to}>{content}</Link> : content;
}

export default function SearchPage() {
  const [query, setQuery] = useState("");
  const [type, setType] = useState("");
  const debounced = useDebounce(query, 300);

  const { data, isLoading, isError, error, isFetching } = useSearch({
    q: debounced,
    type: type || undefined,
    limit: 10,
  });

  const results = data?.results || {};
  const buckets = Object.entries(results).filter(([, v]) => v?.items?.length);

  const tabs = [
    { value: "", label: "All" },
    ...SEARCH_TYPES.map((t) => ({ value: t, label: LABELS[t] || t })),
  ];

  return (
    <div className="container-page max-w-3xl py-14">
      <header className="mb-8">
        <Reveal>
          <h1 className="text-4xl font-bold tracking-tight text-content-primary sm:text-5xl">
            Search
          </h1>
        </Reveal>
        <Reveal delay={80}>
          <p className="mt-3 text-content-secondary">
            Find projects, posts, skills, and credentials across the portfolio.
          </p>
        </Reveal>
      </header>

      <Reveal delay={120}>
        <Field label="Query">
          <div className="relative">
            <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-content-muted" />
            <Input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search the portfolio…"
              className="pl-10 pr-10"
              autoFocus
            />
            {query && (
              <button
                type="button"
                onClick={() => setQuery("")}
                aria-label="Clear"
                className="absolute right-3 top-1/2 -translate-y-1/2 text-content-muted hover:text-content-primary"
              >
                <X className="h-4 w-4" />
              </button>
            )}
          </div>
        </Field>
      </Reveal>

      <Reveal delay={160}>
        <div className="mt-4">
          <Tabs tabs={tabs} value={type} onChange={setType} />
        </div>
      </Reveal>

      <div className="mt-6">
        {!debounced.trim() ? (
          <EmptyState
            icon="search"
            title="Start typing to search"
            description="Results update as you type."
          />
        ) : isLoading ? (
          <div className="flex justify-center py-16">
            <Spinner size="lg" />
          </div>
        ) : isError ? (
          <ErrorState message={getErrorMessage(error)} />
        ) : buckets.length === 0 ? (
          <EmptyState
            icon="search"
            title="No results found"
            description={`Nothing matched "${debounced}".`}
          />
        ) : (
          <div className={cn("space-y-6 transition-opacity", isFetching && "opacity-60")}>
            {buckets.map(([bucket, result], i) => (
              <Reveal key={bucket} delay={i * 60}>
                <section className="overflow-hidden rounded-lg border border-border bg-surface">
                  <div className="flex items-center justify-between border-b border-border px-4 py-3">
                    <h2 className="font-heading text-sm font-bold uppercase tracking-wide text-content-primary">
                      {LABELS[bucket] || bucket}
                    </h2>
                    <span className="text-2xs text-content-muted">
                      {result.pagination?.total ?? result.items.length} results
                    </span>
                  </div>
                  <div>
                    {result.items.map((item) => (
                      <ResultRow key={item._id} item={item} />
                    ))}
                  </div>
                </section>
              </Reveal>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
