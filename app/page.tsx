import { FinalCtaSection } from "@/components/FinalCtaSection";
import { Footer } from "@/components/Footer";
import { HeroSection } from "@/components/HeroSection";
import { HowItWorksSection } from "@/components/HowItWorksSection";
import { InsightSection } from "@/components/InsightSection";
import { Nav } from "@/components/Nav";
import { PricingSection } from "@/components/PricingSection";
import { ProductShowcaseSection } from "@/components/ProductShowcaseSection";
import { ScrollColorProvider } from "@/components/ScrollColorProvider";
import { TrustSection } from "@/components/TrustSection";

export default function Home() {
  return (
    <ScrollColorProvider>
      <div className="site-shell">
        <div className="fixed-bg" aria-hidden="true" />
        <Nav />
        <main>
          <HeroSection />
          <InsightSection />
          <HowItWorksSection />
          <ProductShowcaseSection />
          <TrustSection />
          <PricingSection />
          <FinalCtaSection />
        </main>
        <Footer />
      </div>
    </ScrollColorProvider>
  );
}
