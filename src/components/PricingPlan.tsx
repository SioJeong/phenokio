import { Button } from "@/components/ui/button";
import { Check, Star } from "lucide-react";

interface PricingPlanProps {
  onCTAClick: (buttonId: string) => void;
}

const PricingPlan = ({ onCTAClick }: PricingPlanProps) => {
  const features = [
    "24시간 건강 모니터링",
    "매일 매일 건강 리포트 제공",
    "어르신 개인 맞춤형 돌봄 추천",
    "이상 징후 발생 시 알림",
  ];

  return (
    <div className="py-16 md:py-24 bg-gradient-to-b bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12 md:mb-16">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-3 md:mb-4 px-2">
            지금 등록하면 평생 무료입니다.
          </h2>
          <p className="text-lg sm:text-xl text-gray-600 max-w-2xl mx-auto">
            모든 기능을 무료로,
            <br />
            우리 부모님에게 딱 맞는 서비스인지
            <br className="md:hidden" />
            확인해보세요.
          </p>
        </div>

        {/* Main CTA Section */}
        <div className="bg-gradient-to-r from-primary to-primary/80 rounded-2xl p-6 md:p-8 text-center text-white max-w-2xl mx-auto mb-12">
          <div className="mb-6">
            <h3 className="text-xl sm:text-2xl md:text-3xl font-bold mb-4">
              시작은 무료, 안심은 오래갑니다.
            </h3>
          </div>

          <div className="mb-8">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-lg mx-auto">
              {features.map((feature, index) => (
                <div key={index} className="flex items-center">
                  <Check className="h-5 w-5 mr-3 flex-shrink-0" />
                  <span className="text-base font-semibold md:text-lg">
                    {feature}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <Button
            size="lg"
            className="bg-white text-primary hover:bg-gray-100 font-semibold px-8 py-4 text-lg md:text-lg rounded-full"
            onClick={() => onCTAClick("pricing_free_start")}
          >
            평생 무료로 이용하기
          </Button>
        </div>

        {/* Bottom CTA Section */}
        <div className="bg-gradient-to-r from-yellow-400 to-yellow-500 rounded-xl p-6 text-center text-gray-900 max-w-2xl mx-auto">
          <h3 className="text-xl md:text-2xl font-bold mb-3">
            궁금한 점이 있으신가요?
          </h3>
          <p className="text-base md:text-lg mb-5">
            상담사가 카카오톡으로 친절하게 답변드립니다.
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
          <p className="text-sm mt-3 opacity-75">평일 10:00 ~ 19:00</p>
        </div>
      </div>
    </div>
  );
};

export default PricingPlan;
