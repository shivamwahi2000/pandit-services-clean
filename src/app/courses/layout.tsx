import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Vedic Learning Courses | Bhagavad Gita, Sanskrit & Astrology | Kesari Nakshatra',
  description: 'Learn Vedic wisdom with expert-led courses. Bhagavad Gita study, Sanskrit language, Vedic astrology, ritual techniques, and spiritual practices. Online and offline classes available.',
  keywords: ['vedic courses', 'bhagavad gita course', 'learn sanskrit online', 'vedic astrology course', 'hindu rituals training', 'spiritual learning', 'online vedic classes'],
  openGraph: {
    title: 'Vedic Learning Courses | Bhagavad Gita, Sanskrit & Astrology',
    description: 'Learn Vedic wisdom with expert-led courses. Bhagavad Gita, Sanskrit, Vedic astrology, and spiritual practices.',
    url: 'https://kesarinakshatra.com/courses',
    siteName: 'Kesari Nakshatra',
    images: [
      {
        url: 'https://kesarinakshatra.com/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Vedic Learning Courses',
      },
    ],
    locale: 'en_IN',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Vedic Learning Courses | Bhagavad Gita, Sanskrit & Astrology',
    description: 'Learn Vedic wisdom with expert-led courses. Bhagavad Gita, Sanskrit, and Vedic astrology.',
    images: ['https://kesarinakshatra.com/og-image.jpg'],
  },
  alternates: {
    canonical: 'https://kesarinakshatra.com/courses',
  },
};

export default function CoursesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
