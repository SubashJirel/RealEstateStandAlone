const icons: Record<string, React.ReactNode> = {
  website: "🌐",
  template: "📐",
  design: "🎨",
  listing: "🏠",
  crm: "👥",
  visit: "📍",
  followup: "🔔",
  agent: "💼",
  chat: "💬",
  social: "📱",
  video: "🎬",
  tracking: "📊",
  analytics: "📈",
  nepal: "🇳🇵",
  agency: "🏢",
  broker: "🤝",
  land: "🗺️",
  housing: "🏗️",
  rental: "🔑",
  lead: "✉️",
  deal: "✅",
};

interface FeatureCardProps {
  title: string;
  description: string;
  icon: string;
}

export function FeatureCard({ title, description, icon }: FeatureCardProps) {
  return (
    <article className="card-hover rounded-xl border border-light-border bg-surface-container-lowest p-5 shadow-low">
      <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-lg bg-secondary-container text-lg">
        <span aria-hidden="true">{icons[icon] ?? "✦"}</span>
      </div>
      <h3 className="text-base font-semibold text-on-surface">{title}</h3>
      <p className="body-sm mt-2 text-on-surface-variant">{description}</p>
    </article>
  );
}

export function AudienceCard({
  title,
  description,
  icon,
}: FeatureCardProps) {
  return (
    <article className="card-hover rounded-xl border border-light-border bg-surface-container-lowest p-6 shadow-low">
      <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-surface-container text-xl">
        <span aria-hidden="true">{icons[icon] ?? "✦"}</span>
      </div>
      <h3 className="text-lg font-semibold text-on-surface">{title}</h3>
      <p className="body-sm mt-2 text-on-surface-variant">{description}</p>
    </article>
  );
}

export function StepCard({
  step,
  text,
}: {
  step: number;
  text: string;
}) {
  return (
    <div className="flex gap-4">
      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary text-sm font-bold text-on-primary">
        {step}
      </div>
      <p className="body-md pt-2 text-on-surface">{text}</p>
    </div>
  );
}

/**
 * FlowIcon  same props (icon, label) as before.
 * `index` and `total` are optional additions so the parent page can pass
 * the step's position in the sequence; when omitted, the component falls
 * back to its original flat styling so nothing breaks if unused.
 */
export function FlowIcon({
  icon,
  label,
  index = 0,
  total = 1,
}: {
  icon: string;
  label: string;
  index?: number;
  total?: number;
}) {
  const isLast = index === total - 1;
  // 0 -> lightest tint, 1 -> deepest sage, eased so early steps don't look washed out
  const progress = total > 1 ? index / (total - 1) : 0;

  return (
    <div className="group flex flex-col items-center gap-3 text-center">
      <div
        className={`relative flex h-16 w-16 items-center justify-center rounded-full text-2xl shadow-low ring-1 ring-inset ring-black/5 transition-transform duration-200 group-hover:-translate-y-1 group-hover:shadow-medium md:h-[4.25rem] md:w-[4.25rem] ${
          isLast
            ? "bg-deep-sage text-on-primary shadow-medium ring-deep-sage/20"
            : "bg-secondary-container text-on-secondary-container"
        }`}
        style={
          !isLast
            ? {
                backgroundColor: `color-mix(in srgb, var(--color-secondary-container) ${100 - progress * 35}%, var(--color-deep-sage) ${progress * 35}%)`,
              }
            : undefined
        }
      >
        <span aria-hidden="true">{icons[icon] ?? "✦"}</span>
        {isLast && (
          <span
            className="absolute -bottom-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-on-primary text-[10px] text-deep-sage shadow-low"
            aria-hidden="true"
          >
            ✓
          </span>
        )}
      </div>
      <span
        className={`max-w-[92px] text-xs font-medium leading-snug ${
          isLast ? "font-semibold text-on-surface" : "text-on-surface-variant"
        }`}
      >
        {label}
      </span>
    </div>
  );
}