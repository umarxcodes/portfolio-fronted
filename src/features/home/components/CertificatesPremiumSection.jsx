import { motion, useInView } from "framer-motion";
import { Award, ShieldCheck, ExternalLink } from "lucide-react";
import { useRef, useState } from "react";
import { formatDate } from "@/lib/format";
import { motionEasing, motionDuration } from "@/motion/constants";

function HolographicCard({ cert, index }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });
  const [hovered, setHovered] = useState(false);
  const hasExpiry = cert.expiryDate;
  const isExpired = hasExpiry && new Date(cert.expiryDate) < new Date();

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 24, rotateX: 8 }}
      animate={isInView ? { opacity: 1, y: 0, rotateX: 0 } : {}}
      transition={{
        duration: motionDuration.slow,
        ease: motionEasing.easeOutExpo,
        delay: index * 0.08,
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="group relative"
    >
      <div
        className="relative overflow-hidden rounded-2xl border border-border/60 bg-surface p-6 transition-all duration-500"
        style={{
          boxShadow: hovered
            ? "0 20px 40px rgba(0,0,0,0.15), 0 0 0 1px rgba(99,102,241,0.2)"
            : "0 1px 3px rgba(0,0,0,0.05)",
          transform: hovered ? "translateY(-8px) scale(1.02)" : undefined,
        }}
      >
        <div
          className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-700"
          style={{
            opacity: hovered ? 1 : 0,
            background:
              "linear-gradient(135deg, rgba(99,102,241,0.08) 0%, rgba(236,72,153,0.06) 50%, rgba(6,182,212,0.08) 100%)",
            backgroundSize: "200% 200%",
            animation: hovered ? "shimmer 2.5s ease-in-out infinite" : "none",
          }}
        />

        <div className="relative flex items-start gap-4">
          <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-brand-500/15 to-accent/10 ring-1 ring-brand-500/20">
            {cert.badgeImage ? (
              <img
                src={cert.badgeImage}
                alt={cert.name}
                className="h-10 w-10 rounded-lg object-cover"
              />
            ) : (
              <Award className="h-7 w-7 text-brand-500" />
            )}
          </div>

          <div className="min-w-0 flex-1">
            <div className="flex items-center gap-2">
              <h3 className="font-heading text-base font-bold text-content-primary">{cert.name}</h3>
              {!hasExpiry && (
                <span className="flex items-center gap-1 rounded-full bg-success/10 px-2 py-0.5 text-2xs font-medium text-success">
                  <ShieldCheck className="h-3 w-3" /> Verified
                </span>
              )}
              {isExpired && (
                <span className="rounded-full bg-danger/10 px-2 py-0.5 text-2xs font-medium text-danger">
                  Expired
                </span>
              )}
            </div>
            <p className="mt-1 text-sm text-content-secondary">{cert.issuer}</p>
            <div className="mt-2 flex items-center gap-3 text-2xs text-content-muted">
              <span>Issued {formatDate(cert.issueDate)}</span>
              {hasExpiry && <span>Expires {formatDate(cert.expiryDate)}</span>}
            </div>
            {cert.credentialId && (
              <p className="mt-2 font-mono text-2xs text-content-muted">ID: {cert.credentialId}</p>
            )}
            {cert.skills?.length > 0 && (
              <div className="mt-3 flex flex-wrap gap-1.5">
                {cert.skills.slice(0, 4).map((s) => (
                  <span
                    key={s}
                    className="rounded bg-bg-muted px-2 py-0.5 text-2xs text-content-secondary"
                  >
                    {s}
                  </span>
                ))}
              </div>
            )}
          </div>
        </div>

        {cert.credentialUrl && (
          <a
            href={cert.credentialUrl}
            target="_blank"
            rel="noreferrer"
            className="mt-4 inline-flex items-center gap-1 text-2xs font-medium text-brand-500 opacity-0 transition-all duration-200 group-hover:opacity-100"
          >
            Verify credential <ExternalLink className="h-3 w-3" />
          </a>
        )}
      </div>

      <style>{`
        @keyframes shimmer {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
      `}</style>
    </motion.div>
  );
}

export function CertificatesPremiumSection({ certificates }) {
  if (!certificates.length) {
    return <p className="py-8 text-center text-sm text-content-muted">No certificates yet.</p>;
  }

  return (
    <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
      {certificates.map((cert, i) => (
        <HolographicCard key={cert._id} cert={cert} index={i} />
      ))}
    </div>
  );
}
