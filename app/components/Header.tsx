import React from "react";
import { Link } from "@/app/i18n/navigation";

import { MobileNavigation } from "./Header/MobileNavigation";
import { DesktopNavigation } from "./Header/DesktopNavigation";
import { LanguageSwitcher } from "./Header/LanguageSwitcher"; // ✅ ДОБАВИТЬ
import Image from "next/image";
import { getTranslations } from "next-intl/server";
import { getNavigationItems } from "../data/navigationItems";

export const Header = async ({ lang }: { lang: string }) => {
  const t = await getTranslations({ locale: lang });

  const navigationItems = getNavigationItems(t, lang as "uk" | "ru");

  
  return (
    <header className="bg-white w-full shadow-sm border-b border-gray-100 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href={`/`} className="flex items-center space-x-2">
            <Image src={"/logoNew.svg"} alt="Логотип" width={35} height={35} />
            <span className="text-xl font-bold tracking-tight text-[#1A4D8F] hover:text-[#00AEEF] transition-colors">
              Фіногляд<span className="text-[#00AEEF]">.ua</span>
            </span>
          </Link>

          {/* Desktop Navigation */}
          <DesktopNavigation navigationItems={navigationItems} />

          {/* Language Switcher and Mobile Menu */}
          <div className="flex items-center gap-2">
            {/* ✅ Переключатель языков */}
            <LanguageSwitcher />

            {/* Mobile Navigation */}
            <MobileNavigation navigationItems={navigationItems} />
          </div>
        </div>
      </div>

      {/* Fallback навигация */}
      <noscript>
        <nav
          aria-label="Site navigation fallback"
          className="bg-gray-50 border-t border-gray-200 py-4"
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {navigationItems.map((item) => (
                <div key={item.name} className="space-y-3">
                  <Link
                    href={item.href}
                    className="text-lg font-semibold text-gray-900 hover:text-blue-600 transition-colors block"
                  >
                    {item.name}
                  </Link>
                  {item.dropdown && (
                    <div className="space-y-3">
                      {Object.entries(item.dropdown).map(
                        ([category, links]) => (
                          <div key={category} className="space-y-1">
                            <h4 className="text-sm font-medium text-gray-700 uppercase tracking-wider">
                              {category}
                            </h4>
                            <div className="space-y-1 ml-2">
                              {links.map((link) => (
                                <Link
                                  key={link.href}
                                  href={link.href}
                                  className={`block text-sm transition-colors ${
                                    link.isBold
                                      ? "font-semibold text-blue-600 hover:text-blue-700"
                                      : "text-gray-600 hover:text-gray-900"
                                  }`}
                                >
                                  {link.name}
                                </Link>
                              ))}
                            </div>
                          </div>
                        )
                      )}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </nav>
      </noscript>
    </header>
  );
};

export default Header;
