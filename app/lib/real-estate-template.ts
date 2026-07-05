export type PropertyStatus = "For Sale" | "For Rent" | "Sold";

export interface Property {
  id: string;
  title: string;
  location: string;
  price: string;
  status: PropertyStatus;
  type: string;
  beds: number;
  baths: number;
  area: string;
  image: string;
  featured?: boolean;
}

export interface Agent {
  id: string;
  name: string;
  role: string;
  location: string;
  phone: string;
  email: string;
  image: string;
  dealsClosed: number;
  rating: number;
  yearsExperience: number;
  languages: string[];
  specialties: string[];
  biography: string;
  socialLinks: {
    linkedin: string;
    instagram: string;
    facebook: string;
  };
  currentListingIds: string[];
  reviews: AgentReview[];
}

export interface AgentReview {
  id: string;
  author: string;
  location: string;
  rating: number;
  comment: string;
}

export interface Testimonial {
  id: string;
  quote: string;
  name: string;
  role: string;
  location: string;
  rating: number;
}

export interface Stat {
  id: string;
  label: string;
  value: string;
  helper: string;
}

export interface PropertyCategory {
  id: string;
  name: string;
  count: string;
  image: string;
}

export interface WhyChoosePoint {
  id: string;
  title: string;
  description: string;
}

export interface ListingProperty extends Property {
  address: string;
  city: string;
  priceValue: number;
  listedAt: string;
}

export const templateProperties: Property[] = [
  {
    id: "p-001",
    title: "Glasshouse Residence",
    location: "Lazimpat, Kathmandu",
    price: "NPR 8.4 Cr",
    status: "For Sale",
    type: "Villa",
    beds: 5,
    baths: 6,
    area: "6,200 sq.ft",
    image:
      "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1200&q=80",
    featured: true,
  },
  {
    id: "p-002",
    title: "Skyline Penthouse",
    location: "Jhamsikhel, Lalitpur",
    price: "NPR 3.2 L/mo",
    status: "For Rent",
    type: "Penthouse",
    beds: 4,
    baths: 4,
    area: "3,450 sq.ft",
    image:
      "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&w=1200&q=80",
  },
  {
    id: "p-003",
    title: "Courtyard Family Estate",
    location: "Budhanilkantha, Kathmandu",
    price: "NPR 6.1 Cr",
    status: "Sold",
    type: "House",
    beds: 6,
    baths: 5,
    area: "8 anna",
    image:
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80",
  },
];

