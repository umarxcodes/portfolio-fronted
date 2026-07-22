import { ArrowUpRight } from "lucide-react";
import { Card, CardHeader, CardTitle, CardBody } from "@/components/ui";

export function TopResourcesList({ title, items, nameMap, tone = "brand" }) {
  if (!items.length) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>{title}</CardTitle>
        </CardHeader>
        <CardBody>
          <p className="py-8 text-center text-sm text-content-muted">No data</p>
        </CardBody>
      </Card>
    );
  }

  const bgClass =
    tone === "accent"
      ? "bg-accent/10 text-accent"
      : "bg-brand-500/10 text-brand-600 dark:text-brand-300";

  return (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardBody>
        {nameMap ? (
          <ul className="space-y-3">
            {items.map((item, i) => (
              <li key={item._id} className="flex items-center gap-3">
                <span
                  className={`flex h-7 w-7 items-center justify-center rounded-full text-2xs font-semibold ${bgClass}`}
                >
                  {i + 1}
                </span>
                <span className="flex-1 truncate text-sm text-content-primary">
                  {nameMap[item._id] || item._id}
                </span>
                <span className="inline-flex items-center gap-1 text-sm font-semibold text-content-secondary">
                  <ArrowUpRight className="h-3.5 w-3.5" />
                  {item.views}
                </span>
              </li>
            ))}
          </ul>
        ) : (
          <ul className="space-y-3">
            {items.map((item, i) => (
              <li key={item._id} className="flex items-center gap-3">
                <span
                  className={`flex h-7 w-7 items-center justify-center rounded-full text-2xs font-semibold ${bgClass}`}
                >
                  {i + 1}
                </span>
                <span className="flex-1 truncate text-sm text-content-primary">{item._id}</span>
                <span className="inline-flex items-center gap-1 text-sm font-semibold text-content-secondary">
                  <ArrowUpRight className="h-3.5 w-3.5" />
                  {item.views}
                </span>
              </li>
            ))}
          </ul>
        )}
      </CardBody>
    </Card>
  );
}
