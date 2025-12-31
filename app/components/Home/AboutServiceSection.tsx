/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import { BlueButton } from "@/app/ui/Buttons/BlueButton";
import { getTranslations, getMessages } from "next-intl/server";

const AboutServiceSection = async ({ lang }: { lang: string }) => {
  // t — для простых строк, messages — для массивов/объектов
  const t = await getTranslations({ locale: lang, namespace: "AboutService" });
  const messages = await getMessages({ locale: lang });
  const about = messages.AboutService as any;

  const features = about.features || [];
  const whyList = about.whyList || {};

  return (
    <section className="py-16 ">
      <div className="max-w-7xl mx-auto ">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4 relative inline-block">
            {t("title")}
            <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-36 h-1 bg-gradient-to-r from-blue-500 to-yellow-400 rounded-full"></div>
          </h2>
          <p className="text-gray-600 text-lg max-w-3xl mx-auto">
            {t("subtitle")}
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 mb-16">
          {features.map((feature: any, index: number) => (
            <div
              key={feature.id ?? index}
              className="group"
              style={{ animationDelay: `${index * 0.2}s` }}
            >
              <div className="bg-gradient-to-br from-gray-50 to-white rounded-3xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 border-2 border-transparent hover:border-blue-500 h-full">
                <div
                  className={`w-16 h-16 ${feature.color} rounded-2xl flex items-center justify-center text-2xl text-white mb-6 group-hover:scale-110 transition-transform duration-300`}
                >
                  {feature.icon}
                </div>
                <h3 className="text-2xl font-bold text-gray-800 mb-4">
                  {feature.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {feature.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        <div className=" rounded-3xl p-8 md:p-12 shadow-lg">
          <div className="max-w-4xl mx-auto text-center">
            <h3 className="text-3xl font-bold text-gray-800 mb-6">
              {t("whyTitle")}
            </h3>
            <div className="grid md:grid-cols-2 gap-8 text-left">
              {Object.values(whyList).map((item: any, i: number) => (
                <div key={i} className="flex items-start gap-4">
                  <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center text-white font-bold text-sm flex-shrink-0">
                    ✓
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-800 mb-2">
                      {item.title}
                    </h4>
                    <p className="text-gray-600 text-sm">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-8">
              <BlueButton link="/about" text={t("cta")} />
            </div>
          </div>
        </div>

        <div className="mt-16 bg-white rounded-3xl p-8 md:p-12 shadow-lg border border-gray-100">
          <div className="max-w-4xl mx-auto">
            <h3 className="text-2xl font-bold text-gray-800 mb-6 text-center">
              {t("seoTitle")}
            </h3>
            <div className="prose prose-lg max-w-none text-gray-600 leading-relaxed">
              <p className="mb-4">{t("seoIntro")}</p>

              <div className="bg-gradient-to-r from-blue-50 to-yellow-50 rounded-xl p-6 my-8">
                <h4 className="font-semibold text-gray-800 mb-3">{t("seoTipTitle")}</h4>
                <p className="text-sm text-gray-700">{t("seoTipText")}</p>
              </div>

              <div className="grid md:grid-cols-2 gap-6 mt-8">
                <div>
                  <h4 className="font-semibold text-gray-800 mb-3">{t("seoBankingTitle")}</h4>
                  <p className="text-sm text-gray-600">{t("seoBankingText")}</p>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-800 mb-3">{t("seoMicroTitle")}</h4>
                  <p className="text-sm text-gray-600">{t("seoMicroText")}</p>
                </div>
              </div>

              <div className="mt-8 text-sm text-gray-600 leading-relaxed">
                <p>{t("seoOutro")}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutServiceSection;