export const listingProperties: ListingProperty[] = [
  {
    id: "lp-001",
    title: "Glasshouse Residence",
    location: "Lazimpat, Kathmandu",
    address: "Lazimpat Road, Kathmandu",
    city: "Kathmandu",
    price: "NPR 8.4 Cr",
    priceValue: 84000000,
    status: "For Sale",
    type: "Villa",
    beds: 5,
    baths: 6,
    area: "6,200 sq.ft",
    listedAt: "2026-06-20",
    image:
      "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1200&q=80",
    featured: true,
  },
  {
    id: "lp-002",
    title: "Skyline Penthouse",
    location: "Jhamsikhel, Lalitpur",
    address: "Jhamsikhel Heights, Lalitpur",
    city: "Lalitpur",
    price: "NPR 3.2 L/mo",
    priceValue: 320000,
    status: "For Rent",
    type: "Apartment",
    beds: 4,
    baths: 4,
    area: "3,450 sq.ft",
    listedAt: "2026-06-18",
    image:
      "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&w=1200&q=80",
  },
  {
    id: "lp-003",
    title: "Courtyard Family Estate",
    location: "Budhanilkantha, Kathmandu",
    address: "Golfutar Marg, Budhanilkantha",
    city: "Kathmandu",
    price: "NPR 6.1 Cr",
    priceValue: 61000000,
    status: "For Sale",
    type: "House",
    beds: 6,
    baths: 5,
    area: "8 anna",
    listedAt: "2026-06-15",
    image:
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80",
  },
  {
    id: "lp-004",
    title: "Heritage Lane Apartment",
    location: "Bakhundole, Lalitpur",
    address: "Bakhundole Main Road, Lalitpur",
    city: "Lalitpur",
    price: "NPR 2.9 Cr",
    priceValue: 29000000,
    status: "For Sale",
    type: "Apartment",
    beds: 3,
    baths: 3,
    area: "1,850 sq.ft",
    listedAt: "2026-06-11",
    image:
      "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1200&q=80",
  },
  {
    id: "lp-005",
    title: "Embassy District Office",
    location: "Maharajgunj, Kathmandu",
    address: "Maharajgunj Ring Road, Kathmandu",
    city: "Kathmandu",
    price: "NPR 5.5 L/mo",
    priceValue: 550000,
    status: "For Rent",
    type: "Commercial",
    beds: 0,
    baths: 4,
    area: "5,100 sq.ft",
    listedAt: "2026-06-09",
    image:
      "https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=1200&q=80",
  },
  {
    id: "lp-006",
    title: "Riverside Villa",
    location: "Bhaisepati, Lalitpur",
    address: "Bhaisepati Residential Area, Lalitpur",
    city: "Lalitpur",
    price: "NPR 7.6 Cr",
    priceValue: 76000000,
    status: "For Sale",
    type: "Villa",
    beds: 5,
    baths: 5,
    area: "5,700 sq.ft",
    listedAt: "2026-06-07",
    image:
      "https://images.unsplash.com/photo-1600607688969-a5bfcd646154?auto=format&fit=crop&w=1200&q=80",
  },
  {
    id: "lp-007",
    title: "Premium Plot Parcel",
    location: "Dhapasi, Kathmandu",
    address: "Dhapasi Planning, Kathmandu",
    city: "Kathmandu",
    price: "NPR 4.8 Cr",
    priceValue: 48000000,
    status: "For Sale",
    type: "Land",
    beds: 0,
    baths: 0,
    area: "10 anna",
    listedAt: "2026-06-05",
    image:
      "https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=1200&q=80",
  },
  {
    id: "lp-008",
    title: "Garden Duplex",
    location: "Sanepa, Lalitpur",
    address: "Sanepa Heights, Lalitpur",
    city: "Lalitpur",
    price: "NPR 2.4 L/mo",
    priceValue: 240000,
    status: "For Rent",
    type: "House",
    beds: 4,
    baths: 4,
    area: "3,000 sq.ft",
    listedAt: "2026-06-02",
    image:
      "https://images.unsplash.com/photo-1600566752355-35792bedcfea?auto=format&fit=crop&w=1200&q=80",
  },
  {
    id: "lp-009",
    title: "Boutique Retail Front",
    location: "Durbar Marg, Kathmandu",
    address: "Durbar Marg, Kathmandu",
    city: "Kathmandu",
    price: "NPR 3.8 L/mo",
    priceValue: 380000,
    status: "For Rent",
    type: "Commercial",
    beds: 0,
    baths: 2,
    area: "2,250 sq.ft",
    listedAt: "2026-05-30",
    image:
      "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1200&q=80",
  },
  {
    id: "lp-010",
    title: "Quiet Ridge Apartment",
    location: "Hattiban, Lalitpur",
    address: "Hattiban Residential Lane, Lalitpur",
    city: "Lalitpur",
    price: "NPR 1.85 Cr",
    priceValue: 18500000,
    status: "For Sale",
    type: "Apartment",
    beds: 2,
    baths: 2,
    area: "1,240 sq.ft",
    listedAt: "2026-05-27",
    image:
      "https://images.unsplash.com/photo-1494526585095-c41746248156?auto=format&fit=crop&w=1200&q=80",
  },
  {
    id: "lp-011",
    title: "Hill View Villa",
    location: "Nagarkot, Bhaktapur",
    address: "Nagarkot Resort Road, Bhaktapur",
    city: "Bhaktapur",
    price: "NPR 5.9 Cr",
    priceValue: 59000000,
    status: "For Sale",
    type: "Villa",
    beds: 4,
    baths: 5,
    area: "12 ropani",
    listedAt: "2026-05-22",
    image:
      "https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?auto=format&fit=crop&w=1200&q=80",
  },
  {
    id: "lp-012",
    title: "Central Business Floor",
    location: "New Baneshwor, Kathmandu",
    address: "New Baneshwor, Kathmandu",
    city: "Kathmandu",
    price: "NPR 6.8 Cr",
    priceValue: 68000000,
    status: "For Sale",
    type: "Commercial",
    beds: 0,
    baths: 6,
    area: "7,400 sq.ft",
    listedAt: "2026-05-19",
    image:
      "https://images.unsplash.com/photo-1497366811353-6870744d04b2?auto=format&fit=crop&w=1200&q=80",
  },
];

