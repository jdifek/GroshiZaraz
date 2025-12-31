import { MessageCircleQuestion } from "lucide-react";
import { getTranslations } from "next-intl/server";
import Link from "next/link";

export async function NoAnswersState({ lang }: { lang: string }) {
  const t = await getTranslations({
    locale: lang,
    namespace: "NoAnswersState",
  });
  return (
    <div className="bg-white rounded-3xl shadow-lg border border-gray-100 p-10 text-center">
      {/* Иконка */}
      <div className="w-24 h-24 mx-auto mb-6 rounded-3xl bg-gradient-to-br from-blue-100 to-indigo-100 flex items-center justify-center">
        <MessageCircleQuestion className="w-12 h-12 text-blue-600" />
      </div>

      {/* Текст */}
      <h3 className="text-2xl font-bold text-gray-800 mb-3">{t("text")}</h3>

      <p className="text-gray-600 max-w-md mx-auto mb-8">{t("textMain")}</p>

      {/* CTA */}
      <Link
        href={`/${lang}/ask-question`}
        className="inline-flex items-center gap-2 px-8 py-4 rounded-2xl font-semibold text-white
        bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700
        transition-all duration-200 shadow-lg hover:shadow-xl"
      >
        ✍️ {t("cta")}
      </Link>
    </div>
  );
}
