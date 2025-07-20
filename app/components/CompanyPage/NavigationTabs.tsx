"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { CreditCard, Phone, Shield, Star, Gift } from "lucide-react";

export const NavigationTabs = ({ slug }: { slug: string }) => {
  const pathname = usePathname();
  const cleanPathname = pathname.replace(/^\/[a-z]{2}/, "");

  const tabs = [
    { id: "", label: "О займе", icon: <CreditCard className="w-4 h-4" /> },
    { id: "reviews", label: "Отзывы", icon: <Star className="w-4 h-4" /> },
    { id: "questions", label: "Вопросы", icon: <Shield className="w-4 h-4" /> },
    { id: "contacts", label: "Контакты", icon: <Phone className="w-4 h-4" /> },
    { id: "promocodes", label: "Промокоды", icon: <Gift className="w-4 h-4" /> },
  ];

  return (
    <div className="bg-white rounded-3xl shadow-lg mb-8">
      <div className="flex overflow-x-auto sm:overflow-x-visible">
        {tabs.map((tab) => {
          const link = `/mfos/${slug}${tab.id ? `/${tab.id}` : ""}`;
          const isActive = cleanPathname === link;

          return (
            <Link
              key={tab.id || "main"}
              href={link}
              className={`
                px-6 py-4 text-center font-medium transition-all duration-300 first:rounded-l-3xl last:rounded-r-3xl whitespace-nowrap
                ${isActive ? "bg-gradient-to-r from-blue-500 to-blue-600 text-white shadow-lg" : "text-gray-600 hover:text-gray-800 hover:bg-gray-50"}
                min-w-max sm:flex-1
              `}
            >
              <div className="flex items-center justify-center gap-2">
                {tab.icon}
                <span>{tab.label}</span>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
};
