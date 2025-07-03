import { useEffect, useRef, useState, useCallback } from "react";

interface UseFullPageScrollOptions {
  sectionIds: string[];
  threshold?: number;
  animationDuration?: number;
}

export const useFullPageScroll = ({
  sectionIds,
  threshold = 100,
  animationDuration = 800,
}: UseFullPageScrollOptions) => {
  const [currentSectionIndex, setCurrentSectionIndex] = useState(0);
  const [isScrolling, setIsScrolling] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [isHeroActive, setIsHeroActive] = useState(true);
  const scrollAccumulator = useRef(0);
  const lastScrollTime = useRef(Date.now());

  // 화면 크기 감지
  useEffect(() => {
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkScreenSize();
    window.addEventListener("resize", checkScreenSize);

    return () => {
      window.removeEventListener("resize", checkScreenSize);
    };
  }, []);

  const scrollToHero = useCallback(() => {
    if (isMobile) return;

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });

    setTimeout(() => {
      setIsHeroActive(true);
      setCurrentSectionIndex(0);
      scrollAccumulator.current = 0;
    }, 500);
  }, [isMobile]);

  const scrollToSection = useCallback(
    (index: number) => {
      if (index < 0 || index >= sectionIds.length || isScrolling || isMobile)
        return;

      setIsScrolling(true);
      const targetElement = document.getElementById(sectionIds[index]);

      if (targetElement) {
        targetElement.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });

        setCurrentSectionIndex(index);

        // Hero에서 벗어나면 일반 스크롤 활성화
        if (index > 0) {
          setTimeout(() => {
            setIsHeroActive(false);
          }, animationDuration / 2);
        }

        setTimeout(() => {
          setIsScrolling(false);
          scrollAccumulator.current = 0;
        }, animationDuration);
      }
    },
    [sectionIds, isScrolling, animationDuration, isMobile]
  );

  const handleWheel = useCallback(
    (e: WheelEvent) => {
      // 모바일이거나 Hero가 비활성 상태면 일반 스크롤
      if (isMobile || !isHeroActive) return;

      e.preventDefault();

      if (isScrolling) return;

      const now = Date.now();
      const timeDiff = now - lastScrollTime.current;

      const direction = e.deltaY > 0 ? 1 : -1;

      // Hero에서 위로 스크롤할 때는 무시
      if (direction < 0 && currentSectionIndex === 0) {
        return;
      }

      if (timeDiff > 150) {
        scrollAccumulator.current = 0;
      }

      scrollAccumulator.current += Math.abs(e.deltaY);
      lastScrollTime.current = now;

      if (scrollAccumulator.current >= threshold) {
        const nextIndex = currentSectionIndex + direction;
        scrollToSection(nextIndex);
      }
    },
    [
      currentSectionIndex,
      isScrolling,
      threshold,
      scrollToSection,
      isMobile,
      isHeroActive,
    ]
  );

  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      // 모바일이거나 Hero가 비활성 상태면 키보드 내비게이션 비활성화
      if (isScrolling || isMobile || !isHeroActive) return;

      switch (e.key) {
        case "ArrowDown":
        case "PageDown":
        case " ": // 스페이스바
          e.preventDefault();
          scrollToSection(currentSectionIndex + 1);
          break;
        case "ArrowUp":
        case "PageUp":
          e.preventDefault();
          scrollToSection(currentSectionIndex - 1);
          break;
        case "Home":
          e.preventDefault();
          scrollToSection(0);
          break;
      }
    },
    [currentSectionIndex, isScrolling, scrollToSection, isMobile, isHeroActive]
  );

  useEffect(() => {
    // 모바일에서는 이벤트 리스너 등록하지 않음
    if (isMobile) {
      document.body.style.overflow = "auto";
      return;
    }

    // Hero가 활성 상태일 때만 풀페이지 스크롤 이벤트 등록
    if (isHeroActive) {
      const preventScroll = (e: Event) => {
        e.preventDefault();
      };

      window.addEventListener("wheel", handleWheel, { passive: false });
      window.addEventListener("keydown", handleKeyDown);
      window.addEventListener("scroll", preventScroll, { passive: false });
      document.body.style.overflow = "hidden";

      return () => {
        window.removeEventListener("wheel", handleWheel);
        window.removeEventListener("keydown", handleKeyDown);
        window.removeEventListener("scroll", preventScroll);
      };
    } else {
      // Hero가 비활성 상태일 때는 일반 스크롤
      document.body.style.overflow = "auto";
    }
  }, [handleWheel, handleKeyDown, isMobile, isHeroActive]);

  return {
    currentSectionIndex,
    scrollToSection,
    scrollToHero,
    isScrolling,
    isMobile,
    isHeroActive,
  };
};
