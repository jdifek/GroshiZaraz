/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import React, { useState, useEffect } from "react";
import {
  ArrowUpDown,
  TrendingUp,
  TrendingDown,
  RefreshCw,
  Clock,
} from "lucide-react";
import { RateNbu } from "@/app/components/CurrencyExchange/RateNbu";
import { Dynamics } from "@/app/services/converter/converterTypes";
import ConverterService from "@/app/services/converter/converterService";
import { useTranslations } from "next-intl";

// Интерфейсы
interface Currency {
  code: string;
  name: string;
  flag: string;
}

interface ExchangeRates {
  [key: string]: { rate: number; change: number; trend: string };
}



export default function CurrencyExchangePage({
}) {


  const t = useTranslations("CurrencyExchangePage");

  const [fromCurrency, setFromCurrency] = useState<string>("USD");
  const [toCurrency, setToCurrency] = useState<string>("UAH");
  const [amount, setAmount] = useState<string>("100");
  const [convertedAmount, setConvertedAmount] = useState<string>("");
  const [exchangeRates, setExchangeRates] = useState<ExchangeRates>({});
  const [currencies, setCurrencies] = useState<Currency[]>([
    { code: "UAH", name: "Украинская гривна", flag: "🇺🇦" },
  ]);
  const [lastUpdated, setLastUpdated] = useState<string>("");
  const [dynamics, setDynamics] = useState<Dynamics>({});
  const [error, setError] = useState<string>("");

  useEffect(() => {
    fetchExchangeRates();
    fetchDynamics();
  }, []);

  const fetchExchangeRates = async () => {
    try {
      setError("");
      const response = await ConverterService.RatesGet();
      const { date, rates } = response;

      const ratesMap: ExchangeRates = rates.reduce(
        (acc, curr) => ({
          ...acc,
          [curr.cc]: { rate: curr.rate, change: 0, trend: "stable" },
        }),
        {}
      );
      setExchangeRates(ratesMap);

      const fetchedCurrencies: Currency[] = [
        { code: "UAH", name: "Украинская гривна", flag: "🇺🇦" },
        ...rates.map((rate) => ({
          code: rate.cc,
          name: rate.txt,
          flag: getFlagForCurrency(rate.cc),
        })),
      ];
      setCurrencies(fetchedCurrencies);
      setLastUpdated(date);

      if (amount && fromCurrency && toCurrency) {
        await handleAmountChange(amount);
      }
    } catch (err) {
      console.error("Error fetching exchange rates:", err);
      setError(t("errors.ratesLoad"));
    }
  };

  const fetchDynamics = async () => {
    try {
      setError("");
      const currenciesToFetch = ["USD", "EUR", "GBP"];
      const dynamicsData: Dynamics = {};
      for (const currency of currenciesToFetch) {
        const response = await ConverterService.DynamicsGet({ currency });
        dynamicsData[currency] = response;
      }
      setDynamics(dynamicsData);
    } catch (err) {
      console.error("Error fetching dynamics:", err);
      setError(t("errors.dynamicsLoad"));
    }
  };

  const handleSwapCurrencies = async () => {
    setError("");
    const tempFrom = fromCurrency;
    const tempAmount = amount;
    setFromCurrency(toCurrency);
    setToCurrency(tempFrom);
    if (tempAmount && !isNaN(parseFloat(tempAmount))) {
      try {
        const response = await ConverterService.SwapCurrencies({
          toCurrency,
          tempFrom,
          tempAmount,
        });
        setConvertedAmount(response.result);
        setAmount(response.result);
      } catch (err) {
        console.error("Error converting currency during swap:", err);
        setError(t("errors.conversion"));
        setConvertedAmount("");
      }
    } else {
      setConvertedAmount("");
    }
  };

  const handleAmountChange = async (value: string) => {
    setAmount(value);
    setError("");
    if (!value || isNaN(parseFloat(value)) || parseFloat(value) <= 0) {
      setConvertedAmount("");
      return;
    }
    try {
      const response = await ConverterService.AmountChange({
        fromCurrency,
        toCurrency,
        value,
      });
      setConvertedAmount(response.result);
    } catch (err) {
      console.error("Error converting currency:", err);
      setError(t("errors.conversion"));
      setConvertedAmount("");
    }
  };

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

  return (
    <div className="space-y-8">
      {error && (
        <div className="bg-red-100 text-red-700 p-4 rounded-xl text-center">
          {error}
        </div>
      )}

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

      {/* Currency Converter */}
      <div className="bg-gradient-to-br from-white to-blue-50 rounded-3xl shadow-lg p-8 border-2 border-transparent hover:border-blue-200 transition-all duration-300">
        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-2 relative inline-block">
            {t("converter.title")}
            <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-24 h-1 bg-gradient-to-r from-blue-500 to-yellow-400 rounded-full"></div>
          </h2>
          <p className="text-gray-600 text-sm mt-4">
            {t("converter.subtitle")}
          </p>
        </div>

        <div className="max-w-2xl mx-auto space-y-6">
          {/* From Currency */}
          <div className="bg-gradient-to-br from-gray-50 to-white rounded-2xl p-6 shadow-md border border-gray-100">
            <label className="block text-sm font-semibold text-gray-700 mb-4">
              {t("converter.fromLabel")}
            </label>
            <div className="flex flex-col sm:flex-row gap-4">
              <select
                value={fromCurrency}
                onChange={(e) => setFromCurrency(e.target.value)}
                className="flex-1 bg-white border-2 border-gray-200 rounded-xl px-4 py-4 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 font-medium"
              >
                {currencies.map((currency) => (
                  <option key={currency.code} value={currency.code}>
                    {currency.flag} {currency.code} - {currency.name}
                  </option>
                ))}
              </select>
              <input
                type="number"
                value={amount}
                onChange={(e) => handleAmountChange(e.target.value)}
                className="sm:w-40 bg-white border-2 border-gray-200 rounded-xl px-4 py-4 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 font-bold text-xl text-center"
                placeholder={t("converter.placeholder")}
                min="0"
              />
            </div>
          </div>

          {/* Swap Button */}
          <div className="flex justify-center">
            <button
              onClick={handleSwapCurrencies}
              className="bg-gradient-to-br from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white rounded-full p-4 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-110 group"
            >
              <ArrowUpDown className="w-6 h-6 group-hover:rotate-180 transition-transform duration-300" />
            </button>
          </div>

          {/* To Currency */}
          <div className="bg-gradient-to-br from-yellow-50 to-white rounded-2xl p-6 shadow-md border border-yellow-100">
            <label className="block text-sm font-semibold text-gray-700 mb-4">
              {t("converter.toLabel")}
            </label>
            <div className="flex flex-col sm:flex-row gap-4">
              <select
                value={toCurrency}
                onChange={(e) => setToCurrency(e.target.value)}
                className="flex-1 bg-white border-2 border-gray-200 rounded-xl px-4 py-4 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent transition-all duration-200 font-medium"
              >
                {currencies.map((currency) => (
                  <option key={currency.code} value={currency.code}>
                    {currency.flag} {currency.code} - {currency.name}
                  </option>
                ))}
              </select>
              <div className="sm:w-40 bg-gradient-to-br from-yellow-100 to-yellow-50 border-2 border-yellow-200 rounded-xl px-4 py-4 font-bold text-xl text-center text-yellow-800">
                {convertedAmount || "0"}
              </div>
            </div>
          </div>

          {/* Exchange Rate Info */}
          {fromCurrency !== "UAH" &&
            toCurrency === "UAH" &&
            exchangeRates[fromCurrency] && (
              <div className="bg-gradient-to-r from-blue-50 to-yellow-50 rounded-xl p-4 border border-blue-100">
                <div className="flex items-center justify-center gap-2">
                  <span className="text-2xl">
                    {currencies.find((c) => c.code === fromCurrency)?.flag}
                  </span>
                  <p className="text-sm font-medium text-gray-700">
                    1 {fromCurrency} ={" "}
                    <span className="font-bold text-blue-600">
                      {exchangeRates[fromCurrency]?.rate.toFixed(2)}
                    </span>{" "}
                    UAH
                  </p>
                  <span className="text-2xl">🇺🇦</span>
                </div>
              </div>
            )}
        </div>
      </div>

      {/* Main Currencies */}
      <div className="bg-gradient-to-br from-white to-gray-50 rounded-3xl shadow-lg p-8 border border-gray-100">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl font-bold text-gray-800 relative inline-block">
            {t("mainCurrencies.title")}
            <div className="absolute -bottom-2 left-0 w-20 h-1 bg-gradient-to-r from-green-500 to-blue-500 rounded-full"></div>
          </h2>
          <button
            onClick={fetchExchangeRates}
            className="flex cursor-pointer items-center gap-2 bg-gradient-to-br from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white px-4 py-2 rounded-xl transition-all duration-300 shadow-md hover:shadow-lg transform hover:scale-105"
          >
            <RefreshCw className="w-4 h-4" />
            <span className="text-sm font-medium">
              {t("mainCurrencies.refresh")}
            </span>
          </button>
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

      <RateNbu />

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
