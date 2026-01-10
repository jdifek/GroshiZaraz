import React from "react";
import {
  BookOpen,
  TrendingUp,
  Users,
  Award,
  Target,
  Lightbulb,
  FileText,
  CheckCircle,
  AlertCircle,
  BarChart,
  Shield,
  Newspaper,
  Clock,
  Star,
} from "lucide-react";
import { getTranslations } from "next-intl/server";
import ScrollToTopButton from "../ui/Buttons/ScrollToTopButton";

type SEOJournalContentProps = {
  lang: string;
};

export default async function SEOJournalContent({
  lang,
}: SEOJournalContentProps) {
  const t = await getTranslations({
    locale: lang,
    namespace: "SEOJournalContent",
  });

  // Категорії контенту
  const contentCategories = [
    {
      icon: <TrendingUp className="w-8 h-8 text-blue-500" />,
      title: t("categories.analytics.title"),
      description: t("categories.analytics.description"),
    },
    {
      icon: <BookOpen className="w-8 h-8 text-green-500" />,
      title: t("categories.guides.title"),
      description: t("categories.guides.description"),
    },
    {
      icon: <Newspaper className="w-8 h-8 text-orange-500" />,
      title: t("categories.news.title"),
      description: t("categories.news.description"),
    },
    {
      icon: <Lightbulb className="w-8 h-8 text-yellow-500" />,
      title: t("categories.tips.title"),
      description: t("categories.tips.description"),
    },
  ];

  // Переваги журналу
  const journalBenefits = [
    {
      icon: <Award className="w-6 h-6 text-blue-500" />,
      title: t("benefits.expertise.title"),
      description: t("benefits.expertise.description"),
    },
    {
      icon: <CheckCircle className="w-6 h-6 text-green-500" />,
      title: t("benefits.verified.title"),
      description: t("benefits.verified.description"),
    },
    {
      icon: <Clock className="w-6 h-6 text-orange-500" />,
      title: t("benefits.updates.title"),
      description: t("benefits.updates.description"),
    },
    {
      icon: <Users className="w-6 h-6 text-purple-500" />,
      title: t("benefits.community.title"),
      description: t("benefits.community.description"),
    },
  ];

  // Популярні теми
  const popularTopics = [
    { topic: t("topics.topic1"), count: "45" },
    { topic: t("topics.topic2"), count: "38" },
    { topic: t("topics.topic3"), count: "32" },
    { topic: t("topics.topic4"), count: "28" },
    { topic: t("topics.topic5"), count: "24" },
    { topic: t("topics.topic6"), count: "21" },
  ];

  return (
    <div className="max-w-7xl mx-auto space-y-16 py-12">
      {/* 1. Вступ про журнал */}
      <section className="space-y-6">
        <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-6 relative inline-block">
          {t("mainTitle")}
          <div className="absolute -bottom-2 left-0 w-20 h-1 bg-gradient-to-r from-blue-500 to-yellow-400 rounded-full" />
        </h2>

        <div className="space-y-4 text-gray-700 text-lg leading-relaxed">
          <p dangerouslySetInnerHTML={{ __html: t.raw("intro.p1") }} />
          <p dangerouslySetInnerHTML={{ __html: t.raw("intro.p2") }} />
          <p dangerouslySetInnerHTML={{ __html: t.raw("intro.p3") }} />
        </div>
      </section>

      {/* 2. Категорії контенту */}
      <section className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-3xl p-8 space-y-8">
        <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-8 relative inline-block">
          {t("categoriesTitle")}
          <div className="absolute -bottom-2 left-0 w-20 h-1 bg-gradient-to-r from-blue-500 to-yellow-400 rounded-full" />
        </h2>

        <div className="grid md:grid-cols-2 gap-6">
          {contentCategories.map((category, idx) => (
            <div
              key={idx}
              className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
            >
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0">{category.icon}</div>
                <div className="space-y-2">
                  <h3 className="font-semibold text-gray-800 text-xl">
                    {category.title}
                  </h3>
                  <p className="text-gray-600">{category.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 3. Чому варто читати наш журнал */}
      <section className="space-y-8">
        <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 relative inline-block">
          {t("whyReadTitle")}
          <div className="absolute -bottom-2 left-0 w-20 h-1 bg-gradient-to-r from-blue-500 to-yellow-400 rounded-full" />
        </h2>

        <div className="grid md:grid-cols-2 gap-6">
          {journalBenefits.map((benefit, idx) => (
            <div
              key={idx}
              className="bg-white rounded-2xl p-6 shadow-lg border-l-4 border-blue-500"
            >
              <div className="flex items-start gap-4">
                {benefit.icon}
                <div className="space-y-2">
                  <h3 className="font-semibold text-gray-800 text-lg">
                    {benefit.title}
                  </h3>
                  <p className="text-gray-600">{benefit.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 4. Експертні поради про фінансову грамотність */}
      <section className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-3xl p-8 space-y-8">
        <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 relative inline-block">
          {t("financialLiteracyTitle")}
          <div className="absolute -bottom-2 left-0 w-20 h-1 bg-gradient-to-r from-green-500 to-emerald-400 rounded-full" />
        </h2>

        <div className="grid lg:grid-cols-2 gap-8">
          <div className="space-y-6">
            <div className="bg-white rounded-2xl p-6 shadow-lg">
              <h3 className="font-semibold text-gray-800 text-xl mb-4 flex items-center gap-3">
                <Target className="w-6 h-6 text-blue-500" />
                {t("financialLiteracy.budgeting.title")}
              </h3>
              <div className="space-y-3 text-gray-700">
                <p
                  dangerouslySetInnerHTML={{
                    __html: t.raw("financialLiteracy.budgeting.text1"),
                  }}
                />
                <p
                  dangerouslySetInnerHTML={{
                    __html: t.raw("financialLiteracy.budgeting.text2"),
                  }}
                />
              </div>
            </div>

            <div className="bg-white rounded-2xl p-6 shadow-lg">
              <h3 className="font-semibold text-gray-800 text-xl mb-4 flex items-center gap-3">
                <Shield className="w-6 h-6 text-green-500" />
                {t("financialLiteracy.saving.title")}
              </h3>
              <div className="space-y-3 text-gray-700">
                <p
                  dangerouslySetInnerHTML={{
                    __html: t.raw("financialLiteracy.saving.text1"),
                  }}
                />
                <p
                  dangerouslySetInnerHTML={{
                    __html: t.raw("financialLiteracy.saving.text2"),
                  }}
                />
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <div className="bg-white rounded-2xl p-6 shadow-lg">
              <h3 className="font-semibold text-gray-800 text-xl mb-4 flex items-center gap-3">
                <BarChart className="w-6 h-6 text-purple-500" />
                {t("financialLiteracy.investing.title")}
              </h3>
              <div className="space-y-3 text-gray-700">
                <p
                  dangerouslySetInnerHTML={{
                    __html: t.raw("financialLiteracy.investing.text1"),
                  }}
                />
                <p
                  dangerouslySetInnerHTML={{
                    __html: t.raw("financialLiteracy.investing.text2"),
                  }}
                />
              </div>
            </div>

            <div className="bg-white rounded-2xl p-6 shadow-lg">
              <h3 className="font-semibold text-gray-800 text-xl mb-4 flex items-center gap-3">
                <AlertCircle className="w-6 h-6 text-orange-500" />
                {t("financialLiteracy.debt.title")}
              </h3>
              <div className="space-y-3 text-gray-700">
                <p
                  dangerouslySetInnerHTML={{
                    __html: t.raw("financialLiteracy.debt.text1"),
                  }}
                />
                <p
                  dangerouslySetInnerHTML={{
                    __html: t.raw("financialLiteracy.debt.text2"),
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5. Популярні теми */}
      <section className="space-y-8">
        <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 relative inline-block">
          {t("popularTopicsTitle")}
          <div className="absolute -bottom-2 left-0 w-20 h-1 bg-gradient-to-r from-blue-500 to-yellow-400 rounded-full" />
        </h2>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {popularTopics.map((item, idx) => (
            <div
              key={idx}
              className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 cursor-pointer"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                  <span className="text-gray-800 font-medium">
                    {item.topic}
                  </span>
                </div>
                <span className="bg-blue-50 text-blue-600 px-3 py-1 rounded-full text-sm font-semibold">
                  {item.count}
                </span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 6. Як користуватися журналом */}
      <section className="bg-gradient-to-br from-yellow-50 to-orange-50 rounded-3xl p-8 space-y-8">
        <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 relative inline-block">
          {t("howToUseTitle")}
          <div className="absolute -bottom-2 left-0 w-20 h-1 bg-gradient-to-r from-yellow-500 to-orange-400 rounded-full" />
        </h2>

        <div className="grid md:grid-cols-2 gap-8">
          <div className="bg-white rounded-2xl p-6 shadow-lg">
            <div className="flex items-start gap-4">
              <div className="bg-blue-500 text-white w-10 h-10 rounded-full flex items-center justify-center font-bold text-lg flex-shrink-0">
                1
              </div>
              <div className="space-y-3">
                <h3 className="font-semibold text-gray-800 text-xl">
                  {t("howToUse.step1.title")}
                </h3>
                <p className="text-gray-700">
                  {t("howToUse.step1.description")}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-lg">
            <div className="flex items-start gap-4">
              <div className="bg-blue-500 text-white w-10 h-10 rounded-full flex items-center justify-center font-bold text-lg flex-shrink-0">
                2
              </div>
              <div className="space-y-3">
                <h3 className="font-semibold text-gray-800 text-xl">
                  {t("howToUse.step2.title")}
                </h3>
                <p className="text-gray-700">
                  {t("howToUse.step2.description")}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-lg">
            <div className="flex items-start gap-4">
              <div className="bg-blue-500 text-white w-10 h-10 rounded-full flex items-center justify-center font-bold text-lg flex-shrink-0">
                3
              </div>
              <div className="space-y-3">
                <h3 className="font-semibold text-gray-800 text-xl">
                  {t("howToUse.step3.title")}
                </h3>
                <p className="text-gray-700">
                  {t("howToUse.step3.description")}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-lg">
            <div className="flex items-start gap-4">
              <div className="bg-blue-500 text-white w-10 h-10 rounded-full flex items-center justify-center font-bold text-lg flex-shrink-0">
                4
              </div>
              <div className="space-y-3">
                <h3 className="font-semibold text-gray-800 text-xl">
                  {t("howToUse.step4.title")}
                </h3>
                <p className="text-gray-700">
                  {t("howToUse.step4.description")}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 7. Експертні рекомендації */}
      <section className="space-y-8">
        <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 relative inline-block">
          {t("expertRecommendationsTitle")}
          <div className="absolute -bottom-2 left-0 w-20 h-1 bg-gradient-to-r from-blue-500 to-yellow-400 rounded-full" />
        </h2>

        <div className="grid lg:grid-cols-3 gap-6">
          <div className="bg-green-50 border border-green-200 rounded-2xl p-6">
            <div className="flex items-center gap-3 mb-4">
              <CheckCircle className="w-6 h-6 text-green-600" />
              <h3 className="font-semibold text-green-800 text-lg">
                {t("recommendations.beginners.title")}
              </h3>
            </div>
            <ul className="space-y-2 text-green-700 text-sm">
              <li className="flex items-start gap-2">
                <span className="text-green-500 mt-1">•</span>
                <span>{t("recommendations.beginners.tip1")}</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-500 mt-1">•</span>
                <span>{t("recommendations.beginners.tip2")}</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-500 mt-1">•</span>
                <span>{t("recommendations.beginners.tip3")}</span>
              </li>
            </ul>
          </div>

          <div className="bg-blue-50 border border-blue-200 rounded-2xl p-6">
            <div className="flex items-center gap-3 mb-4">
              <TrendingUp className="w-6 h-6 text-blue-600" />
              <h3 className="font-semibold text-blue-800 text-lg">
                {t("recommendations.advanced.title")}
              </h3>
            </div>
            <ul className="space-y-2 text-blue-700 text-sm">
              <li className="flex items-start gap-2">
                <span className="text-blue-500 mt-1">•</span>
                <span>{t("recommendations.advanced.tip1")}</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-blue-500 mt-1">•</span>
                <span>{t("recommendations.advanced.tip2")}</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-blue-500 mt-1">•</span>
                <span>{t("recommendations.advanced.tip3")}</span>
              </li>
            </ul>
          </div>

          <div className="bg-purple-50 border border-purple-200 rounded-2xl p-6">
            <div className="flex items-center gap-3 mb-4">
              <Star className="w-6 h-6 text-purple-600" />
              <h3 className="font-semibold text-purple-800 text-lg">
                {t("recommendations.experts.title")}
              </h3>
            </div>
            <ul className="space-y-2 text-purple-700 text-sm">
              <li className="flex items-start gap-2">
                <span className="text-purple-500 mt-1">•</span>
                <span>{t("recommendations.experts.tip1")}</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-purple-500 mt-1">•</span>
                <span>{t("recommendations.experts.tip2")}</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-purple-500 mt-1">•</span>
                <span>{t("recommendations.experts.tip3")}</span>
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* 8. Статистика журналу */}
      <section className="bg-gradient-to-br from-gray-50 to-slate-50 rounded-3xl p-8 space-y-8">
        <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 text-center relative inline-block w-full">
          {t("statisticsTitle")}
          <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-20 h-1 bg-gradient-to-r from-blue-500 to-yellow-400 rounded-full" />
        </h2>

        <div className="grid md:grid-cols-2 xl:grid-cols-4 gap-6">
          <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl p-6 text-white text-center">
            <div className="text-3xl font-bold mb-2">
              {t("statistics.articles")}
            </div>
            <div className="text-blue-100 text-sm">
              {t("statistics.articlesLabel")}
            </div>
          </div>
          <div className="bg-gradient-to-br from-green-500 to-green-600 rounded-2xl p-6 text-white text-center">
            <div className="text-3xl font-bold mb-2">
              {t("statistics.readers")}
            </div>
            <div className="text-green-100 text-sm">
              {t("statistics.readersLabel")}
            </div>
          </div>
          <div className="bg-gradient-to-br from-orange-500 to-orange-600 rounded-2xl p-6 text-white text-center">
            <div className="text-3xl font-bold mb-2">
              {t("statistics.experts")}
            </div>
            <div className="text-orange-100 text-sm">
              {t("statistics.expertsLabel")}
            </div>
          </div>
          <div className="bg-gradient-to-br from-purple-500 to-purple-600 rounded-2xl p-6 text-white text-center">
            <div className="text-3xl font-bold mb-2">
              {t("statistics.updates")}
            </div>
            <div className="text-purple-100 text-sm">
              {t("statistics.updatesLabel")}
            </div>
          </div>
        </div>
      </section>

      {/* 9. Теми, які ми висвітлюємо */}
      <section className="space-y-8">
        <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 relative inline-block">
          {t("topicsWeCoverTitle")}
          <div className="absolute -bottom-2 left-0 w-20 h-1 bg-gradient-to-r from-blue-500 to-yellow-400 rounded-full" />
        </h2>

        <div className="bg-white rounded-3xl shadow-xl p-8">
          <div className="grid md:grid-cols-2 gap-8">
            <div className="space-y-4">
              <h3 className="font-semibold text-gray-800 text-xl flex items-center gap-3">
                <FileText className="w-6 h-6 text-blue-500" />
                {t("topicsWeCover.banking.title")}
              </h3>
              <p className="text-gray-700 leading-relaxed">
                {t("topicsWeCover.banking.description")}
              </p>
            </div>

            <div className="space-y-4">
              <h3 className="font-semibold text-gray-800 text-xl flex items-center gap-3">
                <TrendingUp className="w-6 h-6 text-green-500" />
                {t("topicsWeCover.investing.title")}
              </h3>
              <p className="text-gray-700 leading-relaxed">
                {t("topicsWeCover.investing.description")}
              </p>
            </div>

            <div className="space-y-4">
              <h3 className="font-semibold text-gray-800 text-xl flex items-center gap-3">
                <Shield className="w-6 h-6 text-purple-500" />
                {t("topicsWeCover.insurance.title")}
              </h3>
              <p className="text-gray-700 leading-relaxed">
                {t("topicsWeCover.insurance.description")}
              </p>
            </div>

            <div className="space-y-4">
              <h3 className="font-semibold text-gray-800 text-xl flex items-center gap-3">
                <Users className="w-6 h-6 text-orange-500" />
                {t("topicsWeCover.personal.title")}
              </h3>
              <p className="text-gray-700 leading-relaxed">
                {t("topicsWeCover.personal.description")}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 10. CTA */}
      <section className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-3xl p-8 text-white text-center space-y-6">
        <h2 className="text-2xl sm:text-3xl font-bold mb-4">{t("ctaTitle")}</h2>

        <div className="max-w-3xl mx-auto space-y-4 text-lg text-blue-100">
          <p dangerouslySetInnerHTML={{ __html: t.raw("cta.text1") }} />
          <p dangerouslySetInnerHTML={{ __html: t.raw("cta.text2") }} />
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-6">
        <ScrollToTopButton text={t("cta.button")} />

          <div className="flex items-center gap-2 text-blue-200">
            <BookOpen className="w-5 h-5" />
            <span className="text-sm">{t("cta.freeAccess")}</span>
          </div>
        </div>
      </section>
    </div>
  );
}
