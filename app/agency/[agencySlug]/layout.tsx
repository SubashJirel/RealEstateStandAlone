import { notFound } from "next/navigation";
import type { CSSProperties, ReactNode } from "react";
import { AgencySiteProvider } from "@/components/real-estate/site/AgencySiteContext";
import { fetchPublicAgencyBySlug } from "@/lib/public-agency-api";

export async function generateMetadata({ params }: { params: Promise<{ agencySlug: string }> }) {
  const { agencySlug } = await params;
  try {
    const agency = await fetchPublicAgencyBySlug(agencySlug);
    return {
      title: agency.seo_title || agency.name,
      description: agency.seo_description || agency.about,
      icons: agency.logo ? { icon: agency.logo } : undefined,
    };
  } catch {
    return { title: "Agency not found" };
  }
}

export default async function AgencyLayout({
  children,
  params,
}: {
  children: ReactNode;
  params: Promise<{ agencySlug: string }>;
}) {
  const { agencySlug } = await params;
  let agency;
  try {
    agency = await fetchPublicAgencyBySlug(agencySlug);
  } catch {
    notFound();
  }
  if (agency.website_template !== "luxury-agency") notFound();

  const brandColor = agency.primary_color || "#153c3b";
  const style = {
    "--color-primary": brandColor,
    "--primary": brandColor,
  } as CSSProperties;

  return (
    <AgencySiteProvider agency={agency}>
      <div style={style}>{children}</div>
    </AgencySiteProvider>
  );
}
