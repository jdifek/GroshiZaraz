import { BlueButton } from "@/app/ui/Buttons/BlueButton";
import { getTranslations } from "next-intl/server";
import type { Metadata } from "next";

type Props = {
  params: Promise<{ lang: string }>;
};
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { lang: rawLang } = await params;
  const lang = rawLang === "ru" || rawLang === "uk" ? rawLang : "uk";

  let t;
  try {
    t = await getTranslations({ locale: lang, namespace: "AboutPage" });
  } catch (e) {
    console.error(`Translations not found for ${lang}, fallback to uk`, e);
    t = await getTranslations({ locale: "uk", namespace: "AboutPage" });
  }
  try {
    const title = t("meta.title") ?? "Про компанію — Фіногляд";
    const description =
      t("meta.description") ??
      "Дізнайтеся більше про нашу компанію та цінності.";
    const keywords =
      t("meta.keywords") ?? "Фіногляд, компанія, кредити, фінанси, послуги";

    return {
      title,
      description,
      keywords,
      robots: "index, follow",
      alternates: {
        canonical: `https://finoglyad.com.ua/${lang}/about`,
        languages: {
          "uk-UA": `https://finoglyad.com.ua/uk/about`,
          "ru-UA": `https://finoglyad.com.ua/ru/about`,
          "x-default": `https://finoglyad.com.ua/about`,
        },
      },
      openGraph: {
        title,
        description,
        url: `https://finoglyad.com.ua/${lang}/about`,
        siteName: "Фіногляд",
        type: "website",
        locale: lang === "uk" ? "uk_UA" : "ru_UA",
      },
      twitter: {
        card: "summary_large_image",
        title,
        description,
        site: "@finoglyad",
      },
    };
  } catch (error) {
    console.error("generateMetadata AboutPage failed:", error);

    const fallback =
      rawLang === "ru"
        ? {
            title: "О компании — Финогляд",
            description: "Информация о компании Финогляд.",
          }
        : {
            title: "Про компанію — Фіногляд",
            description: "Інформація про компанію Фіногляд.",
          };

    return {
      ...fallback,
      robots: "noindex, follow",
    };
  }
}