export const listingLocations = ["All", "Kathmandu", "Lalitpur", "Bhaktapur"] as const;
export const listingPropertyTypes = [
  "All",
  "Apartment",
  "Villa",
  "House",
  "Commercial",
  "Land",
] as const;

export const templateAgents: Agent[] = [
  {
    id: "a-001",
    name: "Aarav Shrestha",
    role: "Principal Broker",
    location: "Kathmandu Valley",
    phone: "+977 9800000001",
    email: "aarav@example.com",
    image:
      "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=800&q=80",
    dealsClosed: 124,
    rating: 4.9,
    yearsExperience: 14,
    languages: ["English", "Nepali", "Hindi"],
    specialties: ["Luxury Villas", "Seller Advisory", "Negotiation"],
    biography:
      "Aarav leads Aurelia Estates with a calm, research-led approach to high-value residential transactions. He is known for precise pricing strategy, discreet seller representation, and steady negotiation support for families upgrading into landmark homes.",
    socialLinks: {
      linkedin: "https://linkedin.com",
      instagram: "https://instagram.com",
      facebook: "https://facebook.com",
    },
    currentListingIds: ["lp-001", "lp-003", "lp-006"],
    reviews: [
      {
        id: "ar-001",
        author: "Prakash Rana",
        location: "Baluwatar",
        rating: 5,
        comment:
          "Aarav gave us realistic pricing guidance and handled every buyer conversation with discipline.",
      },
      {
        id: "ar-002",
        author: "Maya Gurung",
        location: "Bhaisepati",
        rating: 5,
        comment:
          "The shortlist was focused, private, and exactly aligned with our family requirements.",
      },
    ],
  },
  {
    id: "a-002",
    name: "Mira Karki",
    role: "Luxury Property Advisor",
    location: "Lalitpur",
    phone: "+977 9800000002",
    email: "mira@example.com",
    image:
      "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=800&q=80",
    dealsClosed: 88,
    rating: 4.8,
    yearsExperience: 9,
    languages: ["English", "Nepali"],
    specialties: ["Apartments", "Relocation", "Private Viewings"],
    biography:
      "Mira specializes in refined apartments, rental residences, and relocation searches across Lalitpur. Her clients value her clear communication, viewing preparation, and ability to compare lifestyle details beyond the brochure.",
    socialLinks: {
      linkedin: "https://linkedin.com",
      instagram: "https://instagram.com",
      facebook: "https://facebook.com",
    },
    currentListingIds: ["lp-002", "lp-004", "lp-008", "lp-010"],
    reviews: [
      {
        id: "mr-001",
        author: "Nisha Thapa",
        location: "Sanepa",
        rating: 5,
        comment:
          "Mira made our rental search feel organized and protected our time with only serious options.",
      },
      {
        id: "mr-002",
        author: "Allen Brooks",
        location: "Jhamsikhel",
        rating: 4.8,
        comment:
          "She explained neighborhoods, commute patterns, and lease terms without rushing the process.",
      },
    ],
  },
  {
    id: "a-003",
    name: "Kabir Basnet",
    role: "Commercial Property Lead",
    location: "Kathmandu",
    phone: "+977 9800000003",
    email: "kabir@example.com",
    image:
      "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=800&q=80",
    dealsClosed: 76,
    rating: 4.7,
    yearsExperience: 11,
    languages: ["English", "Nepali", "Hindi"],
    specialties: ["Commercial", "Investment", "Land Parcels"],
    biography:
      "Kabir advises investors, developers, and business owners on commercial floors, retail frontage, and land acquisitions. He focuses on yield, access, visibility, and long-term positioning before recommending a site.",
    socialLinks: {
      linkedin: "https://linkedin.com",
      instagram: "https://instagram.com",
      facebook: "https://facebook.com",
    },
    currentListingIds: ["lp-005", "lp-007", "lp-009", "lp-012"],
    reviews: [
      {
        id: "kr-001",
        author: "Sanjay Agrawal",
        location: "New Baneshwor",
        rating: 4.7,
        comment:
          "Kabir's analysis helped us compare traffic, fit-out cost, and long-term resale prospects.",
      },
      {
        id: "kr-002",
        author: "Rinchen Lama",
        location: "Dhapasi",
        rating: 4.8,
        comment:
          "He was direct, responsive, and careful with ownership and documentation checks.",
      },
    ],
  },
  {
    id: "a-004",
    name: "Sahana Pradhan",
    role: "Buyer Representation Lead",
    location: "Kathmandu",
    phone: "+977 9800000004",
    email: "sahana@example.com",
    image:
      "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=800&q=80",
    dealsClosed: 67,
    rating: 4.9,
    yearsExperience: 8,
    languages: ["English", "Nepali", "Newari"],
    specialties: ["Buyer Advisory", "Family Homes", "Schools"],
    biography:
      "Sahana guides buyers through school catchments, commute patterns, build quality, and negotiation timing. She is especially strong with families balancing lifestyle goals and long-term resale confidence.",
    socialLinks: {
      linkedin: "https://linkedin.com",
      instagram: "https://instagram.com",
      facebook: "https://facebook.com",
    },
    currentListingIds: ["lp-001", "lp-010", "lp-011"],
    reviews: [
      {
        id: "sr-001",
        author: "Anup Joshi",
        location: "Hattiban",
        rating: 5,
        comment:
          "Sahana spotted practical details we would have missed and made the offer stage simple.",
      },
      {
        id: "sr-002",
        author: "Ritu Maharjan",
        location: "Lazimpat",
        rating: 4.9,
        comment:
          "She understood our priorities quickly and never pushed us toward the wrong property.",
      },
    ],
  },
  {
    id: "a-005",
    name: "Dev Gurung",
    role: "Land and Villa Specialist",
    location: "Bhaktapur",
    phone: "+977 9800000005",
    email: "dev@example.com",
    image:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=800&q=80",
    dealsClosed: 58,
    rating: 4.6,
    yearsExperience: 10,
    languages: ["English", "Nepali"],
    specialties: ["Land", "Villas", "Second Homes"],
    biography:
      "Dev works across scenic villa corridors, land parcels, and second-home opportunities. His process emphasizes access roads, services, surrounding development, and practical due diligence before clients commit.",
    socialLinks: {
      linkedin: "https://linkedin.com",
      instagram: "https://instagram.com",
      facebook: "https://facebook.com",
    },
    currentListingIds: ["lp-006", "lp-007", "lp-011"],
    reviews: [
      {
        id: "dr-001",
        author: "Tashi Sherpa",
        location: "Nagarkot",
        rating: 4.7,
        comment:
          "Dev knew the hillside market well and helped us understand access, utilities, and pricing.",
      },
      {
        id: "dr-002",
        author: "Kiran Pandey",
        location: "Dhapasi",
        rating: 4.6,
        comment:
          "He brought patience and useful context to a land purchase that needed careful checks.",
      },
    ],
  },
  {
    id: "a-006",
    name: "Lina Rai",
    role: "Client Experience Manager",
    location: "Lalitpur",
    phone: "+977 9800000006",
    email: "lina@example.com",
    image:
      "https://images.unsplash.com/photo-1531123897727-8f129e1688ce?auto=format&fit=crop&w=800&q=80",
    dealsClosed: 49,
    rating: 4.8,
    yearsExperience: 7,
    languages: ["English", "Nepali"],
    specialties: ["Concierge Tours", "Rentals", "Client Care"],
    biography:
      "Lina coordinates private tours, inquiry follow-up, and post-shortlist support for busy clients. She keeps communication warm, structured, and practical from the first brief to the final handover.",
    socialLinks: {
      linkedin: "https://linkedin.com",
      instagram: "https://instagram.com",
      facebook: "https://facebook.com",
    },
    currentListingIds: ["lp-002", "lp-004", "lp-008"],
    reviews: [
      {
        id: "lr-001",
        author: "Elena Park",
        location: "Bakhundole",
        rating: 4.8,
        comment:
          "Lina kept every viewing on schedule and followed up with clear next steps after each visit.",
      },
      {
        id: "lr-002",
        author: "Manish KC",
        location: "Sanepa",
        rating: 4.9,
        comment:
          "Her communication was excellent and the whole process felt polished.",
      },
    ],
  },
];

