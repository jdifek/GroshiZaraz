/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  ExternalLink,
  FileText,
  Building2,
  Newspaper,
  Map,
  User,
  FolderOpen,
  MessageSquare,
  Phone as PhoneIcon,
  HelpCircle,
  Tag,
} from "lucide-react";
import { Link } from "@/app/i18n/navigation";

import { getTranslations } from "next-intl/server";

type SitemapPageProps = {
  params: Promise<{ lang: string }>;
};

async function getSitemapData() {
  const API_URL = process.env.NEXT_PUBLIC_API_URL_SITEMAP || "http://localhost:5000/";

  console.log("Fetching sitemap data from:", `${API_URL}api/sitemap/human`);

  try {
    const res = await fetch(`${API_URL}api/sitemap/human`, {
      cache: "no-store",
    });

    console.log("Sitemap fetch response status:", res.status);

    if (!res.ok) throw new Error("Failed to fetch sitemap");

    const data = await res.json();
    console.log("Sitemap data fetched successfully:", data);

    return data;
  } catch (error) {
    console.error("Ошибка загрузки sitemap:", error);
    return null;
  }
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  const t = await getTranslations({ locale: lang, namespace: "Sitemap" });

  return {
    title: t("meta.title"),
    description: t("meta.description"),
  };
}

