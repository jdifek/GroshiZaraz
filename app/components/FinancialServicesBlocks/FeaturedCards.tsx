import { BlackButton } from "@/app/ui/Buttons/BlackButton";
import { getTranslations } from "next-intl/server";

export const FeaturedCards = async ({ lang }: { lang: string }) => {
  const t = await getTranslations({ locale: lang, namespace: "FeaturedCards" });

  return (
    <div className="grid lg:grid-cols-2 gap-8 mb-12">
      <div className="bg-gradient-to-br from-yellow-400 to-yellow-500 rounded-3xl p-8 text-white relative overflow-hidden group hover:shadow-2xl transition-all duration-300">
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-yellow-300 to-yellow-600 animate-pulse"></div>
        <div className="relative z-10">
          <h3 className="text-2xl font-bold mb-2">{t("firstLoan.title")}</h3>
          <p className="text-yellow-100 mb-6">{t("firstLoan.description")}</p>
          <BlackButton text={t("firstLoan.button")} />
        </div>
        <div className="absolute -right-8 -bottom-8 text-8xl opacity-20 group-hover:scale-110 transition-transform duration-300">
          0%
        </div>
      </div>

      <div className="bg-gradient-to-br from-gray-100 to-gray-200 rounded-3xl p-8 text-gray-800 relative overflow-hidden group hover:shadow-2xl transition-all duration-300">
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 to-yellow-400 animate-pulse"></div>
        <div className="relative z-10">
          <h3 className="text-2xl font-bold mb-2">{t("ptcLoan.title")}</h3>
          <p className="text-gray-600 mb-6">{t("ptcLoan.description")}</p>
          <BlackButton text={t("ptcLoan.button")} />
        </div>
        <div className="absolute -right-8 -bottom-8 text-6xl opacity-20 group-hover:scale-110 transition-transform duration-300">
          🚗
        </div>
      </div>
    </div>
  );
};
