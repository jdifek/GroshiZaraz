"use client";
import React, { useEffect, useState } from "react";
import { CheckCircle } from "lucide-react";
import MfoService from "@/app/services/mfos/mfosService";
type MfoDetailsPageProps = {
  params: Promise<{ slug: string }>;
};
type MappedMfo = {
  name: string;
  logo: string; // у тебя сейчас emoji 🍎, но скорее всего будет string URL
  rating: number;
  reviews: number;
  color: string;
  minAmount: string;
  maxAmount: string;
  term: string;
  rate: string;
  approval: string;
  responseTime: string;
  commission: string;
  ageLimit: string;
  firstLoanFree: boolean;
  phone: string;
  website: string;
  license: string;
};
const MfoDetails: React.FC<MfoDetailsPageProps> = ({ params }) => {
 

  const [companyInfo, setCompanyInfo] = useState<MappedMfo | null>(null);

  const advantages = [
    "Первый займ 0%",
    "Мгновенное одобрение",
    "Без справок о доходах",
    "Круглосуточная поддержка",
    "Безопасные транзакции",
    "Гибкие условия",
  ];

  useEffect(() => {
    const loadData = async () => {
      try {
        const { slug } = await params;
        const response = await MfoService.getMfoBySlug(slug);
        console.log(response);
        const mapCompany = {
          name: response.name,
          logo: response.logo,
          rating: response.rating,
          reviews: response.reviews,
          minAmount: response.minAmount,
          maxAmount: response.maxAmount,
          term: response.minTerm + '-' + response.maxTerm,
          rate: response.rating,
          approval: response.approvalRate,
          responseTime: response.decisionTime,
          commission: "0% to be",
          ageLimit: `${response.ageFrom} - ${response.ageTo}`,
          firstLoanFree: true,
          phone: response.phone,
          website: response.website,
          license: response.licenseNumber,
        };

        setCompanyInfo(mapCompany)
      } catch (err) {
        console.error("Error loading news:", err);
      }
    };
    loadData();
  }, [params]);

  return (
    <div className="min-h-screen ">
      <div className="max-w-7xl mx-auto">
        <div>
          <h2 className="text-2xl font-bold text-gray-800 mb-6">
            О займе в {companyInfo && companyInfo.name}
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
                    {companyInfo?.maxAmount} ₴
                  </span>
                </div>
                <div className="flex justify-between py-2 border-b border-gray-100">
                  <span className="text-gray-600">Минимальная сумма</span>
                  <span className="font-semibold text-gray-800">
                    {companyInfo?.minAmount} ₴
                  </span>
                </div>
                <div className="flex justify-between py-2 border-b border-gray-100">
                  <span className="text-gray-600">Срок займа</span>
                  <span className="font-semibold text-gray-800">
                    {companyInfo?.term}
                  </span>
                </div>
                <div className="flex justify-between py-2 border-b border-gray-100">
                  <span className="text-gray-600">Процентная ставка</span>
                  <span className="font-semibold text-gray-800">
                    {companyInfo?.rate} %
                  </span>
                </div>
                <div className="flex justify-between py-2 border-b border-gray-100">
                  <span className="text-gray-600">Возраст заемщика</span>
                  <span className="font-semibold text-gray-800">
                    {companyInfo?.ageLimit} лет
                  </span>
                </div>
                <div className="flex justify-between py-2">
                  <span className="text-gray-600">Решение по займу</span>
                  <span className="font-semibold text-gray-800">
                    {companyInfo?.responseTime}
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
            <h3 className="text-xl font-semibold text-gray-800 mb-4">
              О компании
            </h3>
            <p className="text-gray-700 leading-relaxed">
              ООО «{companyInfo &&  companyInfo.name}» — украинская микрофинансовая организация,
              которая выдает срочные займы на карту по всей Украины. Компания
              специализируется на предоставлении быстрых микрозаймов с
              минимальными требованиями к заемщикам. Особенностью является
              предоставление первого займа под 0% для новых клиентов.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MfoDetails;
