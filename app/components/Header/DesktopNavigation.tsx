'use client'
import React, { useState } from "react";
import { ChevronDown } from "lucide-react";
import Link from "next/link";

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

interface DesktopNavigationProps {
  navigationItems: NavigationItem[];
}

export const DesktopNavigation: React.FC<DesktopNavigationProps> = ({ navigationItems }) => {
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);

  return (
    <nav className="hidden xl:flex items-center space-x-6">
      {navigationItems.map((item) => (
        <div
          key={item.name}
          className="relative group"
          onMouseEnter={() => item.dropdown && setActiveDropdown(item.name)}
          onMouseLeave={() => setActiveDropdown(null)}
        >
          <Link
            href={item.href}
            className="flex items-center text-gray-700 hover:text-blue-600 font-medium transition-colors duration-200 relative group py-2"
          >
            {item.name}
            {item.dropdown && (
              <ChevronDown 
                size={16} 
                className={`ml-1 transition-transform duration-200 ${
                  activeDropdown === item.name ? 'rotate-180' : ''
                }`} 
              />
            )}
            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-blue-500 to-yellow-400 transition-all duration-300 group-hover:w-full"></span>
          </Link>

          {/* Desktop Dropdown Menu - Now visible to crawlers */}
          {item.dropdown && (
            <div className={`
              absolute top-full mt-2 bg-white rounded-lg shadow-xl border border-gray-200 py-4 min-w-[600px] max-w-[800px] z-50
              ${navigationItems.indexOf(item) > navigationItems.length - 3 ? 'right-0' : 'left-0'}
              ${activeDropdown === item.name ? 'block' : 'hidden group-hover:block'}
            `}>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 px-6 max-h-[70vh] overflow-y-auto">
                {Object.entries(item.dropdown).map(([category, links]) => (
                  <div key={category} className="space-y-2">
                    <h3 className="text-sm font-semibold text-gray-900 pb-2 border-b border-gray-100">
                      {category}
                    </h3>
                    <div className="space-y-1">
                      {links.map((link) => (
                        <Link
                          key={link.href}
                          href={link.href}
                          className={`block px-3 py-2 text-sm rounded-md transition-colors duration-200 ${
                            link.isBold 
                              ? 'font-bold text-blue-600 hover:bg-blue-50' 
                              : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                          }`}
                        >
                          {link.name}
                        </Link>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      ))}
    </nav>
  );
};
