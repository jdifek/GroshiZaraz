"use client";
import React from "react";

export const StructuredData = () => {
  const org = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Фіногляд",
    url: "https://Фіногляд.com.ua",
    logo: "https://Фіногляд.com.ua/logo.png",
    sameAs: [
      "https://www.facebook.com/yourcompany",
      "https://www.instagram.com/yourcompany",
    ],
  };

  const website = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "Фіногляд",
    url: "https://Фіногляд.com.ua",
    potentialAction: {
      "@type": "SearchAction",
      target: "https://Фіногляд.com.ua/search?q={search_term_string}",
      "query-input": "required name=search_term_string",
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(org) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(website) }}
      />
    </>
  );
};
