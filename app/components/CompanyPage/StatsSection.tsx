"use client";
import { Clock, CreditCard, TrendingUp, Users } from "lucide-react";
import { useTranslations } from "next-intl";

type StatsSectionProps = {
  companyInfo: {
    approval: number;
    responseTime: string;
    loansIssued?: string;
    satisfiedClients?: string;
  };
};

export const StatsSection = ({ companyInfo }: StatsSectionProps) => {
  const t = useTranslations("StatsSection");

  return (
    <div className="mt-8 bg-white rounded-3xl shadow-lg p-8">
      <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
        {t("title")}
      </h2>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
        <div className="p-4">
          <div className="text-3xl font-bold text-blue-600 mb-2 flex items-center justify-center gap-2">
            <TrendingUp className="w-8 h-8" />
            {companyInfo.approval}%
          </div>
          <div className="text-gray-600">{t("approvalRate")}</div>
        </div>
        <div className="p-4">
          <div className="text-3xl font-bold text-green-600 mb-2 flex items-center justify-center gap-2">
            <Clock className="w-8 h-8" />
            {companyInfo.responseTime}
          </div>
          <div className="text-gray-600">{t("decisionTime")}</div>
        </div>
        <div className="p-4">
          <div className="text-3xl font-bold text-orange-600 mb-2 flex items-center justify-center gap-2">
            <CreditCard className="w-8 h-8" />
            {companyInfo.loansIssued || "30К+"}
          </div>
          <div className="text-gray-600">{t("loansIssued")}</div>
        </div>
        <div className="p-4">
          <div className="text-3xl font-bold text-purple-600 mb-2 flex items-center justify-center gap-2">
            <Users className="w-8 h-8" />
            {companyInfo.satisfiedClients || "15К+"}
          </div>
          <div className="text-gray-600">{t("happyClients")}</div>
        </div>
      </div>
    </div>
  );
};
