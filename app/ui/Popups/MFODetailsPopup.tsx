/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React, { useState } from "react";
import { createPortal } from "react-dom";
import { Star, X, Check } from "lucide-react";
import { BlueButton } from "@/app/ui/Buttons/BlueButton";
import { GrayButton } from "@/app/ui/Buttons/GrayButton";
import Image from "next/image";
import { Mfo } from "@/app/services/mfos/mfoTypes";
import { useTranslations } from "next-intl";

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
  const t = useTranslations("MFODetailsPopup");

  if (!isOpen) return null;

  const tabs = [
    { id: "conditions", label: t("tabs.conditions") },
    { id: "rates", label: t("tabs.rates") },
    { id: "requirements", label: t("tabs.requirements") },
  ];

  return createPortal(
    <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-[9999] p-4">
      <div className="bg-white scrollbar-hidden overflow-y-auto rounded-2xl max-w-lg w-full max-h-[90vh] flex flex-col shadow-2xl">
        {/* Header */}
        <div className="relative p-6 pb-4">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 cursor-pointer w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center hover:bg-gray-200 transition-colors"
          >
            <X className="w-4 h-4 text-gray-600" />
          </button>

          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 rounded-xl flex items-center justify-center text-white text-lg font-bold">
              <Image
                unoptimized
                src={mfo.logo}
                alt={`${mfo.name} logo`}
                width={64}
                height={64}
                className="object-cover rounded-2xl"
              />
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-1">
                <h2 className="text-lg font-bold text-gray-800">{mfo.name}</h2>
                <div className="bg-gradient-to-r from-orange-500 to-red-500 text-white px-2 py-0.5 rounded-full text-xs font-medium">
                  {t("top")}
                </div>
              </div>
              <div className="flex items-center gap-2">
                <div className="flex items-center gap-1">
                  {[...Array(Math.round(mfo.rating))].map((_, i) => (
                    <Star
                      key={i}
                      className="w-4 h-4 text-yellow-500 fill-current"
                    />
                  ))}
                  <span className="text-sm font-semibold text-gray-800">
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
                className={`flex-1 py-2 px-3 text-sm font-medium rounded-md transition-all duration-200 ease-in-out ${
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
                  <span className="text-gray-600">
                    {t("conditions.maxAmount")}
                  </span>
                  <span className="font-semibold text-gray-800">
                    {mfo.maxAmount}₴
                  </span>
                </div>
                <div className="flex justify-between items-center py-2 border-b border-gray-100">
                  <span className="text-gray-600">
                    {t("conditions.minAmount")}
                  </span>
                  <span className="font-semibold text-gray-800">
                    {mfo.minAmount}₴
                  </span>
                </div>
                <div className="flex justify-between items-center py-2 border-b border-gray-100">
                  <span className="text-gray-600">
                    {t("conditions.loanTerm")}
                  </span>
                  <span className="font-semibold text-gray-800">
                    {mfo.minTerm} - {mfo.maxTerm} дней
                  </span>
                </div>
                <div className="flex justify-between items-center py-2 border-b border-gray-100">
                  <span className="text-gray-600">
                    {t("conditions.application")}
                  </span>
                  <span className="font-semibold text-gray-800">
                    {mfo.application}
                  </span>
                </div>
                <div className="flex justify-between items-center py-2 border-b border-gray-100">
                  <span className="text-gray-600">
                    {t("conditions.decision")}
                  </span>
                  <span className="font-semibold text-gray-800">
                    {mfo.decisionTime} хв
                  </span>
                </div>
                <div className="flex justify-between items-center py-2">
                  <span className="text-gray-600">
                    {t("conditions.collateral")}
                  </span>
                  <span className="font-semibold text-gray-800">
                  {mfo.collateral}
                  </span>
                </div>
              </div>

              {mfo.isFirstLoanZero && (
                <div className="bg-gradient-to-r from-green-50 to-green-100 border border-green-200 rounded-lg p-3 mt-4">
                  <div className="flex items-center gap-2 mb-1">
                    <Check className="w-4 h-4 text-green-600" />
                    <span className="font-semibold text-green-800 text-sm">
                      {t("conditions.firstLoanTitle")}
                    </span>
                  </div>
                  <p className="text-green-700 text-xs">
                    {t("conditions.firstLoanDesc")}
                  </p>
                </div>
              )}
            </div>
          )}

          {activeTab === "rates" && (
            <div className="space-y-4">
              <div className="space-y-3">
                <div className="flex justify-between items-center py-2 border-b border-gray-100">
                  <span className="text-gray-600">{t("rates.dailyRate")}</span>
                  <span className="font-semibold text-green-600">
                    {" "}
                    <span className="font-semibold text-gray-800">
                      {mfo.dailyRate}%
                    </span>
                  </span>
                </div>
                <div className="flex justify-between items-center py-2 border-b border-gray-100">
                  <span className="text-gray-600">{t("rates.commission")}</span>
                  <span className="font-semibold text-gray-800">
                   {mfo.commission}%
                  </span>
                </div>
                <div className="flex justify-between items-center py-2 border-b border-gray-100">
                  <span className="text-gray-600">{t("rates.approval")}</span>
                  <span className="font-semibold text-blue-600">
                    {mfo.approvalRate}%
                  </span>
                </div>
              </div>

              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3">
                <h4 className="font-semibold text-yellow-800 mb-2 text-sm">
                  {t("rates.importantTitle")}
                </h4>
                <p className="text-yellow-700 text-xs">
                  {t("rates.importantText")}
                </p>
              </div>
            </div>
          )}

          {activeTab === "requirements" && (
            <div className="space-y-4">
              <div className="space-y-3">
                <div className="flex justify-between items-center py-2 border-b border-gray-100">
                  <span className="text-gray-600">{t("requirements.age")}</span>
                  <span className="font-semibold text-gray-800">
                    {mfo?.ageFrom} - {mfo?.ageTo}р.
                  </span>
                </div>
                <div className="flex justify-between items-center py-2 border-b border-gray-100">
                  <span className="text-gray-600">
                    {t("requirements.citizenship")}
                  </span>
                  <span className="font-semibold text-gray-800">
                    {mfo.citizenship}
                  </span>
                </div>
                <div className="flex justify-between items-center py-2 border-b border-gray-100">
                  <span className="text-gray-600">
                    {t("requirements.documents")}
                  </span>
                  <span className="font-semibold text-gray-800">
                    {mfo.documents}
                  </span>
                </div>
              </div>

              <div className="bg-green-50 border border-green-200 rounded-lg p-3">
  <h4 className="font-semibold text-green-800 mb-2 text-sm">
    {t("requirements.advantages")}
  </h4>
  <div className="space-y-2">
    {mfo.isFirstLoanZero && (
      <div className="flex items-start gap-2">
        <Check className="w-4 h-4 text-green-600 mt-0.5" />
        <span className="text-gray-700 text-sm">{t("advantages.firstLoanFree")}</span>
      </div>
    )}
    {mfo.isInstantApproval && (
      <div className="flex items-start gap-2">
        <Check className="w-4 h-4 text-green-600 mt-0.5" />
        <span className="text-gray-700 text-sm">{t("advantages.instantApproval")}</span>
      </div>
    )}
    {mfo.isNoIncomeProof && (
      <div className="flex items-start gap-2">
        <Check className="w-4 h-4 text-green-600 mt-0.5" />
        <span className="text-gray-700 text-sm">{t("advantages.noIncomeProof")}</span>
      </div>
    )}
    {mfo.is24Support && (
      <div className="flex items-start gap-2">
        <Check className="w-4 h-4 text-green-600 mt-0.5" />
        <span className="text-gray-700 text-sm">{t("advantages.support24")}</span>
      </div>
    )}
    {mfo.isSafeTransactions && (
      <div className="flex items-start gap-2">
        <Check className="w-4 h-4 text-green-600 mt-0.5" />
        <span className="text-gray-700 text-sm">{t("advantages.safeTransactions")}</span>
      </div>
    )}
    {mfo.isFlexibleTerms && (
      <div className="flex items-start gap-2">
        <Check className="w-4 h-4 text-green-600 mt-0.5" />
        <span className="text-gray-700 text-sm">{t("advantages.flexibleTerms")}</span>
      </div>
    )}
  </div>
</div>

            </div>
          )}

          {/* Action Buttons */}
          <div className="flex items-center mt-6 justify-between">
            <BlueButton text={t("actions.getMoney")} link={mfo.UtmLink} />
            <GrayButton
              link={`/mfos/${mfo.slug}`}
              text={t("actions.moreDetails")}
            />
          </div>

          <p className="text-xs text-gray-500 text-center mt-4">
            {t("actions.redirectNotice")}
          </p>
        </div>
      </div>
    </div>,
    document.body
  );
};

export default MFODetailsPopup;
