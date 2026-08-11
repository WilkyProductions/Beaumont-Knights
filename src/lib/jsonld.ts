import type { FaqItem } from "@/data/faq";
import type { ScheduleEvent } from "@/data/schedule";
import { siteConfig } from "@/data/site";

// Structured data helpers — SITE-PLAN.md §8 (SEO) and §9 (AEO). Keep facts
// here in lockstep with src/data/site.ts and the visible page copy.

export function organizationJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "SportsOrganization",
    name: siteConfig.name,
    alternateName: siteConfig.shortName,
    url: siteConfig.url,
    description: siteConfig.description,
    sport: "Baseball",
    email: siteConfig.email,
    address: {
      "@type": "PostalAddress",
      addressLocality: siteConfig.city,
      addressRegion: siteConfig.state,
      addressCountry: "US",
    },
    sameAs: [siteConfig.instagramUrl],
  };
}

export function eventJsonLd(event: ScheduleEvent) {
  const startDate = `${event.date}T${event.startTime}:00`;
  const endDate = event.endTime ? `${event.date}T${event.endTime}:00` : undefined;

  return {
    "@context": "https://schema.org",
    "@type": "SportsEvent",
    name: `${event.type}: ${event.title}`,
    startDate,
    ...(endDate ? { endDate } : {}),
    eventStatus: "https://schema.org/EventScheduled",
    eventAttendanceMode: "https://schema.org/OfflineEventAttendanceMode",
    location: {
      "@type": "Place",
      name: event.location,
      address: event.address ?? siteConfig.addressPlaceholder,
    },
    description: event.notes ?? `${event.type} for ${event.division}`,
    organizer: {
      "@type": "SportsOrganization",
      name: siteConfig.name,
      url: siteConfig.url,
    },
  };
}

export function faqJsonLd(items: FaqItem[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  };
}

export function breadcrumbJsonLd(items: { name: string; url: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  };
}
