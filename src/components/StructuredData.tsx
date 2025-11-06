import Script from 'next/script';

interface FAQItem {
  question: string;
  answer: string;
}

interface FAQSchemaProps {
  faqs: FAQItem[];
}

export function FAQSchema({ faqs }: FAQSchemaProps) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqs.map(faq => ({
      "@type": "Question",
      "name": faq.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.answer
      }
    }))
  };

  return (
    <Script
      id="faq-schema"
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

interface CourseItem {
  name: string;
  description: string;
  duration: string;
  mode: string;
  provider: string;
  url?: string;
}

interface CourseSchemaProps {
  courses: CourseItem[];
}

export function CourseSchema({ courses }: CourseSchemaProps) {
  const schemas = courses.map(course => ({
    "@context": "https://schema.org",
    "@type": "Course",
    "name": course.name,
    "description": course.description,
    "provider": {
      "@type": "Organization",
      "name": course.provider,
      "url": "https://kesarinakshatra.com"
    },
    "courseMode": course.mode,
    "timeRequired": course.duration,
    ...(course.url && { "url": course.url })
  }));

  return (
    <>
      {schemas.map((schema, index) => (
        <Script
          key={index}
          id={`course-schema-${index}`}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      ))}
    </>
  );
}

interface ServiceItem {
  name: string;
  description: string;
  price?: string;
  serviceType: string;
}

interface ServiceSchemaProps {
  services: ServiceItem[];
}

export function ServiceSchema({ services }: ServiceSchemaProps) {
  const schemas = services.map(service => ({
    "@context": "https://schema.org",
    "@type": "Service",
    "name": service.name,
    "description": service.description,
    "provider": {
      "@type": "Organization",
      "name": "Kesari Nakshatra",
      "url": "https://kesarinakshatra.com"
    },
    "serviceType": service.serviceType,
    "areaServed": {
      "@type": "Country",
      "name": "India"
    },
    ...(service.price && {
      "offers": {
        "@type": "Offer",
        "price": service.price,
        "priceCurrency": "INR"
      }
    })
  }));

  return (
    <>
      {schemas.map((schema, index) => (
        <Script
          key={index}
          id={`service-schema-${index}`}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      ))}
    </>
  );
}

interface BreadcrumbItem {
  name: string;
  url: string;
}

interface BreadcrumbSchemaProps {
  items: BreadcrumbItem[];
}

export function BreadcrumbSchema({ items }: BreadcrumbSchemaProps) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": items.map((item, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "name": item.name,
      "item": item.url
    }))
  };

  return (
    <Script
      id="breadcrumb-schema"
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
