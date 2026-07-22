import { Link } from "react-router-dom";
import { ArrowRight, Code2 } from "lucide-react";
import { Button, Badge, SkeletonCard } from "@/components/ui";
import { Reveal } from "@/components/common/Reveal";
import { routes } from "@/constants/routes";
import { titleCase, truncate } from "@/lib/format";

function ProjectCard({ project, index }) {
  return (
    <Reveal key={project._id} delay={index * 80}>
      <Link
        to={`/projects/${project.slug}`}
        className="group block h-full overflow-hidden rounded-lg border border-border bg-surface shadow-sm transition-all duration-200 hover:-translate-y-1 hover:border-brand-500/40 hover:shadow-md"
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
        <div className="p-5">
          <div className="flex items-center justify-between gap-3">
            <Badge tone="brand">{project.category}</Badge>
            <span className="text-2xs text-content-muted">{titleCase(project.status)}</span>
          </div>
          <h3 className="mt-3 font-heading text-lg font-bold text-content-primary">
            {project.title}
          </h3>
          <p className="mt-2 text-sm leading-relaxed text-content-secondary">
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
        </div>
      </Link>
    </Reveal>
  );
}

export function FeaturedProjects({ projects, isLoading }) {
  if (isLoading) {
    return (
      <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: 3 }).map((_, i) => (
          <SkeletonCard key={i} />
        ))}
      </div>
    );
  }

  if (!projects.length) {
    return <p className="py-8 text-center text-sm text-content-muted">No featured projects yet.</p>;
  }

  return (
    <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
      {projects.map((project, i) => (
        <ProjectCard key={project._id} project={project} index={i} />
      ))}
    </div>
  );
}

export function FeaturedProjectsSection({ projects, isLoading }) {
  return (
    <Section icon={Code2} title="Featured Work" action="All projects" actionTo={routes.projects}>
      <FeaturedProjects projects={projects} isLoading={isLoading} />
    </Section>
  );
}

export function Section({ icon: Icon, title, action, actionTo, children }) {
  return (
    <section className="border-t border-border">
      <div className="container-page py-16 lg:py-20">
        <div className="mb-10 flex items-end justify-between gap-4">
          <div className="flex items-center gap-3">
            <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-brand-500/10 text-brand-600 dark:text-brand-300">
              <Icon className="h-5 w-5" />
            </span>
            <h2 className="text-3xl font-bold tracking-tight text-content-primary">{title}</h2>
          </div>
          {action && (
            <Button
              as={Link}
              to={actionTo}
              variant="ghost"
              size="sm"
              rightIcon={<ArrowRight className="h-4 w-4" />}
            >
              {action}
            </Button>
          )}
        </div>
        {children}
      </div>
    </section>
  );
}
