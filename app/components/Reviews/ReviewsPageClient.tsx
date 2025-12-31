/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { BlueButton } from "@/app/ui/Buttons/BlueButton";
import ReviewService from "@/app/services/reviews/reviewsService";
import { Reply } from "lucide-react";
import { useTranslations } from "next-intl";

interface ReviewsPageClientProps {
  companyInfo: any;
  slug: string;
  lang: string;
}

export function ReviewsPageClient({ companyInfo }: ReviewsPageClientProps) {
  const t = useTranslations("ReviewsPageClient");
  const router = useRouter();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isAnswerModalOpen, setIsAnswerModalOpen] = useState(false);
  const [selectedReviewId, setSelectedReviewId] = useState<number | null>(null);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    rating: "",
    text: "",
  });
  const [answerFormData, setAnswerFormData] = useState({
    name: "",
    email: "",
    text: "",
  });

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleAnswerInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setAnswerFormData({ ...answerFormData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    if (!companyInfo) return;
    try {
      await ReviewService.createReview({
        rating: Number(formData.rating),
        textOriginal: formData.text,
        targetType: "mfo",
        targetId: companyInfo.id,
        authorName: formData.name,
        authorEmail: formData.email,
      });

      setIsModalOpen(false);
      setFormData({ name: "", email: "", rating: "", text: "" });
      router.refresh();
    } catch (error) {
      console.error("Ошибка при создании отзыва:", error);
    }
  };

  const handleAnswerSubmit = async () => {
    if (!selectedReviewId) return;
    try {
      console.log("Ответ успешно создан:", answerFormData);
      setIsAnswerModalOpen(false);
      setAnswerFormData({ name: "", email: "", text: "" });
      setSelectedReviewId(null);
      router.refresh();
    } catch (error) {
      console.error("Ошибка при создании ответа:", error);
    }
  };

  const openAnswerModal = (reviewId: number) => {
    setSelectedReviewId(reviewId);
    setIsAnswerModalOpen(true);
  };

  return (
    <>
      {/* Кнопки для добавления ответов */}
      {companyInfo.reviews && companyInfo.reviews.length > 0 && (
        <div className="space-y-6 mb-8">
          {companyInfo.reviews.map((review: any) => (
            <div key={`answer-btn-${review.id}`}>
              {review.answers && review.answers.length > 0 ? (
                <div className="bg-gray-50 px-6 py-4 rounded-b-2xl">
                  <div className="pt-4 border-t border-gray-200">
                    <button
                      onClick={() => openAnswerModal(review.id)}
                      className="
                        bg-gradient-to-r from-indigo-500 to-purple-600
                        text-white px-4 py-2 rounded-xl font-medium
                        flex items-center gap-2 text-sm
                        cursor-pointer
                        transition-all duration-300
                        hover:from-indigo-600 hover:to-purple-700
                      "
                    >
                      <Reply className="w-4 h-4" />
                      {t("modal.answerReview.answerButton")}
                    </button>
                  </div>
                </div>
              ) : (
                <div className="bg-gray-50 px-6 py-4 rounded-b-2xl">
                  <div className="text-center py-2">
                    <p className="text-gray-500 text-sm mb-3">{t("modal.answerReview.noAnswersText")}</p>
                    <button 
                      onClick={() => openAnswerModal(review.id)}
                      className="bg-gradient-to-r cursor-pointer from-indigo-500 to-purple-600 text-white px-4 py-2 rounded-xl font-medium hover:shadow-md transition-all duration-300 flex items-center gap-2 text-sm mx-auto"
                    >
                      <Reply className="w-4 h-4" />
                      {t("modal.answerReview.firstAnswerButton")}
                    </button>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      {/* Кнопка оставить отзыв */}
      <div className="mt-8 p-6 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl border border-blue-100">
        <div className="text-center">
          <h4 className="text-xl font-semibold text-gray-800 mb-2">
            {t("shareExperienceTitle")}
          </h4>
          <p className="text-gray-600 mb-6">{t("shareExperienceText")}</p>
          <BlueButton text={t("reviewButton")} onClick={() => setIsModalOpen(true)} />
        </div>
      </div>

      {/* Модальное окно для создания отзыва */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-3xl p-8 max-w-md w-full max-h-[90vh] overflow-y-auto shadow-2xl">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-2xl font-bold text-gray-800">{t("modal.createReview.title")}</h3>
              <button
                onClick={() => setIsModalOpen(false)}
                className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center hover:bg-gray-200 transition-colors"
              >
                ×
              </button>
            </div>

            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {t("modal.createReview.nameLabel")}
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  placeholder={t("modal.createReview.namePlaceholder")}
                  className="w-full px-4 py-3 border border-gray-300 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {t("modal.createReview.emailLabel")}
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder={t("modal.createReview.emailPlaceholder")}
                  className="w-full px-4 py-3 border border-gray-300 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {t("modal.createReview.ratingLabel")}
                </label>
                <select
                  name="rating"
                  value={formData.rating}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="">{t("modal.createReview.ratingOption")}</option>
                  <option value="5">⭐⭐⭐⭐⭐</option>
                  <option value="4">⭐⭐⭐⭐</option>
                  <option value="3">⭐⭐⭐</option>
                  <option value="2">⭐⭐</option>
                  <option value="1">⭐</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {t("modal.createReview.textLabel")}
                </label>
                <textarea
                  name="text"
                  value={formData.text}
                  onChange={handleInputChange}
                  rows={4}
                  placeholder={t("modal.createReview.textPlaceholder")}
                  className="w-full px-4 py-3 border border-gray-300 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                />
              </div>

              <button
                onClick={handleSubmit}
                className="w-full bg-gradient-to-r from-blue-500 to-yellow-400 text-white py-3 rounded-2xl font-semibold hover:shadow-lg transition-all duration-300 hover:scale-105"
              >
                {t("modal.createReview.submitButton")}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Модальное окно для ответа на отзыв */}
      {isAnswerModalOpen && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-3xl p-8 max-w-md w-full max-h-[90vh] overflow-y-auto shadow-2xl">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-2xl font-bold text-gray-800">{t("modal.answerReview.title")}</h3>
              <button
                onClick={() => setIsAnswerModalOpen(false)}
                className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center hover:bg-gray-200 transition-colors"
              >
                ×
              </button>
            </div>

            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {t("modal.answerReview.nameLabel")}
                </label>
                <input
                  type="text"
                  name="name"
                  value={answerFormData.name}
                  onChange={handleAnswerInputChange}
                  placeholder={t("modal.answerReview.namePlaceholder")}
                  className="w-full px-4 py-3 border border-gray-300 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {t("modal.answerReview.emailLabel")}
                </label>
                <input
                  type="email"
                  name="email"
                  value={answerFormData.email}
                  onChange={handleAnswerInputChange}
                  placeholder={t("modal.answerReview.emailPlaceholder")}
                  className="w-full px-4 py-3 border border-gray-300 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {t("modal.answerReview.textLabel")}
                </label>
                <textarea
                  name="text"
                  value={answerFormData.text}
                  onChange={handleAnswerInputChange}
                  rows={4}
                  placeholder={t("modal.answerReview.textPlaceholder")}
                  className="w-full px-4 py-3 border border-gray-300 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                />
              </div>

              <button
                onClick={handleAnswerSubmit}
                className="w-full bg-gradient-to-r from-indigo-500 to-purple-600 text-white py-3 rounded-2xl font-semibold hover:shadow-lg transition-all duration-300 hover:scale-105"
              >
                {t("modal.answerReview.submitButton")}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default ReviewsPageClient;
