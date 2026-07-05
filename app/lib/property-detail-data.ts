import type { ListingProperty } from "./real-estate-template";

export interface FloorPlan {
  id: string;
  label: string;
  area: string;
  image: string;
}

export interface KeyFeature {
  label: string;
  value: string;
}

export interface PropertyDetailExtras {
  gallery: string[];
  summary: string;
  description: string;
  keyFeatures: KeyFeature[];
  amenities: string[];
  floorPlans: FloorPlan[];
  agentId: string;
  yearBuilt?: number;
  parkingSpaces?: number;
  pricePerUnit?: string;
  lotSize?: string;
  furnishing?: string;
}

export interface PropertyDetail extends ListingProperty, PropertyDetailExtras {
  slug: string;
}

const GALLERY_POOL = {
  villa: [
    "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1400&q=80",
    "https://images.unsplash.com/photo-1600607687644-c7171b42498b?auto=format&fit=crop&w=1400&q=80",
    "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&w=1400&q=80",
    "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1400&q=80",
    "https://images.unsplash.com/photo-1600607688969-a5bfcd646154?auto=format&fit=crop&w=1400&q=80",
  ],
  apartment: [
    "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1400&q=80",
    "https://images.unsplash.com/photo-1494526585095-c41746248156?auto=format&fit=crop&w=1400&q=80",
    "https://images.unsplash.com/photo-1600566752355-35792bedcfea?auto=format&fit=crop&w=1400&q=80",
    "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=1400&q=80",
  ],
  house: [
    "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1400&q=80",
    "https://images.unsplash.com/photo-1600566752355-35792bedcfea?auto=format&fit=crop&w=1400&q=80",
    "https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?auto=format&fit=crop&w=1400&q=80",
    "https://images.unsplash.com/photo-1600607687644-c7171b42498b?auto=format&fit=crop&w=1400&q=80",
  ],
  commercial: [
    "https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=1400&q=80",
    "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1400&q=80",
    "https://images.unsplash.com/photo-1497366811353-6870744d04b2?auto=format&fit=crop&w=1400&q=80",
    "https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=1400&q=80",
  ],
  land: [
    "https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=1400&q=80",
    "https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=1400&q=80",
    "https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?auto=format&fit=crop&w=1400&q=80",
  ],
};

function galleryForType(type: string, primaryImage: string): string[] {
  const pool =
    type === "Villa"
      ? GALLERY_POOL.villa
      : type === "Apartment"
        ? GALLERY_POOL.apartment
        : type === "House"
          ? GALLERY_POOL.house
          : type === "Commercial"
            ? GALLERY_POOL.commercial
            : GALLERY_POOL.land;

  const unique = [primaryImage, ...pool.filter((img) => img !== primaryImage)];
  return unique.slice(0, 5);
}

