import { headers } from "next/headers";
import { redirect } from "next/navigation";
import LuxuryAgencyTemplatePage, { metadata } from "./template-preview/luxury-agency/page";
import { fetchPublicAgencyByDomain } from "@/lib/public-agency-api";

export { metadata };

export default async function HomePage() {
  const requestHeaders = await headers();
  const host = (requestHeaders.get("x-forwarded-host") || requestHeaders.get("host") || "").split(":")[0];
  const isLocal = !host || host === "localhost" || host === "127.0.0.1";

  if (!isLocal) {
    let domainAgency;
    try {
      domainAgency = await fetchPublicAgencyByDomain(host);
    } catch {
      // Fall through to the configured default or template preview.
    }
    if (domainAgency) redirect(`/agency/${domainAgency.slug}`);
  }

  const defaultSlug = process.env.NEXT_PUBLIC_DEFAULT_AGENCY_SLUG;
  if (defaultSlug) redirect(`/agency/${defaultSlug}`);
  return <LuxuryAgencyTemplatePage params={Promise.resolve({})} />;
}
