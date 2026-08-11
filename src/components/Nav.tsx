"use client";

import Link from "next/link";
import { useState } from "react";
import { primaryNav, siteConfig } from "@/data/site";
import ShieldMark from "./ShieldMark";
import Button from "./Button";

export default function Nav() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 border-b border-knight-charcoal-light/80 bg-knight-black/95 backdrop-blur">
      <div className="mx-auto flex w-full max-w-6xl items-center justify-between px-4 py-3 sm:px-6 lg:px-8">
        <Link href="/" className="flex items-center gap-2" onClick={() => setOpen(false)}>
          <ShieldMark className="h-10" priority />
          <span className="font-heading text-lg font-semibold uppercase tracking-wide text-knight-silver">
            {siteConfig.shortName}
          </span>
        </Link>

        <nav className="hidden items-center gap-6 lg:flex">
          {primaryNav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="font-heading text-sm uppercase tracking-wide text-knight-silver/90 transition-colors hover:text-knight-gold-bright"
            >
              {item.label}
            </Link>
          ))}
          <Button href="/signup" className="!py-2 !px-4 text-xs">
            Register
          </Button>
        </nav>

        <button
          type="button"
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
          className="flex h-10 w-10 items-center justify-center rounded-md border border-knight-charcoal-light text-knight-gold-bright lg:hidden"
        >
          <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="2">
            {open ? (
              <path d="M6 6l12 12M18 6L6 18" strokeLinecap="round" />
            ) : (
              <path d="M4 7h16M4 12h16M4 17h16" strokeLinecap="round" />
            )}
          </svg>
        </button>
      </div>

      {open && (
        <nav className="border-t border-knight-charcoal-light bg-knight-black lg:hidden">
          <div className="mx-auto flex w-full max-w-6xl flex-col gap-1 px-4 py-3 sm:px-6">
            {primaryNav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className="rounded-md px-3 py-3 font-heading text-base uppercase tracking-wide text-knight-silver/90 hover:bg-knight-charcoal hover:text-knight-gold-bright"
              >
                {item.label}
              </Link>
            ))}
          </div>
        </nav>
      )}
    </header>
  );
}
