import { CustomerPortal } from "@/components/real-estate/portal/CustomerPortal";
import { RealEstateFooter } from "@/components/real-estate/homepage/RealEstateFooter";
import { RealEstateNavbar } from "@/components/real-estate/homepage/RealEstateNavbar";
import { fetchPublicAgencyBySlug } from "@/lib/public-agency-api";
import { fetchPublicAgents } from "@/lib/public-agents-api";
import { fetchPublicProperties } from "@/lib/public-properties-api";

export default async function PortalPage({ params }: { params: Promise<{ agencySlug: string }> }) {
  const { agencySlug } = await params;
  const agency = await fetchPublicAgencyBySlug(agencySlug);
  const [agents, properties] = await Promise.all([
    fetchPublicAgents(agency.license_number),
    fetchPublicProperties(agency.license_number),
  ]);
  return <div className="min-h-screen bg-warm-white text-on-surface"><RealEstateNavbar /><CustomerPortal agents={agents.map((item) => ({ id: Number(item.id), name: item.name }))} properties={properties.map((item) => ({ id: item.id, name: item.title }))} /><RealEstateFooter /></div>;
}
