"use client";
import CategoryService from "@/app/services/categories/categoriesService";
import { Category } from "@/app/services/categories/categoriesTypes";
import NewsService from "@/app/services/news/newsService";
import { News } from "@/app/services/news/newsTypes";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState, useEffect } from "react";

type CategoryPageProps = {
  params: Promise<{ slug: string }>;
};

const CategoryPage: React.FC<CategoryPageProps> = ({ params }) => {
  const router = useRouter();
  const [categoriesFromApi, setCategoriesFromApi] = useState<Category[]>([]);

  const [categorySlug, setCategorySlug] = useState<string | null>(null);
  const [articles, setArticles] = useState<News[]>([]);

  // Асинхронно разрешаем params и загружаем данные

  try {
    console.log("✅ Категории успешно получены:", categoriesFromApi);
  } catch (error) {
    console.error("❌ Ошибка при получении категорий:", error);
  }

  useEffect(() => {
    const loadData = async () => {
      try {
        const { slug } = await params;
        const response = await CategoryService.getAllCategories();
        setCategoriesFromApi(response);
        console.log("Category slug from params:", slug);
        setCategorySlug(slug);
        const newsData = await NewsService.getNewsByCategorySlug(slug);
        setArticles(newsData);
      } catch (err) {
        console.error("Error loading news:", err);
      }
    };
    loadData();
  }, [params]);

  const formatViews = (views: number) => {
    if (views >= 1000) {
      return `${(views / 1000).toFixed(1)}K`;
    }
    return views.toString();
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("ru-RU", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });
  };

  const getArticleColor = (index: number) => {
    const colors = [
      "bg-gradient-to-br from-blue-500 to-blue-600",
      "bg-gradient-to-br from-purple-500 to-purple-600",
      "bg-gradient-to-br from-green-500 to-green-600",
      "bg-gradient-to-br from-yellow-400 to-yellow-500",
      "bg-gradient-to-br from-teal-500 to-teal-600",
      "bg-gradient-to-br from-orange-500 to-orange-600",
      "bg-gradient-to-br from-red-500 to-red-600",
      "bg-gradient-to-br from-indigo-500 to-indigo-600",
      "bg-gradient-to-br from-cyan-500 to-cyan-600",
    ];
    return colors[index % colors.length];
  };

  const getArticleEmoji = (categoryName: string) => {
    const emojiMap: { [key: string]: string } = {
      Новости: "🏦",
      Пособия: "💳",
      Аналитика: "📈",
      Займы: "💰",
      "Дебетовые карты": "💳",
      Вклады: "🛡️",
      Автокредиты: "🚗",
      Акции: "🎯",
      Пенсия: "👴",
      Бизнес: "💼",
      Видео: "🎥",
    };
    return emojiMap[categoryName] || "📰";
  };

  const categoryName = articles[0]?.NewsCategory?.name || categorySlug;

  return (
    <div className="min-h-screen">
      {/* Header */}
      <div className="">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="flex items-center text-sm text-gray-600 mb-4">
            <span>Главная</span>
            <span className="mx-2">-</span>
            <span>Журнал Фіногляд</span>
            <span className="mx-2">-</span>
            <span>{categoryName}</span>
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900">
            Журнал Фіногляд - {categoryName}
          </h1>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Main Content */}
          <div className="flex-1">
            <div className="mb-8">
              <div className="flex flex-wrap gap-2">
                {categoriesFromApi.map((cat) => (
                  <Link
                    key={cat.slug}
                    href={`/journal/${cat.slug}`}
                    className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                      cat.slug === "all"
                        ? "bg-blue-500 text-white shadow-md"
                        : "bg-white text-gray-600 hover:bg-gray-100 border border-gray-200"
                    }`}
                  >
                    {cat.name}
                  </Link>
                ))}
              </div>
            </div>
            {/* Featured Articles Grid */}
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
              {articles.slice(0, 3).map((article, index) => (
                <article
                  onClick={() =>
                    router.push(`/journal/article/${article.slug}`)
                  }
                  key={article.id}
                  className={`${
                    index === 0 ? "md:col-span-2 lg:col-span-2" : ""
                  } bg-white rounded-2xl shadow-md hover:shadow-lg transition-all duration-300 overflow-hidden group cursor-pointer border border-gray-100 hover:border-blue-200`}
                >
                  <div className="relative">
                    <div
                      className={`${getArticleColor(index)} ${
                        index === 0 ? "h-64" : "h-48"
                      } flex items-center justify-center text-6xl text-white relative overflow-hidden`}
                    >
                      {getArticleEmoji(article.NewsCategory?.name || "")}
                      <div className="absolute top-4 left-4">
                        <span className="bg-white/20 backdrop-blur-sm px-3 py-1 rounded-full text-sm font-medium text-white">
                          {article.NewsCategory?.name}
                        </span>
                      </div>
                      <div className="absolute top-4 right-4 text-white/80 text-sm">
                        {formatDate(article.createdAt)}
                      </div>
                    </div>
                  </div>

                  <div className="p-6">
                    <h3
                      className={`${
                        index === 0 ? "text-2xl" : "text-xl"
                      } font-bold text-gray-800 mb-3 line-clamp-2 group-hover:text-blue-600 transition-colors`}
                    >
                      {article.title}
                    </h3>
                    <p className="text-gray-600 mb-4 text-sm leading-relaxed line-clamp-3">
                      {article.body.replace(/<[^>]*>/g, "").substring(0, 150)}
                      ...
                    </p>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4 text-sm text-gray-500">
                        <span className="flex items-center gap-1">
                          👁️ {formatViews(article.views)}
                        </span>
                        <span>{article.author?.name}</span>
                      </div>
                      <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center group-hover:bg-blue-500 group-hover:text-white transition-all">
                        →
                      </div>
                    </div>
                  </div>
                </article>
              ))}
            </div>

            {/* Regular Articles List */}
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {articles.slice(3).map((article, index) => (
                <article
                  onClick={() =>
                    router.push(`/journal/article/${article.slug}`)
                  }
                  key={article.id}
                  className="bg-white rounded-2xl shadow-md hover:shadow-lg transition-all duration-300 overflow-hidden group cursor-pointer border border-gray-100 hover:border-blue-200"
                >
                  <div className="relative">
                    <div
                      className={`${getArticleColor(
                        index + 3
                      )} h-48 flex items-center justify-center text-6xl text-white relative overflow-hidden`}
                    >
                      {getArticleEmoji(article.NewsCategory?.name || "")}
                      <div className="absolute top-4 left-4">
                        <span className="bg-white/20 backdrop-blur-sm px-3 py-1 rounded-full text-sm font-medium text-white">
                          {article.NewsCategory?.name}
                        </span>
                      </div>
                      <div className="absolute top-4 right-4 text-white/80 text-sm">
                        {formatDate(article.createdAt)}
                      </div>
                    </div>
                  </div>

                  <div className="p-6">
                    <h3 className="text-xl font-bold text-gray-800 mb-3 line-clamp-2 group-hover:text-blue-600 transition-colors">
                      {article.title}
                    </h3>
                    <p className="text-gray-600 mb-4 text-sm leading-relaxed line-clamp-3">
                      {article.body.replace(/<[^>]*>/g, "").substring(0, 150)}
                      ...
                    </p>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4 text-sm text-gray-500">
                        <span className="flex items-center gap-1">
                          👁️ {formatViews(article.views)}
                        </span>
                        <span>{article.author?.name}</span>
                      </div>
                      <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center group-hover:bg-blue-500 group-hover:text-white transition-all">
                        →
                      </div>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:w-80">
            <div className="sticky top-8 space-y-6">
              {/* Popular Articles */}
              <div className="bg-white rounded-2xl shadow-md p-6 border border-gray-100">
                <h3 className="text-lg font-bold text-gray-800 mb-4 relative inline-block">
                  Популярные статьи
                  <div className="absolute -bottom-2 left-0 w-12 h-1 bg-gradient-to-r from-blue-500 to-yellow-400 rounded-full"></div>
                </h3>
                <div className="space-y-4">
                  {articles
                    .sort((a, b) => b.views - a.views)
                    .slice(0, 4)
                    .map((article) => (
                      <div
                        key={article.id}
                        onClick={() =>
                          router.push(`/journal/article/${article.slug}`)
                        }
                        className="flex items-start gap-3 p-3 rounded-lg hover:bg-gray-50 cursor-pointer group"
                      >
                        <div className="flex-shrink-0 w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
                        <div className="flex-1">
                          <h4 className="text-sm font-medium text-gray-800 group-hover:text-blue-600 line-clamp-2 transition-colors">
                            {article.title}
                          </h4>
                          <div className="flex items-center gap-2 mt-1 text-xs text-gray-500">
                            <span>{formatDate(article.createdAt)}</span>
                            <span>•</span>
                            <span>{formatViews(article.views)} просмотров</span>
                          </div>
                        </div>
                      </div>
                    ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CategoryPage;
