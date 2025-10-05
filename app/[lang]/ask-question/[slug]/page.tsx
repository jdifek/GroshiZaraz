"use client";
import { usePathname, useRouter } from "next/navigation"; // <- вот здесь поменял
import React, { useState } from "react";
export const dynamic = "force-dynamic";

export default function QuestionAnswersPage() {
  const [newAnswer, setNewAnswer] = useState("");
  const [showAnswerForm, setShowAnswerForm] = useState(false);
  const router = useRouter();
  // Мок данные вопроса
  const question = {
    id: 1,
    question: "Можно ли получить кредит без справки о доходах?",
    author: "Александр М.",
    date: "2 часа назад",
    category: "Документы",
    views: 156,
    likes: 23,
    isLiked: false,
    description:
      "Интересует возможность получения кредита без предоставления справки о доходах. Работаю неофициально, но имею стабильный доход. Какие есть варианты?",
    icon: "👤",
    color: "from-blue-500 to-blue-600",
  };

  // Мок данные ответов
  const [answers, setAnswers] = useState([
    {
      id: 1,
      author: "Эксперт Фіногляд",
      isExpert: true,
      date: "1 час назад",
      likes: 15,
      isLiked: false,
      answer:
        "Да, такая возможность существует. Многие наши партнеры предлагают кредиты без справки о доходах. Основные варианты:\n\n• Экспресс-кредиты до 50 000 грн\n• Кредиты под залог недвижимости или автомобиля\n• Кредиты для ФОП с упрощенным документооборотом\n• P2P кредитование\n\nОднако учтите, что процентные ставки могут быть выше, а максимальная сумма - ограничена.",
      isHelpful: true,
      helpfulCount: 12,
      avatar: "🎯",
    },
    {
      id: 2,
      author: "Мария К.",
      isExpert: false,
      date: "45 минут назад",
      likes: 8,
      isLiked: true,
      answer:
        "Я получала такой кредит в Кредиторе. Нужен был только паспорт и ИНН. Правда, сумма была небольшая - 25 000 грн на 6 месяцев. Ставка 2,5% в месяц. Одобрили за 20 минут.",
      isHelpful: false,
      helpfulCount: 8,
      avatar: "👩",
    },
    {
      id: 3,
      author: "Финансовый консультант Иван",
      isExpert: true,
      date: "30 минут назад",
      likes: 11,
      isLiked: false,
      answer:
        "Дополню ответ коллеги. Также рассмотрите такие варианты:\n\n1. Кредит с созаемщиком (если есть родственники с официальным доходом)\n2. Микрозаймы - до 20 000 грн без справок\n3. Кредитные карты с льготным периодом\n\nВажно: внимательно читайте договор и не соглашайтесь на подозрительно низкие ставки - это может быть мошенничество.",
      isHelpful: true,
      helpfulCount: 9,
      avatar: "👨‍💼",
    },
  ]);

  const handleLikeQuestion = () => {
    // Логика лайка вопроса
  };

  const handleLikeAnswer = (answerId: number) => {
    setAnswers(
      answers.map((answer) =>
        answer.id === answerId
          ? {
              ...answer,
              isLiked: !answer.isLiked,
              likes: answer.isLiked ? answer.likes - 1 : answer.likes + 1,
            }
          : answer
      )
    );
  };

  const handleMarkHelpful = (answerId: number) => {
    setAnswers(
      answers.map((answer) =>
        answer.id === answerId
          ? {
              ...answer,
              isHelpful: !answer.isHelpful,
              helpfulCount: answer.isHelpful
                ? answer.helpfulCount - 1
                : answer.helpfulCount + 1,
            }
          : answer
      )
    );
  };

  const handleSubmitAnswer = () => {
    if (newAnswer.trim()) {
      const answer = {
        id: answers.length + 1,
        author: "Вы",
        isExpert: false,
        date: "только что",
        likes: 0,
        isLiked: false,
        answer: newAnswer,
        isHelpful: false,
        helpfulCount: 0,
        avatar: "😊",
      };

      setAnswers([...answers, answer]);
      setNewAnswer("");
      setShowAnswerForm(false);
    }
  };

  const pathname = usePathname(); // например "/ru/ask-question/test"

  const localePrefix = pathname.split("/")[1]; // "ru"

  const handleBackToFAQ = () => {
    router.push(`/${localePrefix}/ask-question`);
  };

  return (
    <div className="min-h-screen">
      <div className="max-w-4xl mx-auto">
        {/* Back Button */}
        <button
          onClick={handleBackToFAQ}
          className="mb-6 cursor-pointer flex items-center gap-2 text-blue-600 hover:text-blue-800 transition-colors duration-200 font-medium"
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
          Назад к вопросам
        </button>

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
                  <span>{question.views} просмотров</span>
                </div>

                <button
                  onClick={handleLikeQuestion}
                  className={`flex items-center gap-2 px-4 py-2 rounded-xl transition-all duration-200 ${
                    question.isLiked
                      ? "bg-red-100 text-red-600"
                      : "bg-gray-100 text-gray-600 hover:bg-red-50 hover:text-red-500"
                  }`}
                >
                  <svg
                    className="w-5 h-5"
                    fill={question.isLiked ? "currentColor" : "none"}
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
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Answers Section */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-800">
              Ответы ({answers.length})
            </h2>

            <button
              onClick={() => setShowAnswerForm(true)}
              className="bg-gradient-to-r from-blue-500 to-yellow-400 text-white px-6 py-3 rounded-2xl font-semibold flex items-center gap-2 hover:shadow-lg transition-all duration-300 hover:scale-105"
            >
              <span className="text-lg">✏️</span>
              Написать ответ
            </button>
          </div>

          {/* Answers List */}
          <div className="space-y-6">
            {answers.map((answer, index) => (
              <div
                key={answer.id}
                className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="flex items-start gap-4">
                  {/* Avatar */}
                  <div
                    className={`w-12 h-12 ${
                      answer.isExpert
                        ? "bg-gradient-to-br from-green-500 to-green-600"
                        : "bg-gradient-to-br from-gray-500 to-gray-600"
                    } rounded-xl flex items-center justify-center text-white text-xl flex-shrink-0`}
                  >
                    {answer.avatar}
                  </div>

                  {/* Content */}
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-3">
                      <span className="font-semibold text-gray-700">
                        {answer.author}
                      </span>
                      {answer.isExpert && (
                        <span className="bg-gradient-to-r from-green-500 to-green-600 text-white text-xs px-2 py-1 rounded-full font-medium">
                          ✅ Эксперт
                        </span>
                      )}
                      <span className="text-gray-400">•</span>
                      <span className="text-gray-500">{answer.date}</span>
                    </div>

                    <div className="text-gray-700 leading-relaxed mb-4 whitespace-pre-line">
                      {answer.answer}
                    </div>

                    {/* Actions */}
                    <div className="flex items-center gap-4">
                      <button
                        onClick={() => handleLikeAnswer(answer.id)}
                        className={`flex items-center gap-2 px-3 py-2 rounded-xl text-sm transition-all duration-200 ${
                          answer.isLiked
                            ? "bg-blue-100 text-blue-600"
                            : "bg-gray-100 text-gray-600 hover:bg-blue-50 hover:text-blue-500"
                        }`}
                      >
                        <svg
                          className="w-4 h-4"
                          fill={answer.isLiked ? "currentColor" : "none"}
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
                      </button>

                      <button
                        onClick={() => handleMarkHelpful(answer.id)}
                        className={`flex items-center gap-2 px-3 py-2 rounded-xl text-sm transition-all duration-200 ${
                          answer.isHelpful
                            ? "bg-green-100 text-green-600"
                            : "bg-gray-100 text-gray-600 hover:bg-green-50 hover:text-green-500"
                        }`}
                      >
                        <span>✨</span>
                        <span>Полезно ({answer.helpfulCount})</span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Answer Form */}
        {showAnswerForm && (
          <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6">
            <h3 className="text-xl font-bold text-gray-800 mb-4">
              Написать ответ
            </h3>

            <textarea
              value={newAnswer}
              onChange={(e) => setNewAnswer(e.target.value)}
              placeholder="Поделитесь своим опытом или знаниями..."
              rows={6}
              className="w-full px-4 py-3 border border-gray-300 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none mb-4"
            />

            <div className="flex items-center gap-3">
              <button
                onClick={handleSubmitAnswer}
                className="bg-gradient-to-r from-blue-500 to-yellow-400 text-white px-6 py-3 rounded-2xl font-semibold hover:shadow-lg transition-all duration-300 hover:scale-105"
              >
                Опубликовать ответ
              </button>

              <button
                onClick={() => setShowAnswerForm(false)}
                className="bg-gray-100 text-gray-700 px-6 py-3 rounded-2xl font-semibold hover:bg-gray-200 transition-all duration-200"
              >
                Отмена
              </button>
            </div>
          </div>
        )}

        {/* Related Questions */}
        <div className="mt-12">
          <h3 className="text-2xl font-bold text-gray-800 mb-6">
            Похожие вопросы
          </h3>

          <div className="grid gap-4">
            {[
              {
                id: 2,
                question: "Какие банки дают кредиты с 18 лет?",
                category: "Возрастные ограничения",
                answers: 3,
                color: "from-green-500 to-green-600",
              },
              {
                id: 3,
                question: "Влияет ли количество запросов на кредитную историю?",
                category: "Кредитная история",
                answers: 5,
                color: "from-purple-500 to-purple-600",
              },
              {
                id: 4,
                question:
                  "Можно ли получить кредит с плохой кредитной историей?",
                category: "Кредитная история",
                answers: 7,
                color: "from-red-500 to-red-600",
              },
            ].map((item, index) => (
              <div
                key={item.id}
                className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 p-4 cursor-pointer group"
                style={{ animationDelay: `${index * 0.1}s` }}
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
                        {item.answers} ответ{item.answers > 1 ? "а" : ""}
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
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
