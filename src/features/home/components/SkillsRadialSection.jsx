import { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { SKILL_LEVEL_META } from "@/constants/enums";
import { motionEasing, motionDuration } from "@/motion/constants";

const CATEGORY_COLORS = {
  frontend: { ring: "#6366f1", glow: "rgba(99,102,241,0.35)", bg: "rgba(99,102,241,0.08)" },
  backend: { ring: "#06b6d4", glow: "rgba(6,182,212,0.35)", bg: "rgba(6,182,212,0.08)" },
  database: { ring: "#f59e0b", glow: "rgba(245,158,11,0.35)", bg: "rgba(245,158,11,0.08)" },
  devops: { ring: "#10b981", glow: "rgba(16,185,129,0.35)", bg: "rgba(16,185,129,0.08)" },
  cloud: { ring: "#3b82f6", glow: "rgba(59,130,246,0.35)", bg: "rgba(59,130,246,0.08)" },
  testing: { ring: "#f97316", glow: "rgba(249,115,22,0.35)", bg: "rgba(249,115,22,0.08)" },
  tools: { ring: "#8b5cf6", glow: "rgba(139,92,246,0.35)", bg: "rgba(139,92,246,0.08)" },
  mobile: { ring: "#ec4899", glow: "rgba(236,72,153,0.35)", bg: "rgba(236,72,153,0.08)" },
  ai: { ring: "#14b8a6", glow: "rgba(20,184,166,0.35)", bg: "rgba(20,184,166,0.08)" },
  default: { ring: "#6366f1", glow: "rgba(99,102,241,0.35)", bg: "rgba(99,102,241,0.08)" },
};

function getCategoryColor(category) {
  return CATEGORY_COLORS[category] || CATEGORY_COLORS.default;
}

function SkillRing({ skill, index }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });
  const [hovered, setHovered] = useState(false);
  const pct = SKILL_LEVEL_META[skill.level]?.percent || 50;
  const colors = getCategoryColor(skill.category);
  const radius = 42;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (pct / 100) * circumference;

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 24, scale: 0.92 }}
      animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
      transition={{
        duration: motionDuration.base,
        ease: motionEasing.easeOutExpo,
        delay: index * 0.06,
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="group relative flex flex-col items-center"
    >
      <div
        className="relative flex items-center justify-center rounded-2xl border border-border/60 bg-surface p-6 transition-all duration-300"
        style={{
          boxShadow: hovered ? `0 0 32px ${colors.glow}, 0 8px 24px rgba(0,0,0,0.12)` : undefined,
          borderColor: hovered ? colors.ring : undefined,
          transform: hovered ? "translateY(-6px)" : undefined,
        }}
      >
        <svg width="120" height="120" viewBox="0 0 120 120" className="-rotate-90">
          <circle
            cx="60"
            cy="60"
            r={radius}
            fill="none"
            stroke="currentColor"
            strokeWidth="6"
            className="text-bg-muted"
          />
          <motion.circle
            cx="60"
            cy="60"
            r={radius}
            fill="none"
            stroke={colors.ring}
            strokeWidth="6"
            strokeLinecap="round"
            strokeDasharray={circumference}
            strokeDashoffset={isInView ? offset : circumference}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1], delay: index * 0.06 }}
            style={{ filter: hovered ? `drop-shadow(0 0 6px ${colors.glow})` : undefined }}
          />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className="font-heading text-xl font-bold text-content-primary">{skill.name}</span>
          <span className="mt-0.5 text-2xs capitalize text-content-muted">{skill.level}</span>
        </div>
      </div>
      {skill.yearsOfExperience && (
        <span className="mt-3 text-2xs text-content-muted">{skill.yearsOfExperience}y exp</span>
      )}
    </motion.div>
  );
}

export function SkillsRadialSection({ skillGroups, isLoading }) {
  if (isLoading) {
    return (
      <div className="grid grid-cols-2 gap-5 md:grid-cols-3 lg:grid-cols-4">
        {Array.from({ length: 8 }).map((_, i) => (
          <div key={i} className="h-40 skeleton rounded-2xl" />
        ))}
      </div>
    );
  }

  const entries = Object.entries(skillGroups);
  if (!entries.length) {
    return <p className="py-8 text-center text-sm text-content-muted">No skills added yet.</p>;
  }

  const flat = entries.flatMap(([, list]) => list);

  return (
    <div className="grid grid-cols-2 gap-5 md:grid-cols-3 lg:grid-cols-4">
      {flat.map((skill, i) => (
        <SkillRing key={skill._id} skill={skill} index={i} />
      ))}
    </div>
  );
}
