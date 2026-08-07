declare module "@sbmdkl/nepali-date-converter" {
  export interface NepaliDateParts {
    year: number;
    month: number;
    date: number;
  }

  export function adToBs(adDate: string): string | NepaliDateParts;
  export function bsToAd(bsDate: string): string;
}
