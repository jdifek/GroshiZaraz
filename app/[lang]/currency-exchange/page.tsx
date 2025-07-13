'use client'
import React, { useState } from 'react';
import { ArrowUpDown, TrendingUp, TrendingDown, RefreshCw, Clock } from 'lucide-react';
import { RateNbu } from '@/app/components/CurrencyExchange/RateNbu';
interface CurrencyData {
  rate: number;
  change: number;
  trend: string;
}

// Define the structure for exchangeRates with an index signature
interface ExchangeRates {
  [key: string]: CurrencyData;
}

// Define the structure for currency options
interface Currency {
  code: string;
  name: string;
  flag: string;
}
export default function CurrencyExchangePage() {
  const [fromCurrency, setFromCurrency] = useState('USD');
  const [toCurrency, setToCurrency] = useState('UAH');
  const [amount, setAmount] = useState('100');
  const [convertedAmount, setConvertedAmount] = useState('7884');

  // Заглушки для курсов валют
  const exchangeRates: ExchangeRates = {
    USD: { rate: 78.84, change: 0.05, trend: 'up' },
    EUR: { rate: 93.01, change: -0.12, trend: 'down' },
    GBP: { rate: 105.67, change: 0.23, trend: 'up' },
    PLN: { rate: 19.34, change: -0.08, trend: 'down' },
    CHF: { rate: 89.12, change: 0.15, trend: 'up' },
    CAD: { rate: 58.23, change: 0.07, trend: 'up' },
    JPY: { rate: 0.52, change: -0.01, trend: 'down' },
    CNY: { rate: 10.95, change: 0.03, trend: 'up' },
  };
  
  const currencies: Currency[] = [
    { code: 'UAH', name: 'Украинская гривна', flag: '🇺🇦' },
    { code: 'USD', name: 'Доллар США', flag: '🇺🇸' },
    { code: 'EUR', name: 'Евро', flag: '🇪🇺' },
    { code: 'GBP', name: 'Фунт стерлингов', flag: '🇬🇧' },
    { code: 'PLN', name: 'Польский злотый', flag: '🇵🇱' },
    { code: 'CHF', name: 'Швейцарский франк', flag: '🇨🇭' },
    { code: 'CAD', name: 'Канадский доллар', flag: '🇨🇦' },
    { code: 'JPY', name: 'Японская иена', flag: '🇯🇵' },
    { code: 'CNY', name: 'Китайский юань', flag: '🇨🇳' },
  ];

  const handleSwapCurrencies = () => {
    setFromCurrency(toCurrency);
    setToCurrency(fromCurrency);
    // Пересчитать сумму
    if (fromCurrency !== 'UAH' && toCurrency !== 'UAH') {
      const newAmount = (parseFloat(convertedAmount) * exchangeRates[toCurrency]?.rate / exchangeRates[fromCurrency]?.rate).toFixed(2);
      setConvertedAmount(amount);
      setAmount(newAmount);
    }
  };

  const handleAmountChange = (value: string) => {
    setAmount(value);
    // Расчет конвертации (заглушка)
    if (fromCurrency === 'UAH') {
      const rate = exchangeRates[toCurrency]?.rate || 1;
      setConvertedAmount((parseFloat(value) / rate).toFixed(2));
    } else if (toCurrency === 'UAH') {
      const rate = exchangeRates[fromCurrency]?.rate || 1;
      setConvertedAmount((parseFloat(value) * rate).toFixed(2));
    } else {
      const fromRate = exchangeRates[fromCurrency]?.rate || 1;
      const toRate = exchangeRates[toCurrency]?.rate || 1;
      setConvertedAmount((parseFloat(value) * fromRate / toRate).toFixed(2));
    }
  };

  return (
    <div className="space-y-8">
      {/* Заголовок */}
      <div className="bg-gradient-to-r from-blue-100 to-purple-100 rounded-2xl p-6 border border-gray-100">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">
          Курсы валют
        </h1>
        <p className="text-gray-600">
          Актуальные курсы валют и конвертер
        </p>
        <div className="flex items-center gap-2 mt-4 text-sm text-gray-500">
          <Clock className="w-4 h-4" />
          <span>Обновлено: 12 июля 2025, 14:30</span>
        </div>
      </div>

      {/* Конвертер валют */}
      <div className="bg-gradient-to-br from-white to-blue-50 rounded-3xl shadow-lg p-8 border-2 border-transparent hover:border-blue-200 transition-all duration-300">
        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-2 relative inline-block">
            Конвертер валют
            <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-24 h-1 bg-gradient-to-r from-blue-500 to-yellow-400 rounded-full"></div>
          </h2>
          <p className="text-gray-600 text-sm mt-4">Мгновенный расчет по актуальным курсам</p>
        </div>
        
        <div className="max-w-2xl mx-auto space-y-6">
          {/* Поле "Из" */}
          <div className="bg-gradient-to-br from-gray-50 to-white rounded-2xl p-6 shadow-md border border-gray-100">
            <label className="block text-sm font-semibold text-gray-700 mb-4">Из какой валюты</label>
            <div className="flex flex-col sm:flex-row gap-4">
              <select
                value={fromCurrency}
                onChange={(e) => setFromCurrency(e.target.value)}
                className="flex-1 bg-white border-2 border-gray-200 rounded-xl px-4 py-4 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 font-medium"
              >
                {currencies.map(currency => (
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
                placeholder="0"
              />
            </div>
          </div>

          {/* Кнопка обмена */}
          <div className="flex justify-center">
            <button
              onClick={handleSwapCurrencies}
              className="bg-gradient-to-br from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white rounded-full p-4 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-110 group"
            >
              <ArrowUpDown className="w-6 h-6 group-hover:rotate-180 transition-transform duration-300" />
            </button>
          </div>

          {/* Поле "В" */}
          <div className="bg-gradient-to-br from-yellow-50 to-white rounded-2xl p-6 shadow-md border border-yellow-100">
            <label className="block text-sm font-semibold text-gray-700 mb-4">В какую валюту</label>
            <div className="flex flex-col sm:flex-row gap-4">
              <select
                value={toCurrency}
                onChange={(e) => setToCurrency(e.target.value)}
                className="flex-1 bg-white border-2 border-gray-200 rounded-xl px-4 py-4 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent transition-all duration-200 font-medium"
              >
                {currencies.map(currency => (
                  <option key={currency.code} value={currency.code}>
                    {currency.flag} {currency.code} - {currency.name}
                  </option>
                ))}
              </select>
              <div className="sm:w-40 bg-gradient-to-br from-yellow-100 to-yellow-50 border-2 border-yellow-200 rounded-xl px-4 py-4 font-bold text-xl text-center text-yellow-800">
                {convertedAmount}
              </div>
            </div>
          </div>

          {/* Информация о курсе */}
          {fromCurrency !== 'UAH' && toCurrency === 'UAH' && (
            <div className="bg-gradient-to-r from-blue-50 to-yellow-50 rounded-xl p-4 border border-blue-100">
              <div className="flex items-center justify-center gap-2">
                <span className="text-2xl">{currencies.find(c => c.code === fromCurrency)?.flag}</span>
                <p className="text-sm font-medium text-gray-700">
                  1 {fromCurrency} = <span className="font-bold text-blue-600">{exchangeRates[fromCurrency]?.rate}</span> UAH
                </p>
                <span className="text-2xl">🇺🇦</span>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Основные валюты */}
      <div className="bg-gradient-to-br from-white to-gray-50 rounded-3xl shadow-lg p-8 border border-gray-100">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl font-bold text-gray-800 relative inline-block">
            Основные валюты
            <div className="absolute -bottom-2 left-0 w-20 h-1 bg-gradient-to-r from-green-500 to-blue-500 rounded-full"></div>
          </h2>
          <button className="flex items-center gap-2 bg-gradient-to-br from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white px-4 py-2 rounded-xl transition-all duration-300 shadow-md hover:shadow-lg transform hover:scale-105">
            <RefreshCw className="w-4 h-4" />
            <span className="text-sm font-medium">Обновить</span>
          </button>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {Object.entries(exchangeRates).map(([currency, data]) => (
            <div key={currency} className="group">
              <div className="bg-gradient-to-br from-white to-gray-50 rounded-2xl p-6 shadow-lg hover:shadow-xl border-2 border-transparent hover:border-blue-200 transition-all duration-300 transform hover:scale-105">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <span className="text-3xl group-hover:scale-110 transition-transform duration-300">
                      {currencies.find(c => c.code === currency)?.flag}
                    </span>
                    <span className="font-bold text-gray-800 text-lg">{currency}</span>
                  </div>
                  <div className={`flex items-center gap-1 px-2 py-1 rounded-lg ${
                    data.trend === 'up' 
                      ? 'bg-green-100 text-green-700' 
                      : 'bg-red-100 text-red-700'
                  }`}>
                    {data.trend === 'up' ? <TrendingUp className="w-4 h-4" /> : <TrendingDown className="w-4 h-4" />}
                    <span className="text-sm font-bold">
                      {data.change > 0 ? '+' : ''}{data.change}
                    </span>
                  </div>
                </div>
                <div className="text-3xl font-bold text-gray-800 mb-2">
                  {data.rate}
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

      {/* Дополнительная информация */}
      <div className="grid md:grid-cols-2 gap-8">
        <div className="bg-gradient-to-br from-white to-blue-50 rounded-3xl shadow-lg p-8 border-2 border-transparent hover:border-blue-200 transition-all duration-300">
          <h3 className="text-xl font-bold text-gray-800 mb-6 relative inline-block">
            Популярные направления
            <div className="absolute -bottom-2 left-0 w-16 h-1 bg-gradient-to-r from-blue-500 to-yellow-400 rounded-full"></div>
          </h3>
          <div className="space-y-4">
            <div className="flex justify-between items-center p-4 bg-gradient-to-br from-white to-gray-50 rounded-xl shadow-md border border-gray-100 hover:shadow-lg transition-all duration-300">
              <div className="flex items-center gap-3">
                <span className="text-2xl">🇺🇸➡️🇺🇦</span>
                <span className="text-gray-700 font-medium">USD → UAH</span>
              </div>
              <span className="font-bold text-lg text-blue-600">78.84</span>
            </div>
            <div className="flex justify-between items-center p-4 bg-gradient-to-br from-white to-gray-50 rounded-xl shadow-md border border-gray-100 hover:shadow-lg transition-all duration-300">
              <div className="flex items-center gap-3">
                <span className="text-2xl">🇪🇺➡️🇺🇦</span>
                <span className="text-gray-700 font-medium">EUR → UAH</span>
              </div>
              <span className="font-bold text-lg text-blue-600">93.01</span>
            </div>
            <div className="flex justify-between items-center p-4 bg-gradient-to-br from-white to-gray-50 rounded-xl shadow-md border border-gray-100 hover:shadow-lg transition-all duration-300">
              <div className="flex items-center gap-3">
                <span className="text-2xl">🇵🇱➡️🇺🇦</span>
                <span className="text-gray-700 font-medium">PLN → UAH</span>
              </div>
              <span className="font-bold text-lg text-blue-600">19.34</span>
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-br from-white to-green-50 rounded-3xl shadow-lg p-8 border-2 border-transparent hover:border-green-200 transition-all duration-300">
          <h3 className="text-xl font-bold text-gray-800 mb-6 relative inline-block">
            Динамика курсов
            <div className="absolute -bottom-2 left-0 w-16 h-1 bg-gradient-to-r from-green-500 to-blue-500 rounded-full"></div>
          </h3>
          <div className="space-y-4">
            <div className="flex justify-between items-center p-4 bg-gradient-to-br from-green-50 to-white rounded-xl shadow-md border border-green-100 hover:shadow-lg transition-all duration-300">
              <div className="flex items-center gap-3">
                <span className="text-2xl">📈</span>
                <span className="text-gray-700 font-medium">USD (неделя)</span>
              </div>
              <span className="text-green-600 font-bold text-lg">+0.8%</span>
            </div>
            <div className="flex justify-between items-center p-4 bg-gradient-to-br from-red-50 to-white rounded-xl shadow-md border border-red-100 hover:shadow-lg transition-all duration-300">
              <div className="flex items-center gap-3">
                <span className="text-2xl">📉</span>
                <span className="text-gray-700 font-medium">EUR (неделя)</span>
              </div>
              <span className="text-red-600 font-bold text-lg">-0.3%</span>
            </div>
            <div className="flex justify-between items-center p-4 bg-gradient-to-br from-green-50 to-white rounded-xl shadow-md border border-green-100 hover:shadow-lg transition-all duration-300">
              <div className="flex items-center gap-3">
                <span className="text-2xl">📈</span>
                <span className="text-gray-700 font-medium">GBP (неделя)</span>
              </div>
              <span className="text-green-600 font-bold text-lg">+1.2%</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}