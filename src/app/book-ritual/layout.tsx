import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Book Sacred Rituals & Ceremonies | Hindu Pujas Online | Kesari Nakshatra',
  description: 'Book authentic Hindu pujas, ceremonies, and rituals online. Grih Pravesh, Marriage Ceremonies, Satyanarayan Katha, Navgrah Shanti, and more. Expert pandits across India.',
  keywords: ['book puja online', 'hindu rituals booking', 'grih pravesh puja', 'marriage ceremony', 'satyanarayan katha', 'navgrah shanti', 'online pandit booking', 'hindu ceremonies'],
  openGraph: {
    title: 'Book Sacred Rituals & Ceremonies | Hindu Pujas Online',
    description: 'Book authentic Hindu pujas, ceremonies, and rituals online. Expert pandits across India for all sacred occasions.',
    url: 'https://kesarinakshatra.com/book-ritual',
    siteName: 'Kesari Nakshatra',
    images: [
      {
        url: 'https://kesarinakshatra.com/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Book Hindu Rituals and Ceremonies',
      },
    ],
    locale: 'en_IN',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Book Sacred Rituals & Ceremonies | Hindu Pujas Online',
    description: 'Book authentic Hindu pujas, ceremonies, and rituals online. Expert pandits across India.',
    images: ['https://kesarinakshatra.com/og-image.jpg'],
  },
  alternates: {
    canonical: 'https://kesarinakshatra.com/book-ritual',
  },
};

export default function BookRitualLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
