/* eslint-disable @typescript-eslint/no-explicit-any */
import MfoService from "@/app/services/mfos/mfosService";
import { ExternalLink } from "lucide-react";
import Link from "next/link";
import { getTranslations } from "next-intl/server";
import { Mfo } from "@/app/services/mfos/mfoTypes";
import { Metadata } from "next";
const getMfoBySlug = async (slug: string) => {
  try {
    const response: Mfo = await MfoService.getMfoBySlug(slug);
    return response.promoCodes || [];
  } catch (error) {
    console.error("Error loading promo codes:", error);
    return null;
  }
};


export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string; lang: string }>;
}): Promise<Metadata> {
  const { slug, lang } = await params;
  const company = await MfoService.getMfoBySlug(slug);
  const defaultImage = "https://groshi-zaraz.vercel.app/default-og-image.jpg";

  if (!company) {
    return {
      title: lang === "ru" ? "Фіногляд — МФО не найдено" : "Фіногляд — МФО не знайдено",
      description:
        lang === "ru"
          ? "Похоже, запрашиваемая страница не существует."
          : "Схоже, запитувана сторінка не існує.",
      keywords: "",
    };
  }

  // Title с ключевыми словами
  const titleRu = `${company.name} — Промокоды, скидки и акции МФО`;
  const titleUk = `${company.name} — Промокоди, знижки та акції МФО`;

  // Description с ключевыми словами и чуть более длинное
  const descriptionRu = `Промокоды МФО ${company.name}: актуальные скидки, бонусы и специальные акции. Узнайте, как получить займ с выгодой, промокоды и бонусные предложения онлайн.`;
  const descriptionUk = `Промокоди МФО ${company.name}: актуальні знижки, бонуси та спеціальні акції. Дізнайтесь, як отримати позику з вигодою, промокоди та бонусні пропозиції онлайн.`;

  // Keywords для SEO
  const keywordsRu = `промокоды, акции, скидки, бонусы, ${company.name}, займ, кредит, МФО, онлайн, выгодные предложения`;
  const keywordsUk = `промокоди, акції, знижки, бонуси, ${company.name}, позику, кредит, МФО, онлайн, вигідні пропозиції`;

  return {
    title: lang === "ru" ? titleRu : titleUk,
    description: lang === "ru" ? descriptionRu : descriptionUk,
    keywords: lang === "ru" ? keywordsRu : keywordsUk,
    openGraph: {
      title: lang === "ru" ? titleRu : titleUk,
      description: lang === "ru" ? descriptionRu : descriptionUk,
      url: `https://groshi-zaraz.vercel.app/${lang}/mfos/${slug}/promocodes`,
      images: [company.logo || defaultImage],
      siteName: "Фіногляд",
      locale: lang === "ru" ? "ru_RU" : lang === "en" ? "en_US" : "uk_UA",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: lang === "ru" ? titleRu : titleUk,
      description: lang === "ru" ? descriptionRu : descriptionUk,
      images: [company.logo || defaultImage],
      site: "@Finoglyad",
      creator: "@Finoglyad",
    },
  };
}
export default async function PromoCodesPage({
  params,
}: {
  params: Promise<{ lang: string; slug: string }>;
}) {
  const { lang, slug } = await params;
  const t = await getTranslations({ locale: lang, namespace: "PromoCodes" });
  const promoCodes = await getMfoBySlug(slug);

  return (
    <div>
      <h1 className="text-3xl! font-bold text-gray-800 mb-6">{t("title")}</h1>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {promoCodes && promoCodes.length > 0 ? (
          promoCodes.map((promo: any, index: number) => {
            const discount =
              lang === "uk"
                ? promo.discountUk || promo.discount
                : promo.discount;
            const condition =
              lang === "uk"
                ? promo.conditionUk || promo.condition
                : promo.condition;

            return (
              <div
                key={index}
                className="bg-white rounded-2xl shadow border p-6 flex flex-col justify-between"
              >
                <div>
                  <h3 className="text-lg font-semibold text-gray-800 mb-2">
                    {t("code")}:{" "}
                    <span className="text-blue-600">{promo.code}</span>
                  </h3>

                  {discount && <p className="text-gray-700 mb-1">{discount}</p>}

                  {condition && (
                    <p className="text-sm text-gray-500">{condition}</p>
                  )}
                </div>

                {promo.link && (
                  <Link
                    href={promo.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-4 inline-flex items-center justify-center gap-2 text-sm font-medium text-white bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 rounded-xl px-4 py-2 transition"
                  >
                    {t("go")}
                    <ExternalLink className="w-4 h-4" />
                  </Link>
                )}
              </div>
            );
          })
        ) : (
          <p className="text-gray-500 col-span-full">{t("notFound")}</p>
        )}
      </div>
    </div>
  );
}
