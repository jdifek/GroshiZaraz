/* eslint-disable @typescript-eslint/no-unused-vars */
import CategoryService from "@/app/services/categories/categoriesService";
import NewsService from "@/app/services/news/newsService";
import { formatDate } from "@/app/utils/formatDate";
import { formatViews } from "@/app/utils/formatViews";
import { stripHtml } from "@/app/utils/stripHtml";
import { getTranslations } from "next-intl/server";
import Image from "next/image";
import { Link } from "@/app/i18n/navigation";

type CategoryPageProps = {
  params: Promise<{ slug: string; lang: string }>;
};

async function getCategoryData(slug: string) {
  try {
    const [categories, articles] = await Promise.all([
      CategoryService.getAllCategories(),
      NewsService.getNewsByCategorySlug(slug),
    ]);

    return { categories, articles };
  } catch (error) {
    console.error("Error loading category data:", error);
    return { categories: [], articles: [] };
  }
}

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

const CategoryPage: React.FC<CategoryPageProps> = async ({ params }) => {
  const { slug, lang } = await params;
  const t = await getTranslations({ locale: lang, namespace: "CategoryPage" });

  const { categories, articles } = await getCategoryData(slug);
  const categoryName =
    lang === "ru"
      ? articles[0]?.NewsCategory?.name
      : articles[0]?.NewsCategory?.nameUk || slug;

  // Популярные статьи для сайдбара
  const popularArticles = [...articles]
    .sort((a, b) => b.views - a.views)
    .slice(0, 4);

  return (
    <div className="min-h-screen">
      {/* Header - SSR */}
      <div className="">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="flex items-center text-sm text-gray-600 mb-4">
            <span>{t("home")}</span>
            <span className="mx-2">-</span>
            <span>{t("journal")}</span>
            <span className="mx-2">-</span>
            <span>{categoryName}</span>
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900">
            {t("journal")} - {categoryName}
          </h1>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Main Content */}
          <div className="flex-1">
            {/* Категории - SSR */}
            <div className="mb-8">
              <div className="flex flex-wrap gap-2">
                {categories.map((cat) => (
                  <Link
                    key={cat.slug}
                    href={`/journal/${cat.slug}`}
                    className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                      cat.slug === slug
                        ? "bg-blue-500 text-white shadow-md"
                        : "bg-white text-gray-600 hover:bg-gray-100 border border-gray-200"
                    }`}
                  >
                    {cat.name || t("categoryDefault")}
                  </Link>
                ))}
              </div>
            </div>

            {/* Featured Articles Grid - SSR */}
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
              {articles.slice(0, 3).map((article, index) => (
                <article
                  key={article.id}
                  className={`${
                    index === 0 ? "md:col-span-2 lg:col-span-2" : ""
                  } bg-white rounded-2xl shadow-md hover:shadow-lg transition-all duration-300 overflow-hidden group border border-gray-100 hover:border-blue-200`}
                >
                  <Link
                    href={`/journal/article/${
                      lang === "ru" ? article.slug : article.slugUk
                    }`}
                  >
                    <div className="relative">
                      <div
                        className={`${getArticleColor(index)} ${
                          index === 0 ? "h-64" : "h-48"
                        } relative overflow-hidden`}
                      >
                        <Image
                          src={article.image || "/placeholder-news.svg"}
                          alt={lang === "ru" ? article.title : article.titleUk}
                          fill
                          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 800px"
                          className="object-cover"
                          priority={index === 0}
                        />

                        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-black/20"></div>

                        <div className="absolute top-4 left-4 z-10">
                          <span className="bg-white/20 backdrop-blur-sm px-3 py-1 rounded-full text-sm font-medium text-white shadow-lg">
                            {lang === "ru"
                              ? article.NewsCategory?.name
                              : article.NewsCategory?.nameUk ||
                                t("categoryDefault")}{" "}
                          </span>
                        </div>
                        <div className="absolute top-4 right-4 text-white text-sm z-10 bg-black/20 backdrop-blur-sm px-3 py-1 rounded-full shadow-lg">
                          {formatDate(article.createdAt, lang)}
                        </div>
                      </div>
                    </div>

                    <div className="p-6">
                      <h3
                        className={`${
                          index === 0 ? "text-2xl" : "text-xl"
                        } font-bold text-gray-800 mb-3 line-clamp-2 group-hover:text-blue-600 transition-colors`}
                      >
                        {lang === "ru" ? article.title : article.titleUk}
                      </h3>
                      <p className="text-gray-600 mb-4 text-sm leading-relaxed line-clamp-3">
                        {stripHtml(
                          lang === "ru" ? article.body : article.bodyUk
                        )}
                      </p>

                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4 text-sm text-gray-500">
                          <span className="flex items-center gap-1">
                            👁️ {formatViews(article.views)}
                          </span>
                          <span>
                            {" "}
                            {lang === "ru"
                              ? article.author?.name
                              : article.author?.nameUk ||
                                t("authorDefault")}{" "}
                          </span>
                        </div>
                        <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center group-hover:bg-blue-500 group-hover:text-white transition-all">
                          →
                        </div>
                      </div>
                    </div>
                  </Link>
                </article>
              ))}
            </div>

            {/* Regular Articles List - SSR */}
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {articles.slice(3).map((article, index) => (
                <article
                  key={article.id}
                  className="bg-white rounded-2xl shadow-md hover:shadow-lg transition-all duration-300 overflow-hidden group border border-gray-100 hover:border-blue-200"
                >
                  <Link
                    href={`/journal/article/${
                      lang === "ru" ? article.slug : article.slugUk
                    }`}
                  >
                    <div className="relative">
                      <div
                        className={`${getArticleColor(
                          index + 3
                        )} h-48 relative overflow-hidden`}
                      >
                        <Image
                          src={article.image || "/placeholder-news.svg"}
                          alt={article.title}
                          fill
                          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 800px"
                          className="object-cover"
                        />

                        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-black/20"></div>

                        <div className="absolute top-4 left-4 z-10">
                          <span className="bg-white/20 backdrop-blur-sm px-3 py-1 rounded-full text-sm font-medium text-white shadow-lg">
                            {lang === "ru"
                              ? article.NewsCategory?.name
                              : article.NewsCategory?.nameUk ||
                                t("categoryDefault")}
                          </span>
                        </div>
                        <div className="absolute top-4 right-4 text-white text-sm z-10 bg-black/20 backdrop-blur-sm px-3 py-1 rounded-full shadow-lg">
                          {formatDate(article.createdAt, lang)}
                        </div>
                      </div>
                    </div>

                    <div className="p-6">
                      <h3 className="text-xl font-bold text-gray-800 mb-3 line-clamp-2 group-hover:text-blue-600 transition-colors">
                        {lang === "ru" ? article.title : article.titleUk}
                      </h3>
                      <p className="text-gray-600 mb-4 text-sm leading-relaxed line-clamp-3">
                        {stripHtml(
                          lang === "ru" ? article.body : article.bodyUk
                        )}
                      </p>

                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4 text-sm text-gray-500">
                          <span className="flex items-center gap-1">
                            👁️ {formatViews(article.views)}
                          </span>
                          <span>
                            {" "}
                            {lang === "ru"
                              ? article.author?.name
                              : article.author?.nameUk ||
                                t("authorDefault")}{" "}
                          </span>
                        </div>
                        <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center group-hover:bg-blue-500 group-hover:text-white transition-all">
                          →
                        </div>
                      </div>
                    </div>
                  </Link>
                </article>
              ))}
            </div>
          </div>

          {/* Sidebar - SSR */}
          <div className="lg:w-80">
            <div className="sticky top-8 space-y-6">
              {/* Popular Articles */}
              <div className="bg-white rounded-2xl shadow-md p-6 border border-gray-100">
                <h3 className="text-lg font-bold text-gray-800 mb-4 relative inline-block">
                  {t("popularArticles")}
                  <div className="absolute -bottom-2 left-0 w-12 h-1 bg-gradient-to-r from-blue-500 to-yellow-400 rounded-full"></div>
                </h3>
                <div className="space-y-4">
                  {popularArticles.map((article) => (
                    <Link
                      key={article.id}
                      href={`/journal/article/${
                        lang === "ru" ? article.slug : article.slugUk
                      }`}
                      className="flex items-start gap-3 p-3 rounded-lg hover:bg-gray-50 cursor-pointer group"
                    >
                      <div className="flex-shrink-0 w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
                      <div className="flex-1">
                        <h4 className="text-sm font-medium text-gray-800 group-hover:text-blue-600 line-clamp-2 transition-colors">
                          {lang === "uk" ? article.titleUk : article.title}
                        </h4>
                        <div className="flex items-center gap-2 mt-1 text-xs text-gray-500">
                          <span>{formatDate(article.createdAt, lang)}</span>
                          <span>•</span>
                          <span>
                            {formatViews(article.views)} {t("views")}
                          </span>
                        </div>
                      </div>
                    </Link>
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
