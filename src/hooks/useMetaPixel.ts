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
  button_location?: string;
  scroll_depth?: number;
  time_spent?: number;
  [key: string]: unknown;
}

export const useMetaPixel = () => {
  useEffect(() => {
    // SSR 환경에서는 실행하지 않음
    if (typeof window === "undefined") return;

    // 페이지 체류 시간 추적을 위한 시작 시간
    const startTime = Date.now();

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

        // 새로고침은 별도 커스텀 이벤트로 추적
        if (hasSeenPage) {
          window.fbq("trackCustom", "PageRefresh", {
            content_category: "engagement",
            source_url: window.location.href,
            value: 1,
          });
        }

        // 모든 이미지 로딩 완료 시 이벤트 발생
        const handleImagesLoaded = () => {
          window.fbq("trackCustom", "PageComplete", {
            content_category: "engagement",
            content_name: "all_images_loaded",
            value: 1,
          });
        };

        // 이미지 로딩 체크
        const images = document.querySelectorAll("img");
        let loadedCount = 0;

        if (images.length === 0) {
          handleImagesLoaded();
        } else {
          images.forEach((img) => {
            if (img.complete) {
              loadedCount++;
            } else {
              img.addEventListener("load", () => {
                loadedCount++;
                if (loadedCount === images.length) {
                  handleImagesLoaded();
                }
              });
            }
          });

          if (loadedCount === images.length) {
            handleImagesLoaded();
          }
        }

        // 스크롤 깊이 추적
        let scroll25 = false,
          scroll50 = false,
          scroll75 = false,
          scroll90 = false;

        const handleScroll = () => {
          const scrollTop = window.scrollY;
          const documentHeight = Math.max(
            document.body.scrollHeight,
            document.documentElement.scrollHeight,
            document.body.offsetHeight,
            document.documentElement.offsetHeight,
            document.body.clientHeight,
            document.documentElement.clientHeight
          );
          const windowHeight = window.innerHeight;
          const scrollPercent =
            (scrollTop / (documentHeight - windowHeight)) * 100;

          if (scrollPercent >= 25 && !scroll25) {
            scroll25 = true;
            window.fbq("trackCustom", "ScrollDepth25", {
              content_category: "engagement",
              scroll_depth: 25,
              value: 1,
            });
          }
          if (scrollPercent >= 50 && !scroll50) {
            scroll50 = true;
            window.fbq("trackCustom", "ScrollDepth50", {
              content_category: "engagement",
              scroll_depth: 50,
              value: 2,
            });
          }
          if (scrollPercent >= 75 && !scroll75) {
            scroll75 = true;
            window.fbq("trackCustom", "ScrollDepth75", {
              content_category: "engagement",
              scroll_depth: 75,
              value: 3,
            });
          }
          if (scrollPercent >= 90 && !scroll90) {
            scroll90 = true;
            window.fbq("trackCustom", "ScrollDepth90", {
              content_category: "engagement",
              scroll_depth: 90,
              value: 5,
            });
          }
        };

        window.addEventListener("scroll", handleScroll);

        // 페이지 이탈 시 체류 시간 추적
        const trackTimeOnPage = () => {
          const timeSpent = Math.round((Date.now() - startTime) / 1000); // 초 단위

          if (timeSpent > 30) {
            // 30초 이상 체류 시만 추적
            window.fbq("trackCustom", "TimeOnPage", {
              content_category: "engagement",
              content_name: "quality_visit",
              time_spent: timeSpent,
              value: timeSpent,
              visit_quality:
                timeSpent < 60
                  ? "short_visit"
                  : timeSpent < 180
                  ? "medium_visit"
                  : "long_visit",
            });
          }
        };

        // 페이지 이탈 이벤트 추적
        window.addEventListener("beforeunload", trackTimeOnPage);
        window.addEventListener("pagehide", trackTimeOnPage);

        return () => {
          window.removeEventListener("scroll", handleScroll);
          window.removeEventListener("beforeunload", trackTimeOnPage);
          window.removeEventListener("pagehide", trackTimeOnPage);
        };
      } else {
        // Meta Pixel이 아직 로드되지 않았다면 100ms 후 재시도
        setTimeout(checkFbq, 100);
      }
    };

    checkFbq();
  }, []);

  // CTA 클릭 추적 함수 (리드 생성 의도) - GA4와 동일한 버튼 ID 추적 추가
  const trackCTAClick = (buttonId: string, params?: PixelEventParams) => {
    if (typeof window !== "undefined" && window.fbq) {
      // 기존 Lead 이벤트 유지
      window.fbq("track", "Lead", {
        content_name: `CTA_${buttonId}`,
        content_category: "button_click",
        button_location: buttonId,
        value: 10, // 리드 가치 설정
        currency: "KRW",
        ...params,
      });

      // 추가로 구체적인 CTA 클릭 커스텀 이벤트 (GA4와 일치)
      window.fbq("trackCustom", `CTAClick_${buttonId}`, {
        content_category: "conversion",
        button_location: buttonId,
        content_name: `CTA Button - ${buttonId}`,
        value: 10,
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
