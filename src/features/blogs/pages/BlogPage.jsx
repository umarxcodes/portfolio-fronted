import { useParams, useNavigate, useSearchParams, Link } from "react-router-dom";
import { Clock } from "lucide-react";
import { Pagination, EmptyState, ErrorState, SkeletonCard } from "@/components/ui";
import { useBlogs, useBlogsByCategory, useBlogsByTag } from "@/features/blogs";
import { DEFAULT_PAGE_SIZE } from "@/constants/pagination";
import { truncate, formatDate, titleCase } from "@/lib/format";
import { getErrorMessage } from "@/lib/errorHandler";
import { cn } from "@/lib/cn";

export default function BlogPage() {
  const { category, tag } = useParams();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const page = Number(searchParams.get("page") || 1);

  const params = { page, limit: DEFAULT_PAGE_SIZE, sort: "-publishedAt" };
  const categoryQuery = useBlogsByCategory(category, params);
  const tagQuery = useBlogsByTag(tag, params);
  const allQuery = useBlogs(params);
  const query = category ? categoryQuery : tag ? tagQuery : allQuery;

  const { data, isLoading, isError, error, isFetching } = query;
  const items = data?.items || [];
  const pagination = data?.pagination;

  const title = category ? titleCase(category) : tag ? `#${tag}` : "Blog";
  const subtitle = category
    ? `Posts in ${category}`
    : tag
      ? `Posts tagged ${tag}`
      : "Notes, guides, and deep dives on engineering.";

  return (
    <div className="container-page py-14">
      <header className="mb-10">
        <p className="mb-2 text-xs font-semibold uppercase tracking-[0.2em] text-brand-500">
          Writing
        </p>
        <h1 className="text-4xl font-bold tracking-tight text-content-primary sm:text-5xl">
          {title}
        </h1>
        <p className="mt-3 max-w-2xl text-content-secondary">{subtitle}</p>
      </header>

      {isError ? (
        <ErrorState message={getErrorMessage(error)} onRetry={query.refetch} />
      ) : isLoading ? (
        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 6 }).map((_, i) => (
            <SkeletonCard key={i} />
          ))}
        </div>
      ) : items.length === 0 ? (
        <EmptyState icon="empty" title="No posts yet" description="New articles are on the way." />
      ) : (
        <>
          <div
            className={cn(
              "grid gap-5 md:grid-cols-2 lg:grid-cols-3",
              isFetching && "opacity-60 transition-opacity"
            )}
          >
            {items.map((post, i) => (
              <Link
                key={post._id}
                to={`/blog/${post.slug}`}
                className="group flex h-full flex-col overflow-hidden rounded-lg border border-border bg-surface shadow-sm transition-all duration-200 hover:-translate-y-1 hover:border-brand-500/40 hover:shadow-md"
                style={{ animationDelay: `${(i % 9) * 50}ms` }}
              >
                {post.coverImage && (
                  <div className="aspect-video overflow-hidden">
                    <img
                      src={post.coverImage}
                      alt={post.title}
                      className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                  </div>
                )}
                <div className="flex flex-1 flex-col p-5">
                  <div className="flex items-center gap-2">
                    <span className="rounded-full bg-brand-500/10 px-2.5 py-1 text-xs font-medium text-brand-600 dark:text-brand-300">
                      {post.category}
                    </span>
                    {post.featured && (
                      <span className="rounded-full bg-warning/10 px-2.5 py-1 text-xs font-medium text-warning">
                        Featured
                      </span>
                    )}
                  </div>
                  <h3 className="mt-3 font-heading text-lg font-bold text-content-primary group-hover:text-brand-500">
                    {post.title}
                  </h3>
                  <p className="mt-2 flex-1 text-sm leading-relaxed text-content-secondary">
                    {truncate(post.excerpt, 110)}
                  </p>
                  <div className="mt-4 flex items-center justify-between text-2xs text-content-muted">
                    <span>{formatDate(post.publishedAt)}</span>
                    <span className="inline-flex items-center gap-1">
                      <Clock className="h-3.5 w-3.5" /> {post.readingTime} min
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
          <div className="mt-10">
            <Pagination
              page={pagination?.page}
              totalPages={pagination?.totalPages}
              onChange={(p) => navigate(`?page=${p}`)}
            />
          </div>
        </>
      )}
    </div>
  );
}
