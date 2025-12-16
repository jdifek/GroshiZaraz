import { faqData } from "@/app/data/faqData";

type TranslationFunction = (key: string) => string;

export function getFaqData(t: TranslationFunction) {
  return faqData.map((item) => ({
    ...item,
    question: t(item.questionKey),
    answer: t(item.answerKey),
    category: t(`categories.${item.category}`),
  }));
}