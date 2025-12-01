/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { BlueButton } from "@/app/ui/Buttons/BlueButton";
import ReviewService from "@/app/services/reviews/reviewsService";
import { Reply } from "lucide-react";

interface ReviewsPageClientProps {
  companyInfo: any;
  slug: string;
  lang: string;
}

export function ReviewsPageClient({ companyInfo }: ReviewsPageClientProps) {
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
      
      // Обновляем страницу для показа нового отзыва
      router.refresh();
    } catch (error) {
      console.error("Ошибка при создании отзыва:", error);
    }
  };

  const handleAnswerSubmit = async () => {
    if (!selectedReviewId) return;
    try {
      // Здесь должен быть вызов API для создания ответа на отзыв
      // Пример: await ReviewService.createAnswer(selectedReviewId, answerFormData);
      
      console.log("Ответ успешно создан:", answerFormData);
      setIsAnswerModalOpen(false);
      setAnswerFormData({ name: "", email: "", text: "" });
      setSelectedReviewId(null);
      
      // Обновляем страницу
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
      {/* Кнопки для добавления ответов - рендерим для каждого отзыва */}
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
                      Добавить ответ
                    </button>
                  </div>
                </div>
              ) : (
                <div className="bg-gray-50 px-6 py-4 rounded-b-2xl">
                  <div className="text-center py-2">
                    <p className="text-gray-500 text-sm mb-3">Пока нет ответов на этот отзыв</p>
                    <button 
                      onClick={() => openAnswerModal(review.id)}
                      className="bg-gradient-to-r cursor-pointer from-indigo-500 to-purple-600 text-white px-4 py-2 rounded-xl font-medium hover:shadow-md transition-all duration-300 flex items-center gap-2 text-sm mx-auto"
                    >
                      <Reply className="w-4 h-4" />
                      Стать первым, кто ответит
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
            Поделитесь своим опытом
          </h4>
          <p className="text-gray-600 mb-6">
            Ваш отзыв поможет другим пользователям сделать правильный выбор
          </p>
          <BlueButton
            text="Оставить отзыв"
            onClick={() => setIsModalOpen(true)}
          />
        </div>
      </div>

      {/* Модальное окно для создания отзыва */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-3xl p-8 max-w-md w-full max-h-[90vh] overflow-y-auto shadow-2xl">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-2xl font-bold text-gray-800">
                Оставить отзыв
              </h3>
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
                  Ваше имя
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Введите ваше имя"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Ваша почта
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Введите вашу почту"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Оценка
                </label>
                <select
                  name="rating"
                  value={formData.rating}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="">Выберите оценку</option>
                  <option value="5">⭐⭐⭐⭐⭐</option>
                  <option value="4">⭐⭐⭐⭐</option>
                  <option value="3">⭐⭐⭐</option>
                  <option value="2">⭐⭐</option>
                  <option value="1">⭐</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Ваш отзыв
                </label>
                <textarea
                  name="text"
                  value={formData.text}
                  onChange={handleInputChange}
                  rows={4}
                  className="w-full px-4 py-3 border border-gray-300 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                  placeholder="Напишите свой отзыв..."
                />
              </div>

              <button
                onClick={handleSubmit}
                className="w-full bg-gradient-to-r from-blue-500 to-yellow-400 text-white py-3 rounded-2xl font-semibold hover:shadow-lg transition-all duration-300 hover:scale-105"
              >
                Отправить отзыв
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
              <h3 className="text-2xl font-bold text-gray-800">
                Ответить на отзыв
              </h3>
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
                  Ваше имя
                </label>
                <input
                  type="text"
                  name="name"
                  value={answerFormData.name}
                  onChange={handleAnswerInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Введите ваше имя"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Ваша почта
                </label>
                <input
                  type="email"
                  name="email"
                  value={answerFormData.email}
                  onChange={handleAnswerInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Введите вашу почту"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Ваш ответ
                </label>
                <textarea
                  name="text"
                  value={answerFormData.text}
                  onChange={handleAnswerInputChange}
                  rows={4}
                  className="w-full px-4 py-3 border border-gray-300 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                  placeholder="Напишите свой ответ..."
                />
              </div>

              <button
                onClick={handleAnswerSubmit}
                className="w-full bg-gradient-to-r from-indigo-500 to-purple-600 text-white py-3 rounded-2xl font-semibold hover:shadow-lg transition-all duration-300 hover:scale-105"
              >
                Отправить ответ
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}