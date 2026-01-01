/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @next/next/no-img-element */
import MfoService from "@/app/services/mfos/mfosService";
import { BlueButton } from "@/app/ui/Buttons/BlueButton";
import { formatDate } from "@/app/utils/formatDate";
import {
  MessageCircle,
  User,
  Calendar,
  Reply,
  Clock,
  Shield,
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
  const defaultImage = "https://finoglyad.com.ua/default-og-image.jpg";

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
      url: `https://finoglyad.com.ua/${lang}/mfos/${slug}/questions`,
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



  return (
    <div>
      <h1 className="text-3xl! font-bold text-gray-800 mb-6">{t("title")}</h1>

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
    <h3 className="text-lg sm:text-xl font-semibold text-gray-800 mb-3 sm:mb-4 px-4 sm:px-0">
      {t("userQuestions")} ({questions.length})
    </h3>
    <div className="space-y-4 sm:space-y-6">
      {questions.map((question) => (
        <div
          key={question.id}
          className="bg-white border border-gray-200 rounded-xl sm:rounded-2xl shadow-sm overflow-hidden "
        >
          {/* Основной контент вопроса */}
          <div className="p-4 sm:p-6">
            {/* Шапка: Аватар + Имя + Дата */}
            <div className="flex items-start gap-3 mb-3">
              {/* Аватар */}
              <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full flex items-center justify-center flex-shrink-0">
                <User className="w-5 h-5 text-white" />
              </div>

              {/* Контент справа */}
              <div className="flex-1 min-w-0">
                {/* Имя и дата */}
                <div className="flex flex-col gap-1 mb-2">
                  <h4 className="font-semibold text-gray-800 text-sm sm:text-base">
                    {question.name}
                  </h4>
                  <div className="flex items-center gap-1.5 text-xs text-gray-500">
                    <Calendar className="w-3.5 h-3.5" />
                    {formatDate(question.createdAt, lang)}
                  </div>
                </div>

                {/* Бейджи */}
                <div className="flex flex-wrap items-center gap-2 mb-3">
                  <span className="px-2.5 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-700">
                    {question.category}
                  </span>
                  {question.answers && question.answers.length > 0 && (
                    <span className="px-2.5 py-1 rounded-full text-xs font-medium bg-green-100 text-green-700 flex items-center gap-1">
                      <MessageCircle className="w-3 h-3" />
                      {question.answers.length}
                    </span>
                  )}
                </div>
              </div>
            </div>

            {/* Тема вопроса */}
            <h5 className="font-semibold text-gray-800 mb-2 text-sm sm:text-base">
              {question.subject}
            </h5>

            {/* Текст вопроса */}
            <p className="text-gray-600 text-sm leading-relaxed">
              {lang === "ru" ? question.textRu : question.textUk}
            </p>
          </div>

          {/* Ответы */}
          {question.answers && question.answers.length > 0 && (
            <div className="bg-gray-50  py-4">
              <div className="space-y-3">
                {question.answers
                  .filter((answer: any) => answer.expert !== null)
                  .map((answer: any) => (
                    <div
                      key={answer.id}
                      className="bg-white border-l-4 border-green-500 rounded-lg p-4 relative"
                    >
                      {/* Шапка эксперта */}
                      <div className="flex items-start gap-3 mb-3">
                        <div className="w-8 h-8 bg-gradient-to-br from-green-500 to-emerald-600 rounded-full flex items-center justify-center flex-shrink-0">
                          <Shield className="w-4 h-4 text-white" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex flex-col gap-1">
                            <div className="flex items-center gap-2 flex-wrap">
                              <span className="font-semibold text-gray-800 text-sm">
                                {answer.expert.name}
                              </span>
                              <span className="px-2 py-0.5 rounded-full text-xs bg-green-100 text-green-700">
                                {t("expert")}
                              </span>
                            </div>
                            <div className="flex items-center gap-1.5 text-xs text-gray-500">
                              <Clock className="w-3.5 h-3.5" />
                              {formatDate(answer.createdAt, lang)}
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Бейдж справа вверху */}
                      {answer.expert.role && (
                        <div className="absolute top-4 right-4">
                          <span className="px-2 py-1 rounded-lg text-xs font-medium bg-blue-50 text-blue-700 border border-blue-200">
                            {answer.expert.role}
                          </span>
                        </div>
                      )}

                      {/* Текст ответа */}
                      <p className="text-gray-700 text-sm leading-relaxed">
                        {lang === "ru" ? answer.textRu : answer.textUk}
                      </p>
                    </div>
                  ))}

                {question.answers
                  .filter((answer: any) => answer.expert === null)
                  .map((answer: any) => (
                    <div
                      key={answer.id}
                      className="bg-white border border-gray-200 rounded-lg p-4"
                    >
                      {/* Шапка пользователя */}
                      <div className="flex items-start gap-3 mb-3">
                        <div className="w-8 h-8 bg-gradient-to-br from-gray-400 to-gray-600 rounded-full flex items-center justify-center flex-shrink-0">
                          <User className="w-4 h-4 text-white" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex flex-col gap-1">
                            <span className="font-medium text-gray-800 text-sm">
                              {answer.userName || t("anonymous")}
                            </span>
                            <div className="flex items-center gap-1.5 text-xs text-gray-500">
                              <Clock className="w-3.5 h-3.5" />
                              {formatDate(answer.createdAt, lang)}
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Текст ответа */}
                      <p className="text-gray-600 text-sm leading-relaxed">
                        {lang === "ru" ? answer.textRu : answer.textUk}
                      </p>
                    </div>
                  ))}
              </div>

              {/* Кнопка ответить */}
              <div className="mt-4 pt-4 border-t border-gray-200">
                <button className="w-full bg-gradient-to-r from-indigo-500 to-purple-600 text-white px-4 py-3 rounded-xl font-medium flex items-center justify-center gap-2 text-sm transition-all duration-300 hover:from-indigo-600 hover:to-purple-700 active:scale-[0.98]">
                  <Reply className="w-4 h-4" />
                  {t("answer")}
                </button>
              </div>
            </div>
          )}

          {/* Нет ответов */}
          {(!question.answers || question.answers.length === 0) && (
            <div className="bg-gray-50 px-4 sm:px-6 py-4">
              <div className="text-center py-3">
                <p className="text-gray-500 text-sm mb-3">
                  {t("noAnswers")}
                </p>
                <button className="w-full bg-gradient-to-r from-indigo-500 to-purple-600 text-white px-4 py-3 rounded-xl font-medium transition-all duration-300 hover:from-indigo-600 hover:to-purple-700 active:scale-[0.98] flex items-center justify-center gap-2 text-sm">
                  <Reply className="w-4 h-4" />
                  {t("answer")}
                </button>
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
  </div>
)}

      {/* Кнопка задать вопрос */}
      <div className="mt-8 p-6 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl border border-blue-100">
        <div className="text-center">
          <h4 className="text-xl font-semibold text-gray-800 mb-2">
            {t("askQuestion")}
          </h4>
          <p className="text-gray-600 mb-6">{t("askQuestionDesc")}</p>
          <BlueButton text={t("ask")} />
        </div>
      </div>
    </div>
  );
}
