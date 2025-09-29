/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { useState, useEffect } from "react";
import { BlueButton } from "@/app/ui/Buttons/BlueButton";
import ReviewService from "@/app/services/reviews/reviewsService";
import MfoService from "@/app/services/mfos/mfosService";
import { MessageCircle, User, Calendar, CheckCircle, Reply, Star } from "lucide-react";
import { Spinner } from "@/app/ui/Spinner";


export default function ReviewsPage({ params }: { params: { slug: string } }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isAnswerModalOpen, setIsAnswerModalOpen] = useState(false);
  const [selectedReviewId, setSelectedReviewId] = useState<number | null>(null);
  const [companyInfo, setCompanyInfo] = useState<any>(null);
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

  // Загружаем данные компании
  useEffect(() => {
    async function fetchCompany() {
      try {
        const response = await MfoService.getMfoBySlug(params.slug);
        setCompanyInfo({
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
          commission: "0% to be",
          ageLimit: `${response.ageFrom}-${response.ageTo}`,
          isFirstLoanZero: response.isFirstLoanZero,
          phone: response.phone,
          website: response.website,
          license: response.licenseNumber,
        });
      } catch (error) {
        console.error("Error loading company:", error);
      }
    }
    fetchCompany();
  }, [params.slug]);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("uk-UA", {
      day: "numeric",
      month: "long",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

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
          <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
            isExpert 
              ? "" 
              : "bg-gradient-to-br from-gray-500 to-slate-600"
          }`}>
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
                      Эксперт
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
                {formatDate(answer.createdAt)}
              </div>
            </div>
            <p className="text-gray-700 leading-relaxed">
              {(answer.textRu || answer.textOriginal).replace(/\n/g, ' ')}
            </p>
          </div>
        </div>
      </div>
    );
  };

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
      const newReview = await ReviewService.createReview({
        rating: Number(formData.rating),
        textOriginal: formData.text,
        targetType: "mfo",
        targetId: companyInfo.id,
        authorName: formData.name,
        authorEmail: formData.email,
      });

      console.log("Отзыв успешно создан:", newReview);
      setIsModalOpen(false);
      setFormData({ name: "", email: "", rating: "", text: "" });
      
      // Обновляем список отзывов
      const updatedResponse = await MfoService.getMfoBySlug(params.slug);
      setCompanyInfo((prev: any) => ({ ...prev, reviews: updatedResponse.reviews }));
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
      
      // Обновляем список отзывов
      const updatedResponse = await MfoService.getMfoBySlug(params.slug);
      setCompanyInfo((prev: any) => 
        prev ? { ...prev, reviews: updatedResponse.reviews } : null
      );
    } catch (error) {
      console.error("Ошибка при создании ответа:", error);
    }
  };

  const openAnswerModal = (reviewId: number) => {
    setSelectedReviewId(reviewId);
    setIsAnswerModalOpen(true);
  };

  if (!companyInfo) {
  return <Spinner />; // или <Spinner />
}

  return (
    <div>
      <h2 className="text-2xl font-bold text-gray-800 mb-6">
        Отзывы {companyInfo ? `о ${companyInfo.name}` : ""}
      </h2>

      {/* Отображение существующих отзывов */}
      {companyInfo?.reviews && companyInfo.reviews.length > 0 ? (
        <div className="space-y-6 mb-8">
          <h3 className="text-xl font-semibold text-gray-800 mb-4">
            Отзывы пользователей ({companyInfo.reviews.length})
          </h3>
          {companyInfo.reviews.map((review: any) => (
            <div
              key={review.id}
              className="bg-white border border-gray-200 rounded-2xl shadow-sm overflow-hidden"
            >
              {/* Отзыв */}
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
                        {formatDate(review.createdAt)}
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
                          {review.answers.length} ответ{review.answers.length > 1 ? 'а' : ''}
                        </span>
                      )}
                    </div>
                    <p className="text-gray-600 leading-relaxed">
                      { review.textOriginal}
                    </p>
                  </div>
                </div>
              </div>

              {/* Ответы на отзыв */}
              {review.answers && review.answers.length > 0 && (
                <div className="bg-gray-50 px-6 py-4">
                  <div className="space-y-3">
                    {/* Сначала показываем ответы экспертов */}
                    {review.answers
                      .filter((answer: any) => answer.expert !== null)
                      .map(renderAnswer)}
                    
                    {/* Затем ответы пользователей */}
                    {review.answers
                      .filter((answer: any) => answer.expert === null)
                      .map(renderAnswer)}
                  </div>
                  
                  {/* Кнопка добавить ответ */}
                  <div className="mt-4 pt-4 border-t border-gray-200">
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
              )}

              {/* Если нет ответов, показываем только кнопку */}
              {(!review.answers || review.answers.length === 0) && (
                <div className="bg-gray-50 px-6 py-4">
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
      ) : (
        /* Пустое состояние */
        <div className="text-center py-12">
          <div className="text-6xl mb-4">📝</div>
          <h3 className="text-xl font-semibold text-gray-800 mb-2">
            Отзывы пока отсутствуют
          </h3>
          <p className="text-gray-600 mb-6">
            Станьте первым, кто оставит отзыв об этой компании
          </p>
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
    </div>
  );
}