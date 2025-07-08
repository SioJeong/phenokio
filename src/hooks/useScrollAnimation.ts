import { useEffect, useRef, useState } from "react";

export const useScrollAnimation = (
  threshold: number = 0.1,
  rootMargin: string = "0px 0px -100px 0px"
) => {
  const [isVisible, setIsVisible] = useState(false);
  const [hasTriggered, setHasTriggered] = useState(false);
  const elementRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // 이미 애니메이션이 트리거되었다면 observer를 생성하지 않음
    if (hasTriggered) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasTriggered) {
          setIsVisible(true);
          setHasTriggered(true);
          // 한 번 나타나면 observer를 해제 (성능 최적화)
          observer.disconnect();
        }
      },
      {
        threshold,
        rootMargin,
      }
    );

    const currentElement = elementRef.current;
    if (currentElement) {
      observer.observe(currentElement);
    }

    return () => {
      if (currentElement) {
        observer.unobserve(currentElement);
      }
    };
  }, [threshold, rootMargin, hasTriggered]);

  return { elementRef, isVisible };
};
