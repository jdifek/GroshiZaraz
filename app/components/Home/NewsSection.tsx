import React from "react";
import { BlueButton } from "@/app/ui/Buttons/BlueButton";
import { Link } from "@/app/i18n/navigation";

import { getTranslations } from "next-intl/server";
import NewsService from "@/app/services/news/newsService";
import { formatDate } from "@/app/utils/formatDate";
import Image from "next/image";
import { stripHtml } from "@/app/utils/stripHtml";

async function getNews(lang: string) {
  try {
    const allNews = await NewsService.getAllNews(6);
    console.log(allNews, allNews);
    
    const toCard = allNews.map((newsItem) => {
      return {
        id: newsItem.id,
        title: lang === "ru" ? newsItem.title : newsItem.titleUk,
        slug: lang === "ru" ? newsItem.slug : newsItem.slugUk,
        views: newsItem.views,
        excerpt: stripHtml(lang === "ru" ? newsItem.body : newsItem.bodyUk),
        category:
          lang === "ru"
            ? newsItem.NewsCategory?.name
            : newsItem.NewsCategory?.nameUk,
        image: newsItem.image || "/default-news.jpg", // используем изображение новости или дефолтное
        date: formatDate(newsItem.updatedAt, lang),
      };
    });

    return toCard;
  } catch (error) {
    console.error("Error fetching related articles:", error);
    return [];
  }
}

const NewsSection = async ({ lang }: { lang: string }) => {
  const t = await getTranslations({ locale: lang, namespace: "NewsSection" });
  const news = await getNews(lang);

  return (
    <section className="py-16">
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

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {news.map((article, index) => (
            <Link key={article.id} href={"/journal/article/" + article.slug}>
              <article
                className="bg-white rounded-3xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden group cursor-pointer border-2 border-transparent hover:border-blue-500"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="relative">
                  <div className="h-48 relative overflow-hidden">
                    <Image
                      width={500}
                      height={500}
                      src={article.image}
                      alt={article.title}
                      className="w-full h-full object-cover"
                    />
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
                    </div>
                    <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center group-hover:bg-blue-500 group-hover:text-white transition-all">
                      →
                    </div>
                  </div>
                </div>
              </article>
            </Link>
          ))}
        </div>

        <div className="text-center mt-12">
          <BlueButton link="/journal" text={t("allNews")} />
        </div>
      </div>
    </section>
  );
};

export default NewsSection;
