import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import MobileCTA from "@/components/MobileCTA";

export default function SiteLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <Nav />
      <main>{children}</main>
      <Footer />
      <MobileCTA />
    </>
  );
}
