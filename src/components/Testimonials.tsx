import { Card, CardContent } from "@/components/ui/card";

type Testimonial = {
  name: string;
  position: string;
  comment: string;
  image: string;
};

const Testimonials = () => {
  const testimonials: Testimonial[] = [
    {
      name: "김O정",
      position: "직장인",
      comment:
        "출장이 많아 걱정이었는데, 피노키오 덕분에 엄마 상태를 매일 확인할 수 있어서 안심이 됩니다.",
      image:
        "https://images.unsplash.com/photo-1472396961693-142e6e269027?w=80&h=80&fit=crop&crop=face",
    },
    {
      name: "박O진",
      position: "직장인",
      comment:
        "아버지가 혼자 계시는데 AI 추천 활동으로 더 활기찬 생활을 하시게 되었어요. 건강 데이터도 정확하게 기록되어 돌봄에 도움이 됩니다.",
      image:
        "https://images.unsplash.com/photo-1582562124811-c09040d0a901?w=80&h=80&fit=crop&crop=face",
    },
    {
      name: "최O희",
      position: "주부",
      comment:
        "시어머니에게 매번 전화해서 돌보는게 부담스러웠는데, 더 이상 부담스럽지않아요.",
      image:
        "https://images.unsplash.com/photo-1490750967868-88aa4486c946?w=80&h=80&fit=crop",
    },
    {
      name: "이O연",
      position: "주부",
      comment:
        "부모님에게 무언가를 시키는 것이 부담스러웠는데, 피노키오는 설치만 해드려도 상태를 확인할 수 있어 참 든든합니다.",
      image:
        "https://images.unsplash.com/photo-1618160702438-9b02ab6515c9?w=80&h=80&fit=crop&crop=face",
    },
    {
      name: "강O수",
      position: "자영업자",
      comment:
        "아버지가 매일 집에만 계셨는데, 피노키오로 산책을 권유했더니 새로운 취미가 생기시고 사람들과 대화도 많아졌어요.",
      image:
        "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=80&h=80&fit=crop",
    },
    {
      name: "서O준",
      position: "보안 전문가",
      comment:
        "멀리 계신 부모님을 걱정하는 보호자로서, 그리고 보안 전문가로서도 피노키오의 개인정보 보호 기능은 매우 신뢰할 수 있습니다.",
      image:
        "https://images.unsplash.com/photo-1507591064344-4c6ce005b128?w=80&h=80&fit=crop&crop=face",
    },
    {
      name: "지O민",
      position: "노인일자리담당자",
      comment:
        "현장에서 어르신들을 만나며, 갑작스럽게 인지 장애 진단을 받는 경우를 종종 봅니다. 피노키오가 그런 상황을 미리 알아채는 데 도움 되길 기대합니다.",
      image:
        "https://images.unsplash.com/photo-1523177567729-8771749914c9?w=80&h=80&fit=crop&crop=face",
    },
    {
      name: "손O지",
      position: "사회복지사",
      comment:
        "현장에서 어르신들과 함께하며 조기 발견과 예방의 중요성을 절감해왔습니다. 피노키오는 그 가치를 잘 담아낸 꼭 필요한 서비스입니다.",
      image:
        "https://images.unsplash.com/photo-1551836022-deb4988cc6c0?w=80&h=80&fit=crop&crop=face",
    },
  ];

  // 컬럼별로 testimonial 분배 (3-3-2 배치)
  const leftColumnTestimonials = testimonials.slice(0, 3);
  const middleColumnTestimonials = testimonials.slice(3, 6);
  const rightColumnTestimonials = testimonials.slice(6, 8);

  const TestimonialCard = ({
    testimonial,
    index,
  }: {
    testimonial: Testimonial;
    index: number;
  }) => (
    <Card
      key={index}
      className="bg-white shadow-lg rounded-lg hover:shadow-xl transition-shadow duration-300 mb-4 md:mb-6"
    >
      <CardContent className="p-4 md:p-6">
        <div className="flex items-center mb-3 md:mb-4">
          <img
            src={testimonial.image}
            alt={testimonial.name}
            className="w-10 h-10 md:w-12 md:h-12 rounded-full mr-3 object-cover flex-shrink-0"
          />
          <div className="min-w-0">
            <h3 className="text-base md:text-lg font-bold text-gray-900 truncate">
              {testimonial.name}
            </h3>
            <p className="text-xs md:text-sm text-gray-600">
              {testimonial.position}
            </p>
          </div>
        </div>

        <p className="text-gray-700 leading-relaxed text-xs md:text-sm">
          {testimonial.comment}
        </p>
      </CardContent>
    </Card>
  );

  return (
    <section className="py-16 md:py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12 md:mb-16">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-3 md:mb-4 px-2">
            실제 테스터들의 후기
          </h2>
          <p className="text-lg sm:text-xl text-gray-600">
            피노키오와 함께했던 사람들의 진솔한 이야기
          </p>
        </div>

        {/* 모바일: 1컬럼, 태블릿 이상: 3컬럼 레이아웃 */}
        <div className="max-w-7xl mx-auto">
          {/* 모바일 레이아웃 */}
          <div className="block md:hidden">
            {testimonials.map((testimonial, index) => (
              <TestimonialCard
                key={index}
                testimonial={testimonial}
                index={index}
              />
            ))}
          </div>

          {/* 데스크탑 레이아웃 - 3컬럼 (3-3-2 배치) */}
          <div className="hidden md:flex gap-4 lg:gap-6">
            {/* 왼쪽 컬럼 - 3개 */}
            <div className="flex-1">
              {leftColumnTestimonials.map((testimonial, index) => (
                <TestimonialCard
                  key={index}
                  testimonial={testimonial}
                  index={index}
                />
              ))}
            </div>

            {/* 가운데 컬럼 - 3개 */}
            <div className="flex-1">
              {middleColumnTestimonials.map((testimonial, index) => (
                <TestimonialCard
                  key={index + 3}
                  testimonial={testimonial}
                  index={index + 3}
                />
              ))}
            </div>

            {/* 오른쪽 컬럼 - 2개 */}
            <div className="flex-1">
              {rightColumnTestimonials.map((testimonial, index) => (
                <TestimonialCard
                  key={index + 6}
                  testimonial={testimonial}
                  index={index + 6}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
