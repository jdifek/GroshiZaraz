import { BlueButton } from "@/app/ui/Buttons/BlueButton";
import Link from "next/link";
import React from "react";
import { notFound } from "next/navigation";
import NewsService from "@/app/services/news/newsService";
import { News } from "@/app/services/news/newsTypes";

interface ArticleDetailPageProps {
  params: Promise<{ slug: string }>;
}

// Функция для получения похожих статей (можно добавить в NewsService)
async function getRelatedArticles(): Promise<News[]> {
  try {
    const allNews = await NewsService.getAllNews();
    // Берем первые 3 статьи как похожие (можно улучшить логику)
    return allNews.slice(0, 3);
  } catch (error) {
    console.error("Error fetching related articles:", error);
    return [];
  }
}

const ArticleDetailPage = async ({ params }: ArticleDetailPageProps) => {
  let article: News;
  const resolvedParams = await params;

  try {
    article = await NewsService.getNewsBySlug(resolvedParams.slug);
  } catch (error) {
    console.error("Error fetching article:", error);
    notFound();
  }

  const relatedArticles = await getRelatedArticles();

  const formatViews = (views: number) => {
    if (views >= 1000) {
      return `${(views / 1000).toFixed(1)}K`;
    }
    return views.toString();
  };

  // Функция для создания градиента на основе ID статьи
  const getArticleColor = (id: number) => {
    const colors = [
      "bg-gradient-to-br from-blue-500 to-blue-600",
      "bg-gradient-to-br from-purple-500 to-purple-600",
      "bg-gradient-to-br from-green-500 to-green-600",
      "bg-gradient-to-br from-red-500 to-red-600",
      "bg-gradient-to-br from-yellow-400 to-yellow-500",
      "bg-gradient-to-br from-indigo-500 to-indigo-600",
    ];
    return colors[id % colors.length];
  };

  // Функция для создания эмодзи на основе категории
  const getCategoryEmoji = (categoryName?: string) => {
    const emojiMap: { [key: string]: string } = {
      Новости: "📰",
      Пособия: "📋",
      Аналитика: "📊",
      "Дебетовые карты": "💳",
      Кредиты: "💰",
      Банки: "🏦",
    };
    return emojiMap[categoryName || ""] || "📄";
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("ru-RU", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });
  };

  return (
    <div className="min-h-screen">
      {/* Breadcrumbs */}
      <div className="border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center text-xs sm:text-sm text-gray-600 py-4 overflow-x-auto">
            <Link
              href="/"
              className="hover:text-blue-600 transition-colors whitespace-nowrap"
            >
              Главная
            </Link>
            <span className="mx-1 sm:mx-2 flex-shrink-0">-</span>
            <Link
              href="/journal"
              className="hover:text-blue-600 transition-colors whitespace-nowrap"
            >
              Журнал Фіногляд
            </Link>
            <span className="mx-1 sm:mx-2 flex-shrink-0">-</span>
            <span className="truncate">
              {article.NewsCategory?.name || "Статья"}
            </span>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto">
        {/* Article Header */}
        <article className="bg-white rounded-xl md:rounded-2xl shadow-md overflow-hidden border border-gray-100 my-4 md:my-8">
          {/* Hero Image */}
          <div
            className={`${getArticleColor(
              article.id
            )} h-64 sm:h-80 md:h-96 lg:h-[500px] flex items-center justify-center text-6xl sm:text-7xl md:text-8xl lg:text-9xl text-white relative overflow-hidden`}
          >
            <div className="text-center transform hover:scale-110 transition-transform duration-300">
              {getCategoryEmoji(article.NewsCategory?.name)}
            </div>

            {/* Category Badge */}
            <div className="absolute top-3 sm:top-4 md:top-6 left-3 sm:left-4 md:left-6">
              <span className="bg-white text-gray-800 px-2 sm:px-3 md:px-4 py-1 md:py-2 rounded-full text-xs sm:text-sm font-bold shadow-lg">
                {article.NewsCategory?.name || "Статья"}
              </span>
            </div>

            {/* Date */}
            <div className="absolute top-3 sm:top-4 md:top-6 right-3 sm:right-4 md:right-6">
              <span className="bg-white/20 backdrop-blur-sm px-2 sm:px-3 md:px-4 py-1 md:py-2 rounded-full text-xs sm:text-sm font-medium text-white border border-white/20">
                {formatDate(article.createdAt)}
              </span>
            </div>

            {/* Article Info Overlay */}
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 via-black/30 to-transparent p-4 sm:p-6 md:p-8">
              <div className="max-w-4xl mx-auto">
                <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-5xl font-bold mb-3 sm:mb-4 md:mb-6 leading-tight !text-white drop-shadow-lg">
                  {article.title}
                </h1>
                <div className="flex flex-wrap items-center gap-2 sm:gap-3 md:gap-6 text-white/90">
                  <span className="flex items-center gap-1 sm:gap-2 bg-white/10 backdrop-blur-sm px-2 sm:px-3 py-1 sm:py-2 rounded-full text-xs sm:text-sm">
                    👤{" "}
                    <span className="hidden sm:inline">
                      {article.author?.name || "Автор"}
                    </span>
                    <span className="sm:hidden">
                      {article.author?.name?.split(" ")[0] || "Автор"}
                    </span>
                  </span>
                  <span className="flex items-center gap-1 sm:gap-2 bg-white/10 backdrop-blur-sm px-2 sm:px-3 py-1 sm:py-2 rounded-full text-xs sm:text-sm">
                    👁️ {formatViews(article.views)}{" "}
                    <span className="hidden sm:inline">просмотров</span>
                  </span>
                  <span className="flex items-center gap-1 sm:gap-2 bg-white/10 backdrop-blur-sm px-2 sm:px-3 py-1 sm:py-2 rounded-full text-xs sm:text-sm">
                    ⏱️{" "}
                    <span className="hidden sm:inline">
                      {article.readingMinutes || 5} мин чтения
                    </span>
                    <span className="sm:hidden">
                      {article.readingMinutes || 5} мин
                    </span>
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Article Content */}
          <div className="p-4 sm:p-6 md:p-8 lg:p-12">
            <div className="prose prose-sm sm:prose-base md:prose-lg max-w-none">
              <div
                className="text-gray-700 leading-relaxed [&>h1]:text-2xl [&>h1]:sm:text-3xl [&>h1]:md:text-4xl [&>h1]:font-bold [&>h1]:text-gray-800 [&>h1]:mt-8 [&>h1]:mb-6 [&>h2]:text-xl [&>h2]:sm:text-2xl [&>h2]:md:text-3xl [&>h2]:font-bold [&>h2]:text-gray-800 [&>h2]:mt-6 [&>h2]:mb-4 [&>h3]:text-lg [&>h3]:sm:text-xl [&>h3]:md:text-2xl [&>h3]:font-bold [&>h3]:text-gray-800 [&>h3]:mt-6 [&>h3]:mb-4 [&>p]:mb-4 [&>p]:text-sm [&>p]:sm:text-base [&>ul]:mb-4 [&>li]:text-sm [&>li]:sm:text-base [&>li]:mb-2 [&>ol]:mb-4"
                dangerouslySetInnerHTML={{ __html: article.body }}
              />
            </div>

            {/* Social Share */}
            <div className="mt-8 md:mt-12 pt-6 md:pt-8 border-t border-gray-100">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 md:gap-4">
                <div className="text-xs sm:text-sm text-gray-500 font-medium">
                  Поделиться статьей:
                </div>
                <div className="flex items-center gap-2 md:gap-3">
                  <button className="w-10 h-10 md:w-12 md:h-12 bg-blue-500 text-white rounded-full flex items-center justify-center hover:bg-blue-600 transition-all duration-200 hover:scale-110 shadow-lg text-sm md:text-base">
                    📘
                  </button>
                  <button className="w-10 h-10 md:w-12 md:h-12 bg-blue-400 text-white rounded-full flex items-center justify-center hover:bg-blue-500 transition-all duration-200 hover:scale-110 shadow-lg text-sm md:text-base">
                    🐦
                  </button>
                  <button className="w-10 h-10 md:w-12 md:h-12 bg-green-500 text-white rounded-full flex items-center justify-center hover:bg-green-600 transition-all duration-200 hover:scale-110 shadow-lg text-sm md:text-base">
                    💬
                  </button>
                  <button className="w-10 h-10 md:w-12 md:h-12 bg-gray-600 text-white rounded-full flex items-center justify-center hover:bg-gray-700 transition-all duration-200 hover:scale-110 shadow-lg text-sm md:text-base">
                    🔗
                  </button>
                </div>
              </div>
            </div>
          </div>
        </article>

        <div className="flex flex-col lg:flex-row gap-4 md:gap-8 mb-6 md:mb-8">
          {/* Author Info */}
          <div className="flex-1 bg-white rounded-xl md:rounded-2xl shadow-md p-4 sm:p-6 md:p-8 border border-gray-100 hover:shadow-lg transition-shadow">
            <div className="flex items-start gap-3 sm:gap-4 md:gap-6">
              <div className="w-12 h-12 sm:w-16 sm:h-16 md:w-20 md:h-20 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white text-lg sm:text-2xl md:text-3xl font-bold shadow-lg flex-shrink-0">
                {article.author?.name?.charAt(0) || "А"}
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-gray-800 mb-2 md:mb-3">
                  {article.author?.name || "Автор"}
                </h3>
                <p className="text-gray-600 mb-3 md:mb-4 leading-relaxed text-sm sm:text-base">
                  {article.author?.bio ||
                    "Опытный автор, специализирующийся на финансовой тематике."}
                </p>
                <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-6">
                  <div className="bg-blue-50 px-3 md:px-4 py-1.5 md:py-2 rounded-full">
                    <span className="text-xs sm:text-sm font-medium text-blue-600">
                      {article.author?.position}
                    </span>
                  </div>
                  <div className="bg-green-50 px-3 md:px-4 py-1.5 md:py-2 rounded-full">
                    <span className="text-xs sm:text-sm font-medium text-green-600">
                      Просмотров: {formatViews(article.views)}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="lg:w-80 bg-white rounded-xl md:rounded-2xl shadow-md p-4 sm:p-6 md:p-8 border border-gray-100">
            <h3 className="text-lg md:text-xl font-bold text-gray-800 mb-4 md:mb-6 relative inline-block">
              Действия
              <div className="absolute -bottom-1 md:-bottom-2 left-0 w-8 md:w-12 h-0.5 md:h-1 bg-gradient-to-r from-blue-500 to-yellow-400 rounded-full"></div>
            </h3>
            <div className="space-y-3 md:space-y-4">
              <button className="w-full bg-gradient-to-r from-blue-500 to-blue-600 text-white py-2.5 md:py-3 px-4 rounded-lg md:rounded-xl text-sm md:text-base font-medium hover:from-blue-600 hover:to-blue-700 transition-all duration-200 shadow-lg hover:shadow-xl">
                💾 Сохранить статью
              </button>
              <button className="w-full bg-gradient-to-r from-green-500 to-green-600 text-white py-2.5 md:py-3 px-4 rounded-lg md:rounded-xl text-sm md:text-base font-medium hover:from-green-600 hover:to-green-700 transition-all duration-200 shadow-lg hover:shadow-xl">
                📧 Подписаться на автора
              </button>
              <button className="w-full bg-gradient-to-r from-purple-500 to-purple-600 text-white py-2.5 md:py-3 px-4 rounded-lg md:rounded-xl text-sm md:text-base font-medium hover:from-purple-600 hover:to-purple-700 transition-all duration-200 shadow-lg hover:shadow-xl">
                🔔 Уведомления
              </button>
            </div>
          </div>
        </div>

        {/* Related Articles */}
        {relatedArticles.length > 0 && (
          <div className="bg-white rounded-xl md:rounded-2xl shadow-md p-4 sm:p-6 md:p-8 border border-gray-100 mb-6 md:mb-8">
            <div className="mb-6 md:mb-8">
              <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-2 md:mb-4 relative inline-block">
                Похожие статьи
                <div className="absolute -bottom-1 md:-bottom-2 left-0 w-12 md:w-16 h-0.5 md:h-1 bg-gradient-to-r from-blue-500 to-yellow-400 rounded-full"></div>
              </h2>
              <p className="text-gray-600 text-sm sm:text-base md:text-lg">
                Другие материалы, которые могут вас заинтересовать
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 mb-6 md:mb-8">
              {relatedArticles.map((relatedArticle) => (
                <Link
                  key={relatedArticle.id}
                  href={`/journal/article/${relatedArticle.slug}`}
                >
                  <article className="group cursor-pointer bg-white rounded-xl md:rounded-2xl shadow-md hover:shadow-lg transition-all duration-300 overflow-hidden border border-gray-100 hover:border-blue-200">
                    <div className="relative">
                      <div
                        className={`${getArticleColor(
                          relatedArticle.id
                        )} h-32 sm:h-40 md:h-48 flex items-center justify-center text-4xl sm:text-5xl md:text-6xl text-white relative overflow-hidden`}
                      >
                        <div className="transform group-hover:scale-110 transition-transform duration-300">
                          {getCategoryEmoji(relatedArticle.NewsCategory?.name)}
                        </div>
                        <div className="absolute top-2 sm:top-3 md:top-4 left-2 sm:left-3 md:left-4">
                          <span className="bg-white text-gray-800 px-2 md:px-3 py-0.5 md:py-1 rounded-full text-xs md:text-sm font-bold shadow-lg">
                            {relatedArticle.NewsCategory?.name || "Статья"}
                          </span>
                        </div>
                        <div className="absolute top-2 sm:top-3 md:top-4 right-2 sm:right-3 md:right-4 text-white/80 text-xs md:text-sm bg-white/20 backdrop-blur-sm px-2 md:px-3 py-0.5 md:py-1 rounded-full">
                          {formatDate(relatedArticle.createdAt)}
                        </div>
                      </div>
                    </div>

                    <div className="p-4 md:p-6">
                      <h3 className="text-base md:text-xl font-bold text-gray-800 mb-2 md:mb-3 line-clamp-2 group-hover:text-blue-600 transition-colors">
                        {relatedArticle.title}
                      </h3>
                      <p className="text-gray-600 mb-3 md:mb-4 text-xs md:text-sm leading-relaxed line-clamp-3">
                        {relatedArticle.body
                          .replace(/<[^>]*>/g, "")
                          .substring(0, 120)}
                        ...
                      </p>

                      <div className="flex items-center justify-between">
                        <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-4 text-xs md:text-sm text-gray-500 min-w-0 flex-1">
                          <span className="flex items-center gap-1 whitespace-nowrap">
                            👁️ {formatViews(relatedArticle.views)}
                          </span>
                          <span className="truncate">
                            {relatedArticle.author?.name || "Автор"}
                          </span>
                        </div>
                        <div className="w-6 h-6 md:w-8 md:h-8 bg-gray-100 rounded-full flex items-center justify-center group-hover:bg-blue-500 group-hover:text-white transition-all flex-shrink-0 ml-2">
                          →
                        </div>
                      </div>
                    </div>
                  </article>
                </Link>
              ))}
            </div>

            {/* Back to Journal Button */}
            <div className="text-center pt-6 md:pt-8 border-t border-gray-100">
              <Link href="/journal">
                <BlueButton text="Вернуться к журналу" />
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ArticleDetailPage;
