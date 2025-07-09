"use client";

import { Card, CardContent } from "@/components/ui/card";
import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { ScrollAnimationWrapper } from "./ScrollAnimationWrapper";
import { Button } from "./ui/button";

interface Feature {
  image?: string;
  images?: string[];
  title: string;
  description: string;
}

const features: Feature[] = [
  {
    image: "/day-report.png",
    title: "매일 기록되는 건강 상태",
    description:
      "수면, 활동량, 정서, 사회적 교류 등\n노년기 삶의 질에 중요한 지표들을\n자동으로 감지하고 기록합니다.",
  },
  {
    image: "/tech.png",
    title: "단순 관찰을 넘어, 깊이 있는 분석",
    description:
      "전화, 문자, 외출 여부 등\n일상의 데이터를 다각도로 분석해,\n표면 너머의 건강 변화를 찾아냅니다.",
  },
  {
    image: "/detail-report.png",
    title: "보호자를 위한 맞춤형 건강 리포트",
    description:
      "주간·월간 활동과 건강 상태를 종합 분석하여,\n가족들이 쉽게 이해하고 안심할 수 있도록 \n피노키오가 정리해드립니다.",
  },
  {
    images: [
      "/coach1.png",
      "/coach3.png",
      "/coach2.png",
      "/coach4.png",
      "/coach5.png",
    ],
    title: "부모님의 일상을 이해하는 돌봄 코치",
    description:
      "요즘 부모님이 어떻게 지내고 계신지,\n어떤 대화를 나누면 좋을지까지\n피노키오가 함께 고민합니다.",
  },
  {
    image: "/battery.png",
    title: "배터리 걱정 없이",
    description:
      "하루 종일 켜져 있어도 괜찮아요.\n어르신의 스마트폰을 고려했습니다.\n배터리 사용을 최소화해요.",
  },
];

const CoachImageCarousel = () => {
  const coachImages = [
    "/coach1.png",
    "/coach2.png",
    "/coach3.png",
    "/coach4.png",
    "/coach5.png",
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
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, []);

  return (
    <div ref={carouselRef} className="relative overflow-hidden w-full h-auto">
      <style>{`
        .scroll-wrapper {
          display: flex;
          width: fit-content;
        }
        .scroll-wrapper.animate {
          animation: infiniteScroll 12s linear infinite;
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

const OneClickFeatures = ({
  onCTAClick,
}: {
  onCTAClick: (buttonId: string) => void;
}) => {
  return (
    <section className="px-4 md:px-12 py-16 md:py-20 bg-white">
      <div className="container mx-auto px-4">
        <ScrollAnimationWrapper
          animationType="default"
          threshold={0.1}
          rootMargin="0px 0px -100px 0px"
        >
          <div className="text-center mb-20 md:mb-24">
            <Image
              src="/phenotyping.png"
              alt="phenotyping"
              width={600}
              height={450}
              className="mb-4 h-60 sm:h-80 md:h-[28rem] mx-auto object-contain"
              priority={false}
              style={{ width: "auto", height: "auto", maxHeight: "28rem" }}
            />
            <h2 className="text-xl sm:text-2xl md:text-4xl font-bold text-gray-900 mb-3 md:mb-4 px-2 leading-relaxed md:leading-relaxed">
              <span>별도의 조작 없이, 단 한 번의 설치로 OK</span>
              <span className="block mb-2">
                부모님의 스마트폰 속 일상을 분석
              </span>
            </h2>
            <div className="text-center mb-12 md:mb-16">
              <Button
                className="bg-primary text-white hover:bg-primary/80 font-semibold px-10 md:px-14 py-5 md:py-6 text-md md:text-xl rounded-full"
                onClick={() => onCTAClick("one_click_features")}
              >
                지금 무료로 시작하기
              </Button>
            </div>
            <hr />
          </div>
        </ScrollAnimationWrapper>
        <div className="flex flex-col gap-12 md:gap-20 max-w-6xl mx-auto">
          {features.map((feature, idx) => (
            <ScrollAnimationWrapper
              key={idx}
              animationType="staggered"
              index={idx}
              threshold={0.1}
              rootMargin="0px 0px -100px 0px"
            >
              <div className="flex flex-col md:flex-row items-center gap-6 md:gap-4">
                {/* 이미지(아이콘) */}
                <div
                  className={`flex-shrink-0 w-full md:w-1/2 px-2 md:px-8 ${
                    idx % 2 === 1 ? "md:order-2" : "md:order-1"
                  }`}
                >
                  <div
                    className={`rounded-2xl shadow-lg flex items-center justify-center w-full max-w-sm sm:max-w-md overflow-hidden mx-auto ${
                      idx % 2 === 1
                        ? "md:ml-auto md:mr-0"
                        : "md:mr-auto md:ml-0"
                    } ${idx === 0 ? "" : "bg-gray-50"} ${
                      idx === 3
                        ? "min-h-[280px] sm:min-h-[320px] md:min-h-[360px]"
                        : "min-h-[300px] sm:min-h-[340px] md:min-h-[380px]"
                    }`}
                    style={
                      idx === 0
                        ? { backgroundColor: "#EBF0EB" }
                        : idx === 1
                        ? { backgroundColor: "#FBFEFF" }
                        : idx === 4
                        ? { backgroundColor: "#E1E9E6" }
                        : {}
                    }
                  >
                    {idx === 3 ? (
                      <CoachImageCarousel />
                    ) : feature.image ? (
                      <Image
                        src={feature.image}
                        alt={feature.title}
                        width={400}
                        height={400}
                        className="w-full h-full object-contain p-2 md:p-3"
                        priority={false}
                        style={{ width: "100%", height: "100%" }}
                      />
                    ) : null}
                  </div>
                </div>
                {/* 텍스트 */}
                <div
                  className={`w-full md:w-1/2 flex flex-col justify-center text-center md:text-left px-4 md:px-8 ${
                    idx % 2 === 1 ? "md:order-1" : "md:order-2"
                  }`}
                >
                  <div className="flex flex-col justify-center h-full max-w-md mx-auto md:mx-0">
                    <h3 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900 mb-3 md:mb-4 leading-tight">
                      {feature.title}
                    </h3>
                    <p className="text-base sm:text-lg md:text-xl text-gray-600 mb-4 leading-relaxed break-words whitespace-pre-line">
                      {feature.description}
                    </p>
                  </div>
                </div>
              </div>
            </ScrollAnimationWrapper>
          ))}
        </div>
      </div>
    </section>
  );
};

export default OneClickFeatures;
