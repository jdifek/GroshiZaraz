import MfoService from "@/app/services/mfos/mfosService";
import { MessageCircle, User, Calendar } from "lucide-react";

export default async function QuestionsPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  let questions = [];

  try {
    const { slug } = await params;
    const response = await MfoService.getMfoBySlug(slug);
    questions = response.questions || [];
  } catch (error) {
    console.error("Error loading questions:", error);
  }

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("uk-UA", {
      day: "numeric",
      month: "long",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <div>
      <h2 className="text-2xl font-bold text-gray-800 mb-6">
        Часто задаваемые вопросы
      </h2>

      {/* Статичные частые вопросы */}
      <div className="space-y-4 mb-8">
        <div className="bg-gray-50 rounded-2xl p-6">
          <h3 className="font-semibold text-gray-800 mb-2">
            Как получить займ?
          </h3>
          <p className="text-gray-600">
            Заполните онлайн-заявку, получите решение за 5 минут, деньги
            поступят на карту в течение 15 минут.
          </p>
        </div>
        <div className="bg-gray-50 rounded-2xl p-6">
          <h3 className="font-semibold text-gray-800 mb-2">
            Какие документы нужны?
          </h3>
          <p className="text-gray-600">
            Только паспорт и ИНН для получения займа.
          </p>
        </div>
        <div className="bg-gray-50 rounded-2xl p-6">
          <h3 className="font-semibold text-gray-800 mb-2">
            Первый займ действительно бесплатный?
          </h3>
          <p className="text-gray-600">
            Да, новые клиенты получают первый займ под 0% на срок до 30 дней.
          </p>
        </div>
      </div>

      {/* Вопросы пользователей */}
      {questions.length > 0 && (
        <div>
          <h3 className="text-xl font-semibold text-gray-800 mb-4">
            Вопросы от пользователей ({questions.length})
          </h3>
          <div className="space-y-4">
            {questions.map((question) => (
              <div
                key={question.id}
                className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm"
              >
                <div className="flex items-start gap-4 mb-3">
                  <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full flex items-center justify-center">
                    <User className="w-5 h-5 text-white" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-semibold text-gray-800">
                        {question.name}
                      </h4>
                      {/* <div className="flex items-center gap-2">
                        <span
                          className={`px-3 py-1 rounded-full text-xs font-medium ${
                            question.isModerated
                              ? "bg-green-100 text-green-700"
                              : "bg-yellow-100 text-yellow-700"
                          }`}
                        >
                          {question.isModerated ? "Проверено" : "На модерации"}
                        </span>
                        <span className="px-3 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-700">
                          {question.category}
                        </span>
                      </div> */}
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-500 mb-3">
                      <Calendar className="w-4 h-4" />
                      {formatDate(question.createdAt)}
                    </div>
                    <h5 className="font-medium text-gray-800 mb-2">
                      {question.subject}
                    </h5>
                    <p className="text-gray-600">{question.textOriginal}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Кнопка задать вопрос */}
      <div className="mt-8 p-6 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl border border-blue-100">
        <div className="text-center">
          <h4 className="text-xl font-semibold text-gray-800 mb-2">
            Не нашли ответ на свой вопрос?
          </h4>
          <p className="text-gray-600 mb-6">
            Задайте вопрос напрямую представителям компании
          </p>
          <button className="bg-gradient-to-r from-blue-500 to-blue-600 text-white px-8 py-3 rounded-2xl font-semibold hover:shadow-lg transition-all duration-300 flex items-center gap-2 mx-auto">
            <MessageCircle className="w-5 h-5" />
            Задать вопрос
          </button>
        </div>
      </div>
    </div>
  );
}
