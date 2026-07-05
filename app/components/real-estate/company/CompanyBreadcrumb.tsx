import Link from "next/link";
import { ChevronRight, Home } from "lucide-react";

interface CompanyBreadcrumbProps {
  current: string;
}

export function CompanyBreadcrumb({ current }: CompanyBreadcrumbProps) {
  return (
    <nav aria-label="Breadcrumb" className="border-b border-light-border bg-warm-white">
      <div className="container-nexora py-3">
        <ol className="flex flex-wrap items-center gap-1.5 text-sm text-on-surface-variant">
          <li>
            <Link
              href="/template-preview/luxury-agency"
              className="inline-flex items-center gap-1.5 transition hover:text-primary"
            >
              <Home className="size-3.5" aria-hidden="true" />
              Home
            </Link>
          </li>
          <li aria-hidden="true">
            <ChevronRight className="size-3.5" />
          </li>
          <li>
            <Link
              href="/template-preview/luxury-agency/about"
              className="transition hover:text-primary"
            >
              Company
            </Link>
          </li>
          <li aria-hidden="true">
            <ChevronRight className="size-3.5" />
          </li>
          <li>
            <span className="font-medium text-on-surface" aria-current="page">
              {current}
            </span>
          </li>
        </ol>
      </div>
    </nav>
  );
}
