import { ReactNode } from "react";
import { HeaderCompany } from "@/app/components/CompanyPage/HeaderCompany";
import { NavigationTabs } from "@/app/components/CompanyPage/NavigationTabs";
import { StatsSection } from "@/app/components/CompanyPage/StatsSection";
import MfoService from "@/app/services/mfos/mfosService";

export default async function CompanyLayout({
  children,
  params,
}: {
  children: ReactNode;
  params: Promise<{ slug: string }>;
}) {
  let companyInfo;
  const { slug } = await params;

  try {
    const response = await MfoService.getMfoBySlug(slug);

    console.log(response, "rdsadsaddas");

    companyInfo = {
      id: response.id,
      name: response.name,
      logo: response.logo,
      rating: response.rating,
      minAmount: response.minAmount,
      maxAmount: response.maxAmount,
      minTerm: response.minTerm,
      maxTerm: response.maxTerm,
      annualRateMin: response.rateMin ,
      annualRateMax: response.rateMax,
      dailyRate: response.dailyRate,
      reviews: response.reviews,
      approval: response.approvalRate,
      responseTime: response.decisionTime,
      commission: response.commission || 0,
      collateral: response.collateral || "Не потрібна",
      ageLimit: `${response.ageFrom} - ${response.ageTo}`,
      firstLoanFree: response.isFirstLoanZero,
      phone: response.phone,
      website: response.website,
      license: response.licenseNumber,
      UtmLink: response.UtmLink,
      loansIssued: response.loansIssued,
      satisfiedClients: response.satisfiedClients,
      nbuCharacteristicsLink: response.nbuCharacteristicsLink,
      nbuWarningLink: response.nbuWarningLink,
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
        <StatsSection companyInfo={companyInfo}  />
      </div>
    </div>
  );
}
