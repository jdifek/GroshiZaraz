"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { ChevronDown, Star, Clock, Percent } from "lucide-react";
import { BlueButton } from "@/app/ui/Buttons/BlueButton";
import { GrayButton } from "@/app/ui/Buttons/GrayButton";
import { InfoButton } from "@/app/ui/Buttons/InfoButton";
import MFODetailsPopup from "@/app/ui/Popups/MFODetailsPopup";
import { Mfo } from "@/app/services/mfos/mfoTypes";
import Image from "next/image";

interface SortOption {
  value: string;
  label: string;
}

interface Props {
  initialMfos: Mfo[];
  initialSort: string;
  sortOptions: SortOption[];
  lang: string;
  translations: {
    sort: {
      found: string;
      averageRate: string;
    };
    topLabel: string;
    keyInfo: {
      amount: string;
      term: string;
      perDay: string;
      approval: string;
      rate: string;
    };
    specialOffer: {
      firstLoanFree: string;
    };
    advantages: {
      fast: string;
      convenient: string;
      plus1: string;
    };
    footer: {
      minutes: string;
      time: string;
    };
    buttons: {
      getLoan: string;
      showMore: string;
      apply: string;
    };
    modal: {
      title: string;
      redirectNotice: string;
    };
  };
}

export function MFOsPageClient({
  initialMfos,
  initialSort,
  sortOptions,
  lang,
  translations: t,
}: Props) {
  const router = useRouter();
  const [sortBy, setSortBy] = useState<string>(initialSort);
  const [isSortDropdownOpen, setIsSortDropdownOpen] = useState<boolean>(false);
  const [visibleCount, setVisibleCount] = useState<number>(9);
  const [selectedOffer, setSelectedOffer] = useState<Mfo | null>(null);
  const [selectedMFO, setSelectedMFO] = useState<Mfo | null>(null);
  const [isDetailsPopupOpen, setIsDetailsPopupOpen] = useState(false);

  const closeModal = () => setSelectedOffer(null);

  const handleSortChange = (newSort: string) => {
    setSortBy(newSort);
    setIsSortDropdownOpen(false);
    // Обновляем URL и перезагружаем данные с сервера
    router.push(`/${lang}/mfos?sort=${newSort}`);
  };

  return (
    <>
      {/* Sort and Stats */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-12 gap-4">
        {/* Sort Dropdown */}
        <div className="relative">
          <button
            onClick={() => setIsSortDropdownOpen(!isSortDropdownOpen)}
            className="bg-white cursor-pointer border-2 border-gray-200 rounded-2xl px-6 py-3 flex items-center gap-3 hover:border-blue-300 transition-all duration-200 shadow-sm"
          >
            <span className="text-gray-700 font-medium">
              {sortOptions.find((opt) => opt.value === sortBy)?.label}
            </span>
            <ChevronDown
              className={`w-4 h-4 text-gray-500 transition-transform duration-200 ${
                isSortDropdownOpen ? "rotate-180" : ""
              }`}
            />
          </button>

          {isSortDropdownOpen && (
            <div className="absolute top-full left-0 mt-2 w-64 bg-white rounded-2xl shadow-lg border border-gray-200 z-10">
              {sortOptions.map((option) => (
                <button
                  key={option.value}
                  onClick={() => handleSortChange(option.value)}
                  className="w-full cursor-pointer text-left px-4 py-2 hover:bg-gray-50 first:rounded-t-2xl last:rounded-b-2xl text-gray-700 transition-colors duration-200"
                >
                  {option.label}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Stats */}
        <div className="flex items-center gap-6 text-sm text-gray-600">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-green-500 rounded-full"></div>
            <span>
              {t.sort.found}: {initialMfos.length}
            </span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
            <span>{t.sort.averageRate}: 0.05%</span>
          </div>
        </div>
      </div>

      {/* MFO Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 mb-12">
        {initialMfos.slice(0, visibleCount).map((offer, index) => (
          <div
            key={offer.id}
            className="bg-white rounded-3xl shadow-lg hover:shadow-xl transition-all duration-300 border-2 border-transparent hover:border-blue-500 group animate-fade-in"
            style={{ animationDelay: `${index * 0.1}s` }}
          >
            {/* Header */}
            <div className="p-6 border-b border-gray-100">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-xl flex items-center justify-center text-white text-xl group-hover:scale-110 transition-transform duration-200">
                    <Image
                      unoptimized
                      src={offer.logo}
                      alt={`${offer.name} logo`}
                      width={64}
                      height={64}
                      className="object-cover rounded-2xl"
                    />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-800 text-lg leading-tight">
                      {offer.name}
                    </h3>
                    <div className="flex items-center gap-1 mt-1">
                      {[...Array(Math.round(offer.rating))].map((_, i) => (
                        <Star
                          key={i}
                          className="w-4 h-4 text-yellow-500 fill-current"
                        />
                      ))}
                      <span className="text-sm text-gray-600">
                        {offer.rating}
                      </span>
                    </div>
                  </div>
                </div>
                <div className="bg-gradient-to-r from-orange-500 to-red-500 text-white px-2 py-1 rounded-full text-xs font-medium">
                  {t.topLabel}
                </div>
              </div>

              {/* Key Info */}
              <div className="grid grid-cols-2 gap-3 mb-4">
                <div className="bg-gray-50 rounded-2xl p-3">
                  <div className="text-xs text-gray-500 mb-1">
                    {t.keyInfo.amount}
                  </div>
                  <div className="font-semibold text-gray-800 text-sm">
                    {offer.minAmount.toLocaleString()} -{" "}
                    {offer.maxAmount.toLocaleString()} ₴
                  </div>
                </div>
                <div className="bg-gray-50 rounded-2xl p-3">
                  <div className="text-xs text-gray-500 mb-1">
                    {t.keyInfo.term}
                  </div>
                  <div className="font-semibold text-gray-800 text-sm">
                    до {offer.maxTerm} дней
                  </div>
                </div>
              </div>

              {/* Rate and Approval */}
              <div className="flex justify-between items-center mb-4">
                <div>
                  <div className="text-xl font-bold text-green-600">
                    {offer.rateMin}% - {offer.rateMax}%
                  </div>
                  <div className="text-xs text-gray-500">
                    {t.keyInfo.perDay}
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-lg font-semibold text-blue-600">
                    {offer.approvalRate}%
                  </div>
                  <div className="text-xs text-gray-500">
                    {t.keyInfo.approval}
                  </div>
                </div>
              </div>

              {/* Special Offer */}
              <div className="bg-green-50 border border-green-200 rounded-2xl p-2 mb-4">
                <div className="text-xs text-green-700 font-medium">
                  {t.specialOffer.firstLoanFree}
                </div>
              </div>

              {/* Advantages */}
              <div className="flex flex-wrap gap-2 mb-4">
                <span className="bg-blue-50 text-blue-700 px-2 py-1 rounded-full text-xs font-medium">
                  {t.advantages.fast}
                </span>
                <span className="bg-blue-50 text-blue-700 px-2 py-1 rounded-full text-xs font-medium">
                  {t.advantages.convenient}
                </span>
                <span className="bg-gray-100 text-gray-600 px-2 py-1 rounded-full text-xs font-medium">
                  {t.advantages.plus1}
                </span>
              </div>
            </div>

            {/* Footer */}
            <div className="p-6">
              <div className="flex items-center justify-between mb-4 text-sm text-gray-600">
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-green-500" />
                  <span>{t.footer.minutes}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Percent className="w-4 h-4 text-blue-500" />
                  <span>0%</span>
                </div>
              </div>

              <div className="flex justify-between">
                <BlueButton text={t.buttons.getLoan} link={offer.UtmLink} />
                <InfoButton
                  onClick={() => {
                    setSelectedMFO(offer);
                    setIsDetailsPopupOpen(true);
                  }}
                />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Show More Button */}
      {visibleCount < initialMfos.length && (
        <div className="text-center mb-12">
          <GrayButton
            text={`${t.buttons.showMore} (${initialMfos.length - visibleCount})`}
            onClick={() => setVisibleCount((prev) => prev + 9)}
          />
        </div>
      )}

      {/* Modals */}
      {selectedOffer && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-3xl p-8 max-w-md w-full max-h-[90vh] overflow-y-auto shadow-2xl">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-bold text-gray-800">
                {t.modal.title}
              </h3>
              <button
                onClick={closeModal}
                className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center hover:bg-gray-200 transition-colors text-lg"
              >
                ×
              </button>
            </div>

            <div className="text-center mb-6">
              <div className="w-16 h-16 bg-gradient-to-br rounded-xl flex items-center justify-center text-white text-2xl mx-auto mb-4">
                {selectedOffer.logo}
              </div>
              <h4 className="text-lg font-semibold text-gray-800 mb-2">
                {selectedOffer.name}
              </h4>
              <div className="bg-gray-50 rounded-2xl p-4">
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <div className="text-gray-500">{t.keyInfo.amount}</div>
                    <div className="font-semibold text-gray-800">
                      {selectedOffer.minAmount} - {selectedOffer.maxAmount} ₴
                    </div>
                  </div>
                  <div>
                    <div className="text-gray-500">{t.keyInfo.term}</div>
                    <div className="font-semibold text-gray-800">
                      to be soon
                    </div>
                  </div>
                  <div>
                    <div className="text-gray-500">{t.keyInfo.rate}</div>
                    <div className="font-semibold text-green-600">
                      to be soon
                    </div>
                  </div>
                  <div>
                    <div className="text-gray-500">{t.footer.time}</div>
                    <div className="font-semibold text-gray-800">
                      to be soon
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-4 text-center">
              <BlueButton text={t.buttons.apply} />
              <p className="text-xs text-gray-500 mt-2">
                {t.modal.redirectNotice}
              </p>
            </div>
          </div>
        </div>
      )}

      {selectedMFO && (
        <MFODetailsPopup
          mfo={selectedMFO}
          isOpen={isDetailsPopupOpen}
          onClose={() => {
            setIsDetailsPopupOpen(false);
            setSelectedMFO(null);
          }}
        />
      )}
    </>
  );
}