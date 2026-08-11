import type { Metadata } from "next";
import Container from "@/components/Container";
import SectionHeading from "@/components/SectionHeading";
import SignupForm from "./SignupForm";

export const metadata: Metadata = {
  title: "Register",
  description:
    "Register your player for the Beaumont Knights 9U or 10U travel baseball team — parent, player, and emergency contact info.",
};

export default function SignupPage() {
  return (
    <Container className="max-w-2xl py-12 sm:py-16">
      <SectionHeading eyebrow="Join the Family" title="Player Registration" />
      <p className="mt-4 text-sm text-knight-silver/70">
        This form collects your player and family info so we can follow up
        about tryouts. Registration fees are handled separately, offline, for
        now — we&apos;ll be in touch with details after you sign up.
      </p>
      <div className="mt-8">
        <SignupForm />
      </div>
    </Container>
  );
}
