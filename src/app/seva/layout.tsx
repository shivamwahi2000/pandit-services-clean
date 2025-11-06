import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Seva Programs | Community Service & Religious Events | Kesari Nakshatra',
  description: 'Join our Seva programs - Annadaan, Gau Seva, temple cleaning, elderly care, and community religious events. Serve with devotion and make a difference.',
  keywords: ['seva programs', 'annadaan', 'gau seva', 'religious service', 'community seva', 'temple service', 'charity programs', 'volunteer opportunities'],
  openGraph: {
    title: 'Seva Programs | Community Service & Religious Events',
    description: 'Join our Seva programs - Annadaan, Gau Seva, temple service, and community events. Serve with devotion.',
    url: 'https://kesarinakshatra.com/seva',
    siteName: 'Kesari Nakshatra',
    images: [
      {
        url: 'https://kesarinakshatra.com/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Seva Programs',
      },
    ],
    locale: 'en_IN',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Seva Programs | Community Service & Religious Events',
    description: 'Join our Seva programs - Annadaan, Gau Seva, temple service, and community events.',
    images: ['https://kesarinakshatra.com/og-image.jpg'],
  },
  alternates: {
    canonical: 'https://kesarinakshatra.com/seva',
  },
};

export default function SevaLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
