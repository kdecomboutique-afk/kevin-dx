import type { Metadata } from "next";
import { Inter, Plus_Jakarta_Sans } from "next/font/google";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import CustomCursor from "@/components/ui/CustomCursor";
import CookieBanner from "@/components/ui/CookieBanner";
import ChatWidgetLoader from "@/components/chatbot/ChatWidgetLoader";
import PageTransition from "@/components/animations/PageTransition";
import SiteTrackerLoader from "@/components/analytics/SiteTrackerLoader";
import ReferralTracker from "@/components/analytics/ReferralTracker";
import { SITE_CONFIG } from "@/lib/constants";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-plus-jakarta-sans",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_CONFIG.url),
  title: {
    default: SITE_CONFIG.title,
    template: `%s | ${SITE_CONFIG.name}`,
  },
  description: SITE_CONFIG.description,
  openGraph: {
    type: "website",
    locale: SITE_CONFIG.locale,
    url: SITE_CONFIG.url,
    siteName: SITE_CONFIG.name,
    title: SITE_CONFIG.title,
    description: SITE_CONFIG.description,
  },
  twitter: {
    card: "summary_large_image",
    title: SITE_CONFIG.title,
    description: SITE_CONFIG.description,
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr" className={`${inter.variable} ${plusJakartaSans.variable}`}>
      <body className="antialiased">
        <CustomCursor />
        <Header />
        <main className="pt-16 lg:pt-20">
          <PageTransition>{children}</PageTransition>
        </main>
        <Footer />
        <SiteTrackerLoader />
        <ReferralTracker />
        <ChatWidgetLoader />
        <CookieBanner />
      </body>
    </html>
  );
}
