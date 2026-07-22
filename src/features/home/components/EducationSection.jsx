import { GraduationCap } from "lucide-react";
import { Section } from "./FeaturedProjects";
import { Badge } from "@/components/ui";
import { formatYearRange } from "@/lib/format";

function EducationItem({ edu }) {
  return (
    <div key={edu._id} className="rounded-lg border border-border bg-surface p-5">
      <h3 className="font-heading text-base font-bold text-content-primary">{edu.degree}</h3>
      <p className="text-sm text-content-secondary">
        {edu.fieldOfStudy} · {edu.institution}
      </p>
      <p className="mt-1 text-2xs text-content-muted">
        {formatYearRange(edu.startDate, edu.endDate, edu.isCurrent)}
      </p>
    </div>
  );
}

function CertificateItem({ cert }) {
  return (
    <div
      key={cert._id}
      className="flex items-start justify-between gap-3 rounded-lg border border-border bg-surface p-5"
    >
      <div>
        <h3 className="font-heading text-base font-bold text-content-primary">{cert.name}</h3>
        <p className="text-sm text-content-secondary">{cert.issuer}</p>
      </div>
      <Badge tone="accent">
        {formatYearRange(cert.issueDate, cert.expiryDate, false).split("–")[0].trim()}
      </Badge>
    </div>
  );
}

export function EducationCertificatesSection({ education, certificates }) {
  return (
    <div className="grid gap-5 lg:grid-cols-2">
      <div className="space-y-3">
        {education.map((edu) => (
          <EducationItem key={edu._id} edu={edu} />
        ))}
      </div>
      <div className="space-y-3">
        {certificates.map((cert) => (
          <CertificateItem key={cert._id} cert={cert} />
        ))}
      </div>
    </div>
  );
}

export function EducationCertificatesWrapper({ education, certificates }) {
  return (
    <Section icon={GraduationCap} title="Education & Certifications">
      <EducationCertificatesSection education={education} certificates={certificates} />
    </Section>
  );
}
