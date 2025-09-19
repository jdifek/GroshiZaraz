import React from "react";
import { CurrencyWidget } from "./CurrencyWidget";
import { FeaturedCards } from "../FinancialServicesBlocks/FeaturedCards";
import ServiceCard from "../FinancialServicesBlocks/ServiceCard";
import { MfoSection } from "../FinancialServicesBlocks/MfoSection";
import { getTranslations } from "next-intl/server";
const FinancialServicesBlocks = async ({ lang }: { lang: string }) => {
  const t = await getTranslations({
    locale: lang,
    namespace: "FinancialServicesBlocks",
  });

  const services = [
    {
      id: 1,
      name: t("services.loans"),
      icon: "💳",
      color: "bg-gradient-to-br from-blue-500 to-blue-600",
    },
    {
      id: 2,
      name: t("services.debitCards"),
      icon: "💰",
      color: "bg-gradient-to-br from-yellow-400 to-yellow-500",
    },
    {
      id: 3,
      name: t("services.creditCards"),
      icon: "💳",
      color: "bg-gradient-to-br from-blue-500 to-blue-600",
    },
    {
      id: 4,
      name: t("services.deposits"),
      icon: "🏦",
      color: "bg-gradient-to-br from-yellow-400 to-yellow-500",
    },
    {
      id: 5,
      name: t("services.credits"),
      icon: "💵",
      color: "bg-gradient-to-br from-blue-500 to-blue-600",
    },
    {
      id: 6,
      name: t("services.mortgage"),
      icon: "🏠",
      color: "bg-gradient-to-br from-yellow-400 to-yellow-500",
    },
    {
      id: 7,
      name: t("services.refinancing"),
      icon: "📊",
      color: "bg-gradient-to-br from-blue-500 to-blue-600",
    },
    {
      id: 8,
      name: t("services.autoLoans"),
      icon: "🚗",
      color: "bg-gradient-to-br from-yellow-400 to-yellow-500",
    },
    {
      id: 9,
      name: t("services.accounts"),
      icon: "📋",
      color: "bg-gradient-to-br from-blue-500 to-blue-600",
    },
    {
      id: 10,
      name: t("services.osago"),
      icon: "🛡️",
      color: "bg-gradient-to-br from-yellow-400 to-yellow-500",
    },
    {
      id: 11,
      name: t("services.kasko"),
      icon: "🚙",
      color: "bg-gradient-to-br from-blue-500 to-blue-600",
    },
    {
      id: 12,
      name: t("services.all"),
      icon: "⋯",
      color: "bg-gradient-to-br from-gray-400 to-gray-500",
    },
  ];

  return (
    <div className="min-h-screen">
      <div className="max-w-7xl mx-auto space-y-12">
        <div className="space-y-8">
          <div className="text-center">
            <h1 className="!text-[1.95rem] md:!text-[42px] font-bold text-gray-800 mb-4 relative inline-block">
              {t("title")}
              <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-20 h-1 bg-gradient-to-r from-blue-500 to-yellow-400 rounded-full"></div>
            </h1>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
              {t("subtitle")}
            </p>
          </div>

          <FeaturedCards lang={lang}/>

          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {services.map((service, index) => (
              <ServiceCard key={service.id} service={service} index={index} />
            ))}
          </div>

          <CurrencyWidget  lang={lang}/>
        </div>

        {/* <BanksSection /> */}
        <MfoSection lang={lang}/>
      </div>
    </div>
  );
};

export default FinancialServicesBlocks;
