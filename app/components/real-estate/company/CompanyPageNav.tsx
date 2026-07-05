import Link from "next/link";
import { companyPageLinks } from "@/lib/real-estate-company";
import { cn } from "@/lib/utils";

interface CompanyPageNavProps {
  activeHref: string;
}

export function CompanyPageNav({ activeHref }: CompanyPageNavProps) {
  return (
    <nav
      aria-label="Company pages"
      className="overflow-x-auto border-b border-light-border bg-cream/70"
    >
      <div className="container-nexora flex min-h-16 items-center gap-2 py-3">
        {companyPageLinks.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className={cn(
              "shrink-0 rounded-[var(--radius-button)] px-4 py-2 text-sm font-semibold transition",
              activeHref === link.href
                ? "bg-primary text-on-primary shadow-low"
                : "text-on-surface-variant hover:bg-surface-container-lowest hover:text-primary"
            )}
          >
            {link.label}
          </Link>
        ))}
      </div>
    </nav>
  );
}
