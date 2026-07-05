"use client";

import { useState } from "react";
import { Maximize2 } from "lucide-react";
import type { PropertyDetail } from "@/lib/real-estate-template";
import { cn } from "@/lib/utils";
import { DetailSectionTitle } from "./PropertyKeyFeatures";

interface PropertyFloorPlansProps {
  property: PropertyDetail;
}

export function PropertyFloorPlans({ property }: PropertyFloorPlansProps) {
  const [activePlan, setActivePlan] = useState(0);

  if (property.floorPlans.length === 0) {
    return (
      <section aria-labelledby="floor-plans-heading">
        <DetailSectionTitle
          eyebrow="Layout"
          title="Floor Plans"
          id="floor-plans-heading"
        />
        <div className="rounded-[var(--radius-panel)] border border-dashed border-light-border bg-cream px-6 py-12 text-center">
          <Maximize2
            className="mx-auto size-8 text-on-surface-variant/50"
            aria-hidden="true"
          />
          <p className="mt-4 text-sm text-on-surface-variant">
            Floor plans for this property are available upon request from your
            assigned advisor.
          </p>
        </div>
      </section>
    );
  }

  const plan = property.floorPlans[activePlan];

  return (
    <section aria-labelledby="floor-plans-heading">
      <DetailSectionTitle
        eyebrow="Layout"
        title="Floor Plans"
        id="floor-plans-heading"
      />

      {property.floorPlans.length > 1 && (
        <div className="mb-4 flex flex-wrap gap-2">
          {property.floorPlans.map((floorPlan, index) => (
            <button
              key={floorPlan.id}
              type="button"
              onClick={() => setActivePlan(index)}
              className={cn(
                "rounded-full border px-4 py-2 text-sm font-semibold transition",
                activePlan === index
                  ? "border-primary bg-primary text-on-primary"
                  : "border-light-border bg-surface-container-lowest text-on-surface-variant hover:border-primary/35"
              )}
            >
              {floorPlan.label}
            </button>
          ))}
        </div>
      )}

      <div className="overflow-hidden rounded-[var(--radius-panel)] border border-light-border bg-surface-container-lowest shadow-low">
        <div className="flex items-center justify-between border-b border-light-border px-5 py-4">
          <div>
            <h3 className="text-lg font-semibold text-on-surface">{plan.label}</h3>
            <p className="mt-1 text-sm text-on-surface-variant">{plan.area}</p>
          </div>
          <span className="rounded-full bg-accent/15 px-3 py-1 text-xs font-semibold uppercase tracking-[0.12em] text-accent-foreground">
            Plan View
          </span>
        </div>
        <div
          className="aspect-[16/10] bg-cover bg-center"
          style={{ backgroundImage: `url(${plan.image})` }}
          role="img"
          aria-label={`${plan.label} floor plan`}
        />
      </div>
    </section>
  );
}
