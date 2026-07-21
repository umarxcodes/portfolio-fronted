import { useState } from "react";
import { Link } from "react-router-dom";
import {
  ArrowRight,
  MapPin,
  Download,
  Mail,
  MessageCircle,
  Sparkles,
  Briefcase,
  GraduationCap,
  Award,
  Code2,
} from "lucide-react";
import { GithubIcon, LinkedinIcon, TwitterIcon } from "@/components/common/BrandIcons";
import { Button, Badge, SkeletonCard, ErrorState } from "@/components/ui";
import { Reveal } from "@/components/common/Reveal";
import { AnimatedNumber } from "@/components/common/AnimatedNumber";
import { useProfile } from "@/features/profile";
import { useSettings } from "@/features/settings";
import { useFeaturedProjects } from "@/features/projects";
import { useSkills } from "@/features/skills";
import { useExperience } from "@/features/experience";
import { useCurrentEducation } from "@/features/education";
import { useCertificates } from "@/features/certificates";
import { useFeaturedBlogs } from "@/features/blogs";
import { routes } from "@/constants/routes";
import { getErrorMessage } from "@/lib/errorHandler";
import { formatYearRange, titleCase, truncate } from "@/lib/format";
import { SKILL_LEVEL_META } from "@/constants/enums";
import { cn } from "@/lib/cn";
import { getIdentityProfile, getIdentitySettings, identity } from "@/config/identity";

function HeroPortrait({ profile }) {
  const [imgOk, setImgOk] = useState(Boolean(profile?.profileImage));
  const src = profile?.profileImage;

  return (
    <div className="relative mx-auto aspect-[4/5] w-full max-w-sm overflow-hidden rounded-2xl border border-border bg-surface shadow-lg">
      {src && imgOk ? (
        <img
          src={src}
          alt={profile.name}
          loading="lazy"
          onError={() => setImgOk(false)}
          className="h-full w-full object-cover"
        />
      ) : (
        <div className="flex h-full flex-col justify-end bg-gradient-to-br from-brand-600/30 to-accent/20 p-8">
          <p className="text-xs uppercase tracking-[0.3em] text-brand-500">{identity.name}</p>
          <p className="mt-3 font-heading text-3xl font-bold text-content-primary">
            Built for recruiters &amp; operators
          </p>
        </div>
      )}
      <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between rounded-xl border border-border bg-surface/80 px-4 py-3 backdrop-blur">
        <div>
          <p className="text-2xs text-content-muted">Experience</p>
          <p className="font-heading text-lg font-bold text-content-primary">
            <AnimatedNumber value={profile?.yearsOfExperience ?? 0} suffix="+ yrs" />
          </p>
        </div>
        <div className="h-8 w-px bg-border" />
        <div className="text-right">
          <p className="text-2xs text-content-muted">Status</p>
          <p className="font-heading text-lg font-bold text-content-primary">
            {profile?.availability ? "Open" : "Focused"}
          </p>
        </div>
      </div>
    </div>
  );
}

