"use client";

import Image from "next/image";
import { useState, useRef, useEffect } from "react";
import { Button } from "./ui/button";
import { ScrollAnimationWrapper } from "./ScrollAnimationWrapper";

interface DigitalPhenotypingProps {
  onCTAClick: (buttonId: string) => void;
}

const CoachImageCarousel = () => {
  const coachImages = [
    "/coach1.png",
    "/coach2.png",
    "/coach3.png",
    "/coach4.png",
    "/coach5.png",
    "/coach6.png",
    "/coach7.png",
    "/coach8.png",
  ];

  const [isVisible, setIsVisible] = useState(false);
  const carouselRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
          }
        });
      },
      { threshold: 0.1 }
    );

    const currentRef = carouselRef.current;
    if (currentRef) {
      observer.observe(currentRef);

      // 페이지 로드 시 이미 화면에 보이는 경우를 위한 초기 체크
      const rect = currentRef.getBoundingClientRect();
      const isCurrentlyVisible =
        rect.top < window.innerHeight && rect.bottom > 0;
      if (isCurrentlyVisible) {
        setIsVisible(true);
      }
    }
  }, []);

  return (
    <div ref={carouselRef} className="relative overflow-hidden w-full h-auto">
      <style>{`
        .scroll-wrapper {
          display: flex;
          width: fit-content;
        }
        .scroll-wrapper.animate {
          animation: infiniteScroll 25s linear infinite;
        }
        @media (max-width: 768px) {
          .scroll-wrapper.animate {
            animation: infiniteScroll 20s linear infinite;
          }
        }
        @keyframes infiniteScroll {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }
        .image-group {
          display: flex;
          align-items: center;
        }
      `}</style>
      <div className={`scroll-wrapper ${isVisible ? "animate" : ""}`}>
        <div className="image-group">
          {coachImages.map((image, index) => (
            <div key={`group1-${index}`} className="flex-shrink-0 mr-4 md:mr-6">
              <Image
                src={image}
                alt={`Coach ${index + 1}`}
                width={200}
                height={200}
                className="w-auto h-auto max-w-none object-contain max-h-36 sm:max-h-44 md:max-h-52"
                priority={false}
                style={{ width: "auto", height: "auto" }}
              />
            </div>
          ))}
        </div>
        <div className="image-group">
          {coachImages.map((image, index) => (
            <div key={`group2-${index}`} className="flex-shrink-0 mr-4 md:mr-6">
              <Image
                src={image}
                alt={`Coach ${index + 1}`}
                width={200}
                height={200}
                className="w-auto h-auto max-w-none object-contain max-h-36 sm:max-h-44 md:max-h-52"
                priority={false}
                style={{ width: "auto", height: "auto" }}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

const DigitalPhenotyping = ({ onCTAClick }: DigitalPhenotypingProps) => {
  return (
    <ScrollAnimationWrapper
      animationType="default"
      threshold={0.1}
      rootMargin="0px 0px -100px 0px"
    >
      <section className="text-center md:px-12 py-16 md:py-20 px-4 bg-gray-100">
        {/* Main Title */}
        <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-6 md:mb-8 leading-tight">
          AI 기반 디지털 피노타이핑
          <br />
          돌봄 서비스, 피노키오
        </h1>

        {/* Subtitle */}
        <div className="relative max-w-xl md:max-w-2xl mx-auto mb-12 md:mb-16">
          <div className="bg-primary text-white px-2 py-6 md:px-3 md:py-8 rounded-2xl shadow-lg relative speech-bubble">
            <p className="text-sm md:text-xl leading-relaxed">
              <b>디지털 피노타이핑(Digital Phenotyping)</b>이란
              <br />
              스마트폰 센서·사용 패턴 데이터를 AI가 매일 분석해
              <br />
              행동, 사회, 환경적 지표를 정량화하는 기술입니다.
            </p>
          </div>
          {/* Speech bubble tail */}
          <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-[20px] border-r-[20px] border-t-[20px] border-l-transparent border-r-transparent border-t-primary"></div>
        </div>

        {/* Product Image */}
        <Image
          src="/phenotyping.png"
          alt="phenotyping"
          width={600}
          height={450}
          className="mb-12 md:mb-16 h-60 sm:h-80 md:h-[32rem] mx-auto object-contain"
          priority={false}
          style={{ width: "auto", height: "auto", maxHeight: "28rem" }}
        />

        {/* Content Section */}
        <div className="max-w-4xl mx-auto mb-12 md:mb-16">
          <div className="text-center space-y-8 md:space-y-12">
            <div>
              <p className="text-xl sm:text-2xl md:text-3xl font-semibold text-gray-900 mb-4 md:mb-6 leading-relaxed">
                피노키오는 단 한 번의 설치로
                <br />
                당신의 따뜻한 시선이 되어, <br className="md:hidden" />
                부모님의 ‘작은 이상’까지 살핍니다.
              </p>
            </div>
          </div>
        </div>

        {/* Coach Image Carousel */}
        <div className="mb-12 md:mb-16">
          <CoachImageCarousel />
        </div>

        {/* CTA Button */}
        <div>
          <p className="text-md sm:text-lg md:text-xl text-gray-700 leading-relaxed mb-4 md:mb-8">
            부모님은 더 안전하게, 당신은 더 든든하게
            <br />
            서로의 하루가 한결 평온해집니다.
          </p>
        </div>
        <div className="text-center">
          <Button
            className="bg-primary text-white hover:bg-primary/80 font-semibold px-12 md:px-16 py-6 md:py-8 text-sm md:text-xl rounded-full shadow-lg hover:shadow-xl transition-all duration-300"
            onClick={() => onCTAClick("digital_phenotyping")}
          >
            지금, 피노키오를 부모님 곁에 선물하세요!
          </Button>
        </div>
      </section>
    </ScrollAnimationWrapper>
  );
};

export default DigitalPhenotyping;
