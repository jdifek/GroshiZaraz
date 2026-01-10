import React from "react";
import { Star, Clock, TrendingUp, Shield, Users } from "lucide-react";
import { BlueButton } from "@/app/ui/Buttons/BlueButton";
import { GrayButton } from "@/app/ui/Buttons/GrayButton";
import MfoService from "@/app/services/mfos/mfosService";
import { Mfo, RandomKey } from "@/app/services/mfos/mfoTypes";
import Image from "next/image";
import { Link } from "@/app/i18n/navigation";

import SortDropdown from "@/app/components/SortDropdown";
import MFOInteractiveElements from "@/app/components/MFOInteractiveElements";
import MfoSatelliteKeyService from "@/app/services/MfoSatelliteKey/MfoSatelliteKeyService";
import { MfoSatelliteKey } from "@/app/services/MfoSatelliteKey/mfoSatelliteKeyTypes";
import { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { stripHtml } from "@/app/utils/stripHtml";

type MFOSattelitePageProps = {
  params: Promise<{ lang: string; slug: string }>;
  searchParams: Promise<{ sort?: string } | undefined>;
};

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string; slug: string }>;
}): Promise<Metadata> {
  const { lang, slug } = await params;
  const t = await getTranslations({ locale: lang, namespace: "MFOsSlugPage" });

  try {
    const satellite = await MfoSatelliteKeyService.getSatelliteKeyBySlug(slug);

    if (!satellite) {
      return {
        title: t("metadata.notFoundTitle"),
        description: t("metadata.notFoundDescription"),
      };
    }

    const isUa = lang === "uk";

    const title = isUa
      ? satellite.metaTitleUk || satellite.titleUk
      : satellite.metaTitleRu || satellite.titleRu;
    const description = isUa
      ? satellite.metaDescUk ||
        stripHtml(satellite.seoContentUk, 160) ||
        satellite.descriptionUk
      : satellite.metaDescRu ||
        stripHtml(satellite.seoContentRu, 160) ||
        satellite.descriptionRu;
    const defaultImage = "https://finoglyad.com.ua/default-og-image.jpg";

    return {
      title,
      description,
      keywords: satellite.keywords || [],
      openGraph: {
        title,
        description,
        url: `https://finoglyad.com.ua/mfo/${slug}`,
        siteName: "Фіногляд",
        locale: isUa ? "uk_UA" : "ru_RU",
        type: "website",
        images: [
          {
            url: satellite.imageUrl || defaultImage,
            width: 1200,
            height: 630,
            alt: title,
          },
        ],
      },
      twitter: {
        card: "summary_large_image",
        title,
        description,
        images: [satellite.imageUrl || defaultImage],
        site: "@Finoglyad",
        creator: "@Finoglyad",
      },
    };
  } catch (error) {
    console.error("❌ Ошибка генерации метадаты для сателлита:", error);
    return {
      title: t("metadata.errorTitle"),
      description: t("metadata.errorDescription"),
    };
  }
}

