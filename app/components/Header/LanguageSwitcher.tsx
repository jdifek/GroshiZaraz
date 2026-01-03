"use client";

import { usePathname, useRouter } from "next/navigation";
import { useLocale } from "next-intl";
import { useState } from "react";
import { Globe, Check } from "lucide-react";

export const LanguageSwitcher = () => {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  const languages = [
    { code: "uk", name: "Українська", flag: "🇺🇦" },
    { code: "ru", name: "Русский", flag: "🇷🇺" },
  ];

  const currentLanguage = languages.find((lang) => lang.code === locale);

  const switchLanguage = (newLocale: string) => {
    if (!pathname) return;
    
    // Заменяем локаль в pathname
    const segments = pathname.split("/");
    segments[1] = newLocale;
    const newPathname = segments.join("/");
    
    router.push(newPathname);
    setIsOpen(false);
  };

  return (
    <div className="relative">
      {/* Кнопка переключателя */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 cursor-pointer px-3 py-2 rounded-lg hover:bg-gray-100 transition-colors group"
        aria-label="Change language"
      >
        <Globe size={20} className="text-gray-600 group-hover:text-blue-600 transition-colors" />
        <span className="hidden sm:flex items-center gap-1 text-sm font-medium text-gray-700 group-hover:text-blue-600 transition-colors">
          {currentLanguage?.flag}
          <span className="hidden md:inline">{currentLanguage?.code.toUpperCase()}</span>
        </span>
      </button>

      {/* Выпадающее меню */}
      {isOpen && (
        <>
          {/* Overlay для закрытия при клике вне */}
          <div
            className="fixed inset-0 z-40"
            onClick={() => setIsOpen(false)}
          />

          {/* Меню */}
          <div className="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-xl border border-gray-200 py-2 z-50 animate-fade-in">
            <div className="px-3 py-2 border-b border-gray-100">
              <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
                {locale === "uk" ? "Мова сайту" : "Язык сайта"}
              </p>
            </div>

            {languages.map((language) => (
              <button
                key={language.code}
                onClick={() => switchLanguage(language.code)}
                className={`w-full flex cursor-pointer items-center justify-between px-3 py-2.5 text-sm transition-colors ${
                  locale === language.code
                    ? "bg-blue-50 text-blue-600 font-medium"
                    : "text-gray-700 hover:bg-gray-50"
                }`}
              >
                <span className="flex items-center gap-2">
                  <span className="text-xl">{language.flag}</span>
                  <span>{language.name}</span>
                </span>
                {locale === language.code && (
                  <Check size={16} className="text-blue-600" />
                )}
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  );
};