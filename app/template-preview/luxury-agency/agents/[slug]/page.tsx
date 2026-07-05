import Link from "next/link";
import { notFound } from "next/navigation";
import type { ElementType } from "react";
import {
  ArrowLeft,
  Award,
  BriefcaseBusiness,
  Camera,
  Globe,
  Mail,
  MapPin,
  Phone,
  Star,
} from "lucide-react";
import { RealEstateFooter } from "@/components/real-estate/homepage/RealEstateFooter";
import { RealEstateNavbar } from "@/components/real-estate/homepage/RealEstateNavbar";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import {
  getAgentBySlug,
  getAgentListings,
  getAgentSlug,
  getPropertyDetailPath,
  templateAgents,
} from "@/lib/real-estate-template";

interface AgentProfilePageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return templateAgents.map((agent) => ({ slug: getAgentSlug(agent) }));
}

export async function generateMetadata({ params }: AgentProfilePageProps) {
  const { slug } = await params;
  const agent = getAgentBySlug(slug);

  if (!agent) {
    return { title: "Agent Not Found | Aurelia Estates" };
  }

  return {
    title: `${agent.name} | Aurelia Estates Preview`,
    description: `${agent.name}, ${agent.role} at Aurelia Estates.`,
  };
}

export default async function AgentProfilePage({
  params,
}: AgentProfilePageProps) {
  const { slug } = await params;
  const agent = getAgentBySlug(slug);

  if (!agent) {
    notFound();
  }

  const listings = getAgentListings(agent);

  return (
    <div className="min-h-screen bg-warm-white text-on-surface">
      <RealEstateNavbar />

      <section className="relative overflow-hidden bg-charcoal py-8 text-inverse-on-surface md:py-12">
        <div className="absolute inset-0 bg-gradient-to-r from-charcoal via-primary/85 to-charcoal" />
        <div className="container-nexora relative">
          <Button asChild variant="luxury" className="border border-white/15">
            <Link href="/template-preview/luxury-agency/agents">
              <ArrowLeft aria-hidden="true" />
              Back to Agents
            </Link>
          </Button>

          <div className="mt-8 grid gap-8 lg:grid-cols-[360px_1fr] lg:items-end">
            <div className="overflow-hidden rounded-[var(--radius-panel)] border border-white/15 bg-white/10 p-3 shadow-luxury backdrop-blur">
              <div
                className="aspect-[4/5] rounded-[18px] bg-cover bg-center"
                style={{ backgroundImage: `url(${agent.image})` }}
                role="img"
                aria-label={agent.name}
              />
            </div>

            <div>
              <Badge variant="accent">{agent.role}</Badge>
              <h1 className="mt-5 max-w-4xl text-4xl font-bold leading-tight md:text-6xl">
                {agent.name}
              </h1>
              <p className="mt-4 flex items-center gap-2 text-inverse-on-surface/72">
                <MapPin className="size-5 text-accent" aria-hidden="true" />
                {agent.location}
              </p>

              <div className="mt-8 grid gap-4 sm:grid-cols-3">
                <ProfileMetric
                  icon={Award}
                  label="Properties Sold"
                  value={`${agent.dealsClosed}`}
                />
                <ProfileMetric
                  icon={Star}
                  label="Client Rating"
                  value={`${agent.rating}`}
                />
                <ProfileMetric
                  icon={Phone}
                  label="Experience"
                  value={`${agent.yearsExperience} yrs`}
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-12 md:py-16">
        <div className="container-nexora">
          <div className="grid gap-10 lg:grid-cols-[1fr_360px] xl:grid-cols-[1fr_400px]">
            <main className="space-y-10">
              <section className="rounded-[var(--radius-panel)] border border-light-border bg-surface-container-lowest p-6 shadow-low md:p-8">
                <p className="text-sm font-semibold uppercase tracking-[0.16em] text-accent">
                  Biography
                </p>
                <h2 className="mt-3 text-2xl font-semibold text-on-surface">
                  Market Guidance With a Personal Brief
                </h2>
                <p className="mt-4 text-base leading-8 text-on-surface-variant">
                  {agent.biography}
                </p>
                <div className="mt-6 flex flex-wrap gap-2">
                  {agent.specialties.map((specialty) => (
                    <span
                      key={specialty}
                      className="rounded-full bg-cream px-3 py-1.5 text-sm font-semibold text-on-surface-variant"
                    >
                      {specialty}
                    </span>
                  ))}
                </div>
              </section>

              <section>
                <div className="mb-5">
                  <p className="text-sm font-semibold uppercase tracking-[0.16em] text-accent">
                    Current Listings
                  </p>
                  <h2 className="mt-2 text-2xl font-semibold text-on-surface">
                    Active Properties Represented by {agent.name.split(" ")[0]}
                  </h2>
                </div>
                <div className="grid gap-5 md:grid-cols-2">
                  {listings.map((property) => (
                    <Link
                      key={property.id}
                      href={getPropertyDetailPath(property)}
                      className="card-hover group overflow-hidden rounded-[var(--radius-card)] border border-light-border bg-surface-container-lowest shadow-low"
                    >
                      <div className="aspect-[16/10] overflow-hidden bg-surface-container">
                        <div
                          className="h-full w-full bg-cover bg-center transition duration-500 group-hover:scale-105"
                          style={{ backgroundImage: `url(${property.image})` }}
                          role="img"
                          aria-label={property.title}
                        />
                      </div>
                      <div className="p-5">
                        <p className="text-lg font-bold text-primary">
                          {property.price}
                        </p>
                        <h3 className="mt-2 text-lg font-semibold text-on-surface group-hover:text-primary">
                          {property.title}
                        </h3>
                        <p className="mt-2 flex items-center gap-2 text-sm text-on-surface-variant">
                          <MapPin
                            className="size-4 text-accent"
                            aria-hidden="true"
                          />
                          {property.location}
                        </p>
                        <div className="mt-4 flex flex-wrap gap-2 text-xs font-semibold text-on-surface-variant">
                          <span className="rounded-full bg-cream px-3 py-1">
                            {property.type}
                          </span>
                          <span className="rounded-full bg-cream px-3 py-1">
                            {property.area}
                          </span>
                          <span className="rounded-full bg-cream px-3 py-1">
                            {property.status}
                          </span>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              </section>

              <section className="rounded-[var(--radius-panel)] border border-light-border bg-surface-container-lowest p-6 shadow-low md:p-8">
                <p className="text-sm font-semibold uppercase tracking-[0.16em] text-accent">
                  Reviews
                </p>
                <h2 className="mt-2 text-2xl font-semibold text-on-surface">
                  Client Feedback
                </h2>
                <div className="mt-6 grid gap-4 md:grid-cols-2">
                  {agent.reviews.map((review) => (
                    <article
                      key={review.id}
                      className="rounded-[var(--radius-card)] border border-light-border bg-cream p-5"
                    >
                      <div className="flex items-center justify-between gap-3">
                        <div>
                          <h3 className="font-semibold text-on-surface">
                            {review.author}
                          </h3>
                          <p className="mt-1 text-sm text-on-surface-variant">
                            {review.location}
                          </p>
                        </div>
                        <span className="flex items-center gap-1 text-sm font-semibold text-primary">
                          <Star
                            className="size-4 fill-accent text-accent"
                            aria-hidden="true"
                          />
                          {review.rating}
                        </span>
                      </div>
                      <p className="mt-4 text-sm leading-6 text-on-surface-variant">
                        {review.comment}
                      </p>
                    </article>
                  ))}
                </div>
              </section>
            </main>

            <aside className="space-y-6 lg:sticky lg:top-24 lg:self-start">
              <section className="rounded-[var(--radius-panel)] border border-light-border bg-surface-container-lowest p-6 shadow-low">
                <p className="text-sm font-semibold uppercase tracking-[0.16em] text-accent">
                  Contact Information
                </p>
                <div className="mt-5 space-y-4 text-sm text-on-surface-variant">
                  <a
                    href={`tel:${agent.phone.replaceAll(" ", "")}`}
                    className="flex items-center gap-3 rounded-xl bg-cream p-3 hover:text-primary"
                  >
                    <Phone className="size-4 text-primary" aria-hidden="true" />
                    {agent.phone}
                  </a>
                  <a
                    href={`mailto:${agent.email}`}
                    className="flex items-center gap-3 rounded-xl bg-cream p-3 hover:text-primary"
                  >
                    <Mail className="size-4 text-primary" aria-hidden="true" />
                    {agent.email}
                  </a>
                  <span className="flex items-center gap-3 rounded-xl bg-cream p-3">
                    <MapPin className="size-4 text-primary" aria-hidden="true" />
                    {agent.location}
                  </span>
                </div>
                <Button className="mt-5 w-full">
                  <Phone aria-hidden="true" />
                  Schedule a Call
                </Button>
              </section>

              <section className="rounded-[var(--radius-panel)] border border-light-border bg-surface-container-lowest p-6 shadow-low">
                <p className="text-sm font-semibold uppercase tracking-[0.16em] text-accent">
                  Social Links
                </p>
                <div className="mt-5 grid grid-cols-3 gap-3">
                  <SocialLink
                    href={agent.socialLinks.linkedin}
                    label="LinkedIn"
                    icon={BriefcaseBusiness}
                  />
                  <SocialLink
                    href={agent.socialLinks.instagram}
                    label="Instagram"
                    icon={Camera}
                  />
                  <SocialLink
                    href={agent.socialLinks.facebook}
                    label="Facebook"
                    icon={Globe}
                  />
                </div>
              </section>

              <section className="rounded-[var(--radius-panel)] border border-light-border bg-charcoal p-6 text-inverse-on-surface shadow-luxury">
                <p className="text-sm font-semibold uppercase tracking-[0.16em] text-accent">
                  Languages
                </p>
                <div className="mt-4 flex flex-wrap gap-2">
                  {agent.languages.map((language) => (
                    <span
                      key={language}
                      className="rounded-full bg-white/10 px-3 py-1.5 text-sm font-semibold"
                    >
                      {language}
                    </span>
                  ))}
                </div>
              </section>
            </aside>
          </div>
        </div>
      </section>

      <RealEstateFooter />
    </div>
  );
}

function ProfileMetric({
  icon: Icon,
  label,
  value,
}: {
  icon: ElementType;
  label: string;
  value: string;
}) {
  return (
    <div className="rounded-[var(--radius-card)] border border-white/12 bg-white/10 p-4 backdrop-blur">
      <Icon className="size-5 text-accent" aria-hidden="true" />
      <p className="mt-3 text-2xl font-bold">{value}</p>
      <p className="mt-1 text-sm text-inverse-on-surface/65">{label}</p>
    </div>
  );
}

function SocialLink({
  href,
  label,
  icon: Icon,
}: {
  href: string;
  label: string;
  icon: ElementType;
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      aria-label={label}
      className="flex h-12 items-center justify-center rounded-[var(--radius-button)] border border-light-border bg-cream text-primary transition hover:border-primary/35 hover:bg-surface-container-low"
    >
      <Icon className="size-5" aria-hidden="true" />
    </a>
  );
}
