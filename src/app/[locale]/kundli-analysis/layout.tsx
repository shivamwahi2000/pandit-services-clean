import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Free Kundli Analysis Online | Birth Chart Calculator | Kesari Nakshatra',
  description: 'Get your free Kundli (birth chart) analysis online. Detailed horoscope with planetary positions, yogas, doshas, and personalized predictions. Instant digital kundli generation.',
  keywords: ['free kundli online', 'birth chart calculator', 'kundli analysis', 'horoscope maker', 'janam kundli', 'vedic birth chart', 'online kundli generator', 'free astrology chart'],
  openGraph: {
    title: 'Free Kundli Analysis Online | Birth Chart Calculator',
    description: 'Get your free Kundli (birth chart) analysis online with detailed horoscope, planetary positions, and predictions.',
    url: 'https://kesarinakshatra.com/kundli-analysis',
    siteName: 'Kesari Nakshatra',
    images: [
      {
        url: 'https://kesarinakshatra.com/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Free Kundli Analysis Online',
      },
    ],
    locale: 'en_IN',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Free Kundli Analysis Online | Birth Chart Calculator',
    description: 'Get your free Kundli analysis online with detailed horoscope and predictions.',
    images: ['https://kesarinakshatra.com/og-image.jpg'],
  },
  alternates: {
    canonical: 'https://kesarinakshatra.com/kundli-analysis',
  },
};

export default function KundliAnalysisLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
