import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Check, Star } from "lucide-react";

interface PricingPlanProps {
  onCTAClick: (buttonId: string) => void;
}

const PricingPlan = ({ onCTAClick }: PricingPlanProps) => {
  const plans = [
    {
      id: "free",
      name: "무료 플랜",
      price: "0",
      period: "월",
      description: "기본적인 안심 케어 서비스",
      features: [
        { text: "매일 매일 건강 리포트 제공", icon: "check" },
        { text: "이상 징후 발생 시 알림", icon: "check" },
      ],
      popular: false,
      ctaText: "시작하기",
      badge: null,
      originalPrice: null,
    },
    {
      id: "monthly",
      name: "프리미엄 플랜",
      price: "14,900",
      period: "월",
      description: "완벽한 24시간 건강 파트너",
      features: [
        { text: "무료 플랜의 모든 기능", icon: "star" },
        { text: "어르신 개인 맞춤형 돌봄 추천", icon: "check" },
      ],
      popular: true,
      ctaText: "시작하기",
      badge: "인기",
      originalPrice: null,
    },
    {
      id: "yearly",
      name: "프리미엄 연간 결제",
      price: "143,040",
      period: "년",
      description: "1년 약정으로 더욱 경제적인 선택",
      features: [
        { text: "월 11,920원 (월간 플랜 대비 20% 할인)", icon: "check" },
        { text: "₩35,760 절약 효과", icon: "check" },
      ],
      popular: false,
      ctaText: "시작하기",
      badge: "20% 할인",
      originalPrice: null,
    },
  ];

  return (
    <div className="py-16 md:py-24 bg-gradient-to-b from-white to-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12 md:mb-16">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-3 md:mb-4 px-2">
            우리 부모님에게 딱 맞는 합리적인 가격
          </h2>
          <p className="text-lg sm:text-xl text-gray-600 max-w-2xl mx-auto">
            사용해보고 결정하세요
            <br />
            무료 플랜 사용 후 결제 가능
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 max-w-6xl mx-auto">
          {plans.map((plan) => (
            <Card
              key={plan.id}
              className={`relative flex flex-col h-full ${
                plan.popular ? "ring-2 ring-green-500" : ""
              } hover:shadow-lg transition-all duration-300`}
            >
              {plan.badge && (
                <Badge
                  className={`absolute -top-3 left-1/2 transform -translate-x-1/2 ${
                    plan.badge === "인기"
                      ? "bg-green-600 text-white"
                      : "bg-green-600 text-white"
                  }`}
                >
                  {plan.badge}
                </Badge>
              )}

              <CardHeader className="text-center pb-6 md:pb-8">
                <CardTitle className="text-xl md:text-2xl font-bold">
                  {plan.name}
                </CardTitle>
                <div className="mt-3 md:mt-4">
                  {plan.originalPrice && (
                    <div className="text-base md:text-lg text-gray-400 line-through mb-1">
                      ₩{plan.originalPrice}/{plan.period}
                    </div>
                  )}
                  <span className="text-3xl md:text-4xl font-bold text-gray-900">
                    {plan.price === "0" ? "무료" : `₩${plan.price}`}
                  </span>
                  {plan.price !== "0" && (
                    <span className="text-gray-600 text-sm md:text-base">
                      /{plan.period}
                    </span>
                  )}
                </div>
                <CardDescription className="mt-2 text-sm md:text-base">
                  {plan.description}
                </CardDescription>
              </CardHeader>

              <CardContent className="flex flex-col flex-1">
                <ul className="space-y-3 md:space-y-4 mb-6 md:mb-8 flex-1">
                  {plan.features.map((feature, index) => (
                    <li key={index} className="flex items-start">
                      {feature.icon === "star" ? (
                        <Star className="h-4 w-4 md:h-5 md:w-5 text-yellow-500 mr-2 md:mr-3 flex-shrink-0 fill-current mt-0.5" />
                      ) : (
                        <Check className="h-4 w-4 md:h-5 md:w-5 text-primary mr-2 md:mr-3 flex-shrink-0 mt-0.5" />
                      )}
                      <span className="text-gray-700 text-sm md:text-base leading-relaxed">
                        {feature.text}
                      </span>
                    </li>
                  ))}
                </ul>

                <Button
                  className={`w-full py-2.5 md:py-3 text-base md:text-lg font-semibold mt-auto ${
                    plan.popular
                      ? "bg-primary hover:bg-primary/90 text-white"
                      : "bg-gray-100 hover:bg-gray-200 text-gray-900"
                  }`}
                  onClick={() => onCTAClick(`pricing_${plan.id}`)}
                >
                  {plan.ctaText}
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Bottom CTA Section */}
        <div className="mt-16 bg-gradient-to-r from-yellow-400 to-yellow-500 rounded-xl p-6 text-center text-gray-900 max-w-2xl mx-auto">
          <h3 className="text-xl md:text-2xl font-bold mb-3">
            궁금한 점이 있으신가요?
          </h3>
          <p className="text-base md:text-lg mb-5">
            상담사가 카카오톡으로 친절하게 답변드립니다
          </p>
          <div className="flex justify-center">
            <Button
              size="lg"
              className="bg-gray-900 text-white hover:bg-zinc-900 font-semibold px-4 md:px-6 py-3 text-base md:text-lg flex items-center gap-2 rounded-full"
              onClick={() => {
                onCTAClick("kakao_consult");
                window.open("https://open.kakao.com/o/s69ThYEh", "_blank");
              }}
            >
              <svg
                className="w-4 h-4 md:w-5 md:h-5"
                viewBox="0 0 32 32"
                fill="currentColor"
              >
                <path d="M16 4C8.832 4 3 8.832 3 14.5c0 3.484 2.265 6.816 6 8.484l-1.5 5.516 6-3.25c1.164.484 2.414.75 3.5.75 7.168 0 13-4.832 13-10.5S23.168 4 16 4z" />
                <circle cx="11" cy="14.5" r="1.5" fill="#1a1a1a" />
                <circle cx="16" cy="14.5" r="1.5" fill="#1a1a1a" />
                <circle cx="21" cy="14.5" r="1.5" fill="#1a1a1a" />
              </svg>
              카카오톡 상담하기
            </Button>
          </div>
          <p className="text-sm mt-3 opacity-75">평일 10:00~19:00</p>
        </div>
      </div>
    </div>
  );
};

export default PricingPlan;
