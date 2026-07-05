import type { PropertyDetail } from "@/lib/real-estate-template";
import { DetailSectionTitle } from "./PropertyKeyFeatures";

interface PropertyDescriptionProps {
  property: PropertyDetail;
}

export function PropertyDescription({ property }: PropertyDescriptionProps) {
  const paragraphs = property.description.split("\n\n").filter(Boolean);

  return (
    <section aria-labelledby="description-heading">
      <DetailSectionTitle
        eyebrow="About This Property"
        title="Description"
        id="description-heading"
      />

      <div className="rounded-[var(--radius-panel)] border border-light-border bg-surface-container-lowest p-6 md:p-8">
        <div className="space-y-5">
          {paragraphs.map((paragraph) => (
            <p
              key={paragraph.slice(0, 40)}
              className="body-md leading-7 text-on-surface-variant"
            >
              {paragraph}
            </p>
          ))}
        </div>
      </div>
    </section>
  );
}
