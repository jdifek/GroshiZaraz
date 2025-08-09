"use client";
import React from "react";

export const MicrodataCompany = ({ company }: { company: string }) => {
  const isSgroshi = company === "sgroshi";

  const data = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: isSgroshi ? "Швидко Гроші" : "Название компании",
    url: `https://Фіногляд.com.ua/mfo/${company}`,
    logo: "https://Фіногляд.com.ua/logo.png",
    contactPoint: {
      "@type": "ContactPoint",
      telephone: "+38 (063) 178-64-56",
      contactType: "customer service",
      areaServed: "UA",
      availableLanguage: ["Ukrainian", "Russian"],
    },
    address: {
      "@type": "PostalAddress",
      streetAddress: "ул. Прживальского 19б, стр. 17а",
      addressLocality: "Киев",
      addressCountry: "UA",
    },
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "4.8",
      reviewCount: "119",
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
};
