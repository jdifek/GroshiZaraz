import { getTranslations } from "next-intl/server";
import { Metadata } from "next";
export const dynamic = "force-dynamic";

type PrivacyPageProps = {
  params: Promise<{ lang: string }>;
};

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const { lang } = await params;
  const t = await getTranslations({ locale: lang, namespace: "PrivacyPage" });

  const baseUrl = "https://finoglyad.com.ua";
  const currentUrl = `${baseUrl}/${lang}/privacy`;

  const title = t("meta.title");
  const description = t("meta.description");
  const keywords = t("meta.keywords");

  const defaultImage = `${baseUrl}/default-og-image.jpg`;

  return {
    title,
    description,
    keywords,

    robots: {
      index: true,
      follow: true,
    },

    openGraph: {
      title,
      description,
      url: currentUrl,
      type: "article",
      siteName: "Фіногляд",
      locale: lang === "uk" ? "uk_UA" : "ru_UA",
      images: [
        {
          url: defaultImage,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
    },

    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [defaultImage],
      site: "@finoglyad",
      creator: "@finoglyad",
    },

    alternates: {
      canonical: currentUrl,
      languages: {
        uk: `${baseUrl}/uk/privacy`,
        ru: `${baseUrl}/ru/privacy`,
      },
    },
  };
}

