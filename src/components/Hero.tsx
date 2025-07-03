import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";

interface HeroProps {
  onCTAClick: (buttonId: string) => void;
}

const Hero = ({ onCTAClick }: HeroProps) => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkScreenSize();
    window.addEventListener("resize", checkScreenSize);

    return () => window.removeEventListener("resize", checkScreenSize);
  }, []);

  const backgroundImage = isMobile ? "/hero-mobile.png" : "/hero.png";

  return (
    <section
      className="fullpage-hero relative flex items-center justify-center px-4 sm:px-6 lg:px-8"
      style={{
        backgroundImage: `url('${backgroundImage}')`,
        backgroundSize: "cover",
        backgroundPosition: isMobile ? "center top" : "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      {/* Dark overlay for text readability */}
      <div className="absolute inset-0 bg-black/40 sm:bg-black/35"></div>

      <div className="container mx-auto text-center relative z-10 py-6 sm:py-8 md:py-12">
        <div className="max-w-4xl mx-auto px-4">
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold text-white mb-3 sm:mb-4 md:mb-6 leading-tight drop-shadow-lg">
            멀리 있어도 이어지는
            <br />
            우리 가족의 하루
          </h1>
          <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-white/90 mb-2 sm:mb-3 md:mb-4 drop-shadow-md">
            부모님의 작은 변화까지 살피고,
          </p>
          <p className="text-sm sm:text-base md:text-lg lg:text-xl text-white/80 mb-2 sm:mb-3 md:mb-4 drop-shadow-md">
            따뜻한 응원과 알림으로 행복한 일상을 이어 드려요.
          </p>
          <p className="text-sm sm:text-base md:text-lg lg:text-xl text-white/80 mb-6 sm:mb-8 md:mb-10 drop-shadow-md">
            오늘도 부모님께 웃음을 선물하세요.
          </p>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-4 sm:bottom-6 md:bottom-8 left-1/2 transform -translate-x-1/2 z-10">
        <div className="flex flex-col items-center text-white/80 animate-bounce">
          <svg
            className="w-5 h-5 sm:w-6 sm:h-6 animate-pulse"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 14l-7 7m0 0l-7-7m7 7V3"
            />
          </svg>
        </div>
      </div>
    </section>
  );
};

export default Hero;
