import React, { useEffect } from 'react';
import { useSEOAI } from '../hooks/useSEOAI';

export const AutoSEOContent = () => {
  const { isLoaded, analysis } = useSEOAI();

  useEffect(() => {
    if (isLoaded) {
      // Gera e injeta automaticamente schema.org JSON-LD
      generateSchemaMarkup();
      
      // Gera FAQ schema se não existir
      generateFAQSchema();
      
      // Otimiza meta tags automaticamente
      optimizeMetaTags();
      
      // Adiciona breadcrumb schema
      generateBreadcrumbSchema();
    }
  }, [isLoaded, analysis]);

  const generateSchemaMarkup = () => {
    const schemas = [
      // LocalBusiness Schema
      {
        "@context": "https://schema.org",
        "@type": "LocalBusiness",
        "@id": "https://reginaldodetetive.com/#localbusiness",
        "name": "Reginaldo - Detetive Particular Brasília",
        "description": "Detetive particular profissional em Brasília com mais de 14 anos de experiência em investigação privada, infidelidade conjugal, pessoas desaparecidas e investigação empresarial.",
        "url": "https://reginaldodetetive.com",
        "telephone": "+55-61-98284-4543",
        "email": "contato@reginaldodetetive.com",
        "image": [
          "https://reginaldodetetive.com/detective-hero.jpg"
        ],
        "logo": {
          "@type": "ImageObject",
          "url": "https://reginaldodetetive.com/logo.png"
        },
        "address": {
          "@type": "PostalAddress",
          "streetAddress": "Brasília",
          "addressLocality": "Brasília", 
          "addressRegion": "DF",
          "postalCode": "70000-000",
          "addressCountry": "BR"
        },
        "geo": {
          "@type": "GeoCoordinates",
          "latitude": -15.7942,
          "longitude": -47.8822
        },
        "openingHours": "Mo-Su 00:00-23:59",
        "sameAs": [
          "https://wa.me/5561982844543"
        ],
        "serviceArea": {
          "@type": "Place",
          "name": "Distrito Federal, Brasil",
          "address": {
            "@type": "PostalAddress",
            "addressRegion": "DF",
            "addressCountry": "BR"
          }
        },
        "hasOfferCatalog": {
          "@type": "OfferCatalog",
          "name": "Serviços de Investigação Particular",
          "itemListElement": [
            {
              "@type": "OfferCatalog",
              "name": "Investigação de Infidelidade",
              "description": "Investigação discreta de infidelidade conjugal com evidências legais"
            },
            {
              "@type": "OfferCatalog", 
              "name": "Localização de Pessoas",
              "description": "Investigação profissional para encontrar pessoas desaparecidas"
            },
            {
              "@type": "OfferCatalog",
              "name": "Investigação Empresarial",
              "description": "Investigação corporativa e verificação de antecedentes"
            }
          ]
        },
        "aggregateRating": {
          "@type": "AggregateRating",
          "ratingValue": "4.9",
          "reviewCount": "127"
        },
        "priceRange": "$$"
      },

      // Professional Service Schema
      {
        "@context": "https://schema.org",
        "@type": "ProfessionalService",
        "name": "Detetive Particular Reginaldo",
        "description": "Serviços profissionais de investigação particular em Brasília e região metropolitana",
        "serviceType": "Private Investigation Services",
        "provider": {
          "@type": "Person",
          "name": "Reginaldo",
          "jobTitle": "Detetive Particular",
          "telephone": "+55-61-98284-4543",
          "address": {
            "@type": "PostalAddress",
            "addressLocality": "Brasília",
            "addressRegion": "DF",
            "addressCountry": "BR"
          }
        },
        "areaServed": [
          "Brasília", "Taguatinga", "Ceilândia", "Águas Claras", 
          "Samambaia", "Sobradinho", "Planaltina", "Gama"
        ],
        "availableLanguage": "Portuguese"
      },

      // Service Schema específico
      {
        "@context": "https://schema.org",
        "@type": "Service",
        "name": "Investigação de Infidelidade Brasília",
        "description": "Serviço especializado em investigação de infidelidade conjugal com métodos discretos e legais",
        "provider": {
          "@type": "LocalBusiness",
          "name": "Reginaldo Detetive Particular"
        },
        "serviceType": "Infidelity Investigation",
        "areaServed": "Brasília, DF",
        "offers": {
          "@type": "Offer",
          "description": "Investigação profissional de infidelidade",
          "priceRange": "Consulte valores"
        }
      }
    ];

    // Remove schemas existentes
    const existingSchemas = document.querySelectorAll('script[type="application/ld+json"]');
    existingSchemas.forEach(script => script.remove());

    // Adiciona novos schemas
    schemas.forEach((schema, index) => {
      const script = document.createElement('script');
      script.type = 'application/ld+json';
      script.id = `schema-${index}`;
      script.textContent = JSON.stringify(schema);
      document.head.appendChild(script);
    });
  };

  const generateFAQSchema = () => {
    const faqData = {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      "mainEntity": [
        {
          "@type": "Question",
          "name": "Como funciona a investigação de infidelidade em Brasília?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "A investigação de infidelidade é realizada com total discrição usando métodos legais. Coletamos evidências através de vigilância profissional, análise de comportamento e documentação fotográfica, sempre respeitando a privacidade e a lei."
          }
        },
        {
          "@type": "Question", 
          "name": "Quanto custa contratar um detetive particular em Brasília?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Os valores variam conforme o tipo e complexidade da investigação. Oferecemos consulta gratuita para avaliar seu caso e apresentar um orçamento personalizado. Entre em contato pelo WhatsApp (61) 98284-4543."
          }
        },
        {
          "@type": "Question",
          "name": "A investigação particular é legal no Brasil?",
          "acceptedAnswer": {
            "@type": "Answer", 
            "text": "Sim, a atividade de detetive particular é regulamentada no Brasil. Trabalhamos sempre dentro da legalidade, respeitando direitos de privacidade e usando apenas métodos legais para coleta de evidências."
          }
        },
        {
          "@type": "Question",
          "name": "Quanto tempo demora uma investigação de infidelidade?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "O prazo varia conforme cada caso, mas geralmente entre 7 a 15 dias. Casos mais complexos podem demandar mais tempo. Mantemos o cliente informado sobre o progresso da investigação."
          }
        },
        {
          "@type": "Question",
          "name": "As evidências coletadas servem para processo judicial?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Sim, todas as evidências são coletadas seguindo procedimentos legais e podem ser utilizadas em processos de divórcio ou outras ações judiciais. Fornecemos relatório detalhado e documentação adequada."
          }
        }
      ]
    };

    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.id = 'faq-schema';
    script.textContent = JSON.stringify(faqData);
    document.head.appendChild(script);
  };

  const generateBreadcrumbSchema = () => {
    const breadcrumbData = {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      "itemListElement": [
        {
          "@type": "ListItem",
          "position": 1,
          "name": "Início",
          "item": "https://reginaldodetetive.com"
        },
        {
          "@type": "ListItem", 
          "position": 2,
          "name": "Detetive Particular Brasília",
          "item": "https://reginaldodetetive.com/#inicio"
        },
        {
          "@type": "ListItem",
          "position": 3,
          "name": "Serviços de Investigação",
          "item": "https://reginaldodetetive.com/#servicos"
        }
      ]
    };

    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.id = 'breadcrumb-schema';
    script.textContent = JSON.stringify(breadcrumbData);
    document.head.appendChild(script);
  };

  const optimizeMetaTags = () => {
    // Meta tags essenciais para SEO
    const metaTags = [
      { name: 'robots', content: 'index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1' },
      { name: 'googlebot', content: 'index, follow' },
      { name: 'bingbot', content: 'index, follow' },
      { property: 'og:locale', content: 'pt_BR' },
      { property: 'og:type', content: 'website' },
      { property: 'og:title', content: 'Detetive Particular Brasília - Investigação Profissional | Reginaldo' },
      { property: 'og:description', content: 'Detetive particular experiente em Brasília. Investigação de infidelidade, pessoas desaparecidas, fraudes. Atendimento 24h em todo o DF. Consulta gratuita.' },
      { property: 'og:url', content: 'https://reginaldodetetive.com' },
      { property: 'og:site_name', content: 'Reginaldo Detetive Particular' },
      { property: 'og:image', content: 'https://reginaldodetetive.com/detective-hero.jpg' },
      { property: 'og:image:width', content: '1200' },
      { property: 'og:image:height', content: '630' },
      { property: 'og:image:type', content: 'image/jpeg' },
      { name: 'twitter:card', content: 'summary_large_image' },
      { name: 'twitter:title', content: 'Detetive Particular Brasília - Investigação Profissional' },
      { name: 'twitter:description', content: 'Detetive particular experiente em Brasília. Investigação discreta e profissional.' },
      { name: 'twitter:image', content: 'https://reginaldodetetive.com/detective-hero.jpg' },
      { name: 'geo.region', content: 'BR-DF' },
      { name: 'geo.placename', content: 'Brasília' },
      { name: 'geo.position', content: '-15.7942;-47.8822' },
      { name: 'ICBM', content: '-15.7942, -47.8822' },
      { name: 'author', content: 'Reginaldo - Detetive Particular' },
      { name: 'classification', content: 'business' },
      { name: 'category', content: 'Private Investigation Services' },
      { name: 'coverage', content: 'Worldwide' },
      { name: 'distribution', content: 'Global' },
      { name: 'rating', content: 'General' },
      { name: 'revisit-after', content: '7 days' },
      { httpEquiv: 'Content-Language', content: 'pt-BR' }
    ];

    metaTags.forEach(tag => {
      let element = null;
      
      if (tag.name) {
        element = document.querySelector(`meta[name="${tag.name}"]`) as HTMLMetaElement;
      } else if (tag.property) {
        element = document.querySelector(`meta[property="${tag.property}"]`) as HTMLMetaElement;
      } else if (tag.httpEquiv) {
        element = document.querySelector(`meta[http-equiv="${tag.httpEquiv}"]`) as HTMLMetaElement;
      }

      if (!element) {
        element = document.createElement('meta');
        if (tag.name) element.name = tag.name;
        if (tag.property) element.setAttribute('property', tag.property);
        if (tag.httpEquiv) element.setAttribute('http-equiv', tag.httpEquiv);
        document.head.appendChild(element);
      }
      
      element.content = tag.content;
    });

    // Canonical URL
    let canonical = document.querySelector('link[rel="canonical"]') as HTMLLinkElement;
    if (!canonical) {
      canonical = document.createElement('link');
      canonical.rel = 'canonical';
      document.head.appendChild(canonical);
    }
    canonical.href = window.location.origin;

    // Hreflang para português
    let hreflang = document.querySelector('link[hreflang="pt-BR"]') as HTMLLinkElement;
    if (!hreflang) {
      hreflang = document.createElement('link');
      hreflang.rel = 'alternate';
      hreflang.hreflang = 'pt-BR';
      document.head.appendChild(hreflang);
    }
    hreflang.href = window.location.origin;
  };

  // Componente invisível - apenas injeta schema markup
  return null;
};

export default AutoSEOContent;