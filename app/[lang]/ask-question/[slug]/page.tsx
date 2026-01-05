/* eslint-disable @typescript-eslint/no-unused-vars */
import { notFound } from "next/navigation";
import { Link } from "@/app/i18n/navigation";
import SiteQuestionService from "@/app/services/siteQuestion/SiteQuestionService";
import Image from "next/image";
import { formatDate } from "@/app/utils/formatDate";
import { NoAnswersState } from "@/app/components/AskQuestion/NoAnswersState";
import { getTranslations } from "next-intl/server";
import { Metadata } from "next";
type Props = {
  params: Promise<{ lang: string; slug: string }>;
};
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { lang: rawLang, slug } = await params;
  const lang = rawLang === "ru" || rawLang === "uk" ? rawLang : "uk";

  let t;
  try {
    t = await getTranslations({
      locale: lang,
      namespace: "QuestionAnswersPage",
    });
  } catch (e) {
    console.error(`Translations not found for ${lang}, fallback to uk`, e);
    t = await getTranslations({
      locale: "uk",
      namespace: "QuestionAnswersPage",
    });
  }

  try {
    const questionData = await SiteQuestionService.getOneBySlug(slug);
    if (!questionData) throw new Error("Question not found");

    const questionTitle =
      lang === "uk"
        ? questionData.subject
        : questionData.subjectRu || questionData.subject;
    const questionDescription =
      lang === "uk"
        ? questionData.textUk
        : questionData.textRu || questionData.textOriginal;

    const title = `${questionTitle} — Фіногляд`;
    const description = questionDescription.slice(0, 160);
    const url = `https://finoglyad.com.ua/${lang}/ask-question/${slug}`;

    const imageUrl = `https://finoglyad.com.ua/images/og-default.png`; // статическое изображение или динамическое

    return {
      title,
      description,
      robots: "index, follow",
      alternates: {
        canonical: url,
        languages: {
          uk: url,
          ru: `https://finoglyad.com.ua/ru/ask-question/${slug}`,
        },
      },
      openGraph: {
        title,
        description,
        url,
        siteName: "Фіногляд",
        type: "article",
        locale: lang === "uk" ? "uk_UA" : "ru_UA",
        images: [
          {
            url: imageUrl,
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
        images: [imageUrl],
        site: "@finoglyad",
        creator: "@finoglyad",
      },
    };
  } catch (error) {
    console.error("generateMetadata QuestionAnswersPage failed:", error);
    return {
      title: lang === "ru" ? "Вопрос — Фіногляд" : "Питання — Фіногляд",
      description:
        lang === "ru" ? "Информация о вопросе." : "Інформація про питання.",
      robots: "noindex, follow",
    };
  }
}

const getQuestion = async (slug: string, lang = "uk") => {
  try {
    const bySlug = await SiteQuestionService.getOneBySlug(slug);
    const response = {
      question: {
        id: bySlug.id,
        question: bySlug.subject,
        author: bySlug.name,
        date: formatDate(bySlug.createdAt, lang),
        category: bySlug.category,
        views: 156,
        likes: 23,
        description: lang === "uk" ? bySlug.textUk : bySlug.textRu,
        icon: "👤",
        color: "from-blue-500 to-blue-600",
      },
      answers: bySlug.answers?.map((el) => {
        const isExpert = !!el.expert;
        return {
          id: el.id,
          author: isExpert
            ? el.expert.nameUk || el.expert.name
            : el.authorName || "Анонім",
          isExpert,

          date: formatDate(el.createdAt, lang),

          likes: 0,

          answer: lang === "uk" ? el.textUk : el.textRu || el.textOriginal,

          helpfulCount: 0,

          avatar: isExpert ? el.expert.avatar : "👤",
        };
      }),
    };
    console.log(bySlug);
    return response;
  } catch (e) {
    console.log(e);
    return null;
  }
};
const getByCategory = async (lang = "uk", category: string) => {
  try {
    const res = await SiteQuestionService.getByCategory(category, 3);
    const response = res.map((el) => ({
      id: el.id,
      question: el.subject,
      slug: el.slug,
      category: el.category,
      color: "from-blue-500 to-blue-600",
      answersCount: el.answers?.length ?? 0,
    }));

    console.log(res);
    return response;
  } catch (e) {
    console.log(e);
    return null;
  }
};

export default async function QuestionAnswersPage({
  params,
}: {
  params: Promise<{ lang: string; slug: string }>;
}) {
  const { lang, slug } = await params;
  const t = await getTranslations({
    locale: lang,
    namespace: "QuestionAnswersPage",
  });

  const data = await getQuestion(slug, lang);
  const relatedQuestions = await getByCategory(slug, lang);

  if (!data) {
    notFound();
  }

  const { question, answers } = data;

  console.log(lang, "locale");

  return (
    <div className="min-h-screen">
      <div className="max-w-4xl mx-auto">
        {/* Back Button */}
        <Link
          href={`/${lang}/ask-question`}
          className="mb-6 inline-flex items-center gap-2 text-blue-600 hover:text-blue-800 transition-colors duration-200 font-medium"
        >
          <svg
            className="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 19l-7-7 7-7"
            />
          </svg>
          {t("backButton")}
        </Link>

        {/* Question Section */}
        <div className="bg-white rounded-3xl shadow-xl border border-gray-100 p-8 mb-8">
          <div className="flex items-start gap-6">
            {/* Icon */}
            <div
              className={`w-16 h-16 bg-gradient-to-br ${question.color} rounded-2xl flex items-center justify-center text-white text-2xl flex-shrink-0`}
            >
              {question.icon}
            </div>

            {/* Content */}
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-4">
                <span className="font-semibold text-gray-700">
                  {question.author}
                </span>
                <span className="text-gray-400">•</span>
                <span className="text-gray-500">{question.date}</span>
                <span
                  className={`text-xs px-3 py-1 rounded-full font-medium bg-gradient-to-r ${question.color} text-white`}
                >
                  {question.category}
                </span>
              </div>

              <h1 className="text-2xl md:text-3xl font-bold text-gray-800 mb-4">
                {question.question}
              </h1>

              <p className="text-gray-600 text-lg leading-relaxed mb-6">
                {question.description}
              </p>

              {/* Stats */}
              <div className="flex items-center gap-6">
                <div className="flex items-center gap-2 text-gray-500">
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                    />
                  </svg>
                  <span>
                    {question.views} {t("views")}
                  </span>
                </div>

                <div className="flex items-center gap-2 px-4 py-2 rounded-xl bg-gray-100 text-gray-600">
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                    />
                  </svg>
                  <span>{question.likes}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Answers Section */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-800">
              {t("answersTitle")} ({answers ? answers.length : 0})
            </h2>
          </div>

          {/* Answers List */}

          <div className="space-y-6">
            {!answers || answers.length === 0 ? (
              <NoAnswersState lang={lang} />
            ) : (
              <div className="space-y-6">
                {answers.map((answer) => (
                  <div
                    key={answer.id}
                    className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6"
                  >
                    <div className="flex items-start gap-4">
                      {/* Avatar */}
                      <div
                        className={`w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 overflow-hidden
    ${
      answer.isExpert
        ? "bg-gradient-to-br from-green-500 to-green-600"
        : "bg-gradient-to-br from-gray-500 to-gray-600"
    }
  `}
                      >
                        {answer.isExpert && answer.avatar ? (
                          <Image
                            width={100}
                            height={100}
                            src={answer.avatar}
                            alt={answer.author}
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <span className="text-white text-xl">
                            {answer.avatar}
                          </span>
                        )}
                      </div>

                      {/* Content */}
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-3">
                          <span className="font-semibold text-gray-700">
                            {answer.author}
                          </span>
                          {answer.isExpert && (
                            <span className="bg-gradient-to-r from-green-500 to-green-600 text-white text-xs px-2 py-1 rounded-full font-medium">
                              {t("expertBadge")}
                            </span>
                          )}
                          <span className="text-gray-400">•</span>
                          <span className="text-gray-500">{answer.date}</span>
                        </div>

                        <div className="text-gray-700 leading-relaxed mb-4 whitespace-pre-line">
                          {answer.answer}
                        </div>

                        {/* Stats (статические) */}
                        <div className="flex items-center gap-4">
                          <div className="flex items-center gap-2 px-3 py-2 rounded-xl text-sm bg-gray-100 text-gray-600">
                            <svg
                              className="w-4 h-4"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5"
                              />
                            </svg>
                            <span>{answer.likes}</span>
                          </div>

                          <div className="flex items-center gap-2 px-3 py-2 rounded-xl text-sm bg-gray-100 text-gray-600">
                            <span>✨</span>
                            <span>
                              {" "}
                              {t("helpful")} ({answer.helpfulCount})
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Related Questions */}
        <div className="mt-12">
          <h3 className="text-2xl font-bold text-gray-800 mb-6">
            {t("relatedQuestions")}
          </h3>

          <div className="grid gap-4">
            {relatedQuestions &&
              relatedQuestions.map((item) => (
                <Link
                  key={item.id}
                  href={`/${lang}/ask-question/${item.slug}`}
                  className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 p-4 group"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <h4 className="font-semibold text-gray-800 mb-2 group-hover:text-blue-600 transition-colors duration-300">
                        {item.question}
                      </h4>
                      <div className="flex items-center gap-3">
                        <span
                          className={`text-xs px-2 py-1 rounded-full font-medium bg-gradient-to-r ${item.color} text-white`}
                        >
                          {item.category}
                        </span>
                        <span className="text-sm text-gray-500">
                          {item.answersCount} ответ
                          {item.answersCount > 1 ? "а" : ""}
                        </span>
                      </div>
                    </div>

                    <svg
                      className="w-5 h-5 text-gray-400 group-hover:text-blue-500 transition-colors duration-300"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 5l7 7-7 7"
                      />
                    </svg>
                  </div>
                </Link>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
}
