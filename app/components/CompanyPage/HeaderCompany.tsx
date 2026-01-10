/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { Calculator, CheckCircle, Star, ExternalLink } from "lucide-react";
import Image from "next/image";
import { Link } from "@/app/i18n/navigation";
import { useState } from "react";
import { useTranslations } from "next-intl";

export const HeaderCompany = ({ companyInfo }: { companyInfo: any }) => {
  const t = useTranslations("HeaderCompany");
  
  const minAmount = companyInfo.minAmount || 5000;
  const maxAmount = companyInfo.maxAmount || 35000;
  const minTerm = companyInfo.minTerm || 5;
  const maxTerm = companyInfo.maxTerm || 30;
  const dailyRate = companyInfo.dailyRate || 0.01; // ставка на день
  
  const [loanAmount, setLoanAmount] = useState(Math.floor((minAmount + maxAmount) / 2));
  const [loanTerm, setLoanTerm] = useState(Math.floor((minTerm + maxTerm) / 2));

  const calculatePayment = () => {
    // Якщо перша позика безкоштовна і термін до 30 днів
    if (companyInfo.firstLoanFree && loanTerm <= 30) {
      return {
        totalAmount: loanAmount,
        overpayment: 0
      };
    }
    
    // Інакше рахуємо з денною ставкою
    const rate = dailyRate / 100; // конвертуємо % в десяткове число
    const totalAmount = loanAmount * (1 + rate * loanTerm);
    const overpayment = totalAmount - loanAmount;
    
    return { 
      totalAmount: Math.round(totalAmount), 
      overpayment: Math.round(overpayment) 
    };
  };

  const { totalAmount, overpayment } = calculatePayment();

  return (
    <div className="bg-white rounded-3xl shadow-lg p-8 mb-8">
      <div className="flex flex-col lg:flex-row gap-8">
        {/* Company Info */}
        <div className="flex-1">
          <div className={`block md:hidden mb-3 w-20 h-20 bg-gradient-to-br ${companyInfo.color} rounded-2xl flex items-center justify-center text-white text-2xl shadow-lg`}>
            <div className="flex items-center justify-center w-full h-full">
              <Image
                unoptimized
                src={companyInfo.logo}
                alt={`${companyInfo.name} logo`}
                width={64}
                height={64}
                className="object-cover rounded-2xl"
              />
            </div>
          </div>

          <div className="flex items-center gap-4 mb-6">
            <div className="md:block hidden relative w-20 h-20 rounded-2xl overflow-hidden shadow-lg">
              <Image
                unoptimized
                src={companyInfo.logo}
                alt={`${companyInfo.name} logo`}
                fill
                className="object-cover"
              />
            </div>

            <div>
              <h2 className="text-3xl font-bold text-gray-800 mb-2">
                {companyInfo.name}
              </h2>
              <div className="flex items-center gap-2 mb-2">
                <div className="flex items-center gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 text-yellow-400 fill-current" />
                  ))}
                </div>
                <span className="font-semibold text-gray-800">{companyInfo.rating}</span>
                <span className="text-gray-500">({companyInfo.reviews.length})</span>
              </div>
              <div className="text-gray-600">
                {t("license")}: {companyInfo.license}
              </div>
            </div>
          </div>

          {/* Блок з 4 обов'язковими параметрами - ОДНАКОВИЙ КОЛІР */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            <div className="bg-blue-50 rounded-2xl p-4">
              <div className="text-2xl font-bold text-blue-600 mb-1">
                {companyInfo.maxAmount.toLocaleString()} ₴
              </div>
              <div className="text-sm text-gray-600">Максимум</div>
            </div>
            
            <div className="bg-blue-50 rounded-2xl p-4">
              <div className="text-2xl font-bold text-blue-600 mb-1">
                {companyInfo.minTerm}-{companyInfo.maxTerm} днів
              </div>
              <div className="text-sm text-gray-600">Термін</div>
            </div>
            
            <div className="bg-blue-50 rounded-2xl p-4">
              <div className="text-2xl font-bold text-blue-600 mb-1">
                {companyInfo.annualRateMin}%-{companyInfo.annualRateMax}%
              </div>
              <div className="text-sm text-gray-600">Річна ставка</div>
            </div>

            <div className="bg-blue-50 rounded-2xl p-4">
              <div className="text-2xl font-bold text-blue-600 mb-1">
                {companyInfo.dailyRate}%
              </div>
              <div className="text-sm text-gray-600">Ставка на день</div>
            </div>
          </div>

          {/* ГІПЕРПОСИЛАННЯ НБУ - обов'язкові */}
          {(companyInfo.nbuCharacteristicsLink || companyInfo.nbuWarningLink) && (
            <div className="bg-blue-50 border border-blue-200 rounded-2xl p-4 mb-6 space-y-2">
              {companyInfo.nbuCharacteristicsLink && (
                <a
                  href={companyInfo.nbuCharacteristicsLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-blue-600 hover:text-blue-800 underline font-medium transition-colors"
                >
                  <ExternalLink className="w-4 h-4" />
                  <span>Істотні характеристики послуги</span>
                </a>
              )}
              
              {companyInfo.nbuWarningLink && (
                <a
                  href={companyInfo.nbuWarningLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-blue-600 hover:text-blue-800 underline font-medium transition-colors"
                >
                  <ExternalLink className="w-4 h-4" />
                  <span>Попередження про наслідки для споживача</span>
                </a>
              )}
            </div>
          )}

          {companyInfo.firstLoanFree && (
            <div className="bg-gradient-to-r from-green-50 to-green-100 border border-green-200 rounded-2xl p-4 mb-6">
              <div className="flex items-center gap-2 mb-2">
                <CheckCircle className="w-5 h-5 text-green-600" />
                <span className="font-bold text-green-800">
                  {t("firstLoanFree.title")}
                </span>
              </div>
              <p className="text-green-700 text-sm">
                {t("firstLoanFree.description")}
              </p>
            </div>
          )}
        </div>

        {/* ДИНАМІЧНИЙ КАЛЬКУЛЯТОР */}
        <div className="lg:w-96">
          <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-2xl p-6 border border-blue-200">
            <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
              <Calculator className="w-5 h-5 text-blue-600" />
              {t("calculator.title")}
            </h3>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {t("calculator.amount")}: {loanAmount.toLocaleString()} ₴
                </label>
                <input
                  type="range"
                  min={minAmount}
                  max={maxAmount}
                  step="1000"
                  value={loanAmount}
                  onChange={(e) => setLoanAmount(Number(e.target.value))}
                  className="w-full h-2 bg-blue-200 rounded-lg appearance-none cursor-pointer"
                />
                <div className="flex justify-between text-xs text-gray-500 mt-1">
                  <span>{minAmount.toLocaleString()} ₴</span>
                  <span>{maxAmount.toLocaleString()} ₴</span>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {t("calculator.term")}: {loanTerm} {t("stats.days")}
                </label>
                <input
                  type="range"
                  min={minTerm}
                  max={maxTerm}
                  step="1"
                  value={loanTerm}
                  onChange={(e) => setLoanTerm(Number(e.target.value))}
                  className="w-full h-2 bg-blue-200 rounded-lg appearance-none cursor-pointer"
                />
                <div className="flex justify-between text-xs text-gray-500 mt-1">
                  <span>{minTerm} {t("stats.days")}</span>
                  <span>{maxTerm} {t("stats.days")}</span>
                </div>
              </div>

              <div className="bg-white rounded-xl p-4 space-y-2">
                <div className="flex justify-between">
                  <span className="text-gray-600">{t("calculator.youTake")}:</span>
                  <span className="font-semibold">{loanAmount.toLocaleString()} ₴</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">{t("calculator.overpayment")}:</span>
                  <span className="font-semibold">{overpayment.toLocaleString()} ₴</span>
                </div>
                <div className="flex justify-between text-lg font-bold">
                  <span className="text-gray-800">{t("calculator.toReturn")}:</span>
                  <span className="text-blue-600">{totalAmount.toLocaleString()} ₴</span>
                </div>
              </div>

              {companyInfo.firstLoanFree && loanTerm <= 30 && (
                <div className="flex items-center gap-2 mb-4">
                  <CheckCircle className="w-4 h-4 text-green-600" />
                  <span className="text-sm text-green-700 font-medium">
                    {t("firstLoanFree.title")}
                  </span>
                </div>
              )}

              <Link
                href={companyInfo.UtmLink}
                className="block text-center w-full bg-gradient-to-r from-orange-400 to-orange-600 hover:from-orange-500 hover:to-orange-700 text-white font-bold py-4 px-6 rounded-2xl transition-all duration-300 hover:shadow-lg hover:scale-105"
              >
                {t("calculator.getMoney")}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};