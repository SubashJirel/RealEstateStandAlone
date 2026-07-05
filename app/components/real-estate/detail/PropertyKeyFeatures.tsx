import type { PropertyDetail } from "@/lib/real-estate-template";

interface PropertyKeyFeaturesProps {
  property: PropertyDetail;
}

export function PropertyKeyFeatures({ property }: PropertyKeyFeaturesProps) {
  if (property.keyFeatures.length === 0) return null;

  return (
    <section aria-labelledby="key-features-heading">
      <SectionTitle
        eyebrow="Highlights"
        title="Key Features"
        id="key-features-heading"
      />

      <div className="grid gap-3 sm:grid-cols-2">
        {property.keyFeatures.map((feature) => (
          <div
            key={feature.label}
            className="flex items-center justify-between gap-4 rounded-[var(--radius-card)] border border-light-border bg-surface-container-lowest px-5 py-4"
          >
            <span className="text-sm text-on-surface-variant">
              {feature.label}
            </span>
            <span className="text-right text-sm font-semibold text-on-surface">
              {feature.value}
            </span>
          </div>
        ))}
      </div>
    </section>
  );
}

function SectionTitle({
  eyebrow,
  title,
  id,
}: {
  eyebrow: string;
  title: string;
  id: string;
}) {
  return (
    <div className="mb-6">
      <p className="text-xs font-semibold uppercase tracking-[0.16em] text-accent">
        {eyebrow}
      </p>
      <h2 id={id} className="headline-md mt-2 text-on-surface">
        {title}
      </h2>
    </div>
  );
}

export { SectionTitle as DetailSectionTitle };
