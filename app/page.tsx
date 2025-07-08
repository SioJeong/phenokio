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
  const [modalSource, setModalSource] = useState<CTASource>("mid");
  const pathname = usePathname();

  // 새로고침 시 및 페이지 이동 시 스크롤을 최상단으로 이동
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  const handleCTAClick = (buttonId: string) => {
    trackCTAClick(buttonId);

    // kakao_consult는 모달을 열지 않음 (카카오톡 링크만 열림)
    if (buttonId === "kakao_consult") {
      return;
    }

    // buttonId에 따라 source 결정
    let source: CTASource = "mid";

    if (buttonId === "hero") {
      source = "hero";
    } else if (buttonId === "mid") {
      source = "mid";
    } else if (buttonId === "pricing_free_start") {
      source = "pricing_free_start";
    } else if (buttonId === "sticky_bottom") {
      source = "sticky_bottom";
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

      <ScrollAnimationWrapper
        animationType="section"
        threshold={0.2}
        rootMargin="0px 0px -150px 0px"
      >
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
