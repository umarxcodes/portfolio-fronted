import { Reveal } from "@/components/common/Reveal";
import { Briefcase } from "lucide-react";
import { Section } from "./FeaturedProjects";
import { formatYearRange } from "@/lib/format";

function ExperienceItem({ exp, index }) {
  return (
    <Reveal key={exp._id} delay={index * 60}>
      <div className="flex flex-col gap-3 rounded-lg border border-border bg-surface p-5 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <h3 className="font-heading text-lg font-bold text-content-primary">{exp.position}</h3>
          <p className="text-sm text-brand-500">{exp.company}</p>
          <p className="mt-2 text-sm leading-relaxed text-content-secondary">{exp.description}</p>
        </div>
        <div className="shrink-0 text-sm text-content-muted sm:text-right">
          <p>{formatYearRange(exp.startDate, exp.endDate, exp.isCurrent)}</p>
          <p className="mt-1 capitalize">{exp.employmentType?.replace("-", " ")}</p>
        </div>
      </div>
    </Reveal>
  );
}

export function ExperienceSection({ experiences }) {
  if (!experiences.length) {
    return <p className="py-8 text-center text-sm text-content-muted">No experience yet.</p>;
  }

  return (
    <div className="space-y-4">
      {experiences.map((exp, i) => (
        <ExperienceItem key={exp._id} exp={exp} index={i} />
      ))}
    </div>
  );
}

export function ExperienceSectionWrapper({ experiences }) {
  return (
    <Section icon={Briefcase} title="Experience" action="More" actionTo="/projects">
      <ExperienceSection experiences={experiences} />
    </Section>
  );
}
