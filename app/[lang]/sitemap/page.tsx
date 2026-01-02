/* eslint-disable @typescript-eslint/no-explicit-any */
import { ExternalLink, FileText, Building2, Newspaper, Map } from "lucide-react";
import Link from "next/link";
import { getTranslations } from "next-intl/server";

type SitemapPageProps = {
  params: Promise<{ lang: string }>;
};

async function getSitemapData() {
  const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/";
  
  try {
    const res = await fetch(`${API_URL}/api/sitemap/human`, {
      cache: "no-store",
    });

    if (!res.ok) throw new Error("Failed to fetch sitemap");
    
    return await res.json();
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
console.log(data, 'data');

  if (!data) {
    return (
      <div className="max-w-7xl mx-auto ">
        <p className="text-center text-red-600">
          {t("error")}
        </p>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto  space-y-12">
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
            {t("sections.static")}
          </h2>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {data.static.map((item: any, index: number) => (
            <Link
              key={index}
              href={`/${lang}${lang === "uk" ? item.pathUk : item.pathRu}`}
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

      {/* МФО */}
      <section className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-3xl shadow-lg p-8 border border-green-200">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 bg-green-500 rounded-lg flex items-center justify-center">
            <Building2 className="w-6 h-6 text-white" />
          </div>
          <h2 className="text-2xl font-bold text-gray-800">
            {t("sections.mfos")} ({data.mfos.length})
          </h2>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {data.mfos.map((mfo: any) => (
            <Link
              key={mfo.id}
              href={`/${lang}/mfo/${mfo.slug}`}
              className="flex items-center gap-2 p-3 rounded-xl bg-white border border-green-200 hover:border-green-500 hover:shadow-md transition-all group"
            >
              <ExternalLink className="w-4 h-4 text-gray-400 group-hover:text-green-500" />
              <span className="text-gray-700 group-hover:text-green-600 font-medium">
                {mfo.name}
              </span>
            </Link>
          ))}
        </div>
      </section>
{/* Журнал/Новости */}
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
          href={`/${lang}/journal/${lang === "uk" ? article.slugUk : article.slug}`}
          className="flex items-center gap-2 p-3 rounded-xl bg-white border border-orange-200 hover:border-orange-500 hover:shadow-md transition-all group"
        >
          <ExternalLink className="w-4 h-4 text-gray-400 group-hover:text-orange-500" />
          <span className="text-gray-700 group-hover:text-orange-600 font-medium">
            {lang === "uk" ? article.titleUk : article.title}
          </span>
        </Link>
      ))}
    </div>
  </section>
)}
      {/* Ключевые страницы */}
      <section className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-3xl shadow-lg p-8 border border-purple-200">
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
              href={`/${lang}/mfo/${lang === "uk" ? key.slugUk : key.slugRu}`}
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
        <section className="bg-gradient-to-br from-amber-50 to-orange-50 rounded-3xl shadow-lg p-8 border border-amber-200">
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
                href={`/${lang}/mfo/${lang === "uk" ? sat.slugUk : sat.slugRu}`}
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