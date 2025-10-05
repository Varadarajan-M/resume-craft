import { Footer } from "./Footer";
import {
  CTASection,
  FeaturesSection,
  HeroSection,
  TemplatesSection,
  VideoSection,
} from "./LandingSections";
import { Navigation } from "./Navigation";

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <HeroSection />
      <VideoSection />
      <FeaturesSection />
      <TemplatesSection />
      <CTASection />
      <Footer />
    </div>
  );
}
