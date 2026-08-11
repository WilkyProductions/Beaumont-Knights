// Plain dark-gray grunge/film-grain texture — no line work, just a subtle
// gritty noise wash so the hero background doesn't read as flat black.
export default function GrungeBackdrop({ className = "" }: { className?: string }) {
  return (
    <svg className={className} aria-hidden="true">
      <defs>
        <filter id="knightGrunge">
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.9"
            numOctaves="3"
            stitchTiles="stitch"
            result="noise"
          />
          <feColorMatrix
            in="noise"
            type="matrix"
            values="0 0 0 0 0.35  0 0 0 0 0.35  0 0 0 0 0.37  0 0 0 0.9 0"
          />
        </filter>
      </defs>
      <rect width="100%" height="100%" fill="var(--color-knight-black)" />
      <rect width="100%" height="100%" filter="url(#knightGrunge)" opacity="0.18" />
    </svg>
  );
}
