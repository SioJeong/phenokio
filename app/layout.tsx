import type { Metadata } from "next";
import Script from "next/script";
import { GoogleAnalytics } from "@next/third-parties/google";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { ReactQueryProvider } from "./providers/react-query-provider";
import "./globals.css";

export const metadata: Metadata = {
  title: "멀리 있어도 곁에 있는 돌봄, 피노키오",
  description: "부모님의 일상을 케어하는 스마트 시니어케어 서비스",
  authors: [{ name: "피노키오" }],
  keywords: ["시니어케어", "노인케어", "부모님케어", "스마트케어", "헬스케어"],
  openGraph: {
    title: "멀리 있어도 곁에 있는 돌봄, 피노키오",
    description: "부모님의 일상을 케어하는 스마트 시니어케어 서비스",
    type: "website",
    url: "https://phenokio.com",
    locale: "ko_KR",
  },
  twitter: {
    card: "summary_large_image",
    title: "멀리 있어도 곁에 있는 돌봄, 피노키오",
    description: "부모님의 일상을 케어하는 스마트 시니어케어 서비스",
  },
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ko">
      <head>
        <link rel="preload" href="/hero.png" as="image" />
        <link rel="preload" href="/hero-mobile.png" as="image" />
        <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.9/dist/web/static/pretendard.min.css"
        />
      </head>
      <body>
        <ReactQueryProvider>
          <TooltipProvider>
            <Toaster />
            <Sonner />
            {children}
          </TooltipProvider>
        </ReactQueryProvider>
        <GoogleAnalytics gaId="G-Y6KWGRY9S3" />

        {/* Meta Pixel Code */}
        <Script
          id="meta-pixel"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              !function(f,b,e,v,n,t,s)
              {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
              n.callMethod.apply(n,arguments):n.queue.push(arguments)};
              if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
              n.queue=[];t=b.createElement(e);t.async=!0;
              t.src=v;s=b.getElementsByTagName(e)[0];
              s.parentNode.insertBefore(t,s)}(window, document,'script',
              'https://connect.facebook.net/en_US/fbevents.js');
              fbq('init', '746986244438268');
              fbq('track', 'PageView');
            `,
          }}
        />

        {/* Meta Pixel Noscript */}
        <noscript>
          <img
            height="1"
            width="1"
            style={{ display: "none" }}
            src="https://www.facebook.com/tr?id=746986244438268&ev=PageView&noscript=1"
            alt=""
          />
        </noscript>
      </body>
    </html>
  );
}
