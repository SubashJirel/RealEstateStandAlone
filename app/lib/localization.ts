import { adToBs } from "@sbmdkl/nepali-date-converter";

export type InterfaceLanguage = "en" | "ne";
export type DateSystem = "ad" | "bs";

export interface LocalizationPreferences {
  language: InterfaceLanguage;
  dateSystem: DateSystem;
  nepaliDigits: boolean;
}

export const NEPAL_TIME_ZONE = "Asia/Kathmandu";

const NEPALI_DIGITS = "०१२३४५६७८९";
const BS_MONTHS_EN = ["Baisakh", "Jestha", "Ashadh", "Shrawan", "Bhadra", "Ashwin", "Kartik", "Mangsir", "Poush", "Magh", "Falgun", "Chaitra"];
const BS_MONTHS_NE = ["वैशाख", "जेठ", "असार", "श्रावण", "भदौ", "असोज", "कार्तिक", "मंसिर", "पुष", "माघ", "फागुन", "चैत"];

export const translations = {
  en: {
    buy: "Buy", rent: "Rent", properties: "Properties", map: "Map", agents: "Agents",
    about: "About", faq: "FAQ", contact: "Contact", portal: "Portal",
    scheduleViewing: "Schedule Viewing", openMenu: "Open menu", closeMenu: "Close menu",
    explore: "Explore", company: "Company", services: "Services", aboutUs: "About Us",
    ourMission: "Our Mission", ourStory: "Our Story", careers: "Careers",
    homeValuation: "Home Valuation", buyerAdvisory: "Buyer Advisory",
    sellerRepresentation: "Seller Representation", developerSales: "Developer Sales",
    rightsReserved: "All rights reserved.", luxuryRealty: "Luxury Realty",
    trustedAdvisors: "Trusted local advisors for verified listings and high-intent property inquiries.",
    language: "Language", calendar: "Calendar", digits: "Digits",
  },
  ne: {
    buy: "किन्नुहोस्", rent: "भाडा", properties: "सम्पत्तिहरू", map: "नक्सा", agents: "एजेन्टहरू",
    about: "हाम्रो बारेमा", faq: "प्रश्नोत्तर", contact: "सम्पर्क", portal: "पोर्टल",
    scheduleViewing: "घर-जग्गा हेर्ने समय लिनुहोस्", openMenu: "मेनु खोल्नुहोस्", closeMenu: "मेनु बन्द गर्नुहोस्",
    explore: "खोज्नुहोस्", company: "कम्पनी", services: "सेवाहरू", aboutUs: "हाम्रो बारेमा",
    ourMission: "हाम्रो उद्देश्य", ourStory: "हाम्रो कथा", careers: "रोजगारी",
    homeValuation: "सम्पत्ति मूल्याङ्कन", buyerAdvisory: "खरिदकर्ता परामर्श",
    sellerRepresentation: "बिक्रेता प्रतिनिधित्व", developerSales: "डेभलपर बिक्री",
    rightsReserved: "सर्वाधिकार सुरक्षित।", luxuryRealty: "विश्वसनीय रियल इस्टेट",
    trustedAdvisors: "प्रमाणित सूची र गम्भीर सम्पत्ति सोधपुछका लागि भरपर्दा स्थानीय सल्लाहकार।",
    language: "भाषा", calendar: "पात्रो", digits: "अङ्क",
  },
} as const;

export type TranslationKey = keyof typeof translations.en;

export function toNepaliDigits(value: string | number): string {
  return String(value).replace(/\d/g, (digit) => NEPALI_DIGITS[Number(digit)]);
}

export function toLatinDigits(value: string): string {
  return value.replace(/[०-९]/g, (digit) => String(NEPALI_DIGITS.indexOf(digit)));
}

function adDateInNepal(value: string | number | Date): Date {
  const date = value instanceof Date ? value : new Date(value);
  if (Number.isNaN(date.getTime())) throw new Error("Invalid date");
  return date;
}

