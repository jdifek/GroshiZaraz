import MfoService from "@/app/services/mfos/mfosService";
import { Award, Globe, Phone } from "lucide-react";
import { Metadata } from "next";
import { getTranslations } from "next-intl/server";

const getMfoBySlug = async (slug: string) => {
  try {
    const response = await MfoService.getMfoBySlug(slug);

    console.log(response, "rdsadsaddas");

    return {
      name: response.name,
      logo: response.logo,
      rating: response.rating,
      reviews: response.reviews,
      minAmount: response.minAmount,
      maxAmount: response.maxAmount,
      term: response.minTerm + "-" + response.maxTerm,
      rate: response.rating,
      approval: response.approvalRate,
      responseTime: response.decisionTime,
      commission: "0% to be",
      ageLimit: `${response.ageFrom} - ${response.ageTo}`,
      firstLoanFree: true,
      phone: response.phone,
      website: response.website,
      license: response.licenseNumber,
      workTimeWeekdays: response.workTimeWeekdays,
      workTimeWeekend: response.workTimeWeekend,
      workTimeOnline: response.workTimeOnline,
    };
  } catch (error) {
    console.error("Error loading company:", error);
    return null;
  }
};

// Генерация метаданных для страницы контактов
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string; lang: string }>;
}): Promise<Metadata> {
  const { slug, lang } = await params;
  const company = await getMfoBySlug(slug);
  const defaultImage = "https://finoglyad.com.ua/default-og-image.jpg";

  if (!company) {
    return {
      title:
        lang === "ru"
          ? "Фіногляд — МФО не найдено"
          : "Фіногляд — МФО не знайдено",
      description:
        lang === "ru"
          ? "Похоже, запрашиваемая страница не существует."
          : "Схоже, запитувана сторінка не існує.",
      keywords:
        lang === "ru"
          ? "МФО, контакты, не найдено"
          : "МФО, контакти, не знайдено",
    };
  }

  const titleRu = `${company.name} — Контактная информация МФО`;
  const descriptionRu = `Контакты МФО ${company.name}: телефон, сайт, лицензия и режим работы. Узнайте, как быстро оформить займ и получить поддержку онлайн.`;
  const keywordsRu = `МФО, контакты, ${company.name}, телефон, сайт, лицензия`;

  const titleUk = `${company.name} — Контактна інформація МФО`;
  const descriptionUk = `Контакти МФО ${company.name}: телефон, сайт, ліцензія та режим роботи. Дізнайтесь, як швидко оформити позику та отримати підтримку онлайн.`;
  const keywordsUk = `МФО, контакти, ${company.name}, телефон, сайт, ліцензія`;

  return {
    title: lang === "ru" ? titleRu : titleUk,
    description: lang === "ru" ? descriptionRu : descriptionUk,
    keywords: lang === "ru" ? keywordsRu : keywordsUk,
    openGraph: {
      title: lang === "ru" ? titleRu : titleUk,
      description: lang === "ru" ? descriptionRu : descriptionUk,
      url: `https://finoglyad.com.ua/${lang}/mfos/${slug}/contacts`,
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

export default async function ContactsPage({
  params,
}: {
  params: Promise<{ slug: string; lang: string }>;
}) {
  const { slug, lang } = await params;
  const companyInfo = await getMfoBySlug(slug);
  const t = await getTranslations({ locale: lang, namespace: "ContactsPage" });

  return (
    <div>
      <h1 className="text-3xl! font-bold text-gray-800 mb-6">
        {t("title", { name: companyInfo?.name || "" })}
      </h1>
      <div className="grid md:grid-cols-2 gap-8">
        <div className="space-y-4">
          <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-2xl">
            <Phone className="w-8 h-8 text-blue-600" />
            <div>
              <div className="font-semibold text-gray-800">{t("phone")}</div>
              <div className="text-blue-600">{companyInfo?.phone}</div>
            </div>
          </div>
          <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-2xl">
            <Globe className="w-8 h-8 text-blue-600" />
            <div>
              <div className="font-semibold text-gray-800">{t("website")}</div>
              <div className="text-blue-600">{companyInfo?.website}</div>
            </div>
          </div>
          <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-2xl">
            <Award className="w-8 h-8 text-blue-600" />
            <div>
              <div className="font-semibold text-gray-800">{t("license")}</div>
              <div className="text-gray-600">{companyInfo?.license}</div>
            </div>
          </div>
        </div>
        <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-2xl p-6 border border-blue-200">
          <h3 className="text-xl font-semibold text-gray-800 mb-4">
            {t("workTime")}
          </h3>

          <div className="space-y-2">
            <div className="flex justify-between">
              <span className="text-gray-600">{t("weekdays")}:</span>
              <span className="font-semibold">
                {companyInfo?.workTimeWeekdays}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">{t("weekend")}:</span>
              <span className="font-semibold">
                {companyInfo?.workTimeWeekend}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">{t("onlineApplications")}:</span>
              <span className="font-semibold text-green-600">
                {companyInfo?.workTimeOnline}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
