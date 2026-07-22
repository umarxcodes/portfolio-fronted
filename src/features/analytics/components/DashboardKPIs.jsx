import { Eye, FolderKanban, FileText, Inbox, Users, TrendingUp } from "lucide-react";
import { Card, Spinner, ErrorState } from "@/components/ui";
import { getErrorMessage } from "@/lib/errorHandler";
import { formatNumber } from "@/lib/format";

const KPI = [
  { key: "totalPortfolioViews", label: "Portfolio views", icon: Eye, tone: "brand" },
  { key: "totalProjectViews", label: "Project views", icon: FolderKanban, tone: "info" },
  { key: "totalBlogViews", label: "Blog views", icon: FileText, tone: "accent" },
  { key: "totalContactSubmissions", label: "Messages", icon: Inbox, tone: "warning" },
  { key: "uniqueVisitors", label: "Unique visitors", icon: Users, tone: "success" },
  { key: "thisMonthViews", label: "This month", icon: TrendingUp, tone: "danger" },
];

const TONE_BG = {
  brand: "bg-brand-500/10 text-brand-600 dark:text-brand-300",
  info: "bg-info/10 text-info",
  accent: "bg-accent/10 text-accent",
  warning: "bg-warning/10 text-warning",
  success: "bg-success/10 text-success",
  danger: "bg-danger/10 text-danger",
};

export function DashboardKPIs({ overview, isLoading, isError, onRetry }) {
  if (isError) {
    return <ErrorState message={getErrorMessage(overview.error)} onRetry={onRetry} />;
  }

  const o = overview.data || {};

  if (isLoading) {
    return (
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: 6 }).map((_, i) => (
          <Card key={i} className="p-5">
            <Spinner />
          </Card>
        ))}
      </div>
    );
  }

  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {KPI.map((kpi) => {
        const Icon = kpi.icon;
        return (
          <Card key={kpi.key} className="p-5">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm text-content-muted">{kpi.label}</p>
                <p className="mt-2 font-heading text-3xl font-bold text-content-primary">
                  {formatNumber(o[kpi.key] ?? 0)}
                </p>
              </div>
              <span
                className={`flex h-10 w-10 items-center justify-center rounded-lg ${TONE_BG[kpi.tone]}`}
              >
                <Icon className="h-5 w-5" />
              </span>
            </div>
          </Card>
        );
      })}
    </div>
  );
}

export function ChartTooltip({ active, payload, label }) {
  if (!active || !payload?.length) return null;
  return (
    <div className="rounded-md border border-border bg-surface px-3 py-2 text-xs shadow-lg">
      <p className="font-medium text-content-primary">{label}</p>
      {payload.map((p) => (
        <p key={p.name} className="text-content-secondary">
          {p.name}: <span className="font-semibold text-content-primary">{p.value}</span>
        </p>
      ))}
    </div>
  );
}
