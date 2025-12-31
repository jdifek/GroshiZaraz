/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @next/next/no-img-element */
import MfoService from "@/app/services/mfos/mfosService";
import { BlueButton } from "@/app/ui/Buttons/BlueButton";
import { formatDate } from "@/app/utils/formatDate";
import {
  MessageCircle,
  User,
  Calendar,
  CheckCircle,
  Reply,
} from "lucide-react";
import { Metadata } from "next";
import { getTranslations } from "next-intl/server";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string; lang: string }>;
}): Promise<Metadata> {
  const { slug, lang } = await params;
  const company = await MfoService.getMfoBySlug(slug);
  const defaultImage = "https://groshi-zaraz.vercel.app/default-og-image.jpg";

  if (!company) {
    return {
      title:
        lang === "ru"
          ? "Фіногляд — МФО не найдено"
          : "Фіногляд — МФО не знайдено",
      description:
        lang === "ru"
          ? "Похоже, запрашиваемая страница не существует."
          : "Схоже, запитувана сторінка не існує.",
      keywords: "",
    };
  }

  const titleRu = `${company.name} — Часто задаваемые вопросы о МФО`;
  const titleUk = `${company.name} — Часті запитання про МФО`;

  const descriptionRu = `Часто задаваемые вопросы о МФО ${company.name}: как получить займ, условия кредитования, первый займ бесплатно, опыт пользователей и ответы экспертов.`;
  const descriptionUk = `Часті запитання про МФО ${company.name}: як отримати позику, умови кредитування, перша позику безкоштовно, досвід користувачів та відповіді експертів.`;

  const keywordsRu = `вопросы, ответы, FAQ, МФО, ${company.name}, займ, кредит, первый займ, онлайн, эксперты`;
  const keywordsUk = `питання, відповіді, FAQ, МФО, ${company.name}, позику, кредит, перша позику, онлайн, експерти`;

  return {
    title: lang === "ru" ? titleRu : titleUk,
    description: lang === "ru" ? descriptionRu : descriptionUk,
    keywords: lang === "ru" ? keywordsRu : keywordsUk,
    openGraph: {
      title: lang === "ru" ? titleRu : titleUk,
      description: lang === "ru" ? descriptionRu : descriptionUk,
      url: `https://groshi-zaraz.vercel.app/${lang}/mfos/${slug}/questions`,
      images: [company.logo || defaultImage],
      siteName: "Фіногляд",
      locale: lang === "ru" ? "ru_RU" : lang === "en" ? "en_US" : "uk_UA",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: lang === "ru" ? titleRu : titleUk,
      description: lang === "ru" ? descriptionRu : descriptionUk,
      images: [company.logo || defaultImage],
      site: "@Finoglyad",
      creator: "@Finoglyad",
    },
  };
}