export const propertyDetailExtras: Record<string, PropertyDetailExtras> = {
  "lp-001": {
    gallery: [],
    summary:
      "A glass-forward villa with panoramic valley views, private terraces, and bespoke interior finishes in Lazimpat.",
    description:
      "Glasshouse Residence is a statement property designed for buyers who value light, privacy, and architectural clarity. Floor-to-ceiling glazing frames the Kathmandu skyline while mature landscaping wraps the home in quiet greenery.\n\nThe main level opens to a double-height living room with custom millwork, a chef's kitchen with premium appliances, and a formal dining space suited to private entertaining. The upper floor hosts a primary suite with a walk-in wardrobe, spa-inspired bath, and a private balcony.\n\nA dedicated home office, guest wing, and temperature-controlled wine storage complete the layout. The rooftop terrace offers an outdoor lounge with unobstructed sunset views  ideal for evening gatherings or quiet reflection.",
    keyFeatures: [
      { label: "Property Type", value: "Luxury Villa" },
      { label: "Year Built", value: "2022" },
      { label: "Total Area", value: "6,200 sq.ft" },
      { label: "Lot Size", value: "12 anna" },
      { label: "Parking", value: "3 Covered Spaces" },
      { label: "Furnishing", value: "Semi-Furnished" },
      { label: "Facing", value: "North-East" },
      { label: "Price per sq.ft", value: "NPR 13,548" },
    ],
    amenities: [
      "Private Elevator",
      "Infinity Pool",
      "Home Automation",
      "Central AC",
      "Backup Generator",
      "24/7 Security",
      "Landscaped Garden",
      "Rooftop Terrace",
      "Wine Cellar",
      "Smart Lighting",
      "Water Filtration",
      "EV Charging Ready",
    ],
    floorPlans: [
      {
        id: "fp-001-a",
        label: "Ground Floor",
        area: "3,100 sq.ft",
        image:
          "https://images.unsplash.com/photo-1600607687644-c7171b42498b?auto=format&fit=crop&w=900&q=80",
      },
      {
        id: "fp-001-b",
        label: "Upper Floor",
        area: "2,400 sq.ft",
        image:
          "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=900&q=80",
      },
      {
        id: "fp-001-c",
        label: "Rooftop & Terrace",
        area: "700 sq.ft",
        image:
          "https://images.unsplash.com/photo-1600607688969-a5bfcd646154?auto=format&fit=crop&w=900&q=80",
      },
    ],
    agentId: "a-001",
    yearBuilt: 2022,
    parkingSpaces: 3,
    pricePerUnit: "NPR 13,548 / sq.ft",
    lotSize: "12 anna",
    furnishing: "Semi-Furnished",
  },
  "lp-002": {
    gallery: [],
    summary:
      "A refined penthouse rental with skyline views, private elevator access, and curated interiors in Jhamsikhel.",
    description:
      "Skyline Penthouse occupies the top two floors of a boutique residential tower, offering uninterrupted views across Lalitpur and the surrounding hills. The layout is designed for executive living with generous ceiling heights and a seamless indoor-outdoor flow.\n\nThe open-plan living area connects to a wraparound terrace ideal for morning coffee or evening entertaining. A premium kitchen with stone countertops and integrated appliances anchors the space, while the primary suite features a spa bath and custom wardrobe system.\n\nBuilding amenities include concierge service, secure parking, and a residents' lounge. This is a turnkey rental for professionals seeking privacy, convenience, and a polished address.",
    keyFeatures: [
      { label: "Property Type", value: "Penthouse Apartment" },
      { label: "Year Built", value: "2020" },
      { label: "Total Area", value: "3,450 sq.ft" },
      { label: "Floor Level", value: "12th & 13th" },
      { label: "Parking", value: "2 Reserved Spaces" },
      { label: "Furnishing", value: "Fully Furnished" },
      { label: "Lease Term", value: "12 Months Minimum" },
      { label: "Monthly Rate", value: "NPR 3.2 L/mo" },
    ],
    amenities: [
      "Private Elevator",
      "Wraparound Terrace",
      "Concierge Desk",
      "Fitness Center",
      "Central AC",
      "High-Speed Internet",
      "24/7 Security",
      "Reserved Parking",
      "Residents' Lounge",
      "Smart Home Controls",
    ],
    floorPlans: [
      {
        id: "fp-002-a",
        label: "Main Level",
        area: "2,100 sq.ft",
        image:
          "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&w=900&q=80",
      },
      {
        id: "fp-002-b",
        label: "Penthouse Level",
        area: "1,350 sq.ft",
        image:
          "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=900&q=80",
      },
    ],
    agentId: "a-002",
    yearBuilt: 2020,
    parkingSpaces: 2,
    furnishing: "Fully Furnished",
  },
  "lp-003": {
    gallery: [],
    summary:
      "A spacious family estate with courtyard gardens, multiple living zones, and quiet Budhanilkantha surroundings.",
    description:
      "Courtyard Family Estate is a thoughtfully planned residence built around a central courtyard that brings natural light and ventilation to every room. The property suits multi-generational living with clearly defined private and shared spaces.\n\nGround-floor living includes a formal lounge, family room, and a large kitchen with a breakfast nook opening to the garden. Upstairs, five bedrooms include two ensuite suites and a flexible study that can serve as a sixth bedroom.\n\nMature trees, a lawn area, and covered parking for four vehicles complete the offering. The neighborhood is known for its calm streets and proximity to international schools.",
    keyFeatures: [
      { label: "Property Type", value: "Family House" },
      { label: "Year Built", value: "2018" },
      { label: "Total Area", value: "8 anna" },
      { label: "Built-up Area", value: "5,800 sq.ft" },
      { label: "Parking", value: "4 Covered Spaces" },
      { label: "Furnishing", value: "Unfurnished" },
      { label: "Garden", value: "Central Courtyard" },
      { label: "Price per anna", value: "NPR 76.25 L" },
    ],
    amenities: [
      "Central Courtyard",
      "Landscaped Garden",
      "Servant Quarter",
      "Backup Generator",
      "Water Storage",
      "CCTV Security",
      "Modular Kitchen",
      "Study Room",
      "Prayer Room",
      "Covered Parking",
    ],
    floorPlans: [
      {
        id: "fp-003-a",
        label: "Ground Floor",
        area: "3,200 sq.ft",
        image:
          "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=900&q=80",
      },
      {
        id: "fp-003-b",
        label: "First Floor",
        area: "2,600 sq.ft",
        image:
          "https://images.unsplash.com/photo-1600566752355-35792bedcfea?auto=format&fit=crop&w=900&q=80",
      },
    ],
    agentId: "a-001",
    yearBuilt: 2018,
    parkingSpaces: 4,
    lotSize: "8 anna",
    furnishing: "Unfurnished",
  },
  "lp-004": {
    gallery: [],
    summary:
      "A heritage-inspired apartment with warm finishes, city views, and walkable access to Bakhundole dining.",
    description:
      "Heritage Lane Apartment blends contemporary comfort with subtle traditional detailing. Located on a quiet lane off Bakhundole's main road, the home offers a calm retreat minutes from Lalitpur's best restaurants and boutiques.\n\nThe layout features an open living-dining area, a compact but well-equipped kitchen, and three bedrooms including a primary suite with ensuite bath. Large windows capture southern light throughout the day.\n\nThe building includes elevator access, dedicated parking, and a small rooftop common area. Ideal for young families or professionals seeking a move-in-ready purchase.",
    keyFeatures: [
      { label: "Property Type", value: "Apartment" },
      { label: "Year Built", value: "2019" },
      { label: "Total Area", value: "1,850 sq.ft" },
      { label: "Floor Level", value: "5th Floor" },
      { label: "Parking", value: "1 Reserved Space" },
      { label: "Furnishing", value: "Semi-Furnished" },
      { label: "HOA", value: "NPR 8,500 / mo" },
      { label: "Price per sq.ft", value: "NPR 15,676" },
    ],
    amenities: [
      "Elevator Access",
      "Rooftop Terrace",
      "Reserved Parking",
      "24/7 Security",
      "Backup Water Supply",
      "Intercom System",
      "Modular Kitchen",
      "City Views",
    ],
    floorPlans: [
      {
        id: "fp-004-a",
        label: "Full Layout",
        area: "1,850 sq.ft",
        image:
          "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=900&q=80",
      },
    ],
    agentId: "a-002",
    yearBuilt: 2019,
    parkingSpaces: 1,
    furnishing: "Semi-Furnished",
  },
  "lp-005": {
    gallery: [],
    summary:
      "A premium embassy-district office floor with reception-ready layout and high-visibility frontage.",
    description:
      "Embassy District Office delivers a polished commercial environment suited to diplomatic missions, consulting firms, or regional headquarters. The floor plate is open and adaptable, with existing reception, conference, and executive office zones.\n\nFloor-to-ceiling windows provide natural light along the full perimeter. HVAC, structured cabling, and backup power are in place, reducing fit-out time for incoming tenants.\n\nLocated on Maharajgunj Ring Road with strong transport links and ample visitor parking, this is a strategic address for organizations requiring discretion and accessibility.",
    keyFeatures: [
      { label: "Property Type", value: "Commercial Office" },
      { label: "Year Built", value: "2017" },
      { label: "Total Area", value: "5,100 sq.ft" },
      { label: "Floor Level", value: "3rd Floor" },
      { label: "Parking", value: "6 Visitor Spaces" },
      { label: "Ceiling Height", value: "11 ft" },
      { label: "Lease Term", value: "24 Months Minimum" },
      { label: "Monthly Rate", value: "NPR 5.5 L/mo" },
    ],
    amenities: [
      "Reception Area",
      "Conference Rooms",
      "Server Room Ready",
      "Central AC",
      "Backup Generator",
      "Elevator Access",
      "Visitor Parking",
      "24/7 Security",
      "Fire Safety Systems",
      "High-Speed Internet Ready",
    ],
    floorPlans: [
      {
        id: "fp-005-a",
        label: "Office Layout",
        area: "5,100 sq.ft",
        image:
          "https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=900&q=80",
      },
    ],
    agentId: "a-003",
    yearBuilt: 2017,
    parkingSpaces: 6,
  },
  "lp-006": {
    gallery: [],
    summary:
      "A riverside villa with expansive lawns, outdoor entertaining areas, and refined contemporary architecture.",
    description:
      "Riverside Villa sits on a generous plot in Bhaisepati with landscaped gardens that slope gently toward a seasonal river corridor. The architecture emphasizes horizontal lines, natural stone, and warm timber accents.\n\nInside, an open great room connects to a covered patio and pool deck. Five ensuite bedrooms include a ground-floor guest suite and a primary wing with a private terrace. A separate staff wing and utility block keep service functions discreet.\n\nThis property appeals to buyers seeking space, privacy, and outdoor living without sacrificing proximity to Lalitpur's commercial centers.",
    keyFeatures: [
      { label: "Property Type", value: "Luxury Villa" },
      { label: "Year Built", value: "2021" },
      { label: "Total Area", value: "5,700 sq.ft" },
      { label: "Lot Size", value: "15 anna" },
      { label: "Parking", value: "4 Covered Spaces" },
      { label: "Furnishing", value: "Semi-Furnished" },
      { label: "Pool", value: "Heated Infinity Pool" },
      { label: "Price per sq.ft", value: "NPR 13,333" },
    ],
    amenities: [
      "Infinity Pool",
      "Outdoor Kitchen",
      "Landscaped Garden",
      "Staff Quarters",
      "Home Automation",
      "Central AC",
      "Backup Generator",
      "CCTV Security",
      "Covered Patio",
      "Water Feature",
      "EV Charging Ready",
    ],
    floorPlans: [
      {
        id: "fp-006-a",
        label: "Ground Floor",
        area: "3,400 sq.ft",
        image:
          "https://images.unsplash.com/photo-1600607688969-a5bfcd646154?auto=format&fit=crop&w=900&q=80",
      },
      {
        id: "fp-006-b",
        label: "Upper Floor",
        area: "2,300 sq.ft",
        image:
          "https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?auto=format&fit=crop&w=900&q=80",
      },
    ],
    agentId: "a-002",
    yearBuilt: 2021,
    parkingSpaces: 4,
    lotSize: "15 anna",
    furnishing: "Semi-Furnished",
  },
  "lp-007": {
    gallery: [],
    summary:
      "A premium Dhapasi land parcel with planning approval, road access, and valley-facing orientation.",
    description:
      "Premium Plot Parcel is a well-positioned land holding in Dhapasi's established residential zone. The plot offers clear title, approved building parameters, and direct road frontage suitable for a private residence or boutique development.\n\nTopography is gently sloped, allowing for creative architectural solutions and unobstructed views toward the Kathmandu valley. Utility connections including water and electricity are available at the boundary.\n\nIdeal for buyers seeking a long-term asset in a growing neighborhood with strong resale fundamentals.",
    keyFeatures: [
      { label: "Property Type", value: "Residential Land" },
      { label: "Total Area", value: "10 anna" },
      { label: "Road Access", value: "20 ft Blacktop" },
      { label: "Facing", value: "South" },
      { label: "Topography", value: "Gently Sloped" },
      { label: "Planning Status", value: "Approved" },
      { label: "Boundary", value: "Fully Walled" },
      { label: "Price per anna", value: "NPR 48 L" },
    ],
    amenities: [
      "Road Frontage",
      "Valley Views",
      "Utility Ready",
      "Clear Title",
      "Approved Planning",
      "Walled Boundary",
      "Drainage Access",
      "Quiet Neighborhood",
    ],
    floorPlans: [],
    agentId: "a-001",
    lotSize: "10 anna",
  },
  "lp-008": {
    gallery: [],
    summary:
      "A garden-facing duplex rental with dual living levels, private terrace, and Sanepa neighborhood charm.",
    description:
      "Garden Duplex offers two levels of comfortable living wrapped around a private garden terrace. The ground floor hosts an open kitchen-living area that opens directly to outdoor dining space, while the upper level holds three bedrooms and a family lounge.\n\nFinishes include hardwood flooring, designer lighting, and a fully equipped kitchen. The property is offered fully furnished with quality appliances and soft furnishings included.\n\nSanepa's walkable streets, cafes, and proximity to schools make this an excellent choice for expatriate families or executives on medium-term assignment.",
    keyFeatures: [
      { label: "Property Type", value: "Duplex House" },
      { label: "Year Built", value: "2019" },
      { label: "Total Area", value: "3,000 sq.ft" },
      { label: "Levels", value: "2 Floors" },
      { label: "Parking", value: "2 Spaces" },
      { label: "Furnishing", value: "Fully Furnished" },
      { label: "Garden", value: "Private Terrace" },
      { label: "Monthly Rate", value: "NPR 2.4 L/mo" },
    ],
    amenities: [
      "Private Garden",
      "Outdoor Dining",
      "Fully Furnished",
      "Modular Kitchen",
      "Backup Water",
      "CCTV Security",
      "High-Speed Internet",
      "Pet Friendly",
    ],
    floorPlans: [
      {
        id: "fp-008-a",
        label: "Ground Floor",
        area: "1,500 sq.ft",
        image:
          "https://images.unsplash.com/photo-1600566752355-35792bedcfea?auto=format&fit=crop&w=900&q=80",
      },
      {
        id: "fp-008-b",
        label: "Upper Floor",
        area: "1,500 sq.ft",
        image:
          "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=900&q=80",
      },
    ],
    agentId: "a-002",
    yearBuilt: 2019,
    parkingSpaces: 2,
    furnishing: "Fully Furnished",
  },
  "lp-009": {
    gallery: [],
    summary:
      "A boutique retail front on Durbar Marg with premium foot traffic and display-ready interiors.",
    description:
      "Boutique Retail Front occupies a prime ground-floor position on Durbar Marg, Kathmandu\'s most recognized luxury retail corridor. The unit features full glass frontage, high ceilings, and an open floor plan adaptable to fashion, jewelry, or lifestyle brands.\n\nExisting fit-out includes display lighting, dressing area, and a back-of-house storage zone. HVAC and security systems are operational, allowing for a rapid brand launch.\n\nThis is a rare opportunity for retailers seeking visibility, prestige, and consistent walk-in traffic in the capital\'s premier shopping district.",
    keyFeatures: [
      { label: "Property Type", value: "Retail Commercial" },
      { label: "Year Built", value: "2016" },
      { label: "Total Area", value: "2,250 sq.ft" },
      { label: "Frontage", value: "32 ft Glass" },
      { label: "Ceiling Height", value: "14 ft" },
      { label: "Parking", value: "Valet Nearby" },
      { label: "Lease Term", value: "36 Months Minimum" },
      { label: "Monthly Rate", value: "NPR 3.8 L/mo" },
    ],
    amenities: [
      "Glass Storefront",
      "Display Lighting",
      "Central AC",
      "Storage Room",
      "Security System",
      "High Foot Traffic",
      "Premium Address",
      "Loading Access",
    ],
    floorPlans: [
      {
        id: "fp-009-a",
        label: "Retail Layout",
        area: "2,250 sq.ft",
        image:
          "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=900&q=80",
      },
    ],
    agentId: "a-003",
    yearBuilt: 2016,
  },
  "lp-010": {
    gallery: [],
    summary:
      "A quiet ridge apartment with filtered views, efficient layout, and Hattiban\'s peaceful residential setting.",
    description:
      "Quiet Ridge Apartment is a well-proportioned two-bedroom residence positioned on a hillside lane in Hattiban. The home captures filtered valley views from the living room and primary bedroom while maintaining a sense of seclusion.\n\nThe compact layout maximizes usable space with an open kitchen-living area, two full bathrooms, and built-in storage throughout. Quality finishes include vitrified tiles, granite countertops, and aluminum windows with mosquito screens.\n\nIdeal for first-time buyers or investors seeking a low-maintenance property in a growing residential pocket of Lalitpur.",
    keyFeatures: [
      { label: "Property Type", value: "Apartment" },
      { label: "Year Built", value: "2020" },
      { label: "Total Area", value: "1,240 sq.ft" },
      { label: "Floor Level", value: "3rd Floor" },
      { label: "Parking", value: "1 Reserved Space" },
      { label: "Furnishing", value: "Unfurnished" },
      { label: "Views", value: "Valley Facing" },
      { label: "Price per sq.ft", value: "NPR 14,919" },
    ],
    amenities: [
      "Valley Views",
      "Elevator Access",
      "Reserved Parking",
      "24/7 Security",
      "Backup Water",
      "Modular Kitchen",
      "Built-in Wardrobes",
      "Quiet Location",
    ],
    floorPlans: [
      {
        id: "fp-010-a",
        label: "Full Layout",
        area: "1,240 sq.ft",
        image:
          "https://images.unsplash.com/photo-1494526585095-c41746248156?auto=format&fit=crop&w=900&q=80",
      },
    ],
    agentId: "a-002",
    yearBuilt: 2020,
    parkingSpaces: 1,
    furnishing: "Unfurnished",
  },
  "lp-011": {
    gallery: [],
    summary:
      "A hill-view villa on expansive Nagarkot land with resort-style outdoor living and panoramic sunrise views.",
    description:
      "Hill View Villa is a retreat-style residence perched above Nagarkot with sweeping views of the Himalaya at sunrise. Set on 12 ropani of landscaped land, the property combines main-house living with guest accommodation and extensive outdoor areas.\n\nThe main villa features four ensuite bedrooms, a double-height great room with a stone fireplace, and a gourmet kitchen designed for entertaining. A separate guest cottage and pool pavilion extend the property\'s hospitality capacity.\n\nThis is a rare offering for buyers seeking a weekend escape, boutique hospitality venture, or private estate within driving distance of Kathmandu.",
    keyFeatures: [
      { label: "Property Type", value: "Estate Villa" },
      { label: "Year Built", value: "2019" },
      { label: "Built-up Area", value: "4,800 sq.ft" },
      { label: "Land Area", value: "12 ropani" },
      { label: "Parking", value: "5 Spaces" },
      { label: "Furnishing", value: "Fully Furnished" },
      { label: "Views", value: "Himalaya & Valley" },
      { label: "Guest Cottage", value: "Included" },
    ],
    amenities: [
      "Infinity Pool",
      "Guest Cottage",
      "Fireplace",
      "Landscaped Grounds",
      "Outdoor Pavilion",
      "Backup Generator",
      "Staff Quarters",
      "Himalaya Views",
      "Private Driveway",
      "Security Gate",
    ],
    floorPlans: [
      {
        id: "fp-011-a",
        label: "Main Villa",
        area: "3,600 sq.ft",
        image:
          "https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?auto=format&fit=crop&w=900&q=80",
      },
      {
        id: "fp-011-b",
        label: "Guest Cottage",
        area: "1,200 sq.ft",
        image:
          "https://images.unsplash.com/photo-1600607688969-a5bfcd646154?auto=format&fit=crop&w=900&q=80",
      },
    ],
    agentId: "a-001",
    yearBuilt: 2019,
    parkingSpaces: 5,
    lotSize: "12 ropani",
    furnishing: "Fully Furnished",
  },
  "lp-012": {
    gallery: [],
    summary:
      "A full-floor commercial space in New Baneshwor with open plan, executive offices, and transit connectivity.",
    description:
      "Central Business Floor delivers a complete commercial floor plate in one of Kathmandu\'s busiest business districts. The layout supports a corporate headquarters with reception, open workspace, private offices, boardroom, and pantry zones already defined.\n\nHigh ceilings, abundant natural light, and a modern HVAC system create a productive environment. Dedicated parking for six vehicles and 24/7 building security add operational convenience.\n\nBaneshwor\'s transit hub connectivity and established commercial ecosystem make this a strategic acquisition for growing enterprises.",
    keyFeatures: [
      { label: "Property Type", value: "Commercial Floor" },
      { label: "Year Built", value: "2018" },
      { label: "Total Area", value: "7,400 sq.ft" },
      { label: "Floor Level", value: "8th Floor" },
      { label: "Parking", value: "6 Reserved Spaces" },
      { label: "Ceiling Height", value: "10.5 ft" },
      { label: "Ownership", value: "Freehold" },
      { label: "Price per sq.ft", value: "NPR 9,189" },
    ],
    amenities: [
      "Open Floor Plan",
      "Executive Offices",
      "Boardroom",
      "Pantry Area",
      "Central AC",
      "Backup Generator",
      "Elevator Access",
      "Reserved Parking",
      "24/7 Security",
      "Fire Safety Systems",
      "High-Speed Internet Ready",
    ],
    floorPlans: [
      {
        id: "fp-012-a",
        label: "Full Floor Plan",
        area: "7,400 sq.ft",
        image:
          "https://images.unsplash.com/photo-1497366811353-6870744d04b2?auto=format&fit=crop&w=900&q=80",
      },
    ],
    agentId: "a-003",
    yearBuilt: 2018,
    parkingSpaces: 6,
  },
};

