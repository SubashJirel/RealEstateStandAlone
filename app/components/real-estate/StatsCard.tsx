import type { Stat } from "@/lib/real-estate-template";
import { cn } from "@/lib/utils";

interface StatsCardProps {
  stat: Stat;
  className?: string;
}

export function StatsCard({ stat, className }: StatsCardProps) {
  return (
    <article
      className={cn(
        "rounded-[var(--radius-card)] border border-light-border bg-warm-white p-6 shadow-low",
        className
      )}
    >
      <p className="text-4xl font-bold tracking-normal text-primary">
        {stat.value}
      </p>
      <h3 className="mt-3 text-base font-semibold text-on-surface">
        {stat.label}
      </h3>
      <p className="mt-2 text-sm leading-6 text-on-surface-variant">
        {stat.helper}
      </p>
    </article>
  );
}
