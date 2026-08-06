"use client";

import { FAQAccordion } from "@/components/ui/FAQAccordion";
import { useAgencySite } from "@/components/real-estate/site/AgencySiteContext";

export function AgencyFaqAccordion({ fallback }: { fallback: Array<{ question: string; answer: string }> }) {
  const configured = useAgencySite()?.agency.website_config.faqs;
  return <FAQAccordion items={configured?.length ? configured : fallback} />;
}
