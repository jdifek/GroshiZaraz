// app/[lang]/page.tsx
import { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import ClientReviews from "../components/Home/ClientReviews";
import FinancialServicesBlocks from "../components/Home/FinancialServicesBlocks";
import NewsSection from "../components/Home/NewsSection";
import AboutServiceSection from "../components/Home/AboutServiceSection";
import PromotedOffersSection from "../components/Home/PromotedOffersSection";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const { lang } = await params;
  const t = await getTranslations({ locale: lang, namespace: "Metadata" });

  return {
    title: t("home.title"),
    description: t("home.description"),
    keywords: [
      "займы онлайн",
      "МФО Украина",
      "рейтинг микрофинансовых организаций",
      "срочные займы",
      "деньги в долг",
    ],
    openGraph: {
      title: t("home.title"),
      description: t("home.description"),
      url: "https://GroshiZaraz.com.ua",
      images: [
        {
          url: "https://GroshiZaraz.com.ua/og-main.jpg",
          width: 1200,
          height: 630,
          alt: t("home.title"),
        },
      ],
    },
    alternates: {
      canonical: "https://GroshiZaraz.com.ua",
    },
  };
}

export default async function Home({
  // params,
}: {
  params: Promise<{ lang: string }>;
}) {
  // const { lang } = await params;

  return (
    <div>
      <FinancialServicesBlocks />
      <ClientReviews />
      <NewsSection />
      <AboutServiceSection />
      <PromotedOffersSection />
    </div>
  );
}
