import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Vedic Astrology & Vastu Consultation | Kundli Analysis | Kesari Nakshatra',
  description: 'Expert Vedic astrology and Vastu consultations. Personalized kundli analysis, career guidance, marriage compatibility, Vastu for home and business. Book online consultation.',
  keywords: ['vedic astrology', 'vastu consultation', 'kundli analysis', 'horoscope reading', 'marriage compatibility', 'career astrology', 'vastu for home', 'online astrology consultation'],
  openGraph: {
    title: 'Vedic Astrology & Vastu Consultation | Kundli Analysis',
    description: 'Expert Vedic astrology and Vastu consultations. Personalized kundli analysis, career guidance, and Vastu for home.',
    url: 'https://kesarinakshatra.com/astrology-vastu',
    siteName: 'Kesari Nakshatra',
    images: [
      {
        url: 'https://kesarinakshatra.com/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Vedic Astrology & Vastu Consultation',
      },
    ],
    locale: 'en_IN',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Vedic Astrology & Vastu Consultation | Kundli Analysis',
    description: 'Expert Vedic astrology and Vastu consultations. Personalized kundli analysis and career guidance.',
    images: ['https://kesarinakshatra.com/og-image.jpg'],
  },
  alternates: {
    canonical: 'https://kesarinakshatra.com/astrology-vastu',
  },
};

export default function AstrologyVastuLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
