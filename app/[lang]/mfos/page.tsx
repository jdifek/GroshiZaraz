import React from "react";
import { TrendingUp, Shield, Users } from "lucide-react";
import MfoService from "@/app/services/mfos/mfosService";
import { getTranslations } from "next-intl/server";
import Link from "next/link";
import SEOLoansContent from "@/app/components/SEOLoansContent";
import { MFOsPageClient } from "@/app/components/MFOs/MFOsPageClient";

export const dynamic = "force-dynamic";

async function getMFOsData(sortBy: string = "rating") {
  try {
    const mfos = await MfoService.getAllMfos(sortBy);
    const randomKeys = await MfoService.getRandomKeys();
    return { mfos, randomKeys };
  } catch (error) {
    console.error("Error fetching MFOs:", error);
    return { mfos: [], randomKeys: [] };
  }
}

export default async function MFOsPage({
  params,
  searchParams,
}: {
  params: Promise<{ lang: string }>;
  searchParams: Promise<{ sort?: string }>;
}) {
  const { lang } = await params;
  const { sort = "rating" } = await searchParams;
  
  const t = await getTranslations({
    locale: lang,
    namespace: "MFOsPage",
  });

  const { mfos, randomKeys } = await getMFOsData(sort);

  const sortOptions = [
    { value: "rating", label: t("sort.rating") },
    { value: "rate", label: t("sort.rate") },
    { value: "approval", label: t("sort.approval") },
    { value: "responseTime", label: t("sort.responseTime") },
    { value: "maxAmount", label: t("sort.maxAmount") },
  ];

  return (
    <div className="min-h-screen">
      <div className="max-w-7xl mx-auto">
        {/* Header - SSR */}
        <div className="text-center mb-12">
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-800 mb-4 relative inline-block">
            {t("header.title")}
            <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-20 h-1 bg-gradient-to-r from-blue-500 to-yellow-400 rounded-full"></div>
          </h1>
          <h2 className="text-gray-600 text-lg max-w-2xl mx-auto">
            {t("header.subtitle")}
          </h2>
        </div>

        {/* Categories - SSR */}
        <div className="mb-12">
          <div className="flex flex-wrap gap-3">
            {randomKeys.map((key, index) => {
              const slug = lang === "uk" ? key.slugUk : key.slugRu;
              const name = lang === "uk" ? key.nameUk : key.nameRu;
              return (
                <Link
                  key={index}
                  href={`/mfo/${slug}`}
                  className="px-4 py-2 rounded-2xl text-sm font-medium transition-all duration-200 bg-white text-gray-700 hover:bg-gray-50 border-2 border-gray-200 hover:scale-105"
                >
                  {name}
                </Link>
              );
            })}
          </div>
        </div>

        {/* Client Component for Interactive Parts */}
        <MFOsPageClient
          initialMfos={mfos}
          initialSort={sort}
          sortOptions={sortOptions}
          lang={lang}
          translations={{
            sort: {
              found: t("sort.found"),
              averageRate: t("sort.averageRate"),
            },
            topLabel: t("topLabel"),
            keyInfo: {
              amount: t("keyInfo.amount"),
              term: t("keyInfo.term"),
              perDay: t("keyInfo.perDay"),
              approval: t("keyInfo.approval"),
              rate: t("keyInfo.rate"),
            },
            specialOffer: {
              firstLoanFree: t("specialOffer.firstLoanFree"),
            },
            advantages: {
              fast: t("advantages.fast"),
              convenient: t("advantages.convenient"),
              plus1: t("advantages.plus1"),
            },
            footer: {
              minutes: t("footer.minutes"),
              time: t("footer.time"),
            },
            buttons: {
              getLoan: t("buttons.getLoan"),
              showMore: t("buttons.showMore"),
              apply: t("buttons.apply"),
            },
            modal: {
              title: t("modal.title"),
              redirectNotice: t("modal.redirectNotice"),
            },
          }}
        />

        {/* Info Section - SSR */}
        <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-3xl p-8 text-white shadow-xl mb-12">
          <div className="text-center mb-8">
            <p className="text-2xl sm:text-3xl font-bold mb-4">
              {t("infoSection.title")}
            </p>
            <p className="text-lg text-blue-100 max-w-2xl mx-auto">
              {t("infoSection.subtitle")}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white/10 rounded-2xl p-6 backdrop-blur-sm hover:bg-white/20 transition-all duration-300">
              <TrendingUp className="w-8 h-8 mb-4" />
              <h3 className="text-lg font-semibold mb-2">
                {t("infoSection.compareConditions.title")}
              </h3>
              <p className="text-blue-100">
                {t("infoSection.compareConditions.text")}
              </p>
            </div>

            <div className="bg-white/10 rounded-2xl p-6 backdrop-blur-sm hover:bg-white/20 transition-all duration-300">
              <Users className="w-8 h-8 mb-4" />
              <h3 className="text-lg font-semibold mb-2">
                {t("infoSection.reviews.title")}
              </h3>
              <p className="text-blue-100">{t("infoSection.reviews.text")}</p>
            </div>

            <div className="bg-white/10 rounded-2xl p-6 backdrop-blur-sm hover:bg-white/20 transition-all duration-300">
              <Shield className="w-8 h-8 mb-4" />
              <h3 className="text-lg font-semibold mb-2">
                {t("infoSection.reliability.title")}
              </h3>
              <p className="text-blue-100">
                {t("infoSection.reliability.text")}
              </p>
            </div>
          </div>
        </div>

        <SEOLoansContent />
      </div>
    </div>
  );
}