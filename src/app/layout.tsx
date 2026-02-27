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
import { SITE_CONFIG, CONTACT, SOCIAL_LINKS } from "@/lib/constants";
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
    images: [{ url: "/og/default.png", width: 1200, height: 630, alt: "Kevin DX - Développeur Web Freelance" }],
  },
  twitter: {
    card: "summary_large_image",
    title: SITE_CONFIG.title,
    description: SITE_CONFIG.description,
    images: ["/og/default.png"],
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
        {/* JSON-LD Organization + WebSite — all values from static constants, no user input */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify([
              {
                "@context": "https://schema.org",
                "@type": "Organization",
                name: SITE_CONFIG.name,
                url: SITE_CONFIG.url,
                logo: `${SITE_CONFIG.url}/og/default.png`,
                contactPoint: {
                  "@type": "ContactPoint",
                  telephone: CONTACT.phone.replace(/\s/g, ""),
                  email: CONTACT.email,
                },
                address: {
                  "@type": "PostalAddress",
                  streetAddress: "50 rue de la Liberté",
                  addressLocality: "Roquemaure",
                  postalCode: "30150",
                  addressRegion: "Occitanie",
                  addressCountry: "FR",
                },
                sameAs: [SOCIAL_LINKS.linkedin, SOCIAL_LINKS.github, SOCIAL_LINKS.instagram],
              },
              {
                "@context": "https://schema.org",
                "@type": "WebSite",
                name: SITE_CONFIG.name,
                url: SITE_CONFIG.url,
              },
            ]),
          }}
        />
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
