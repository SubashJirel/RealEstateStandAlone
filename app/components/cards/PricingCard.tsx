import { Button } from "@/components/ui/Button";

interface PricingCardProps {
  name: string;
  setupCharge: string;
  monthlyCharge: string;
  popular?: boolean;
  bestFor: string;
  includes: readonly string[];
  cta: string;
}

export function PricingCard({
  name,
  setupCharge,
  monthlyCharge,
  popular = false,
  bestFor,
  includes,
  cta,
}: PricingCardProps) {
  return (
    <article
      className={`card-hover relative flex flex-col rounded-2xl border bg-surface-container-lowest p-6 shadow-low md:p-8 ${
        popular
          ? "border-deep-sage ring-2 ring-deep-sage/20"
          : "border-light-border"
      }`}
    >
      {popular && (
        <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-deep-sage px-4 py-1 text-xs font-semibold text-on-primary">
          Most Popular
        </span>
      )}

      <h3 className="headline-md text-on-surface">{name}</h3>

      <div className="mt-4 space-y-1">
        <p className="body-sm text-on-surface-variant">
          Setup Charge:{" "}
          <span className="font-semibold text-on-surface">{setupCharge}</span>
        </p>
        <p className="text-2xl font-bold text-primary">{monthlyCharge}</p>
      </div>

      <p className="body-sm mt-4 text-on-surface-variant">
        <span className="font-semibold text-on-surface">Best for: </span>
        {bestFor}
      </p>

      <div className="my-6 h-px bg-light-border" />

      <p className="text-sm font-semibold text-on-surface">Includes:</p>
      <ul className="mt-3 flex-1 space-y-2">
        {includes.map((item) => (
          <li key={item} className="flex gap-2 body-sm text-on-surface-variant">
            <span className="mt-0.5 text-deep-sage" aria-hidden="true">
              ✓
            </span>
            <span>{item}</span>
          </li>
        ))}
      </ul>

      <div className="mt-8">
        <Button
          href="/book-demo"
          variant={popular ? "primary" : "outline"}
          className="w-full"
        >
          {cta}
        </Button>
      </div>
    </article>
  );
}
