"use client";

import { useEffect } from "react";

// Meta Pixel 이벤트 매개변수 타입 정의
interface PixelEventParams {
  content_name?: string;
  content_category?: string;
  content_type?: string;
  value?: number;
  currency?: string;
  status?: boolean;
  [key: string]: unknown;
}

export const useMetaPixel = () => {
  useEffect(() => {
    // SSR 환경에서는 실행하지 않음
    if (typeof window === "undefined") return;

    // Meta Pixel이 로드될 때까지 대기
    const checkFbq = () => {
      if (typeof window.fbq !== "undefined") {
        // 세션 중 첫 방문 확인
        const sessionKey = "meta_pixel_page_view_sent";
        const hasSeenPage = sessionStorage.getItem(sessionKey);

        if (!hasSeenPage) {
          // 첫 방문만 PageView 이벤트 발생
          window.fbq("track", "PageView", {
            content_name: "피노키오 - 스마트 시니어케어",
            content_category: "homepage",
            source_url: window.location.href,
          });

          // ViewContent 이벤트 (랜딩페이지 조회)
          window.fbq("track", "ViewContent", {
            content_name: "피노키오 메인페이지",
            content_category: "landing_page",
            content_type: "service_page",
            value: 1,
            currency: "KRW",
          });

          // 세션 동안 추적 방지
          sessionStorage.setItem(sessionKey, "true");
        }
      } else {
        // Meta Pixel이 아직 로드되지 않았다면 100ms 후 재시도
        setTimeout(checkFbq, 100);
      }
    };

    checkFbq();
  }, []);

  // CTA 클릭 추적 함수 (리드 생성 의도)
  const trackCTAClick = (buttonId: string, params?: PixelEventParams) => {
    if (typeof window !== "undefined" && window.fbq) {
      window.fbq("track", "Lead", {
        content_name: `CTA_${buttonId}`,
        content_category: "button_click",
        value: 10, // 리드 가치 설정
        currency: "KRW",
        ...params,
      });
    }
  };

  // 폼 제출 추적 함수 (베타 테스터 신청 완료)
  const trackFormSubmit = (formName: string, params?: PixelEventParams) => {
    if (typeof window !== "undefined" && window.fbq) {
      window.fbq("track", "CompleteRegistration", {
        content_name: `Form_${formName}`,
        content_category: "form_submission",
        value: 50, // 회원가입/문의 가치 설정
        currency: "KRW",
        status: true,
        ...params,
      });
    }
  };

  // 커스텀 이벤트 추적 함수 (모달 열기/닫기 등 인게이지먼트)
  const trackCustomEvent = (eventName: string, params?: PixelEventParams) => {
    if (typeof window !== "undefined" && window.fbq) {
      window.fbq("trackCustom", eventName, {
        content_category: "custom_event",
        ...params,
      });
    }
  };

  return {
    trackCTAClick,
    trackFormSubmit,
    trackCustomEvent,
  };
};

// Window 객체에 fbq 타입 확장
declare global {
  interface Window {
    fbq: (command: string, ...args: unknown[]) => void;
    _fbq: typeof window.fbq;
  }
}
