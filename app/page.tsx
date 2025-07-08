"use client";

import { useState, useEffect } from "react";
import { useGoogleAnalytics } from "@/hooks/useGoogleAnalytics";
import { usePathname } from "next/navigation";
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
import { ScrollAnimationWrapper } from "@/components/ScrollAnimationWrapper";

export default function Home() {
  const { trackCTAClick } = useGoogleAnalytics();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalSource, setModalSource] = useState<CTASource>("mid-button");
  const pathname = usePathname();

  // 새로고침 시 및 페이지 이동 시 스크롤을 최상단으로 이동
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  const handleCTAClick = (buttonId: string) => {
    trackCTAClick(buttonId);

    // buttonId에 따라 source 결정
    let source: CTASource = "mid-button";

    if (buttonId === "hero_cta") {
      source = "mid-button";
    } else if (buttonId === "cta_mid") {
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
      <Hero onCTAClick={handleCTAClick} />

      <ScrollAnimationWrapper>
        <Problem />
      </ScrollAnimationWrapper>

      <OneClickFeatures />

      <ScrollAnimationWrapper animationType="long">
        <EarlyDetection onCTAClick={handleCTAClick} />
      </ScrollAnimationWrapper>

      <ScrollAnimationWrapper>
        <Monitoring onCTAClick={handleCTAClick} />
      </ScrollAnimationWrapper>

      <ScrollAnimationWrapper animationType="delayed">
        <Testimonials />
      </ScrollAnimationWrapper>

      <ScrollAnimationWrapper animationType="long">
        <PricingPlan onCTAClick={handleCTAClick} />
      </ScrollAnimationWrapper>

      <ScrollAnimationWrapper>
        <Footer />
      </ScrollAnimationWrapper>

      <StickyBottomBar onCTAClick={handleCTAClick} />

      <CTAModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        source={modalSource}
      />
    </div>
  );
}
