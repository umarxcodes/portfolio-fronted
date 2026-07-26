import { useState } from "react";
import { useParams, useNavigate, Link, useSearchParams } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { Button, Pagination, EmptyState, ErrorState, SkeletonCard } from "@/components/ui";
import { Reveal } from "@/components/common/Reveal";
import { useProjects, useProjectsByCategory } from "@/features/projects";
import { PROJECT_CATEGORIES } from "@/constants/enums";
import { DEFAULT_PAGE_SIZE } from "@/constants/pagination";
import { titleCase, truncate } from "@/lib/format";
import { getErrorMessage } from "@/lib/errorHandler";
import { cn } from "@/lib/cn";

export default function ProjectsPage() {
  const { category } = useParams();
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
  const page = Number(searchParams.get("page") || 1);
  const [activeCat, setActiveCat] = useState(category || "");

  const params = {
    page,
    limit: DEFAULT_PAGE_SIZE,
    sort: "-createdAt",
    ...(activeCat ? { category: activeCat } : {}),
  };

  const categoryQuery = useProjectsByCategory(activeCat, params);
  const allQuery = useProjects(params);
  const listQuery = activeCat ? categoryQuery : allQuery;
  const { data, isLoading, isError, error, isFetching } = listQuery;
  const items = data?.items || [];
  const pagination = data?.pagination;

  function selectCategory(cat) {
    setActiveCat(cat);
    setSearchParams({});
  }

  return (
    <div className="container-page py-14">
      <header className="mb-10">
        <Reveal>
          <p className="mb-2 text-xs font-semibold uppercase tracking-[0.2em] text-brand-500">
            Portfolio
          </p>
        </Reveal>
        <Reveal delay={80}>
          <h1 className="text-4xl font-bold tracking-tight text-content-primary sm:text-5xl">
            Projects
          </h1>
        </Reveal>
        <Reveal delay={140}>
          <p className="mt-3 max-w-2xl text-content-secondary">
            Selected engineering work across frontend, backend, and full-stack systems.
          </p>
        </Reveal>
      </header>

      <Reveal delay={180}>
        <div className="mb-8 flex flex-wrap gap-2">
          <Button
            variant={activeCat ? "secondary" : "primary"}
            size="sm"
            onClick={() => selectCategory("")}
          >
            All
          </Button>
          {PROJECT_CATEGORIES.map((cat) => (
            <Button
              key={cat}
              variant={activeCat === cat ? "primary" : "secondary"}
              size="sm"
              onClick={() => selectCategory(cat)}
            >
              {titleCase(cat)}
            </Button>
          ))}
        </div>
      </Reveal>

      {isError ? (
        <Reveal delay={80}>
          <ErrorState message={getErrorMessage(error)} onRetry={listQuery.refetch} />
        </Reveal>
      ) : isLoading ? (
        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 6 }).map((_, i) => (
            <SkeletonCard key={i} />
          ))}
        </div>
      ) : items.length === 0 ? (
        <Reveal delay={80}>
          <EmptyState
            icon="empty"
            title="No projects yet"
            description="Check back soon or filter by a different category."
          />
        </Reveal>
      ) : (
        <>
          <div className={cnGrid(isFetching)}>
            {items.map((project, i) => (
              <Reveal key={project._id} delay={(i % 9) * 50}>
                <Link
                  to={`/projects/${project.slug}`}
                  className="group flex h-full flex-col overflow-hidden rounded-lg border border-border bg-surface shadow-sm transition-all duration-200 hover:-translate-y-1 hover:border-brand-500/40 hover:shadow-md"
                >
                  {project.thumbnail && (
                    <div className="aspect-video overflow-hidden">
                      <img
                        src={project.thumbnail}
                        alt={project.title}
                        width={640}
                        height={360}
                        loading="lazy"
                        className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                      />
                    </div>
                  )}
                  <div className="flex flex-1 flex-col p-5">
                    <div className="flex items-center justify-between gap-3">
                      <span className="rounded-full bg-brand-500/10 px-2.5 py-1 text-xs font-medium capitalize text-brand-600 dark:text-brand-300">
                        {project.category}
                      </span>
                      <span className="text-2xs text-content-muted">
                        {titleCase(project.status)}
                      </span>
                    </div>
                    <h3 className="mt-3 font-heading text-lg font-bold text-content-primary">
                      {project.title}
                    </h3>
                    <p className="mt-2 flex-1 text-sm leading-relaxed text-content-secondary">
                      {truncate(project.shortDescription, 110)}
                    </p>
                    <div className="mt-4 flex flex-wrap gap-1.5">
                      {project.techStack?.slice(0, 4).map((t) => (
                        <span
                          key={t}
                          className="rounded bg-bg-muted px-2 py-0.5 text-2xs text-content-secondary"
                        >
                          {t}
                        </span>
                      ))}
                    </div>
                    <span className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-brand-500 opacity-0 transition-opacity group-hover:opacity-100">
                      View project <ArrowRight className="h-4 w-4" />
                    </span>
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>
          <Reveal delay={100}>
            <div className="mt-10">
              <Pagination
                page={pagination?.page}
                totalPages={pagination?.totalPages}
                onChange={(p) => navigate(`?page=${p}`)}
              />
            </div>
          </Reveal>
        </>
      )}
    </div>
  );
}

function cnGrid(fetching) {
  return cn(
    "grid gap-5 md:grid-cols-2 lg:grid-cols-3 transition-opacity",
    fetching && "opacity-60"
  );
}
