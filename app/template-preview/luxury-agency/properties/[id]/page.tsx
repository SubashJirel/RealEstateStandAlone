import { notFound } from "next/navigation";
import { RealEstateFooter } from "@/components/real-estate/homepage/RealEstateFooter";
import { RealEstateNavbar } from "@/components/real-estate/homepage/RealEstateNavbar";
import { fetchPublicPropertyById, fetchPublicProperties } from "@/lib/public-properties-api";
import { LivePropertyDetailView } from "@/components/real-estate/detail/LivePropertyDetailView";

interface LivePropertyDetailPageProps {
  params: Promise<{ id: string }>;
}

export async function generateStaticParams() {
  try {
    const properties = await fetchPublicProperties();
    return properties.map((p) => ({ id: String(p.id) }));
  } catch {
    return [];
  }
}

export async function generateMetadata({ params }: LivePropertyDetailPageProps) {
  const { id } = await params;
  try {
    const property = await fetchPublicPropertyById(id);
    return {
      title: `${property.title} | Aurelia Estates`,
      description: property.summary,
    };
  } catch {
    return { title: "Property Not Found | Aurelia Estates" };
  }
}

export default async function LivePropertyDetailPage({
  params,
}: LivePropertyDetailPageProps) {
  const { id } = await params;

  let property;
  try {
    property = await fetchPublicPropertyById(id);
  } catch {
    notFound();
  }

  return (
    <div className="min-h-screen bg-warm-white text-on-surface">
      <RealEstateNavbar />
      <LivePropertyDetailView property={property} />
      <RealEstateFooter />
    </div>
  );
}
