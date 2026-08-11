import emblemFullSrc from "../../public/logo/emblem-full.png";

// Small, low-opacity, diagonally-tiled repeat of the real crest artwork —
// used as a subtle background texture instead of a hand-drawn pattern, so
// it's guaranteed to actually look like the brand. Place inside a
// `position: relative` + `overflow-hidden` ancestor; inset[-25%] gives
// enough bleed that rotation never shows a gap at the edges.
export default function EmblemPattern({
  className = "absolute inset-[-25%] opacity-[0.05]",
  size = 160,
  rotate = -18,
}: {
  className?: string;
  size?: number;
  rotate?: number;
}) {
  return (
    <div
      aria-hidden
      className={`pointer-events-none ${className}`}
      style={{
        backgroundImage: `url(${emblemFullSrc.src})`,
        backgroundSize: `${size}px auto`,
        backgroundRepeat: "repeat",
        transform: `rotate(${rotate}deg)`,
      }}
    />
  );
}
