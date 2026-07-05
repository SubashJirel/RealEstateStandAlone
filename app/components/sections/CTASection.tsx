import { Button } from "@/components/ui/Button";
import { SITE } from "@/lib/data";

interface CTASectionProps {
  title?: string;
  text?: string;
}

export function CTASection({
  title = "Ready to Turn Listings Into Leads and Leads Into Deals?",
  text = "Move from scattered posts and missed calls to one organized real-estate sales system.",
}: CTASectionProps) {
  return (
    <section className="bg-primary py-16 md:py-20">
      <div className="container-nexora text-center">
        <h2 className="headline-lg mx-auto max-w-3xl text-on-primary">
          {title}
        </h2>
        <p className="body-lg mx-auto mt-4 max-w-2xl text-on-primary-container/90">
          {text}
        </p>
        <div className="mt-8">
          <Button href="/book-demo" variant="secondary" size="lg">
            Book a Free Demo Now
          </Button>
        </div>
        <div className="mt-8 flex flex-col items-center gap-2 body-md text-on-primary-container sm:flex-row sm:justify-center sm:gap-6">
          <a
            href={`tel:${SITE.phone.replace(/\s/g, "")}`}
            className="hover:underline"
          >
            {SITE.phone}
          </a>
          <a href={`mailto:${SITE.email}`} className="hover:underline">
            {SITE.email}
          </a>
        </div>
      </div>
    </section>
  );
}
