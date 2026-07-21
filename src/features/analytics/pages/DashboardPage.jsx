import {
  BarChart,
  Bar,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from "recharts";
import { Eye, FolderKanban, FileText, Inbox, Users, TrendingUp, ArrowUpRight } from "lucide-react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardBody,
  ErrorState,
  Skeleton,
  Spinner,
} from "@/components/ui";
import {
  useAnalyticsOverview,
  useAnalyticsMonthly,
  useAnalyticsTopProjects,
  useAnalyticsTopBlogs,
  useAnalyticsContact,
} from "@/features/analytics";
import { PageHeader } from "@/components/common/SectionHeading";
import { formatNumber } from "@/lib/format";
import { getErrorMessage } from "@/lib/errorHandler";
import { useProjects } from "@/features/projects";
import { useBlogs } from "@/features/blogs";

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

function ChartTooltip({ active, payload, label }) {
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

export default function DashboardPage() {
  const overview = useAnalyticsOverview();
  const monthly = useAnalyticsMonthly(6);
  const topProjects = useAnalyticsTopProjects();
  const topBlogs = useAnalyticsTopBlogs();
  const contact = useAnalyticsContact();
  const { data: projData } = useProjects({ limit: 1 });
  const { data: blogData } = useBlogs({ limit: 1 });

  const isLoading = overview.isLoading || monthly.isLoading;
  const isError = overview.isError || monthly.isError;

  if (isError) {
    return (
      <ErrorState
        message={getErrorMessage(overview.error || monthly.error)}
        onRetry={() => {
          overview.refetch();
          monthly.refetch();
        }}
      />
    );
  }

  const o = overview.data || {};
  const monthlyItems = monthly.data?.items || [];
  const trendData = monthlyItems.map((item) => ({
    month: item._id,
    total: item.total,
    portfolio: item.events?.find((e) => e.type === "portfolio_view")?.count || 0,
    project: item.events?.find((e) => e.type === "project_view")?.count || 0,
    blog: item.events?.find((e) => e.type === "blog_view")?.count || 0,
  }));

  const projectItems = topProjects.data?.items || [];
  const blogItems = topBlogs.data?.items || [];
  const contactItems = contact.data?.items || [];

  const projMap = Object.fromEntries((projData?.items || []).map((p) => [p._id, p.title]));
  const blogMap = Object.fromEntries((blogData?.items || []).map((b) => [b._id, b.title]));

  return (
    <div>
      <PageHeader
        title="Dashboard"
        description="A snapshot of your portfolio's reach and engagement."
      />

      {isLoading ? (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 6 }).map((_, i) => (
            <Skeleton key={i} className="h-28 rounded-lg" />
          ))}
        </div>
      ) : (
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
      )}

      <div className="mt-6 grid gap-6 lg:grid-cols-3">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Engagement trend</CardTitle>
            <span className="text-2xs text-content-muted">Last 6 months</span>
          </CardHeader>
          <CardBody>
            {monthly.isLoading ? (
              <div className="flex h-72 items-center justify-center">
                <Spinner />
              </div>
            ) : (
              <ResponsiveContainer width="100%" height={288}>
                <LineChart data={trendData} margin={{ top: 8, right: 8, left: -16, bottom: 0 }}>
                  <CartesianGrid
                    strokeDasharray="3 3"
                    stroke="rgb(var(--border))"
                    vertical={false}
                  />
                  <XAxis
                    dataKey="month"
                    tick={{ fontSize: 12, fill: "rgb(var(--content-muted))" }}
                    stroke="rgb(var(--border))"
                  />
                  <YAxis
                    tick={{ fontSize: 12, fill: "rgb(var(--content-muted))" }}
                    stroke="rgb(var(--border))"
                  />
                  <Tooltip content={<ChartTooltip />} />
                  <Line
                    type="monotone"
                    dataKey="total"
                    name="Total"
                    stroke="rgb(var(--brand-500))"
                    strokeWidth={2.5}
                    dot={{ r: 3 }}
                  />
                  <Line
                    type="monotone"
                    dataKey="portfolio"
                    name="Portfolio"
                    stroke="rgb(var(--accent))"
                    strokeWidth={2}
                    dot={false}
                  />
                  <Line
                    type="monotone"
                    dataKey="project"
                    name="Projects"
                    stroke="rgb(var(--info))"
                    strokeWidth={2}
                    dot={false}
                  />
                  <Line
                    type="monotone"
                    dataKey="blog"
                    name="Blog"
                    stroke="rgb(var(--success))"
                    strokeWidth={2}
                    dot={false}
                  />
                </LineChart>
              </ResponsiveContainer>
            )}
          </CardBody>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Messages timeline</CardTitle>
          </CardHeader>
          <CardBody>
            {contact.isLoading ? (
              <div className="flex h-72 items-center justify-center">
                <Spinner />
              </div>
            ) : contactItems.length ? (
              <ResponsiveContainer width="100%" height={288}>
                <BarChart data={contactItems} margin={{ top: 8, right: 8, left: -16, bottom: 0 }}>
                  <CartesianGrid
                    strokeDasharray="3 3"
                    stroke="rgb(var(--border))"
                    vertical={false}
                  />
                  <XAxis
                    dataKey="_id"
                    tick={{ fontSize: 11, fill: "rgb(var(--content-muted))" }}
                    stroke="rgb(var(--border))"
                  />
                  <YAxis
                    tick={{ fontSize: 12, fill: "rgb(var(--content-muted))" }}
                    stroke="rgb(var(--border))"
                  />
                  <Tooltip content={<ChartTooltip />} cursor={{ fill: "rgb(var(--bg-muted))" }} />
                  <Bar dataKey="count" name="Messages" radius={[4, 4, 0, 0]}>
                    {contactItems.map((_, i) => (
                      <Cell key={i} fill="rgb(var(--brand-500))" />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            ) : (
              <p className="py-16 text-center text-sm text-content-muted">No messages yet</p>
            )}
          </CardBody>
        </Card>
      </div>

      <div className="mt-6 grid gap-6 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Top projects</CardTitle>
          </CardHeader>
          <CardBody>
            {topProjects.isLoading ? (
              <Spinner />
            ) : projectItems.length ? (
              <ul className="space-y-3">
                {projectItems.map((item, i) => (
                  <li key={item._id} className="flex items-center gap-3">
                    <span className="flex h-7 w-7 items-center justify-center rounded-full bg-brand-500/10 text-2xs font-semibold text-brand-600 dark:text-brand-300">
                      {i + 1}
                    </span>
                    <span className="flex-1 truncate text-sm text-content-primary">
                      {projMap[item._id] || item._id}
                    </span>
                    <span className="inline-flex items-center gap-1 text-sm font-semibold text-content-secondary">
                      <ArrowUpRight className="h-3.5 w-3.5" />
                      {item.views}
                    </span>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="py-8 text-center text-sm text-content-muted">No data</p>
            )}
          </CardBody>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Top blog posts</CardTitle>
          </CardHeader>
          <CardBody>
            {topBlogs.isLoading ? (
              <Spinner />
            ) : blogItems.length ? (
              <ul className="space-y-3">
                {blogItems.map((item, i) => (
                  <li key={item._id} className="flex items-center gap-3">
                    <span className="flex h-7 w-7 items-center justify-center rounded-full bg-accent/10 text-2xs font-semibold text-accent">
                      {i + 1}
                    </span>
                    <span className="flex-1 truncate text-sm text-content-primary">
                      {blogMap[item._id] || item._id}
                    </span>
                    <span className="inline-flex items-center gap-1 text-sm font-semibold text-content-secondary">
                      <ArrowUpRight className="h-3.5 w-3.5" />
                      {item.views}
                    </span>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="py-8 text-center text-sm text-content-muted">No data</p>
            )}
          </CardBody>
        </Card>
      </div>
    </div>
  );
}
