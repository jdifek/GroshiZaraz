import React from "react";
import { BlueButton } from "@/app/ui/Buttons/BlueButton";

const NewsSection = () => {
  const news = [
    {
      id: 1,
      title: "Новые изменения в МФО Украины в 2025 году",
      excerpt:
        "Обзор основных изменений в законодательстве и регулировании микрофинансовых организаций",
      date: "10.07",
      views: "15.2K",
      comments: 8,
      category: "Законодательство",
      image: "📊",
      color: "bg-gradient-to-br from-blue-500 to-blue-600",
    },
    {
      id: 2,
      title: "Рейтинг надежности банков Украины — июль 2025",
      excerpt:
        "Актуальная информация о финансовой устойчивости и рейтингах банковских учреждений",
      date: "09.07",
      views: "12.8K",
      comments: 15,
      category: "Рейтинги",
      image: "🏆",
      color: "bg-gradient-to-br from-yellow-400 to-yellow-500",
    },
    {
      id: 3,
      title: "Как узнать свой кредитный рейтинг онлайн",
      excerpt:
        "Подробная инструкция по проверке кредитной истории и повышению кредитного рейтинга",
      date: "08.07",
      views: "8.9K",
      comments: 12,
      category: "Руководства",
      image: "📈",
      color: "bg-gradient-to-br from-green-500 to-green-600",
    },
    {
      id: 4,
      title: "Топ-10 лучших займов без процентов в 2025",
      excerpt:
        "Обзор самых выгодных предложений от МФО с возможностью получения займа под 0%",
      date: "07.07",
      views: "22.4K",
      comments: 28,
      category: "Займы",
      image: "💰",
      color: "bg-gradient-to-br from-purple-500 to-purple-600",
    },
    {
      id: 5,
      title: "Новые банковские карты с кэшбэком",
      excerpt:
        "Сравнение дебетовых карт с максимальным кэшбэком и бонусными программами",
      date: "06.07",
      views: "9.3K",
      comments: 6,
      category: "Карты",
      image: "💳",
      color: "bg-gradient-to-br from-red-500 to-red-600",
    },
    {
      id: 6,
      title: "Страхование вкладов в банках Украины",
      excerpt:
        "Все что нужно знать о страховании депозитов и защите ваших средств",
      date: "05.07",
      views: "11.7K",
      comments: 9,
      category: "Вклады",
      image: "🛡️",
      color: "bg-gradient-to-br from-teal-500 to-teal-600",
    },
  ];

  return (
    <section className="py-16">
      <div className="max-w-7xl mx-auto ">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4 relative inline-block">
            Финансовые новости
            <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-20 h-1 bg-gradient-to-r from-blue-500 to-yellow-400 rounded-full"></div>
          </h2>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Актуальная информация о финансовом рынке Украины
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {news.map((article, index) => (
            <article
              key={article.id}
              className="bg-white rounded-3xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden group cursor-pointer border-2 border-transparent hover:border-blue-500"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="relative">
                <div
                  className={`${article.color} h-48 flex items-center justify-center text-6xl text-white relative overflow-hidden`}
                >
                  {article.image}
                  <div className="absolute top-4 left-4">
                    <span className="bg-white/20 backdrop-blur-sm px-3 py-1 rounded-full text-sm font-medium text-white">
                      {article.category}
                    </span>
                  </div>
                  <div className="absolute top-4 right-4 text-white/80 text-sm">
                    {article.date}
                  </div>
                </div>
              </div>

              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-800 mb-3 line-clamp-2 group-hover:text-blue-600 transition-colors">
                  {article.title}
                </h3>
                <p className="text-gray-600 mb-4 text-sm leading-relaxed line-clamp-3">
                  {article.excerpt}
                </p>

                <div className="flex items-center justify-between text-sm text-gray-500">
                  <div className="flex items-center gap-4">
                    <span className="flex items-center gap-1">
                      👁️ {article.views}
                    </span>
                    <span className="flex items-center gap-1">
                      💬 {article.comments}
                    </span>
                  </div>
                  <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center group-hover:bg-blue-500 group-hover:text-white transition-all">
                    →
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>

        <div className="text-center mt-12">
          <BlueButton text="Все новости" />
        </div>
      </div>
    </section>
  );
};

export default NewsSection;
