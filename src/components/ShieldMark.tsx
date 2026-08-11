import Image from "next/image";
import shieldSrc from "../../public/logo/shield.png";

// The real Beaumont Knights crest (knight + shield, cropped from the
// official emblem artwork, background removed). See scripts/process-logo.mjs
// for how this was generated from design-source/.
//
// Sized by height only (`className` should set h-*, not w-*) — width
// always follows the image's native aspect ratio via `w-auto`, so it can
// never be stretched, squashed, or cropped regardless of container shape.
export default function ShieldMark({
  className = "h-10",
  glow = false,
  priority = false,
}: {
  className?: string;
  glow?: boolean;
  priority?: boolean;
}) {
  return (
    <span className="relative inline-block">
      {glow && (
        <span
          aria-hidden
          className="pointer-events-none absolute inset-0 -z-10 scale-150 opacity-70 blur-2xl"
          style={{
            background:
              "radial-gradient(circle, var(--color-knight-gold) 0%, transparent 70%)",
          }}
        />
      )}
      <Image
        src={shieldSrc}
        alt="Beaumont Knights shield"
        priority={priority}
        className={`relative w-auto ${className}`}
      />
    </span>
  );
}
