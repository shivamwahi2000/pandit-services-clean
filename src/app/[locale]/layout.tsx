import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { NextIntlClientProvider } from 'next-intl';
import { getMessages, setRequestLocale } from 'next-intl/server';
import { routing } from '@/i18n/routing';
import { notFound } from 'next/navigation';
import "../globals.css";
import Chatbot from "@/components/Chatbot";

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// Generate metadata dynamically based on locale
export async function generateMetadata({
  params
}: {
  params: Promise<{ locale: string }>
}): Promise<Metadata> {
  const { locale } = await params;

  const isHindi = locale === 'hi';

  return {
    metadataBase: new URL('https://kesarinakshatra.com'),
    title: {
      default: isHindi
        ? "केसरी नक्षत्र - पूजा के लिए पंडित बुक करें | हिंदू अनुष्ठान और वैदिक ज्योतिष सेवाएं"
        : "Kesari Nakshatra - Book Pandit for Puja | Hindu Rituals & Vedic Astrology Services",
      template: isHindi ? "%s | केसरी नक्षत्र" : "%s | Kesari Nakshatra"
    },
    description: isHindi
      ? "भारत भर में प्रामाणिक हिंदू पूजा और समारोहों के लिए अनुभवी पंडित बुक करें। गृह प्रवेश, सत्यनारायण पूजा, हवन, विवाह संस्कार, कुंडली विश्लेषण, वास्तु परामर्श। संपर्क: +91 93403 37323"
      : "Book experienced pandits for authentic Hindu pujas and ceremonies across India. Grih Pravesh, Satyanarayan Puja, Havan, Marriage Rituals, Kundli Analysis, Vastu Consultation. Contact: +91 93403 37323",
    keywords: isHindi
      ? [
          "पंडित ऑनलाइन बुक करें",
          "पंडित बुकिंग भारत",
          "हिंदू पूजा सेवाएं",
          "गृह प्रवेश पूजा",
          "सत्यनारायण पूजा पंडित",
          "विवाह संस्कार पंडित",
          "हवन यज्ञ सेवाएं",
          "कुंडली विश्लेषण ज्योतिषी",
          "वैदिक ज्योतिष परामर्श",
          "वास्तु शास्त्र विशेषज्ञ",
          "ऑनलाइन पूजा बुकिंग",
          "भागवत कथा पंडित",
          "हनुमान कथा सेवाएं",
          "केसरी नक्षत्र",
          "धार्मिक समारोह भारत"
        ]
      : [
          "book pandit online",
          "pandit booking India",
          "Hindu puja services",
          "grih pravesh puja",
          "satyanarayan puja pandit",
          "marriage ceremony pandit",
          "havan yajna services",
          "kundli analysis astrologer",
          "Vedic astrology consultation",
          "vastu shastra expert",
          "online puja booking",
          "bhagwat katha pandits",
          "hanuman katha services",
          "Kesari Nakshatra",
          "religious ceremonies India"
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
      locale: isHindi ? 'hi_IN' : 'en_IN',
      url: `https://kesarinakshatra.com/${locale}`,
      siteName: isHindi ? 'केसरी नक्षत्र' : 'Kesari Nakshatra',
      title: isHindi
        ? 'पूजा के लिए पंडित बुक करें | केसरी नक्षत्र - हिंदू अनुष्ठान और वैदिक ज्योतिष'
        : 'Book Pandit for Puja | Kesari Nakshatra - Hindu Rituals & Vedic Astrology',
      description: isHindi
        ? 'भारत भर में प्रामाणिक हिंदू पूजाओं के लिए अनुभवी पंडित बुक करें। गृह प्रवेश, सत्यनारायण पूजा, हवन, विवाह, कुंडली विश्लेषण, वास्तु। फोन: +91 93403 37323'
        : 'Book experienced pandits for authentic Hindu pujas across India. Grih Pravesh, Satyanarayan Puja, Havan, Marriage, Kundli Analysis, Vastu. Call +91 93403 37323',
      images: [
        {
          url: '/logo.png',
          width: 1200,
          height: 630,
          alt: isHindi
            ? 'केसरी नक्षत्र - हिंदू अनुष्ठान और पूजा के लिए पंडित बुक करें'
            : 'Kesari Nakshatra - Book Pandit for Hindu Rituals and Pujas',
        }
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: isHindi
        ? 'पूजा के लिए पंडित बुक करें | केसरी नक्षत्र - हिंदू अनुष्ठान'
        : 'Book Pandit for Puja | Kesari Nakshatra - Hindu Rituals',
      description: isHindi
        ? 'भारत भर में प्रामाणिक हिंदू पूजाओं और समारोहों के लिए अनुभवी पंडित बुक करें। फोन: +91 93403 37323'
        : 'Book experienced pandits for authentic Hindu pujas and ceremonies across India. Call +91 93403 37323',
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
      canonical: `https://kesarinakshatra.com/${locale}`,
      languages: {
        'en': 'https://kesarinakshatra.com/en',
        'hi': 'https://kesarinakshatra.com/hi',
        'x-default': 'https://kesarinakshatra.com/en'
      }
    },
    category: 'Religious Services',
  };
}

export default async function LocaleLayout({
  children,
  params
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}>) {
  const { locale } = await params;

  // Ensure that the incoming locale is valid
  if (!routing.locales.includes(locale as any)) {
    notFound();
  }

  // Enable static rendering
  setRequestLocale(locale);

  const messages = await getMessages();

  return (
    <html lang={locale}>
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
        className={`${geistSans.variable} ${geistMono.variable} antialiased ${locale === 'hi' ? 'font-hindi' : ''}`}
      >
        <NextIntlClientProvider messages={messages}>
          {children}
          <Chatbot />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
