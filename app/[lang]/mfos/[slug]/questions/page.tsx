/* eslint-disable @next/next/no-img-element */
import MfoService from "@/app/services/mfos/mfosService";
import { BlueButton } from "@/app/ui/Buttons/BlueButton";
import { MessageCircle, User, Calendar, CheckCircle, Reply } from "lucide-react";

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

  const renderAnswer = (answer) => {
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
          <div className="space-y-6">
            {questions.map((question) => (
              <div
                key={question.id}
                className="bg-white border border-gray-200 rounded-2xl shadow-sm overflow-hidden"
              >
                {/* Вопрос */}
                <div className="p-6">
                  <div className="flex items-start gap-4 mb-3">
                    <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full flex items-center justify-center">
                      <User className="w-5 h-5 text-white" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="font-semibold text-gray-800">
                          {question.name}
                        </h4>
                        <div className="flex items-center gap-2 text-sm text-gray-500">
                          <Calendar className="w-4 h-4" />
                          {formatDate(question.createdAt)}
                        </div>
                      </div>
                      <div className="flex items-center gap-2 mb-3">
                        <span className="px-3 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-700">
                          {question.category}
                        </span>
                        {question.answers && question.answers.length > 0 && (
                          <span className="px-3 py-1 rounded-full text-xs font-medium bg-green-100 text-green-700 flex items-center gap-1">
                            <MessageCircle className="w-3 h-3" />
                            {question.answers.length} ответ{question.answers.length > 1 ? 'а' : ''}
                          </span>
                        )}
                      </div>
                      <h5 className="font-medium text-gray-800 mb-2">
                        {question.subject}
                      </h5>
                      <p className="text-gray-600">{question.textOriginal}</p>
                    </div>
                  </div>
                </div>

                {/* Ответы */}
                {question.answers && question.answers.length > 0 && (
                  <div className="bg-gray-50 px-6 py-4">
                    <div className="space-y-3">
                      {/* Сначала показываем ответы экспертов */}
                      {question.answers
                        .filter(answer => answer.expert !== null)
                        .map(renderAnswer)}
                      
                      {/* Затем ответы пользователей */}
                      {question.answers
                        .filter(answer => answer.expert === null)
                        .map(renderAnswer)}
                    </div>
                    
                    {/* Кнопка добавить ответ */}
                    <div className="mt-4 pt-4 border-t border-gray-200">
  <button
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
                {(!question.answers || question.answers.length === 0) && (
                  <div className="bg-gray-50 px-6 py-4">
                    <div className="text-center py-2">
                      <p className="text-gray-500 text-sm mb-3">Пока нет ответов на этот вопрос</p>
                      <button className="bg-gradient-to-r from-indigo-500 to-purple-600 text-white px-4 py-2 rounded-xl font-medium hover:shadow-md transition-all duration-300 flex items-center gap-2 text-sm mx-auto">
                        <Reply className="w-4 h-4" />
                        Стать первым, кто ответит
                      </button>
                    </div>
                  </div>
                )}
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
        <BlueButton text="     Задать вопрос"/>
        </div>
      </div>
    </div>
  );
}