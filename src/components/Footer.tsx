import Link from "next/link";
import { primaryNav, siteConfig } from "@/data/site";
import ShieldMark from "./ShieldMark";
import EmblemPattern from "./EmblemPattern";

export default function Footer() {
  return (
    <footer className="relative mt-24 overflow-hidden border-t border-knight-charcoal-light bg-knight-charcoal pb-24 lg:pb-0">
      <EmblemPattern />
      <div className="relative mx-auto grid w-full max-w-6xl gap-10 px-4 py-12 sm:px-6 lg:grid-cols-3 lg:px-8">
        <div>
          <div className="flex items-center gap-2">
            <ShieldMark className="h-10" />
            <span className="font-heading text-lg font-semibold uppercase tracking-wide text-knight-silver">
              {siteConfig.shortName}
            </span>
          </div>
          <p className="mt-3 max-w-xs text-sm text-knight-silver/70">
            {siteConfig.legalType} youth travel baseball club for 9U and 10U
            players in {siteConfig.city}, {siteConfig.state}.
          </p>
          <a
            href={siteConfig.instagramUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-4 inline-flex items-center gap-2 text-sm font-heading uppercase tracking-wide text-knight-gold-bright hover:underline"
          >
            {siteConfig.instagramHandle}
          </a>
        </div>

        <div>
          <p className="font-heading text-sm uppercase tracking-wide text-knight-gold">
            Quick Links
          </p>
          <ul className="mt-3 grid grid-cols-2 gap-2 text-sm text-knight-silver/80">
            {primaryNav.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className="hover:text-knight-gold-bright">
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <p className="font-heading text-sm uppercase tracking-wide text-knight-gold">
            Contact
          </p>
          <address className="mt-3 space-y-1 text-sm not-italic text-knight-silver/80">
            <p>{siteConfig.addressPlaceholder}</p>
            <p>{siteConfig.phonePlaceholder}</p>
            <p>
              <a href={`mailto:${siteConfig.email}`} className="hover:text-knight-gold-bright">
                {siteConfig.email}
              </a>
            </p>
          </address>
        </div>
      </div>

      <div className="relative border-t border-knight-charcoal-light/60 px-4 py-4 text-center text-xs text-knight-silver/50 sm:px-6 lg:px-8">
        © {new Date().getFullYear()} {siteConfig.name}. {siteConfig.legalType}.
        Website Design by Wilky Productions.
      </div>
    </footer>
  );
}
