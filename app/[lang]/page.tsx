// app/[lang]/page.tsx
import { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import ClientReviews from "../components/Home/ClientReviews";
import FinancialServicesBlocks from "../components/Home/FinancialServicesBlocks";
import NewsSection from "../components/Home/NewsSection";
import PromotedOffersSection from "../components/Home/PromotedOffersSection";
import AboutServiceSection from "../components/Home/AboutServiceSection";
export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const { lang } = await params;
  const t = await getTranslations({ locale: lang, namespace: "Metadata" });

  const baseUrl = "https://finoglyad.com.ua";
  const currentUrl = `${baseUrl}/${lang}`;

  return {
    title: t("root.title"),
    description: t("root.description"),

    keywords: [
      "займы онлайн",
      "МФО Украина",
      "рейтинг микрофинансовых организаций",
      "срочные займы",
      "деньги в долг",
    ],

    openGraph: {
      title: t("root.title"),
      description: t("root.description"),
      url: currentUrl,
      type: "website",
      siteName: "Фіногляд",
      locale: lang === "uk" ? "uk_UA" : "ru_UA",
      images: [
        {
          url: `${baseUrl}/og-image.jpg`,
          width: 1200,
          height: 630,
          alt: t("root.title"),
        },
      ],
    },

    twitter: {
      card: "summary_large_image",
      title: t("root.title"),
      description: t("root.description"),
      images: [`${baseUrl}/og-image.jpg`],
      site: "@finoglyad",
      creator: "@finoglyad",
    },

    alternates: {
      canonical: currentUrl,
      languages: {
        "uk-UA": `${baseUrl}/uk`,
        "ru-UA": `${baseUrl}/ru`,
        "x-default": baseUrl,
      },
    },
  };
}

export default async function root({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;

  return (
    <div>
      <FinancialServicesBlocks lang={lang} />
      <ClientReviews lang={lang} />
      <NewsSection lang={lang} />
      <AboutServiceSection lang={lang} />
      <PromotedOffersSection lang={lang} />
    </div>
  );
}
