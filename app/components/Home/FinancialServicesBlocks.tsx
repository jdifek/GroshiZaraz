"use client";
import React, { useState } from "react";
import { CurrencyWidget } from "./CurrencyWidget";
import { FeaturedCards } from "../FinancialServicesBlocks/FeaturedCards";
import ServiceCard from "../FinancialServicesBlocks/ServiceCard";
import { BanksSection } from "../FinancialServicesBlocks/BanksSection";
import { MfoSection } from "../FinancialServicesBlocks/MfoSection";
const services = [
  {
    id: 1,
    name: "Займы",
    icon: "💳",
    color: "bg-gradient-to-br from-blue-500 to-blue-600",
  },
  {
    id: 2,
    name: "Дебетовые карты",
    icon: "💰",
    color: "bg-gradient-to-br from-yellow-400 to-yellow-500",
  },
  {
    id: 3,
    name: "Кредитные карты",
    icon: "💳",
    color: "bg-gradient-to-br from-blue-500 to-blue-600",
  },
  {
    id: 4,
    name: "Вклады",
    icon: "🏦",
    color: "bg-gradient-to-br from-yellow-400 to-yellow-500",
  },
  {
    id: 5,
    name: "Кредиты",
    icon: "💵",
    color: "bg-gradient-to-br from-blue-500 to-blue-600",
  },
  {
    id: 6,
    name: "Ипотека",
    icon: "🏠",
    color: "bg-gradient-to-br from-yellow-400 to-yellow-500",
  },
  {
    id: 7,
    name: "Рефинансирование",
    icon: "📊",
    color: "bg-gradient-to-br from-blue-500 to-blue-600",
  },
  {
    id: 8,
    name: "Автокредиты",
    icon: "🚗",
    color: "bg-gradient-to-br from-yellow-400 to-yellow-500",
  },
  {
    id: 9,
    name: "Расчетные счета",
    icon: "📋",
    color: "bg-gradient-to-br from-blue-500 to-blue-600",
  },
  {
    id: 10,
    name: "ОСАГО",
    icon: "🛡️",
    color: "bg-gradient-to-br from-yellow-400 to-yellow-500",
  },
  {
    id: 11,
    name: "Каско",
    icon: "🚙",
    color: "bg-gradient-to-br from-blue-500 to-blue-600",
  },
  {
    id: 12,
    name: "Показать все",
    icon: "⋯",
    color: "bg-gradient-to-br from-gray-400 to-gray-500",
  },
];

const FinancialServicesBlocks = () => {
  const [activeService, setActiveService] = useState<string | number | null>(
    null
  );

  return (
    <div className="min-h-screen ">
      <div className="max-w-7xl mx-auto space-y-12">
        {/* Financial Services Section */}
        <div className="space-y-8">
          <div className="text-center">
          <h1 className="!text-[1.95rem] md:!text-[42px] font-bold text-gray-800 mb-4 relative inline-block">
          GroshiZaraz — агрегатор кредитов и займов онлайн, умный подбор
              финансовых услуг
              <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-20 h-1 bg-gradient-to-r from-blue-500 to-yellow-400 rounded-full"></div>
            </h1>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
              Найдите лучшие предложения от проверенных финансовых организаций
            </p>
          </div>

          <FeaturedCards />

          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {services.map((service, index) => (
              <ServiceCard
                key={service.id}
                service={service}
                index={index}
                activeService={activeService}
                setActiveService={setActiveService}
              />
            ))}
          </div>

          <CurrencyWidget />
        </div>

        <BanksSection />

        {/* MFO Section */}
        <MfoSection />
      </div>

      <style jsx>{`
        @keyframes fade-in {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-fade-in {
          animation: fade-in 0.6s ease-out forwards;
        }
      `}</style>
    </div>
  );
};

export default FinancialServicesBlocks;
