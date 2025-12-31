/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import ReviewsClient from "./ReviewsClient";
import SiteReviewService from "@/app/services/site-reviews/siteReviewsService";
import { formatDate } from "@/app/utils/formatDate";
import { getTranslations } from "next-intl/server";
import { Metadata } from "next";

type Props = {
  params: Promise<{ lang: string }>;
};

export const revalidate = 3600;

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { lang: rawLang } = await params;
  const lang = rawLang || "uk";

  const t = await getTranslations({ locale: lang, namespace: "ReviewsPage" });

  const reviews = await SiteReviewService.getAllReviews();
  const reviewCount = reviews.pendingCount;

  return {
    title: t("meta.title"),
    description: t("meta.description", { count: reviewCount }),
    keywords: t("meta.keywords"),
    robots: "index, follow",
    alternates: {
      canonical: `https://finoglyad.ua/${lang}/reviews`,
      languages: {
        "uk-UA": `https://finoglyad.ua/uk/reviews`,
        "ru-UA": `https://finoglyad.ua/ru/reviews`,
        "x-default": `https://finoglyad.ua/reviews`,
      },
    },
  };
}

type ReviewsPageProps = {
  params: Promise<{ lang: string }>;
};

type Review = {
  initials: string;
  companyKey: string;
  reviewer: string;
  date: string;
  color: string;
  title: string;
  text: string | undefined;
  rating: number;
};

const getData = async (lang: string): Promise<Review[]> => {
  try {
    const response = await SiteReviewService.getAllReviews();
    const toCard: Review[] = response.reviews.map((review) => ({
      initials: "КМ",
      companyKey: "shvydkogroshi",
      reviewer: "Дарья Т.",
      date: formatDate(review.createdAt, lang),
      color: "bg-gradient-to-br from-blue-500 to-blue-700",
      title: "karmani.title",
      text: lang === "ru" ? review.textRu : review.textUk,
      rating: review.rating,
    }));
    return toCard;
  } catch (e: any) {
    console.log(e);
    return [];
  }
};

const ReviewsPage = async ({ params }: ReviewsPageProps) => {
  const { lang } = await params;

  const reviews = await getData(lang);

  return <ReviewsClient reviews={reviews} lang={lang} />;
};

export default ReviewsPage;
