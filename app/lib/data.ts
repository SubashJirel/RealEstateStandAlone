import templateImage from "@/templateImage.png";

export const SITE = {
  name: "Nexora RealtyOS",
  tagline: "Listings Dekhi Leads Samma, Leads Dekhi Deals Samma",
  phone: "+977 9863594575",
  email: "nexorarealtyos@gmail.com",
  location: "Kathmandu, Nepal",
} as const;

export const NAV_LINKS = [
  { label: "Features", href: "/#features" },
  { label: "Templates", href: "/templates" },
  { label: "How It Works", href: "/#how-it-works" },
  { label: "Pricing", href: "/pricing" },
  { label: "Who It's For", href: "/#who-its-for" },
  { label: "FAQ", href: "/#faq" },
] as const;

export const PROBLEMS = [
  {
    title: "Facebook Messages",
    description:
      "Lead tagged messages get lost and never make it into your CRM.",
    icon: "facebook",
  },
  {
    title: "WhatsApp / Viber",
    description:
      "Unorganized inquiries across personal devices and fragmented groups.",
    icon: "chat",
  },
  {
    title: "Manual Notes",
    description:
      "Lead details are lost in diaries, spreadsheets, and scattered notes.",
    icon: "notes",
  },
  {
    title: "Missed Follow-ups",
    description:
      "Potential deals cool down because of delayed responses and missed tasks.",
    icon: "clock",
  },
] as const;

export const SOLUTION_FLOW = [
  { label: "Website Template", icon: "template" },
  { label: "Property Listing", icon: "listing" },
  { label: "Buyer Lead", icon: "lead" },
  { label: "Site Visit", icon: "visit" },
  { label: "Follow-up", icon: "followup" },
  { label: "Deal Closed", icon: "deal" },
] as const;

export const TEMPLATE_PREVIEW = [
  {
    id: "agency",
    name: "Agency Website",
    bestFor: "Agencies managing many listings across multiple areas.",
    category: "Agency",
    gradient: "from-[#e9f6fd] to-[#c6e8d2]",
  },
  {
    id: "land-developer",
    name: "Land Developer",
    bestFor:
      "Land plotting and development projects with specific interactive map features.",
    category: "Land Developer",
    gradient: "from-[#faf7f0] to-[#e3f0f8]",
  },
  {
    id: "housing",
    name: "Housing Project",
    bestFor:
      "Apartments, premium homes, and high-conversion booking forms.",
    category: "Housing Project",
    gradient: "from-[#f3ede3] to-[#ddeaf2]",
  },
] as const;

export const TEMPLATES = [
  {
    id: "agency",
    name: "Agency Website",
    bestFor: "Real-estate agencies with multiple listings and agents",
    category: "Agency",
    features: [
      "Multi-listing property grid",
      "Agent profiles and contact forms",
      "Lead capture on every listing",
    ],
    gradient: "from-[#e9f6fd] to-[#c6e8d2]",
    image: templateImage,
  },
  // {
  //   id: "broker",
  //   name: "Broker Website",
  //   bestFor: "Individual brokers building a personal brand",
  //   category: "Broker",
  //   features: [
  //     "Personal brand showcase",
  //     "Featured property highlights",
  //     "Direct WhatsApp and call buttons",
  //   ],
  //   gradient: "from-[#faf7f0] to-[#f3ede3]",
  // },
  // {
  //   id: "land-developer",
  //   name: "Land Developer",
  //   bestFor: "Land plotting and development projects",
  //   category: "Land Developer",
  //   features: [
  //     "Interactive plot map layout",
  //     "Project phase tracking",
  //     "Site visit booking forms",
  //   ],
  //   gradient: "from-[#e3f0f8] to-[#ddeaf2]",
  // },
  // {
  //   id: "housing",
  //   name: "Housing Project",
  //   bestFor: "Apartments and premium housing developments",
  //   category: "Housing Project",
  //   features: [
  //     "Unit type showcase",
  //     "High-conversion booking forms",
  //     "Project gallery and amenities",
  //   ],
  //   gradient: "from-[#f3ede3] to-[#c6e8d2]",
  // },
  // {
  //   id: "rental",
  //   name: "Rental Business",
  //   bestFor: "Rental property managers and landlords",
  //   category: "Rental",
  //   features: [
  //     "Rental listing filters",
  //     "Availability status display",
  //     "Tenant inquiry forms",
  //   ],
  //   gradient: "from-[#e9f6fd] to-[#faf7f0]",
  // },
  // {
  //   id: "premium-developer",
  //   name: "Premium Developer Landing Page",
  //   bestFor: "Large developers with flagship projects",
  //   category: "Land Developer",
  //   features: [
  //     "Premium hero with video support",
  //     "Master plan visualization",
  //     "Priority lead routing",
  //   ],
  //   gradient: "from-[#ddeaf2] to-[#496b5a]/20",
  // },
] as const;

