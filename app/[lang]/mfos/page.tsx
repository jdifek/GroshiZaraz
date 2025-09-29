
"use client";
import React, { useEffect, useState } from "react";
import {
  ChevronDown,
  Star,
  Clock,
  Percent,
  TrendingUp,
  Shield,
  Users,
} from "lucide-react";
import { BlueButton } from "@/app/ui/Buttons/BlueButton";
import { GrayButton } from "@/app/ui/Buttons/GrayButton";
import { InfoButton } from "@/app/ui/Buttons/InfoButton";
import MFODetailsPopup from "@/app/ui/Popups/MFODetailsPopup";
import MfoService from "@/app/services/mfos/mfosService";
import { Mfo, RandomKey } from "@/app/services/mfos/mfoTypes";
import Image from "next/image";
import Link from "next/link";
import { useLocale, useTranslations } from "next-intl";
import SEOLoansContent from "@/app/components/SEOLoansContent";

interface SortOption {
  value: string;
  label: string;
}

export default function MFOsPage() {
  const t = useTranslations("MFOsPage");

  const [sortBy, setSortBy] = useState<string>("rating");
  const [isSortDropdownOpen, setIsSortDropdownOpen] = useState<boolean>(false);
  const [visibleCount] = useState<number>(9);
  const [selectedOffer, setSelectedOffer] = useState<Mfo | null>(null);
  const [selectedMFO, setSelectedMFO] = useState<Mfo | null>(null);
  const [isDetailsPopupOpen, setIsDetailsPopupOpen] = useState(false);
  const locale = useLocale();

  const sortOptions: SortOption[] = [
    { value: "rating", label: t("sort.rating") },
    { value: "rate", label: t("sort.rate") },
    { value: "approval", label: t("sort.approval") },
    { value: "responseTime", label: t("sort.responseTime") },
    { value: "maxAmount", label: t("sort.maxAmount") },
  ];

  const closeModal = () => setSelectedOffer(null);

  const [mfos, setMfos] = useState<Mfo[]>([]);
  const [randomKeys, setRandomKeys] = useState<RandomKey[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchMfos = async () => {
    setIsLoading(true);
    try {
      const data = await MfoService.getAllMfos(sortBy);
      setMfos(data);
      const keys = await MfoService.getRandomKeys();
      setRandomKeys(keys);
    } catch {
      console.log("Ошибка при загрузке МФО");
    } finally {
      setIsLoading(false);
    }
  };
  

  useEffect(() => {
    fetchMfos();
  }, [sortBy]);


  return (
    <div className="min-h-screen">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-800 mb-4 relative inline-block">
            {t("header.title")}
            <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-20 h-1 bg-gradient-to-r from-blue-500 to-yellow-400 rounded-full"></div>
          </h1>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            {t("header.subtitle")}
          </p>
        </div>

        {/* Categories */}
        <div className="mb-12">
          <div className="flex flex-wrap gap-3">
            {isLoading
              ? Array.from({ length: 6 }).map((_, i) => (
                  <div
                    key={i}
                    className="h-9 w-24 bg-gray-200 rounded-2xl animate-pulse flex items-center justify-center"
                  >
                    <div className="h-3 w-16 bg-gray-300 rounded-full"></div>
                  </div>
                ))
              :randomKeys.map((key, index) => {
                const slug = locale === "uk" ? key.slugUk : key.slugRu;
                const name = locale === "uk" ? key.nameUk : key.nameRu;
                return (
                  <Link
                    key={index}
                    href={`/mfo/${slug}`}
                    className="px-4 py-2 rounded-2xl text-sm font-medium transition-all duration-200 bg-white text-gray-700 hover:bg-gray-50 border-2 border-gray-200 hover:scale-105"
                  >
                    {name}
                  </Link>
                );
              })}
          </div>
        </div>

        {/* Sort and Stats */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-12 gap-4">
          {/* Sort Dropdown */}
          <div className="relative">
            <button
              onClick={() => setIsSortDropdownOpen(!isSortDropdownOpen)}
              className="bg-white cursor-pointer  border-2 border-gray-200 rounded-2xl px-6 py-3 flex items-center gap-3 hover:border-blue-300 transition-all duration-200 shadow-sm"
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
                    onClick={() => {
                      setSortBy(option.value);
                      setIsSortDropdownOpen(false);
                    }}
                    className="w-full cursor-pointer  text-left px-4 py-2 hover:bg-gray-50 first:rounded-t-2xl last:rounded-b-2xl text-gray-700 transition-colors duration-200"
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
                {t("sort.found")}: {mfos.length}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
              <span>{t("sort.averageRate")}: 0.05%</span>
            </div>
          </div>
        </div>

        {/* MFO Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 mb-12">
          {isLoading
            ? Array.from({ length: 6 }).map((_, i) => (
              <div
                key={i}
                className="bg-white rounded-3xl shadow-lg border-2 border-transparent p-6 animate-pulse space-y-4"
              >
                {/* Header */}
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-xl bg-gray-200" />
                    <div className="space-y-2">
                      <div className="h-4 w-32 bg-gray-200 rounded" />
                      <div className="h-3 w-20 bg-gray-200 rounded" />
                    </div>
                  </div>
                  <div className="w-16 h-6 bg-gray-200 rounded-full" />
                </div>
      
                {/* Key Info */}
                <div className="grid grid-cols-2 gap-3">
                  <div className="h-12 bg-gray-100 rounded-2xl" />
                  <div className="h-12 bg-gray-100 rounded-2xl" />
                </div>
      
                {/* Rate and Approval */}
                <div className="flex justify-between items-center">
                  <div className="space-y-1">
                    <div className="h-5 w-20 bg-gray-200 rounded" />
                    <div className="h-3 w-14 bg-gray-100 rounded" />
                  </div>
                  <div className="space-y-1">
                    <div className="h-5 w-14 bg-gray-200 rounded" />
                    <div className="h-3 w-10 bg-gray-100 rounded" />
                  </div>
                </div>
      
                {/* Special Offer */}
                <div className="h-6 bg-gray-100 rounded-2xl" />
      
                {/* Advantages */}
                <div className="flex flex-wrap gap-2">
                  <div className="h-6 w-16 bg-gray-200 rounded-full" />
                  <div className="h-6 w-20 bg-gray-200 rounded-full" />
                  <div className="h-6 w-14 bg-gray-200 rounded-full" />
                </div>
      
                {/* Footer */}
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <div className="h-4 w-20 bg-gray-200 rounded" />
                    <div className="h-4 w-16 bg-gray-200 rounded" />
                  </div>
                  <div className="flex justify-between gap-2">
                    <div className="h-10 flex-1 bg-gray-300 rounded-2xl" />
                    <div className="h-10 w-10 bg-gray-300 rounded-full" />
                  </div>
                </div>
              </div>
            ))
            : mfos.slice(0, visibleCount).map((offer, index) => (
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
                            {[...Array(Math.round(offer.rating))].map(
                              (_, i) => (
                                <Star
                                  key={i}
                                  className="w-4 h-4 text-yellow-500 fill-current"
                                />
                              )
                            )}
                            <span className="text-sm text-gray-600">
                              {offer.rating}
                            </span>
                          </div>
                        </div>
                      </div>
                      <div className="bg-gradient-to-r from-orange-500 to-red-500 text-white px-2 py-1 rounded-full text-xs font-medium">
                        {t("topLabel")}
                      </div>
                    </div>

                    {/* Key Info */}
                    <div className="grid grid-cols-2 gap-3 mb-4">
                      <div className="bg-gray-50 rounded-2xl p-3">
                        <div className="text-xs text-gray-500 mb-1">
                          {t("keyInfo.amount")}
                        </div>
                        <div className="font-semibold text-gray-800 text-sm">
                          {offer.minAmount.toLocaleString()} -{" "}
                          {offer.maxAmount.toLocaleString()} ₴
                        </div>
                      </div>
                      <div className="bg-gray-50 rounded-2xl p-3">
                        <div className="text-xs text-gray-500 mb-1">
                          {t("keyInfo.term")}
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
                          {t("keyInfo.perDay")}
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-lg font-semibold text-blue-600">
                          {offer.approvalRate}%
                        </div>
                        <div className="text-xs text-gray-500">
                          {t("keyInfo.approval")}
                        </div>
                      </div>
                    </div>

                    {/* Special Offer */}
                    <div className="bg-green-50 border border-green-200 rounded-2xl p-2 mb-4">
                      <div className="text-xs text-green-700 font-medium">
                        {t("specialOffer.firstLoanFree")}
                      </div>
                    </div>

                    {/* Advantages */}
                    <div className="flex flex-wrap gap-2 mb-4">
                      <span className="bg-blue-50 text-blue-700 px-2 py-1 rounded-full text-xs font-medium">
                        {t("advantages.fast")}
                      </span>
                      <span className="bg-blue-50 text-blue-700 px-2 py-1 rounded-full text-xs font-medium">
                        {t("advantages.convenient")}
                      </span>
                      <span className="bg-gray-100 text-gray-600 px-2 py-1 rounded-full text-xs font-medium">
                        {t("advantages.plus1")}
                      </span>
                    </div>
                  </div>

                  {/* Footer */}
                  <div className="p-6">
                    <div className="flex items-center justify-between mb-4 text-sm text-gray-600">
                      <div className="flex items-center gap-2">
                        <Clock className="w-4 h-4 text-green-500" />
                        <span>{t("footer.minutes")}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Percent className="w-4 h-4 text-blue-500" />
                        <span>0%</span>
                      </div>
                    </div>

                    <div className="flex justify-between">
                      <BlueButton text={t("buttons.getLoan")} link={offer.UtmLink} />
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
        {visibleCount < mfos.length && (
          <div className="text-center mb-12">
            <GrayButton
              text={`${t("buttons.showMore")} (${mfos.length - visibleCount})`}
            />
          </div>
        )}

        {/* Info Section */}
        <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-3xl p-8 text-white shadow-xl mb-12">
          <div className="text-center mb-8">
            <h2 className="text-2xl sm:text-3xl font-bold mb-4">
              {t("infoSection.title")}
            </h2>
            <p className="text-lg text-blue-100 max-w-2xl mx-auto">
              {t("infoSection.subtitle")}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white/10 rounded-2xl p-6 backdrop-blur-sm hover:bg-white/20 transition-all duration-300">
              <TrendingUp className="w-8 h-8 mb-4" />
              <h3 className="text-lg font-semibold mb-2">
                {t("infoSection.compareConditions.title")}
              </h3>
              <p className="text-blue-100">
                {t("infoSection.compareConditions.text")}
              </p>
            </div>

            <div className="bg-white/10 rounded-2xl p-6 backdrop-blur-sm hover:bg-white/20 transition-all duration-300">
              <Users className="w-8 h-8 mb-4" />
              <h3 className="text-lg font-semibold mb-2">
                {t("infoSection.reviews.title")}
              </h3>
              <p className="text-blue-100">
                {t("infoSection.reviews.text")}
              </p>
            </div>

            <div className="bg-white/10 rounded-2xl p-6 backdrop-blur-sm hover:bg-white/20 transition-all duration-300">
              <Shield className="w-8 h-8 mb-4" />
              <h3 className="text-lg font-semibold mb-2">
                {t("infoSection.reliability.title")}
              </h3>
              <p className="text-blue-100">
                {t("infoSection.reliability.text")}
              </p>
            </div>
          </div>
        </div>

        <SEOLoansContent />

        {/* Modals */}
        {selectedOffer && (
          <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-3xl p-8 max-w-md w-full max-h-[90vh] overflow-y-auto shadow-2xl">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-xl font-bold text-gray-800">
                  {t("modal.title")}
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
                      <div className="text-gray-500">{t("keyInfo.amount")}</div>
                      <div className="font-semibold text-gray-800">
                        {selectedOffer.minAmount} - {selectedOffer.maxAmount} ₽
                      </div>
                    </div>
                    <div>
                      <div className="text-gray-500">{t("keyInfo.term")}</div>
                      <div className="font-semibold text-gray-800">to be soon</div>
                    </div>
                    <div>
                      <div className="text-gray-500">{t("keyInfo.rate")}</div>
                      <div className="font-semibold text-green-600">to be soon</div>
                    </div>
                    <div>
                      <div className="text-gray-500">{t("footer.time")}</div>
                      <div className="font-semibold text-gray-800">to be soon</div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="space-y-4 text-center">
                <BlueButton text={t("buttons.apply")} />
                <p className="text-xs text-gray-500 mt-2">
                  {t("modal.redirectNotice")}
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
      </div>
    </div>
  );
}
