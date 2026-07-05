import { Award, Headphones, Star, UsersRound } from "lucide-react";
import { AgentDirectoryBrowser } from "@/components/real-estate/agents/AgentDirectoryBrowser";
import { RealEstateFooter } from "@/components/real-estate/homepage/RealEstateFooter";
import { RealEstateNavbar } from "@/components/real-estate/homepage/RealEstateNavbar";
import { Badge } from "@/components/ui/Badge";
import { templateAgents } from "@/lib/real-estate-template";

export const metadata = {
  title: "Agents | Aurelia Estates Preview",
  description:
    "Search the Aurelia Estates agent directory and open detailed advisor profiles with listings and reviews.",
};

const directoryHighlights = [
  {
    label: "Senior Advisors",
    value: templateAgents.length.toString(),
    icon: UsersRound,
  },
  {
    label: "Average Rating",
    value: "4.8",
    icon: Star,
  },
  {
    label: "Properties Sold",
    value: `${templateAgents.reduce((sum, agent) => sum + agent.dealsClosed, 0)}+`,
    icon: Award,
  },
];

export default function LuxuryAgencyAgentsPage() {
  return (
    <div className="min-h-screen bg-warm-white text-on-surface">
      <RealEstateNavbar />

      <section className="relative overflow-hidden bg-charcoal py-14 text-inverse-on-surface md:py-20">
        <div
          className="absolute inset-0 bg-cover bg-center opacity-25"
          style={{
            backgroundImage:
              "url(https://images.unsplash.com/photo-1556761175-b413da4baf72?auto=format&fit=crop&w=1800&q=85)",
          }}
          aria-hidden="true"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-charcoal via-charcoal/90 to-charcoal/60" />
        <div className="container-nexora relative">
          <Badge variant="accent">Agent Directory</Badge>
          <div className="mt-5 grid gap-8 lg:grid-cols-[1fr_360px] lg:items-end">
            <div>
              <h1 className="max-w-3xl text-4xl font-bold leading-tight md:text-6xl">
                Meet the Advisors Behind Every Confident Move
              </h1>
              <p className="mt-5 max-w-2xl text-base leading-7 text-inverse-on-surface/72 md:text-lg">
                Search by specialty, neighborhood, language, or track record to
                find the right person for buying, selling, renting, or investing.
              </p>
            </div>
            <div className="rounded-[var(--radius-card)] border border-white/15 bg-white/10 p-5 backdrop-blur">
              <Headphones className="size-7 text-accent" aria-hidden="true" />
              <p className="mt-3 text-3xl font-bold">Private Desk</p>
              <p className="mt-1 text-sm leading-6 text-inverse-on-surface/65">
                Direct advisor access for viewings, seller strategy, and
                investment shortlists.
              </p>
            </div>
          </div>

          <div className="mt-10 grid gap-4 sm:grid-cols-3">
            {directoryHighlights.map((item) => {
              const Icon = item.icon;

              return (
                <div
                  key={item.label}
                  className="rounded-[var(--radius-card)] border border-white/12 bg-white/10 p-4 backdrop-blur"
                >
                  <Icon className="size-5 text-accent" aria-hidden="true" />
                  <p className="mt-3 text-2xl font-bold">{item.value}</p>
                  <p className="mt-1 text-sm text-inverse-on-surface/65">
                    {item.label}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="py-10 md:py-14">
        <div className="container-nexora">
          <AgentDirectoryBrowser />
        </div>
      </section>

      <RealEstateFooter />
    </div>
  );
}