export const FEATURES = [
  {
    title: "Professional Real-Estate Website",
    description:
      "Launch a polished, mobile-friendly website that builds trust with buyers.",
    icon: "website",
  },
  {
    title: "Ready-Made Website Templates",
    description:
      "Choose from templates designed specifically for the Nepali real-estate market.",
    icon: "template",
  },
  {
    title: "Custom Website Design",
    description:
      "Share your brand colors and reference layout for a fully custom look.",
    icon: "design",
  },
  {
    title: "Property Listing Management",
    description:
      "Add, update, and organize all your property listings in one place.",
    icon: "listing",
  },
  {
    title: "Buyer Lead CRM",
    description:
      "Track every buyer inquiry from first contact to final deal.",
    icon: "crm",
  },
  {
    title: "Site Visit Booking",
    description:
      "Manage site visit requests and schedule property viewings easily.",
    icon: "visit",
  },
  {
    title: "Follow-up Reminders",
    description:
      "Never miss a follow-up with automated reminders for your team.",
    icon: "followup",
  },
  {
    title: "Agent Dashboard",
    description:
      "Give each agent a clear view of their leads, tasks, and performance.",
    icon: "agent",
  },
  {
    title: "WhatsApp / Viber / Call Actions",
    description:
      "Let buyers reach you instantly through their preferred channel.",
    icon: "chat",
  },
  {
    title: "Social Media Control",
    description:
      "Organize property content and captions for all your social channels.",
    icon: "social",
  },
  {
    title: "Property Video Management",
    description:
      "Manage property videos and reels alongside your listings.",
    icon: "video",
  },
  {
    title: "Lead Source Tracking",
    description:
      "Know exactly where each lead came from  Facebook, WhatsApp, or website.",
    icon: "tracking",
  },
  {
    title: "Dashboard Analytics",
    description:
      "See lead trends, conversion rates, and team performance at a glance.",
    icon: "analytics",
  },
  {
    title: "Nepal-Specific Real Estate Support",
    description:
      "Built for how agencies, brokers, and developers work in Nepal.",
    icon: "nepal",
  },
] as const;

export const SETUP_STEPS = [
  "Choose your real-estate website template",
  "Share your agency details and contact information",
  "Add or send your property listings",
  "Activate lead forms, WhatsApp, Viber, and call buttons",
  "Start receiving buyer inquiries in your dashboard",
] as const;

export const PLATFORMS = [
  "Facebook",
  "Instagram",
  "TikTok",
  "WhatsApp",
  "Viber",
  "Website",
] as const;

export const AUDIENCES = [
  {
    title: "Real-Estate Agencies",
    description:
      "Manage multiple agents, listings, and leads from one central system.",
    icon: "agency",
  },
  {
    title: "Brokers",
    description:
      "Build your personal brand and never lose a buyer inquiry again.",
    icon: "broker",
  },
  {
    title: "Land Developers",
    description:
      "Showcase plots, manage site visits, and track buyer interest by phase.",
    icon: "land",
  },
  {
    title: "Housing & Apartment Developers",
    description:
      "Promote units, capture bookings, and follow up on every prospect.",
    icon: "housing",
  },
  {
    title: "Rental Businesses",
    description:
      "List rentals, capture tenant inquiries, and manage availability.",
    icon: "rental",
  },
] as const;

