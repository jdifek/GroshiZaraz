"use client";
import React from "react";

export const StructuredData = () => {
  const org = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Фіногляд",
    url: "https://groshi-zaraz.vercel.app",
    logo: "https://groshi-zaraz.vercel.app/logo.png",
    sameAs: [
      "https://www.facebook.com/yourcompany",
      "https://www.instagram.com/yourcompany",
    ],
  };

  const website = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "Фіногляд",
    url: "https://groshi-zaraz.vercel.app",
    potentialAction: {
      "@type": "SearchAction",
      target: "https://groshi-zaraz.vercel.app/search?q={search_term_string}",
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
