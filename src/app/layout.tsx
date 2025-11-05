import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Chatbot from "@/components/Chatbot";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL('https://kesarinakshatra.com'),
  title: {
    default: "Kesari Nakshatra - Sacred Rituals, Divine Blessings | Authentic Hindu Pujas",
    template: "%s | Kesari Nakshatra"
  },
  description: "Book authentic Hindu pujas and ceremonies with experienced pandits across India. Traditional rituals for grih pravesh, satyanarayan puja, havan, marriages, kundli analysis, and more. Expert Vedic astrology consultations available.",
  keywords: [
    "Hindu puja booking",
    "pandit services",
    "grih pravesh puja",
    "satyanarayan puja",
    "marriage ceremony",
    "havan yajna",
    "kundli analysis",
    "Vedic astrology",
    "vastu consultation",
    "online puja",
    "bhagwat katha",
    "hanuman katha",
    "spiritual services India",
    "authentic Hindu rituals",
    "pandit ji booking"
  ],
  authors: [{ name: "Kesari Nakshatra", url: "https://kesarinakshatra.com" }],
  creator: "Kesari Nakshatra",
  publisher: "Kesari Nakshatra",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  icons: {
    icon: [
      { url: '/favicon.png', sizes: '32x32', type: 'image/png' },
      { url: '/logo.png', sizes: '192x192', type: 'image/png' },
    ],
    apple: [
      { url: '/logo.png', sizes: '180x180', type: 'image/png' },
    ],
    other: [
      {
        rel: 'mask-icon',
        url: '/logo.png',
        color: '#DC2626'
      }
    ]
  },
  openGraph: {
    type: 'website',
    locale: 'en_IN',
    url: 'https://kesarinakshatra.com',
    siteName: 'Kesari Nakshatra',
    title: 'Kesari Nakshatra - Sacred Rituals, Divine Blessings',
    description: 'Book authentic Hindu pujas and ceremonies with experienced pandits across India. Traditional rituals, Vedic astrology, and spiritual guidance.',
    images: [
      {
        url: '/logo.png',
        width: 1200,
        height: 630,
        alt: 'Kesari Nakshatra - Sacred Hindu Rituals',
      }
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Kesari Nakshatra - Sacred Rituals, Divine Blessings',
    description: 'Book authentic Hindu pujas and ceremonies with experienced pandits across India.',
    images: ['/logo.png'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    // Add your verification codes when ready
    // google: 'your-google-site-verification-code',
    // yandex: 'your-yandex-verification-code',
    // bing: 'your-bing-verification-code',
  },
  alternates: {
    canonical: 'https://kesarinakshatra.com',
  },
  category: 'Religious Services',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        {/* Structured Data for Organization */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              "name": "Kesari Nakshatra",
              "url": "https://kesarinakshatra.com",
              "logo": "https://kesarinakshatra.com/logo.png",
              "description": "Authentic Hindu puja services and Vedic astrology consultations across India",
              "address": {
                "@type": "PostalAddress",
                "addressCountry": "IN",
                "addressRegion": "Madhya Pradesh"
              },
              "contactPoint": {
                "@type": "ContactPoint",
                "telephone": "+91-93403-37323",
                "contactType": "customer service",
                "availableLanguage": ["English", "Hindi"]
              },
              "sameAs": [
                "https://www.instagram.com/kesarinakshatra/"
              ]
            })
          }}
        />
        {/* Structured Data for Service */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Service",
              "serviceType": "Religious Services",
              "provider": {
                "@type": "Organization",
                "name": "Kesari Nakshatra"
              },
              "areaServed": {
                "@type": "Country",
                "name": "India"
              },
              "hasOfferCatalog": {
                "@type": "OfferCatalog",
                "name": "Hindu Ritual Services",
                "itemListElement": [
                  {
                    "@type": "Offer",
                    "itemOffered": {
                      "@type": "Service",
                      "name": "Grih Pravesh Puja"
                    }
                  },
                  {
                    "@type": "Offer",
                    "itemOffered": {
                      "@type": "Service",
                      "name": "Marriage Ceremony"
                    }
                  },
                  {
                    "@type": "Offer",
                    "itemOffered": {
                      "@type": "Service",
                      "name": "Kundli Analysis"
                    }
                  },
                  {
                    "@type": "Offer",
                    "itemOffered": {
                      "@type": "Service",
                      "name": "Vedic Astrology Consultation"
                    }
                  }
                ]
              }
            })
          }}
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
        <Chatbot />
      </body>
    </html>
  );
}
