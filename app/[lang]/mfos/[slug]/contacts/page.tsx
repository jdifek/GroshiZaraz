import MfoService from "@/app/services/mfos/mfosService";
import { Award, Globe, Phone } from "lucide-react";

export default async function ContactsPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  let companyInfo;
  const { slug } =await  params;

  try {
    const response = await MfoService.getMfoBySlug(slug);

    console.log(response, 'rdsadsaddas');
    
    companyInfo = {
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
      workTimeWeekdays: response.workTimeWeekdays,
      workTimeWeekend: response.workTimeWeekend,
      workTimeOnline: response.workTimeOnline
    };
  } catch (error) {
    console.error("Error loading company:", error);
  }

  return (
    <div>
    <h2 className="text-2xl font-bold text-gray-800 mb-6">
      Контакты
    </h2>
    <div className="grid md:grid-cols-2 gap-8">
      <div className="space-y-4">
        <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-2xl">
          <Phone className="w-8 h-8 text-blue-600" />
          <div>
            <div className="font-semibold text-gray-800">Телефон</div>
            <div className="text-blue-600">{companyInfo?.phone}</div>
          </div>
        </div>
        <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-2xl">
          <Globe className="w-8 h-8 text-blue-600" />
          <div>
            <div className="font-semibold text-gray-800">Сайт</div>
            <div className="text-blue-600">{companyInfo?.website}</div>
          </div>
        </div>
        <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-2xl">
          <Award className="w-8 h-8 text-blue-600" />
          <div>
            <div className="font-semibold text-gray-800">
              Лицензия
            </div>
            <div className="text-gray-600">{companyInfo?.license}</div>
          </div>
        </div>
      </div>
      <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-2xl p-6 border border-blue-200">
        <h3 className="text-xl font-semibold text-gray-800 mb-4">
          Режим работы
        </h3>
        <div className="space-y-2">
          <div className="flex justify-between">
            <span className="text-gray-600">Пн-Пт:</span>
            <span className="font-semibold">{companyInfo?.workTimeWeekdays}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Сб-Вс:</span>
            <span className="font-semibold">{companyInfo?.workTimeWeekend}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Онлайн заявки:</span>
            <span className="font-semibold text-green-600">{companyInfo?.workTimeOnline}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
  );
}
