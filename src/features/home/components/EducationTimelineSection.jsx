import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { GraduationCap, MapPin } from "lucide-react";
import { cn } from "@/lib/cn";
import { formatYearRange } from "@/lib/format";
import { motionEasing, motionDuration } from "@/motion/constants";

function EducationCard({ edu, index, side }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: side === "left" ? -30 : 30, y: 20 }}
      animate={isInView ? { opacity: 1, x: 0, y: 0 } : {}}
      transition={{
        duration: motionDuration.slow,
        ease: motionEasing.easeOutExpo,
        delay: index * 0.1,
      }}
      className={cn(
        "relative rounded-2xl border border-border/60 bg-surface/80 p-6 backdrop-blur-sm",
        "transition-all duration-300 hover:-translate-y-1 hover:border-brand-500/30 hover:shadow-lg",
        side === "left" ? "md:mr-[calc(50%+2rem)]" : "md:ml-[calc(50%+2rem)]"
      )}
    >
      <div className="flex items-start gap-3">
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-brand-500/10 text-brand-600 dark:text-brand-300">
          <GraduationCap className="h-5 w-5" />
        </div>
        <div className="min-w-0">
          <h3 className="font-heading text-base font-bold text-content-primary">{edu.degree}</h3>
          <p className="mt-0.5 text-sm text-brand-600 dark:text-brand-300">{edu.fieldOfStudy}</p>
          <p className="mt-1 text-sm text-content-secondary">{edu.institution}</p>
          {edu.location && (
            <span className="mt-1 inline-flex items-center gap-1 text-2xs text-content-muted">
              <MapPin className="h-3 w-3" /> {edu.location}
            </span>
          )}
          <p className="mt-2 text-2xs text-content-muted">
            {formatYearRange(edu.startDate, edu.endDate, edu.isCurrent)}
          </p>
          {edu.isCurrent && (
            <span className="mt-2 inline-flex items-center gap-1.5 rounded-full bg-success/10 px-2.5 py-1 text-2xs font-medium text-success">
              <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-success" />
              Currently studying
            </span>
          )}
          {edu.description && (
            <p className="mt-3 text-sm leading-relaxed text-content-secondary">{edu.description}</p>
          )}
        </div>
      </div>
    </motion.div>
  );
}

function TimelineDot({ index }) {
  return (
    <motion.div
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1], delay: index * 0.1 }}
      className="relative z-10 flex h-4 w-4 items-center justify-center"
    >
      <span className="h-3 w-3 rounded-full bg-brand-500 ring-4 ring-brand-500/20" />
    </motion.div>
  );
}

export function EducationTimelineSection({ education }) {
  if (!education.length) {
    return <p className="py-8 text-center text-sm text-content-muted">No education added yet.</p>;
  }

  return (
    <div className="relative">
      <div className="absolute left-4 top-0 h-full w-px bg-gradient-to-b from-brand-500/30 via-brand-500/15 to-transparent md:left-1/2 md:-translate-x-px" />

      <div className="space-y-8">
        {education.map((edu, i) => (
          <div key={edu._id} className="relative flex items-start gap-6 md:gap-0">
            <div className="absolute left-4 md:left-1/2 md:-translate-x-1/2">
              <TimelineDot index={i} />
            </div>
            <div className="ml-12 md:ml-0 md:w-full">
              <EducationCard edu={edu} index={i} side={i % 2 === 0 ? "left" : "right"} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
