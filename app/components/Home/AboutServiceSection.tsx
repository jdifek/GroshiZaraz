import React from "react";
import { BlueButton } from "@/app/ui/Buttons/BlueButton";

const AboutServiceSection = () => {
  const features = [
    {
      id: 1,
      icon: "🔍",
      title: "GroshiZaraz не банк",
      description:
        "Наш сервис создан для помощи в поиске и сравнении самых выгодных условий по финансовым продуктам среди проверенных организаций.",
      color: "bg-gradient-to-br from-blue-500 to-blue-600",
    },
    {
      id: 2,
      icon: "⚡",
      title: "Независимый сервис",
      description:
        "Мы не принадлежим ни одному банку или МФО, полностью свободны и предоставляем честное мнение для наших пользователей.",
      color: "bg-gradient-to-br from-yellow-400 to-yellow-500",
    },
    {
      id: 3,
      icon: "🎯",
      title: "Без комиссий и платежей",
      description:
        "Мы не берем плату за свои услуги. У нас есть партнерские ссылки с проверенными финансовыми организациями.",
      color: "bg-gradient-to-br from-green-500 to-green-600",
    },
  ];

  return (
    <section className="py-16 ">
      <div className="max-w-7xl mx-auto px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4 relative inline-block">
            GroshiZaraz — помогаем в подборе финансовых услуг
            <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-20 h-1 bg-gradient-to-r from-blue-500 to-yellow-400 rounded-full"></div>
          </h2>
          <p className="text-gray-600 text-lg max-w-3xl mx-auto">
            Мы помогаем найти лучшие финансовые решения, сравнивая предложения
            от ведущих банков и МФО Украины
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 mb-16">
          {features.map((feature, index) => (
            <div
              key={feature.id}
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

        <div className="bg-gradient-to-br from-blue-50 to-white rounded-3xl p-8 md:p-12 shadow-lg">
          <div className="max-w-4xl mx-auto text-center">
            <h3 className="text-3xl font-bold text-gray-800 mb-6">
              Почему выбирают GroshiZaraz?
            </h3>
            <div className="grid md:grid-cols-2 gap-8 text-left">
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center text-white font-bold text-sm flex-shrink-0">
                    ✓
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-800 mb-2">
                      Проверенные партнеры
                    </h4>
                    <p className="text-gray-600 text-sm">
                      Работаем только с лицензированными банками и МФО
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-8 h-8 bg-gradient-to-br from-yellow-400 to-yellow-500 rounded-full flex items-center justify-center text-white font-bold text-sm flex-shrink-0">
                    ✓
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-800 mb-2">
                      Быстрое сравнение
                    </h4>
                    <p className="text-gray-600 text-sm">
                      Сравните условия десятков предложений за несколько минут
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-8 h-8 bg-gradient-to-br from-green-500 to-green-600 rounded-full flex items-center justify-center text-white font-bold text-sm flex-shrink-0">
                    ✓
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-800 mb-2">
                      Актуальная информация
                    </h4>
                    <p className="text-gray-600 text-sm">
                      Обновляем данные о процентных ставках и условиях ежедневно
                    </p>
                  </div>
                </div>
              </div>
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-purple-600 rounded-full flex items-center justify-center text-white font-bold text-sm flex-shrink-0">
                    ✓
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-800 mb-2">
                      Экспертные обзоры
                    </h4>
                    <p className="text-gray-600 text-sm">
                      Детальные обзоры и рейтинги от наших финансовых экспертов
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-8 h-8 bg-gradient-to-br from-red-500 to-red-600 rounded-full flex items-center justify-center text-white font-bold text-sm flex-shrink-0">
                    ✓
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-800 mb-2">
                      Поддержка 24/7
                    </h4>
                    <p className="text-gray-600 text-sm">
                      Наши консультанты готовы помочь вам в любое время
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-8 h-8 bg-gradient-to-br from-teal-500 to-teal-600 rounded-full flex items-center justify-center text-white font-bold text-sm flex-shrink-0">
                    ✓
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-800 mb-2">
                      Безопасность данных
                    </h4>
                    <p className="text-gray-600 text-sm">
                      Защищаем вашу личную информацию современными технологиями
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="mt-8">
              <BlueButton text="Узнать больше" />
            </div>
          </div>
        </div>

        <div className="mt-16 bg-white rounded-3xl p-8 md:p-12 shadow-lg border border-gray-100">
          <div className="max-w-4xl mx-auto">
            <h3 className="text-2xl font-bold text-gray-800 mb-6 text-center">
              Финансовые услуги в Украине — полное руководство
            </h3>
            <div className="prose prose-lg max-w-none text-gray-600 leading-relaxed">
              {/* Здесь будет ваш SEO текст */}
              <p className="mb-4">
                Современный финансовый рынок Украины предлагает широкий спектр
                услуг для частных лиц и бизнеса. От традиционных банковских
                кредитов до инновационных финтех-решений — выбор огромен, но
                найти оптимальное предложение становится все сложнее.
              </p>

              <div className="bg-gradient-to-r from-blue-50 to-yellow-50 rounded-xl p-6 my-8">
                <h4 className="font-semibold text-gray-800 mb-3">
                  💡 Полезно знать:
                </h4>
                <p className="text-sm text-gray-700">
                  GroshiZaraz анализирует более 50 финансовых организаций и
                  обновляет данные ежедневно, чтобы предоставить вам самую
                  актуальную информацию о процентных ставках и условиях.
                </p>
              </div>

              {/* Здесь можно добавить остальной SEO контент */}
              <div className="grid md:grid-cols-2 gap-6 mt-8">
                <div>
                  <h4 className="font-semibold text-gray-800 mb-3">
                    🏦 Банковские услуги
                  </h4>
                  <p className="text-sm text-gray-600">
                    Сравнение кредитов, депозитов, карт и других банковских
                    продуктов от ведущих банков Украины.
                  </p>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-800 mb-3">
                    ⚡ Микрофинансирование
                  </h4>
                  <p className="text-sm text-gray-600">
                    Быстрые займы от проверенных МФО с прозрачными условиями и
                    честными процентными ставками.
                  </p>
                </div>
              </div>

              {/* Вставьте сюда ваш основной SEO текст */}
              <div className="mt-8 text-sm text-gray-600 leading-relaxed">
                <p>
                  <strong>SEO контент.</strong> Здесь может быть подробная
                  информация о финансовых услугах, советы по выбору кредитов,
                  объяснение процентных ставок, сравнение банков и МФО, и любая
                  другая полезная информация для ваших пользователей.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutServiceSection;
