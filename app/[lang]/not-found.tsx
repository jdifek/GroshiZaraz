import { Home, Search, ArrowLeft, TrendingUp, Shield, CreditCard } from 'lucide-react';
import { Link } from "@/app/i18n/navigation";

export default function NotFoundPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 flex items-center justify-center px-4">
      <div className="max-w-4xl mx-auto text-center">
        {/* Векторная иллюстрация */}
        <div className="mb-12">
          <svg
            viewBox="0 0 400 300"
            className="w-full max-w-lg mx-auto"
            xmlns="http://www.w3.org/2000/svg"
          >
            {/* Фон */}
            <defs>
              <linearGradient id="bgGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#EBF4FF" />
                <stop offset="100%" stopColor="#DBEAFE" />
              </linearGradient>
              <linearGradient id="cardGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#3B82F6" />
                <stop offset="100%" stopColor="#1D4ED8" />
              </linearGradient>
              <linearGradient id="coinGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#F59E0B" />
                <stop offset="100%" stopColor="#D97706" />
              </linearGradient>
            </defs>

            {/* Облака */}
            <ellipse cx="80" cy="50" rx="25" ry="15" fill="#F1F5F9" opacity="0.7" />
            <ellipse cx="320" cy="40" rx="30" ry="18" fill="#F1F5F9" opacity="0.7" />
            <ellipse cx="60" cy="45" rx="15" ry="10" fill="#E2E8F0" opacity="0.6" />
            <ellipse cx="340" cy="35" rx="20" ry="12" fill="#E2E8F0" opacity="0.6" />

            {/* Главный персонаж - банковская карта с глазами */}
            <g transform="translate(200, 150)">
              {/* Карта */}
              <rect x="-60" y="-25" width="120" height="75" rx="12" fill="url(#cardGradient)" />
              <rect x="-50" y="-15" width="100" height="8" rx="4" fill="rgba(255,255,255,0.3)" />
              <rect x="-40" y="5" width="30" height="20" rx="4" fill="rgba(255,255,255,0.4)" />
              
              {/* Глаза */}
              <circle cx="-20" cy="-5" r="8" fill="white" />
              <circle cx="20" cy="-5" r="8" fill="white" />
              <circle cx="-20" cy="-5" r="5" fill="#1F2937" />
              <circle cx="20" cy="-5" r="5" fill="#1F2937" />
              <circle cx="-18" cy="-7" r="2" fill="white" />
              <circle cx="22" cy="-7" r="2" fill="white" />
              
              {/* Рот (грустный) */}
              <path d="M -15 15 Q 0 8 15 15" stroke="#1F2937" strokeWidth="2" fill="none" />
            </g>

            {/* Монеты рассыпанные вокруг */}
            <circle cx="120" cy="200" r="12" fill="url(#coinGradient)" />
            <text x="120" y="206" textAnchor="middle" fill="white" fontSize="10" fontWeight="bold">₴</text>
            
            <circle cx="280" cy="180" r="10" fill="url(#coinGradient)" />
            <text x="280" y="185" textAnchor="middle" fill="white" fontSize="8" fontWeight="bold">₴</text>
            
            <circle cx="150" cy="240" r="8" fill="url(#coinGradient)" />
            <text x="150" y="244" textAnchor="middle" fill="white" fontSize="6" fontWeight="bold">₴</text>

            {/* Большие цифры 404 на заднем плане */}
            <text x="200" y="120" textAnchor="middle" fill="rgba(59, 130, 246, 0.1)" fontSize="80" fontWeight="bold">404</text>

            {/* Дополнительные элементы */}
            <rect x="100" y="100" width="8" height="40" rx="4" fill="#10B981" opacity="0.3" />
            <rect x="290" y="120" width="6" height="30" rx="3" fill="#F59E0B" opacity="0.3" />
            <rect x="110" y="110" width="25" height="6" rx="3" fill="#10B981" opacity="0.3" />
          </svg>
        </div>

        {/* Текстовый контент */}
        <div className="mb-12">
          <h1 className="text-4xl sm:text-5xl font-bold text-gray-800 mb-6">
            Упс! Страница потерялась
          </h1>
          <div className="max-w-2xl mx-auto mb-8">
            <p className="text-xl text-gray-600 mb-4">
              К сожалению, запрашиваемая страница пока недоступна или была перемещена
            </p>
            <p className="text-gray-500">
              Но не расстраивайтесь! На нашем портале вы найдете множество выгодных предложений от банков, МФО и страховых компаний
            </p>
          </div>
        </div>

        {/* Карточки с предложениями */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <div className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border-2 border-transparent hover:border-blue-300">
            <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center mb-4 mx-auto">
              <CreditCard className="w-6 h-6 text-blue-600" />
            </div>
            <h3 className="font-semibold text-gray-800 mb-2">Займы и кредиты</h3>
            <p className="text-sm text-gray-600 mb-4">Найдите лучшие условия для получения займа</p>
            <Link href="/mfos" className="text-blue-600 hover:text-blue-800 font-medium text-sm">
              Смотреть предложения →
            </Link>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border-2 border-transparent hover:border-green-300">
            <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center mb-4 mx-auto">
              <TrendingUp className="w-6 h-6 text-green-600" />
            </div>
            <h3 className="font-semibold text-gray-800 mb-2">Банковские услуги</h3>
            <p className="text-sm text-gray-600 mb-4">Выберите банк с выгодными тарифами</p>
            <Link href="/banks" className="text-green-600 hover:text-green-800 font-medium text-sm">
              Сравнить банки →
            </Link>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border-2 border-transparent hover:border-orange-300">
            <div className="w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center mb-4 mx-auto">
              <Shield className="w-6 h-6 text-orange-600" />
            </div>
            <h3 className="font-semibold text-gray-800 mb-2">Страхование</h3>
            <p className="text-sm text-gray-600 mb-4">Защитите себя и свое имущество</p>
            <Link href="/insurance" className="text-orange-600 hover:text-orange-800 font-medium text-sm">
              Выбрать полис →
            </Link>
          </div>
        </div>

        {/* Кнопки навигации */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Link 
            href="/"
            className="bg-gradient-to-r from-blue-500 to-blue-600 text-white px-8 py-4 rounded-2xl font-semibold hover:from-blue-600 hover:to-blue-700 transition-all duration-200 shadow-lg hover:shadow-xl flex items-center gap-2 group"
          >
            <Home className="w-5 h-5 group-hover:scale-110 transition-transform" />
            На главную
          </Link>
          
          <Link
  href="/"
  className="bg-white text-gray-700 px-8 py-4 rounded-2xl font-semibold hover:bg-gray-50 transition-all duration-200 shadow-lg hover:shadow-xl border-2 border-gray-200 hover:border-gray-300 flex items-center gap-2 group"
>
  <ArrowLeft className="w-5 h-5 group-hover:scale-110 transition-transform" />
  Назад
</Link>

          <Link 
            href="/search"
            className="bg-gradient-to-r from-green-500 to-green-600 text-white px-8 py-4 rounded-2xl font-semibold hover:from-green-600 hover:to-green-700 transition-all duration-200 shadow-lg hover:shadow-xl flex items-center gap-2 group"
          >
            <Search className="w-5 h-5 group-hover:scale-110 transition-transform" />
            Поиск
          </Link>
        </div>

        {/* Дополнительная информация */}
        <div className="mt-12 bg-white/50 backdrop-blur-sm rounded-2xl p-6 border border-gray-200">
          <p className="text-gray-600">
            <span className="font-semibold text-gray-800">Нужна помощь?</span> Наша команда поддержки готова помочь вам найти нужное предложение
          </p>
          <div className="flex flex-wrap justify-center gap-4 mt-4 text-sm">
            <a href="tel:+380123456789" className="text-blue-600 hover:text-blue-800 font-medium">
              📞 +38 (012) 345-67-89
            </a>
            <a href="mailto:finoglyad@gmail.com" className="text-blue-600 hover:text-blue-800 font-medium">
              ✉️ finoglyad@gmail.com
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}