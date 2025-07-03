import { useState } from "react";
import { useGoogleAnalytics } from "@/hooks/useGoogleAnalytics";
import { useFullPageScroll } from "@/hooks/useFullPageScroll";
import ScrollToHeroButton from "@/components/ScrollToHeroButton";
import Hero from "@/components/Hero";
import Problem from "@/components/Problem";
import EarlyDetection from "@/components/EarlyDetection";
import OneClickFeatures from "@/components/OneClickFeatures";
import Testimonials from "@/components/Testimonials";
import PricingPlan from "@/components/PricingPlan";
import Footer from "@/components/Footer";
import Monitoring from "@/components/Monitoring";
import CTAModal, { CTASource } from "@/components/CTAModal";
import StickyBottomBar from "@/components/StickyBottomBar";

const Index = () => {
  const { trackCTAClick } = useGoogleAnalytics();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalSource, setModalSource] = useState<CTASource>("mid-button");

  const sectionIds = ["hero", "problem"];

  const {
    currentSectionIndex,
    isScrolling,
    scrollToHero,
    isMobile,
    isHeroActive,
  } = useFullPageScroll({
    sectionIds,
    threshold: 100,
    animationDuration: 800,
  });

  const handleCTAClick = (buttonId: string) => {
    trackCTAClick(buttonId);

    // buttonId에 따라 source 결정
    let source: CTASource = "mid-button";

    if (buttonId === "cta_mid") {
      source = "mid-button";
    } else if (buttonId === "pricing_free") {
      source = "free-plan";
    } else if (buttonId === "pricing_monthly") {
      source = "monthly-plan";
    } else if (buttonId === "pricing_yearly") {
      source = "yearly-plan";
    } else if (buttonId === "cta_bottom") {
      source = "bottom-sticky";
    }

    setModalSource(source);
    setIsModalOpen(true);
  };

  return (
    <div className="min-h-screen font-sans">
      <div id="hero">
        <Hero onCTAClick={handleCTAClick} />
      </div>
      <div id="problem">
        <Problem />
      </div>
      <OneClickFeatures />
      <EarlyDetection onCTAClick={handleCTAClick} />
      <Monitoring onCTAClick={handleCTAClick} />
      <Testimonials />
      <PricingPlan onCTAClick={handleCTAClick} />
      <Footer />

      <ScrollToHeroButton
        scrollToHero={scrollToHero}
        isHeroActive={isHeroActive}
        isMobile={isMobile}
      />

      <StickyBottomBar onCTAClick={handleCTAClick} />

      <CTAModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        source={modalSource}
      />
    </div>
  );
};

export default Index;
