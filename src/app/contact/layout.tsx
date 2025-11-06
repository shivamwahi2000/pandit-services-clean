import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Contact Us | Book Pandit Services | Kesari Nakshatra',
  description: 'Contact Kesari Nakshatra for authentic Hindu rituals, pujas, and Vedic astrology consultations. Available across India. Book your pandit online or call us directly.',
  keywords: ['contact pandit', 'book pandit online', 'pandit services india', 'hindu priest contact', 'puja booking', 'vedic astrology consultation'],
  openGraph: {
    title: 'Contact Us | Book Pandit Services | Kesari Nakshatra',
    description: 'Contact Kesari Nakshatra for authentic Hindu rituals, pujas, and Vedic astrology consultations. Available across India.',
    url: 'https://kesarinakshatra.com/contact',
    siteName: 'Kesari Nakshatra',
    images: [
      {
        url: 'https://kesarinakshatra.com/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Contact Kesari Nakshatra',
      },
    ],
    locale: 'en_IN',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Contact Us | Book Pandit Services | Kesari Nakshatra',
    description: 'Contact Kesari Nakshatra for authentic Hindu rituals, pujas, and Vedic astrology consultations.',
    images: ['https://kesarinakshatra.com/og-image.jpg'],
  },
  alternates: {
    canonical: 'https://kesarinakshatra.com/contact',
  },
};

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
