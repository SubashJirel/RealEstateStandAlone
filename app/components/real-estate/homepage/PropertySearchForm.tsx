"use client";

import { MapPin, Search } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { useAgencySite } from "@/components/real-estate/site/AgencySiteContext";

export function PropertySearchForm() {
  const site = useAgencySite();
  return (
    <form action={`${site?.basePath || "/template-preview/luxury-agency"}/properties`} method="get" className="rounded-[var(--radius-panel)] border border-white/20 bg-warm-white p-3 shadow-luxury md:p-4">
      <div className="grid gap-3 md:grid-cols-[1.8fr_2.2fr_2.2fr_auto]">
        <label className="flex min-h-14 items-center gap-3 rounded-[var(--radius-button)] bg-cream px-4">
          <MapPin className="size-5 text-primary" aria-hidden="true" />
          <span className="min-w-0 flex-1">
            <span className="block text-[11px] font-bold uppercase tracking-[0.16em] text-on-surface-variant">
              Location
            </span>
            <input
              type="text"
              name="search"
              placeholder="Kathmandu, Lalitpur..."
              className="mt-1 w-full bg-transparent text-sm font-semibold text-on-surface outline-none placeholder:text-on-surface-variant/70"
            />
          </span>
        </label>

        <label className="min-h-14 rounded-[var(--radius-button)] bg-cream px-2 py-2.5 relative">
          <span className="block text-[11px] font-bold uppercase tracking-[0.16em] text-on-surface-variant">
            Type
          </span>
          <select name="property_type" className="mt-1 w-full bg-transparent text-xs font-semibold text-on-surface outline-none pr-2 appearance-none">
            <option value="All">Any Property</option>
            <option value="House">House</option>
            <option value="Apartment">Apartment</option>
            <option value="Flat">Flat</option>
            <option value="Commercial">Commercial</option>
            <option value="Land">Land</option>
          </select>
        </label>

        <label className="min-h-14 rounded-[var(--radius-button)] bg-cream px-2 py-2.5 relative">
          <span className="block text-[11px] font-bold uppercase tracking-[0.16em] text-on-surface-variant">
            Budget
          </span>
          <select name="price_range" className="mt-1 w-full bg-transparent text-xs font-semibold text-on-surface outline-none pr-2 appearance-none">
            <option value="Any">Any Budget</option>
            <option value="Under NPR 2 Cr">Under NPR 2 Cr</option>
            <option value="NPR 2 Cr - 5 Cr">NPR 2 Cr - 5 Cr</option>
            <option value="NPR 5 Cr - 8 Cr">NPR 5 Cr - 8 Cr</option>
            <option value="NPR 8 Cr+">NPR 8 Cr+</option>
          </select>
        </label>

        <Button type="submit" size="lg" className="h-14 px-6">
          <Search aria-hidden="true" />
          Search
        </Button>
      </div>
    </form>
  );
}
