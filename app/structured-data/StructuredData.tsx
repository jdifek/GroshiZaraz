"use client";
import React from "react";

export const StructuredData = () => {
  const org = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "GroshiZaraz",
    url: "https://GroshiZaraz.com.ua",
    logo: "https://GroshiZaraz.com.ua/logo.png",
    sameAs: [
      "https://www.facebook.com/yourcompany",
      "https://www.instagram.com/yourcompany",
    ],
  };

  const website = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "GroshiZaraz",
    url: "https://GroshiZaraz.com.ua",
    potentialAction: {
      "@type": "SearchAction",
      target: "https://GroshiZaraz.com.ua/search?q={search_term_string}",
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
