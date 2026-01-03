"use client";
import { Calculator, CheckCircle, Star } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { useTranslations } from "next-intl";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const HeaderCompany = ({ companyInfo }: { companyInfo: any }) => {
  const t = useTranslations("HeaderCompany");
  const [loanAmount, setLoanAmount] = useState(15000);
  const [loanTerm, setLoanTerm] = useState(15);
  
  const calculatePayment = () => {
    const dailyRate = 0.008; // 0.8% в день для примера
    const totalAmount = loanAmount * (1 + dailyRate * loanTerm);
    const overpayment = totalAmount - loanAmount;
    return { totalAmount, overpayment };
  };

  const { totalAmount, overpayment } = calculatePayment();

  return (
    <div className="bg-white rounded-3xl shadow-lg p-8 mb-8">
      <div className="flex flex-col lg:flex-row gap-8">
        {/* Company Info */}
        <div className="flex-1">
          <div
            className={`block md:hidden mb-3 w-20 h-20 bg-gradient-to-br ${companyInfo.color} rounded-2xl flex items-center justify-center text-white text-2xl shadow-lg`}
          >
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
                    <Star
                      key={i}
                      className="w-4 h-4 text-yellow-400 fill-current"
                    />
                  ))}
                </div>
                <span className="font-semibold text-gray-800">
                  {companyInfo.rating}
                </span>
                <span className="text-gray-500">({companyInfo.reviews.length})</span>
              </div>
              <div className="text-gray-600">
                {t("license")}: {companyInfo.license}
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            <div className="bg-blue-50 rounded-2xl p-4 text-center">
              <div className="text-2xl font-bold text-blue-600 mb-1">
                {companyInfo.maxAmount} ₴
              </div>
              <div className="text-sm text-gray-600">{t("stats.maximum")}</div>
            </div>
            <div className="bg-green-50 rounded-2xl p-4 text-center">
              <div className="text-2xl font-bold text-green-600 mb-1">
                {companyInfo.term} {t("stats.days")}
              </div>
              <div className="text-sm text-gray-600">{t("stats.term")}</div>
            </div>
            <div className="bg-purple-50 rounded-2xl p-4 text-center">
              <div className="text-2xl font-bold text-purple-600 mb-1">
                {companyInfo.responseTime}
              </div>
              <div className="text-sm text-gray-600">{t("stats.decision")}</div>
            </div>
            <div className="bg-orange-50 rounded-2xl p-4 text-center">
              <div className="text-2xl font-bold text-orange-600 mb-1">
                {companyInfo.approval}%
              </div>
              <div className="text-sm text-gray-600">{t("stats.approval")}</div>
            </div>
          </div>

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

        {/* Calculator */}
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
                  min="5000"
                  max="30000"
                  step="1000"
                  value={loanAmount}
                  onChange={(e) => setLoanAmount(Number(e.target.value))}
                  className="w-full h-2 bg-blue-200 rounded-lg appearance-none cursor-pointer"
                />
                <div className="flex justify-between text-xs text-gray-500 mt-1">
                  <span>5 000 ₴</span>
                  <span>30 000 ₴</span>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {t("calculator.term")}: {loanTerm} {t("stats.days")}
                </label>
                <input
                  type="range"
                  min="5"
                  max="30"
                  step="1"
                  value={loanTerm}
                  onChange={(e) => setLoanTerm(Number(e.target.value))}
                  className="w-full h-2 bg-blue-200 rounded-lg appearance-none cursor-pointer"
                />
                <div className="flex justify-between text-xs text-gray-500 mt-1">
                  <span>5 {t("stats.days")}</span>
                  <span>30 {t("stats.days")}</span>
                </div>
              </div>

              <div className="bg-white rounded-xl p-4 space-y-2">
                <div className="flex justify-between">
                  <span className="text-gray-600">{t("calculator.youTake")}:</span>
                  <span className="font-semibold">
                    {loanAmount.toLocaleString()} ₴
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">{t("calculator.overpayment")}:</span>
                  <span className="font-semibold">
                    {overpayment.toLocaleString()} ₴
                  </span>
                </div>
                <div className="flex justify-between text-lg font-bold">
                  <span className="text-gray-800">{t("calculator.toReturn")}:</span>
                  <span className="text-blue-600">
                    {totalAmount.toLocaleString()} ₴
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-2 mb-4">
                <CheckCircle className="w-4 h-4 text-green-600" />
                <span className="text-sm text-green-700 font-medium">
                  {t("firstLoanFree.title")}
                </span>
              </div>

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