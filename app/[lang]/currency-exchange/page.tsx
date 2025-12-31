import React from "react";
import { TrendingUp, TrendingDown, Clock } from "lucide-react";
import { RateNbu } from "@/app/components/CurrencyExchange/RateNbu";
import ConverterService from "@/app/services/converter/converterService";
import { getTranslations } from "next-intl/server";
import { CurrencyConverter } from "@/app/components/CurrencyExchange/CurrencyConverter";
import { FetchExchangeRates } from "@/app/components/CurrencyExchange/FetchExchangeRates";
import { Metadata } from "next";

interface Props {
  params: Promise<{ lang: string }>;
}
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { lang } = await params;

  let messages;
  try {
    messages = (await import(`@/app/messages/${lang}.json`)).CurrencyExchangePage;
  } catch (err) {
    console.error(
      `Messages for lang "${lang}" not found. Falling back to 'uk'`,
      err
    );
    messages = (await import(`@/app/messages/uk.json`)).CurrencyExchangePage;
  }

  const title =
    messages?.meta?.title || "Курсы валют в Украине 2025 – USD, EUR, GBP и конвертер";
  const description =
    messages?.meta?.description ||
    "Актуальные курсы валют в Украине на сегодня. Быстрый конвертер валют для USD, EUR, GBP и других валют. Динамика курсов и популярные направления.";
  const keywords =
    messages?.meta?.keywords ||
    "курс валют, конвертер валют, UAH, USD, EUR, GBP, динамика курсов, популярные направления";

  const ogImage = `https://groshi-zaraz.vercel.app/og-currency-exchange.jpg`; 

  return {
    title,
    description,
    keywords,
    robots: "index, follow",
    openGraph: {
      title,
      description,
      url: `https://groshi-zaraz.vercel.app/${lang}/currency-exchange`,
      siteName: "Groshi-Zaraz",
      type: "website",
      locale: lang === "uk" ? "uk_UA" : "ru_UA",
      images: [
        {
          url: ogImage,
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
      site: "@finoglyad",
      creator: "@finoglyad",
      images: [ogImage],
    },
    alternates: {
      canonical: `https://groshi-zaraz.vercel.app/${lang}/currency-exchange`,
      languages: {
        "uk-UA": `https://groshi-zaraz.vercel.app/uk/currency-exchange`,
        "ru-UA": `https://groshi-zaraz.vercel.app/ru/currency-exchange`,
        "x-default": `https://groshi-zaraz.vercel.app/currency-exchange`,
      },
    },
  };
}

// Интерфейсы
interface Currency {
  code: string;
  name: string;
  flag: string;
}

interface ExchangeRates {
  [key: string]: { rate: number; change: number; trend: string };
}

interface Dynamics {
  [key: string]: {
    direction: string;
    changePercent: string;
  };
}

const getFlagForCurrency = (code: string): string => {
  const flagMap: { [key: string]: string } = {
    USD: "🇺🇸",
    EUR: "🇪🇺",
    GBP: "🇬🇧",
    PLN: "🇵🇱",
    CHF: "🇨🇭",
    CAD: "🇨🇦",
    JPY: "🇯🇵",
    CNY: "🇨🇳",
  };
  return flagMap[code] || "🌐";
};

async function getExchangeRates() {
  try {
    const response = await ConverterService.RatesGet();
    const { date, rates } = response;

    const ratesMap: ExchangeRates = rates.reduce(
      (acc, curr) => ({
        ...acc,
        [curr.cc]: { rate: curr.rate, change: 0, trend: "stable" },
      }),
      {}
    );

    const fetchedCurrencies: Currency[] = [
      { code: "UAH", name: "Украинская гривна", flag: "🇺🇦" },
      ...rates.map((rate) => ({
        code: rate.cc,
        name: rate.txt,
        flag: getFlagForCurrency(rate.cc),
      })),
    ];

    return {
      exchangeRates: ratesMap,
      currencies: fetchedCurrencies,
      lastUpdated: date,
    };
  } catch (err) {
    console.error("Error fetching exchange rates:", err);
    return {
      exchangeRates: {},
      currencies: [{ code: "UAH", name: "Украинская гривна", flag: "🇺🇦" }],
      lastUpdated: "",
    };
  }
}

async function getDynamics() {
  try {
    const currenciesToFetch = ["USD", "EUR", "GBP"];
    const dynamicsData: Dynamics = {};
    for (const currency of currenciesToFetch) {
      const response = await ConverterService.DynamicsGet({ currency });
      dynamicsData[currency] = response;
    }
    return dynamicsData;
  } catch (err) {
    console.error("Error fetching dynamics:", err);
    return {};
  }
}

export default async function CurrencyExchangePage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  const t = await getTranslations({
    locale: lang,
    namespace: "CurrencyExchangePage",
  });

  const { exchangeRates, currencies, lastUpdated } = await getExchangeRates();
  const dynamics = await getDynamics();

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-100 to-purple-100 rounded-2xl p-6 border border-gray-100">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">
          {t("header.title")}
        </h1>
        <p className="text-gray-600">{t("header.subtitle")}</p>
        <div className="flex items-center gap-2 mt-4 text-sm text-gray-500">
          <Clock className="w-4 h-4" />
          <span>
            {t("header.lastUpdated")}: {lastUpdated || "Loading..."}
          </span>
        </div>
      </div>

      {/* Currency Converter - Client Component */}
      <CurrencyConverter
        currencies={currencies}
        exchangeRates={exchangeRates}
        translations={{
          title: t("converter.title"),
          subtitle: t("converter.subtitle"),
          fromLabel: t("converter.fromLabel"),
          toLabel: t("converter.toLabel"),
          placeholder: t("converter.placeholder"),
          errorConversion: t("errors.conversion"),
        }}
      />

      {/* Main Currencies */}
      <div className="bg-gradient-to-br from-white to-gray-50 rounded-3xl shadow-lg p-8 border border-gray-100">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl font-bold text-gray-800 relative inline-block">
            {t("mainCurrencies.title")}
            <div className="absolute -bottom-2 left-0 w-20 h-1 bg-gradient-to-r from-green-500 to-blue-500 rounded-full"></div>
          </h2>
          <FetchExchangeRates lang={lang} />
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {Object.entries(exchangeRates).map(([currency, data]) => (
            <div key={currency} className="group">
              <div className="bg-gradient-to-br from-white to-gray-50 rounded-2xl p-6 shadow-lg hover:shadow-xl border-2 border-transparent hover:border-blue-200 transition-all duration-300 transform hover:scale-105">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <span className="text-3xl group-hover:scale-110 transition-transform duration-300">
                      {currencies.find((c) => c.code === currency)?.flag ||
                        "🌐"}
                    </span>
                    <span className="font-bold text-gray-800 text-lg">
                      {currency}
                    </span>
                  </div>
                  <div
                    className={`flex items-center gap-1 px-2 py-1 rounded-lg ${
                      dynamics[currency]?.direction === "up"
                        ? "bg-green-100 text-green-700"
                        : "bg-red-100 text-red-700"
                    }`}
                  >
                    {dynamics[currency]?.direction === "up" ? (
                      <TrendingUp className="w-4 h-4" />
                    ) : (
                      <TrendingDown className="w-4 h-4" />
                    )}
                    <span className="text-sm font-bold">
                      {+dynamics[currency]?.changePercent > 0 ? "+" : ""}
                      {dynamics[currency]?.changePercent || "0"}%
                    </span>
                  </div>
                </div>
                <div className="text-3xl font-bold text-gray-800 mb-2">
                  {data.rate.toFixed(2)}
                </div>
                <div className="text-sm text-gray-500 font-medium">
                  UAH за 1 {currency}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <RateNbu lang={lang}/>

      {/* Additional Information: Popular Directions & Dynamics */}
      <div className="grid md:grid-cols-2 gap-8">
        {/* Popular Directions */}
        <div className="bg-gradient-to-br from-white to-blue-50 rounded-3xl shadow-lg p-8 border-2 border-transparent hover:border-blue-200 transition-all duration-300">
          <h3 className="text-xl font-bold text-gray-800 mb-6 relative inline-block">
            {t("popularDirections.title")}
            <div className="absolute -bottom-2 left-0 w-16 h-1 bg-gradient-to-r from-blue-500 to-yellow-400 rounded-full"></div>
          </h3>
          <div className="space-y-4">
            {["USD", "EUR", "PLN"].map((currency) => (
              <div
                key={currency}
                className="flex justify-between items-center p-4 bg-gradient-to-br from-white to-gray-50 rounded-xl shadow-md border border-gray-100 hover:shadow-lg transition-all duration-300"
              >
                <div className="flex items-center gap-3">
                  <span className="text-2xl">
                    {currencies.find((c) => c.code === currency)?.flag}➡️🇺🇦
                  </span>
                  <span className="text-gray-700 font-medium">
                    {currency} {t("popularDirections.toUAH")}
                  </span>
                </div>
                <span className="font-bold text-lg text-blue-600">
                  {exchangeRates[currency]?.rate.toFixed(2) || "0"}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Dynamics */}
        <div className="bg-gradient-to-br from-white to-green-50 rounded-3xl shadow-lg p-8 border-2 border-transparent hover:border-green-200 transition-all duration-300">
          <h3 className="text-xl font-bold text-gray-800 mb-6 relative inline-block">
            {t("dynamics.title")}
            <div className="absolute -bottom-2 left-0 w-16 h-1 bg-gradient-to-r from-green-500 to-blue-500 rounded-full"></div>
          </h3>
          <div className="space-y-4">
            {Object.entries(dynamics).map(([currency, data]) => (
              <div
                key={currency}
                className={`flex justify-between items-center p-4 bg-gradient-to-br ${
                  data.direction === "up"
                    ? "from-green-50 to-white"
                    : "from-red-50 to-white"
                } rounded-xl shadow-md border ${
                  data.direction === "up"
                    ? "border-green-100"
                    : "border-red-100"
                } hover:shadow-lg transition-all duration-300`}
              >
                <div className="flex items-center gap-3">
                  <span className="text-2xl">
                    {data.direction === "up" ? "📈" : "📉"}
                  </span>
                  <span className="text-gray-700 font-medium">
                    {currency} ({t("dynamics.week")})
                  </span>
                </div>
                <span
                  className={`font-bold text-lg ${
                    data.direction === "up" ? "text-green-600" : "text-red-600"
                  }`}
                >
                  {+data.changePercent > 0 ? "+" : ""}
                  {data.changePercent}%
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
