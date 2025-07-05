import { Timer, PiggyBank, TrendingDown } from "lucide-react";
import { Button } from "@/components/ui/button";

interface EarlyDetectionProps {
  onCTAClick: (buttonId: string) => void;
}

const EarlyDetection = ({ onCTAClick }: EarlyDetectionProps) => {
  return (
    <section className="py-16 md:py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center">
          <div className="mb-10 md:mb-12">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-4 md:mb-6 px-2 leading-tight">
              진짜 돌봄은, <br className="sm:hidden " />
              <span className="text-primary">작은 변화도 놓치지 않는 것</span>
              입니다
            </h2>
            <p className="text-lg sm:text-xl text-gray-700 leading-relaxed px-2">
              부모님의 하루, 작은 이상도 살펴드릴 수 있다면
              <br />그 순간이 바로{" "}
              <span className="font-semibold text-primary">
                가장 따뜻한 돌봄의 시작
              </span>
              입니다
            </p>
          </div>

          {/* 치매 환자수 및 비용 추계 그래프 */}
          <div className="mb-12 md:mb-16 w-full">
            <h4 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900 mb-2 text-center px-2 leading-tight">
              조기에 알면, 돌봄도 달라집니다
            </h4>
            <p className="text-base sm:text-lg text-gray-600 mb-6 md:mb-8 text-center px-2">
              건강의 작은 신호를 놓치지 않을 때 예방과 대응,
              <br className="sm:hidden " />
              모두 달라집니다
            </p>

            <div className="mb-0 md:mb-8 w-full">
              {/* 통합 그래프 */}
              <div className="bg-black rounded-2xl w-full shadow-sm border border-gray-800 overflow-hidden">
                <div className="mb-0 md:mb-6 w-full">
                  {/* 그래프 영역 */}
                  <div className="relative h-60 sm:h-80 md:h-[28rem] bg-black rounded-lg w-full overflow-x-auto flex justify-center">
                    <svg viewBox="0 0 920 350" className="max-w-full h-full">
                      {/* 범례 - 좌측 상단 */}
                      <rect
                        x="95"
                        y="20"
                        width="160"
                        height="64"
                        fill="black"
                        fillOpacity="0.95"
                        stroke="#6b7280"
                        strokeWidth="1"
                        rx="6"
                      />
                      <rect
                        x="105"
                        y="35"
                        width="20"
                        height="16"
                        fill="#dc2626"
                        rx="3"
                      />
                      <text
                        x="133"
                        y="47"
                        fontSize="16"
                        fill="white"
                        fontWeight="400"
                      >
                        치매환자수
                      </text>
                      <circle cx="115" cy="65" r="5" fill="white" />
                      <text
                        x="133"
                        y="70"
                        fontSize="16"
                        fill="white"
                        fontWeight="400"
                      >
                        관리비용
                      </text>

                      {/* 막대 그래프 (환자수) - 빨간색 톤, 둥근 모서리, 아래쪽 정렬 */}
                      {/* 2017년: 70만명 - 기준점 */}
                      <rect
                        x="95"
                        y="261"
                        width="70"
                        height="49"
                        fill="#fee2e2"
                        opacity="0.9"
                        rx="6"
                      />
                      {/* 2020년: 84만명 */}
                      <rect
                        x="205"
                        y="252"
                        width="70"
                        height="58"
                        fill="#fecaca"
                        opacity="0.9"
                        rx="6"
                      />
                      {/* 2025년: 107만명 */}
                      <rect
                        x="315"
                        y="235"
                        width="70"
                        height="75"
                        fill="#f87171"
                        opacity="0.9"
                        rx="6"
                      />
                      {/* 2030년: 136만명 */}
                      <rect
                        x="425"
                        y="215"
                        width="70"
                        height="95"
                        fill="#ef4444"
                        opacity="0.9"
                        rx="6"
                      />
                      {/* 2040년: 217만명 */}
                      <rect
                        x="535"
                        y="159"
                        width="70"
                        height="151"
                        fill="#dc2626"
                        opacity="0.9"
                        rx="6"
                      />
                      {/* 2050년: 302만명 */}
                      <rect
                        x="645"
                        y="100"
                        width="70"
                        height="210"
                        fill="#b91c1c"
                        opacity="0.9"
                        rx="6"
                      />
                      {/* 2060년: 330만명 */}
                      <rect
                        x="755"
                        y="80"
                        width="70"
                        height="230"
                        fill="#991b1b"
                        opacity="0.9"
                        rx="6"
                      />

                      {/* 선 그래프 (비용) - 하얀색 */}
                      <polyline
                        points="130,270 240,265 350,256 460,244 570,207 680,160 790,130"
                        stroke="white"
                        strokeWidth="5"
                        fill="none"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />

                      {/* 데이터 포인트 - 하얀색 */}
                      <circle cx="130" cy="270" r="6" fill="white" />
                      <circle cx="240" cy="265" r="6" fill="white" />
                      <circle cx="350" cy="256" r="6" fill="white" />
                      <circle cx="460" cy="244" r="6" fill="white" />
                      <circle cx="570" cy="207" r="6" fill="white" />
                      <circle cx="680" cy="160" r="6" fill="white" />
                      <circle cx="790" cy="130" r="6" fill="white" />

                      {/* X축 연도 라벨 */}
                      <text
                        x="130"
                        y="335"
                        textAnchor="middle"
                        fontSize="18"
                        fill="white"
                        fontWeight="700"
                      >
                        2017년
                      </text>
                      <text
                        x="240"
                        y="335"
                        textAnchor="middle"
                        fontSize="18"
                        fill="white"
                        fontWeight="700"
                      >
                        2020년
                      </text>
                      <text
                        x="350"
                        y="335"
                        textAnchor="middle"
                        fontSize="18"
                        fill="white"
                        fontWeight="700"
                      >
                        2025년
                      </text>
                      <text
                        x="460"
                        y="335"
                        textAnchor="middle"
                        fontSize="18"
                        fill="white"
                        fontWeight="700"
                      >
                        2030년
                      </text>
                      <text
                        x="570"
                        y="335"
                        textAnchor="middle"
                        fontSize="18"
                        fill="white"
                        fontWeight="700"
                      >
                        2040년
                      </text>
                      <text
                        x="680"
                        y="335"
                        textAnchor="middle"
                        fontSize="18"
                        fill="white"
                        fontWeight="700"
                      >
                        2050년
                      </text>
                      <text
                        x="790"
                        y="335"
                        textAnchor="middle"
                        fontSize="18"
                        fill="white"
                        fontWeight="700"
                      >
                        2060년
                      </text>

                      {/* 막대 위 데이터 라벨 - 통합 형식 */}
                      {/* 2017년 */}
                      <text
                        x="130"
                        y="246"
                        textAnchor="middle"
                        fontSize="16"
                        fill="white"
                        fontWeight="700"
                      >
                        70만명
                      </text>
                      <text
                        x="130"
                        y="226"
                        textAnchor="middle"
                        fontSize="14"
                        fill="#d1d5db"
                        fontWeight="600"
                      >
                        14.2조원
                      </text>

                      {/* 2020년 */}
                      <text
                        x="240"
                        y="237"
                        textAnchor="middle"
                        fontSize="16"
                        fill="white"
                        fontWeight="700"
                      >
                        84만명
                      </text>
                      <text
                        x="240"
                        y="217"
                        textAnchor="middle"
                        fontSize="14"
                        fill="#d1d5db"
                        fontWeight="600"
                      >
                        17.3조원
                      </text>

                      {/* 2025년 */}
                      <text
                        x="350"
                        y="220"
                        textAnchor="middle"
                        fontSize="16"
                        fill="white"
                        fontWeight="700"
                      >
                        107만명
                      </text>
                      <text
                        x="350"
                        y="200"
                        textAnchor="middle"
                        fontSize="14"
                        fill="#d1d5db"
                        fontWeight="600"
                      >
                        23.8조원
                      </text>

                      {/* 2030년 */}
                      <text
                        x="460"
                        y="200"
                        textAnchor="middle"
                        fontSize="16"
                        fill="white"
                        fontWeight="700"
                      >
                        136만명
                      </text>
                      <text
                        x="460"
                        y="180"
                        textAnchor="middle"
                        fontSize="14"
                        fill="#d1d5db"
                        fontWeight="600"
                      >
                        31.8조원
                      </text>

                      {/* 2040년 */}
                      <text
                        x="570"
                        y="144"
                        textAnchor="middle"
                        fontSize="16"
                        fill="white"
                        fontWeight="700"
                      >
                        217만명
                      </text>
                      <text
                        x="570"
                        y="124"
                        textAnchor="middle"
                        fontSize="14"
                        fill="#d1d5db"
                        fontWeight="600"
                      >
                        56.9조원
                      </text>

                      {/* 2050년 */}
                      <text
                        x="680"
                        y="85"
                        textAnchor="middle"
                        fontSize="16"
                        fill="white"
                        fontWeight="700"
                      >
                        302만명
                      </text>
                      <text
                        x="680"
                        y="65"
                        textAnchor="middle"
                        fontSize="14"
                        fill="#d1d5db"
                        fontWeight="600"
                      >
                        88.6조원
                      </text>

                      {/* 2060년 */}
                      <text
                        x="790"
                        y="65"
                        textAnchor="middle"
                        fontSize="16"
                        fill="white"
                        fontWeight="700"
                      >
                        330만명
                      </text>
                      <text
                        x="790"
                        y="45"
                        textAnchor="middle"
                        fontSize="14"
                        fill="#d1d5db"
                        fontWeight="600"
                      >
                        109조원
                      </text>
                    </svg>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-6 md:mt-8 text-center">
              <div className="text-lg md:text-xl font-semibold text-gray-900 mb-2 md:mb-3 px-2">
                돌봄의 시간과 비용, 앞으로 더 늘어납니다
              </div>
              <div className="text-sm md:text-base text-gray-600 px-2">
                지금이야말로, 조기 발견과 예방이 꼭 필요한 순간입니다
              </div>
            </div>
          </div>

          <h4 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900 text-center px-2 leading-tight">
            조기 발견 하나로
            <br />
            막대한 시간과 비용을 줄일 수 있습니다.
          </h4>
          <div className="text-sm md:text-base text-gray-600 px-2 mb-6 md:mb-4">
            (치매 초기 약물 치료 시)
          </div>
          <div className="mb-12 md:mb-16">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 md:gap-8 mb-6 md:mb-8">
              <div className="flex flex-col items-center p-4 md:p-8 bg-primary/5 rounded-2xl border border-primary/10">
                <div className="w-16 h-16 md:w-20 md:h-20 bg-primary/10 rounded-full flex items-center justify-center mb-4 md:mb-6">
                  <Timer className="w-8 h-8 md:w-10 md:h-10 text-black" />
                </div>
                <div className="text-2xl md:text-4xl font-bold text-black mb-2 md:mb-3">
                  7,900시간
                </div>
                <div className="text-sm md:text-lg text-gray-700 font-medium text-center">
                  돌봄 시간 절약
                </div>
              </div>

              <div className="flex flex-col items-center p-4 md:p-8 bg-primary/5 rounded-2xl border border-primary/10">
                <div className="w-16 h-16 md:w-20 md:h-20 bg-primary/10 rounded-full flex items-center justify-center mb-4 md:mb-6">
                  <PiggyBank className="w-8 h-8 md:w-10 md:h-10 text-black" />
                </div>
                <div className="text-2xl md:text-4xl font-bold text-black mb-2 md:mb-3">
                  6,300만원
                </div>
                <div className="text-sm md:text-lg text-gray-700 font-medium text-center">
                  경제적 비용 절감
                </div>
              </div>

              <div className="flex flex-col items-center p-4 md:p-8 bg-primary/5 rounded-2xl border border-primary/10">
                <div className="w-16 h-16 md:w-20 md:h-20 bg-primary/10 rounded-full flex items-center justify-center mb-4 md:mb-6">
                  <TrendingDown className="w-8 h-8 md:w-10 md:h-10 text-black" />
                </div>
                <div className="text-2xl md:text-4xl font-bold text-black mb-2 md:mb-3">
                  55% 감소
                </div>
                <div className="text-sm md:text-lg text-gray-700 font-medium text-center">
                  요양시설 입소율
                </div>
              </div>
            </div>

            <div className="text-center sm:text-right mt-4 md:mt-6">
              <div className="text-xs text-gray-400">출처: 중앙치매센터</div>
            </div>
          </div>

          <div className="bg-gradient-to-r from-primary to-primary/80 rounded-2xl p-6 md:p-8 text-white">
            <h3 className="text-lg sm:text-xl md:text-2xl font-bold mb-3 md:mb-4 leading-tight">
              조기 발견은 부모님의 건강뿐 아니라
              <br />
              <span className="text-primary-foreground/80">
                가족의 삶까지 지키는 시작점
              </span>
              입니다
            </h3>
            <p className="text-base sm:text-md md:text-xl font-medium text-primary-foreground/90">
              건강 변화에 귀 기울이는 돌봄을 시작해보세요.
            </p>
            <div className="text-center mt-8 md:mt-12">
              <Button
                className="bg-white hover:bg-gray-50 text-primary border-2 border-white rounded-full px-6 md:px-8 py-3 md:py-4 text-base md:text-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-200"
                onClick={() => onCTAClick("cta_mid")}
              >
                지금 시작하기
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default EarlyDetection;
