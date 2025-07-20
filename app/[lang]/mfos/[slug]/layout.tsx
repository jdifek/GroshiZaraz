import { ReactNode } from "react";
import { HeaderCompany } from "@/app/components/CompanyPage/HeaderCompany";
import { NavigationTabs } from "@/app/components/CompanyPage/NavigationTabs";
import { StatsSection } from "@/app/components/CompanyPage/StatsSection";

export default function CompanyLayout({
  children,
  params,
}: {
  children: ReactNode;
  params: { slug: string };
}) {
  const companyInfo = {
    name: "Hurma Credit",
    logo: "🍎",
    rating: 5.0,
    reviews: 1,
    color: "from-orange-400 to-orange-600",
    minAmount: "5 000",
    maxAmount: "30 000",
    term: "5-30 дней",
    rate: "0 - 292%",
    approval: "98%",
    responseTime: "5 минут",
    commission: "0%",
    ageLimit: "18-75 лет",
    firstLoanFree: true,
    phone: "8 800 550-72-68",
    website: "hurmacredit.ru",
    license: "№ 22-033-22-009972",
  };

  return (
    <div className="min-h-screen">
      <div className="max-w-7xl mx-auto">
        <HeaderCompany companyInfo={companyInfo} />
        <NavigationTabs slug={params.slug} />
        <div className="bg-white rounded-3xl shadow-lg p-8">{children}</div>
        <StatsSection companyInfo={companyInfo} />
      </div>
    </div>
  );
}
