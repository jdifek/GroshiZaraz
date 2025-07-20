import { Award, Globe, Phone } from "lucide-react";

export default function ContactsPage() {
  const companyInfo = {
    name: "Hurma Credit",
    logo: "🍎",
    rating: 5.0,
    reviews: 1,
    color: "from-orange-400 to-orange-600",
    minAmount: "5 000",
    maxAmount: "30 000",
    term: "5-30 дней",
    rate: "0 - 292%",
    approval: "98%",
    responseTime: "5 минут",
    commission: "0%",
    ageLimit: "18-75 лет",
    firstLoanFree: true,
    phone: "8 800 550-72-68",
    website: "hurmacredit.ru",
    license: "№ 22-033-22-009972",
  };
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
            <div className="text-blue-600">{companyInfo.phone}</div>
          </div>
        </div>
        <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-2xl">
          <Globe className="w-8 h-8 text-blue-600" />
          <div>
            <div className="font-semibold text-gray-800">Сайт</div>
            <div className="text-blue-600">{companyInfo.website}</div>
          </div>
        </div>
        <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-2xl">
          <Award className="w-8 h-8 text-blue-600" />
          <div>
            <div className="font-semibold text-gray-800">
              Лицензия
            </div>
            <div className="text-gray-600">{companyInfo.license}</div>
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
            <span className="font-semibold">09:00 - 21:00</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Сб-Вс:</span>
            <span className="font-semibold">10:00 - 18:00</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Онлайн заявки:</span>
            <span className="font-semibold text-green-600">24/7</span>
          </div>
        </div>
      </div>
    </div>
  </div>
  );
}
