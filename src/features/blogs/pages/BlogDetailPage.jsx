import { Link, useParams } from "react-router-dom";
import { ArrowLeft, Clock, Calendar, Eye } from "lucide-react";
import { Button, Badge, ErrorState, Skeleton } from "@/components/ui";
import { useBlogBySlug } from "@/features/blogs";
import { routes } from "@/constants/routes";
import { formatDate } from "@/lib/format";
import { getErrorMessage } from "@/lib/errorHandler";

export default function BlogDetailPage() {
  const { slug } = useParams();
  const { data, isLoading, isError, error, refetch } = useBlogBySlug(slug);

  if (isLoading) {
    return (
      <div className="container-page max-w-3xl py-14">
        <Skeleton className="h-8 w-40" />
        <Skeleton className="mt-6 h-64 w-full rounded-xl" />
        <div className="mt-6 space-y-3">
          <Skeleton className="h-10 w-3/4" />
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-2/3" />
        </div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="container-page max-w-3xl py-14">
        <ErrorState title="Post not found" message={getErrorMessage(error)} onRetry={refetch} />
        <div className="mt-6">
          <Button
            as={Link}
            to={routes.blog}
            variant="secondary"
            leftIcon={<ArrowLeft className="h-4 w-4" />}
          >
            Back to blog
          </Button>
        </div>
      </div>
    );
  }

  const post = data?.post;
  if (!post) return null;

  return (
    <article className="container-page max-w-3xl py-14">
      <Button
        as={Link}
        to={routes.blog}
        variant="ghost"
        size="sm"
        leftIcon={<ArrowLeft className="h-4 w-4" />}
        className="mb-6"
      >
        All posts
      </Button>

      <div className="flex flex-wrap items-center gap-2">
        <Badge tone="brand">{post.category}</Badge>
        {post.featured && <Badge tone="warning">Featured</Badge>}
        {!post.published && <Badge tone="neutral">Draft</Badge>}
      </div>

      <h1 className="mt-4 font-heading text-4xl font-bold leading-tight tracking-tight text-content-primary sm:text-5xl">
        {post.title}
      </h1>

      <div className="mt-5 flex flex-wrap items-center gap-4 text-sm text-content-muted">
        <span className="inline-flex items-center gap-1.5">
          <Calendar className="h-4 w-4" /> {formatDate(post.publishedAt)}
        </span>
        <span className="inline-flex items-center gap-1.5">
          <Clock className="h-4 w-4" /> {post.readingTime} min read
        </span>
        <span className="inline-flex items-center gap-1.5">
          <Eye className="h-4 w-4" /> {post.views ?? 0} views
        </span>
      </div>

      {post.coverImage && (
        <img
          src={post.coverImage}
          alt={post.title}
          className="mt-8 aspect-video w-full rounded-xl border border-border object-cover"
        />
      )}

      <div className="mt-8 whitespace-pre-line text-lg leading-relaxed text-content-secondary">
        {post.content}
      </div>

      {post.tags?.length > 0 && (
        <div className="mt-10 flex flex-wrap gap-2 border-t border-border pt-6">
          {post.tags.map((tag) => (
            <Link
              key={tag}
              to={`/blog/tag/${tag}`}
              className="rounded-full bg-bg-muted px-3 py-1 text-xs font-medium text-content-secondary transition-colors hover:text-brand-500"
            >
              #{tag}
            </Link>
          ))}
        </div>
      )}
    </article>
  );
}
