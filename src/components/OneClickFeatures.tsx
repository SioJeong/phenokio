import { Card, CardContent } from "@/components/ui/card";

const features = [
  {
    image: "/day-report.png",
    title: "매일매일 건강 상태 모니터링",
    description:
      "생활 패턴, 정서 상태, 사회적 교류 등 노년기 삶의 질에 중요한 핵심 건강 지표들을 자동으로 감지하고 기록합니다.",
  },
  {
    image: "/detail-report.png",
    title: "상세하고 체계적인 보호자 안심 리포트",
    description:
      "주간/월간 활동 패턴과 건강 상태를 종합 분석하여 가족들이 안심할 수 있는 체계적인 리포트를 제공합니다.",
  },
  {
    images: [
      "/coach1.png",
      "/coach3.png",
      "/coach2.png",
      "/coach4.png",
      "/coach5.png",
    ],
    title: "어르신의 마음을 읽는 스마트 돌봄 코치",
    description:
      "요즘 어르신이 어떻게 지내고 있는지 다 알려드려요. 어떤말을 꺼내야 할지 모르겠다면 피노키오가 도와드릴게요.",
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

  return (
    <div className="relative overflow-hidden w-full h-auto">
      <style>{`
        .scroll-wrapper {
          display: flex;
          width: fit-content;
          animation: infiniteScroll 12s linear infinite;
        }
        @media (max-width: 768px) {
          .scroll-wrapper {
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
      <div className="scroll-wrapper">
        <div className="image-group">
          {coachImages.map((image, index) => (
            <div key={`group1-${index}`} className="flex-shrink-0 mr-6">
              <img
                src={image}
                alt={`Coach ${index + 1}`}
                className="w-auto h-auto max-w-none object-contain max-h-60"
              />
            </div>
          ))}
        </div>
        <div className="image-group">
          {coachImages.map((image, index) => (
            <div key={`group2-${index}`} className="flex-shrink-0 mr-6">
              <img
                src={image}
                alt={`Coach ${index + 1}`}
                className="w-auto h-auto max-w-none object-contain max-h-60"
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

const OneClickFeatures = () => {
  return (
    <section className="py-16 md:py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12 md:mb-16">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-3 md:mb-4 px-2">
            딱 한 번의 설치로 OK
          </h2>
          <p className="text-lg sm:text-xl text-gray-600 mb-2 md:mb-4">
            특별한 무언가를 하지 않아도
          </p>
          <p className="text-base sm:text-lg text-gray-500">
            부모님의 일상과 함께 해드립니다.
          </p>
        </div>

        <div className="flex flex-col gap-12 md:gap-20 max-w-6xl mx-auto">
          {features.map((feature, idx) => (
            <div
              key={idx}
              className="flex flex-col md:flex-row items-center gap-6 md:gap-4"
            >
              {/* 이미지(아이콘) */}
              <div
                className={`flex-shrink-0 w-full md:w-1/2 px-2 md:px-8 ${
                  idx % 2 === 1 ? "md:order-2" : "md:order-1"
                }`}
              >
                <div
                  className={`rounded-2xl shadow-lg flex items-center justify-center w-full max-w-sm sm:max-w-md h-64 sm:h-80 md:h-96 overflow-hidden mx-auto ${
                    idx % 2 === 1 ? "md:ml-auto md:mr-0" : "md:mr-auto md:ml-0"
                  } ${idx === 0 ? "" : "bg-gray-50"}`}
                  style={idx === 0 ? { backgroundColor: "#EBF0EB" } : {}}
                >
                  {idx === 2 ? (
                    <CoachImageCarousel />
                  ) : (
                    <img
                      src={feature.image}
                      alt={feature.title}
                      className="w-full h-full object-contain p-3 md:p-4"
                    />
                  )}
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
                  <p className="text-base sm:text-lg md:text-xl text-gray-600 mb-4 leading-relaxed break-words">
                    {feature.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default OneClickFeatures;
