import { MapPin } from "lucide-react";
import { RealEstateNavbar } from "@/components/real-estate/homepage/RealEstateNavbar";
import { RealEstateFooter } from "@/components/real-estate/homepage/RealEstateFooter";
import { SiteLink } from "@/components/real-estate/site/AgencySiteContext";
import { fetchPublicAgencyBySlug } from "@/lib/public-agency-api";
import { fetchPublicProperties } from "@/lib/public-properties-api";

export default async function PropertyMapPage({ params }: { params: Promise<{ agencySlug: string }> }) {
  const { agencySlug } = await params;
  const agency = await fetchPublicAgencyBySlug(agencySlug);
  const properties = await fetchPublicProperties(agency.license_number);
  const mapped = properties.filter((item) => item.latitude && item.longitude);
  return <div className="min-h-screen bg-warm-white text-on-surface"><RealEstateNavbar /><main className="container-nexora py-12"><h1 className="text-4xl font-bold">Property map</h1><p className="mt-3 text-on-surface-variant">Open accurate listing coordinates in your preferred map application.</p><div className="mt-8 grid gap-5 md:grid-cols-2 lg:grid-cols-3">{mapped.map((item) => <article key={item.id} className="overflow-hidden rounded-[var(--radius-card)] border border-light-border bg-white shadow-low"><div className="aspect-[16/10] bg-cover bg-center" style={{ backgroundImage: `url(${item.image})` }} /><div className="p-5"><h2 className="font-semibold">{item.title}</h2><p className="mt-2 flex gap-2 text-sm text-on-surface-variant"><MapPin className="size-4" />{item.location}</p><div className="mt-4 flex gap-4 text-sm font-semibold text-primary"><SiteLink href={`/template-preview/luxury-agency/properties/${item.id}`}>Details</SiteLink><a href={`https://www.google.com/maps/search/?api=1&query=${item.latitude},${item.longitude}`} target="_blank" rel="noreferrer">Open map</a></div></div></article>)}</div>{!mapped.length && <p className="mt-10 rounded-xl bg-cream p-5">No published properties currently include coordinates.</p>}</main><RealEstateFooter /></div>;
}
