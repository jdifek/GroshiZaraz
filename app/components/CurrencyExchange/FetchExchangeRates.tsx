'use client'
import { refreshCurrencyRates } from "@/app/actions/currencyActions";
import { RefreshCw } from "lucide-react";
import { useTranslations } from "next-intl";
import { useRouter } from "next/navigation";
import React, { useTransition } from "react";

type Props = {
  lang: string;
};

export const FetchExchangeRates: React.FC<Props> = ({ lang }) => {
  const t = useTranslations("CurrencyExchangePage");
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const handleRefresh = async () => {
    startTransition(async () => {
      await refreshCurrencyRates(lang);
      router.refresh();
    });
  };

  return (
    <button
      onClick={handleRefresh}
      disabled={isPending}
      className="flex cursor-pointer items-center gap-2 bg-gradient-to-br from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white px-4 py-2 rounded-xl transition-all duration-300 shadow-md hover:shadow-lg transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
    >
      <RefreshCw className={`w-4 h-4 ${isPending ? 'animate-spin' : ''}`} />
      <span className="text-sm font-medium">{t("mainCurrencies.refresh")}</span>
    </button>
  );
};