export function buildPropertyDetail(
  listing: ListingProperty,
  slug: string
): PropertyDetail {
  const extras = propertyDetailExtras[listing.id];
  const fallback: PropertyDetailExtras = {
    gallery: galleryForType(listing.type, listing.image),
    summary: `A premium ${listing.type.toLowerCase()} in ${listing.location} with verified listing details and private advisory support.`,
    description: `This ${listing.type.toLowerCase()} at ${listing.address} offers ${listing.beds > 0 ? `${listing.beds} bedrooms and ` : ""}${listing.baths} bathrooms across ${listing.area}. Presented by Aurelia Estates with full market context, transparent pricing, and guided viewings.\n\nContact our advisory team to schedule a private tour, review documentation, and discuss offer terms tailored to your timeline.`,
    keyFeatures: [
      { label: "Property Type", value: listing.type },
      { label: "Total Area", value: listing.area },
      { label: "City", value: listing.city },
      { label: "Status", value: listing.status },
      ...(listing.beds > 0
        ? [{ label: "Bedrooms", value: String(listing.beds) }]
        : []),
      { label: "Bathrooms", value: String(listing.baths) },
      { label: "Listed", value: listing.listedAt },
      { label: "Listing ID", value: listing.id.toUpperCase() },
    ],
    amenities: [
      "Verified Listing",
      "Private Viewings",
      "Documentation Support",
      "Market Advisory",
      "Secure Handover",
      "Local Expertise",
    ],
    floorPlans: [],
    agentId: "a-001",
  };

  const merged = extras ?? fallback;

  return {
    ...listing,
    ...merged,
    slug,
    gallery:
      merged.gallery.length > 0
        ? merged.gallery
        : galleryForType(listing.type, listing.image),
  };
}
