import { Link } from "@/app/i18n/navigation";
import { getTranslations } from "next-intl/server";

export const CurrencyWidget = async ({ lang }: { lang: string }) => {
  const t = await getTranslations({
    locale: lang,
    namespace: "CurrencyWidget",
  });

  return (
    <section className="bg-white rounded-3xl p-6 shadow-lg border border-gray-100 w-full max-w-3xl mx-auto">
      <div className="flex flex-col md:flex-row justify-between items-center gap-6 md:gap-8">
        {/* Ссылки */}
        <div className="flex flex-col gap-1 text-center md:text-left">
          <Link
            href="/currency-exchange"
            className="text-sm font-medium text-[#1A4D8F] hover:text-[#00AEEF] transition-colors"
          >
            {t("currencyRates")}
          </Link>
          <Link
            href="/currency-exchange"
            className="text-sm text-[#6B7280] hover:text-[#00AEEF] transition-colors"
          >
            {t("converter")}
          </Link>
        </div>

        {/* USD */}
        <div className="flex flex-col items-center text-center">
          <p className="text-xs text-gray-500">USD</p>
          <div className="flex items-center gap-2">
            <span className="text-xl font-bold text-gray-800">78.84</span>
            <span className="text-xs px-2 py-0.5 rounded bg-green-100 text-green-600">
              +0.05
            </span>
          </div>
        </div>

        {/* EUR */}
        <div className="flex flex-col items-center text-center">
          <p className="text-xs text-gray-500">EUR</p>
          <div className="flex items-center gap-2">
            <span className="text-xl font-bold text-gray-800">93.01</span>
            <span className="text-xs px-2 py-0.5 rounded bg-red-100 text-red-500">
              -0.12
            </span>
          </div>
        </div>

        {/* Ставка НБУ */}
        <div className="flex flex-col items-center text-center md:items-end md:text-right">
          <p className="text-xs text-gray-500">{t("nbuRate")}</p>
          <p className="text-lg font-bold text-[#1A4D8F]">20%</p>
          <p className="text-[11px] text-gray-500">с 09.06.25</p>
        </div>
      </div>
    </section>
  );
};
