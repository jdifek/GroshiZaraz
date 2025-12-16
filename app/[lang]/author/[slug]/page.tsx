import { Metadata } from "next";
import { headers } from "next/headers";
import { getTranslations } from "next-intl/server";
import { notFound } from "next/navigation";
import Link from "next/link";
import AuthorService from "@/app/services/authors/authorsService";
import { authorArticles } from "@/app/data/authorArticles";

export const dynamic = "force-dynamic";

type Props = {
  params: Promise<{ lang: string; slug: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  console.log("generateMetadata called with params:", params);

  const { lang: rawLang, slug } = await params;
  const lang = rawLang || "uk";
  console.log("Resolved lang:", lang, "slug:", slug);

  const headersList = await headers();
  const pathname = headersList.get("x-pathname") || "/";
  console.log("Headers pathname:", pathname);
  let messages;
  try {
    messages = (await import(`@/app/messages/${lang}.json`)).default;
    console.log(`Loaded messages for lang: ${lang}`);
  } catch (msgError) {
    console.error(
      `Messages for lang "${lang}" not found. Falling back to 'uk'`,
      msgError
    );
    messages = (await import(`@/app/messages/uk.json`)).default;
  }
  try {
    console.log(`Fetching author data for slug: ${slug}`);
    const author = await AuthorService.AuthorGet({ authorSlug: slug });

    if (!author) {
      console.warn(`Author not found for slug: ${slug}`);
      return {
        title: messages.Metadata.author.notFoundTitle,
        description: messages.Metadata.author.notFoundDescription,
        keywords: messages.Metadata.author.defaultKeywords,
      };
    }

    const cleanPath = pathname.replace(/^\/(uk|ru)/, "") || "/";
    console.log("Clean path:", cleanPath);

    const title = `${lang === "ru" ? author.name : author.nameUk} - ${
      lang === "ru" ? author.position : author.positionUk
    } | ${messages.Metadata.author.siteName}`;
    const description =
      lang === "ru"
        ? author.bio
          ? author.bio.slice(0, 160)
          : author.bioUk
          ? author.bioUk.slice(0, 160)
          : ""
        : author.bioUk
        ? author.bioUk.slice(0, 160)
        : author.bio
        ? author.bio.slice(0, 160)
        : "";

    console.log("Metadata prepared:", { title, description });
    const keywords = author
      ? `${lang === "ru" ? author.name : author.nameUk}, ${
          lang === "ru" ? author.position : author.positionUk
        }, ${
          lang === "ru"
            ? author.expertise?.join(", ")
            : author.expertiseUk?.join(", ") || ""
        }, финансы, статьи, блог, Украина`
      : messages.Metadata.author.defaultKeywords;
    return {
      title,
      description,
      keywords,
      robots: "index, follow",
      authors: [{ name: author.name }],
      openGraph: {
        title,
        description,
        url: `https://groshi-zaraz.vercel.app/${lang}${cleanPath}`,
        siteName: messages.Metadata.author.siteName,
        type: "profile",
        locale: lang === "uk" ? "uk_UA" : "ru_UA",
        images: [
          {
            url: "https://groshi-zaraz.vercel.app/og-author-image.jpg",
            width: 1200,
            height: 630,
            alt: author.name,
          },
        ],
      },
      twitter: {
        card: "summary_large_image",
        title,
        description,
        images: ["https://groshi-zaraz.vercel.app/og-author-image.jpg"],
        site: "@finoglyad",
        creator: author.twitter || "@finoglyad",
      },
      alternates: {
        canonical: `https://groshi-zaraz.vercel.app/${lang}${cleanPath}`,
        languages: {
          "uk-UA": `https://groshi-zaraz.vercel.app/uk${cleanPath}`,
          "ru-UA": `https://groshi-zaraz.vercel.app/ru${cleanPath}`,
          "x-default": `https://groshi-zaraz.vercel.app${cleanPath}`,
        },
      },
    };
  } catch (error) {
    console.error(`Failed to load author metadata for slug "${slug}":`, error);
    return {
      title: messages.Metadata.author.notFoundTitle,
      description: messages.Metadata.author.notFoundDescription,
      keywords: messages.Metadata.author.defaultKeywords,
    };
  }
}

export default async function AuthorPage({ params }: Props) {
  const { lang, slug } = await params;
  const t = await getTranslations({ locale: lang, namespace: "AuthorPage" });

  let author;
  try {
    author = await AuthorService.AuthorGet({ authorSlug: slug });
  } catch (error) {
    console.error("Error fetching author:", error);
    notFound();
  }

  if (!author) notFound();

  // Замена useState на константу
  const articlesCount = 6;

  const formatNumber = (num: number) => {
    if (num >= 1000000) return `${(num / 1000000).toFixed(1)}M`;
    if (num >= 1000) return `${(num / 1000).toFixed(1)}K`;
    return num.toString();
  };

  return (
    <div className="min-h-screen">
      {/* Breadcrumbs */}
      <div className="px-4 md:px-0">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center text-xs sm:text-sm text-gray-600 py-4 overflow-x-auto">
            <Link
              href={`/${lang}`}
              className="hover:text-blue-600 transition-colors whitespace-nowrap"
            >
              {t("breadcrumbs.home")}
            </Link>
            <span className="mx-1 sm:mx-2">-</span>
            <Link
              href={`/${lang}/journal`}
              className="hover:text-blue-600 transition-colors whitespace-nowrap"
            >
              {t("breadcrumbs.journal")}
            </Link>
            <span className="mx-1 sm:mx-2">-</span>
            <span className="whitespace-nowrap">
              {t("breadcrumbs.authors")}
            </span>
            <span className="mx-1 sm:mx-2">-</span>
            <span className="truncate">{author.name}</span>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto">
        {/* Author Hero Section */}
        <div className="bg-white rounded-xl md:rounded-2xl shadow-md overflow-hidden border border-gray-100 mb-6 md:mb-8">
          <div
            className={`${author.color} h-48 sm:h-56 md:h-64 lg:h-80 relative overflow-hidden`}
          >
            <div
              className="absolute inset-0"
              style={{ backgroundColor: author.color }}
            ></div>

            <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-6 md:p-8">
              <div className="flex flex-col sm:flex-row sm:items-end gap-4 md:gap-6">
                <div className="w-20 h-20 sm:w-24 sm:h-24 md:w-32 md:h-32 lg:w-40 lg:h-40 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center text-white text-2xl sm:text-3xl md:text-5xl lg:text-6xl font-bold border-2 md:border-4 border-white/30 shadow-2xl mx-auto sm:mx-0">
                  {author.avatar}
                </div>
                <div className="flex-1 text-white text-center sm:text-left">
                  <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-5xl font-bold mb-1 md:mb-2 !text-white drop-shadow-lg">
                    {lang === "ru" ? author.name : author.nameUk}
                  </h1>
                  <p className="text-sm sm:text-base md:text-xl lg:text-2xl text-white/90 mb-3 md:mb-4 drop-shadow">
                    {lang === "ru" ? author.position : author.positionUk}
                  </p>
                  <div className="flex flex-wrap justify-center sm:justify-start gap-2 md:gap-4">
                    <div className="bg-white/10 backdrop-blur-sm px-2 sm:px-3 md:px-4 py-1 md:py-2 rounded-full border border-white/20">
                      <span className="text-xs sm:text-sm font-medium">
                        📚 {author.totalPosts} {t("stats.articles")}
                      </span>
                    </div>
                    <div className="bg-white/10 backdrop-blur-sm px-2 sm:px-3 md:px-4 py-1 md:py-2 rounded-full border border-white/20">
                      <span className="text-xs sm:text-sm font-medium">
                        👁️ {formatNumber(author.totalViews)} {t("stats.views")}
                      </span>
                    </div>
                    <div className="bg-white/10 backdrop-blur-sm px-2 sm:px-3 md:px-4 py-1 md:py-2 rounded-full border border-white/20">
                      <span className="text-xs sm:text-sm font-medium">
                        👥 {formatNumber(author.followers)}{" "}
                        {t("stats.followers")}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Author Details */}
          <div className="p-4 sm:p-6 md:p-8 lg:p-12">
            <div className="grid lg:grid-cols-3 gap-6 md:gap-8">
              {/* Bio and Description */}
              <div className="lg:col-span-2">
                <h2 className="text-xl md:text-2xl font-bold text-gray-800 mb-3 md:mb-4 relative inline-block">
                  {t("sections.about")}
                  <div className="absolute -bottom-1 md:-bottom-2 left-0 w-8 md:w-12 h-0.5 md:h-1 bg-gradient-to-r from-blue-500 to-yellow-400 rounded-full"></div>
                </h2>
                <p className="break-words break-normal text-gray-700 text-sm sm:text-base md:text-lg leading-relaxed mb-4 md:mb-6">
                  {lang === "ru" ? author.bio : author.bioUk}
                </p>

                <h3 className="text-lg md:text-xl font-bold text-gray-800 mb-3 md:mb-4">
                  {t("sections.expertise")}
                </h3>
                <div className="flex flex-wrap gap-2 md:gap-3 mb-6 md:mb-8">
                  {lang === "ru"
                    ? author.expertise.map((skill, index) => (
                        <span
                          key={index}
                          className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-3 md:px-4 py-1.5 md:py-2 rounded-full text-xs md:text-sm font-medium shadow-lg"
                        >
                          {skill}
                        </span>
                      ))
                    : author.expertiseUk.map((skill, index) => (
                        <span
                          key={index}
                          className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-3 md:px-4 py-1.5 md:py-2 rounded-full text-xs md:text-sm font-medium shadow-lg"
                        >
                          {skill}
                        </span>
                      ))}
                </div>

                <h3 className="text-lg md:text-xl font-bold text-gray-800 mb-3 md:mb-4">
                  {t("sections.achievements")}
                </h3>
                <div className="space-y-2 md:space-y-3">
                  {lang === "ru"
                    ? author.achievements.map((achievement, index) => (
                        <div key={index} className="flex items-start gap-3">
                          <div className="w-1.5 h-1.5 md:w-2 md:h-2 bg-gradient-to-r from-blue-500 to-yellow-400 rounded-full mt-2 flex-shrink-0"></div>
                          <p className="text-gray-700 text-sm md:text-base">
                            {achievement}
                          </p>
                        </div>
                      ))
                    : author.achievementsUk.map((achievement, index) => (
                        <div key={index} className="flex items-start gap-3">
                          <div className="w-1.5 h-1.5 md:w-2 md:h-2 bg-gradient-to-r from-blue-500 to-yellow-400 rounded-full mt-2 flex-shrink-0"></div>
                          <p className="text-gray-700 text-sm md:text-base">
                            {achievement}
                          </p>
                        </div>
                      ))}
                </div>
              </div>

              {/* Sidebar */}
              <div className="space-y-4 md:space-y-6">
                {/* Stats Card */}
                <div className="bg-gray-50 rounded-xl md:rounded-2xl p-4 md:p-6 border border-gray-100">
                  <h3 className="text-base md:text-lg font-bold text-gray-800 mb-3 md:mb-4 relative inline-block">
                    {t("sections.statistics")}
                    <div className="absolute -bottom-0.5 md:-bottom-1 left-0 w-6 md:w-8 h-0.5 bg-gradient-to-r from-blue-500 to-yellow-400 rounded-full"></div>
                  </h3>
                  <div className="space-y-3 md:space-y-4">
                    <div className="flex justify-between gap-2 items-center">
                      <span className="text-gray-600 text-sm md:text-base">
                        {t("statsLabels.experience")}
                      </span>
                      <span className="font-bold text-gray-800 text-sm ">
                        {lang === "ru"
                          ? author.experience
                          : author.experienceUk}
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600 text-sm md:text-base">
                        {t("statsLabels.articlesWritten")}
                      </span>
                      <span className="font-bold text-gray-800 text-sm md:text-base">
                        {author.totalPosts}
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600 text-sm md:text-base">
                        {t("statsLabels.totalViews")}
                      </span>
                      <span className="font-bold text-gray-800 text-sm md:text-base">
                        {formatNumber(author.totalViews)}
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600 text-sm md:text-base">
                        {t("statsLabels.followers")}
                      </span>
                      <span className="font-bold text-gray-800 text-sm md:text-base">
                        {formatNumber(author.followers)}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Social Media Card */}
                <div className="bg-gray-50 rounded-xl md:rounded-2xl p-4 md:p-6 border border-gray-100">
                  <h3 className="text-base md:text-lg font-bold text-gray-800 mb-3 md:mb-4 relative inline-block">
                    {t("sections.social")}
                    <div className="absolute -bottom-0.5 md:-bottom-1 left-0 w-6 md:w-8 h-0.5 bg-gradient-to-r from-blue-500 to-yellow-400 rounded-full"></div>
                  </h3>
                  <div className="space-y-2 md:space-y-3">
                    {author.telegram && (
                      <a
                        href={`https://t.me/${author.telegram.replace(
                          "@",
                          ""
                        )}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-3 p-2 md:p-3 bg-white rounded-lg md:rounded-xl hover:bg-blue-50 transition-colors border border-gray-100 hover:border-blue-200"
                      >
                        <div className="w-8 h-8 md:w-10 md:h-10 bg-blue-500 rounded-full flex items-center justify-center text-white text-sm md:text-base">
                          📱
                        </div>
                        <div className="min-w-0 flex-1">
                          <div className="font-medium text-gray-800 text-sm md:text-base">
                            Telegram
                          </div>
                          <div className="text-xs md:text-sm text-gray-600 truncate">
                            {author.telegram}
                          </div>
                        </div>
                      </a>
                    )}
                    {author.linkedin && (
                      <a
                        href={`https://linkedin.com/in/${author.linkedin}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-3 p-2 md:p-3 bg-white rounded-lg md:rounded-xl hover:bg-blue-50 transition-colors border border-gray-100 hover:border-blue-200"
                      >
                        <div className="w-8 h-8 md:w-10 md:h-10 bg-blue-600 rounded-full flex items-center justify-center text-white text-sm md:text-base">
                          💼
                        </div>
                        <div className="min-w-0 flex-1">
                          <div className="font-medium text-gray-800 text-sm md:text-base">
                            LinkedIn
                          </div>
                          <div className="text-xs md:text-sm text-gray-600 truncate">
                            {author.linkedin}
                          </div>
                        </div>
                      </a>
                    )}
                    {author.twitter && (
                      <a
                        href={`https://twitter.com/${author.twitter.replace(
                          "@",
                          ""
                        )}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-3 p-2 md:p-3 bg-white rounded-lg md:rounded-xl hover:bg-blue-50 transition-colors border border-gray-100 hover:border-blue-200"
                      >
                        <div className="w-8 h-8 md:w-10 md:h-10 bg-blue-400 rounded-full flex items-center justify-center text-white text-sm md:text-base">
                          🐦
                        </div>
                        <div className="min-w-0 flex-1">
                          <div className="font-medium text-gray-800 text-sm md:text-base">
                            Twitter
                          </div>
                          <div className="text-xs md:text-sm text-gray-600 truncate">
                            {author.twitter}
                          </div>
                        </div>
                      </a>
                    )}
                    {author.email && (
                      <a
                        href={`mailto:${author.email}`}
                        className="flex items-center gap-3 p-2 md:p-3 bg-white rounded-lg md:rounded-xl hover:bg-blue-50 transition-colors border border-gray-100 hover:border-blue-200"
                      >
                        <div className="w-8 h-8 md:w-10 md:h-10 bg-gray-600 rounded-full flex items-center justify-center text-white text-sm md:text-base">
                          ✉️
                        </div>
                        <div className="min-w-0 flex-1">
                          <div className="font-medium text-gray-800 text-sm md:text-base">
                            Email
                          </div>
                          <div className="text-xs md:text-sm text-gray-600 truncate">
                            {author.email}
                          </div>
                        </div>
                      </a>
                    )}
                  </div>
                </div>

                {/* Action Buttons (пока оставлены как button, т.к. функционал подписки/уведомлений требует JS) */}
                <div className="space-y-2 md:space-y-3">
                  <button className="w-full bg-gradient-to-r from-blue-500 to-blue-600 text-white py-2.5 md:py-3 px-4 rounded-lg md:rounded-xl text-sm md:text-base font-medium hover:from-blue-600 hover:to-blue-700 transition-all duration-200 shadow-lg hover:shadow-xl">
                    📧 {t("buttons.subscribe")}
                  </button>
                  <button className="w-full bg-gradient-to-r from-green-500 to-green-600 text-white py-2.5 md:py-3 px-4 rounded-lg md:rounded-xl text-sm md:text-base font-medium hover:from-green-600 hover:to-green-700 transition-all duration-200 shadow-lg hover:shadow-xl">
                    🔔 {t("buttons.notifications")}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Author's Articles */}
        <div className="bg-white rounded-xl md:rounded-2xl shadow-md p-4 sm:p-6 md:p-8 border border-gray-100">
          <div className="mb-6 md:mb-8">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-2 md:mb-4 relative inline-block">
              {t("articles.title")}
              <div className="absolute -bottom-1 md:-bottom-2 left-0 w-12 md:w-16 h-0.5 md:h-1 bg-gradient-to-r from-blue-500 to-yellow-400 rounded-full"></div>
            </h2>
            <p className="text-gray-600 text-sm md:text-lg">
              {t("articles.subtitle", {
                name: lang === "ru" ? author.name : author.nameUk,
              })}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 mb-6 md:mb-8">
            {authorArticles.slice(0, articlesCount).map((article) => (
              <Link
                key={article.id}
                href={`/${lang}/journal/article/${article.id}`}
                className="group block bg-white rounded-xl md:rounded-2xl shadow-md hover:shadow-lg transition-all duration-300 overflow-hidden border border-gray-100 hover:border-blue-200"
              >
                <div className="relative">
                  <div
                    className={`${article.color} h-32 sm:h-40 md:h-48 flex items-center justify-center text-4xl sm:text-5xl md:text-6xl text-white relative overflow-hidden`}
                  >
                    <div className="transform group-hover:scale-110 transition-transform duration-300">
                      {article.image}
                    </div>
                    <div className="absolute top-2 md:top-4 left-2 md:left-4">
                      <span className="bg-white text-gray-800 px-2 md:px-3 py-0.5 md:py-1 rounded-full text-xs md:text-sm font-bold shadow-lg">
                        {article.category}
                      </span>
                    </div>
                    <div className="absolute top-2 md:top-4 right-2 md:right-4 text-white/80 text-xs md:text-sm bg-white/20 backdrop-blur-sm px-2 md:px-3 py-0.5 md:py-1 rounded-full">
                      {article.date}
                    </div>
                  </div>
                </div>
                <div className="p-4 md:p-6">
                  <h3 className="text-base md:text-xl font-bold text-gray-800 mb-2 md:mb-3 line-clamp-2 group-hover:text-blue-600 transition-colors">
                    {article.title}
                  </h3>
                  <p className="text-gray-600 mb-3 md:mb-4 text-xs md:text-sm leading-relaxed line-clamp-3">
                    {article.excerpt}
                  </p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 md:gap-4 text-xs md:text-sm text-gray-500">
                      <span className="flex items-center gap-1">
                        👁️ {formatNumber(article.views)}
                      </span>
                      <span className="flex items-center gap-1">
                        ⏱️ {article.readTime}
                      </span>
                    </div>
                    <div className="w-6 h-6 md:w-8 md:h-8 bg-gray-100 rounded-full flex items-center justify-center group-hover:bg-blue-500 group-hover:text-white transition-all text-sm md:text-base">
                      →
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>

          {/* Load More (оставлена как button, т.к. требует загрузки дополнительных статей) */}
          <div className="text-center pt-6 md:pt-8 border-t border-gray-100">
            <button className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-6 md:px-8 py-2.5 md:py-3 rounded-lg md:rounded-xl text-sm md:text-base font-medium hover:from-blue-600 hover:to-purple-700 transition-all duration-200 shadow-lg hover:shadow-xl">
              {t("buttons.loadMore")}
            </button>
          </div>
        </div>

        {/* Back Button */}
        <div className="text-center mt-6 md:mt-8">
          <Link
            href={`/${lang}/journal`}
            className="inline-block bg-gradient-to-r from-blue-500 to-blue-600 text-white px-8 py-3 rounded-2xl font-semibold hover:shadow-lg transition-all duration-300 hover:scale-105"
          >
            {t("buttons.backToJournal")}
          </Link>
        </div>
      </div>
    </div>
  );
}
