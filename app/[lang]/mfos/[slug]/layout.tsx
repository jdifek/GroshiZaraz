import { ReactNode } from "react";
import { HeaderCompany } from "@/app/components/CompanyPage/HeaderCompany";
import { NavigationTabs } from "@/app/components/CompanyPage/NavigationTabs";
import { StatsSection } from "@/app/components/CompanyPage/StatsSection";
import MfoService from "@/app/services/mfos/mfosService";

export default async function CompanyLayout ({
  children,
  params,
}: {
  children: ReactNode;
  params: Promise<{ slug: string }>;
}) {
  let companyInfo;
  const { slug } =await  params;

  try {
    const response = await MfoService.getMfoBySlug(slug);

    console.log(response, 'rdsadsaddas');
    
    companyInfo = {
      name: response.name,
      logo: response.logo,
      rating: response.rating,
      reviews: response.reviews,
      minAmount: "5 000",
      maxAmount: "30 000",
      term: response.minTerm + '-' + response.maxTerm,
      rate: 'wqwq',
      approval: response.approvalRate,
      responseTime: "5 минут",
      commission: "0%",
      ageLimit: "18-75 лет",
      firstLoanFree: true,
      phone: "8 800 550-72-68",
      website: response.website,
      license: "№ 22-033-22-009972",
    };
  } catch (error) {
    console.error("Error loading company:", error);
  }


  return (
    <div className="min-h-screen">
      <div className="max-w-7xl mx-auto">
        <HeaderCompany companyInfo={companyInfo} />
        <NavigationTabs slug={(await params).slug} />
        <div className="bg-white rounded-3xl shadow-lg p-8">{children}</div>
        <StatsSection companyInfo={companyInfo} />
      </div>
    </div>
  );
}
