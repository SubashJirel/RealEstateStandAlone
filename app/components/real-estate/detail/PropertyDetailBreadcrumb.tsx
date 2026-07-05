import Link from "next/link";
import { ChevronRight, Home } from "lucide-react";
import type { PropertyDetail } from "@/lib/real-estate-template";

interface PropertyDetailBreadcrumbProps {
  property: PropertyDetail;
}

export function PropertyDetailBreadcrumb({
  property,
}: PropertyDetailBreadcrumbProps) {
  return (
    <nav aria-label="Breadcrumb" className="mb-6">
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
            href="/template-preview/luxury-agency/properties"
            className="transition hover:text-primary"
          >
            Properties
          </Link>
        </li>
        <li aria-hidden="true">
          <ChevronRight className="size-3.5" />
        </li>
        <li>
          <span className="font-medium text-on-surface" aria-current="page">
            {property.title}
          </span>
        </li>
      </ol>
    </nav>
  );
}
