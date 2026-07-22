import { memo } from "react";
import { cn } from "@/lib/cn";

export const Skeleton = memo(function Skeleton({ className }) {
  return <div className={cn("skeleton h-4 w-full rounded", className)} />;
});

export function SkeletonCard({ className }) {
  return (
    <div className={cn("card overflow-hidden", className)}>
      <div className="skeleton h-44 w-full rounded-none" />
      <div className="space-y-3 p-5">
        <Skeleton className="h-5 w-2/3" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-4/5" />
      </div>
    </div>
  );
}

export function SkeletonText({ lines = 3, className }) {
  return (
    <div className={cn("space-y-2", className)}>
      {Array.from({ length: lines }).map((_, i) => (
        <Skeleton key={i} className={cn(i === lines - 1 && "w-2/3")} />
      ))}
    </div>
  );
}

export default Skeleton;
