import { Metadata } from "next";
import { getTranslations } from "next-intl/server";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const { lang } = await params;
  const t = await getTranslations({ locale: lang, namespace: "TermsPage" });

  const baseUrl = "https://finoglyad.com.ua";
  const url = `${baseUrl}/${lang}/terms`;
  const title = t("meta.title");
  const description = t("meta.description");
  const keywords = t("meta.keywords");
  const defaultImage = `${baseUrl}/default-og-image.jpg`;

  return {
    title,
    description,
    keywords,
    openGraph: {
      title,
      description,
      url,
      siteName: "Фіногляд",
      locale: lang === "uk" ? "uk_UA" : "ru_RU",
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
    alternates: {
      canonical: url,
      languages: {
        uk: `${baseUrl}/uk/terms`,
        ru: `${baseUrl}/ru/terms`,
      },
    },
  };
}

export default async function TermsPage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  const t = await getTranslations({ locale: lang, namespace: "TermsPage" });

  return (
    <div className="space-y-8">
      <div className="bg-white rounded-2xl shadow-md p-8 border border-gray-100">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">{t("title")}</h1>
        <p className="text-gray-600 mb-8">{t("lastUpdate")}</p>

        <div className="space-y-8">
          {/* Section 1: General */}
          <section>
            <h2 className="text-2xl font-bold text-gray-800 mb-4">
              {t("section1.title")}
            </h2>
            <div className="space-y-4 text-gray-600 leading-relaxed">
              <p>{t("section1.paragraph1")}</p>
              <p>{t("section1.paragraph2")}</p>
              <p>{t("section1.paragraph3")}</p>
            </div>
          </section>

          {/* Section 2: Service Description */}
          <section>
            <h2 className="text-2xl font-bold text-gray-800 mb-4">
              {t("section2.title")}
            </h2>
            <p className="text-gray-600 mb-4 leading-relaxed">{t("section2.intro")}</p>
            <div className="bg-blue-50 rounded-xl p-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-3">
                {t("section2.subtitle")}
              </h3>
              <ul className="space-y-2 text-gray-600">
                <li>• {t("section2.item1")}</li>
                <li>• {t("section2.item2")}</li>
                <li>• {t("section2.item3")}</li>
                <li>• {t("section2.item4")}</li>
                <li>• {t("section2.item5")}</li>
                <li>• {t("section2.item6")}</li>
                <li>• {t("section2.item7")}</li>
              </ul>
              <div className="mt-4 p-4 bg-yellow-100 border-l-4 border-yellow-500 rounded-r-lg">
                <p className="text-gray-700 font-medium">{t("section2.disclaimer")}</p>
              </div>
            </div>
          </section>

          {/* Section 3: Registration */}
          <section>
            <h2 className="text-2xl font-bold text-gray-800 mb-4">
              {t("section3.title")}
            </h2>
            <p className="text-gray-600 mb-4 leading-relaxed">{t("section3.intro")}</p>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="bg-white border-2 border-green-100 rounded-xl p-6">
                <h3 className="text-lg font-semibold text-gray-800 mb-3">
                  {t("section3.userRequirements.title")}
                </h3>
                <ul className="space-y-2 text-gray-600 text-sm">
                  <li>• {t("section3.userRequirements.item1")}</li>
                  <li>• {t("section3.userRequirements.item2")}</li>
                  <li>• {t("section3.userRequirements.item3")}</li>
                  <li>• {t("section3.userRequirements.item4")}</li>
                  <li>• {t("section3.userRequirements.item5")}</li>
                  <li>• {t("section3.userRequirements.item6")}</li>
                </ul>
              </div>
              <div className="bg-white border-2 border-orange-100 rounded-xl p-6">
                <h3 className="text-lg font-semibold text-gray-800 mb-3">
                  {t("section3.userResponsibility.title")}
                </h3>
                <ul className="space-y-2 text-gray-600 text-sm">
                  <li>• {t("section3.userResponsibility.item1")}</li>
                  <li>• {t("section3.userResponsibility.item2")}</li>
                  <li>• {t("section3.userResponsibility.item3")}</li>
                  <li>• {t("section3.userResponsibility.item4")}</li>
                  <li>• {t("section3.userResponsibility.item5")}</li>
                  <li>• {t("section3.userResponsibility.item6")}</li>
                </ul>
              </div>
            </div>
            <p className="text-gray-600 mt-4 italic">{t("section3.termination")}</p>
          </section>

          {/* Section 4: Rules */}
          <section>
            <h2 className="text-2xl font-bold text-gray-800 mb-4">
              {t("section4.title")}
            </h2>
            <p className="text-gray-600 mb-4 leading-relaxed">{t("section4.intro")}</p>
            <div className="bg-red-50 rounded-xl p-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-3">
                {t("section4.subtitle")}
              </h3>
              <ul className="space-y-2 text-gray-600">
                <li>• {t("section4.item1")}</li>
                <li>• {t("section4.item2")}</li>
                <li>• {t("section4.item3")}</li>
                <li>• {t("section4.item4")}</li>
                <li>• {t("section4.item5")}</li>
                <li>• {t("section4.item6")}</li>
                <li>• {t("section4.item7")}</li>
                <li>• {t("section4.item8")}</li>
                <li>• {t("section4.item9")}</li>
              </ul>
              <p className="text-red-700 font-medium mt-4">{t("section4.consequences")}</p>
            </div>
          </section>

          {/* Section 5: Financial Services */}
          <section>
            <h2 className="text-2xl font-bold text-gray-800 mb-4">
              {t("section5.title")}
            </h2>
            <p className="text-gray-600 mb-4 leading-relaxed">{t("section5.intro")}</p>
            <div className="bg-yellow-50 rounded-xl p-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-3">
                {t("section5.subtitle")}
              </h3>
              <ul className="space-y-2 text-gray-600">
                <li>• {t("section5.item1")}</li>
                <li>• {t("section5.item2")}</li>
                <li>• {t("section5.item3")}</li>
                <li>• {t("section5.item4")}</li>
                <li>• {t("section5.item5")}</li>
                <li>• {t("section5.item6")}</li>
              </ul>
              <p className="text-gray-700 font-medium mt-4">{t("section5.footer")}</p>
            </div>
          </section>

          {/* Section 6: Intellectual Property */}
          <section>
            <h2 className="text-2xl font-bold text-gray-800 mb-4">
              {t("section6.title")}
            </h2>
            <div className="bg-purple-50 rounded-xl p-6 space-y-4">
              <p className="text-gray-600 leading-relaxed">{t("section6.intro")}</p>
              <p className="text-gray-600 leading-relaxed">{t("section6.protection")}</p>
              
              <div>
                <h3 className="text-lg font-semibold text-gray-800 mb-3">
                  {t("section6.allowed.title")}
                </h3>
                <ul className="space-y-2 text-gray-600">
                  <li>• {t("section6.allowed.item1")}</li>
                  <li>• {t("section6.allowed.item2")}</li>
                  <li>• {t("section6.allowed.item3")}</li>
                </ul>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-gray-800 mb-3 mt-4">
                  {t("section6.prohibited.title")}
                </h3>
                <ul className="space-y-2 text-gray-600">
                  <li>• {t("section6.prohibited.item1")}</li>
                  <li>• {t("section6.prohibited.item2")}</li>
                  <li>• {t("section6.prohibited.item3")}</li>
                  <li>• {t("section6.prohibited.item4")}</li>
                  <li>• {t("section6.prohibited.item5")}</li>
                </ul>
              </div>

              <p className="text-purple-700 font-medium">{t("section6.consequences")}</p>
            </div>
          </section>

          {/* Section 7: Limitation of Liability */}
          <section>
            <h2 className="text-2xl font-bold text-gray-800 mb-4">
              {t("section7.title")}
            </h2>
            <p className="text-gray-600 mb-4 leading-relaxed">{t("section7.intro")}</p>
            <div className="bg-gray-50 rounded-xl p-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-3">
                {t("section7.subtitle")}
              </h3>
              <ul className="space-y-2 text-gray-600">
                <li>• {t("section7.item1")}</li>
                <li>• {t("section7.item2")}</li>
                <li>• {t("section7.item3")}</li>
                <li>• {t("section7.item4")}</li>
                <li>• {t("section7.item5")}</li>
                <li>• {t("section7.item6")}</li>
                <li>• {t("section7.item7")}</li>
                <li>• {t("section7.item8")}</li>
              </ul>
              <p className="text-gray-700 font-medium mt-4 italic">{t("section7.footer")}</p>
            </div>
          </section>

          {/* Section 8: Disclaimer of Warranties - NEW */}
          <section>
            <h2 className="text-2xl font-bold text-gray-800 mb-4">
              {t("section8.title")}
            </h2>
            <p className="text-gray-600 mb-4 leading-relaxed">{t("section8.intro")}</p>
            <div className="bg-orange-50 rounded-xl p-6 space-y-4">
              <div>
                <h3 className="text-lg font-semibold text-gray-800 mb-3">
                  {t("section8.noGuarantee.title")}
                </h3>
                <ul className="space-y-2 text-gray-600">
                  <li>• {t("section8.noGuarantee.item1")}</li>
                  <li>• {t("section8.noGuarantee.item2")}</li>
                  <li>• {t("section8.noGuarantee.item3")}</li>
                  <li>• {t("section8.noGuarantee.item4")}</li>
                  <li>• {t("section8.noGuarantee.item5")}</li>
                  <li>• {t("section8.noGuarantee.item6")}</li>
                </ul>
              </div>
              <p className="text-gray-600">{t("section8.userAcceptance")}</p>
              <p className="text-orange-700 font-medium">{t("section8.maxLiability")}</p>
            </div>
          </section>

          {/* Section 9: Cost of Services */}
          <section>
            <h2 className="text-2xl font-bold text-gray-800 mb-4">
              {t("section9.title")}
            </h2>
            <p className="text-gray-600 mb-4 leading-relaxed">{t("section9.intro")}</p>
            <div className="bg-green-50 rounded-xl p-6 space-y-4">
              <div>
                <h3 className="text-lg font-semibold text-gray-800 mb-3">
                  {t("section9.subtitle")}
                </h3>
                <ul className="space-y-2 text-gray-600">
                  <li>• {t("section9.item1")}</li>
                  <li>• {t("section9.item2")}</li>
                  <li>• {t("section9.item3")}</li>
                  <li>• {t("section9.item4")}</li>
                  <li>• {t("section9.item5")}</li>
                  <li>• {t("section9.item6")}</li>
                </ul>
              </div>
              <p className="text-gray-600">{t("section9.revenue")}</p>
              <p className="text-gray-600">{t("section9.paidServices")}</p>
              <p className="text-green-700 font-medium">{t("section9.noHiddenFees")}</p>
            </div>
          </section>

          {/* Section 10: Changes to Terms */}
          <section>
            <h2 className="text-2xl font-bold text-gray-800 mb-4">
              {t("section10.title")}
            </h2>
            <div className="bg-blue-50 rounded-xl p-6 space-y-4">
              <p className="text-gray-600 leading-relaxed">{t("section10.intro")}</p>
              <p className="text-gray-600">{t("section10.rights")}</p>
              <div>
                <p className="text-gray-600 mb-2">{t("section10.notification")}</p>
                <ul className="space-y-2 text-gray-600 ml-4">
                  <li>• {t("section10.item1")}</li>
                  <li>• {t("section10.item2")}</li>
                  <li>• {t("section10.item3")}</li>
                  <li>• {t("section10.item4")}</li>
                </ul>
              </div>
              <p className="text-gray-600">{t("section10.acceptance")}</p>
              <p className="text-blue-700 font-medium">{t("section10.checkRegularly")}</p>
            </div>
          </section>

          {/* Section 11: Termination */}
          <section>
            <h2 className="text-2xl font-bold text-gray-800 mb-4">
              {t("section11.title")}
            </h2>
            <p className="text-gray-600 mb-4 leading-relaxed">{t("section11.intro")}</p>
            <div className="bg-orange-50 rounded-xl p-6 space-y-4">
              <div>
                <h3 className="text-lg font-semibold text-gray-800 mb-3">
                  {t("section11.userCan.title")}
                </h3>
                <ul className="space-y-2 text-gray-600">
                  <li>• {t("section11.userCan.item1")}</li>
                  <li>• {t("section11.userCan.item2")}</li>
                  <li>• {t("section11.userCan.item3")}</li>
                  <li>• {t("section11.userCan.item4")}</li>
                </ul>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-800 mb-3 mt-4">
                  {t("section11.weCan.title")}
                </h3>
                <ul className="space-y-2 text-gray-600">
                  <li>• {t("section11.weCan.item1")}</li>
                  <li>• {t("section11.weCan.item2")}</li>
                  <li>• {t("section11.weCan.item3")}</li>
                  <li>• {t("section11.weCan.item4")}</li>
                  <li>• {t("section11.weCan.item5")}</li>
                </ul>
              </div>
              <p className="text-gray-600">{t("section11.dataRetention")}</p>
              <p className="text-orange-700 font-medium">{t("section11.noRefund")}</p>
            </div>
          </section>

          {/* Section 12: Dispute Resolution - NEW */}
          <section>
            <h2 className="text-2xl font-bold text-gray-800 mb-4">
              {t("section12.title")}
            </h2>
            <div className="bg-indigo-50 rounded-xl p-6 space-y-4">
              <p className="text-gray-600 leading-relaxed">{t("section12.intro")}</p>
              
              <div>
                <h3 className="text-lg font-semibold text-gray-800 mb-3">
                  {t("section12.negotiation.title")}
                </h3>
                <p className="text-gray-600 mb-2">{t("section12.negotiation.text")}</p>
                <ul className="space-y-2 text-gray-600 ml-4">
                  <li>• {t("section12.negotiation.item1")}</li>
                  <li>• {t("section12.negotiation.item2")}</li>
                  <li>• {t("section12.negotiation.item3")}</li>
                  <li>• {t("section12.negotiation.item4")}</li>
                </ul>
              </div>

              <p className="text-gray-600">{t("section12.responseTime")}</p>

              <div>
                <h3 className="text-lg font-semibold text-gray-800 mb-3">
                  {t("section12.jurisdiction.title")}
                </h3>
                <p className="text-gray-600 mb-2">{t("section12.jurisdiction.text")}</p>
                <p className="text-gray-600 mb-2">{t("section12.jurisdiction.court")}</p>
                <p className="text-gray-600">{t("section12.jurisdiction.law")}</p>
              </div>

              <p className="text-indigo-700 font-medium">{t("section12.costs")}</p>
            </div>
          </section>

          {/* Section 13: Force Majeure - NEW */}
          <section>
            <h2 className="text-2xl font-bold text-gray-800 mb-4">
              {t("section13.title")}
            </h2>
            <div className="bg-red-50 rounded-xl p-6 space-y-4">
              <p className="text-gray-600 leading-relaxed">{t("section13.intro")}</p>
              
              <div>
                <p className="text-gray-600 mb-2 font-medium">{t("section13.definition")}</p>
                <ul className="space-y-2 text-gray-600">
                  <li>• {t("section13.item1")}</li>
                  <li>• {t("section13.item2")}</li>
                  <li>• {t("section13.item3")}</li>
                  <li>• {t("section13.item4")}</li>
                  <li>• {t("section13.item5")}</li>
                  <li>• {t("section13.item6")}</li>
                </ul>
              </div>

              <p className="text-gray-600">{t("section13.notification")}</p>
              <p className="text-red-700 font-medium">{t("section13.suspension")}</p>
            </div>
          </section>

          {/* Section 14: Miscellaneous - NEW */}
          <section>
            <h2 className="text-2xl font-bold text-gray-800 mb-4">
              {t("section14.title")}
            </h2>
            <div className="bg-gray-50 rounded-xl p-6 space-y-4">
              <div>
                <h3 className="text-lg font-semibold text-gray-800 mb-2">
                  {t("section14.severability.title")}
                </h3>
                <p className="text-gray-600">{t("section14.severability.text")}</p>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-gray-800 mb-2">
                  {t("section14.entireAgreement.title")}
                </h3>
                <p className="text-gray-600">{t("section14.entireAgreement.text")}</p>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-gray-800 mb-2">
                  {t("section14.noWaiver.title")}
                </h3>
                <p className="text-gray-600">{t("section14.noWaiver.text")}</p>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-gray-800 mb-2">
                  {t("section14.assignment.title")}
                </h3>
                <p className="text-gray-600">{t("section14.assignment.text")}</p>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-gray-800 mb-2">
                  {t("section14.language.title")}
                </h3>
                <p className="text-gray-600 font-medium">{t("section14.language.text")}</p>
              </div>
            </div>
          </section>

          {/* Section 15: Contact Info - NEW */}
          <section>
            <h2 className="text-2xl font-bold text-gray-800 mb-4">
              {t("section15.title")}
            </h2>
            <div className="bg-blue-50 rounded-xl p-6">
              <p className="text-gray-600 mb-6 leading-relaxed">{t("section15.intro")}</p>
              <div className="space-y-3 text-gray-700">
                <p>
                  <strong>{t("section15.email")}:</strong>{" "}
                  {t("section15.emailValue")}
                </p>
                <p>
                  <strong>{t("section15.phone")}:</strong>{" "}
                  {t("section15.phoneValue")}
                </p>
                <p>
                  <strong>{t("section15.chat")}:</strong>{" "}
                  {t("section15.chatValue")}
                </p>
                <p>
                  <strong>{t("section15.address")}:</strong>{" "}
                  {t("section15.addressValue")}
                </p>
              </div>
              <p className="text-gray-600 mt-6 text-sm italic">{t("section15.responseTime")}</p>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}