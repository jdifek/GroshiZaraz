"use client";
import { Link } from "@/app/i18n/navigation";

import { usePathname } from "next/navigation";
import { CreditCard, Phone, Shield, Star, Gift } from "lucide-react";
import { useTranslations } from "next-intl";

export const NavigationTabs = ({ slug }: { slug: string }) => {
  const t = useTranslations("MFOPageTabs"); // namespace для переводов
  const pathname = usePathname();
  const cleanPathname = pathname.replace(/^\/[a-z]{2}/, "");

  const tabs = [
    { id: "", label: t("about"), icon: <CreditCard className="w-4 h-4" /> },
    { id: "reviews", label: t("reviews"), icon: <Star className="w-4 h-4" /> },
    {
      id: "questions",
      label: t("questions"),
      icon: <Shield className="w-4 h-4" />,
    },
    {
      id: "contacts",
      label: t("contacts"),
      icon: <Phone className="w-4 h-4" />,
    },
    {
      id: "promocodes",
      label: t("promocodes"),
      icon: <Gift className="w-4 h-4" />,
    },
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
                ${
                  isActive
                    ? "bg-gradient-to-r from-blue-500 to-blue-600 text-white shadow-lg"
                    : "text-gray-600 hover:text-gray-800 hover:bg-gray-50"
                }
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
