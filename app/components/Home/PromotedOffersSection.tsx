import React from "react";
import { BlueButton } from "@/app/ui/Buttons/BlueButton";
import { getTranslations } from "next-intl/server";

const PromotedOffersSection = async ({ lang }: { lang: string }) => {
  const t = await getTranslations({ locale: lang, namespace: "PromotedOffersSection" });

  const promotedOffers = [
    {
      id: 1,
      type: t("offers.types.promotion"),
      title: "Выиграй 100 000 грн на мечту с Фіногляд",
      description:
        "Подай заявку на любой займ через наш сервис и участвуй в розыгрыше главного приза",
      buttonText: t("offers.buttons.participate"),
      image: "🎁",
      color: "bg-gradient-to-br from-purple-500 to-purple-600",
      badge: t("offers.badges.hot"),
    },
    {
      id: 2,
      type: t("offers.types.loan"),
      title: "Займы под 0% для новых клиентов",
      description:
        "Первый займ до 15 000 грн без процентов на срок до 30 дней от проверенных МФО",
      buttonText: t("offers.buttons.getLoan"),
      image: "💰",
      color: "bg-gradient-to-br from-yellow-400 to-yellow-500",
      badge: t("offers.badges.zeroPercent"),
    },
    {
      id: 3,
      type: t("offers.types.card"),
      title: "Кэшбэк карта с доходностью до 15%",
      description:
        "Получайте кэшбэк за каждую покупку и зарабатывайте на остатке средств на карте",
      buttonText: t("offers.buttons.getCard"),
      image: "💳",
      color: "bg-gradient-to-br from-blue-500 to-blue-600",
      badge: t("offers.badges.cashback"),
    },
    {
      id: 4,
      type: t("offers.types.deposit"),
      title: "Депозит под 18% годовых",
      description:
        "Надежное размещение средств в топовых банках Украины с гарантированной доходностью",
      buttonText: t("offers.buttons.openDeposit"),
      image: "🏦",
      color: "bg-gradient-to-br from-green-500 to-green-600",
      badge: t("offers.badges.highRate"),
    },
  ];

  return (
    <section className="py-16 ">
      <div className="max-w-7xl mx-auto ">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4 relative inline-block">
            {t("title")}
            <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-20 h-1 bg-gradient-to-r from-blue-500 to-yellow-400 rounded-full"></div>
          </h2>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            {t("subtitle")}
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {promotedOffers.map((offer, index) => (
            <div
              key={offer.id}
              className="group cursor-pointer transform  transition-all duration-300"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="bg-white rounded-3xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden border-2 border-transparent hover:border-blue-500 h-full">
                <div className="relative">
                  <div
                    className={`${offer.color} h-32 flex items-center justify-center text-3xl md:text-4xl text-white relative overflow-hidden`}
                  >
                    {offer.image}
                    <div className="absolute top-4 left-4">
                      <span className="bg-white/20 backdrop-blur-sm px-3 py-1 rounded-full text-sm font-medium text-white">
                        {offer.type}
                      </span>
                    </div>
                    <div className="absolute top-4 right-4">
                      <span className="bg-white text-gray-800 px-3 py-1 rounded-full text-xs font-semibold">
                        {offer.badge}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="p-8">
                  <h3 className="text-2xl font-bold text-gray-800 mb-4 group-hover:text-blue-600 transition-colors">
                    {offer.title}
                  </h3>
                  <p className="text-gray-600 mb-6 leading-relaxed">
                    {offer.description}
                  </p>
                  <BlueButton text={offer.buttonText} />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Additional CTA Section */}
        <div className="mt-16 bg-gradient-to-br from-gray-800 to-gray-900 rounded-3xl p-8 md:p-12 text-white relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 to-yellow-400 animate-pulse"></div>
          <div className="relative z-10 text-center">
            <h3 className="text-3xl font-bold mb-4">{t("cta.title")}</h3>
            <p className="text-gray-300 mb-8 max-w-2xl mx-auto">
              {t("cta.description")}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-white text-gray-800 px-8 py-3 rounded-2xl font-semibold hover:bg-gray-100 transition-colors">
                {t("cta.buttons.consult")}
              </button>
              <button className="border-2 border-white text-white px-8 py-3 rounded-2xl font-semibold hover:bg-white hover:text-gray-800 transition-colors">
                {t("cta.buttons.compare")}
              </button>
            </div>
          </div>
          <div className="absolute -right-8 -bottom-8 text-8xl opacity-10">
            💡
          </div>
        </div>
      </div>
    </section>
  );
};

export default PromotedOffersSection;
