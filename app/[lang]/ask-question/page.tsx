import React from "react";
import SiteQuestionService from "@/app/services/siteQuestion/SiteQuestionService";
import { AskQuestionClient } from "@/app/components/AskQuestion/AskQuestionClient";
import { getFaqData } from "@/app/utils/getFaqData";
import { getTranslations } from "next-intl/server";
import { Metadata } from "next";
import { headers } from "next/headers";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const { lang } = await params;
  const headersList = await headers();
  const pathname = headersList.get("x-pathname") || "/";
  const cleanPath = pathname.replace(/^\/(uk|ru)/, "") || "/";

  let messages;

  try {
    messages = (await import(`@/app/messages/${lang}.json`)).default;
  } catch {
    messages = (await import(`@/app/messages/uk.json`)).default;
  }

  try {
    const title = messages.AskQuestionPage.meta.title;
    const description = messages.AskQuestionPage.meta.description;

    return {
      title: `${title}`,
      description,
      keywords:
        lang === "uk"
          ? "питання, відповіді, FAQ, підтримка, консультація, кредити, позики, МФО, Україна"
          : "вопросы, ответы, FAQ, поддержка, консультация, кредиты, займы, МФО, Украина",
      robots: "index, follow",
      openGraph: {
        title,
        description,
        url: `https://groshi-zaraz.vercel.app/${lang}${cleanPath}`,
        siteName: messages.Metadata.root.siteName,
        type: "website",
        locale: lang === "uk" ? "uk_UA" : "ru_UA",
        images: [
          {
            url: "https://groshi-zaraz.vercel.app/og-faq-image.jpg",
            width: 1200,
            height: 630,
            alt: title,
          },
        ],
      },
    };
  } catch (error) {
    console.error("Metadata error:", error);

    return {
      title: messages.Metadata?.notFound?.title ??
        (lang === "uk"
          ? "404 — Сторінку не знайдено"
          : "404 — Страница не найдена"),
      description: messages.Metadata?.notFound?.description ??
        (lang === "uk"
          ? "Запитувана сторінка не існує."
          : "Запрашиваемая страница не существует."),
      robots: "noindex, nofollow",
    };
  }
}

async function getUserQuestions(lang: string) {
  try {
    const response = await SiteQuestionService.getAllQuestions({
      onlyModerated: true,
    });

    const mappedQuestions = response.map((question) => {
      const hasAnswer = question.answers && question.answers.length > 0;

      return {
        id: question.id,
        slug: question.slug,
        question: lang === "ru" ? question.textRu : question.textUk,
        author: question.name,
        date: question.createdAt,
        category: question.category,
        hasAnswer,
        answersCount: question.answers?.length || 0,
        icon: "👤",
        color: "from-blue-500 to-blue-600",
      };
    });

    return mappedQuestions;
  } catch (error) {
    console.error("Error fetching user questions:", error);
    return [];
  }
}

export default async function AskQuestionPage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  const t = await getTranslations({
    locale: lang,
    namespace: "AskQuestionPage",
  });

  const userQuestions = await getUserQuestions(lang);

  const translatedFaqData = getFaqData(t);

  const categories = [
    t("categories.all"),
    t("categories.application"),
    t("categories.terms"),
    t("categories.documents"),
    t("categories.creditHistory"),
    t("categories.cost"),
    t("categories.repayment"),
    t("categories.repaymentProblems"),
    t("categories.security"),
    t("categories.workingHours"),
  ];

  return (
    <div className="min-h-screen">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4 relative inline-block">
            {t("title")}
            <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-20 h-1 bg-gradient-to-r from-blue-500 to-yellow-400 rounded-full"></div>
          </h1>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            {t("subtitle")}
          </p>
        </div>

        {/* Client Component with all interactive functionality */}
        <AskQuestionClient
          initialUserQuestions={userQuestions}
          initialFaqData={translatedFaqData}
          categories={categories}
          lang={lang}
        />

        {/* Contact Section - Static SSR */}
        <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-3xl p-8 text-white shadow-xl mt-16">
          <div className="text-center">
            <h2 className="text-3xl font-bold mb-4">{t("contact.title")}</h2>
            <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
              {t("contact.subtitle")}
            </p>

            <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
              <div className="bg-white/10 rounded-2xl p-6 backdrop-blur-sm hover:bg-white/20 transition-all duration-300">
                <div className="text-3xl mb-4">📞</div>
                <h3 className="text-lg font-semibold mb-2">
                  {t("contact.phone.title")}
                </h3>
                <p className="text-blue-100">{t("contact.phone.number")}</p>
              </div>

              <div className="bg-white/10 rounded-2xl p-6 backdrop-blur-sm hover:bg-white/20 transition-all duration-300">
                <div className="text-3xl mb-4">📧</div>
                <h3 className="text-lg font-semibold mb-2">
                  {t("contact.email.title")}
                </h3>
                <p className="text-blue-100">{t("contact.email.address")}</p>
              </div>

              <div className="bg-white/10 rounded-2xl p-6 backdrop-blur-sm hover:bg-white/20 transition-all duration-300">
                <div className="text-3xl mb-4">💬</div>
                <h3 className="text-lg font-semibold mb-2">
                  {t("contact.chat.title")}
                </h3>
                <p className="text-blue-100">{t("contact.chat.status")}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}