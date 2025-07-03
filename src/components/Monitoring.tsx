import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";
import { Lock } from "lucide-react";

interface MonitoringProps {
  onCTAClick: (buttonId: string) => void;
}

const Monitoring = ({ onCTAClick }: MonitoringProps) => {
  const monitoringKeywords = [
    "수면 패턴",
    "운동량",
    "정서 상태",
    "인지 능력",
    "삶의 새로움",
    "사회적 교류",
    "규칙적인 생활 리듬",
  ];

  const [currentKeywordIndex, setCurrentKeywordIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setIsAnimating(true);

      setTimeout(() => {
        setCurrentKeywordIndex(
          (prev) => (prev + 1) % monitoringKeywords.length
        );
        setIsAnimating(false);
      }, 150); // 애니메이션 지속 시간의 절반
    }, 2000); // 2초마다 변경

    return () => clearInterval(interval);
  }, [monitoringKeywords.length]);

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-4">
            피노키오가 세심하게 살피는
            <br />
            부모님의{" "}
            <span className="inline-block relative">
              <span
                className={`inline-block text-primary transition-all duration-300 ease-in-out ${
                  isAnimating
                    ? "opacity-0 transform scale-95 translate-y-2"
                    : "opacity-100 transform scale-100 translate-y-0"
                }`}
                style={{
                  minWidth: "200px",
                  textAlign: "center",
                  whiteSpace: "nowrap",
                }}
              >
                {monitoringKeywords[currentKeywordIndex]}
              </span>
            </span>
          </h2>
          <p className="text-md md:text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
            일상 속 소중한 순간들을 놓치지 않고 <br />
            스마트한 인사이트로 건강한 돌봄을 제안합니다
          </p>
        </div>

        {/* 보안 및 프라이버시 섹션 */}
        <div className="mt-20">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
            {/* 첫 번째 카드 - 사생활 보호 */}
            <Card className="p-6 md:p-8 border-2 border-gray-100 hover:border-primary/20 transition-colors">
              <CardContent className="p-0">
                <div className="flex items-start space-x-4 md:space-x-6">
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 md:w-16 md:h-16 bg-primary/10 rounded-2xl flex items-center justify-center">
                      <svg
                        className="w-6 h-6 md:w-8 md:h-8 text-primary"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                        />
                      </svg>
                    </div>
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl md:text-2xl font-bold text-gray-900 mb-2 md:mb-3">
                      사생활은
                      <br />
                      수집하지 않아요
                    </h3>
                    <p className="text-gray-600 text-sm md:text-lg leading-relaxed">
                      통화 내용이나 문자처럼 사적인 정보는 절대 수집하지
                      않습니다.
                      <br className="hidden md:block" />
                      안심하고 사용하셔도 됩니다.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* 두 번째 카드 - 데이터 보안 */}
            <Card className="p-6 md:p-8 border-2 border-gray-100 hover:border-primary/20 transition-colors">
              <CardContent className="p-0">
                <div className="flex items-start space-x-4 md:space-x-6">
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 md:w-16 md:h-16 bg-primary/10 rounded-2xl flex items-center justify-center">
                      <svg
                        className="w-6 h-6 md:w-8 md:h-8 text-primary"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.031 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                        />
                      </svg>
                    </div>
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl md:text-2xl font-bold text-gray-900 mb-2 md:mb-3">
                      데이터는
                      <br />
                      유출되지 않아요
                    </h3>
                    <p className="text-gray-600 text-sm md:text-lg leading-relaxed">
                      모든 정보는 철저한 보안 시스템으로 보호되어 외부에
                      유출되지 않습니다.
                      <br className="hidden md:block" />
                      가족의 소중한 정보, 저희가 지킵니다.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* 세 번째 카드 - 암호화 */}
            <Card className="p-6 md:p-8 border-2 border-gray-100 hover:border-primary/20 transition-colors">
              <CardContent className="p-0">
                <div className="flex items-start space-x-4 md:space-x-6">
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 md:w-16 md:h-16 bg-primary/10 rounded-2xl flex items-center justify-center">
                      <svg
                        className="w-6 h-6 md:w-8 md:h-8 text-primary"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                        />
                      </svg>
                    </div>
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl md:text-2xl font-bold text-gray-900 mb-2 md:mb-3">
                      기록은
                      <br />
                      안전하게 지켜져요
                    </h3>
                    <p className="text-gray-600 text-sm md:text-lg leading-relaxed">
                      모든 데이터는 강력한 암호화 기술로 안전하게 보호됩니다.
                      <br className="hidden md:block" />
                      기록되는 모든 과정이 안전하게 관리됩니다.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* 보안 강조 메시지 */}
          <div className="text-center mt-12">
            <div className="inline-flex items-center space-x-4 md:space-x-6 bg-gray-100 text-gray-800 px-4 md:px-20 py-3 rounded-lg max-w-4xl mx-auto">
              <div className="w-12 h-12 md:w-16 md:h-16 bg-white rounded-2xl flex items-center justify-center flex-shrink-0">
                <Lock className="w-6 h-6 md:w-8 md:h-8 text-primary" />
              </div>
              <span className="font-semibold text-sm md:text-base">
                피노키오는 부모님의 정보를 안전하게,
                <br />
                AI가 학습하지 않도록 지킵니다.
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Monitoring;
