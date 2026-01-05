/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @next/next/no-img-element */
import { ReviewsPageClient } from "@/app/components/Reviews/ReviewsPageClient";
import MfoService from "@/app/services/mfos/mfosService";
import { formatDate } from "@/app/utils/formatDate";
import {
  MessageCircle,
  User,
  Calendar,
  CheckCircle,
  Reply,
  Star,
} from "lucide-react";
import { Metadata } from "next";
import { getTranslations } from "next-intl/server";

type ReviewsPageProps = {
  params: Promise<{ lang: string; slug: string }>;
};
// Генерация метаданных для страницы отзывов МФО
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string; lang: string }>;
}): Promise<Metadata> {
  const { slug, lang } = await params;
  const company = await MfoService.getMfoBySlug(slug);
  const defaultImage = "https://finoglyad.com.ua/default-og-image.jpg";
  const baseUrl = "https://finoglyad.com.ua";

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
    };
  }

  const titleUk = `${company.name} — Відгуки користувачів та оцінки МФО`;
  const descriptionUk = `Відгуки про МФО ${company.name}: думки користувачів, оцінки та досвід отримання кредитів. Дізнайтесь, як швидко оформити позику онлайн.`;
  const keywordsUk = `відгуки, МФО, кредит, позику, швидко, фіногляд, досвід, оцінки, користувачі`;

  const titleRu = `${company.name} — Отзывы пользователей и оценки МФО`;
  const descriptionRu = `Отзывы о МФО ${company.name}: мнения пользователей, оценки и опыт получения займов. Узнайте, как быстро оформить займ онлайн.`;
  const keywordsRu = `отзывы, МФО, займ, быстро, Фіногляд, опыт, оценки, пользователи`;

  return {
    title: lang === "ru" ? titleRu : titleUk,
    description: lang === "ru" ? descriptionRu : descriptionUk,
    keywords: lang === "ru" ? keywordsRu : keywordsUk,
    openGraph: {
      title: lang === "ru" ? titleRu : titleUk,
      description: lang === "ru" ? descriptionRu : descriptionUk,
      url: `${baseUrl}/${lang}/mfos/${slug}/reviews`,
      images: [company.logo || defaultImage],
      siteName: "Фіногляд",
      locale: lang === "ru" ? "ru_RU" : "uk_UA",
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
    alternates: {
      canonical: `${baseUrl}/${lang}/mfos/${slug}/reviews`,
      languages: {
        uk: `${baseUrl}/uk/mfos/${slug}/reviews`,
        ru: `${baseUrl}/ru/mfos/${slug}/reviews`,
      },
    },
  };
}

async function getCompanyData(slug: string) {
  try {
    const response = await MfoService.getMfoBySlug(slug);
    return {
      id: response.id,
      name: response.name,
      logo: response.logo,
      rating: response.rating,
      reviews: response.reviews,
      minAmount: response.minAmount,
      maxAmount: response.maxAmount,
      term: `${response.minTerm}-${response.maxTerm}`,
      rate: response.rating,
      approval: response.approvalRate,
      responseTime: response.decisionTime,
      commission: response.commission,
      ageLimit: `${response.ageFrom}-${response.ageTo}`,
      isFirstLoanZero: response.isFirstLoanZero,
      phone: response.phone,
      website: response.website,
      license: response.licenseNumber,
    };
  } catch (error) {
    console.error("Error loading company:", error);
    return null;
  }
}

const renderStars = (rating: number) => {
  return Array.from({ length: 5 }, (_, i) => (
    <Star
      key={i}
      className={`w-4 h-4 ${
        i < rating ? "text-yellow-400 fill-current" : "text-gray-300"
      }`}
    />
  ));
};

const renderAnswer = (answer: any, lang: string, t: any) => {
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
            {(answer.textRu || answer.textOriginal).replace(/\n/g, " ")}
          </p>
        </div>
      </div>
    </div>
  );
};

export default async function ReviewsPage({ params }: ReviewsPageProps) {
  const { lang, slug } = await params;
  const companyInfo = await getCompanyData(slug);
  const t = await getTranslations({
    locale: lang,
    namespace: "ReviewsPageMFO",
  });

  if (!companyInfo) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-600">{t("companyNotFound")}</p>
      </div>
    );
  }

  return (
    <div>
      <h1 className="text-3xl! font-bold text-gray-800 mb-6">
        {t("reviewsAbout")} {companyInfo.name}
      </h1>

      {companyInfo.reviews && companyInfo.reviews.length > 0 ? (
        <div className="space-y-6 mb-8">
          <h3 className="text-xl font-semibold text-gray-800 mb-4">
            {t("userReviews")} ({companyInfo.reviews.length})
          </h3>
          {companyInfo.reviews.map((review: any) => (
            <div
              key={review.id}
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
                        {review.authorName}
                      </h4>
                      <div className="flex items-center gap-2 text-sm text-gray-500">
                        <Calendar className="w-4 h-4" />
                        {formatDate(review.createdAt, lang)}
                      </div>
                    </div>
                    <div className="flex items-center gap-3 mb-3">
                      <div className="flex items-center gap-1">
                        {renderStars(review.rating)}
                      </div>
                      <span className="text-sm font-medium text-gray-700">
                        {review.rating}/5
                      </span>
                      {review.answers && review.answers.length > 0 && (
                        <span className="px-3 py-1 rounded-full text-xs font-medium bg-green-100 text-green-700 flex items-center gap-1">
                          <MessageCircle className="w-3 h-3" />
                          {review.answers.length} {t("answers")}
                        </span>
                      )}
                    </div>
                    <p className="text-gray-600 leading-relaxed">
                      {lang === "ru" ? review.textRu : review.textUk}
                    </p>
                  </div>
                </div>
              </div>

              {review.answers && review.answers.length > 0 && (
                <div className="bg-gray-50 px-6 py-4">
                  <div className="space-y-3">
                    {review.answers.map((answer: any) =>
                      renderAnswer(answer, lang, t)
                    )}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <div className="text-6xl mb-4">📝</div>
          <h3 className="text-xl font-semibold text-gray-800 mb-2">
            {t("noReviewsTitle")}
          </h3>
          <p className="text-gray-600 mb-6">{t("noReviewsText")}</p>
        </div>
      )}

      <ReviewsPageClient companyInfo={companyInfo} slug={slug} lang={lang} />
    </div>
  );
}
