import { Link, useParams } from "react-router-dom";
import { ArrowLeft, ExternalLink, Calendar, Layers } from "lucide-react";
import { GithubIcon } from "@/components/common/BrandIcons";
import { Button, Badge, ErrorState, Skeleton } from "@/components/ui";
import { Reveal } from "@/components/common/Reveal";
import { FadeImage } from "@/motion/FadeImage";
import { useProjectBySlug } from "@/features/projects";
import { routes } from "@/constants/routes";
import { titleCase, formatYearRange } from "@/lib/format";
import { getErrorMessage } from "@/lib/errorHandler";

export default function ProjectDetailPage() {
  const { slug } = useParams();
  const { data, isLoading, isError, error, refetch } = useProjectBySlug(slug);

  if (isLoading) {
    return (
      <div className="container-page max-w-4xl py-14">
        <Skeleton className="h-8 w-40" />
        <Skeleton className="mt-6 aspect-video w-full rounded-lg" />
        <div className="mt-6 space-y-3">
          <Skeleton className="h-8 w-2/3" />
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-5/6" />
        </div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="container-page max-w-4xl py-14">
        <ErrorState title="Project not found" message={getErrorMessage(error)} onRetry={refetch} />
        <div className="mt-6">
          <Button
            as={Link}
            to={routes.projects}
            variant="secondary"
            leftIcon={<ArrowLeft className="h-4 w-4" />}
          >
            Back to projects
          </Button>
        </div>
      </div>
    );
  }

  const project = data?.project;
  if (!project) return null;

  return (
    <article className="container-page max-w-4xl py-14">
      <Reveal>
        <Button
          as={Link}
          to={routes.projects}
          variant="ghost"
          size="sm"
          leftIcon={<ArrowLeft className="h-4 w-4" />}
          className="mb-6"
        >
          All projects
        </Button>
      </Reveal>

      <Reveal delay={60}>
        <div className="flex flex-wrap items-center gap-2">
          <Badge tone="brand">{project.category}</Badge>
          <Badge>{titleCase(project.status)}</Badge>
          {project.featured && <Badge tone="warning">Featured</Badge>}
        </div>
      </Reveal>

      <Reveal delay={100}>
        <h1 className="mt-4 font-heading text-4xl font-bold leading-tight tracking-tight text-content-primary sm:text-5xl">
          {project.title}
        </h1>
      </Reveal>
      <Reveal delay={140}>
        <p className="mt-4 text-lg text-content-secondary">{project.shortDescription}</p>
      </Reveal>

      <Reveal delay={180}>
        <div className="mt-6 flex flex-wrap gap-3">
          {project.githubUrl && (
            <Button
              as="a"
              href={project.githubUrl}
              target="_blank"
              rel="noreferrer"
              variant="secondary"
              leftIcon={<GithubIcon className="h-4 w-4" />}
            >
              Source
            </Button>
          )}
          {project.liveUrl && (
            <Button
              as="a"
              href={project.liveUrl}
              target="_blank"
              rel="noreferrer"
              leftIcon={<ExternalLink className="h-4 w-4" />}
            >
              Live demo
            </Button>
          )}
        </div>
      </Reveal>

      {project.thumbnail && (
        <Reveal delay={200}>
          <FadeImage
            src={project.thumbnail}
            alt={project.title}
            width={1280}
            height={720}
            className="mt-8 aspect-video w-full rounded-xl border border-border"
          />
        </Reveal>
      )}

      <div className="mt-8 grid gap-8 lg:grid-cols-[1fr_280px]">
        <div>
          <Reveal>
            <h2 className="font-heading text-xl font-bold text-content-primary">Overview</h2>
          </Reveal>
          <Reveal delay={80}>
            <p className="mt-3 whitespace-pre-line leading-relaxed text-content-secondary">
              {project.description}
            </p>
          </Reveal>

          {project.images?.length > 0 && (
            <Reveal delay={120}>
              <div className="mt-8 grid gap-3 sm:grid-cols-2">
                {project.images.map((img, i) => (
                  <FadeImage
                    key={i}
                    src={img}
                    alt={`${project.title} screenshot ${i + 1}`}
                    width={640}
                    height={360}
                    loading="lazy"
                    className="rounded-lg border border-border"
                  />
                ))}
              </div>
            </Reveal>
          )}
        </div>

        <aside className="space-y-5">
          <Reveal delay={100}>
            <div className="rounded-lg border border-border bg-surface p-5">
              <h3 className="font-heading text-sm font-semibold text-content-primary">
                Tech Stack
              </h3>
              <ul className="mt-3 flex flex-col gap-2">
                {project.techStack?.map((t) => (
                  <li key={t} className="flex items-center gap-2 text-sm text-content-secondary">
                    <Layers className="h-4 w-4 text-brand-500" /> {t}
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
          <Reveal delay={140}>
            <div className="rounded-lg border border-border bg-surface p-5 text-sm">
              <div className="flex items-center gap-2 text-content-secondary">
                <Calendar className="h-4 w-4 text-brand-500" />
                <span>{formatYearRange(project.startDate, project.endDate, false)}</span>
              </div>
            </div>
          </Reveal>
        </aside>
      </div>
    </article>
  );
}
