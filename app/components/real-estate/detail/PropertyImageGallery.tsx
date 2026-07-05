"use client";

import { useState } from "react";
import { ChevronLeft, ChevronRight, Expand, Grid3X3 } from "lucide-react";
import type { PropertyDetail } from "@/lib/real-estate-template";
import { cn } from "@/lib/utils";

interface PropertyImageGalleryProps {
  property: PropertyDetail;
}

export function PropertyImageGallery({ property }: PropertyImageGalleryProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const images = property.gallery;

  function goTo(index: number) {
    setActiveIndex((index + images.length) % images.length);
  }

  return (
    <>
      <div className="space-y-3">
        <div className="group relative overflow-hidden rounded-[var(--radius-panel)] bg-charcoal shadow-luxury">
          <div
            className="aspect-[16/9] bg-cover bg-center transition duration-700 md:aspect-[21/9]"
            style={{ backgroundImage: `url(${images[activeIndex]})` }}
            role="img"
            aria-label={`${property.title}  photo ${activeIndex + 1} of ${images.length}`}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-charcoal/50 via-transparent to-transparent" />

          <div className="absolute left-4 top-4 flex items-center gap-2 rounded-full border border-white/20 bg-charcoal/60 px-3 py-1.5 text-xs font-semibold uppercase tracking-[0.14em] text-inverse-on-surface backdrop-blur">
            <Grid3X3 className="size-3.5 text-accent" aria-hidden="true" />
            {activeIndex + 1} / {images.length}
          </div>

          <button
            type="button"
            onClick={() => setLightboxOpen(true)}
            className="absolute right-4 top-4 flex size-10 items-center justify-center rounded-full border border-white/25 bg-white/15 text-inverse-on-surface backdrop-blur transition hover:bg-white/25"
            aria-label="View full gallery"
          >
            <Expand className="size-4" aria-hidden="true" />
          </button>

          {images.length > 1 && (
            <>
              <button
                type="button"
                onClick={() => goTo(activeIndex - 1)}
                className="absolute left-4 top-1/2 flex size-10 -translate-y-1/2 items-center justify-center rounded-full border border-white/25 bg-charcoal/50 text-inverse-on-surface backdrop-blur transition hover:bg-charcoal/70"
                aria-label="Previous photo"
              >
                <ChevronLeft className="size-5" aria-hidden="true" />
              </button>
              <button
                type="button"
                onClick={() => goTo(activeIndex + 1)}
                className="absolute right-4 top-1/2 flex size-10 -translate-y-1/2 items-center justify-center rounded-full border border-white/25 bg-charcoal/50 text-inverse-on-surface backdrop-blur transition hover:bg-charcoal/70"
                aria-label="Next photo"
              >
                <ChevronRight className="size-5" aria-hidden="true" />
              </button>
            </>
          )}
        </div>

        {images.length > 1 && (
          <div className="grid grid-cols-4 gap-2 md:grid-cols-5 md:gap-3">
            {images.map((image, index) => (
              <button
                key={image}
                type="button"
                onClick={() => setActiveIndex(index)}
                className={cn(
                  "relative aspect-[4/3] overflow-hidden rounded-[var(--radius-button)] border-2 bg-surface-container transition",
                  activeIndex === index
                    ? "border-accent shadow-low"
                    : "border-transparent opacity-80 hover:opacity-100"
                )}
                aria-label={`View photo ${index + 1}`}
                aria-current={activeIndex === index}
              >
                <div
                  className="absolute inset-0 bg-cover bg-center"
                  style={{ backgroundImage: `url(${image})` }}
                />
              </button>
            ))}
          </div>
        )}
      </div>

      {lightboxOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-charcoal/95 p-4 backdrop-blur-sm"
          role="dialog"
          aria-modal="true"
          aria-label="Image gallery lightbox"
        >
          <button
            type="button"
            onClick={() => setLightboxOpen(false)}
            className="absolute right-4 top-4 rounded-full border border-white/20 px-4 py-2 text-sm font-semibold text-inverse-on-surface transition hover:bg-white/10"
          >
            Close
          </button>

          <button
            type="button"
            onClick={() => goTo(activeIndex - 1)}
            className="absolute left-4 top-1/2 flex size-12 -translate-y-1/2 items-center justify-center rounded-full border border-white/25 bg-white/10 text-inverse-on-surface"
            aria-label="Previous photo"
          >
            <ChevronLeft className="size-6" aria-hidden="true" />
          </button>

          <div
            className="max-h-[85vh] w-full max-w-6xl bg-contain bg-center bg-no-repeat"
            style={{
              backgroundImage: `url(${images[activeIndex]})`,
              aspectRatio: "16/9",
            }}
            role="img"
            aria-label={`${property.title}  photo ${activeIndex + 1}`}
          />

          <button
            type="button"
            onClick={() => goTo(activeIndex + 1)}
            className="absolute right-4 top-1/2 flex size-12 -translate-y-1/2 items-center justify-center rounded-full border border-white/25 bg-white/10 text-inverse-on-surface"
            aria-label="Next photo"
          >
            <ChevronRight className="size-6" aria-hidden="true" />
          </button>
        </div>
      )}
    </>
  );
}
