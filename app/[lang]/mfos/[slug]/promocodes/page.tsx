/* eslint-disable @typescript-eslint/no-explicit-any */
import MfoService from "@/app/services/mfos/mfosService";
import { ExternalLink } from "lucide-react";
import Link from "next/link";
import { getTranslations } from "next-intl/server";

export default async function PromoCodesPage({
  params,
}: {
  params: Promise<{ lang: string; slug: string }>;
}) {
  const { lang } = await params;

  const t = await getTranslations({ locale: lang, namespace: "PromoCodes" });

  let promoCodes = [];

  try {
    const { slug } = await params;
    const response = await MfoService.getMfoBySlug(slug);
    promoCodes = response.promoCodes || [];
  } catch (error) {
    console.error("Error loading promo codes:", error);
  }

  return (
    <div>
      <h2 className="text-2xl font-bold text-gray-800 mb-6">{t("title")}</h2>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {promoCodes.length > 0 ? (
          promoCodes.map((promo: any, index: number) => {
            const discount =
              lang === "uk"
                ? promo.discountUk || promo.discount
                : promo.discount;
            const condition =
              lang === "uk"
                ? promo.conditionUk || promo.condition
                : promo.condition;

            return (
              <div
                key={index}
                className="bg-white rounded-2xl shadow border p-6 flex flex-col justify-between"
              >
                <div>
                  <h3 className="text-lg font-semibold text-gray-800 mb-2">
                    {t("code")}:{" "}
                    <span className="text-blue-600">{promo.code}</span>
                  </h3>

                  {discount && <p className="text-gray-700 mb-1">{discount}</p>}

                  {condition && (
                    <p className="text-sm text-gray-500">{condition}</p>
                  )}
                </div>

                {promo.link && (
                  <Link
                    href={promo.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-4 inline-flex items-center justify-center gap-2 text-sm font-medium text-white bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 rounded-xl px-4 py-2 transition"
                  >
                    {t("go")}
                    <ExternalLink className="w-4 h-4" />
                  </Link>
                )}
              </div>
            );
          })
        ) : (
          <p className="text-gray-500 col-span-full">{t("notFound")}</p>
        )}
      </div>
    </div>
  );
}
