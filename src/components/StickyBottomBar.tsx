"use client";

import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";

interface StickyBottomBarProps {
  onCTAClick: (buttonId: string) => void;
}

const StickyBottomBar = ({ onCTAClick }: StickyBottomBarProps) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPercent =
        (window.scrollY / (document.body.scrollHeight - window.innerHeight)) *
        100;
      setIsVisible(scrollPercent > 0);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white shadow-lg border-t z-50 p-3 sm:p-4 safe-area-inset-bottom">
      <div className="container mx-auto">
        {/* 데스크톱 레이아웃 */}
        <div className="hidden sm:flex items-center justify-between">
          <div>
            <p className="text-lg font-semibold text-gray-900">
              사랑하는 부모님을 위한 스마트 돌봄 시작하기
            </p>
            <p className="text-sm text-gray-600">지금 신청하면 평생 무료</p>
          </div>
          <Button
            className="btn-primary bg-green-600 hover:bg-green-700 text-white rounded-full px-6 py-3 font-semibold whitespace-nowrap"
            onClick={() => onCTAClick("sticky_bottom")}
          >
            신청하기
          </Button>
        </div>

        {/* 모바일 레이아웃 */}
        <div className="sm:hidden flex flex-col space-y-3">
          <div className="text-center">
            <p className="text-base font-semibold text-gray-900 leading-tight">
              사랑하는 부모님을 위한 스마트 돌봄 시작하기
            </p>
            <p className="text-xs text-gray-600 mt-1">
              지금 신청하면 평생 무료
            </p>
          </div>
          <Button
            className="w-full bg-green-600 hover:bg-green-700 text-white rounded-full py-3 font-semibold text-sm"
            onClick={() => onCTAClick("sticky_bottom")}
          >
            신청하기
          </Button>
        </div>
      </div>
    </div>
  );
};

export default StickyBottomBar;
