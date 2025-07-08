import React from "react";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { cn } from "@/lib/utils";

interface ScrollAnimationWrapperProps {
  children: React.ReactNode;
  className?: string;
  animationType?: "default" | "delayed" | "long" | "staggered";
  threshold?: number;
  rootMargin?: string;
  index?: number;
}

export const ScrollAnimationWrapper = ({
  children,
  className,
  animationType = "default",
  threshold = 0.1,
  rootMargin = "0px 0px -50px 0px",
  index = 0,
}: ScrollAnimationWrapperProps) => {
  const { elementRef, isVisible } = useScrollAnimation(threshold, rootMargin);

  const getAnimationClass = () => {
    switch (animationType) {
      case "delayed":
        return "scroll-fade-in-delayed";
      case "long":
        return "scroll-fade-in-long";
      case "staggered":
        return "scroll-fade-in-staggered";
      default:
        return "scroll-fade-in";
    }
  };

  return (
    <div
      ref={elementRef}
      className={cn(getAnimationClass(), isVisible && "visible", className)}
      style={
        animationType === "staggered"
          ? ({
              "--animation-delay": `${index * 0.2}s`,
            } as React.CSSProperties)
          : undefined
      }
    >
      {children}
    </div>
  );
};
