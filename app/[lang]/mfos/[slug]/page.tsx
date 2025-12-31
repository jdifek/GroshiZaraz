import React from "react";
import { CheckCircle } from "lucide-react";
import MfoService from "@/app/services/mfos/mfosService";
import { Metadata } from "next";
import { getTranslations } from "next-intl/server";

type MfoDetailsPageProps = {
  params: Promise<{ lang: string; slug: string }>;
};

type MappedMfo = {
  name: string;
  logo: string;
  description?: string;
  instantApproval?: boolean;
  support24?: boolean;
  noIncomeProof?: boolean;
  flexibleTerms?: boolean;
  safeTransactions?: boolean;
  rating: number;
  reviews: number;
  color: string;
  minAmount: number;
  maxAmount: number;
  term: string;
  rate: number;
  approval: number;
  responseTime: string;
  commission: string;
  ageLimit: string;
  isFirstLoanZero: boolean;
  phone?: string;
  website?: string;
  license?: string;
};

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string; lang: string }>;
}): Promise<Metadata> {
  const { slug, lang } = await params;
  const company = await MfoService.getMfoBySlug(slug);
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
      keywords: "",
    };
  }

  const titleRu = `${company.name} — Условия займа и информация о МФО`;
  const titleUk = `${company.name} — Умови позики та інформація про МФО`;

  const descriptionRu = `Информация о МФО ${company.name}: условия займа, максимальная и минимальная сумма, ставка, возраст заемщика, преимущества, первый займ 0%, поддержка 24/7.`;
  const descriptionUk = `Інформація про МФО ${company.name}: умови позики, максимальна та мінімальна сума, ставка, вік позичальника, переваги, перша позика 0%, підтримка 24/7.`;

  const keywordsRu = `МФО, ${company.name}, займ, кредит, условия, первый займ 0%, поддержка 24/7, процентная ставка`;
  const keywordsUk = `МФО, ${company.name}, позика, кредит, умови, перша позика 0%, підтримка 24/7, відсоткова ставка`;

  return {
    title: lang === "ru" ? titleRu : titleUk,
    description: lang === "ru" ? descriptionRu : descriptionUk,
    keywords: lang === "ru" ? keywordsRu : keywordsUk,
    openGraph: {
      title: lang === "ru" ? titleRu : titleUk,
      description: lang === "ru" ? descriptionRu : descriptionUk,
      url: `https://finoglyad.com.ua/${lang}/mfos/${slug}`,
      images: [company.logo || defaultImage],
      siteName: "Фіногляд",
      locale: lang === "ru" ? "ru_RU" : "uk_UA",
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

const MfoDetails = async ({ params }: MfoDetailsPageProps) => {
  const { slug, lang } = await params;
  const t = await getTranslations({
    locale: lang,
    namespace: "MfoDetailsPage",
  });

  let companyInfo: MappedMfo | null = null;

  try {
    const response = await MfoService.getMfoBySlug(slug);

    companyInfo = {
      name: response.name,
      description: response.description,
      logo: response.logo,
      rating: response.rating,
      reviews: response.reviews,
      minAmount: response.minAmount,
      maxAmount: response.maxAmount,
      term: response.minTerm + "-" + response.maxTerm,
      rate: response.rateMin,
      approval: response.approvalRate,
      responseTime: response.decisionTime,
      commission: response.commission ? `${response.commission}%` : "0%",
      ageLimit: `${response.ageFrom}-${response.ageTo}`,
      isFirstLoanZero: response.isFirstLoanZero,
      instantApproval: response.isInstantApproval,
      noIncomeProof: response.isNoIncomeProof,
      support24: response.is24Support,
      safeTransactions: response.isSafeTransactions,
      flexibleTerms: response.isFlexibleTerms,
      phone: response.phone,
      website: response.website,
      license: response.licenseNumber,
      color: "",
    };
  } catch (err) {
    console.error("Error loading company info:", err);
    return (
      <div>
        {lang === "ru" ? "Компания не найдена" : "Компанія не знайдена"}
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto">
      <h1 className="text-3xl! font-bold text-gray-800 mb-6">
        {t("loanInfoTitle", { name: companyInfo.name })}
      </h1>

      <div className="grid lg:grid-cols-2 gap-8 mb-8">
        <div>
          <h3 className="text-xl font-semibold text-gray-800 mb-4">
            {t("loanTerms")}
          </h3>
          <div className="space-y-3">
            <div className="flex justify-between py-2 border-b border-gray-100">
              <span className="text-gray-600">{t("maxAmount")}</span>
              <span className="font-semibold text-gray-800">
                {companyInfo.maxAmount} ₴
              </span>
            </div>
            <div className="flex justify-between py-2 border-b border-gray-100">
              <span className="text-gray-600">{t("minAmount")}</span>
              <span className="font-semibold text-gray-800">
                {companyInfo.minAmount} ₴
              </span>
            </div>
            <div className="flex justify-between py-2 border-b border-gray-100">
              <span className="text-gray-600">{t("loanTerm")}</span>
              <span className="font-semibold text-gray-800">
                {companyInfo.term}
              </span>
            </div>
            <div className="flex justify-between py-2 border-b border-gray-100">
              <span className="text-gray-600">{t("interestRate")}</span>
              <span className="font-semibold text-gray-800">
                {companyInfo.rate} %
              </span>
            </div>
            <div className="flex justify-between py-2 border-b border-gray-100">
              <span className="text-gray-600">{t("ageLimit")}</span>
              <span className="font-semibold text-gray-800">
                {companyInfo.ageLimit} {lang === "ru" ? "лет" : "років"}
              </span>
            </div>
            <div className="flex justify-between py-2">
              <span className="text-gray-600">{t("approvalTime")}</span>
              <span className="font-semibold text-gray-800">
                {companyInfo.responseTime}
              </span>
            </div>
          </div>
        </div>

        <div>
          <h3 className="text-xl font-semibold text-gray-800 mb-4">
            {t("advantages")}
          </h3>
          <div className="space-y-3">
            {companyInfo.isFirstLoanZero && (
              <div className="flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-green-600 mt-0.5" />
                <span className="text-gray-700">{t("firstLoanZero")}</span>
              </div>
            )}
            {companyInfo.instantApproval && (
              <div className="flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-green-600 mt-0.5" />
                <span className="text-gray-700">{t("instantApproval")}</span>
              </div>
            )}
            {companyInfo.noIncomeProof && (
              <div className="flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-green-600 mt-0.5" />
                <span className="text-gray-700">{t("noIncomeProof")}</span>
              </div>
            )}
            {companyInfo.support24 && (
              <div className="flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-green-600 mt-0.5" />
                <span className="text-gray-700">{t("support24")}</span>
              </div>
            )}
            {companyInfo.safeTransactions && (
              <div className="flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-green-600 mt-0.5" />
                <span className="text-gray-700">{t("safeTransactions")}</span>
              </div>
            )}
            {companyInfo.flexibleTerms && (
              <div className="flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-green-600 mt-0.5" />
                <span className="text-gray-700">{t("flexibleTerms")}</span>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="bg-gradient-to-r h-auto from-blue-50 to-blue-100 rounded-2xl p-6 border border-blue-200">
        <h3 className="text-xl font-semibold text-gray-800 mb-4">
          {t("aboutCompany")}
        </h3>
        <p className="text-gray-700 break-words">{companyInfo.description}</p>
      </div>
    </div>
  );
};

export default MfoDetails;
