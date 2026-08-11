import Link from "next/link";
import type { ReactNode } from "react";

type Variant = "primary" | "secondary";

const base =
  "tag inline-flex items-center justify-center gap-2 px-6 py-3 text-sm font-heading font-semibold uppercase tracking-wide transition-transform active:scale-[0.98] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-knight-gold-bright";

const variants: Record<Variant, string> = {
  primary:
    "gold-gradient text-knight-black shadow-[0_2px_16px_-4px_rgba(216,160,47,0.6)] hover:brightness-110",
  secondary:
    "border border-knight-gold text-knight-gold-bright hover:bg-knight-gold/10",
};

export default function Button({
  href,
  children,
  variant = "primary",
  className = "",
  type,
  onClick,
}: {
  href?: string;
  children: ReactNode;
  variant?: Variant;
  className?: string;
  type?: "button" | "submit";
  onClick?: () => void;
}) {
  const classes = `${base} ${variants[variant]} ${className}`;

  if (href) {
    return (
      <Link href={href} className={classes}>
        {children}
      </Link>
    );
  }

  return (
    <button type={type ?? "button"} onClick={onClick} className={classes}>
      {children}
    </button>
  );
}
