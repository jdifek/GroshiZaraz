import React from "react";
import { CheckCircle } from "lucide-react";
import MfoService from "@/app/services/mfos/mfosService";

type MfoDetailsPageProps = {
  params: { slug: string };
};

type MappedMfo = {
  name: string;
  logo: string;
  rating: number;
  reviews: number;
  color: string;
  minAmount: number;
  maxAmount: number;
  term: string;
  rate: number;
  approval: number;
  responseTime: string;
  commission: string;
  ageLimit: string;
  firstLoanFree: boolean;
  phone?: string;
  website?: string;
  license?: string;
};

const MfoDetails = async ({ params }: MfoDetailsPageProps) => {
  let companyInfo: MappedMfo | null = null;

  try {
    const response = await MfoService.getMfoBySlug(params.slug);

    companyInfo = {
      name: response.name,
      logo: response.logo,
      rating: response.rating,
      reviews: response.reviews,
      minAmount: response.minAmount,
      maxAmount: response.maxAmount,
      term: response.minTerm + "-" + response.maxTerm,
      rate: response.rating,
      approval: response.approvalRate,
      responseTime: response.decisionTime,
      commission: "0% to be",
      ageLimit: `${response.ageFrom} - ${response.ageTo}`,
      firstLoanFree: true,
      phone: response.phone,
      website: response.website,
      license: response.licenseNumber,
      color: "", // если есть цвет, добавь сюда
    };
  } catch (err) {
    console.error("Error loading company info:", err);
    // Тут можно вернуть 404 или fallback UI
    return <div>Компания не найдена</div>;
  }

  const advantages = [
    "Первый займ 0%",
    "Мгновенное одобрение",
    "Без справок о доходах",
    "Круглосуточная поддержка",
    "Безопасные транзакции",
    "Гибкие условия",
  ];

  return (
    <div className="min-h-screen ">
      <div className="max-w-7xl mx-auto">
        <div>
          <h2 className="text-2xl font-bold text-gray-800 mb-6">
            О займе в {companyInfo.name}
          </h2>

          <div className="grid lg:grid-cols-2 gap-8 mb-8">
            <div>
              <h3 className="text-xl font-semibold text-gray-800 mb-4">
                Условия займа
              </h3>
              <div className="space-y-3">
                <div className="flex justify-between py-2 border-b border-gray-100">
                  <span className="text-gray-600">Максимальная сумма</span>
                  <span className="font-semibold text-gray-800">
                    {companyInfo.maxAmount} ₴
                  </span>
                </div>
                <div className="flex justify-between py-2 border-b border-gray-100">
                  <span className="text-gray-600">Минимальная сумма</span>
                  <span className="font-semibold text-gray-800">
                    {companyInfo.minAmount} ₴
                  </span>
                </div>
                <div className="flex justify-between py-2 border-b border-gray-100">
                  <span className="text-gray-600">Срок займа</span>
                  <span className="font-semibold text-gray-800">
                    {companyInfo.term}
                  </span>
                </div>
                <div className="flex justify-between py-2 border-b border-gray-100">
                  <span className="text-gray-600">Процентная ставка</span>
                  <span className="font-semibold text-gray-800">
                    {companyInfo.rate} %
                  </span>
                </div>
                <div className="flex justify-between py-2 border-b border-gray-100">
                  <span className="text-gray-600">Возраст заемщика</span>
                  <span className="font-semibold text-gray-800">
                    {companyInfo.ageLimit} лет
                  </span>
                </div>
                <div className="flex justify-between py-2">
                  <span className="text-gray-600">Решение по займу</span>
                  <span className="font-semibold text-gray-800">
                    {companyInfo.responseTime}
                  </span>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-xl font-semibold text-gray-800 mb-4">
                Преимущества
              </h3>
              <div className="space-y-3">
                {advantages.map((advantage, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-700">{advantage}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-r from-blue-50 to-blue-100 rounded-2xl p-6 border border-blue-200">
            <h3 className="text-xl font-semibold text-gray-800 mb-4">О компании</h3>
            <p className="text-gray-700 leading-relaxed">
              ООО «{companyInfo.name}» — украинская микрофинансовая организация, которая
              выдает срочные займы на карту по всей Украине. Компания специализируется
              на предоставлении быстрых микрозаймов с минимальными требованиями к заемщикам.
              Особенностью является предоставление первого займа под 0% для новых клиентов.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MfoDetails;
