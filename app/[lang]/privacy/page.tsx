import { getTranslations } from "next-intl/server";
import { Metadata } from "next";
export const dynamic = "force-dynamic";

type PrivacyPageProps = {
  params: Promise<{ lang: string }>;
};

// Генерация метаданных
export async function generateMetadata({
  params,
}: PrivacyPageProps): Promise<Metadata> {
  const { lang } = await params;
  const t = await getTranslations({ locale: lang, namespace: "PrivacyPage" });

  return {
    title: t("title"),
    description: t("description"),
    openGraph: {
      title: t("title"),
      description: t("description"),
      url: `https://groshi-zaraz.vercel.app/${lang}/privacy`,
      siteName: "Фіногляд",
      locale: lang === "uk" ? "uk_UA" : "ru_RU",
      type: "website",
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

        <div className="space-y-6">
          <section>
            <h2 className="text-xl font-bold text-gray-800 mb-4">
              {t("sections.general.title")}
            </h2>
            <p className="text-gray-600 leading-relaxed mb-4">
              {t("sections.general.text1")}
            </p>
            <p className="text-gray-600 leading-relaxed">
              {t("sections.general.text2")}
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-gray-800 mb-4">
              {t("sections.dataCollected.title")}
            </h2>
            <div className="bg-gray-50 rounded-xl p-6">
              <h3 className="font-semibold text-gray-800 mb-3">
                {t("sections.dataCollected.personal.title")}
              </h3>
              <ul className="space-y-2 text-gray-600">
                {t
                  .raw("sections.dataCollected.personal.items")
                  .map((item: string, index: number) => (
                    <li key={index}>• {item}</li>
                  ))}
              </ul>
            </div>
            <div className="bg-blue-50 rounded-xl p-6 mt-4">
              <h3 className="font-semibold text-gray-800 mb-3">
                {t("sections.dataCollected.technical.title")}
              </h3>
              <ul className="space-y-2 text-gray-600">
                {t
                  .raw("sections.dataCollected.technical.items")
                  .map((item: string, index: number) => (
                    <li key={index}>• {item}</li>
                  ))}
              </ul>
            </div>
          </section>

          <section>
            <h2 className="text-xl font-bold text-gray-800 mb-4">
              {t("sections.purpose.title")}
            </h2>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="bg-white border-2 border-blue-100 rounded-xl p-6">
                <h3 className="font-semibold text-gray-800 mb-3">
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
                <h3 className="font-semibold text-gray-800 mb-3">
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

          <section>
            <h2 className="text-xl font-bold text-gray-800 mb-4">
              {t("sections.dataSharing.title")}
            </h2>
            <div className="bg-yellow-50 rounded-xl p-6">
              <h3 className="font-semibold text-gray-800 mb-3">
                {t("sections.dataSharing.subtitle")}
              </h3>
              <ul className="space-y-2 text-gray-600">
                {t
                  .raw("sections.dataSharing.items")
                  .map((item: string, index: number) => (
                    <li key={index}>• {item}</li>
                  ))}
              </ul>
              <p className="text-gray-600 mt-4 text-sm">
                {t("sections.dataSharing.note")}
              </p>
            </div>
          </section>

          <section>
            <h2 className="text-xl font-bold text-gray-800 mb-4">
              {t("sections.dataProtection.title")}
            </h2>
            <p className="text-gray-600 leading-relaxed mb-4">
              {t("sections.dataProtection.text")}
            </p>
            <div className="bg-gradient-to-r from-green-50 to-blue-50 rounded-xl p-6">
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <h3 className="font-semibold text-gray-800 mb-2">
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
                  <h3 className="font-semibold text-gray-800 mb-2">
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
          </section>

          <section>
            <h2 className="text-xl font-bold text-gray-800 mb-4">
              {t("sections.rights.title")}
            </h2>
            <div className="bg-white border-2 border-gray-100 rounded-xl p-6">
              <p className="text-gray-600 mb-4">{t("sections.rights.text")}</p>
              <ul className="space-y-2 text-gray-600">
                {t
                  .raw("sections.rights.items")
                  .map((item: string, index: number) => (
                    <li key={index}>• {item}</li>
                  ))}
              </ul>
            </div>
          </section>

          <section>
            <h2 className="text-xl font-bold text-gray-800 mb-4">
              {t("sections.cookies.title")}
            </h2>
            <div className="bg-purple-50 rounded-xl p-6">
              <p className="text-gray-600 mb-4">{t("sections.cookies.text")}</p>
              <ul className="space-y-2 text-gray-600">
                {t
                  .raw("sections.cookies.items")
                  .map((item: string, index: number) => (
                    <li key={index}>• {item}</li>
                  ))}
              </ul>
              <p className="text-gray-600 mt-4 text-sm">
                {t("sections.cookies.note")}
              </p>
            </div>
          </section>

          <section>
            <h2 className="text-xl font-bold text-gray-800 mb-4">
              {t("sections.contact.title")}
            </h2>
            <div className="bg-blue-50 rounded-xl p-6">
              <p className="text-gray-600 mb-4">{t("sections.contact.text")}</p>
              <div className="space-y-2 text-gray-600">
                <p>
                  <strong>{t("sections.contact.emailLabel")}:</strong>{" "}
                  privacy@Фіногляд.ua
                </p>
                <p>
                  <strong>{t("sections.contact.phoneLabel")}:</strong> +38 (044)
                  555-77-99
                </p>
                <p>
                  <strong>{t("sections.contact.chatLabel")}:</strong>{" "}
                  {t("sections.contact.chatText")}
                </p>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