function adPartsInNepal(value: string | number | Date) {
  const parts = new Intl.DateTimeFormat("en-CA", {
    timeZone: NEPAL_TIME_ZONE,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).formatToParts(adDateInNepal(value));
  return Object.fromEntries(parts.map(({ type, value: part }) => [type, part]));
}

export function formatLocalizedDate(
  value: string | number | Date,
  preferences: LocalizationPreferences,
  includeTime = false,
): string {
  try {
    const date = adDateInNepal(value);
    let result: string;
    if (preferences.dateSystem === "bs") {
      const parts = adPartsInNepal(date);
      const converted = adToBs(`${parts.year}-${parts.month}-${parts.day}`);
      if (typeof converted !== "string") throw new Error("Date conversion failed");
      const [year, month, day] = converted.split("-").map(Number);
      const monthName = preferences.language === "ne" ? BS_MONTHS_NE[month - 1] : BS_MONTHS_EN[month - 1];
      result = preferences.language === "ne"
        ? `${year} ${monthName} ${day} गते`
        : `${day} ${monthName} ${year} BS`;
    } else {
      result = new Intl.DateTimeFormat(preferences.language === "ne" ? "ne-NP" : "en-NP", {
        timeZone: NEPAL_TIME_ZONE,
        year: "numeric",
        month: "short",
        day: "numeric",
      }).format(date);
    }
    if (includeTime) {
      const time = new Intl.DateTimeFormat(preferences.language === "ne" ? "ne-NP" : "en-NP", {
        timeZone: NEPAL_TIME_ZONE,
        hour: "numeric",
        minute: "2-digit",
      }).format(date);
      result = `${result}, ${time}`;
    }
    return preferences.nepaliDigits ? toNepaliDigits(result) : result;
  } catch {
    return String(value);
  }
}

export function formatLocalizedNumber(value: number, preferences: LocalizationPreferences): string {
  const result = new Intl.NumberFormat("en-IN").format(value);
  return preferences.nepaliDigits ? toNepaliDigits(result) : result;
}

export function formatNepalCurrency(value: number | string, preferences: LocalizationPreferences): string {
  const amount = Number(value);
  if (!Number.isFinite(amount)) return String(value);
  let number: string;
  let unit = "";
  if (Math.abs(amount) >= 10_000_000) {
    number = (amount / 10_000_000).toFixed(2).replace(/\.00$/, "");
    unit = preferences.language === "ne" ? "करोड" : "crore";
  } else if (Math.abs(amount) >= 100_000) {
    number = (amount / 100_000).toFixed(2).replace(/\.00$/, "");
    unit = preferences.language === "ne" ? "लाख" : "lakh";
  } else {
    number = new Intl.NumberFormat("en-IN", { maximumFractionDigits: 2 }).format(amount);
  }
  const result = preferences.language === "ne" ? `रु. ${number}${unit ? ` ${unit}` : ""}` : `NPR ${number}${unit ? ` ${unit}` : ""}`;
  return preferences.nepaliDigits ? toNepaliDigits(result) : result;
}

export function formatNepalPhone(value?: string | null, nepaliDigits = false): string {
  if (!value) return "";
  const raw = toLatinDigits(value).trim();
  let digits = raw.replace(/\D/g, "");
  if (digits.startsWith("00977")) digits = digits.slice(2);
  if (digits.startsWith("977")) digits = digits.slice(3);
  const rendered = digits.length === 10
    ? `+977 ${digits.slice(0, 3)} ${digits.slice(3, 6)} ${digits.slice(6)}`
    : raw;
  return nepaliDigits ? toNepaliDigits(rendered) : rendered;
}

export function formatNepalAddress(agency?: {
  address?: string | null; tole?: string | null; ward_number?: string | null;
  municipality?: string | null; city?: string | null; district?: string | null; province?: string | null;
} | null): string {
  if (!agency) return "";
  const parts = [agency.address, agency.tole, agency.ward_number ? `Ward ${agency.ward_number}` : "", agency.municipality, agency.city, agency.district, agency.province]
    .filter((part): part is string => Boolean(part?.trim()));
  return [...new Set(parts)].join(", ");
}