export default async function AboutPage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;

  const t = await getTranslations({ locale: lang, namespace: "AboutPage" });

  return (
    <div className="space-y-12">
      {/* Hero Section */}
      <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl p-8 md:p-12 text-white">
        <div className="max-w-4xl">
          <h1 className="text-3xl !text-blue-100 md:text-4xl font-bold mb-4">
            {t("hero.title")}
          </h1>
          <p className="text-xl text-blue-100 leading-relaxed">
            {t("hero.description")}
          </p>
        </div>
      </div>

      {/* Mission Section */}
      <div className="grid md:grid-cols-2 gap-8">
        <div className="bg-white rounded-2xl shadow-md p-8 border border-gray-100">
          <div className="text-4xl mb-4">🎯</div>
          <h2 className="text-2xl font-bold text-gray-800 mb-4">
            {t("mission.title")}
          </h2>
          <p className="text-gray-600 leading-relaxed">
            {t("mission.description")}
          </p>
        </div>

        <div className="bg-white rounded-2xl shadow-md p-8 border border-gray-100">
          <div className="text-4xl mb-4">👁️</div>
          <h2 className="text-2xl font-bold text-gray-800 mb-4">
            {t("vision.title")}
          </h2>
          <p className="text-gray-600 leading-relaxed">
            {t("vision.description")}
          </p>
        </div>
      </div>

      {/* Why Choose Us Section */}
      <div className="bg-white rounded-2xl shadow-md p-8 border border-gray-100">
        <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
          {t("whyChoose.title")}
        </h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="text-center">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl">✓</span>
            </div>
            <h3 className="text-lg font-semibold text-gray-800 mb-2">
              {t("whyChoose.features.verified.title")}
            </h3>
            <p className="text-gray-600 text-sm">
              {t("whyChoose.features.verified.description")}
            </p>
          </div>
          <div className="text-center">
            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl">⚡</span>
            </div>
            <h3 className="text-lg font-semibold text-gray-800 mb-2">
              {t("whyChoose.features.fast.title")}
            </h3>
            <p className="text-gray-600 text-sm">
              {t("whyChoose.features.fast.description")}
            </p>
          </div>
          <div className="text-center">
            <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl">📊</span>
            </div>
            <h3 className="text-lg font-semibold text-gray-800 mb-2">
              {t("whyChoose.features.actualInfo.title")}
            </h3>
            <p className="text-gray-600 text-sm">
              {t("whyChoose.features.actualInfo.description")}
            </p>
          </div>
          <div className="text-center">
            <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl">🏆</span>
            </div>
            <h3 className="text-lg font-semibold text-gray-800 mb-2">
              {t("whyChoose.features.expertReviews.title")}
            </h3>
            <p className="text-gray-600 text-sm">
              {t("whyChoose.features.expertReviews.description")}
            </p>
          </div>
          <div className="text-center">
            <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl">🕐</span>
            </div>
            <h3 className="text-lg font-semibold text-gray-800 mb-2">
              {t("whyChoose.features.support.title")}
            </h3>
            <p className="text-gray-600 text-sm">
              {t("whyChoose.features.support.description")}
            </p>
          </div>
          <div className="text-center">
            <div className="w-16 h-16 bg-indigo-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl">🔒</span>
            </div>
            <h3 className="text-lg font-semibold text-gray-800 mb-2">
              {t("whyChoose.features.security.title")}
            </h3>
            <p className="text-gray-600 text-sm">
              {t("whyChoose.features.security.description")}
            </p>
          </div>
        </div>
      </div>

      {/* Values Section */}
      <div className="bg-white rounded-2xl shadow-md p-8 border border-gray-100">
        <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
          {t("values.title")}
        </h2>
        <div className="grid md:grid-cols-3 gap-6">
          <div className="text-center">
            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl">🤝</span>
            </div>
            <h3 className="text-lg font-semibold text-gray-800 mb-2">
              {t("values.items.transparency.title")}
            </h3>
            <p className="text-gray-600 text-sm">
              {t("values.items.transparency.description")}
            </p>
          </div>
          <div className="text-center">
            <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl">🎯</span>
            </div>
            <h3 className="text-lg font-semibold text-gray-800 mb-2">
              {t("values.items.personalization.title")}
            </h3>
            <p className="text-gray-600 text-sm">
              {t("values.items.personalization.description")}
            </p>
          </div>
          <div className="text-center">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl">💡</span>
            </div>
            <h3 className="text-lg font-semibold text-gray-800 mb-2">
              {t("values.items.innovation.title")}
            </h3>
            <p className="text-gray-600 text-sm">
              {t("values.items.innovation.description")}
            </p>
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="bg-gradient-to-r from-yellow-400 to-orange-400 rounded-2xl p-8 text-white">
        <h2 className="text-2xl font-bold mb-6 text-center">
          {t("stats.title")}
        </h2>
        <div className="grid md:grid-cols-4 gap-6 text-center">
          <div>
            <div className="text-3xl font-bold mb-2">
              {t("stats.items.years.value")}
            </div>
            <div className="text-sm opacity-90">
              {t("stats.items.years.label")}
            </div>
          </div>
          <div>
            <div className="text-3xl font-bold mb-2">
              {t("stats.items.clients.value")}
            </div>
            <div className="text-sm opacity-90">
              {t("stats.items.clients.label")}
            </div>
          </div>
          <div>
            <div className="text-3xl font-bold mb-2">
              {t("stats.items.partners.value")}
            </div>
            <div className="text-sm opacity-90">
              {t("stats.items.partners.label")}
            </div>
          </div>
          <div>
            <div className="text-3xl font-bold mb-2">
              {t("stats.items.support.value")}
            </div>
            <div className="text-sm opacity-90">
              {t("stats.items.support.label")}
            </div>
          </div>
        </div>
      </div>

      {/* How It Works Section */}
      <div className="bg-white rounded-2xl shadow-md p-8 border border-gray-100">
        <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
          {t("howItWorks.title")}
        </h2>
        <div className="grid md:grid-cols-4 gap-6">
          <div className="text-center">
            <div className="w-16 h-16 bg-blue-500 rounded-full flex items-center justify-center mx-auto mb-4 text-white font-bold text-xl">
              1
            </div>
            <h3 className="text-lg font-semibold text-gray-800 mb-2">
              {t("howItWorks.steps.step1.title")}
            </h3>
            <p className="text-gray-600 text-sm">
              {t("howItWorks.steps.step1.description")}
            </p>
          </div>
          <div className="text-center">
            <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4 text-white font-bold text-xl">
              2
            </div>
            <h3 className="text-lg font-semibold text-gray-800 mb-2">
              {t("howItWorks.steps.step2.title")}
            </h3>
            <p className="text-gray-600 text-sm">
              {t("howItWorks.steps.step2.description")}
            </p>
          </div>
          <div className="text-center">
            <div className="w-16 h-16 bg-yellow-500 rounded-full flex items-center justify-center mx-auto mb-4 text-white font-bold text-xl">
              3
            </div>
            <h3 className="text-lg font-semibold text-gray-800 mb-2">
              {t("howItWorks.steps.step3.title")}
            </h3>
            <p className="text-gray-600 text-sm">
              {t("howItWorks.steps.step3.description")}
            </p>
          </div>
          <div className="text-center">
            <div className="w-16 h-16 bg-purple-500 rounded-full flex items-center justify-center mx-auto mb-4 text-white font-bold text-xl">
              4
            </div>
            <h3 className="text-lg font-semibold text-gray-800 mb-2">
              {t("howItWorks.steps.step4.title")}
            </h3>
            <p className="text-gray-600 text-sm">
              {t("howItWorks.steps.step4.description")}
            </p>
          </div>
        </div>
      </div>

      {/* Contact Section */}
      <div className="bg-white rounded-2xl shadow-md p-8 border border-gray-100">
        <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
          {t("contact.title")}
        </h2>
        <div className="grid md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                <span className="text-lg">📧</span>
              </div>
              <div>
                <div className="font-semibold text-gray-800">
                  {t("contact.email.label")}
                </div>
                <div className="text-gray-600">{t("contact.email.value")}</div>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                <span className="text-lg">📞</span>
              </div>
              <div>
                <div className="font-semibold text-gray-800">
                  {t("contact.phone.label")}
                </div>
                <div className="text-gray-600">{t("contact.phone.value")}</div>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-yellow-100 rounded-full flex items-center justify-center">
                <span className="text-lg">💬</span>
              </div>
              <div>
                <div className="font-semibold text-gray-800">
                  {t("contact.chat.label")}
                </div>
                <div className="text-gray-600">{t("contact.chat.value")}</div>
              </div>
            </div>
          </div>
          <div className="bg-gray-50 rounded-xl p-6">
            <h3 className="font-semibold text-gray-800 mb-3">
              {t("contact.form.title")}
            </h3>
            <div className="space-y-3">
              <input
                type="text"
                placeholder={t("contact.form.namePlaceholder")}
                className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:border-blue-500 focus:outline-none"
              />
              <input
                type="email"
                placeholder={t("contact.form.emailPlaceholder")}
                className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:border-blue-500 focus:outline-none"
              />
              <textarea
                placeholder={t("contact.form.messagePlaceholder")}
                rows={3}
                className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:border-blue-500 focus:outline-none"
              />
              <BlueButton text={t("contact.form.submitButton")} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
