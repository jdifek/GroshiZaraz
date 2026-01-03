import React from "react";
import { Link } from "@/app/i18n/navigation";

import Image from "next/image";
import { getTranslations } from "next-intl/server";
import { FaLinkedin, FaTelegram, FaInstagram } from "react-icons/fa";

const Footer = async ({ lang }: { lang: string }) => {
  const t = await getTranslations({ locale: lang, namespace: "Footer" });

  return (
    <footer className="bg-gradient-to-br from-gray-50 to-white py-16 border-t border-gray-200">
      <div className="max-w-7xl mx-auto px-8">
        <div className="grid md:grid-cols-4 sm:grid-cols-2 gap-8 mb-12">
          {/* Логотип и описание */}
          <div className="space-y-4">
            <Image src={"/logoNew.svg"} alt="Логотип" width={55} height={55} />

            <p className="text-gray-600 text-sm leading-relaxed max-w-xs">
              {t("description")}
            </p>
            <div className="flex gap-3">
              <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center text-white font-bold text-xs">
                ✓
              </div>
              <span className="text-xs text-gray-600 leading-tight">
                {t("checked")}
              </span>
            </div>
          </div>

          {/* Навигация */}
          <div>
            <h4 className="text-lg font-bold text-gray-800 mb-6 relative">
              {t("navigation.title")}
              <div className="absolute -bottom-2 left-0 w-8 h-0.5 bg-gradient-to-r from-blue-500 to-yellow-400 rounded-full"></div>
            </h4>
            <ul className="space-y-3 text-sm">
              <li>
                <Link
                  href="/about"
                  className="text-gray-600 hover:text-blue-600 transition-all duration-200 hover:translate-x-1 inline-block"
                >
                  → {t("navigation.about")}
                </Link>
              </li>
              <li>
                <Link
                  href="/journal"
                  className="text-gray-600 hover:text-blue-600 transition-all duration-200 hover:translate-x-1 inline-block"
                >
                  → {t("navigation.news")}
                </Link>
              </li>
              <li>
                <Link
                  href="/ask-question"
                  className="text-gray-600 hover:text-blue-600 transition-all duration-200 hover:translate-x-1 inline-block"
                >
                  → {t("navigation.faq")}
                </Link>
              </li>
            </ul>
          </div>

          {/* Контакты */}
          <div>
            <h4 className="text-lg font-bold text-gray-800 mb-6 relative">
              {t("contacts.title")}
              <div className="absolute -bottom-2 left-0 w-8 h-0.5 bg-gradient-to-r from-blue-500 to-yellow-400 rounded-full"></div>
            </h4>
            <ul className="space-y-4 text-sm">
              <li className="flex items-center gap-3">
                <div className="w-8 h-8 bg-gradient-to-br from-green-500 to-green-600 rounded-full flex items-center justify-center text-white text-xs">
                  ✉
                </div>
                <div>
                  <div className="text-gray-500 text-xs">
                    {t("contacts.email")}
                  </div>
                  <a
                    href="mailto:finoglyad@gmail.com"
                    className="text-gray-700 hover:text-blue-600 transition-colors duration-200 font-medium"
                  >
                    finoglyad@gmail.com
                  </a>
                </div>
              </li>
              <li className="flex items-center gap-3">
                <div className="w-8 h-8 bg-gradient-to-br from-yellow-400 to-yellow-500 rounded-full flex items-center justify-center text-white text-xs">
                  📞
                </div>
                <div>
                  <div className="text-gray-500 text-xs">
                    {t("contacts.phone")}
                  </div>
                  <span className="text-gray-700 font-medium">
                    +38 (066) 304-09-67
                  </span>
                </div>
              </li>
              <li className="flex items-center gap-3">
                <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-purple-600 rounded-full flex items-center justify-center text-white text-xs">
                  📍
                </div>
                <div>
                  <div className="text-gray-500 text-xs">
                    {t("contacts.address")}
                  </div>
                  <span className="text-gray-700 font-medium">
                    {t("contacts.city")}
                  </span>
                </div>
              </li>
            </ul>
          </div>

          {/* Соцсети */}
          <div>
            <h4 className="text-lg font-bold text-gray-800 mb-6 relative">
              {t("social.title")}
              <div className="absolute -bottom-2 left-0 w-8 h-0.5 bg-gradient-to-r from-blue-500 to-yellow-400 rounded-full"></div>
            </h4>
            <div>
              <div className="flex gap-3 mb-6">
                <a
                  href="https://linkedin.com/company/finoglyad"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-12 h-12 bg-gradient-to-br from-blue-700 to-blue-900 rounded-xl flex items-center justify-center text-white hover:shadow-lg hover:scale-105 transition-all duration-300"
                  aria-label="LinkedIn"
                >
                  <FaLinkedin className="w-6 h-6" />
                </a>

                <a
                  href="https://t.me/finoglyad"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-12 h-12 bg-gradient-to-br from-cyan-500 to-cyan-700 rounded-xl flex items-center justify-center text-white hover:shadow-lg hover:scale-105 transition-all duration-300"
                  aria-label="Telegram"
                >
                  <FaTelegram className="w-6 h-6" />
                </a>

                <a
                  href="https://instagram.com/finoglyad"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-12 h-12 bg-gradient-to-br from-pink-500 to-pink-700 rounded-xl flex items-center justify-center text-white hover:shadow-lg hover:scale-105 transition-all duration-300"
                  aria-label="Instagram"
                >
                  <FaInstagram className="w-6 h-6" />
                </a>
              </div>

              <div className="bg-gradient-to-r from-blue-50 to-yellow-50 rounded-xl p-4">
                <div className="text-xs text-gray-600 mb-2">
                  {t("social.updates")}
                </div>
                <div className="text-xs text-gray-700">
                  {t("social.subtitle")}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Нижняя часть */}
        <div className="border-t border-gray-200 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="text-sm text-gray-600">
              © {new Date().getFullYear()} Фіногляд. {t("bottom.rights")}
            </div>
            <div className="flex gap-6 text-xs text-gray-500">
              <Link
                href="/privacy"
                className="hover:text-blue-600 transition-colors"
              >
                {t("bottom.privacy")}
              </Link>
              <Link
                href="/terms"
                className="hover:text-blue-600 transition-colors"
              >
                {t("bottom.terms")}
              </Link>
              <Link
                href="/sitemap"
                className="hover:text-blue-600 transition-colors"
              >
                {t("bottom.sitemap")}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
