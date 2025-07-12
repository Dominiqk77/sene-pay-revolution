import React from 'react';
import { Helmet } from 'react-helmet-async';

interface SEOSchemaOrgProps {
  type?: 'HomePage' | 'ProductPage' | 'TechArticle' | 'FAQPage';
  title?: string;
  description?: string;
  url?: string;
  image?: string;
  breadcrumbs?: Array<{
    name: string;
    url: string;
  }>;
  faqData?: Array<{
    question: string;
    answer: string;
  }>;
}

const SEOSchemaOrg: React.FC<SEOSchemaOrgProps> = ({
  type = 'HomePage',
  title,
  description,
  url,
  image,
  breadcrumbs,
  faqData
}) => {
  const baseSchema = {
    "@context": "https://schema.org",
    "@graph": []
  };

  // Organization Schema
  const organizationSchema = {
    "@type": "LocalBusiness",
    "@id": "https://senepay.sn/#organization",
    "name": "SenePay",
    "alternateName": "SenePay Sénégal",
    "url": "https://senepay.sn",
    "logo": "https://senepay.sn/lovable-uploads/569b505b-54ae-41ef-b693-b571bf20d5e7.png",
    "image": "https://senepay.sn/lovable-uploads/569b505b-54ae-41ef-b693-b571bf20d5e7.png",
    "description": "Passerelle de paiement mobile #1 au Sénégal. API ultra-puissante pour intégrer Orange Money, Wave, Free Money et cartes bancaires.",
    "foundingDate": "2024",
    "slogan": "La passerelle de paiement qui révolutionne l'e-commerce sénégalais",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "Plateau, Dakar",
      "addressLocality": "Dakar",
      "addressRegion": "Dakar",
      "postalCode": "10000",
      "addressCountry": "SN"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": 14.6937,
      "longitude": -17.4441
    },
    "areaServed": [
      {
        "@type": "Country",
        "name": "Sénégal"
      },
      {
        "@type": "AdministrativeArea", 
        "name": "Afrique de l'Ouest"
      }
    ],
    "contactPoint": [
      {
        "@type": "ContactPoint",
        "telephone": "+221-77-000-0000",
        "contactType": "customer service",
        "areaServed": "SN",
        "availableLanguage": ["fr", "wo"]
      },
      {
        "@type": "ContactPoint",
        "email": "support@senepay.sn",
        "contactType": "technical support",
        "areaServed": "SN", 
        "availableLanguage": ["fr", "en"]
      }
    ],
    "sameAs": [
      "https://twitter.com/SenePayOfficial",
      "https://linkedin.com/company/senepay"
    ]
  };

  // Website Schema
  const websiteSchema = {
    "@type": "WebSite",
    "@id": "https://senepay.sn/#website",
    "url": "https://senepay.sn",
    "name": "SenePay - API Paiement Mobile Sénégal #1",
    "description": "Passerelle de paiement mobile révolutionnaire pour le Sénégal et l'Afrique de l'Ouest",
    "publisher": {
      "@id": "https://senepay.sn/#organization"
    },
    "potentialAction": [
      {
        "@type": "SearchAction",
        "target": {
          "@type": "EntryPoint",
          "urlTemplate": "https://senepay.sn/search?q={search_term_string}"
        },
        "query-input": "required name=search_term_string"
      }
    ]
  };

  // Software Application Schema
  const softwareSchema = {
    "@type": "SoftwareApplication",
    "name": "SenePay API",
    "applicationCategory": "BusinessApplication",
    "applicationSubCategory": "Payment Gateway",
    "operatingSystem": "Web-based",
    "description": "API de paiement mobile la plus avancée d'Afrique de l'Ouest. Intégrez Orange Money, Wave, Free Money et toutes les cartes bancaires en 5 minutes.",
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "XOF",
      "priceValidUntil": "2025-12-31",
      "description": "Essai gratuit avec 100 transactions incluses"
    },
    "creator": {
      "@id": "https://senepay.sn/#organization"
    },
    "featureList": [
      "Intégration Orange Money API",
      "Intégration Wave Payment",
      "Intégration Free Money",
      "Paiements par cartes bancaires",
      "Webhooks temps réel",
      "Dashboard analytics",
      "Support 24/7"
    ],
    "screenshot": "https://senepay.sn/lovable-uploads/569b505b-54ae-41ef-b693-b571bf20d5e7.png"
  };

  // Add base schemas
  baseSchema["@graph"].push(organizationSchema, websiteSchema, softwareSchema);

  // Add page-specific schemas
  if (type === 'TechArticle' && title && description) {
    const articleSchema = {
      "@type": "TechArticle",
      "headline": title,
      "description": description,
      "url": url || "https://senepay.sn",
      "image": image || "https://senepay.sn/lovable-uploads/569b505b-54ae-41ef-b693-b571bf20d5e7.png",
      "author": {
        "@id": "https://senepay.sn/#organization"
      },
      "publisher": {
        "@id": "https://senepay.sn/#organization"
      },
      "datePublished": "2024-12-07",
      "dateModified": "2024-12-07"
    };
    baseSchema["@graph"].push(articleSchema);
  }

  // Add FAQ Schema
  if (type === 'FAQPage' && faqData && faqData.length > 0) {
    const faqSchema = {
      "@type": "FAQPage",
      "mainEntity": faqData.map(faq => ({
        "@type": "Question",
        "name": faq.question,
        "acceptedAnswer": {
          "@type": "Answer",
          "text": faq.answer
        }
      }))
    };
    baseSchema["@graph"].push(faqSchema);
  }

  // Add Breadcrumb Schema
  if (breadcrumbs && breadcrumbs.length > 0) {
    const breadcrumbSchema = {
      "@type": "BreadcrumbList",
      "itemListElement": breadcrumbs.map((crumb, index) => ({
        "@type": "ListItem",
        "position": index + 1,
        "name": crumb.name,
        "item": crumb.url
      }))
    };
    baseSchema["@graph"].push(breadcrumbSchema);
  }

  return (
    <Helmet>
      <script type="application/ld+json">
        {JSON.stringify(baseSchema)}
      </script>
    </Helmet>
  );
};

export default SEOSchemaOrg;