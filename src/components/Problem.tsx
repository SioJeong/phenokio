import { Card, CardContent } from "@/components/ui/card";
import { MapPin, Phone, Heart } from "lucide-react";
import Image from "next/image";

interface ProblemProps {
  onCTAClick: (buttonId: string) => void;
}

const Problem = () => {
  return (
    <section className="py-16 md:py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12 md:mb-16">
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-4xl font-bold text-gray-900 leading-tight px-2">
              마음은 가까이 있지만
              <br />
              돌봄은 늘 곁에 있지 못합니다.
            </h2>
          </div>

          <div className="relative">
            <div className="grid lg:grid-cols-3 gap-8 lg:gap-20 items-center">
              <div className="flex justify-center lg:justify-end relative">
                <Card className="bg-white shadow-sm hover:shadow-md transition-shadow duration-200 w-full max-w-xs sm:w-48 sm:h-48 md:w-64 md:h-64 relative z-10">
                  <CardContent className="p-4 md:p-6 h-full flex flex-col justify-center">
                    <div className="text-center space-y-2 md:space-y-3">
                      <div className="w-12 h-12 md:w-16 md:h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto">
                        <MapPin className="text-primary w-6 h-6 md:w-8 md:h-8" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-900 text-sm md:text-base mb-1 md:mb-2">
                          자주 찾아뵙지 못하는 거리
                        </h3>
                        <p className="text-gray-600 text-xs md:text-sm">
                          멀리 계셔서 죄송한 마음만 커져요.
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              <div className="flex justify-center relative order-first lg:order-none">
                <div className="hidden lg:block absolute left-0 top-1/2 w-16 lg:w-20 h-0.5 bg-primary transform -translate-y-1/2 -translate-x-full z-0"></div>
                <div className="hidden lg:block absolute right-0 top-1/3 w-16 lg:w-20 h-0.5 bg-primary transform -translate-y-1/2 translate-x-full z-0"></div>
                <div className="hidden lg:block absolute right-0 bottom-1/3 w-16 lg:w-20 h-0.5 bg-primary transform translate-y-1/2 translate-x-full z-0"></div>

                <div className="relative w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-sm z-10">
                  <Image
                    src="/problem.png"
                    alt="걱정하는 보호자"
                    width={400}
                    height={400}
                    className="w-full h-auto rounded-lg shadow-lg object-cover"
                    priority={false}
                    style={{ width: "100%", height: "auto" }}
                  />
                </div>
              </div>

              <div className="flex lg:justify-start justify-center relative">
                <div className="space-y-4 lg:space-y-6 w-full max-w-xs sm:max-w-none">
                  <Card className="bg-white shadow-sm hover:shadow-md transition-shadow duration-200 w-full sm:w-48 sm:h-48 md:w-64 md:h-64 relative z-10 mx-auto sm:mx-0">
                    <CardContent className="p-4 md:p-6 h-full flex flex-col justify-center">
                      <div className="text-center space-y-2 md:space-y-3">
                        <div className="w-12 h-12 md:w-16 md:h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto">
                          <Phone className="text-primary w-6 h-6 md:w-8 md:h-8" />
                        </div>
                        <div>
                          <h3 className="font-semibold text-gray-900 text-sm md:text-base mb-1 md:mb-2">
                            바쁜 일상 속 정신 없는 하루
                          </h3>
                          <p className="text-gray-600 text-xs md:text-sm">
                            전화 한 통도 쉽지 않을 때가 있어요.
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="bg-white shadow-sm hover:shadow-md transition-shadow duration-200 w-full sm:w-48 sm:h-48 md:w-64 md:h-64 relative z-10 mx-auto sm:mx-0">
                    <CardContent className="p-4 md:p-6 h-full flex flex-col justify-center">
                      <div className="text-center space-y-2 md:space-y-3">
                        <div className="w-12 h-12 md:w-16 md:h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto">
                          <Heart className="text-primary w-6 h-6 md:w-8 md:h-8" />
                        </div>
                        <div>
                          <h3 className="font-semibold text-gray-900 text-sm md:text-base mb-1 md:mb-2">
                            늘 건강하시길 바라는 마음
                          </h3>
                          <p className="text-gray-600 text-xs md:text-sm">
                            곁에 없어도 잘 지내셨으면 해요.
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </div>
          </div>

          {/* CTA Section */}
          <div className="text-center mt-12 md:mt-16">
            <p className="text-lg md:text-2xl text-gray-600 mb-6 md:mb-8">
              이런 마음, 피노키오가 해결해드릴게요.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Problem;
