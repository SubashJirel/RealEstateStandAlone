import type { ReactNode } from "react";
import { Badge } from "@/components/ui/Badge";

interface CompanyHeroProps {
  eyebrow: string;
  title: string;
  subtitle: string;
  image: string;
  children?: ReactNode;
}

export function CompanyHero({
  eyebrow,
  title,
  subtitle,
  image,
  children,
}: CompanyHeroProps) {
  return (
    <section className="relative overflow-hidden bg-charcoal py-16 text-inverse-on-surface md:py-24">
      <div
        className="absolute inset-0 bg-cover bg-center opacity-30"
        style={{ backgroundImage: `url(${image})` }}
        aria-hidden="true"
      />
      <div className="absolute inset-0 bg-gradient-to-r from-charcoal via-charcoal/90 to-charcoal/55" />
      <div className="container-nexora relative">
        <div className="max-w-4xl">
          <Badge variant="accent">{eyebrow}</Badge>
          <h1 className="mt-5 text-4xl font-bold leading-tight md:text-6xl">
            {title}
          </h1>
          <p className="mt-5 max-w-2xl text-base leading-7 text-inverse-on-surface/72 md:text-lg">
            {subtitle}
          </p>
        </div>
        {children ? <div className="mt-10">{children}</div> : null}
      </div>
    </section>
  );
}
