
import { useEffect } from 'react';

// Google Analytics 4 tracking hook
export const useGoogleAnalytics = () => {
  useEffect(() => {
    // Initialize Google Analytics
    const script = document.createElement('script');
    script.async = true;
    script.src = 'https://www.googletagmanager.com/gtag/js?id=GA_MEASUREMENT_ID';
    document.head.appendChild(script);

    // Initialize gtag
    window.dataLayer = window.dataLayer || [];
    function gtag(...args: any[]) {
      window.dataLayer.push(arguments);
    }
    
    gtag('js', new Date());
    gtag('config', 'GA_MEASUREMENT_ID');

    // Fire page_view on first paint
    gtag('event', 'page_view', {
      page_title: '피노키오 - 스마트 시니어케어',
      page_location: window.location.href,
    });

    // Fire page_loaded when all images finish loading
    const handleImagesLoaded = () => {
      gtag('event', 'page_loaded', {
        event_category: 'perf',
        event_label: 'all_images_loaded'
      });
    };

    // Check if all images are loaded
    const images = document.querySelectorAll('img');
    let loadedCount = 0;
    
    if (images.length === 0) {
      handleImagesLoaded();
    } else {
      images.forEach((img) => {
        if (img.complete) {
          loadedCount++;
        } else {
          img.addEventListener('load', () => {
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

    // Scroll tracking
    let scroll25 = false, scroll50 = false, scroll75 = false, scroll100 = false;
    
    const handleScroll = () => {
      const scrollPercent = (window.scrollY / (document.body.scrollHeight - window.innerHeight)) * 100;
      
      if (scrollPercent >= 25 && !scroll25) {
        scroll25 = true;
        gtag('event', 'scroll_25', { event_category: 'engagement' });
      }
      if (scrollPercent >= 50 && !scroll50) {
        scroll50 = true;
        gtag('event', 'scroll_50', { event_category: 'engagement' });
      }
      if (scrollPercent >= 75 && !scroll75) {
        scroll75 = true;
        gtag('event', 'scroll_75', { event_category: 'engagement' });
      }
      if (scrollPercent >= 100 && !scroll100) {
        scroll100 = true;
        gtag('event', 'scroll_100', { event_category: 'engagement' });
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  // CTA click tracking function
  const trackCTAClick = (buttonId: string) => {
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', 'click_cta', {
        event_category: 'cta',
        event_label: buttonId,
      });
    }
  };

  return { trackCTAClick };
};

// Extend window interface for gtag
declare global {
  interface Window {
    dataLayer: any[];
    gtag: (...args: any[]) => void;
  }
}
