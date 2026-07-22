import {
  useAnalyticsOverview,
  useAnalyticsMonthly,
  useAnalyticsTopProjects,
  useAnalyticsTopBlogs,
  useAnalyticsContact,
} from "@/features/analytics";
import { useProjects } from "@/features/projects";
import { useBlogs } from "@/features/blogs";
import { PageHeader } from "@/components/common/SectionHeading";
import { ErrorState } from "@/components/ui";
import { getErrorMessage } from "@/lib/errorHandler";
import {
  DashboardKPIs,
  EngagementChart,
  MessagesChart,
  TopResourcesList,
} from "@/features/analytics/components";

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

  const projMap = Object.fromEntries((projData?.items || []).map((p) => [p._id, p.title]));
  const blogMap = Object.fromEntries((blogData?.items || []).map((b) => [b._id, b.title]));

  return (
    <div>
      <PageHeader
        title="Dashboard"
        description="A snapshot of your portfolio's reach and engagement."
      />

      <div className="mt-6 grid gap-6">
        <DashboardKPIs
          overview={overview}
          isLoading={isLoading}
          isError={isError}
          onRetry={() => {
            overview.refetch();
            monthly.refetch();
          }}
        />

        <div className="grid gap-6 lg:grid-cols-3">
          <EngagementChart data={monthly.data?.items || []} isLoading={monthly.isLoading} />
          <MessagesChart data={contact.data?.items || []} isLoading={contact.isLoading} />
        </div>

        <div className="grid gap-6 lg:grid-cols-2">
          <TopResourcesList
            title="Top projects"
            items={topProjects.data?.items || []}
            nameMap={projMap}
            tone="brand"
            isLoading={topProjects.isLoading}
          />
          <TopResourcesList
            title="Top blog posts"
            items={topBlogs.data?.items || []}
            nameMap={blogMap}
            tone="accent"
            isLoading={topBlogs.isLoading}
          />
        </div>
      </div>
    </div>
  );
}
