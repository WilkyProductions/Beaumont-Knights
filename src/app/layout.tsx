import type { Metadata } from "next";
import { Anton, Oswald, Inter } from "next/font/google";
import localFont from "next/font/local";
import "./globals.css";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import MobileCTA from "@/components/MobileCTA";
import { siteConfig } from "@/data/site";
import { organizationJsonLd } from "@/lib/jsonld";

const anton = Anton({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-anton",
  display: "swap",
});

const oswald = Oswald({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-oswald",
  display: "swap",
});

// Aggressive display accent font (client-provided file, not on Google
// Fonts) — used for taglines, section eyebrows, and confirmation screens.
const anotherDanger = localFont({
  src: "../fonts/AnotherDanger.otf",
  variable: "--font-accent",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: `${siteConfig.name} — 9U & 10U Travel Baseball in Beaumont, CA`,
    template: `%s | ${siteConfig.shortName}`,
  },
  description: siteConfig.description,
  keywords: [
    "Beaumont Knights",
    "youth travel baseball Beaumont CA",
    "9U baseball Beaumont",
    "10U baseball Beaumont",
    "travel baseball Inland Empire",
    "non-profit youth baseball",
  ],
  openGraph: {
    type: "website",
    url: siteConfig.url,
    title: `${siteConfig.name} — 9U & 10U Travel Baseball`,
    description: siteConfig.description,
    siteName: siteConfig.name,
  },
  twitter: {
    card: "summary_large_image",
    title: `${siteConfig.name} — 9U & 10U Travel Baseball`,
    description: siteConfig.description,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${anton.variable} ${oswald.variable} ${anotherDanger.variable} ${inter.variable}`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd()) }}
        />
      </head>
      <body className="min-h-screen antialiased">
        <Nav />
        <main>{children}</main>
        <Footer />
        <MobileCTA />
      </body>
    </html>
  );
}
