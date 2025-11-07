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
    default: "Kesari Nakshatra - Book Pandit for Puja | Hindu Rituals & Vedic Astrology Services",
    template: "%s | Kesari Nakshatra"
  },
  description: "Book experienced pandits for authentic Hindu pujas and ceremonies across India. Grih Pravesh, Satyanarayan Puja, Havan, Marriage Rituals, Kundli Analysis, Vastu Consultation. Contact: +91 93403 37323 | Email: kesarinakshatra@yahoo.com",
  keywords: [
    "book pandit online",
    "pandit booking India",
    "Hindu puja services",
    "grih pravesh puja Madhya Pradesh",
    "satyanarayan puja pandit",
    "marriage ceremony pandit",
    "havan yajna services",
    "kundli analysis astrologer",
    "Vedic astrology consultation",
    "vastu shastra expert",
    "online puja booking",
    "bhagwat katha pandits",
    "hanuman katha services",
    "pandit services near me",
    "authentic Hindu rituals India",
    "pandit ji booking online",
    "puja at home service",
    "Kesari Nakshatra",
    "religious ceremonies India",
    "spiritual guidance Vedic"
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
    title: 'Book Pandit for Puja | Kesari Nakshatra - Hindu Rituals & Vedic Astrology',
    description: 'Book experienced pandits for authentic Hindu pujas across India. Grih Pravesh, Satyanarayan Puja, Havan, Marriage, Kundli Analysis, Vastu. Call +91 93403 37323',
    images: [
      {
        url: '/logo.png',
        width: 1200,
        height: 630,
        alt: 'Kesari Nakshatra - Book Pandit for Hindu Rituals and Pujas',
      }
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Book Pandit for Puja | Kesari Nakshatra - Hindu Rituals',
    description: 'Book experienced pandits for authentic Hindu pujas and ceremonies across India. Call +91 93403 37323',
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
              "description": "Book experienced pandits for authentic Hindu pujas and ceremonies across India. Vedic astrology and spiritual guidance services.",
              "address": {
                "@type": "PostalAddress",
                "addressCountry": "IN",
                "addressRegion": "Madhya Pradesh",
                "addressLocality": "India"
              },
              "contactPoint": {
                "@type": "ContactPoint",
                "telephone": "+91-93403-37323",
                "email": "kesarinakshatra@yahoo.com",
                "contactType": "customer service",
                "availableLanguage": ["English", "Hindi"],
                "areaServed": "IN"
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
        {/* Local Business Schema */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "LocalBusiness",
              "name": "Kesari Nakshatra",
              "image": "https://kesarinakshatra.com/logo.png",
              "@id": "https://kesarinakshatra.com",
              "url": "https://kesarinakshatra.com",
              "telephone": "+91-93403-37323",
              "email": "kesarinakshatra@yahoo.com",
              "priceRange": "₹₹",
              "address": {
                "@type": "PostalAddress",
                "addressRegion": "Madhya Pradesh",
                "addressCountry": "IN"
              },
              "geo": {
                "@type": "GeoCoordinates",
                "latitude": 23.2599,
                "longitude": 77.4126
              },
              "openingHoursSpecification": {
                "@type": "OpeningHoursSpecification",
                "dayOfWeek": [
                  "Monday",
                  "Tuesday",
                  "Wednesday",
                  "Thursday",
                  "Friday",
                  "Saturday",
                  "Sunday"
                ],
                "opens": "06:00",
                "closes": "21:00"
              },
              "sameAs": [
                "https://www.instagram.com/kesarinakshatra/"
              ],
              "aggregateRating": {
                "@type": "AggregateRating",
                "ratingValue": "4.8",
                "reviewCount": "150"
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
