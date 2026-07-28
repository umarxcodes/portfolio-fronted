import { useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { Link } from "react-router-dom";
import { MapPin, ArrowRight, Download, Mail, MessageCircle } from "lucide-react";
import { GithubIcon, LinkedinIcon, TwitterIcon } from "@/components/common/BrandIcons";
import { Button, ErrorState } from "@/components/ui";
import { Reveal } from "@/components/common/Reveal";
import { AnimatedNumber } from "@/components/common/AnimatedNumber";
import { FadeImage, AnimatedSection } from "@/motion";
import { useProfile } from "@/features/profile";
import { useSettings } from "@/features/settings";
import { useSkills } from "@/features/skills";
import { useExperience } from "@/features/experience";
import { useCurrentEducation } from "@/features/education";
import { useCertificates } from "@/features/certificates";
import { useFeaturedProjects } from "@/features/projects";
import { useFeaturedBlogs } from "@/features/blogs";
import { routes } from "@/constants/routes";
import { getErrorMessage } from "@/lib/errorHandler";
import { cn } from "@/lib/cn";
import {
  FeaturedProjectsSection,
  SkillsSectionWrapper,
  ExperienceSectionWrapper,
  EducationCertificatesWrapper,
  BlogSectionWrapper,
} from "@/features/home/components";
import { getIdentityProfile, getIdentitySettings, identity } from "@/config/identity";

function HeroPortrait({ profile }) {
  const [imgOk, setImgOk] = useState(Boolean(profile?.profileImage));
  const src = profile?.profileImage;

  return (
    <div className="relative mx-auto aspect-[4/5] w-full max-w-sm overflow-hidden rounded-2xl border border-border bg-surface shadow-lg">
      {src && imgOk ? (
        <FadeImage
          src={src}
          alt={profile.name}
          width={400}
          height={500}
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
  const prefersReduced = useReducedMotion();
  const social = {
    github: settings?.socialLinks?.github || profile?.socialLinks?.github || identity.github,
    linkedin:
      settings?.socialLinks?.linkedin || profile?.socialLinks?.linkedin || identity.linkedin,
    twitter: settings?.socialLinks?.twitter || profile?.socialLinks?.twitter || "",
    portfolio: profile?.socialLinks?.portfolio || "",
  };

  const container = {
    hidden: {},
    visible: {
      transition: { staggerChildren: 0.08, delayChildren: 0.1 },
    },
  };

  const item = {
    hidden: { opacity: 0, y: 18, filter: "blur(2px)" },
    visible: {
      opacity: 1,
      y: 0,
      filter: "blur(0px)",
      transition: { duration: 0.52, ease: [0.16, 1, 0.3, 1] },
    },
  };

  const motionProps = prefersReduced ? { initial: false, animate: {} } : {};

  return (
    <section className="relative overflow-hidden">
      <div className="surface-grid absolute inset-0 opacity-[0.4]" />
      <motion.div
        {...motionProps}
        initial={{ opacity: 0.6 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.2, ease: "easeOut" }}
        className="pointer-events-none absolute -top-40 left-1/2 h-[480px] w-[480px] -translate-x-1/2 rounded-full bg-brand-500/20 blur-[120px]"
      />
      <motion.div className="container-page relative grid min-h-[88vh] items-center gap-12 py-20 lg:grid-cols-[1.05fr_0.95fr]">
        <motion.div variants={container} initial="hidden" animate="visible">
          <motion.div variants={item}>
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
          </motion.div>
          <motion.h1
            variants={item}
            className="mt-6 text-5xl font-bold leading-[1.02] tracking-tight text-content-primary sm:text-6xl lg:text-7xl"
          >
            {profile?.name || settings?.siteTitle || identity.name}
          </motion.h1>
          <motion.p variants={item} className="mt-4 text-2xl font-semibold text-gradient">
            {profile?.title || identity.title}
          </motion.p>
          <motion.p
            variants={item}
            className="mt-6 max-w-xl text-lg leading-relaxed text-content-secondary"
          >
            {profile?.bio || settings?.siteDescription || identity.siteDescription}
          </motion.p>
          <motion.div variants={item} className="mt-8 flex flex-wrap items-center gap-3">
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
                download
                rel="noreferrer"
                variant="ghost"
                leftIcon={<Download className="h-4 w-4" />}
              >
                Resume
              </Button>
            )}
          </motion.div>
          <motion.div
            variants={item}
            className="mt-8 flex flex-wrap items-center gap-5 text-sm text-content-muted"
          >
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
          </motion.div>
        </motion.div>
        <motion.div
          {...motionProps}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: 0.15 }}
          className="relative"
        >
          <HeroPortrait profile={profile} />
        </motion.div>
      </motion.div>
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

  const profile = getIdentityProfile(!pErr ? profileData?.profile : null);
  const settings = getIdentitySettings(!settingsData?.error ? settingsData?.settings : null);
  const isProfileMissing = pErr?.status === 404;
  const isSettingsMissing = settingsData?.error?.status === 404;
  const projects = projectsData?.items || [];
  const skillGroups = skillsData?.groupedByCategory || {};
  const experiences = expData?.items || [];
  const education = eduData?.items || [];
  const certificates = certData?.items || [];
  const blogs = blogsData?.items || [];

  if (pErr && !isProfileMissing)
    return <ErrorState message={getErrorMessage(pErr)} className="m-8" />;
  if (settingsData?.error && !isSettingsMissing) {
    return <ErrorState message={getErrorMessage(settingsData.error)} className="m-8" />;
  }

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

      <AnimatedSection>
        <FeaturedProjectsSection
          projects={projects}
          total={projectsData?.total}
          isLoading={projLoad}
        />
      </AnimatedSection>

      <AnimatedSection>
        <SkillsSectionWrapper
          skillGroups={skillGroups}
          total={skillsData?.total}
          isLoading={skillsLoad}
        />
      </AnimatedSection>

      <AnimatedSection>
        <ExperienceSectionWrapper experiences={experiences} />
      </AnimatedSection>

      <AnimatedSection>
        <EducationCertificatesWrapper education={education} certificates={certificates} />
      </AnimatedSection>

      <AnimatedSection>
        <BlogSectionWrapper blogs={blogs} />
      </AnimatedSection>

      <section className="container-page py-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="relative overflow-hidden rounded-2xl border border-brand-500/20 bg-gradient-to-br from-brand-500/10 to-accent/10 p-10 text-center sm:p-14"
        >
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
              rightIcon={<MessageCircle className="h-4 w-4" />}
            >
              Start a conversation
            </Button>
          </div>
        </motion.div>
      </section>
    </div>
  );
}