function Hero({ profile, settings }) {
  const social = {
    ...settings?.socialLinks,
    ...profile?.socialLinks,
  };
  return (
    <section className="relative overflow-hidden">
      <div className="surface-grid absolute inset-0 opacity-[0.4]" />
      <div className="pointer-events-none absolute -top-40 left-1/2 h-[480px] w-[480px] -translate-x-1/2 rounded-full bg-brand-500/20 blur-[120px]" />
      <div className="container-page relative grid min-h-[88vh] items-center gap-12 py-20 lg:grid-cols-[1.05fr_0.95fr]">
        <div>
          <Reveal>
            <span className="inline-flex items-center gap-2 rounded-full border border-brand-500/30 bg-brand-500/10 px-3 py-1 text-xs font-medium text-brand-600 dark:text-brand-300">
              <span
                className={cn(
                  "h-2 w-2 rounded-full",
                  profile?.availability ? "bg-success" : "bg-content-muted"
                )}
              />
              {profile?.availability
                ? "Available for opportunities"
                : "Currently focused on active work"}
            </span>
          </Reveal>
          <Reveal delay={80}>
            <h1 className="mt-6 text-5xl font-bold leading-[1.02] tracking-tight text-content-primary sm:text-6xl lg:text-7xl">
              {profile?.name || settings?.siteTitle || identity.name}
            </h1>
          </Reveal>
          <Reveal delay={140}>
            <p className="mt-4 text-2xl font-semibold text-gradient">
              {profile?.title || identity.title}
            </p>
          </Reveal>
          <Reveal delay={200}>
            <p className="mt-6 max-w-xl text-lg leading-relaxed text-content-secondary">
              {profile?.bio || settings?.siteDescription || identity.siteDescription}
            </p>
          </Reveal>
          <Reveal delay={260}>
            <div className="mt-8 flex flex-wrap items-center gap-3">
              <Button as={Link} to={routes.projects} rightIcon={<ArrowRight className="h-4 w-4" />}>
                View my work
              </Button>
              <Button as={Link} to={routes.contact} variant="secondary">
                Get in touch
              </Button>
              <Button
                as="a"
                href={identity.whatsappUrl}
                target="_blank"
                rel="noreferrer"
                variant="ghost"
                leftIcon={<MessageCircle className="h-4 w-4" />}
              >
                WhatsApp
              </Button>
              {profile?.resumeUrl && (
                <Button
                  as="a"
                  href={profile.resumeUrl}
                  target="_blank"
                  rel="noreferrer"
                  variant="ghost"
                  leftIcon={<Download className="h-4 w-4" />}
                >
                  Resume
                </Button>
              )}
            </div>
          </Reveal>
          <Reveal delay={320}>
            <div className="mt-8 flex flex-wrap items-center gap-5 text-sm text-content-muted">
              {profile?.location && (
                <span className="inline-flex items-center gap-1.5">
                  <MapPin className="h-4 w-4" /> {profile.location}
                </span>
              )}
              {profile?.email && (
                <a
                  href={`mailto:${profile.email}`}
                  className="inline-flex items-center gap-1.5 hover:text-content-primary"
                >
                  <Mail className="h-4 w-4" /> {profile.email}
                </a>
              )}
              {social.github && (
                <a
                  href={social.github}
                  target="_blank"
                  rel="noreferrer"
                  className="hover:text-content-primary"
                >
                  <GithubIcon className="h-4 w-4" />
                </a>
              )}
              {social.linkedin && (
                <a
                  href={social.linkedin}
                  target="_blank"
                  rel="noreferrer"
                  className="hover:text-content-primary"
                >
                  <LinkedinIcon className="h-4 w-4" />
                </a>
              )}
              {social.twitter && (
                <a
                  href={social.twitter}
                  target="_blank"
                  rel="noreferrer"
                  className="hover:text-content-primary"
                >
                  <TwitterIcon className="h-4 w-4" />
                </a>
              )}
            </div>
          </Reveal>
        </div>

        <Reveal delay={200} className="relative">
          <HeroPortrait profile={profile} />
        </Reveal>
      </div>
    </section>
  );
}

