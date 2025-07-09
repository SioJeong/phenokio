"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { ScrollAnimationWrapper } from "./ScrollAnimationWrapper";

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
    title: "단순 관찰을 넘어, 깊이 있는 AI 분석",
    description:
      "전화, 문자, 외출 여부 등\n일상의 데이터를 AI가 다각도로 분석해,\n표면 너머의 건강 변화를 찾아냅니다.",
  },
  {
    image: "/detail-report.png",
    title: "보호자를 위한 맞춤형 건강 리포트",
    description:
      "주간·월간 활동과 건강 상태를 종합 분석하여,\n가족들이 쉽게 이해하고 안심할 수 있도록 \n피노키오가 정리해드립니다.",
  },

  {
    image: "/battery.png",
    title: "배터리 걱정 없이",
    description:
      "하루 종일 켜져 있어도 괜찮아요.\n어르신의 스마트폰을 고려했습니다.\n배터리 사용을 최소화해요.",
  },
];

const OneClickFeatures = ({}) => {
  return (
    <section className="px-4 md:px-12 py-16 md:py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="flex flex-col gap-12 md:gap-20 max-w-6xl mx-auto">
          {features.map((feature, idx) => (
            <ScrollAnimationWrapper
              key={idx}
              animationType="staggered"
              index={idx}
              threshold={0.05}
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
                        : idx === 3
                        ? { backgroundColor: "#E1E9E6" }
                        : {}
                    }
                  >
                    {feature.image ? (
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
