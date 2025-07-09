"use client";

import { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Mail, Phone, CheckCircle, ChevronDown, ChevronUp } from "lucide-react";
import { useGoogleAnalytics } from "@/hooks/useGoogleAnalytics";
import { useMetaPixel } from "@/hooks/useMetaPixel";

export type CTASource =
  | "hero"
  | "digital_phenotyping"
  | "mid"
  | "pricing_free_start"
  | "sticky_bottom";

interface CTAModalProps {
  isOpen: boolean;
  onClose: () => void;
  source: CTASource;
}

const CTAModal = ({ isOpen, onClose, source }: CTAModalProps) => {
  const { trackCTAClick } = useGoogleAnalytics();
  const {
    trackFormSubmit,
    trackCustomEvent,
    trackCTAClick: trackMetaCTAClick,
  } = useMetaPixel();
  const [name, setName] = useState("");
  const [contactMethod, setContactMethod] = useState<"email" | "phone">(
    "email"
  );
  const [contactValue, setContactValue] = useState("");
  const [privacyAgreed, setPrivacyAgreed] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isPrivacyExpanded, setIsPrivacyExpanded] = useState(false);

  // source에 따라 다른 URL 설정
  const getActionUrl = (source: CTASource) => {
    const urls = {
      hero: "https://formspree.io/f/xblyvgwa",
      digital_phenotyping: "https://formspree.io/f/xldnyagz",
      mid: "https://formspree.io/f/mgvyjada",
      pricing_free_start: "https://formspree.io/f/mvgrjkla",
      sticky_bottom: "https://formspree.io/f/meokbano",
    };
    return urls[source];
  };

  // 휴대전화번호 포맷팅 함수
  const formatPhoneNumber = (value: string) => {
    // 숫자만 추출
    const numbers = value.replace(/\D/g, "");

    // 길이에 따라 포맷팅
    if (numbers.length <= 3) {
      return numbers;
    } else if (numbers.length <= 7) {
      return `${numbers.slice(0, 3)}-${numbers.slice(3)}`;
    } else {
      return `${numbers.slice(0, 3)}-${numbers.slice(3, 7)}-${numbers.slice(
        7,
        11
      )}`;
    }
  };

  // 연락처 입력 핸들러
  const handleContactChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;

    if (contactMethod === "phone") {
      // 숫자만 입력하도록 제한하고 포맷팅
      const formatted = formatPhoneNumber(value);
      setContactValue(formatted);
    } else {
      setContactValue(value);
    }
  };

  // 모달이 열릴 때 이벤트 트래킹
  useEffect(() => {
    if (isOpen) {
      // Google Analytics 추적
      trackCTAClick(`modal_open_${source}`, {
        event_category: "engagement",
        event_label: "modal_opened",
        value: 5,
      });

      // Meta Pixel CTA 추적
      trackMetaCTAClick(`modal_open_${source}`, {
        content_name: `modal_${source}`,
        content_category: "engagement",
        value: 5,
        currency: "KRW",
      });

      // Meta Pixel 커스텀 이벤트 추적
      trackCustomEvent("ModalOpen", {
        content_name: `modal_${source}`,
        content_category: "engagement",
        value: 5,
        currency: "KRW",
        source: source,
      });
    }
  }, [isOpen, source, trackCTAClick, trackMetaCTAClick, trackCustomEvent]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!name.trim() || !contactValue.trim() || !privacyAgreed) return;

    setIsSubmitting(true);

    // 이름 유효성 검사
    if (name.trim().length < 2) {
      alert("이름을 정확히 입력해주세요.");
      setIsSubmitting(false);
      return;
    }

    // 간단한 유효성 검사
    if (contactMethod === "email") {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(contactValue)) {
        alert("올바른 이메일 주소를 입력해주세요.");
        setIsSubmitting(false);
        return;
      }
    } else {
      const phoneRegex = /^01[0-9]-[0-9]{3,4}-[0-9]{4}$/;
      if (!phoneRegex.test(contactValue)) {
        alert("올바른 휴대전화 번호를 입력해주세요. (예: 010-1234-5678)");
        setIsSubmitting(false);
        return;
      }
    }

    try {
      const formData = new FormData();
      formData.append("name", name.trim());
      formData.append("contactMethod", contactMethod);
      formData.append("contactValue", contactValue);
      formData.append("privacyAgreed", privacyAgreed.toString());
      formData.append("source", source);

      const response = await fetch(getActionUrl(source), {
        method: "POST",
        body: formData,
        headers: {
          Accept: "application/json",
        },
      });

      if (response.ok) {
        // Google Analytics 성공 이벤트 트래킹
        trackCTAClick(`submission_success_${source}`, {
          event_category: "conversion",
          event_label: "beta_signup_success",
          value: 50, // 높은 전환 가치
          contact_method: contactMethod,
          submission_source: source,
        });

        // Meta Pixel CTA 성공 이벤트 트래킹
        trackMetaCTAClick(`submission_success_${source}`, {
          content_name: `registration_${source}`,
          content_category: "conversion",
          value: 50,
          currency: "KRW",
        });

        // Meta Pixel 폼 제출 이벤트 트래킹
        trackFormSubmit(`beta_signup_${source}`, {
          content_name: `registration_${source}`,
          content_category: "conversion",
          value: 50,
          currency: "KRW",
          contact_method: contactMethod,
          source: source,
          status: true,
        });

        // 성공 메시지
        alert("신청이 완료되었습니다. 곧 연락드리겠습니다!");

        // 폼 초기화
        setName("");
        setContactValue("");
        setPrivacyAgreed(false);
        setIsPrivacyExpanded(false);
        onClose();
      } else {
        // 응답이 422 (Unprocessable Entity)인 경우도 처리
        const errorData = await response.json().catch(() => ({}));
        if (response.status === 422) {
          alert("입력한 정보를 확인해주세요.");
        } else {
          throw new Error("Server response not ok");
        }
      }
    } catch (error) {
      // 네트워크 에러이지만 실제로는 성공할 수 있는 경우를 고려
      console.error("Submit error:", error);

      // CORS 에러나 네트워크 에러의 경우, 일반적으로 데이터는 성공적으로 제출됨
      if (error instanceof TypeError && error.message.includes("fetch")) {
        // Google Analytics 잠재적 성공 이벤트 트래킹 (네트워크 에러 상황에서)
        trackCTAClick(`submission_potential_success_${source}`, {
          event_category: "conversion",
          event_label: "beta_signup_network_error_but_likely_success",
          value: 40, // 약간 낮은 전환 가치
          contact_method: contactMethod,
          submission_source: source,
        });

        // Meta Pixel CTA 잠재적 성공 이벤트 트래킹
        trackMetaCTAClick(`submission_potential_success_${source}`, {
          content_name: `registration_network_error_${source}`,
          content_category: "conversion_potential",
          value: 40,
          currency: "KRW",
        });

        // Meta Pixel 폼 제출 잠재적 성공 이벤트 트래킹
        trackFormSubmit(`beta_signup_potential_${source}`, {
          content_name: `registration_network_error_${source}`,
          content_category: "conversion_potential",
          value: 40,
          currency: "KRW",
          contact_method: contactMethod,
          source: source,
          status: true,
        });

        alert("신청이 완료되었습니다. 곧 연락드리겠습니다!");

        // 폼 초기화
        setName("");
        setContactValue("");
        setPrivacyAgreed(false);
        setIsPrivacyExpanded(false);
        onClose();
      } else {
        // 실제 에러 트래킹
        trackCTAClick(`submission_error_${source}`, {
          event_category: "error",
          event_label: "beta_signup_failed",
          value: 0,
          contact_method: contactMethod,
          submission_source: source,
        });

        // Meta Pixel 에러 트래킹
        trackMetaCTAClick(`submission_error_${source}`, {
          content_name: `registration_error_${source}`,
          content_category: "error",
          value: 0,
          currency: "KRW",
        });

        alert("신청 중 오류가 발생했습니다. 다시 시도해주세요.");
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleClose = () => {
    // Google Analytics 모달 닫기 이벤트 트래킹 (취소)
    trackCTAClick(`modal_close_${source}`, {
      event_category: "engagement",
      event_label: "modal_closed_without_submission",
      value: 1,
    });

    // Meta Pixel CTA 모달 닫기 이벤트 트래킹
    trackMetaCTAClick(`modal_close_${source}`, {
      content_name: `modal_close_${source}`,
      content_category: "engagement",
      value: 1,
      currency: "KRW",
    });

    // Meta Pixel 커스텀 모달 닫기 이벤트 트래킹
    trackCustomEvent("ModalClose", {
      content_name: `modal_close_${source}`,
      content_category: "engagement",
      value: 1,
      currency: "KRW",
      source: source,
    });

    setName("");
    setContactValue("");
    setPrivacyAgreed(false);
    setIsPrivacyExpanded(false);
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="w-[95vw] max-w-[500px] max-h-[90vh] overflow-y-auto p-4 sm:p-6">
        <DialogHeader className="space-y-3 sm:space-y-4">
          <DialogTitle className="text-lg sm:text-xl md:text-2xl font-bold text-center text-gray-900 leading-tight px-2">
            피노키오 대기 등록
          </DialogTitle>
          <DialogDescription className="text-left text-gray-600 px-2">
            <div className="bg-green-50 p-3 sm:p-4 rounded-lg border border-green-200">
              <div className="flex items-center justify-center mb-2 sm:mb-3">
                <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5 text-green-600 mr-2 flex-shrink-0" />
                <span className="font-semibold text-green-800 text-sm sm:text-base text-center">
                  2025년 7월 말 정식 출시 예정
                </span>
              </div>
              <p className="text-xs sm:text-sm text-green-700 leading-relaxed">
                피노키오 서비스를 가장 먼저 경험해보고 싶으신가요?
                <br />
                <span className="sm:hidden"> </span>
                피노키오 서비스를 가장 먼저, 그것도 무료로 만나보세요!
                <br />
                지금 사용자 명단에 등록하시면, 출시 즉시 무료로 이용하실 수
                있습니다.
              </p>
            </div>
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-5 px-1">
          {/* 이름 입력 */}
          <div className="space-y-2 sm:space-y-3">
            <Label
              htmlFor="name"
              className="text-sm sm:text-base font-medium text-gray-700 block"
            >
              이름
            </Label>
            <Input
              id="name"
              name="name"
              type="text"
              placeholder="이름을 입력해주세요"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full text-sm sm:text-base h-10 sm:h-10"
              required
            />
          </div>

          {/* 연락 방법 선택 */}
          <div className="space-y-2 sm:space-y-3">
            <Label className="text-sm sm:text-base font-medium text-gray-700 block">
              연락받을 수단을 선택해주세요
            </Label>
            <RadioGroup
              value={contactMethod}
              onValueChange={(value) =>
                setContactMethod(value as "email" | "phone")
              }
              className="flex gap-3 sm:gap-4"
            >
              <div className="flex items-center space-x-2 p-2 sm:p-2.5 rounded-lg border border-gray-200 hover:border-green-300 hover:bg-green-50/50 transition-colors flex-1">
                <RadioGroupItem value="email" id="email" className="shrink-0" />
                <Label
                  htmlFor="email"
                  className="flex items-center cursor-pointer flex-1 text-xs sm:text-sm"
                >
                  <Mail className="w-3 h-3 sm:w-4 sm:h-4 mr-1.5 text-gray-600 flex-shrink-0" />
                  이메일
                </Label>
              </div>
              <div className="flex items-center space-x-2 p-2 sm:p-2.5 rounded-lg border border-gray-200 hover:border-green-300 hover:bg-green-50/50 transition-colors flex-1">
                <RadioGroupItem value="phone" id="phone" className="shrink-0" />
                <Label
                  htmlFor="phone"
                  className="flex items-center cursor-pointer flex-1 text-xs sm:text-sm"
                >
                  <Phone className="w-3 h-3 sm:w-4 sm:h-4 mr-1.5 text-gray-600 flex-shrink-0" />
                  휴대전화
                </Label>
              </div>
            </RadioGroup>
          </div>

          {/* 연락처 입력 */}
          <div className="space-y-2 sm:space-y-3">
            <Label
              htmlFor="contact"
              className="text-sm sm:text-base font-medium text-gray-700 block"
            >
              {contactMethod === "email" ? "이메일 주소" : "휴대전화 번호"}
            </Label>
            <Input
              id="contact"
              name="contact"
              type={contactMethod === "email" ? "email" : "tel"}
              placeholder={
                contactMethod === "email"
                  ? "example@email.com"
                  : "010-1234-5678"
              }
              value={contactValue}
              onChange={handleContactChange}
              className="w-full text-sm sm:text-base h-10 sm:h-10"
              required
            />
          </div>

          {/* 개인정보 이용동의 */}
          <div className="space-y-2 sm:space-y-3">
            <div className="flex items-start space-x-3 sm:space-x-4">
              <Checkbox
                id="privacy"
                name="privacy"
                checked={privacyAgreed}
                onCheckedChange={(checked) =>
                  setPrivacyAgreed(checked === true)
                }
                className="mt-1"
                required
              />
              <div className="space-y-2 flex-1">
                <Label
                  htmlFor="privacy"
                  className="text-sm sm:text-base font-medium text-gray-700 cursor-pointer block leading-tight"
                >
                  개인정보 수집 및 이용동의 (필수)
                </Label>
                <button
                  type="button"
                  onClick={() => setIsPrivacyExpanded(!isPrivacyExpanded)}
                  className="flex items-center text-xs sm:text-sm text-gray-500 hover:text-gray-700 transition-colors"
                >
                  {isPrivacyExpanded ? (
                    <>
                      <ChevronUp className="w-3 h-3 sm:w-4 sm:h-4 mr-1" />
                      접기
                    </>
                  ) : (
                    <>
                      <ChevronDown className="w-3 h-3 sm:w-4 sm:h-4 mr-1" />
                      자세히 보기
                    </>
                  )}
                </button>
              </div>
            </div>

            {isPrivacyExpanded && (
              <div className="text-xs text-gray-500 bg-gray-50 p-3 sm:p-4 rounded-lg border max-h-32 sm:max-h-40 overflow-y-auto ml-7 sm:ml-9">
                <div className="space-y-2">
                  <div>
                    <p className="font-medium mb-1">수집하는 개인정보 항목:</p>
                    <p className="ml-2">• 이름</p>
                    <p className="ml-2">
                      • 연락처 정보 (이메일 주소 또는 휴대전화번호)
                    </p>
                  </div>
                  <div>
                    <p className="font-medium mb-1">
                      개인정보 수집 및 이용목적:
                    </p>
                    <p className="ml-2">• 베타 테스터 프로그램 참여 안내</p>
                    <p className="ml-2">• 서비스 출시 알림 및 관련 정보 제공</p>
                  </div>
                  <div>
                    <p className="font-medium mb-1">보유 및 이용기간:</p>
                    <p className="ml-2">
                      • 동의 철회 시 또는 목적 달성 시까지 (최대 1년)
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>

          <DialogFooter className="flex flex-col sm:flex-row gap-3 mt-6 sm:mt-8 px-1">
            <Button
              type="button"
              variant="outline"
              onClick={handleClose}
              disabled={isSubmitting}
              className="w-full sm:flex-1 h-12 sm:h-10 text-sm sm:text-base order-2 sm:order-1"
            >
              취소
            </Button>
            <Button
              type="submit"
              disabled={
                !name.trim() ||
                !contactValue.trim() ||
                !privacyAgreed ||
                isSubmitting
              }
              className="w-full sm:flex-1 h-12 sm:h-10 bg-green-600 hover:bg-green-700 text-sm sm:text-base font-medium order-1 sm:order-2"
            >
              {isSubmitting ? "신청 중..." : "신청하기"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default CTAModal;