function StatsStrip({ stats }) {
  return (
    <section className="border-t border-border bg-bg-subtle">
      <div className="container-page grid grid-cols-2 gap-6 py-12 sm:grid-cols-4">
        {stats.map((stat, i) => (
          <Reveal key={stat.label} delay={i * 90} className="text-center">
            <p className="font-heading text-4xl font-bold text-gradient sm:text-5xl">
              <AnimatedNumber value={stat.value} suffix={stat.suffix || ""} />
            </p>
            <p className="mt-2 text-sm font-medium text-content-secondary">{stat.label}</p>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

function SectionCard({ icon: Icon, title, children, action, actionTo }) {
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

export default function HomePage() {
  const { data: profileData, error: pErr } = useProfile();
  const { data: settingsData } = useSettings();
  const { data: projectsData, isLoading: projLoad } = useFeaturedProjects({ limit: 6 });
  const { data: skillsData, isLoading: skillsLoad } = useSkills({
    limit: 50,
    sort: "displayOrder",
  });
  const { data: expData } = useExperience({ limit: 6, sort: "-startDate" });
  const { data: eduData } = useCurrentEducation();
  const { data: certData } = useCertificates({ limit: 6, sort: "-issueDate" });
  const { data: blogsData } = useFeaturedBlogs({ limit: 3 });

  const profile = getIdentityProfile(profileData?.profile);
  const settings = getIdentitySettings(settingsData?.settings);
  const projects = projectsData?.items || [];
  const skillGroups = skillsData?.groupedByCategory || {};
  const experiences = expData?.items || [];
  const education = eduData?.items || [];
  const certificates = certData?.items || [];
  const blogs = blogsData?.items || [];

  if (pErr) return <ErrorState message={getErrorMessage(pErr)} className="m-8" />;

  const skillCount = Object.values(skillGroups).reduce((sum, list) => sum + list.length, 0);
  const stats = [
    {
      label: "Years of experience",
      value: profile?.yearsOfExperience ?? 0,
      suffix: "+",
    },
    {
      label: "Projects shipped",
      value: projectsData?.total ?? projects.length,
      suffix: "+",
    },
    {
      label: "Skills & tools",
      value: skillsData?.total ?? skillCount,
      suffix: "+",
    },
    {
      label: "Certifications",
      value: certData?.total ?? certificates.length,
    },
  ];

  return (
    <div>
      <Hero profile={profile} settings={settings} />

      <StatsStrip stats={stats} />

      {/* Featured projects */}
      <SectionCard
        icon={Code2}
        title="Featured Work"
        action="All projects"
        actionTo={routes.projects}
      >
        {projLoad ? (
          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {Array.from({ length: 3 }).map((_, i) => (
              <SkeletonCard key={i} />
            ))}
          </div>
        ) : (
          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {projects.map((project, i) => (
              <Reveal key={project._id} delay={i * 80}>
                <Link
                  to={`/projects/${project.slug}`}
                  className="group block h-full overflow-hidden rounded-lg border border-border bg-surface shadow-sm transition-all duration-200 hover:-translate-y-1 hover:border-brand-500/40 hover:shadow-md"
                >
                  {project.thumbnail && (
                    <div className="aspect-video overflow-hidden">
                      <img
                        src={project.thumbnail}
                        alt={project.title}
                        className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                      />
                    </div>
                  )}
                  <div className="p-5">
                    <div className="flex items-center justify-between gap-3">
                      <Badge tone="brand">{project.category}</Badge>
                      <span className="text-2xs text-content-muted">
                        {titleCase(project.status)}
                      </span>
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
            ))}
          </div>
        )}
      </SectionCard>

      {/* Skills */}
      <SectionCard icon={Sparkles} title="Skills" action="Full stack" actionTo={routes.projects}>
        {skillsLoad ? (
          <div className="grid gap-5 md:grid-cols-3">
            {Array.from({ length: 3 }).map((_, i) => (
              <div key={i} className="h-40 skeleton rounded-lg" />
            ))}
          </div>
        ) : (
          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {Object.entries(skillGroups).map(([category, list]) => (
              <div key={category} className="rounded-lg border border-border bg-surface p-5">
                <h3 className="mb-4 font-heading text-base font-semibold capitalize text-content-primary">
                  {category}
                </h3>
                <ul className="space-y-3">
                  {list.map((skill) => {
                    const pct = SKILL_LEVEL_META[skill.level]?.percent || 50;
                    return (
                      <li key={skill._id}>
                        <div className="mb-1 flex items-center justify-between text-sm">
                          <span className="text-content-primary">{skill.name}</span>
                          <span className="text-2xs text-content-muted">{skill.level}</span>
                        </div>
                        <div className="h-1.5 overflow-hidden rounded-full bg-bg-muted">
                          <div
                            className="h-full rounded-full bg-brand-500"
                            style={{ width: `${pct}%` }}
                          />
                        </div>
                      </li>
                    );
                  })}
                </ul>
              </div>
            ))}
          </div>
        )}
      </SectionCard>

      {/* Experience */}
      <SectionCard icon={Briefcase} title="Experience" action="More" actionTo={routes.projects}>
        <div className="space-y-4">
          {experiences.map((exp, i) => (
            <Reveal key={exp._id} delay={i * 60}>
              <div className="flex flex-col gap-3 rounded-lg border border-border bg-surface p-5 sm:flex-row sm:items-start sm:justify-between">
                <div>
                  <h3 className="font-heading text-lg font-bold text-content-primary">
                    {exp.position}
                  </h3>
                  <p className="text-sm text-brand-500">{exp.company}</p>
                  <p className="mt-2 text-sm leading-relaxed text-content-secondary">
                    {truncate(exp.description, 140)}
                  </p>
                </div>
                <div className="shrink-0 text-sm text-content-muted sm:text-right">
                  <p>{formatYearRange(exp.startDate, exp.endDate, exp.isCurrent)}</p>
                  <p className="mt-1 capitalize">{exp.employmentType?.replace("-", " ")}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </SectionCard>

      {/* Education + Certificates */}
      <SectionCard icon={GraduationCap} title="Education & Certifications">
        <div className="grid gap-5 lg:grid-cols-2">
          <div className="space-y-3">
            {education.map((edu) => (
              <div key={edu._id} className="rounded-lg border border-border bg-surface p-5">
                <h3 className="font-heading text-base font-bold text-content-primary">
                  {edu.degree}
                </h3>
                <p className="text-sm text-content-secondary">
                  {edu.fieldOfStudy} · {edu.institution}
                </p>
                <p className="mt-1 text-2xs text-content-muted">
                  {formatYearRange(edu.startDate, edu.endDate, edu.isCurrent)}
                </p>
              </div>
            ))}
          </div>
          <div className="space-y-3">
            {certificates.map((cert) => (
              <div
                key={cert._id}
                className="flex items-start justify-between gap-3 rounded-lg border border-border bg-surface p-5"
              >
                <div>
                  <h3 className="font-heading text-base font-bold text-content-primary">
                    {cert.name}
                  </h3>
                  <p className="text-sm text-content-secondary">{cert.issuer}</p>
                </div>
                <Badge tone="accent">
                  {formatYearRange(cert.issueDate, cert.expiryDate, false).split("–")[0].trim()}
                </Badge>
              </div>
            ))}
          </div>
        </div>
      </SectionCard>

      {/* Blog */}
      <SectionCard icon={Award} title="Latest Writing" action="All posts" actionTo={routes.blog}>
        <div className="grid gap-5 md:grid-cols-3">
          {blogs.map((post, i) => (
            <Reveal key={post._id} delay={i * 80}>
              <Link
                to={`/blog/${post.slug}`}
                className="group block h-full rounded-lg border border-border bg-surface p-5 transition-all hover:-translate-y-1 hover:border-brand-500/40 hover:shadow-md"
              >
                {post.coverImage && (
                  <img
                    src={post.coverImage}
                    alt=""
                    className="mb-4 aspect-video w-full rounded-md object-cover"
                  />
                )}
                <Badge tone="brand">{post.category}</Badge>
                <h3 className="mt-3 font-heading text-lg font-bold text-content-primary group-hover:text-brand-500">
                  {post.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-content-secondary">
                  {truncate(post.excerpt, 100)}
                </p>
              </Link>
            </Reveal>
          ))}
        </div>
      </SectionCard>

      {/* CTA */}
      <section className="container-page py-16">
        <div className="relative overflow-hidden rounded-2xl border border-brand-500/20 bg-gradient-to-br from-brand-500/10 to-accent/10 p-10 text-center sm:p-14">
          <h2 className="font-heading text-3xl font-bold text-content-primary sm:text-4xl">
            Let's build something together
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-content-secondary">
            Have a role, a project, or a problem worth solving? I'd love to hear about it.
          </p>
          <div className="mt-7 flex justify-center">
            <Button
              as={Link}
              to={routes.contact}
              size="lg"
              rightIcon={<Mail className="h-4 w-4" />}
            >
              Start a conversation
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
