import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import { SiteChrome } from "@/components/layout/SiteChrome";
import "./globals.css";

const plusJakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-plus-jakarta",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Nexora RealtyOS  Complete Real-Estate Business System",
    template: "%s | Nexora RealtyOS",
  },
  description:
    "Nexora RealtyOS helps Nepali real-estate agencies manage listings, leads, site visits, follow-ups, and deals from one platform. Listings Dekhi Leads Samma, Leads Dekhi Deals Samma.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${plusJakarta.variable} antialiased`}>
        <SiteChrome>{children}</SiteChrome>
      </body>
    </html>
  );
}