export default async function QuestionsPage({
  params,
}: {
  params: Promise<{ slug: string; lang: string }>;
}) {
  const { slug, lang } = await params;
  const t = await getTranslations({ locale: lang, namespace: "QuestionsPage" });

  let questions = [];
  try {
    const response = await MfoService.getMfoBySlug(slug);
    questions = response.questions || [];
  } catch (error) {
    console.error("Error loading questions:", error);
  }

  const renderAnswer = (answer: any) => {
    const isExpert = answer.expert !== null;

    return (
      <div
        key={answer.id}
        className={`mt-4 ml-8 p-4 rounded-2xl border-l-4 ${
          isExpert
            ? "bg-gradient-to-r from-green-50 to-emerald-50 border-l-green-500"
            : "bg-gradient-to-r from-gray-50 to-slate-50 border-l-gray-400"
        }`}
      >
        <div className="flex items-start gap-3">
          <div
            className={`w-8 h-8 rounded-full flex items-center justify-center ${
              isExpert ? "" : "bg-gradient-to-br from-gray-500 to-slate-600"
            }`}
          >
            {isExpert ? (
              <img
                src={answer.expert.avatar}
                alt={answer.expert.name}
                className="w-8 h-8 rounded-full object-cover border-2 border-green-500"
              />
            ) : (
              <Reply className="w-4 h-4 text-white" />
            )}
          </div>
          <div className="flex-1">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <h5 className="font-semibold text-gray-800">
                  {isExpert ? answer.expert.name : answer.authorName}
                </h5>
                {isExpert && (
                  <div className="flex items-center gap-2">
                    <span className="px-2 py-1 bg-green-100 text-green-700 text-xs rounded-full font-medium flex items-center gap-1">
                      <CheckCircle className="w-3 h-3" />
                      {t("expert")}
                    </span>
                    {answer.expert.position && (
                      <span className="px-2 py-1 bg-blue-100 text-blue-700 text-xs rounded-full font-medium">
                        {answer.expert.position}
                      </span>
                    )}
                  </div>
                )}
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-500">
                <Calendar className="w-3 h-3" />
                {formatDate(answer.createdAt, lang)}
              </div>
            </div>
            <p className="text-gray-700 leading-relaxed">
              {lang === "ru" ? answer.textRu || answer.textOriginal : answer.textUk || answer.textOriginal}
            </p>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div>
      <h1 className="text-3xl! font-bold text-gray-800 mb-6">
        {t("title")}
      </h1>

      {/* Статичные частые вопросы */}
      <div className="space-y-4 mb-8">
        <div className="bg-gray-50 rounded-2xl p-6">
          <h3 className="font-semibold text-gray-800 mb-2">
            {t("howToGetLoan")}
          </h3>
          <p className="text-gray-600">{t("howToGetLoanDesc")}</p>
        </div>
        <div className="bg-gray-50 rounded-2xl p-6">
          <h3 className="font-semibold text-gray-800 mb-2">
            {t("documentsNeeded")}
          </h3>
          <p className="text-gray-600">{t("documentsNeededDesc")}</p>
        </div>
        <div className="bg-gray-50 rounded-2xl p-6">
          <h3 className="font-semibold text-gray-800 mb-2">
            {t("firstLoanFree")}
          </h3>
          <p className="text-gray-600">{t("firstLoanFreeDesc")}</p>
        </div>
      </div>

      {/* Вопросы пользователей */}
      {questions.length > 0 && (
        <div>
          <h3 className="text-xl font-semibold text-gray-800 mb-4">
            {t("userQuestions")} ({questions.length})
          </h3>
          <div className="space-y-6">
            {questions.map((question) => (
              <div
                key={question.id}
                className="bg-white border border-gray-200 rounded-2xl shadow-sm overflow-hidden"
              >
                <div className="p-6">
                  <div className="flex items-start gap-4 mb-3">
                    <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full flex items-center justify-center">
                      <User className="w-5 h-5 text-white" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="font-semibold text-gray-800">
                          {question.name}
                        </h4>
                        <div className="flex items-center gap-2 text-sm text-gray-500">
                          <Calendar className="w-4 h-4" />
                          {formatDate(question.createdAt, lang)}
                        </div>
                      </div>
                      <div className="flex items-center gap-2 mb-3">
                        <span className="px-3 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-700">
                          {question.category}
                        </span>
                        {question.answers && question.answers.length > 0 && (
                          <span className="px-3 py-1 rounded-full text-xs font-medium bg-green-100 text-green-700 flex items-center gap-1">
                            <MessageCircle className="w-3 h-3" />
                            {question.answers.length} {t("answers")}
                          </span>
                        )}
                      </div>
                      <h5 className="font-medium text-gray-800 mb-2">
                        {question.subject}
                      </h5>
                      <p className="text-gray-600">
                        {lang === "ru" ? question.textRu : question.textUk}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Ответы */}
                {question.answers && question.answers.length > 0 && (
                  <div className="bg-gray-50 px-6 py-4">
                    <div className="space-y-3">
                      {question.answers
                        .filter((answer: any) => answer.expert !== null)
                        .map(renderAnswer)}
                      {question.answers
                        .filter((answer: any) => answer.expert === null)
                        .map(renderAnswer)}
                    </div>

                    <div className="mt-4 pt-4 border-t border-gray-200">
                      <button className="bg-gradient-to-r from-indigo-500 to-purple-600 text-white px-4 py-2 rounded-xl font-medium flex items-center gap-2 text-sm cursor-pointer transition-all duration-300 hover:from-indigo-600 hover:to-purple-700">
                        <Reply className="w-4 h-4" />
                        {t("answer")}
                      </button>
                    </div>
                  </div>
                )}

                {!question.answers || question.answers.length === 0 ? (
                  <div className="bg-gray-50 px-6 py-4">
                    <div className="text-center py-2">
                      <p className="text-gray-500 text-sm mb-3">{t("noAnswers")}</p>
                      <button className="bg-gradient-to-r from-indigo-500 to-purple-600 text-white px-4 py-2 rounded-xl font-medium hover:shadow-md transition-all duration-300 flex items-center gap-2 text-sm mx-auto">
                        <Reply className="w-4 h-4" />
                        {t("answer")}
                      </button>
                    </div>
                  </div>
                ) : null}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Кнопка задать вопрос */}
      <div className="mt-8 p-6 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl border border-blue-100">
        <div className="text-center">
          <h4 className="text-xl font-semibold text-gray-800 mb-2">{t("askQuestion")}</h4>
          <p className="text-gray-600 mb-6">{t("askQuestionDesc")}</p>
          <BlueButton text={t("ask")} />
        </div>
      </div>
    </div>
  );
}