export default async function SitemapPage({ params }: SitemapPageProps) {
  const { lang } = await params;
  const t = await getTranslations({ locale: lang, namespace: "Sitemap" });
  const data = await getSitemapData();

  if (!data) {
    return (
      <div className="max-w-7xl mx-auto py-12">
        <p className="text-center text-red-600">{t("error")}</p>
      </div>
    );
  }

  const subPages = [
    {
      path: "reviews",
      icon: MessageSquare,
      label: t("sections.mfoSubpages.reviews"),
    },
    {
      path: "contacts",
      icon: PhoneIcon,
      label: t("sections.mfoSubpages.contacts"),
    },
    {
      path: "questions",
      icon: HelpCircle,
      label: t("sections.mfoSubpages.questions"),
    },
    {
      path: "promocodes",
      icon: Tag,
      label: t("sections.mfoSubpages.promocodes"),
    },
  ];

  return (
    <div className="max-w-7xl mx-auto py-12 space-y-12">
      {/* Header */}
      <div className="text-center">
        <h1 className="text-4xl font-bold text-gray-800 mb-4 relative inline-block">
          {t("title")}
          <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-20 h-1 bg-gradient-to-r from-blue-500 to-yellow-400 rounded-full" />
        </h1>
        <p className="text-gray-600 text-lg">{t("subtitle")}</p>
      </div>

      {/* Статические страницы */}
      <section className="bg-white rounded-3xl shadow-lg p-8">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 bg-blue-500 rounded-lg flex items-center justify-center">
            <Map className="w-6 h-6 text-white" />
          </div>
          <h2 className="text-2xl font-bold text-gray-800">
            {t("sections.static")} ({data.static.length})
          </h2>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {data.static.map((item: any, index: number) => (
            <Link
              key={index}
              href={`${lang === "uk" ? item.pathUk : item.pathRu}`}
              className="flex items-center gap-2 p-3 rounded-xl border border-gray-200 hover:border-blue-500 hover:bg-blue-50 transition-all group"
            >
              <ExternalLink className="w-4 h-4 text-gray-400 group-hover:text-blue-500" />
              <span className="text-gray-700 group-hover:text-blue-600 font-medium">
                {lang === "uk" ? item.titleUk : item.titleRu}
              </span>
            </Link>
          ))}
        </div>
      </section>

      {/* МФО + подстраницы */}
      <section className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-3xl shadow-lg p-8 border border-green-200">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 bg-green-500 rounded-lg flex items-center justify-center">
            <Building2 className="w-6 h-6 text-white" />
          </div>
          <h2 className="text-2xl font-bold text-gray-800">
            {t("sections.mfos")} ({data.mfos.length})
          </h2>
        </div>

        <div className="space-y-6">
          {data.mfos.map((mfo: any) => (
            <div
              key={mfo.id}
              className="bg-white rounded-2xl p-4 border border-green-200"
            >
              {/* Главная страница МФО */}
              <Link
                href={`/mfos/${mfo.slug}`}
                className="flex items-center gap-2 p-3 rounded-xl border border-transparent hover:border-green-500 hover:bg-green-50 transition-all group mb-3"
              >
                <Building2 className="w-5 h-5 text-gray-400 group-hover:text-green-500" />
                <span className="text-gray-800 group-hover:text-green-600 font-semibold">
                  {mfo.name}
                </span>
              </Link>

              {/* Подстраницы */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-2 pl-7">
                {subPages.map((sub) => (
                  <Link
                    key={sub.path}
                    href={`/mfos/${mfo.slug}/${sub.path}`}
                    className="flex items-center gap-2 p-2 rounded-lg border border-gray-200 hover:border-green-400 hover:bg-green-50 transition-all group text-sm"
                  >
                    <sub.icon className="w-3 h-3 text-gray-400 group-hover:text-green-500" />
                    <span className="text-gray-600 group-hover:text-green-600">
                      {sub.label}
                    </span>
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Журнал/Статьи */}
      {data.news && data.news.length > 0 && (
        <section className="bg-gradient-to-br from-orange-50 to-red-50 rounded-3xl shadow-lg p-8 border border-orange-200">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 bg-orange-500 rounded-lg flex items-center justify-center">
              <Newspaper className="w-6 h-6 text-white" />
            </div>
            <h2 className="text-2xl font-bold text-gray-800">
              {t("sections.news")} ({data.news.length})
            </h2>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {data.news.map((article: any) => (
              <Link
                key={article.id}
                href={`/journal/article/${
                  lang === "uk" ? article.slugUk : article.slug
                }`}
                className="flex items-center gap-2 p-3 rounded-xl bg-white border border-orange-200 hover:border-orange-500 hover:shadow-md transition-all group"
              >
                <ExternalLink className="w-4 h-4 text-gray-400 group-hover:text-orange-500" />
                <span className="text-gray-700 group-hover:text-orange-600 font-medium text-sm">
                  {lang === "uk" ? article.titleUk : article.title}
                </span>
              </Link>
            ))}
          </div>
        </section>
      )}

      {/* Категории журнала */}
      {data.newsCategories && data.newsCategories.length > 0 && (
        <section className="bg-gradient-to-br from-cyan-50 to-blue-50 rounded-3xl shadow-lg p-8 border border-cyan-200">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 bg-cyan-500 rounded-lg flex items-center justify-center">
              <FolderOpen className="w-6 h-6 text-white" />
            </div>
            <h2 className="text-2xl font-bold text-gray-800">
              {t("sections.newsCategories")} ({data.newsCategories.length})
            </h2>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {data.newsCategories.map((category: any) => (
              <Link
                key={category.id}
                href={`/journal/${category.slug}`}
                className="flex items-center gap-2 p-3 rounded-xl bg-white border border-cyan-200 hover:border-cyan-500 hover:shadow-md transition-all group"
              >
                <ExternalLink className="w-4 h-4 text-gray-400 group-hover:text-cyan-500" />
                <span className="text-gray-700 group-hover:text-cyan-600 font-medium">
                  {lang === "uk" ? category.nameUk : category.name}
                </span>
              </Link>
            ))}
          </div>
        </section>
      )}

      {/* Авторы */}
      {data.authors && data.authors.length > 0 && (
        <section className="bg-gradient-to-br from-pink-50 to-rose-50 rounded-3xl shadow-lg p-8 border border-pink-200">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 bg-pink-500 rounded-lg flex items-center justify-center">
              <User className="w-6 h-6 text-white" />
            </div>
            <h2 className="text-2xl font-bold text-gray-800">
              {t("sections.authors")} ({data.authors.length})
            </h2>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {data.authors.map((author: any) => (
              <Link
                key={author.id}
                href={`/journal/${author.slug}`}
                className="flex items-center gap-2 p-3 rounded-xl bg-white border border-pink-200 hover:border-pink-500 hover:shadow-md transition-all group"
              >
                <ExternalLink className="w-4 h-4 text-gray-400 group-hover:text-pink-500" />
                <span className="text-gray-700 group-hover:text-pink-600 font-medium">
                  {lang === "uk" ? author.nameUk || author.name : author.name}
                </span>
              </Link>
            ))}
          </div>
        </section>
      )}

      {/* Ключевые страницы */}
      <section className="bg-gradient-to-br from-purple-50 to-indigo-50 rounded-3xl shadow-lg p-8 border border-purple-200">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 bg-purple-500 rounded-lg flex items-center justify-center">
            <FileText className="w-6 h-6 text-white" />
          </div>
          <h2 className="text-2xl font-bold text-gray-800">
            {t("sections.categories")} ({data.satelliteKeys.length})
          </h2>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {data.satelliteKeys.map((key: any) => (
            <Link
              key={key.id}
              href={`/mfo/${lang === "uk" ? key.slugUk : key.slugRu}`}
              className="flex items-center gap-2 p-3 rounded-xl bg-white border border-purple-200 hover:border-purple-500 hover:shadow-md transition-all group"
            >
              <ExternalLink className="w-4 h-4 text-gray-400 group-hover:text-purple-500" />
              <span className="text-gray-700 group-hover:text-purple-600 font-medium">
                {lang === "uk" ? key.titleUk : key.titleRu}
              </span>
            </Link>
          ))}
        </div>
      </section>

      {/* Сателлиты */}
      {data.satellites.length > 0 && (
        <section className="bg-gradient-to-br from-amber-50 to-yellow-50 rounded-3xl shadow-lg p-8 border border-amber-200">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 bg-amber-500 rounded-lg flex items-center justify-center">
              <FileText className="w-6 h-6 text-white" />
            </div>
            <h2 className="text-2xl font-bold text-gray-800">
              {t("sections.subcategories")} ({data.satellites.length})
            </h2>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {data.satellites.map((sat: any) => (
              <Link
                key={sat.id}
                href={`/mfo/${lang === "uk" ? sat.slugUk : sat.slugRu}`}
                className="flex items-center gap-2 p-3 rounded-xl bg-white border border-amber-200 hover:border-amber-500 hover:shadow-md transition-all group"
              >
                <ExternalLink className="w-4 h-4 text-gray-400 group-hover:text-amber-500" />
                <span className="text-gray-700 group-hover:text-amber-600 font-medium">
                  {lang === "uk" ? sat.titleUk : sat.titleRu}
                </span>
              </Link>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
