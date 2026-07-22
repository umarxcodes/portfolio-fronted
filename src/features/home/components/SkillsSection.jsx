import { Sparkles } from "lucide-react";
import { Section } from "./FeaturedProjects";
import { SKILL_LEVEL_META } from "@/constants/enums";

function SkillBar({ skill }) {
  const pct = SKILL_LEVEL_META[skill.level]?.percent || 50;
  return (
    <li>
      <div className="mb-1 flex items-center justify-between text-sm">
        <span className="text-content-primary">{skill.name}</span>
        <span className="text-2xs text-content-muted">{skill.level}</span>
      </div>
      <div className="h-1.5 overflow-hidden rounded-full bg-bg-muted">
        <div className="h-full rounded-full bg-brand-500" style={{ width: `${pct}%` }} />
      </div>
    </li>
  );
}

function SkillGroup({ category, skills }) {
  return (
    <div key={category} className="rounded-lg border border-border bg-surface p-5">
      <h3 className="mb-4 font-heading text-base font-semibold capitalize text-content-primary">
        {category}
      </h3>
      <ul className="space-y-3">
        {skills.map((skill) => (
          <SkillBar key={skill._id} skill={skill} />
        ))}
      </ul>
    </div>
  );
}

export function SkillsSection({ skillGroups, isLoading }) {
  if (isLoading) {
    return (
      <div className="grid gap-5 md:grid-cols-3">
        {Array.from({ length: 3 }).map((_, i) => (
          <div key={i} className="h-40 skeleton rounded-lg" />
        ))}
      </div>
    );
  }

  const entries = Object.entries(skillGroups);
  if (!entries.length) {
    return <p className="py-8 text-center text-sm text-content-muted">No skills added yet.</p>;
  }

  return (
    <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
      {entries.map(([category, list]) => (
        <SkillGroup key={category} category={category} skills={list} />
      ))}
    </div>
  );
}

export function SkillsSectionWrapper({ skillGroups, isLoading }) {
  return (
    <Section icon={Sparkles} title="Skills" action="Full stack" actionTo="/projects">
      <SkillsSection skillGroups={skillGroups} isLoading={isLoading} />
    </Section>
  );
}
