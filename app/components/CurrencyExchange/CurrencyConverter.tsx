"use client";
import React, { useState } from "react";
import { SwapButton } from "@/app/components/CurrencyExchange/SwapButton";
import ConverterService from "@/app/services/converter/converterService";

interface Currency {
  code: string;
  name: string;
  flag: string;
}

interface ExchangeRates {
  [key: string]: { rate: number; change: number; trend: string };
}

interface CurrencyConverterProps {
  currencies: Currency[];
  exchangeRates: ExchangeRates;
  translations: {
    title: string;
    subtitle: string;
    fromLabel: string;
    toLabel: string;
    placeholder: string;
    errorConversion: string;
  };
}

export function CurrencyConverter({ 
  currencies, 
  exchangeRates, 
  translations 
}: CurrencyConverterProps) {
  const [fromCurrency, setFromCurrency] = useState<string>("USD");
  const [toCurrency, setToCurrency] = useState<string>("UAH");
  const [amount, setAmount] = useState<string>("100");
  const [convertedAmount, setConvertedAmount] = useState<string>("");
  const [error, setError] = useState<string>("");

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
        setError(translations.errorConversion);
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
      setError(translations.errorConversion);
      setConvertedAmount("");
    }
  };

  return (
    <div className="bg-gradient-to-br from-white to-blue-50 rounded-3xl shadow-lg p-8 border-2 border-transparent hover:border-blue-200 transition-all duration-300">
      {error && (
        <div className="bg-red-100 text-red-700 p-4 rounded-xl text-center mb-6">
          {error}
        </div>
      )}

      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-gray-800 mb-2 relative inline-block">
          {translations.title}
          <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-24 h-1 bg-gradient-to-r from-blue-500 to-yellow-400 rounded-full"></div>
        </h2>
        <p className="text-gray-600 text-sm mt-4">
          {translations.subtitle}
        </p>
      </div>

      <div className="max-w-2xl mx-auto space-y-6">
        {/* From Currency */}
        <div className="bg-gradient-to-br from-gray-50 to-white rounded-2xl p-6 shadow-md border border-gray-100">
          <label className="block text-sm font-semibold text-gray-700 mb-4">
            {translations.fromLabel}
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
              placeholder={translations.placeholder}
              min="0"
            />
          </div>
        </div>

        <SwapButton handleSwapCurrencies={handleSwapCurrencies} />

        {/* To Currency */}
        <div className="bg-gradient-to-br from-yellow-50 to-white rounded-2xl p-6 shadow-md border border-yellow-100">
          <label className="block text-sm font-semibold text-gray-700 mb-4">
            {translations.toLabel}
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
  );
}