
export default function QuestionsPage() {
 
  return (
    <div>
    <h2 className="text-2xl font-bold text-gray-800 mb-6">
      Часто задаваемые вопросы
    </h2>
    <div className="space-y-4">
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
          Только паспорт гражданина РФ и банковская карта для получения
          средств.
        </p>
      </div>
      <div className="bg-gray-50 rounded-2xl p-6">
        <h3 className="font-semibold text-gray-800 mb-2">
          Первый займ действительно бесплатный?
        </h3>
        <p className="text-gray-600">
          Да, новые клиенты получают первый займ под 0% на срок до 30
          дней.
        </p>
      </div>
    </div>
  </div>
  );
}
