import { Metadata } from "next";
import { getTranslations } from "next-intl/server";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const { lang } = await params;

  const isUa = lang === "uk";

  const title = isUa
    ? "Умови користування сервісом — Фіногляд"
    : "Условия использования сервиса — Финогляд";

  const description = isUa
    ? "Ознайомтесь з умовами користування сервісом Фіногляд: правила, обовʼязки користувачів та обмеження відповідальності."
    : "Ознакомьтесь с условиями использования сервиса Финогляд: правила, обязанности пользователей и ограничения ответственности.";

  const url = isUa
    ? "https://groshi-zaraz.vercel.app/uk/terms"
    : "https://groshi-zaraz.vercel.app/ru/terms";

  const defaultImage =
    "https://groshi-zaraz.vercel.app/default-og-image.jpg";

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      url,
      siteName: "Фіногляд",
      locale: isUa ? "uk_UA" : "ru_RU",
      type: "article",
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
      site: "@Finoglyad",
      creator: "@Finoglyad",
    },
    robots: {
      index: true,
      follow: true,
    },
  };
}
export default async function TermsPage({
  params,
}: {
  params: Promise<{ lang: string; slug: string }>;
}) {
  const { lang } = await params;
  const t = await getTranslations({ locale: lang, namespace: "TermsPage" });

  return (
    <div className="space-y-8">
      <div className="bg-white rounded-2xl shadow-md p-8 border border-gray-100">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">{t("title")}</h1>
        <p className="text-gray-600 mb-6">{t("lastUpdate")}</p>

        <div className="space-y-6">
          {/* Section 1 */}
          <section>
            <h2 className="text-xl font-bold text-gray-800 mb-4">
              {t("section1.title")}
            </h2>
            <p className="text-gray-600 leading-relaxed mb-4">
              {t("section1.paragraph1")}
            </p>
            <p className="text-gray-600 leading-relaxed">
              {t("section1.paragraph2")}
            </p>
          </section>

          {/* Section 2 */}
          <section>
            <h2 className="text-xl font-bold text-gray-800 mb-4">
              {t("section2.title")}
            </h2>
            <div className="bg-blue-50 rounded-xl p-6">
              <h3 className="font-semibold text-gray-800 mb-3">
                {t("section2.subtitle")}
              </h3>
              <ul className="space-y-2 text-gray-600">
                <li>• {t("section2.item1")}</li>
                <li>• {t("section2.item2")}</li>
                <li>• {t("section2.item3")}</li>
                <li>• {t("section2.item4")}</li>
                <li>• {t("section2.item5")}</li>
              </ul>
            </div>
          </section>

          {/* Section 3 */}
          <section>
            <h2 className="text-xl font-bold text-gray-800 mb-4">
              {t("section3.title")}
            </h2>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="bg-white border-2 border-green-100 rounded-xl p-6">
                <h3 className="font-semibold text-gray-800 mb-3">
                  {t("section3.userRequirements.title")}
                </h3>
                <ul className="space-y-2 text-gray-600 text-sm">
                  <li>• {t("section3.userRequirements.item1")}</li>
                  <li>• {t("section3.userRequirements.item2")}</li>
                  <li>• {t("section3.userRequirements.item3")}</li>
                  <li>• {t("section3.userRequirements.item4")}</li>
                </ul>
              </div>
              <div className="bg-white border-2 border-orange-100 rounded-xl p-6">
                <h3 className="font-semibold text-gray-800 mb-3">
                  {t("section3.userResponsibility.title")}
                </h3>
                <ul className="space-y-2 text-gray-600 text-sm">
                  <li>• {t("section3.userResponsibility.item1")}</li>
                  <li>• {t("section3.userResponsibility.item2")}</li>
                  <li>• {t("section3.userResponsibility.item3")}</li>
                  <li>• {t("section3.userResponsibility.item4")}</li>
                </ul>
              </div>
            </div>
          </section>

          {/* Section 4 */}
          <section>
            <h2 className="text-xl font-bold text-gray-800 mb-4">
              {t("section4.title")}
            </h2>
            <div className="bg-red-50 rounded-xl p-6">
              <h3 className="font-semibold text-gray-800 mb-3">
                {t("section4.subtitle")}
              </h3>
              <ul className="space-y-2 text-gray-600">
                <li>• {t("section4.item1")}</li>
                <li>• {t("section4.item2")}</li>
                <li>• {t("section4.item3")}</li>
                <li>• {t("section4.item4")}</li>
                <li>• {t("section4.item5")}</li>
                <li>• {t("section4.item6")}</li>
              </ul>
            </div>
          </section>

          {/* Section 5 */}
          <section>
            <h2 className="text-xl font-bold text-gray-800 mb-4">
              {t("section5.title")}
            </h2>
            <div className="bg-yellow-50 rounded-xl p-6">
              <div className="mb-4">
                <h3 className="font-semibold text-gray-800 mb-3">
                  {t("section5.subtitle")}
                </h3>
                <ul className="space-y-2 text-gray-600">
                  <li>• {t("section5.item1")}</li>
                  <li>• {t("section5.item2")}</li>
                  <li>• {t("section5.item3")}</li>
                  <li>• {t("section5.item4")}</li>
                </ul>
              </div>
              <p className="text-gray-600 text-sm">{t("section5.footer")}</p>
            </div>
          </section>

          {/* Section 6 */}
          <section>
            <h2 className="text-xl font-bold text-gray-800 mb-4">
              {t("section6.title")}
            </h2>
            <div className="bg-purple-50 rounded-xl p-6">
              <p className="text-gray-600 mb-4">{t("section6.intro")}</p>
              <h3 className="font-semibold text-gray-800 mb-3">
                {t("section6.allowed.title")}
              </h3>
              <ul className="space-y-2 text-gray-600">
                <li>• {t("section6.allowed.item1")}</li>
                <li>• {t("section6.allowed.item2")}</li>
              </ul>
              <h3 className="font-semibold text-gray-800 mb-3 mt-4">
                {t("section6.prohibited.title")}
              </h3>
              <ul className="space-y-2 text-gray-600">
                <li>• {t("section6.prohibited.item1")}</li>
                <li>• {t("section6.prohibited.item2")}</li>
                <li>• {t("section6.prohibited.item3")}</li>
              </ul>
            </div>
          </section>

          {/* Section 7 */}
          <section>
            <h2 className="text-xl font-bold text-gray-800 mb-4">
              {t("section7.title")}
            </h2>
            <div className="bg-gray-50 rounded-xl p-6">
              <h3 className="font-semibold text-gray-800 mb-3">
                {t("section7.subtitle")}
              </h3>
              <ul className="space-y-2 text-gray-600">
                <li>• {t("section7.item1")}</li>
                <li>• {t("section7.item2")}</li>
                <li>• {t("section7.item3")}</li>
                <li>• {t("section7.item4")}</li>
                <li>• {t("section7.item5")}</li>
              </ul>
              <p className="text-gray-600 mt-4 text-sm">
                {t("section7.footer")}
              </p>
            </div>
          </section>

          {/* Section 8 */}
          <section>
            <h2 className="text-xl font-bold text-gray-800 mb-4">
              {t("section8.title")}
            </h2>
            <div className="bg-green-50 rounded-xl p-6">
              <h3 className="font-semibold text-gray-800 mb-3">
                {t("section8.subtitle")}
              </h3>
              <ul className="space-y-2 text-gray-600">
                <li>• {t("section8.item1")}</li>
                <li>• {t("section8.item2")}</li>
                <li>• {t("section8.item3")}</li>
                <li>• {t("section8.item4")}</li>
              </ul>
              <p className="text-gray-600 mt-4 text-sm">
                {t("section8.footer")}
              </p>
            </div>
          </section>

          {/* Section 9 */}
          <section>
            <h2 className="text-xl font-bold text-gray-800 mb-4">
              {t("section9.title")}
            </h2>
            <div className="bg-blue-50 rounded-xl p-6">
              <p className="text-gray-600 mb-4">{t("section9.intro")}</p>
              <ul className="space-y-2 text-gray-600">
                <li>• {t("section9.item1")}</li>
                <li>• {t("section9.item2")}</li>
                <li>• {t("section9.item3")}</li>
              </ul>
              <p className="text-gray-600 mt-4 text-sm">
                {t("section9.footer")}
              </p>
            </div>
          </section>

          {/* Section 10 */}
          <section>
            <h2 className="text-xl font-bold text-gray-800 mb-4">
              {t("section10.title")}
            </h2>
            <div className="bg-orange-50 rounded-xl p-6">
              <h3 className="font-semibold text-gray-800 mb-3">
                {t("section10.userCan.title")}
              </h3>
              <ul className="space-y-2 text-gray-600">
                <li>• {t("section10.userCan.item1")}</li>
                <li>• {t("section10.userCan.item2")}</li>
                <li>• {t("section10.userCan.item3")}</li>
              </ul>
              <h3 className="font-semibold text-gray-800 mb-3 mt-4">
                {t("section10.weCan.title")}
              </h3>
              <ul className="space-y-2 text-gray-600">
                <li>• {t("section10.weCan.item1")}</li>
                <li>• {t("section10.weCan.item2")}</li>
                <li>• {t("section10.weCan.item3")}</li>
              </ul>
            </div>
          </section>

          {/* Section 11 */}
          <section>
            <h2 className="text-xl font-bold text-gray-800 mb-4">
              {t("section11.title")}
            </h2>
            <div className="bg-blue-50 rounded-xl p-6">
              <p className="text-gray-600 mb-4">{t("section11.intro")}</p>
              <div className="space-y-2 text-gray-600">
                <p>
                  <strong>{t("section11.email")}:</strong> support@Фіногляд.ua
                </p>
                <p>
                  <strong>{t("section11.phone")}:</strong> +38 (044) 555-77-99
                </p>
                <p>
                  <strong>{t("section11.chat")}:</strong>{" "}
                  {t("section11.chatValue")}
                </p>
                <p>
                  <strong>{t("section11.address")}:</strong>{" "}
                  {t("section11.addressValue")}
                </p>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
