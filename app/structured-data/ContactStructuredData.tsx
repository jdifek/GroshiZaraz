"use client";
import React from "react";

export const ContactStructuredData = () => {
  const data = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Фіногляд",
    url: "https://groshi-zaraz.vercel.app/contacts",
    logo: "https://groshi-zaraz.vercel.app/logo.png", // если есть логотип, можно добавить
    contactPoint: {
      "@type": "ContactPoint",
      telephone: "+38 (093) 000-00-00",
      contactType: "Customer Support",
      email: "admin@Фіногляд.com.ua",
      areaServed: "UA",
      availableLanguage: ["Russian", "Ukrainian"],
    },
    address: {
      "@type": "PostalAddress",
      streetAddress: "Архитекторів 32",
      addressLocality: "Харьков",
      postalCode: "61174",
      addressRegion: "Харківська обл.",
      addressCountry: "UA",
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
};
