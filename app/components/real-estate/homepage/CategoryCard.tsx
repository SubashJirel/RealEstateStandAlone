import type { PropertyCategory } from "@/lib/real-estate-template";

export function CategoryCard({ category }: { category: PropertyCategory }) {
  return (
    <article className="group relative min-h-64 overflow-hidden rounded-[var(--radius-card)] bg-charcoal shadow-low">
      <div
        className="absolute inset-0 bg-cover bg-center transition duration-500 group-hover:scale-105"
        style={{ backgroundImage: `url(${category.image})` }}
        aria-hidden="true"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-charcoal via-charcoal/30 to-transparent" />
      <div className="relative flex h-full min-h-64 flex-col justify-end p-5 text-inverse-on-surface">
        <p className="text-sm font-semibold text-accent">{category.count}</p>
        <h3 className="mt-1 text-2xl font-semibold">{category.name}</h3>
      </div>
    </article>
  );
}
