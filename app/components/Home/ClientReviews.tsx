import React from "react";
import ReviewCard from "../Reviews/ReviewCard";
import StatCard from "../Reviews/StatCard";
import { BlueButton } from "@/app/ui/Buttons/BlueButton";
import { getTranslations } from "next-intl/server";

const stats = [
  { key: "clients", value: "98%", color: "text-blue-500" },
  { key: "minutes", value: "15", color: "text-yellow-400" },
  { key: "loans", value: "50K+", color: "text-blue-500" },
  { key: "support", value: "24/7", color: "text-yellow-400" }
];

const ClientReviews = async ({ lang }: { lang: string }) => {
  const t = await getTranslations({ locale: lang, namespace: "ClientReviews" });
  const reviews = t.raw("reviews"); // получаем массив как есть из JSON

  console.log(reviews, 'rewew');
  
  return (
    <div className="min-h-screen py-16">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4 relative inline-block after:absolute after:-bottom-2 after:left-1/2 after:-translate-x-1/2 after:w-20 after:h-1 after:rounded after:bg-gradient-to-r after:from-blue-500 after:to-yellow-400">
            {t("title")}
          </h2>
          <p className="text-gray-600 max-w-xl mx-auto text-base">
            {t("subtitle")}
          </p>
        </div>

        <div className="grid sm:grid-cols-1 md:grid-cols-2 gap-8 mb-8">
          {reviews.map((r, i) => (
            <ReviewCard key={i} review={r} index={i} />
          ))}
        </div>

        <div className="text-center space-x-4">
          <BlueButton link="reviews" text={t("button")} />
        </div>

        <div className="mt-8 bg-white rounded-xl shadow-md px-8 py-6 flex flex-wrap justify-around items-center gap-6 border border-blue-100">
          {stats.map((stat, i) => (
            <StatCard
              key={i}
              stat={{ label: t(`stats.${stat.key}`), value: stat.value, color: stat.color }}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ClientReviews;
