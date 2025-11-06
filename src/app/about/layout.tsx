import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'About Kesari Nakshatra | Authentic Vedic Pandit Services',
  description: 'Learn about Pt. Hariom Shastri and Kesari Nakshatra - 15+ years of authentic Hindu rituals, Vedic astrology, and sacred ceremonies. Preserving ancient traditions with modern accessibility.',
  keywords: ['about pandit services', 'pt hariom shastri', 'vedic astrologer', 'hindu priest', 'kesari nakshatra founder', 'authentic pandit', 'vedic traditions'],
  openGraph: {
    title: 'About Kesari Nakshatra | Authentic Vedic Pandit Services',
    description: 'Learn about Pt. Hariom Shastri and Kesari Nakshatra - 15+ years of authentic Hindu rituals, Vedic astrology, and sacred ceremonies.',
    url: 'https://kesarinakshatra.com/about',
    siteName: 'Kesari Nakshatra',
    images: [
      {
        url: 'https://kesarinakshatra.com/founder/pt-hari-om-shastri.jpg',
        width: 1200,
        height: 630,
        alt: 'Acharya Hariom Shastri - Founder of Kesari Nakshatra',
      },
    ],
    locale: 'en_IN',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'About Kesari Nakshatra | Authentic Vedic Pandit Services',
    description: 'Learn about Pt. Hariom Shastri and Kesari Nakshatra - 15+ years of authentic Hindu rituals and sacred ceremonies.',
    images: ['https://kesarinakshatra.com/founder/pt-hari-om-shastri.jpg'],
  },
  alternates: {
    canonical: 'https://kesarinakshatra.com/about',
  },
};

export default function AboutLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
