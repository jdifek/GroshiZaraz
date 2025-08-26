import React from "react";
import { Search } from "lucide-react";
import Link from "next/link";
import { MobileNavigation } from "./Header/MobileNavigation";
import { DesktopNavigation } from "./Header/DesktopNavigation";
import { navigationItems } from "../data/navigationItems";
import Image from "next/image";

export const Header: React.FC = () => {
  return (
    <header className="bg-white w-full shadow-sm border-b border-gray-100 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <Image src={'/logoNew.svg'}  width={35} height={35}/>

            <span className="text-xl font-bold tracking-tight text-[#1A4D8F] hover:text-[#00AEEF] transition-colors">
              Фіногляд<span className="text-[#00AEEF]">.ua</span>
            </span>
          </Link>

          {/* Desktop Navigation */}
          <DesktopNavigation navigationItems={navigationItems} />

          {/* Search and Mobile Menu */}
          <div className="flex items-center space-x-4">
            <button className="p-2 rounded-lg hover:bg-gray-100 transition-colors">
              <Search size={20} className="text-gray-600" />
            </button>

            {/* Mobile Navigation */}
            <MobileNavigation navigationItems={navigationItems} />
          </div>
        </div>
      </div>

      {/* Fallback навигация для поисковиков и пользователей без JS */}
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
