import { useEffect, useState } from "react";

interface ScrollToHeroButtonProps {
  scrollToHero: () => void;
  isHeroActive: boolean;
  isMobile: boolean;
}

const ScrollToHeroButton = ({
  scrollToHero,
  isHeroActive,
  isMobile,
}: ScrollToHeroButtonProps) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Hero가 비활성화되고 모바일이 아닐 때만 버튼 표시
    setIsVisible(!isHeroActive && !isMobile);
  }, [isHeroActive, isMobile]);

  if (!isVisible) return null;

  return (
    <button
      onClick={scrollToHero}
      className="fixed bottom-6 right-6 z-50 bg-green-600 hover:bg-green-700 text-white p-4 rounded-full shadow-lg transition-all duration-300 hover:scale-110 focus:outline-none focus:ring-4 focus:ring-green-300"
      aria-label="맨 위로 돌아가기"
    >
      <svg
        className="w-6 h-6"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M5 10l7-7m0 0l7 7m-7-7v18"
        />
      </svg>
    </button>
  );
};

export default ScrollToHeroButton;
