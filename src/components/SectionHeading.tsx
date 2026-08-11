export default function SectionHeading({
  eyebrow,
  title,
  align = "left",
}: {
  eyebrow?: string;
  title: string;
  align?: "left" | "center";
}) {
  return (
    <div className={align === "center" ? "text-center" : "text-left"}>
      {eyebrow && (
        <p className="font-accent text-xl text-knight-gold-bright sm:text-2xl">
          {eyebrow}
        </p>
      )}
      <h2 className="font-display text-3xl uppercase tracking-wide text-knight-silver sm:text-4xl">
        {title}
      </h2>
      <div
        className={`mt-3 h-1.5 w-16 gold-gradient ${
          align === "center" ? "mx-auto" : ""
        }`}
        style={{
          clipPath: "polygon(0 0, 85% 0, 100% 50%, 85% 100%, 0 100%)",
        }}
      />
    </div>
  );
}
