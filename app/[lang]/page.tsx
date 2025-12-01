// app/[lang]/page.tsx
import { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import ClientReviews from "../components/Home/ClientReviews";
import FinancialServicesBlocks from "../components/Home/FinancialServicesBlocks";
import NewsSection from "../components/Home/NewsSection";
import AboutServiceSection from "../components/Home/PromotedOffersSection";
import PromotedOffersSection from "../components/Home/PromotedOffersSection";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const { lang } = await params;
  const t = await getTranslations({ locale: lang, namespace: "Metadata" });

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
      url: "https://groshi-zaraz.vercel.app",
      images: [
        {
          url: "https://groshi-zaraz.vercel.app/og-main.jpg",
          width: 1200,
          height: 630,
          alt: t("root.title"),
        },
      ],
    },
    alternates: {
      canonical: "https://groshi-zaraz.vercel.app",
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
