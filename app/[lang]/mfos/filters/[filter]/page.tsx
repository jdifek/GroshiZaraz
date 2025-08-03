'use client';
import React, { useEffect, useState } from 'react';
import { ChevronDown, Star, Clock, Percent, TrendingUp, Shield, Users } from 'lucide-react';
import { BlueButton } from '@/app/ui/Buttons/BlueButton';
import { GrayButton } from '@/app/ui/Buttons/GrayButton';
import { InfoButton } from '@/app/ui/Buttons/InfoButton';
import MFODetailsPopup from '@/app/ui/Popups/MFODetailsPopup';
import { Mfo } from '@/app/services/mfos/mfoTypes';
import Image from 'next/image';
import MfoService from '@/app/services/mfos/mfosService';



interface Category {
  name: string;
  count: number | null;
  active: boolean;
}

interface SortOption {
  value: string;
  label: string;
}

export default function MFOsFilterPage() {
  const [sortBy, setSortBy] = useState<string>("rating");
  const [isSortDropdownOpen, setIsSortDropdownOpen] = useState<boolean>(false);
  const [visibleCount] = useState<number>(9);
  const [selectedOffer, setSelectedOffer] = useState<Mfo | null>(null);
  const [selectedMFO, setSelectedMFO] = useState<Mfo | null>(null);
  const [isDetailsPopupOpen, setIsDetailsPopupOpen] = useState(false);
 

  const categories: Category[] = [
    { name: "Все займы", count: 234, active: true },
    { name: "Онлайн", count: 187, active: false },
    { name: "На карту", count: 156, active: false },
    { name: "Без отказа", count: 98, active: false },
    { name: "Все МФО", count: 145, active: false },
    { name: "Калькулятор", count: null, active: false },
    { name: "До зарплаты", count: 67, active: false },
    { name: "Без процентов", count: 34, active: false },
    { name: "Новые займы", count: 23, active: false },
    { name: "Срочные", count: 78, active: false },
    { name: "Лучшие", count: 45, active: false },
    { name: "С плохой КИ", count: 89, active: false },
    { name: "Малоизвестные", count: 56, active: false },
    { name: "Первый без процентов", count: 34, active: false },
    { name: "С просрочками", count: 23, active: false },
    { name: "Через Госуслуги", count: 12, active: false },
    { name: "Рефинансирование", count: 18, active: false },
    { name: "Под залог ПТС", count: 9, active: false },
  ];

  const sortOptions: SortOption[] = [
    { value: "rating", label: "По рейтингу" },
    { value: "rate", label: "По ставке" },
    { value: "approval", label: "По проценту одобрения" },
    { value: "responseTime", label: "По времени ответа" },
    { value: "maxAmount", label: "По максимальной сумме" },
  ];



  const closeModal = () => {
    setSelectedOffer(null);
  };
  const [mfos, setMfos] = useState<Mfo[]>([]);

  const [, setIsLoading] = useState(true);

  const fetchMfos = async () => {
    setIsLoading(true);
    try {
      const data = await MfoService.getAllMfos();
      setMfos(data);
      console.log(data);
      console.log(mfos);
    } catch {
      console.log("Ошибка при загрузке МФО");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchMfos();
  }, []);

  return (
    <div className="min-h-screen">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-800 mb-4 relative inline-block">
            Займы
            <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-20 h-1 bg-gradient-to-r from-blue-500 to-yellow-400 rounded-full"></div>
          </h1>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Оформите лучшие займы на карту не выходя из дома. Здесь собраны
            самые популярные украинские МФО. Они принимают заявки онлайн и
            выдают деньги в течение часа. Получение микрозайма круглосуточное.
          </p>
        </div>

        {/* Categories */}
        <div className="mb-12">
          <div className="flex flex-wrap gap-3">
            {categories.map((category, index) => (
              <button
                key={index}
                className={`px-4 py-2 rounded-2xl text-sm font-medium transition-all duration-200 hover:scale-105 ${
                  category.active
                    ? "bg-gradient-to-r from-blue-500 to-blue-600 text-white shadow-lg"
                    : "bg-white text-gray-700 hover:bg-gray-50 border-2 border-gray-200"
                }`}
              >
                {category.name}
                {category.count !== null && (
                  <span
                    className={`ml-2 ${
                      category.active ? "text-blue-100" : "text-gray-500"
                    }`}
                  >
                    {category.count}
                  </span>
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Sort and Stats */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-12 gap-4">
          {/* Sort Dropdown */}
          <div className="relative">
            <button
              onClick={() => setIsSortDropdownOpen(!isSortDropdownOpen)}
              className="bg-white border-2 border-gray-200 rounded-2xl px-6 py-3 flex items-center gap-3 hover:border-blue-300 transition-all duration-200 shadow-sm"
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
                    className="w-full text-left px-4 py-2 hover:bg-gray-50 first:rounded-t-2xl last:rounded-b-2xl text-gray-700 transition-colors duration-200"
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
              <span>Найдено: {mfos.length}</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
              <span>Средняя ставка: 0.05%</span>
            </div>
          </div>
        </div>

        {/* Offers Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 mb-12">
          {mfos.slice(0, visibleCount).map((offer, index) => (
            <div
              key={offer.id}
              className="bg-white rounded-3xl shadow-lg hover:shadow-xl transition-all duration-300 border-2 border-transparent hover:border-blue-500 group animate-fade-in"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              {/* Header */}
              <div className="p-6 border-b border-gray-100">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div
                      className={`w-12 h-12 rounded-xl flex items-center justify-center text-white text-xl group-hover:scale-110 transition-transform duration-200`}
                    >
                      <Image
                        unoptimized
                        src={offer.logo}
                        alt={`${offer.name} logo`}
                        width={64}
                        height={64}
                        className="object-cover  rounded-2xl"
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
                        <span className="text-sm text-gray-400">(123)</span>
                      </div>
                    </div>
                  </div>
                  <div className="bg-gradient-to-r from-orange-500 to-red-500 text-white px-2 py-1 rounded-full text-xs font-medium">
                    ТОП
                  </div>
                </div>

                {/* Key Info */}
                <div className="grid grid-cols-2 gap-3 mb-4">
                  <div className="bg-gray-50 rounded-2xl p-3">
                    <div className="text-xs text-gray-500 mb-1">Сумма</div>
                    <div className="font-semibold text-gray-800 text-sm">
                      {offer.minAmount.toLocaleString()} -{" "}
                      {offer.maxAmount.toLocaleString()} ₴
                    </div>
                  </div>
                  <div className="bg-gray-50 rounded-2xl p-3">
                    <div className="text-xs text-gray-500 mb-1">Срок</div>
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
                    <div className="text-xs text-gray-500">в день</div>
                  </div>
                  <div className="text-right">
                    <div className="text-lg font-semibold text-blue-600">
                      {offer.approvalRate}%
                    </div>
                    <div className="text-xs text-gray-500">одобрение</div>
                  </div>
                </div>

                {/* Special offers */}
                <div className="bg-green-50 border border-green-200 rounded-2xl p-2 mb-4">
                  <div className="text-xs text-green-700 font-medium">
                    Первый займ без процентов
                  </div>
                </div>

                {/* Advantages */}
                <div className="flex flex-wrap gap-2 mb-4">
                  <span className="bg-blue-50 text-blue-700 px-2 py-1 rounded-full text-xs font-medium">
                    Быстро
                  </span>
                  <span className="bg-blue-50 text-blue-700 px-2 py-1 rounded-full text-xs font-medium">
                    Удобно
                  </span>
                  <span className="bg-gray-100 text-gray-600 px-2 py-1 rounded-full text-xs font-medium">
                    +1
                  </span>
                </div>
              </div>

              {/* Footer */}
              <div className="p-6">
                <div className="flex items-center justify-between mb-4 text-sm text-gray-600">
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4 text-green-500" />
                    <span>15 минут</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Percent className="w-4 h-4 text-blue-500" />
                    <span>0%</span>
                  </div>
                </div>

                <div className="flex justify-between">
                  <BlueButton text="Получить займ" />
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
              text={`Показать еще займы (${
                mfos.length - visibleCount
              })`}
              // onClick={() => setVisibleCount(prev => prev + 9)}
            />
          </div>
        )}

        {/* Info Section */}
        <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-3xl p-8 text-white shadow-xl mb-12">
          <div className="text-center mb-8">
            <h2 className="text-2xl sm:text-3xl font-bold mb-4">
              Как выбрать лучший займ?
            </h2>
            <p className="text-lg text-blue-100 max-w-2xl mx-auto">
              Наши эксперты помогут вам сделать правильный выбор
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white/10 rounded-2xl p-6 backdrop-blur-sm hover:bg-white/20 transition-all duration-300">
              <TrendingUp className="w-8 h-8 mb-4" />
              <h3 className="text-lg font-semibold mb-2">Сравните условия</h3>
              <p className="text-blue-100">
                Обратите внимание на процентную ставку, сроки и комиссии
              </p>
            </div>

            <div className="bg-white/10 rounded-2xl p-6 backdrop-blur-sm hover:bg-white/20 transition-all duration-300">
              <Users className="w-8 h-8 mb-4" />
              <h3 className="text-lg font-semibold mb-2">Изучите отзывы</h3>
              <p className="text-blue-100">
                Почитайте мнения других клиентов о качестве обслуживания
              </p>
            </div>

            <div className="bg-white/10 rounded-2xl p-6 backdrop-blur-sm hover:bg-white/20 transition-all duration-300">
              <Shield className="w-8 h-8 mb-4" />
              <h3 className="text-lg font-semibold mb-2">
                Проверьте надежность
              </h3>
              <p className="text-blue-100">
                Убедитесь, что компания имеет все необходимые лицензии
              </p>
            </div>
          </div>
        </div>

        {/* Application Modal */}
        {selectedOffer && (
          <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-3xl p-8 max-w-md w-full max-h-[90vh] overflow-y-auto shadow-2xl">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-xl font-bold text-gray-800">
                  Оформление займа
                </h3>
                <button
                  onClick={closeModal}
                  className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center hover:bg-gray-200 transition-colors text-lg"
                >
                  ×
                </button>
              </div>

              <div className="text-center mb-6">
                <div
                  className={`w-16 h-16 bg-gradient-to-br  rounded-xl flex items-center justify-center text-white text-2xl mx-auto mb-4`}
                >
                  {selectedOffer.logo}
                </div>
                <h4 className="text-lg font-semibold text-gray-800 mb-2">
                  {selectedOffer.name}
                </h4>
                <div className="bg-gray-50 rounded-2xl p-4">
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <div className="text-gray-500">Сумма</div>
                      <div className="font-semibold text-gray-800">
                        {selectedOffer.minAmount} - {selectedOffer.maxAmount} ₽
                      </div>
                    </div>
                    <div>
                      <div className="text-gray-500">Срок</div>
                      <div className="font-semibold text-gray-800">
                      to be soon
                      </div>
                    </div>
                    <div>
                      <div className="text-gray-500">Ставка</div>
                      <div className="font-semibold text-green-600">
                      to be soon
                      </div>
                    </div>
                    <div>
                      <div className="text-gray-500">Время</div>
                      <div className="font-semibold text-gray-800">
                      to be soon
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                {/* <div className="bg-blue-50 rounded-2xl p-4">
                  <h5 className="font-semibold text-blue-900 mb-2">
                    Преимущества:
                  </h5>
                  <ul className="text-sm text-blue-800 space-y-1">
                    {selectedOffer.advantages.map((advantage, i) => (
                      <li key={i} className="flex items-center gap-2">
                        <span className="text-green-500">✓</span>
                        {advantage}
                      </li>
                    ))}
                  </ul>
                </div> */}

                <div className="text-center">
                  <BlueButton
                    text="Перейти к оформлению"
                    // onClick={() => {
                    //   window.open('https://example.com', '_blank');
                    //   closeModal();
                    // }}
                  />
                  <p className="text-xs text-gray-500 mt-2">
                    Вы будете перенаправлены на сайт партнера
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
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
  );
}