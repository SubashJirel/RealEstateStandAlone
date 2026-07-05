import { MapPin, Search } from "lucide-react";
import { Button } from "@/components/ui/Button";

export function PropertySearchForm() {
  return (
    <form className="rounded-[var(--radius-panel)] border border-white/20 bg-warm-white p-3 shadow-luxury md:p-4">
      <div className="grid gap-3 md:grid-cols-[1.8fr_2.2fr_2.2fr_auto]">
        <label className="flex min-h-14 items-center gap-3 rounded-[var(--radius-button)] bg-cream px-4">
          <MapPin className="size-5 text-primary" aria-hidden="true" />
          <span className="min-w-0 flex-1">
            <span className="block text-[11px] font-bold uppercase tracking-[0.16em] text-on-surface-variant">
              Location
            </span>
            <input
              type="text"
              placeholder="Kathmandu, Lalitpur..."
              className="mt-1 w-full bg-transparent text-sm font-semibold text-on-surface outline-none placeholder:text-on-surface-variant/70"
            />
          </span>
        </label>

        <label className="min-h-14 rounded-[var(--radius-button)] bg-cream px-2 py-2.5 relative">
          <span className="block text-[11px] font-bold uppercase tracking-[0.16em] text-on-surface-variant">
            Type
          </span>
          <select className="mt-1 w-full bg-transparent text-xs font-semibold text-on-surface outline-none pr-2 appearance-none">
            <option>Any Property</option>
            <option>Apartment</option>
            <option>Villa</option>
            <option>Commercial</option>
            <option>Land</option>
          </select>
        </label>

        <label className="min-h-14 rounded-[var(--radius-button)] bg-cream px-2 py-2.5 relative">
          <span className="block text-[11px] font-bold uppercase tracking-[0.16em] text-on-surface-variant">
            Budget
          </span>
          <select className="mt-1 w-full bg-transparent text-xs font-semibold text-on-surface outline-none pr-2 appearance-none">
            <option>Any Budget</option>
            <option>1 Cr - 3 Cr</option>
            <option>3 Cr - 6 Cr</option>
            <option>6 Cr+</option>
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
