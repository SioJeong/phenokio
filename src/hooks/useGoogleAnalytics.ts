"use client";

import { useEffect } from "react";

// GA4 CTA 이벤트 매개변수 타입 정의
interface GAEventParams {
  event_category?: string;
  event_label?: string;
  value?: number;
  promotion_id?: string;
  promotion_name?: string;
  creative_name?: string;
  creative_slot?: string;
  page_location?: string;
  page_title?: string;
  [key: string]: unknown;
}

// Google Analytics 4 tracking hook for Next.js Third Party
export const useGoogleAnalytics = () => {
  useEffect(() => {
    // SSR 환경에서는 실행하지 않음
    if (typeof window === "undefined") return;

    // 광고 소스 추적을 위한 UTM 파라미터 추출
    const getUTMParams = () => {
      const urlParams = new URLSearchParams(window.location.search);
      return {
        utm_source: urlParams.get("utm_source") || "(direct)",
        utm_medium: urlParams.get("utm_medium") || "(none)",
        utm_campaign: urlParams.get("utm_campaign") || "(not set)",
        utm_content: urlParams.get("utm_content") || "(not set)",
        utm_term: urlParams.get("utm_term") || "(not set)",
        gclid: urlParams.get("gclid") || null, // Google Ads 클릭 ID
        fbclid: urlParams.get("fbclid") || null, // Facebook 클릭 ID
      };
    };

    // 페이지 체류 시간 추적
    const startTime = Date.now();

    // Next.js Third Party에서 제공하는 gtag가 로드될 때까지 대기
    const checkGtag = () => {
      if (typeof window.gtag !== "undefined") {
        const utmParams = getUTMParams();

        // 개발환경에서도 이벤트가 전송되도록 설정
        window.gtag("config", "G-6NKH4E4GWH", {
          debug_mode: true,
          send_page_view: false, // 자동 페이지뷰 중복 방지
          allow_enhanced_conversions: true,
          allow_google_signals: true,
          cookie_domain:
            window.location.hostname === "localhost" ? "none" : "auto",
          cookie_flags: "SameSite=None;Secure",
        });

        // 세션 중 첫 방문 확인
        const sessionKey = "ga4_page_view_sent";
        const hasSeenPage = sessionStorage.getItem(sessionKey);

        if (!hasSeenPage) {
          // 첫 방문만 page_view 이벤트 발생
          window.gtag("event", "page_view", {
            page_title: "피노키오 - 스마트 시니어케어",
            page_location: window.location.href,
            content_group1: "homepage", // 콘텐츠 그룹 설정
            custom_parameter_1: "landing_page", // 커스텀 파라미터
            // 광고 소스 추적
            campaign_source: utmParams.utm_source,
            campaign_medium: utmParams.utm_medium,
            campaign_name: utmParams.utm_campaign,
            campaign_content: utmParams.utm_content,
            campaign_term: utmParams.utm_term,
            // 클릭 ID 추적 (광고 플랫폼 연동)
            ...(utmParams.gclid && { gclid: utmParams.gclid }),
            ...(utmParams.fbclid && { fbclid: utmParams.fbclid }),
          });

          // 세션 동안 추적 방지
          sessionStorage.setItem(sessionKey, "true");
        }

        // 새로고침은 별도 이벤트로 추적
        if (hasSeenPage) {
          window.gtag("event", "page_refresh", {
            event_category: "engagement",
            page_location: window.location.href,
            value: 1, // 재방문 가치
          });
        }

        // Fire page_complete when all images finish loading
        const handleImagesLoaded = () => {
          window.gtag("event", "page_complete", {
            event_category: "engagement",
            event_label: "all_images_loaded",
            value: 1, // 전환 가치 설정
          });
        };

        // Check if all images are loaded
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

        // Enhanced scroll tracking with GA4 standard events
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
            window.gtag("event", "scroll_depth_25", {
              event_category: "engagement",
              page_location: window.location.href,
              value: 1, // 스크롤 engagement 가치
            });
          }
          if (scrollPercent >= 50 && !scroll50) {
            scroll50 = true;
            window.gtag("event", "scroll_depth_50", {
              event_category: "engagement",
              page_location: window.location.href,
              value: 2, // 더 높은 engagement 가치
            });
          }
          if (scrollPercent >= 75 && !scroll75) {
            scroll75 = true;
            window.gtag("event", "scroll_depth_75", {
              event_category: "engagement",
              page_location: window.location.href,
              value: 3, // 높은 관심도 가치
            });
          }
          if (scrollPercent >= 90 && !scroll90) {
            scroll90 = true;
            window.gtag("event", "scroll_depth_90", {
              event_category: "engagement",
              page_location: window.location.href,
              value: 5, // 매우 높은 engagement 가치
            });
          }
        };

        window.addEventListener("scroll", handleScroll);

        // 페이지 이탈 시 체류 시간 추적
        const trackTimeOnPage = () => {
          const timeSpent = Math.round((Date.now() - startTime) / 1000); // 초 단위

          if (timeSpent > 30) {
            // 30초 이상 체류 시만 추적
            window.gtag("event", "time_on_page", {
              event_category: "engagement",
              event_label: "quality_visit",
              value: timeSpent,
              custom_parameter:
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
        // gtag가 아직 로드되지 않았으면 다시 시도
        setTimeout(checkGtag, 100);
      }
    };

    checkGtag();
  }, []);

  // GA4 표준 이벤트 트래킹 함수들

  // CTA 클릭 트래킹 - 광고 전환 최적화
  const trackCTAClick = (buttonId: string, params?: GAEventParams) => {
    if (typeof window !== "undefined" && window.gtag) {
      window.gtag("event", `cta_click_${buttonId}`, {
        event_category: "conversion",
        button_location: buttonId,
        page_location: window.location.href,
        page_title: document.title,
        value: 10, // CTA 클릭 전환 가치 (가장 높음)
        currency: "KRW", // 통화 설정
        ...params,
      });
    }
  };

  return {
    trackCTAClick,
  };
};

// Window interface 확장 (gtag는 Next.js Third Party에서 제공)
declare global {
  interface Window {
    gtag: (command: string, ...args: unknown[]) => void;
  }
}
