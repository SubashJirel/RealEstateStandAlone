import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/Button";
import templateImage from "@/templateImage.png";

interface TemplateCardProps {
  name: string;
  bestFor: string;
  features?: readonly string[];
  gradient: string;
  showPreview?: boolean;
  image?: typeof templateImage;
}

/**
 * Renders a small, representative mockup of the actual template layout.
 * The variant is inferred from the gradient token so the calling code
 * (and its props) doesn't need to change.
 */
function TemplateMockup({ gradient }: { gradient: string }) {
  const isAgency = gradient.includes("emerald") || gradient.includes("green") || gradient.includes("sage");
  const isLand = gradient.includes("blue") || gradient.includes("sky");
  const variant = isAgency ? "agency" : isLand ? "land" : "broker";

  return (
    <div
      className={`relative aspect-[4/3] overflow-hidden rounded-t-xl bg-gradient-to-br ${gradient}`}
    >
      <div className="absolute inset-4 rounded-lg border border-white/40 bg-white/60 p-3 backdrop-blur-sm">
        {/* shared top nav bar */}
        <div className="mb-3 h-2 w-16 rounded bg-deep-sage/30" />

        {variant === "agency" && (
          <div className="grid grid-cols-2 gap-2">
            <div className="space-y-1 rounded bg-white/80 p-1.5">
              <div className="h-6 rounded bg-deep-sage/20" />
              <div className="h-1.5 w-3/4 rounded bg-deep-sage/30" />
              <div className="h-1.5 w-1/2 rounded bg-deep-sage/15" />
            </div>
            <div className="space-y-1 rounded bg-white/80 p-1.5">
              <div className="h-6 rounded bg-deep-sage/20" />
              <div className="h-1.5 w-3/4 rounded bg-deep-sage/30" />
              <div className="h-1.5 w-1/2 rounded bg-deep-sage/15" />
            </div>
            <div className="col-span-2 flex items-center gap-2 rounded bg-white/60 p-1.5">
              <div className="h-5 w-5 shrink-0 rounded-full bg-deep-sage/30" />
              <div className="h-1.5 w-2/3 rounded bg-deep-sage/20" />
            </div>
          </div>
        )}

        {variant === "broker" && (
          <div className="space-y-2">
            <div className="flex items-center gap-2 rounded bg-white/80 p-1.5">
              <div className="h-8 w-8 shrink-0 rounded-full bg-deep-sage/30" />
              <div className="space-y-1">
                <div className="h-1.5 w-16 rounded bg-deep-sage/30" />
                <div className="h-1.5 w-10 rounded bg-deep-sage/15" />
              </div>
            </div>
            <div className="h-10 rounded bg-white/80" />
            <div className="flex gap-2">
              <div className="h-5 flex-1 rounded bg-deep-sage/25" />
              <div className="h-5 flex-1 rounded bg-white/80" />
            </div>
          </div>
        )}

        {variant === "land" && (
          <div className="grid grid-cols-3 gap-1">
            <div className="col-span-3 h-12 rounded bg-white/80 [background-image:linear-gradient(0deg,transparent_24%,rgba(0,0,0,0.06)_25%,transparent_26%,transparent_74%,rgba(0,0,0,0.06)_75%,transparent_76%),linear-gradient(90deg,transparent_24%,rgba(0,0,0,0.06)_25%,transparent_26%,transparent_74%,rgba(0,0,0,0.06)_75%,transparent_76%)] [background-size:33%_50%]" />
            <div className="h-5 rounded bg-deep-sage/25" />
            <div className="h-5 rounded bg-white/80" />
            <div className="h-5 rounded bg-white/80" />
          </div>
        )}
      </div>
    </div>
  );
}

export function TemplateCard({
  name,
  bestFor,
  features,
  gradient,
  showPreview = false,
  image,
}: TemplateCardProps) {
  return (
    <article className="card-hover overflow-hidden rounded-xl border border-light-border bg-surface-container-lowest shadow-low">
      {image ? (
        <div className="relative w-full bg-gray-200 rounded-t-xl flex items-center justify-center">
          <Image
            src={image}
            alt={name}
            className="w-full h-auto object-contain"
            priority
          />
        </div>
      ) : (
        <TemplateMockup gradient={gradient} />
      )}
      <div className="p-5 md:p-6">
        <h3 className="text-lg font-semibold text-on-surface">{name}</h3>
        <p className="body-sm mt-2 text-on-surface-variant">
          <span className="font-medium text-on-surface">Best for: </span>
          {bestFor}
        </p>

        {features && (
          <ul className="mt-4 space-y-1.5">
            {features.map((feature) => (
              <li
                key={feature}
                className="flex gap-2 body-sm text-on-surface-variant"
              >
                <span className="text-deep-sage">•</span>
                {feature}
              </li>
            ))}
          </ul>
        )}

        <div className={`mt-5 flex gap-3 ${showPreview ? "flex-col sm:flex-row" : ""}`}>
          {showPreview && (
            <Button asChild variant="outline" size="sm" className="flex-1">
              <Link
                href="/template-preview/luxury-agency"
                target="_blank"
                rel="noreferrer"
              >
                Preview
              </Link>
            </Button>
          )}
          <Button
            href="/book-demo"
            size="sm"
            variant={showPreview ? "primary" : "outline"}
            className={showPreview ? "flex-1" : "w-full"}
          >
            Choose Template
          </Button>
        </div>
      </div>
    </article>
  );
}
