import { Quote, Star } from "lucide-react";
import type { Testimonial } from "@/lib/real-estate-template";
import { cn } from "@/lib/utils";

interface TestimonialCardProps {
  testimonial: Testimonial;
  className?: string;
}

export function TestimonialCard({
  testimonial,
  className,
}: TestimonialCardProps) {
  return (
    <article
      className={cn(
        "rounded-[var(--radius-card)] border border-light-border bg-surface-container-lowest p-6 shadow-low",
        className
      )}
    >
      <div className="flex items-start justify-between gap-4">
        <Quote className="size-8 text-accent" aria-hidden="true" />
        <div className="flex gap-1 text-accent" aria-label={`${testimonial.rating} star rating`}>
          {Array.from({ length: testimonial.rating }).map((_, index) => (
            <Star key={index} className="size-4 fill-current" aria-hidden="true" />
          ))}
        </div>
      </div>

      <p className="mt-5 text-base leading-7 text-on-surface">
        &ldquo;{testimonial.quote}&rdquo;
      </p>

      <div className="mt-6 border-t border-light-border pt-5">
        <p className="font-semibold text-on-surface">{testimonial.name}</p>
        <p className="mt-1 text-sm text-on-surface-variant">
          {testimonial.role}, {testimonial.location}
        </p>
      </div>
    </article>
  );
}
