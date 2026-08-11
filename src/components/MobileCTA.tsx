import Button from "./Button";

// Thumb-reachable, always-visible register CTA on mobile — SITE-PLAN.md §4.
export default function MobileCTA() {
  return (
    <div
      className="fixed inset-x-0 bottom-0 z-40 border-t border-knight-charcoal-light bg-knight-black/95 px-4 py-3 backdrop-blur lg:hidden"
      style={{ paddingBottom: "max(0.75rem, env(safe-area-inset-bottom))" }}
    >
      <Button href="/signup" className="w-full">
        Register for Tryouts
      </Button>
    </div>
  );
}
