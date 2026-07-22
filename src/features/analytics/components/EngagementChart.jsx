import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { Card, CardHeader, CardTitle, CardBody, Spinner } from "@/components/ui";
import { ChartTooltip } from "./DashboardKPIs";

export function EngagementChart({ data, isLoading }) {
  const trendData = data.map((item) => ({
    month: item._id,
    total: item.total,
    portfolio: item.events?.find((e) => e.type === "portfolio_view")?.count || 0,
    project: item.events?.find((e) => e.type === "project_view")?.count || 0,
    blog: item.events?.find((e) => e.type === "blog_view")?.count || 0,
  }));

  return (
    <Card className="lg:col-span-2">
      <CardHeader>
        <CardTitle>Engagement trend</CardTitle>
        <span className="text-2xs text-content-muted">Last 6 months</span>
      </CardHeader>
      <CardBody>
        {isLoading ? (
          <div className="flex h-72 items-center justify-center">
            <Spinner />
          </div>
        ) : (
          <ResponsiveContainer width="100%" height={288}>
            <LineChart data={trendData} margin={{ top: 8, right: 8, left: -16, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgb(var(--border))" vertical={false} />
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
  );
}
