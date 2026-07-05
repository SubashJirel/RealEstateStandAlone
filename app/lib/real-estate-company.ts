import {
  Award,
  BriefcaseBusiness,
  Building2,
  Compass,
  FileCheck2,
  Handshake,
  HeartHandshake,
  Home,
  KeyRound,
  MapPinned,
  ShieldCheck,
  Sparkles,
  UsersRound,
} from "lucide-react";

export const companyPageLinks = [
  { label: "About Us", href: "/template-preview/luxury-agency/about" },
  { label: "Our Mission", href: "/template-preview/luxury-agency/mission" },
  { label: "Our Story", href: "/template-preview/luxury-agency/story" },
  { label: "Careers", href: "/template-preview/luxury-agency/careers" },
  { label: "FAQ", href: "/template-preview/luxury-agency/faq" },
] as const;

export const companyStats = [
  { label: "Years Advising", value: "14", helper: "Across premium residential and commercial markets." },
  { label: "Client Referrals", value: "72%", helper: "Most new clients arrive through trusted introductions." },
  { label: "Verified Listings", value: "250+", helper: "Reviewed for location, presentation, and ownership signals." },
  { label: "Closed Value", value: "NPR 38B+", helper: "Represented across buyer, seller, and investment mandates." },
];

export const companyValues = [
  {
    title: "Verified Before Visible",
    description:
      "Every listing is reviewed for basic ownership details, location accuracy, pricing context, and presentation quality before it reaches serious buyers.",
    icon: ShieldCheck,
  },
  {
    title: "Advisory Over Pressure",
    description:
      "We guide decisions with market evidence, calm negotiation, and clear tradeoffs rather than urgency tactics.",
    icon: Compass,
  },
  {
    title: "Private Client Care",
    description:
      "Viewing schedules, seller conversations, documentation steps, and handovers are handled with discretion and steady communication.",
    icon: HeartHandshake,
  },
];

export const missionPillars = [
  {
    title: "Clarity",
    description:
      "Make property decisions easier to understand with clean shortlists, transparent pricing context, and precise next steps.",
    icon: FileCheck2,
  },
  {
    title: "Confidence",
    description:
      "Protect clients from noisy listings and weak-fit opportunities by focusing on verified options and disciplined advisory.",
    icon: KeyRound,
  },
  {
    title: "Connection",
    description:
      "Match people to homes, neighborhoods, and investment assets that support their real plans, not just their search filters.",
    icon: Handshake,
  },
];

export const storyTimeline = [
  {
    year: "2012",
    title: "A private advisory desk opens",
    description:
      "Aurelia began as a referral-led brokerage focused on verified homes and calm representation for high-value property decisions.",
  },
  {
    year: "2016",
    title: "Luxury residential division grows",
    description:
      "The team expanded into villas, family estates, and premium apartments across Kathmandu and Lalitpur.",
  },
  {
    year: "2020",
    title: "Commercial and investment practice launches",
    description:
      "Dedicated advisors began supporting retail frontage, office floors, land parcels, and long-term portfolio moves.",
  },
  {
    year: "2026",
    title: "A full-service property platform",
    description:
      "Today Aurelia combines human advisory, curated inventory, and modern digital presentation for buyers, sellers, renters, and developers.",
  },
];

export const leadershipPrinciples = [
  {
    title: "Local market command",
    description:
      "Senior advisors track neighborhood demand, buyer intent, price movement, and developer activity every week.",
    icon: MapPinned,
  },
  {
    title: "Presentation that sells",
    description:
      "Listings are positioned with better photography, concise details, and stronger inquiry paths for qualified prospects.",
    icon: Sparkles,
  },
  {
    title: "End-to-end coordination",
    description:
      "From first brief to handover, clients get a single accountable team across viewings, offers, and documentation.",
    icon: Building2,
  },
];

export const careerOpenings = [
  {
    title: "Luxury Property Advisor",
    team: "Residential Sales",
    location: "Kathmandu",
    type: "Full Time",
    description:
      "Represent premium listings, guide qualified buyers, and manage seller communication with a polished advisory standard.",
  },
  {
    title: "Client Experience Coordinator",
    team: "Operations",
    location: "Lalitpur",
    type: "Full Time",
    description:
      "Coordinate private tours, inquiry follow-up, CRM hygiene, and listing handover support for active clients.",
  },
  {
    title: "Commercial Property Associate",
    team: "Investment Advisory",
    location: "Kathmandu",
    type: "Hybrid",
    description:
      "Support site analysis, owner outreach, investor shortlists, and market research for commercial and land opportunities.",
  },
];

export const careerBenefits = [
  { title: "Mentorship", description: "Work beside senior advisors on real mandates and live negotiation strategy.", icon: UsersRound },
  { title: "Premium Tools", description: "Use modern CRM workflows, polished listing assets, and clean client presentation systems.", icon: BriefcaseBusiness },
  { title: "Growth Path", description: "Build a specialist lane across villas, apartments, commercial, land, or client experience.", icon: Award },
];

export const companyFaqs = [
  {
    question: "Do you verify listings before publishing them?",
    answer:
      "Yes. The team reviews location details, pricing context, media quality, and basic ownership signals before a property is promoted as verified inventory.",
  },
  {
    question: "Can buyers schedule private viewings?",
    answer:
      "Yes. Advisors arrange focused private tours based on budget, area, preferred property type, and timing.",
  },
  {
    question: "Do you help sellers price premium homes?",
    answer:
      "Yes. Seller representation includes comparative market context, presentation recommendations, launch strategy, and buyer negotiation support.",
  },
  {
    question: "What property types does Aurelia handle?",
    answer:
      "The template supports villas, apartments, houses, commercial spaces, land parcels, rental residences, and developer inventory.",
  },
  {
    question: "Can the agency support relocation clients?",
    answer:
      "Yes. Advisors can shortlist neighborhoods, compare commute patterns, arrange rental viewings, and coordinate move-in details.",
  },
  {
    question: "How do clients choose the right agent?",
    answer:
      "Clients can browse the agent directory by specialty, location, rating, language, and current listings, then open a full profile before contacting an advisor.",
  },
];

export const aboutHighlights = [
  {
    title: "Buyer Representation",
    description:
      "Shortlists shaped around lifestyle, commute, schools, privacy, and long-term resale confidence.",
    icon: Home,
  },
  {
    title: "Seller Strategy",
    description:
      "Pricing, positioning, viewings, offer handling, and communication designed for qualified demand.",
    icon: Award,
  },
  {
    title: "Investment Guidance",
    description:
      "Commercial, land, and rental opportunities reviewed through yield, access, demand, and exit potential.",
    icon: BriefcaseBusiness,
  },
];
