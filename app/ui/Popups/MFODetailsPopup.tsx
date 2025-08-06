/* eslint-disable react/no-unescaped-entities */
/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from "react";
import { Star, X, Check } from "lucide-react";
import { BlueButton } from "@/app/ui/Buttons/BlueButton";
import { GrayButton } from "@/app/ui/Buttons/GrayButton";
import Image from "next/image";
import { Mfo } from "@/app/services/mfos/mfoTypes";



interface MFODetailsPopupProps {
  mfo: Mfo;
  isOpen: boolean;
  onClose: () => void;
}

const MFODetailsPopup: React.FC<MFODetailsPopupProps> = ({
  mfo,
  isOpen,
  onClose,
}) => {
  const [activeTab, setActiveTab] = useState<
    "conditions" | "rates" | "requirements"
  >("conditions");

  if (!isOpen) return null;

  const tabs = [
    { id: "conditions", label: "Условия" },
    { id: "rates", label: "Проценты" },
    { id: "requirements", label: "Требования" },
  ];

  return (
    <div className="fixed inset-0 bg-black/40  backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white scrollbar-hidden overflow-y-auto rounded-2xl max-w-lg w-full max-h-[90vh] flex flex-col shadow-2xl">
        {/* Header */}
        <div className="relative p-6 pb-4">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center hover:bg-gray-200 transition-colors"
          >
            <X className="w-4 h-4 text-gray-600" />
          </button>

          <div className="flex items-center gap-3 mb-4">
            <div
              className={`w-12 h-12 rounded-xl flex items-center justify-center text-white text-lg font-bold`}
            >
              <Image
                unoptimized
                src={mfo.logo}
                alt={`${mfo.name} logo`}
                width={64}
                height={64}
                className="object-cover  rounded-2xl"
              />{" "}
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-1">
                <h2 className="text-lg font-bold text-gray-800">{mfo.name}</h2>
                  <div className="bg-gradient-to-r from-orange-500 to-red-500 text-white px-2 py-0.5 rounded-full text-xs font-medium">
                    ТОП
                  </div>
              </div>
              <div className="flex items-center gap-2">
                <div className="flex items-center gap-1">
                {[...Array(Math.round(mfo.rating))].map((_, i) => (
                          <Star
                            key={i}
                            className="w-4 h-4 text-yellow-500 fill-current"
                          />
                        ))}                  <span className="text-sm font-semibold text-gray-800">
                    {mfo.rating}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Tabs */}
          <div className="flex bg-gray-100 rounded-lg p-1 mb-4">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`flex-1 py-2 px-3 text-sm font-medium rounded-md
        transition-all duration-200 ease-in-out
        ${
          activeTab === tab.id
            ? "bg-white text-gray-900 shadow-sm"
            : "text-gray-600 hover:cursor-pointer hover:text-gray-800 hover:bg-white/70"
        }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Tab Content */}
        <div className="px-6 pb-6">
          {activeTab === "conditions" && (
            <div className="space-y-4">
              <div className="space-y-3">
                <div className="flex justify-between items-center py-2 border-b border-gray-100">
                  <span className="text-gray-600">Максимальная сумма</span>
                  <span className="font-semibold text-gray-800">
                    {mfo.maxAmount}
                  </span>
                </div>
                <div className="flex justify-between items-center py-2 border-b border-gray-100">
                  <span className="text-gray-600">
                    Минимальная сумма микрозайма
                  </span>
                  <span className="font-semibold text-gray-800">
                    {mfo.minAmount}
                  </span>
                </div>
                <div className="flex justify-between items-center py-2 border-b border-gray-100">
                  <span className="text-gray-600">Срок займа</span>
                  <span className="font-semibold text-gray-800">
                    {mfo.minTerm} - {mfo.maxTerm} дней
                  </span>
                </div>
                <div className="flex justify-between items-center py-2 border-b border-gray-100">
                  <span className="text-gray-600">Подача заявки</span>
                  <span className="font-semibold text-gray-800">Онлайн to be soon</span>
                </div>
                <div className="flex justify-between items-center py-2 border-b border-gray-100">
                  <span className="text-gray-600"> Решение по займу</span>
                  <span className="font-semibold text-gray-800">
                  to be soon 
                  </span>
                </div>
                <div className="flex justify-between items-center py-2">
                  <span className="text-gray-600">Залог</span>
                  <span className="font-semibold text-gray-800">
                  to be soon  Без залога
                  </span>
                </div>
              </div>

              {mfo && (
                <div className="bg-gradient-to-r from-green-50 to-green-100 border border-green-200 rounded-lg p-3 mt-4">
                  <div className="flex items-center gap-2 mb-1">
                    <Check className="w-4 h-4 text-green-600" />
                    <span className="font-semibold text-green-800 text-sm">
                      Первый займ без процентов
                    </span>
                  </div>
                  <p className="text-green-700 text-xs">
                    Новые клиенты получают займ под 0%
                  </p>
                </div>
              )}
            </div>
          )}

          {activeTab === "rates" && (
            <div className="space-y-4">
              <div className="space-y-3">
                <div className="flex justify-between items-center py-2 border-b border-gray-100">
                  <span className="text-gray-600">Ставка в день</span>
                  <span className="font-semibold text-green-600">
                  to be soon 
                  </span>
                </div>
                <div className="flex justify-between items-center py-2 border-b border-gray-100">
                  <span className="text-gray-600">Комиссия</span>
                  <span className="font-semibold text-gray-800">
                  to be soon
                  </span>
                </div>
                <div className="flex justify-between items-center py-2 border-b border-gray-100">
                  <span className="text-gray-600">Одобрение</span>
                  <span className="font-semibold text-blue-600">
                  to be soon
                  </span>
                </div>
              </div>

              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3">
                <h4 className="font-semibold text-yellow-800 mb-2 text-sm">
                  ⚠️ Важная информация
                </h4>
                <p className="text-yellow-700 text-xs">
                  Займы выдаются лицам старше 18 лет. Помните о необходимости
                  своевременного погашения. Просрочка может негативно повлиять
                  на вашу кредитную историю.
                </p>
              </div>
            </div>
          )}

          {activeTab === "requirements" && (
            <div className="space-y-4">
              <div className="space-y-3">
                <div className="flex justify-between items-center py-2 border-b border-gray-100">
                  <span className="text-gray-600">Возраст</span>
                  <span className="font-semibold text-gray-800">
                    {mfo?.ageFrom}  - {mfo?.ageTo} лет
                  </span>
                </div>
                <div className="flex justify-between items-center py-2 border-b border-gray-100">
                  <span className="text-gray-600">Гражданство</span>
                  <span className="font-semibold text-gray-800"> {mfo.citizenship}</span>
                </div>
                <div className="flex justify-between items-center py-2 border-b border-gray-100">
                  <span className="text-gray-600">Документы</span>
                  <span className="font-semibold text-gray-800">
                     {mfo.documents}
                  </span>
                </div>
              </div>

              <div className="bg-green-50 border border-green-200 rounded-lg p-3">
                <h4 className="font-semibold text-green-800 mb-2 text-sm">
                  Преимущества
                </h4>
                <div className="space-y-1">
                  to be soon
                  {/* {mfo.advantages.map((advantage, index) => (
                    <div key={index} className="flex items-start gap-2">
                      <Check className="w-3 h-3 text-green-600 flex-shrink-0 mt-0.5" />
                      <span className="text-green-800 text-xs">
                        {advantage}
                      </span>
                    </div>
                  ))} */}
                </div>
              </div>
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex items-center mt-6 justify-between">
            <div className="">
              <BlueButton text="Получить деньги" />
            </div>
            <div className="">
              <GrayButton link={`/mfos/${mfo.slug}`} text="Подробнее" />
            </div>
          </div>

          {/* Footer Note */}
          <p className="text-xs text-gray-500 text-center mt-4">
            Нажимая "Получить деньги", вы будете перенаправлены на сайт партнера
          </p>
        </div>
      </div>
    </div>
  );
};

export default MFODetailsPopup;
