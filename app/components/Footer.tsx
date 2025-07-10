import React from "react";
import Link from "next/link";

interface FooterProps {
  isDark?: boolean;
}

const Footer: React.FC<FooterProps> = ({ isDark = false }) => {
  const bgClass = isDark
    ? "bg-gray-900 text-white"
    : "bg-gray-100 text-gray-800";
  const borderColor = isDark ? "border-gray-700" : "border-gray-300";
  const hoverText = isDark ? "hover:text-blue-400" : "hover:text-blue-600";

  return (
    <footer className={`${bgClass} py-12 border-t ${borderColor}`}>
      <div className="max-w-7xl mx-auto px-8 grid md:grid-cols-4 sm:grid-cols-2 gap-8">
        {/* Логотип и краткое описание */}

        <div>
          <Link href="/">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-yellow-400 rounded-xl flex items-center justify-center text-white font-bold text-lg">
              GZ
            </div>
          </Link>
          <p className="mt-4 text-sm leading-relaxed opacity-80 max-w-xs">
            Сравнивайте лучшие предложения от банков и МФО Украины. Помогаем
            найти выгодное решение быстро и бесплатно.
          </p>
        </div>

        {/* Навигация */}
        <div>
          <h4 className="text-lg font-semibold mb-4">Навигация</h4>
          <ul className="space-y-2 text-sm">
            <li>
              <Link href="/offers" className={`${hoverText} transition`}>
                Предложения
              </Link>
            </li>
            <li>
              <Link href="/about" className={`${hoverText} transition`}>
                О сервисе
              </Link>
            </li>
            <li>
              <Link href="/news" className={`${hoverText} transition`}>
                Новости
              </Link>
            </li>
            <li>
              <Link href="/faq" className={`${hoverText} transition`}>
                Вопросы и ответы
              </Link>
            </li>
          </ul>
        </div>

        {/* Контакты */}
        <div>
          <h4 className="text-lg font-semibold mb-4">Контакты</h4>
          <ul className="space-y-2 text-sm">
            <li>
              Email:{" "}
              <a
                href="mailto:support@groshizaraz.ua"
                className={`${hoverText} transition`}
              >
                support@groshizaraz.ua
              </a>
            </li>
            <li>
              Телефон: <span className="opacity-80">+380 44 123 45 67</span>
            </li>
            <li>Киев, Украина</li>
          </ul>
        </div>

        {/* Социальные сети */}
        <div>
          <h4 className="text-lg font-semibold mb-4">Мы в сети</h4>
          <div className="flex gap-4 text-xl">
            <a
              href="#"
              className={`${hoverText} transition`}
              aria-label="Facebook"
            >
              🌐
            </a>
            <a
              href="#"
              className={`${hoverText} transition`}
              aria-label="Telegram"
            >
              📲
            </a>
            <a
              href="#"
              className={`${hoverText} transition`}
              aria-label="Instagram"
            >
              📷
            </a>
          </div>
        </div>
      </div>

      <div
        className={`mt-12 text-center text-xs ${
          isDark ? "text-gray-500" : "text-gray-600"
        }`}
      >
        © {new Date().getFullYear()} GroshiZaraz. Все права защищены.
      </div>
    </footer>
  );
};

export default Footer;