export const PRICING_PLANS = [
  {
    id: "basic",
    name: "Basic",
    setupCharge: "NPR 25,000",
    monthlyCharge: "NPR 3,000/month",
    popular: false,
    bestFor:
      "Small agencies or individual brokers starting their digital presence.",
    includes: [
      "Ready-made real-estate website template",
      "Website setup in around 30 minutes after required details are provided",
      "Professional real-estate website",
      "Basic property listing management",
      "Inquiry form",
      "WhatsApp/Viber/call buttons",
      "Basic lead capture",
      "Mobile-friendly design",
      "Basic dashboard access",
    ],
    cta: "Start Basic",
  },
  {
    id: "plus",
    name: "Plus",
    setupCharge: "NPR 35,000",
    monthlyCharge: "NPR 5,000/month",
    popular: true,
    bestFor:
      "Growing agencies that need custom website style, CRM, social media support, and better lead management.",
    includes: [
      "Everything in Basic",
      "Custom website design option",
      "Agency can share its own design idea, colors, reference website, or layout",
      "Nexora can create a website design based on the agency brand",
      "Lead CRM dashboard",
      "Lead status tracking",
      "Follow-up reminders",
      "Site visit request management",
      "Agent dashboard",
      "Social media handling support",
      "Better analytics",
      "Listing promotion support",
    ],
    cta: "Choose Plus",
  },
  {
    id: "pro",
    name: "Pro",
    setupCharge: "NPR 40,000",
    monthlyCharge: "NPR 8,000/month",
    popular: false,
    bestFor:
      "Serious agencies and developers that want full promotion, CRM, custom branding, and video-based marketing.",
    includes: [
      "Everything in Plus",
      "Professional property video creation support",
      "Video/reel creation from a reputed real-estate content creator or media partner",
      "Advanced property promotion support",
      "Priority listing/content support",
      "Advanced dashboard support",
      "Campaign support for selected listings",
      "Priority support",
    ],
    cta: "Go Pro",
  },
] as const;

export const COMPARISON_ROWS = [
  { feature: "Ready-made website template", basic: true, plus: true, pro: true },
  { feature: "Custom website design", basic: false, plus: true, pro: true },
  { feature: "Property listings", basic: true, plus: true, pro: true },
  { feature: "Inquiry forms", basic: true, plus: true, pro: true },
  { feature: "Lead CRM", basic: false, plus: true, pro: true },
  { feature: "Follow-up reminders", basic: false, plus: true, pro: true },
  { feature: "Site visit management", basic: false, plus: true, pro: true },
  { feature: "Agent dashboard", basic: false, plus: true, pro: true },
  { feature: "Social media handling", basic: false, plus: true, pro: true },
  { feature: "Property video/reel support", basic: false, plus: false, pro: true },
  { feature: "Analytics", basic: "Basic", plus: "Better", pro: "Advanced" },
  { feature: "Priority support", basic: false, plus: false, pro: true },
] as const;

export const FAQ_ITEMS = [
  {
    question: "Is Nexora RealtyOS just a website?",
    answer:
      "No. It includes website, listing management, lead CRM, site visit tracking, follow-up reminders, social media/video management, and analytics.",
  },
  {
    question: "Can we choose our own website design?",
    answer:
      "Yes. Basic includes ready-made templates. Plus and Pro include custom website design options.",
  },
  {
    question: "How fast can we get started?",
    answer:
      "With a ready-made template, setup can be completed quickly after required agency details and listings are provided.",
  },
  {
    question: "Can buyers contact us through WhatsApp or Viber?",
    answer:
      "Yes. Buyers can contact through call, WhatsApp, Viber, and inquiry forms.",
  },
  {
    question: "Do you help with social media and videos?",
    answer:
      "Yes. Plus includes social media handling support. Pro includes professional property video/reel creation support.",
  },
  {
    question: "Is there custom pricing?",
    answer:
      "Yes. Custom pricing is available for larger agencies, land developers, and housing projects.",
  },
] as const;

export const TEMPLATE_FILTERS = [
  "All",
  "Agency",
  "Broker",
  "Land Developer",
  "Housing Project",
  "Rental",
] as const;

export const DEMO_PLANS = [
  "Basic  Individual Agents",
  "Plus  Growing Agencies",
  "Pro  Full Growth System",
  "Custom  Developers / Housing Projects",
] as const;

export const CONTACT_METHODS = ["Phone", "WhatsApp", "Viber", "Email"] as const;
