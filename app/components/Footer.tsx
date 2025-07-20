import React from "react";
import Link from "next/link";

const Footer: React.FC = () => {
  return (
    <footer className="bg-gradient-to-br from-gray-50 to-white py-16 border-t border-gray-200">
      <div className="max-w-7xl mx-auto px-8">
        <div className="grid md:grid-cols-4 sm:grid-cols-2 gap-8 mb-12">
          {/* Логотип и краткое описание */}
          <div className="space-y-4">
            <Link href="/">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-yellow-400 rounded-2xl flex items-center justify-center text-white font-bold text-xl shadow-lg hover:shadow-xl transition-shadow duration-300">
                GZ
              </div>
            </Link>
            <p className="text-gray-600 text-sm leading-relaxed max-w-xs">
              Сравнивайте лучшие предложения от банков и МФО Украины. Помогаем
              найти выгодное решение быстро и бесплатно.
            </p>
            <div className="flex gap-3">
              <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center text-white font-bold text-xs">
                ✓
              </div>
              <span className="text-xs text-gray-600 leading-tight">
                Проверенные партнеры и безопасные условия
              </span>
            </div>
          </div>

          {/* Навигация */}
          <div>
            <h4 className="text-lg font-bold text-gray-800 mb-6 relative">
              Навигация
              <div className="absolute -bottom-2 left-0 w-8 h-0.5 bg-gradient-to-r from-blue-500 to-yellow-400 rounded-full"></div>
            </h4>
            <ul className="space-y-3 text-sm">
            
              <li>
                <Link 
                  href="/about" 
                  className="text-gray-600 hover:text-blue-600 transition-all duration-200 hover:translate-x-1 inline-block"
                >
                  → О сервисе
                </Link>
              </li>
              <li>
                <Link 
                  href="/news" 
                  className="text-gray-600 hover:text-blue-600 transition-all duration-200 hover:translate-x-1 inline-block"
                >
                  → Новости
                </Link>
              </li>
              <li>
                <Link 
                  href="/ask-question" 
                  className="text-gray-600 hover:text-blue-600 transition-all duration-200 hover:translate-x-1 inline-block"
                >
                  → Вопросы и ответы
                </Link>
              </li>
            </ul>
          </div>

          {/* Контакты */}
          <div>
            <h4 className="text-lg font-bold text-gray-800 mb-6 relative">
              Контакты
              <div className="absolute -bottom-2 left-0 w-8 h-0.5 bg-gradient-to-r from-blue-500 to-yellow-400 rounded-full"></div>
            </h4>
            <ul className="space-y-4 text-sm">
              <li className="flex items-center gap-3">
                <div className="w-8 h-8 bg-gradient-to-br from-green-500 to-green-600 rounded-full flex items-center justify-center text-white text-xs">
                  ✉
                </div>
                <div>
                  <div className="text-gray-500 text-xs">Email</div>
                  <a
                    href="mailto:support@groshizaraz.ua"
                    className="text-gray-700 hover:text-blue-600 transition-colors duration-200 font-medium"
                  >
                    support@groshizaraz.ua
                  </a>
                </div>
              </li>
              <li className="flex items-center gap-3">
                <div className="w-8 h-8 bg-gradient-to-br from-yellow-400 to-yellow-500 rounded-full flex items-center justify-center text-white text-xs">
                  📞
                </div>
                <div>
                  <div className="text-gray-500 text-xs">Телефон</div>
                  <span className="text-gray-700 font-medium">+380 44 123 45 67</span>
                </div>
              </li>
              <li className="flex items-center gap-3">
                <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-purple-600 rounded-full flex items-center justify-center text-white text-xs">
                  📍
                </div>
                <div>
                  <div className="text-gray-500 text-xs">Адрес</div>
                  <span className="text-gray-700 font-medium">Киев, Украина</span>
                </div>
              </li>
            </ul>
          </div>

          {/* Социальные сети */}
          <div>
            <h4 className="text-lg font-bold text-gray-800 mb-6 relative">
              Мы в сети
              <div className="absolute -bottom-2 left-0 w-8 h-0.5 bg-gradient-to-r from-blue-500 to-yellow-400 rounded-full"></div>
            </h4>
            <div className="flex gap-3 mb-6">
              <a
                href="#"
                className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center text-white text-lg hover:shadow-lg hover:scale-105 transition-all duration-300"
                aria-label="Facebook"
              >
                🌐
              </a>
              <a
                href="#"
                className="w-12 h-12 bg-gradient-to-br from-cyan-500 to-cyan-600 rounded-xl flex items-center justify-center text-white text-lg hover:shadow-lg hover:scale-105 transition-all duration-300"
                aria-label="Telegram"
              >
                📲
              </a>
              <a
                href="#"
                className="w-12 h-12 bg-gradient-to-br from-pink-500 to-pink-600 rounded-xl flex items-center justify-center text-white text-lg hover:shadow-lg hover:scale-105 transition-all duration-300"
                aria-label="Instagram"
              >
                📷
              </a>
            </div>
            <div className="bg-gradient-to-r from-blue-50 to-yellow-50 rounded-xl p-4">
              <div className="text-xs text-gray-600 mb-2">💡 Следите за обновлениями</div>
              <div className="text-xs text-gray-700">
                Новые предложения и финансовые советы каждую неделю
              </div>
            </div>
          </div>
        </div>

        {/* Нижняя часть */}
        <div className="border-t border-gray-200 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="text-sm text-gray-600">
              © {new Date().getFullYear()} GroshiZaraz. Все права защищены.
            </div>
            <div className="flex gap-6 text-xs text-gray-500">
              <Link href="/privacy" className="hover:text-blue-600 transition-colors">
                Политика конфиденциальности
              </Link>
              <Link href="/terms" className="hover:text-blue-600 transition-colors">
                Условия использования
              </Link>
              <Link href="/sitemap" className="hover:text-blue-600 transition-colors">
                Карта сайта
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;