export const agentLocations = ["All", "Kathmandu", "Lalitpur", "Bhaktapur"] as const;
export const agentSpecialties = [
  "All",
  "Luxury Villas",
  "Apartments",
  "Commercial",
  "Land",
  "Buyer Advisory",
  "Rentals",
] as const;

export function slugifyAgentName(name: string): string {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

export function getAgentSlug(agent: Pick<Agent, "name">): string {
  return slugifyAgentName(agent.name);
}

export function getAgentProfilePath(agent: Pick<Agent, "name">): string {
  return `/template-preview/luxury-agency/agents/${getAgentSlug(agent)}`;
}

export function getAgentBySlug(slug: string): Agent | undefined {
  return templateAgents.find((agent) => getAgentSlug(agent) === slug);
}

export function getAgentListings(agent: Pick<Agent, "currentListingIds">) {
  return listingProperties.filter((property) =>
    agent.currentListingIds.includes(property.id)
  );
}

export const templateTestimonials: Testimonial[] = [
  {
    id: "t-001",
    quote:
      "The team understood our brief quickly, shortlisted serious options, and handled every viewing with complete professionalism.",
    name: "Suman Adhikari",
    role: "Home Buyer",
    location: "Bhaisepati",
    rating: 5,
  },
  {
    id: "t-002",
    quote:
      "Our listing received better qualified inquiries and sold faster than expected because the presentation felt premium from day one.",
    name: "Nisha Rana",
    role: "Property Seller",
    location: "Baluwatar",
    rating: 5,
  },
];

export const templateStats: Stat[] = [
  {
    id: "s-001",
    label: "Properties Sold",
    value: "680+",
    helper: "Residential, commercial, and land transactions closed.",
  },
  {
    id: "s-002",
    label: "Active Listings",
    value: "250+",
    helper: "Verified homes, villas, apartments, and land parcels.",
  },
  {
    id: "s-003",
    label: "Happy Clients",
    value: "1,200+",
    helper: "Buyers, sellers, investors, and developer partners.",
  },
  {
    id: "s-004",
    label: "Years in Business",
    value: "14",
    helper: "Local market experience with senior property advisors.",
  },
];

export const propertyCategories: PropertyCategory[] = [
  {
    id: "apartment",
    name: "Apartment",
    count: "86 Listings",
    image:
      "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=900&q=80",
  },
  {
    id: "villa",
    name: "Villa",
    count: "42 Listings",
    image:
      "https://images.unsplash.com/photo-1600607688969-a5bfcd646154?auto=format&fit=crop&w=900&q=80",
  },
  {
    id: "commercial",
    name: "Commercial",
    count: "31 Listings",
    image:
      "https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=900&q=80",
  },
  {
    id: "land",
    name: "Land",
    count: "58 Listings",
    image:
      "https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=900&q=80",
  },
];

export function slugifyPropertyTitle(title: string): string {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

export function getPropertySlug(property: Pick<Property, "id" | "title">): string {
  return slugifyPropertyTitle(property.title);
}

export function getPropertyDetailPath(property: Pick<Property, "id" | "title">): string {
  return `/template-preview/luxury-agency/properties/${getPropertySlug(property)}`;
}

export {
  buildPropertyDetail,
  type FloorPlan,
  type KeyFeature,
  type PropertyDetail,
  type PropertyDetailExtras,
} from "./property-detail-data";

export const whyChoosePoints: WhyChoosePoint[] = [
  {
    id: "advisory",
    title: "Private Advisory",
    description:
      "Senior consultants guide each buyer and seller with market context, realistic pricing, and clear next steps.",
  },
  {
    id: "verified",
    title: "Verified Inventory",
    description:
      "Listings are reviewed for location, ownership details, pricing accuracy, and presentation quality.",
  },
  {
    id: "negotiation",
    title: "Confident Negotiation",
    description:
      "Our team supports offers, site visits, legal coordination, and deal closure with disciplined communication.",
  },
];
