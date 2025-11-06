import { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://kesarinakshatra.com'

  // Use current date for dynamic pages, specific dates for static pages
  const now = new Date()
  const staticPageDate = new Date('2025-01-15') // Update this when static pages change

  return [
    {
      url: baseUrl,
      lastModified: now, // Homepage changes frequently with new content
      changeFrequency: 'daily',
      priority: 1,
    },
    {
      url: `${baseUrl}/book-ritual`,
      lastModified: now, // Service pages update with new rituals/pricing
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/astrology-vastu`,
      lastModified: now, // Dynamic panchang data updates daily
      changeFrequency: 'daily',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/kundli-analysis`,
      lastModified: now, // Tool page with dynamic functionality
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/courses`,
      lastModified: now, // Course offerings may change
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/seva`,
      lastModified: now, // Seva programs update regularly
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/about`,
      lastModified: staticPageDate, // Static about page
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${baseUrl}/contact`,
      lastModified: staticPageDate, // Static contact info
      changeFrequency: 'monthly',
      priority: 0.7,
    },
  ]
}
