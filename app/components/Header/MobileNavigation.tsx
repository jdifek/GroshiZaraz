"use client";
import React, { useState } from "react";
import { Menu, X, ChevronDown, ArrowLeft } from "lucide-react";
import { Link } from "@/app/i18n/navigation";

import { LanguageSwitcher } from "./LanguageSwitcher"; // ✅ ДОБАВИТЬ

interface NavigationItem {
  name: string;
  href: string;
  dropdown?: {
    [category: string]: {
      name: string;
      href: string;
      isBold?: boolean;
    }[];
  };
}

interface MobileNavigationProps {
  navigationItems: NavigationItem[];
}

export const MobileNavigation: React.FC<MobileNavigationProps> = ({
  navigationItems,
}) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [mobileActiveCategory, setMobileActiveCategory] = useState<
    string | null
  >(null);

  const handleMobileMenuClick = (item: NavigationItem) => {
    if (item.dropdown) {
      setMobileActiveCategory(item.name);
    } else {
      setIsMenuOpen(false);
    }
  };

  const handleMobileBack = () => {
    setMobileActiveCategory(null);
  };

  return (
    <>
      {/* Mobile menu button */}
      <button
        onClick={() => setIsMenuOpen(!isMenuOpen)}
        className="xl:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors"
      >
        {isMenuOpen ? (
          <X size={20} className="text-gray-600" />
        ) : (
          <Menu size={20} className="text-gray-600" />
        )}
      </button>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="xl:hidden absolute top-16 left-0 right-0 bg-white border-t border-gray-100 shadow-lg z-40">
          <div className="py-4 max-h-[80vh] overflow-y-auto">
            {!mobileActiveCategory ? (
              /* Main menu */
              <nav className="flex flex-col space-y-1 px-4">
                {/* ✅ Переключатель языков в мобильном меню */}
                <div className="mb-4 pb-4 border-b border-gray-200">
                  <LanguageSwitcher />
                </div>

                {navigationItems.map((item) => (
                  <div key={item.name}>
                    {item.dropdown ? (
                      <button
                        onClick={() => handleMobileMenuClick(item)}
                        className="w-full flex items-center justify-between px-4 py-3 text-gray-700 hover:text-blue-600 hover:bg-gray-50 rounded-lg font-medium transition-colors duration-200 text-left"
                      >
                        {item.name}
                        <ChevronDown size={16} />
                      </button>
                    ) : (
                      <Link
                        href={item.href}
                        className="flex items-center justify-between px-4 py-3 text-gray-700 hover:text-blue-600 hover:bg-gray-50 rounded-lg font-medium transition-colors duration-200"
                        onClick={() => setIsMenuOpen(false)}
                      >
                        {item.name}
                      </Link>
                    )}
                  </div>
                ))}
              </nav>
            ) : (
              /* Submenu */
              <div className="space-y-4 px-4">
                <button
                  onClick={handleMobileBack}
                  className="flex items-center px-4 py-3 text-gray-700 hover:text-blue-600 hover:bg-gray-50 rounded-lg font-medium transition-colors duration-200"
                >
                  <ArrowLeft size={16} className="mr-2" />
                  Назад
                </button>

                <div className="px-4 py-2 border-b border-gray-200">
                  <h2 className="text-lg font-semibold text-gray-900">
                    {mobileActiveCategory}
                  </h2>
                </div>

                <div className="space-y-4">
                  {(() => {
                    const currentItem = navigationItems.find(
                      (item) => item.name === mobileActiveCategory
                    );
                    if (!currentItem?.dropdown) return null;

                    return Object.entries(currentItem.dropdown).map(
                      ([category, links]) => (
                        <div key={category} className="space-y-2">
                          <h3 className="px-4 text-sm font-semibold text-gray-500 uppercase">
                            {category}
                          </h3>
                          <div className="space-y-1">
                            {links.map((link) => (
                              <Link
                                key={link.href}
                                href={link.href}
                                className={`block px-4 py-3 text-sm rounded-lg transition-colors duration-200 ${
                                  link.isBold
                                    ? "font-bold text-blue-600 hover:bg-blue-50"
                                    : "text-gray-600 hover:text-gray-900 hover:bg-gray-50"
                                }`}
                                onClick={() => {
                                  setIsMenuOpen(false);
                                  setMobileActiveCategory(null);
                                }}
                              >
                                {link.name}
                              </Link>
                            ))}
                          </div>
                        </div>
                      )
                    );
                  })()}
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
};
