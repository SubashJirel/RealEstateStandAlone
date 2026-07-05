import type { ElementType } from "react";

interface IconCardProps {
  title: string;
  description: string;
  icon: ElementType;
}

interface StatCardProps {
  label: string;
  value: string;
  helper: string;
}

export function CompanyIconCard({ title, description, icon: Icon }: IconCardProps) {
  return (
    <article className="rounded-[var(--radius-card)] border border-light-border bg-surface-container-lowest p-6 shadow-low">
      <span className="flex size-12 items-center justify-center rounded-full bg-primary text-on-primary">
        <Icon className="size-5" aria-hidden="true" />
      </span>
      <h3 className="mt-5 text-xl font-semibold text-on-surface">{title}</h3>
      <p className="mt-3 text-sm leading-6 text-on-surface-variant">
        {description}
      </p>
    </article>
  );
}

export function CompanyStatCard({ label, value, helper }: StatCardProps) {
  return (
    <article className="rounded-[var(--radius-card)] border border-white/12 bg-white/10 p-5 text-inverse-on-surface backdrop-blur">
      <p className="text-3xl font-bold text-accent">{value}</p>
      <h3 className="mt-2 text-base font-semibold">{label}</h3>
      <p className="mt-2 text-sm leading-6 text-inverse-on-surface/65">
        {helper}
      </p>
    </article>
  );
}