export default async function MFOSattelitePage({
  params,
  searchParams,
}: MFOSattelitePageProps) {
  const { lang, slug } = await params;
  const resolvedSearchParams = (await searchParams) ?? {};
  const sortBy = resolvedSearchParams?.sort || "rating";
  let totalMfos =  0;
  let averageRate =  0;
  let satellite: MfoSatelliteKey | null = null;
  let mfos: Mfo[] = [];
  let randomKeys: RandomKey[] = [];

  console.log(
    `📌 Extracted lang="${lang}", slug="${slug}", sortBy="${sortBy}"`
  );
  try {
    // ✅ ОДИН универсальный вызов вместо двух
    [satellite, randomKeys] = await Promise.all([
      MfoService.getSatelliteBySlugUniversal(slug, sortBy),
      MfoService.getRandomKeys(),
    ]);

    if (satellite) {
      mfos = satellite.mfoLinks.map((link) => link.mfo).filter(Boolean);
      totalMfos = satellite?.stats?.totalMfos || 0;
      averageRate = satellite?.stats?.averageRate || 0;
    }
  } catch (error) {
    console.error("❌ Ошибка при загрузке страницы сателлита:", error);
  }

  const visibleCount = 9;
  const t = await getTranslations({ locale: lang, namespace: "MFOsSlugPage" });

  return (
    <div className="min-h-screen">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-800 mb-4 relative inline-block">
            {satellite &&
              (lang === "ru" ? satellite.titleRu : satellite.titleUk)}
            <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-20 h-1 bg-gradient-to-r from-blue-500 to-yellow-400 rounded-full"></div>
          </h1>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            {satellite &&
              (lang === "ru"
                ? satellite.descriptionRu
                : satellite.descriptionUk)}
          </p>
        </div>

        <div className="mb-12">
          <div className="flex flex-wrap gap-3">
            {[
              // активная категория в начале
              ...randomKeys.filter((key) =>
                lang === "uk" ? slug === key.slugUk : slug === key.slugRu
              ),
              // остальные после
              ...randomKeys.filter((key) =>
                lang === "uk" ? slug !== key.slugUk : slug !== key.slugRu
              ),
            ].map((key, index) => {
              const currentSlug = lang === "uk" ? key.slugUk : key.slugRu;
              const currentName = lang === "uk" ? key.nameUk : key.nameRu;
              const isActive = slug === currentSlug;

              return (
                <Link
                  key={index}
                  href={`/mfo/${currentSlug}`}
                  className={`px-4 py-2 rounded-2xl text-sm font-medium transition-all duration-200 border-2 
            ${
              isActive
                ? "bg-blue-500 text-white border-blue-500 hover:bg-blue-600 hover:border-blue-600"
                : "bg-white text-gray-700 border-gray-200 hover:bg-gray-50 hover:border-gray-300"
            }`}
                >
                  {currentName}
                </Link>
              );
            })}
          </div>
        </div>

        {/* Sort and Stats */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-12 gap-4">
          {/* Sort Dropdown - Client Component */}
          <SortDropdown currentSort={sortBy} />

          {/* Stats */}
          <div className="flex items-center gap-6 text-sm text-gray-600">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              <span>{t("stats.found", { count: totalMfos  })} </span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
              <span>{t("stats.averageRate", { rate: averageRate.toFixed(2) })}</span>
            </div>
          </div>
        </div>

        {/* Offers Grid - Server Rendered Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 mb-12">
          {mfos.slice(0, visibleCount).map((offer, index) => (
            <div
              key={offer.id}
              className="bg-white rounded-3xl shadow-lg hover:shadow-xl transition-all duration-300 border-2 border-transparent hover:border-blue-500 group animate-fade-in"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              {/* Header */}
              <div className="p-6 border-b border-gray-100">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-xl flex items-center justify-center text-white text-xl group-hover:scale-110 transition-transform duration-200">
                      <Image
                        unoptimized
                        src={offer.logo}
                        alt={`${offer.name} logo`}
                        width={64}
                        height={64}
                        className="object-cover rounded-2xl"
                      />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-800 text-lg leading-tight">
                        {offer.name}
                      </h3>
                      <div className="flex items-center gap-1 mt-1">
                        {[...Array(Math.round(offer.rating))].map((_, i) => (
                          <Star
                            key={i}
                            className="w-4 h-4 text-yellow-500 fill-current"
                          />
                        ))}
                        <span className="text-sm text-gray-600">
                          {offer.rating}
                        </span>
                        <span className="text-sm text-gray-400">(123)</span>
                      </div>
                    </div>
                  </div>
                  <div className="bg-gradient-to-r from-orange-500 to-red-500 text-white px-2 py-1 rounded-full text-xs font-medium">
                    {t("topLabel")}
                  </div>
                </div>

                {/* Key Info */}
                <div className="grid grid-cols-2 gap-3 mb-4">
                  <div className="bg-gray-50 rounded-2xl p-3">
                    <div className="text-xs text-gray-500 mb-1">
                      {t("keyInfo.amount")}
                    </div>
                    <div className="font-semibold text-gray-800 text-sm">
                      {offer.minAmount.toLocaleString()} -{" "}
                      {offer.maxAmount.toLocaleString()} ₴
                    </div>
                  </div>
                  <div className="bg-gray-50 rounded-2xl p-3">
                    <div className="text-xs text-gray-500 mb-1">
                      {t("keyInfo.term")}
                    </div>
                    <div className="font-semibold text-gray-800 text-sm">
                      до {offer.maxTerm} {t("keyInfo.termUnit")}
                    </div>
                  </div>
                </div>

                {/* Rate and Approval */}
                <div className="flex justify-between items-center mb-4">
                  <div>
                    <div className="text-xl font-bold text-green-600">
                      {offer.dailyRate}%
                    </div>
                    <div className="text-xs text-gray-500">
                      {t("keyInfo.perDay")}
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-lg font-semibold text-blue-600">
                      {offer.approvalRate}%
                    </div>
                    <div className="text-xs text-gray-500">
                      {t("keyInfo.approval")}
                    </div>
                  </div>
                </div>

                {/* Special offers */}
                <div className="bg-green-50 border border-green-200 rounded-2xl p-2 mb-4">
                  <div className="text-xs text-green-700 font-medium">
                    {t("specialOffer.firstLoanFree")}
                  </div>
                </div>

                {/* Advantages */}
                <div className="flex flex-wrap gap-2 mb-4">
                  <span className="bg-blue-50 text-blue-700 px-2 py-1 rounded-full text-xs font-medium">
                    {t("advantages.fast")}
                  </span>
                  <span className="bg-blue-50 text-blue-700 px-2 py-1 rounded-full text-xs font-medium">
                    {t("advantages.convenient")}
                  </span>
                  <span className="bg-gray-100 text-gray-600 px-2 py-1 rounded-full text-xs font-medium">
                    +1
                  </span>
                </div>
              </div>

              {/* Footer */}
              <div className="p-6">
                <div className="flex items-center justify-between mb-4 text-sm text-gray-600">
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4 text-green-500" />
                    <span> {t("footer.minutes")}</span>
                  </div>
                  <div className="flex items-center gap-2">
                 
                  </div>
                </div>

                <div className="flex justify-between">
                  <BlueButton
                    text={t("buttons.getLoan")}
                    link={offer.UtmLink}
                  />
                  <MFOInteractiveElements offer={offer} />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Show More Button - будет работать через URL параметры */}
        {visibleCount < mfos.length && (
          <div className="text-center mb-12">
            <Link
              href={`?sort=${sortBy}&show=${visibleCount + 9}`}
              className="inline-block"
            >
              <GrayButton
                text={`${t("buttons.showMore")} (${
                  mfos.length - visibleCount
                })`}
              />
            </Link>
          </div>
        )}

        {/* Info Section */}
        <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-3xl p-8 text-white shadow-xl mb-12">
          <div className="text-center mb-8">
            <h2 className="text-2xl sm:text-3xl font-bold mb-4">
              {t("infoSection.title")}
            </h2>
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
        {/* SEO Content */}
        {satellite && (satellite.seoContentUk || satellite.seoContentRu) && (
          <div className="bg-white rounded-3xl shadow-lg p-8 mb-12">
            <div
              className="prose prose-lg max-w-none
        prose-headings:text-gray-800 prose-headings:font-bold
        prose-h2:text-2xl prose-h2:mb-4 prose-h2:mt-8
        prose-h3:text-xl prose-h3:mb-3 prose-h3:mt-6
        prose-p:text-gray-700 prose-p:leading-relaxed prose-p:mb-4
        prose-ul:text-gray-700 prose-ul:mb-4
        prose-li:mb-2
        prose-strong:text-gray-800 prose-strong:font-semibold
        prose-a:text-blue-600 prose-a:no-underline hover:prose-a:underline"
              dangerouslySetInnerHTML={{
                __html:
                  lang === "uk"
                    ? satellite.seoContentUk
                    : satellite.seoContentRu,
              }}
            />
          </div>
        )}
      </div>
    </div>
  );
}
