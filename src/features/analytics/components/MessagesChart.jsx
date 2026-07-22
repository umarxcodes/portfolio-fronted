import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from "recharts";
import { Card, CardHeader, CardTitle, CardBody, Spinner } from "@/components/ui";
import { ChartTooltip } from "./DashboardKPIs";

export function MessagesChart({ data, isLoading }) {
  if (!data.length) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Messages timeline</CardTitle>
        </CardHeader>
        <CardBody>
          <p className="py-16 text-center text-sm text-content-muted">No messages yet</p>
        </CardBody>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Messages timeline</CardTitle>
      </CardHeader>
      <CardBody>
        {isLoading ? (
          <div className="flex h-72 items-center justify-center">
            <Spinner />
          </div>
        ) : (
          <ResponsiveContainer width="100%" height={288}>
            <BarChart data={data} margin={{ top: 8, right: 8, left: -16, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgb(var(--border))" vertical={false} />
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
                {data.map((_, i) => (
                  <Cell key={i} fill="rgb(var(--brand-500))" />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        )}
      </CardBody>
    </Card>
  );
}
