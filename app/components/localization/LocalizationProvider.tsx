"use client";

import { createContext, useCallback, useContext, useEffect, useMemo, useState, useSyncExternalStore, type ReactNode } from "react";
import {
  formatLocalizedDate,
  formatLocalizedNumber,
  formatNepalCurrency,
  formatNepalPhone,
  translations,
  type DateSystem,
  type InterfaceLanguage,
  type LocalizationPreferences,
  type TranslationKey,
} from "@/lib/localization";

const STORAGE_KEY = "nexora-public-localization";
const defaults: LocalizationPreferences = { language: "en", dateSystem: "ad", nepaliDigits: false };

interface AgencyLocalizationDefaults {
  default_language?: string;
  default_date_system?: string;
  use_nepali_digits?: boolean;
}

interface LocalizationValue extends LocalizationPreferences {
  setLanguage: (value: InterfaceLanguage) => void;
  setDateSystem: (value: DateSystem) => void;
  setNepaliDigits: (value: boolean) => void;
  applyAgencyDefaults: (agency?: AgencyLocalizationDefaults | null) => void;
  t: (key: TranslationKey) => string;
  date: (value: string | number | Date, includeTime?: boolean) => string;
  number: (value: number) => string;
  currency: (value: number | string) => string;
  phone: (value?: string | null) => string;
}

const LocalizationContext = createContext<LocalizationValue | null>(null);
const subscribeToHydration = () => () => undefined;

function readPreferences(): LocalizationPreferences {
  if (typeof window === "undefined") return defaults;
  try {
    const stored = window.localStorage.getItem(STORAGE_KEY);
    return stored ? { ...defaults, ...JSON.parse(stored) } : defaults;
  } catch {
    return defaults;
  }
}

export function LocalizationProvider({ children }: { children: ReactNode }) {
  const hydrated = useSyncExternalStore(subscribeToHydration, () => true, () => false);
  const [storedPreferences] = useState<LocalizationPreferences | null>(() =>
    typeof window !== "undefined" && window.localStorage.getItem(STORAGE_KEY) ? readPreferences() : null,
  );
  const [preferences, setPreferences] = useState<LocalizationPreferences>(defaults);
  const [preferenceSource, setPreferenceSource] = useState<"stored" | "agency" | "user" | null>(
    storedPreferences ? "stored" : null,
  );
  const activePreferences = hydrated && preferenceSource === "stored" && storedPreferences
    ? storedPreferences
    : preferences;

  useEffect(() => {
    if (!hydrated) return;
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(activePreferences));
    document.documentElement.lang = activePreferences.language;
  }, [activePreferences, hydrated]);

  const update = useCallback((patch: Partial<LocalizationPreferences>) => {
    const previousSource = preferenceSource;
    setPreferenceSource("user");
    setPreferences((current) => ({
      ...(previousSource === "stored" && storedPreferences ? storedPreferences : current),
      ...patch,
    }));
  }, [preferenceSource, storedPreferences]);

  const applyAgencyDefaults = useCallback((agency?: AgencyLocalizationDefaults | null) => {
    if (!agency || preferenceSource) return;
    setPreferenceSource("agency");
    setPreferences({
      language: agency.default_language === "ne" ? "ne" : "en",
      dateSystem: agency.default_date_system === "bs" ? "bs" : "ad",
      nepaliDigits: Boolean(agency.use_nepali_digits),
    });
  }, [preferenceSource]);

  const value = useMemo<LocalizationValue>(() => ({
    ...activePreferences,
    setLanguage: (language) => update({ language }),
    setDateSystem: (dateSystem) => update({ dateSystem }),
    setNepaliDigits: (nepaliDigits) => update({ nepaliDigits }),
    applyAgencyDefaults,
    t: (key) => translations[activePreferences.language][key] ?? translations.en[key],
    date: (date, includeTime = false) => formatLocalizedDate(date, activePreferences, includeTime),
    number: (number) => formatLocalizedNumber(number, activePreferences),
    currency: (amount) => formatNepalCurrency(amount, activePreferences),
    phone: (phone) => formatNepalPhone(phone, activePreferences.nepaliDigits),
  }), [activePreferences, applyAgencyDefaults, update]);

  return <LocalizationContext.Provider value={value}>{children}</LocalizationContext.Provider>;
}

export function useLocalization(): LocalizationValue {
  const value = useContext(LocalizationContext);
  if (!value) throw new Error("useLocalization must be used inside LocalizationProvider.");
  return value;
}
