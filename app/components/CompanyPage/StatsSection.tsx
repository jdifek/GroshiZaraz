/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { Clock, CreditCard, TrendingUp, Users } from "lucide-react";
import { useTranslations } from "next-intl";

type StatsSectionProps = {
  companyInfo: any;
};

const formatNumber = (value?: number | string) => {
  if (!value) return "";

  const num = Number(value);
  if (isNaN(num)) return value;

  if (num >= 1_000_000) {
    return (num / 1_000_000).toFixed(1).replace(".0", "") + "M";
  }

  if (num >= 1_000) {
    return (num / 1_000).toFixed(0) + "K";
  }

  return num.toString();
};

export const StatsSection = ({ companyInfo }: StatsSectionProps) => {
  const t = useTranslations("StatsSection");

  const stats = [
    {
      icon: TrendingUp,
      value: `${companyInfo.approval}%`,
      label: t("approvalRate"),
      color: "text-blue-600",
      bgColor: "bg-blue-50",
    },
    {
      icon: Clock,
      value: companyInfo.responseTime,
      label: t("decisionTime"),
      color: "text-green-600",
      bgColor: "bg-green-50",
    },
    {
      icon: CreditCard,
      value: formatNumber(companyInfo.loansIssued ?? 30000),
      label: t("loansIssued"),
      color: "text-orange-600",
      bgColor: "bg-orange-50",
    },
    {
      icon: Users,
      value: formatNumber(companyInfo.satisfiedClients ?? 15000),
      label: t("happyClients"),
      color: "text-purple-600",
      bgColor: "bg-purple-50",
    },
  ];

  return (
    <div className="mt-6 sm:mt-8 bg-white rounded-2xl sm:rounded-3xl shadow-lg p-4 sm:p-6 lg:p-8">
      <h2 className="text-xl sm:text-2xl font-bold text-gray-800 mb-4 sm:mb-6 text-center px-2">
        {t("title")}
      </h2>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 lg:gap-6">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <div key={index} className="group">
              <div className="bg-gradient-to-br from-gray-50 to-white border border-gray-100 rounded-xl sm:rounded-2xl p-3 sm:p-4 lg:p-5 transition-all duration-300 hover:shadow-xl h-full flex flex-col items-center justify-center text-center">
                
                <div className={`${stat.bgColor} rounded-full p-2 sm:p-3 mb-2 sm:mb-3 transition-transform duration-300 group-hover:scale-110`}>
                  <Icon className={`w-5 h-5 sm:w-6 sm:h-6 lg:w-8 lg:h-8 ${stat.color}`} />
                </div>

                <div className={`text-lg sm:text-2xl lg:text-3xl font-bold ${stat.color} mb-1 leading-tight`}>
                  {stat.value}
                </div>

                <div className="text-xs sm:text-sm lg:text-base text-gray-600 leading-tight px-1">
                  {stat.label}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
