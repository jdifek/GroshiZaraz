import { CurrencyWidget } from "./CurrencyWidget";
import { FeaturedCards } from "../FinancialServicesBlocks/FeaturedCards";
import { MfoSection } from "../FinancialServicesBlocks/MfoSection";
import { getTranslations } from "next-intl/server";
const FinancialServicesBlocks = async ({ lang }: { lang: string }) => {
  const t = await getTranslations({
    locale: lang,
    namespace: "FinancialServicesBlocks",
  });



  return (
    <div className="min-h-screen">
      <div className="max-w-7xl mx-auto space-y-12">
        <div className="space-y-8">
          <div className="text-center">
            <h1 className="!text-[1.95rem] md:!text-[42px] font-bold text-gray-800 mb-4 relative inline-block">
              {t("title")}
              <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-20 h-1 bg-gradient-to-r from-blue-500 to-yellow-400 rounded-full"></div>
            </h1>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
              {t("subtitle")}
            </p>
          </div>

          <FeaturedCards lang={lang}/>

       

          <CurrencyWidget  lang={lang}/>
        </div>

        {/* <BanksSection /> */}
        <MfoSection lang={lang}/>
      </div>
    </div>
  );
};

export default FinancialServicesBlocks;