export default async function PrivacyPage({ params }: PrivacyPageProps) {
  const { lang } = await params;
  const t = await getTranslations({ locale: lang, namespace: "PrivacyPage" });

  return (
    <div className="space-y-8">
      <div className="bg-white rounded-2xl shadow-md p-8 border border-gray-100">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">{t("title")}</h1>
        <p className="text-gray-600 mb-6">{t("lastUpdated")}</p>

        <div className="space-y-8">
          {/* 1. General */}
          <section>
            <h2 className="text-2xl font-bold text-gray-800 mb-4">
              {t("sections.general.title")}
            </h2>
            <div className="space-y-4 text-gray-600 leading-relaxed">
              <p>{t("sections.general.text1")}</p>
              <p>{t("sections.general.text2")}</p>
              <p>{t("sections.general.text3")}</p>
            </div>
          </section>

          {/* 2. Data Collected */}
          <section>
            <h2 className="text-2xl font-bold text-gray-800 mb-4">
              {t("sections.dataCollected.title")}
            </h2>
            <p className="text-gray-600 mb-4">{t("sections.dataCollected.intro")}</p>
            
            <div className="space-y-4">
              <div className="bg-gray-50 rounded-xl p-6">
                <h3 className="text-lg font-semibold text-gray-800 mb-3">
                  {t("sections.dataCollected.personal.title")}
                </h3>
                <ul className="space-y-2 text-gray-600 text-sm">
                  {t
                    .raw("sections.dataCollected.personal.items")
                    .map((item: string, index: number) => (
                      <li key={index}>• {item}</li>
                    ))}
                </ul>
              </div>
              
              <div className="bg-blue-50 rounded-xl p-6">
                <h3 className="text-lg font-semibold text-gray-800 mb-3">
                  {t("sections.dataCollected.technical.title")}
                </h3>
                <ul className="space-y-2 text-gray-600 text-sm">
                  {t
                    .raw("sections.dataCollected.technical.items")
                    .map((item: string, index: number) => (
                      <li key={index}>• {item}</li>
                    ))}
                </ul>
              </div>
            </div>
          </section>

          {/* 3. Purpose */}
          <section>
            <h2 className="text-2xl font-bold text-gray-800 mb-4">
              {t("sections.purpose.title")}
            </h2>
            <p className="text-gray-600 mb-4">{t("sections.purpose.intro")}</p>
            
            <div className="grid md:grid-cols-2 gap-4">
              <div className="bg-white border-2 border-blue-100 rounded-xl p-6">
                <h3 className="text-lg font-semibold text-gray-800 mb-3">
                  {t("sections.purpose.primary.title")}
                </h3>
                <ul className="space-y-2 text-gray-600 text-sm">
                  {t
                    .raw("sections.purpose.primary.items")
                    .map((item: string, index: number) => (
                      <li key={index}>• {item}</li>
                    ))}
                </ul>
              </div>
              
              <div className="bg-white border-2 border-yellow-100 rounded-xl p-6">
                <h3 className="text-lg font-semibold text-gray-800 mb-3">
                  {t("sections.purpose.secondary.title")}
                </h3>
                <ul className="space-y-2 text-gray-600 text-sm">
                  {t
                    .raw("sections.purpose.secondary.items")
                    .map((item: string, index: number) => (
                      <li key={index}>• {item}</li>
                    ))}
                </ul>
              </div>
            </div>
          </section>

          {/* 4. Data Sharing */}
          <section>
            <h2 className="text-2xl font-bold text-gray-800 mb-4">
              {t("sections.dataSharing.title")}
            </h2>
            <p className="text-gray-600 mb-4">{t("sections.dataSharing.intro")}</p>
            
            <div className="bg-yellow-50 rounded-xl p-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-3">
                {t("sections.dataSharing.subtitle")}
              </h3>
              <ul className="space-y-2 text-gray-600 text-sm">
                {t
                  .raw("sections.dataSharing.items")
                  .map((item: string, index: number) => (
                    <li key={index}>• {item}</li>
                  ))}
              </ul>
              <p className="text-gray-700 mt-4 font-medium">
                {t("sections.dataSharing.note")}
              </p>
            </div>
          </section>

          {/* 5. Third Party Services - NEW */}
          <section>
            <h2 className="text-2xl font-bold text-gray-800 mb-4">
              {t("sections.thirdPartyServices.title")}
            </h2>
            <p className="text-gray-600 mb-4">{t("sections.thirdPartyServices.intro")}</p>
            
            <div className="space-y-4">
              <div className="bg-purple-50 rounded-xl p-6">
                <h3 className="text-lg font-semibold text-gray-800 mb-3">
                  {t("sections.thirdPartyServices.services.analytics.title")}
                </h3>
                <ul className="space-y-2 text-gray-600 text-sm">
                  {t
                    .raw("sections.thirdPartyServices.services.analytics.items")
                    .map((item: string, index: number) => (
                      <li key={index}>• {item}</li>
                    ))}
                </ul>
              </div>

              <div className="bg-green-50 rounded-xl p-6">
                <h3 className="text-lg font-semibold text-gray-800 mb-3">
                  {t("sections.thirdPartyServices.services.communication.title")}
                </h3>
                <ul className="space-y-2 text-gray-600 text-sm">
                  {t
                    .raw("sections.thirdPartyServices.services.communication.items")
                    .map((item: string, index: number) => (
                      <li key={index}>• {item}</li>
                    ))}
                </ul>
              </div>

              <div className="bg-blue-50 rounded-xl p-6">
                <h3 className="text-lg font-semibold text-gray-800 mb-3">
                  {t("sections.thirdPartyServices.services.infrastructure.title")}
                </h3>
                <ul className="space-y-2 text-gray-600 text-sm">
                  {t
                    .raw("sections.thirdPartyServices.services.infrastructure.items")
                    .map((item: string, index: number) => (
                      <li key={index}>• {item}</li>
                    ))}
                </ul>
              </div>

              <p className="text-gray-600 text-sm italic">{t("sections.thirdPartyServices.note")}</p>
            </div>
          </section>

          {/* 6. Data Protection */}
          <section>
            <h2 className="text-2xl font-bold text-gray-800 mb-4">
              {t("sections.dataProtection.title")}
            </h2>
            <div className="space-y-4">
              <p className="text-gray-600 leading-relaxed">{t("sections.dataProtection.text")}</p>
              <p className="text-gray-600 leading-relaxed">{t("sections.dataProtection.intro")}</p>
              
              <div className="bg-gradient-to-r from-green-50 to-blue-50 rounded-xl p-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-800 mb-3">
                      {t("sections.dataProtection.technical.title")}
                    </h3>
                    <ul className="space-y-1 text-gray-600 text-sm">
                      {t
                        .raw("sections.dataProtection.technical.items")
                        .map((item: string, index: number) => (
                          <li key={index}>• {item}</li>
                        ))}
                    </ul>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-800 mb-3">
                      {t("sections.dataProtection.organizational.title")}
                    </h3>
                    <ul className="space-y-1 text-gray-600 text-sm">
                      {t
                        .raw("sections.dataProtection.organizational.items")
                        .map((item: string, index: number) => (
                          <li key={index}>• {item}</li>
                        ))}
                    </ul>
                  </div>
                </div>
              </div>
              
              <p className="text-gray-600 text-sm italic">{t("sections.dataProtection.note")}</p>
            </div>
          </section>

          {/* 7. User Rights */}
          <section>
            <h2 className="text-2xl font-bold text-gray-800 mb-4">
              {t("sections.rights.title")}
            </h2>
            <div className="bg-white border-2 border-gray-100 rounded-xl p-6">
              <p className="text-gray-600 mb-4 leading-relaxed">{t("sections.rights.text")}</p>
              <ul className="space-y-2 text-gray-600">
                {t
                  .raw("sections.rights.items")
                  .map((item: string, index: number) => (
                    <li key={index} className="pl-4 border-l-2 border-blue-400">
                      {item}
                    </li>
                  ))}
              </ul>
              <p className="text-gray-700 mt-6 font-medium">{t("sections.rights.howToExercise")}</p>
            </div>
          </section>

          {/* 8. GDPR Compliance - NEW */}
          <section>
            <h2 className="text-2xl font-bold text-gray-800 mb-4">
              {t("sections.gdpr.title")}
            </h2>
            <div className="space-y-4">
              <p className="text-gray-600 leading-relaxed">{t("sections.gdpr.intro")}</p>
              
              <div className="bg-indigo-50 rounded-xl p-6">
                <h3 className="text-lg font-semibold text-gray-800 mb-3">
                  {t("sections.gdpr.principles.title")}
                </h3>
                <ul className="space-y-2 text-gray-600 text-sm">
                  {t
                    .raw("sections.gdpr.principles.items")
                    .map((item: string, index: number) => (
                      <li key={index}>• {item}</li>
                    ))}
                </ul>
              </div>
              
              <p className="text-gray-600 leading-relaxed">{t("sections.gdpr.transfers")}</p>
              <p className="text-gray-600 leading-relaxed">{t("sections.gdpr.dpo")}</p>
            </div>
          </section>

          {/* 9. Cookies - EXPANDED */}
          <section>
            <h2 className="text-2xl font-bold text-gray-800 mb-4">
              {t("sections.cookies.title")}
            </h2>
            <div className="space-y-4">
              <p className="text-gray-600 leading-relaxed">{t("sections.cookies.text")}</p>
              
              <div className="space-y-3">
                <h3 className="text-lg font-semibold text-gray-800">
                  {t("sections.cookies.types.title")}
                </h3>
                
                <div className="bg-red-50 border-l-4 border-red-400 rounded-r-xl p-4">
                  <h4 className="font-semibold text-gray-800 mb-2">
                    {t("sections.cookies.types.essential.name")}
                  </h4>
                  <p className="text-gray-600 text-sm">
                    {t("sections.cookies.types.essential.description")}
                  </p>
                </div>

                <div className="bg-blue-50 border-l-4 border-blue-400 rounded-r-xl p-4">
                  <h4 className="font-semibold text-gray-800 mb-2">
                    {t("sections.cookies.types.functional.name")}
                  </h4>
                  <p className="text-gray-600 text-sm">
                    {t("sections.cookies.types.functional.description")}
                  </p>
                </div>

                <div className="bg-yellow-50 border-l-4 border-yellow-400 rounded-r-xl p-4">
                  <h4 className="font-semibold text-gray-800 mb-2">
                    {t("sections.cookies.types.analytics.name")}
                  </h4>
                  <p className="text-gray-600 text-sm">
                    {t("sections.cookies.types.analytics.description")}
                  </p>
                </div>

                <div className="bg-purple-50 border-l-4 border-purple-400 rounded-r-xl p-4">
                  <h4 className="font-semibold text-gray-800 mb-2">
                    {t("sections.cookies.types.marketing.name")}
                  </h4>
                  <p className="text-gray-600 text-sm">
                    {t("sections.cookies.types.marketing.description")}
                  </p>
                </div>
              </div>

              <div className="bg-gray-50 rounded-xl p-6 space-y-3">
                <p className="text-gray-600 text-sm">{t("sections.cookies.management")}</p>
                <p className="text-gray-600 text-sm">{t("sections.cookies.thirdParty")}</p>
                <p className="text-gray-600 text-sm font-medium">{t("sections.cookies.consent")}</p>
              </div>
            </div>
          </section>

          {/* 10. Data Retention - NEW */}
          <section>
            <h2 className="text-2xl font-bold text-gray-800 mb-4">
              {t("sections.retention.title")}
            </h2>
            <div className="space-y-4">
              <p className="text-gray-600 leading-relaxed">{t("sections.retention.intro")}</p>
              
              <div className="bg-gradient-to-br from-orange-50 to-yellow-50 rounded-xl p-6">
                <div className="space-y-3">
                  <div className="flex items-start gap-3">
                    <span className="text-2xl">📅</span>
                    <div>
                      <p className="text-gray-700 font-medium">{t("sections.retention.periods.active")}</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="text-2xl">⏱️</span>
                    <div>
                      <p className="text-gray-700 font-medium">{t("sections.retention.periods.inactive")}</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="text-2xl">📋</span>
                    <div>
                      <p className="text-gray-700 font-medium">{t("sections.retention.periods.applications")}</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="text-2xl">📧</span>
                    <div>
                      <p className="text-gray-700 font-medium">{t("sections.retention.periods.marketing")}</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="text-2xl">⚖️</span>
                    <div>
                      <p className="text-gray-700 font-medium">{t("sections.retention.periods.legal")}</p>
                    </div>
                  </div>
                </div>
              </div>
              
              <p className="text-gray-600">{t("sections.retention.deletion")}</p>
            </div>
          </section>

          {/* 11. Contact */}
          <section>
            <h2 className="text-2xl font-bold text-gray-800 mb-4">
              {t("sections.contact.title")}
            </h2>
            <div className="bg-blue-50 rounded-xl p-6">
              <p className="text-gray-600 mb-6 leading-relaxed">{t("sections.contact.text")}</p>
              <div className="space-y-3 text-gray-700">
                <p>
                  <strong>{t("sections.contact.emailLabel")}:</strong>{" "}
                  <a href="mailto:finoglyad@gmail.com" className="text-blue-600 hover:underline">
                    finoglyad@gmail.com
                  </a>
                </p>
                <p>
                  <strong>{t("sections.contact.phoneLabel")}:</strong>{" "}
                  <a href="tel:+380443557799" className="text-blue-600 hover:underline">
                    +38 (044) 555-77-99
                  </a>
                </p>
                <p>
                  <strong>{t("sections.contact.chatLabel")}:</strong>{" "}
                  {t("sections.contact.chatText")}
                </p>
                <p>
                  <strong>{t("sections.contact.address")}</strong>
                </p>
              </div>
              <p className="text-gray-600 mt-6 text-sm italic">{t("sections.contact.response")}</p>
            </div>
          </section>

          {/* 12. Changes - NEW */}
          <section>
            <h2 className="text-2xl font-bold text-gray-800 mb-4">
              {t("sections.changes.title")}
            </h2>
            <div className="bg-gradient-to-r from-gray-50 to-blue-50 rounded-xl p-6 space-y-4">
              <p className="text-gray-600 leading-relaxed">{t("sections.changes.text")}</p>
              <p className="text-gray-600 leading-relaxed">{t("sections.changes.notification")}</p>
              <p className="text-gray-700 font-medium">{t("sections.changes.check")}</p>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}