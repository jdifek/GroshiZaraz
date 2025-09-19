/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import SiteQuestionService from "@/app/services/siteQuestion/SiteQuestionService";
import { usePathname, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

export default function AskQuestionPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [selectedFilter, setSelectedFilter] = useState("Все категории");
  const [faqVisibleCount, setFaqVisibleCount] = useState(6); // Показываем только 6 FAQ изначально
  const [userQuestionsVisibleCount, setUserQuestionsVisibleCount] = useState(3); // Показываем 3 пользовательских вопроса
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    category: "",
    text: "",
  });

  const faqData = [
    // Подача заявки
    {
      id: 1,
      question: "Как подать заявку на кредит через Фіногляд?",
      answer:
        "Для подачи заявки заполните короткую анкету на нашем сайте, укажите желаемую сумму и срок кредитования. Наша система автоматически подберет лучшие предложения от партнеров. Выберите подходящий вариант и подайте заявку напрямую в выбранную организацию.",
      category: "Подача заявки",
      isOpen: false,
      icon: "📝",
      color: "from-blue-500 to-blue-600",
    },
    {
      id: 9,
      question: "Можно ли подать несколько заявок одновременно?",
      answer:
        "Да, вы можете подать заявки в несколько организаций одновременно, чтобы увеличить шансы на одобрение. Однако помните, что каждая заявка может повлиять на вашу кредитную историю.",
      category: "Подача заявки",
      isOpen: false,
      icon: "🎯",
      color: "from-pink-500 to-pink-600",
    },
    {
      id: 11,
      question: "Можно ли изменить данные заявки после отправки?",
      answer:
        "Изменение данных возможно только до того, как заявка будет рассмотрена кредитором. Свяжитесь с поддержкой Фіногляд или с самой финансовой организацией для корректировки информации.",
      category: "Подача заявки",
      isOpen: false,
      icon: "✏️",
      color: "from-blue-400 to-blue-500",
    },
    {
      id: 12,
      question: "Есть ли возрастные ограничения для подачи заявки?",
      answer:
        "Да, заявки принимаются только от граждан Украины в возрасте от 18 лет. Для некоторых организаций минимальный возраст может быть выше.",
      category: "Подача заявки",
      isOpen: false,
      icon: "👤",
      color: "from-purple-400 to-purple-500",
    },
    {
      id: 26,
      question: "Можно ли подать заявку на кредит без постоянной работы?",
      answer:
        "Да, некоторые партнеры рассматривают заявки от клиентов без официального трудоустройства, но суммы и условия могут быть ограничены.",
      category: "Подача заявки",
      isOpen: false,
      icon: "🏠",
      color: "from-blue-300 to-blue-400",
    },
  
    // Сроки
    {
      id: 2,
      question: "Сколько времени занимает рассмотрение заявки?",
      answer:
        "Время рассмотрения зависит от выбранной финансовой организации. Большинство наших партнеров принимают решение в течение 15-30 минут. Некоторые банки могут рассматривать заявки до 24 часов.",
      category: "Сроки",
      isOpen: false,
      icon: "⏱️",
      color: "from-yellow-400 to-yellow-500",
    },
    {
      id: 14,
      question: "Когда можно получить деньги после одобрения?",
      answer:
        "Срок зачисления средств зависит от банка или кредитной организации, обычно от нескольких минут до 1 рабочего дня.",
      category: "Сроки",
      isOpen: false,
      icon: "💳",
      color: "from-yellow-300 to-yellow-400",
    },
    {
      id: 15,
      question: "Можно ли ускорить рассмотрение заявки?",
      answer:
        "Некоторые партнеры предоставляют ускоренное рассмотрение при предоставлении полного пакета документов и корректной информации.",
      category: "Сроки",
      isOpen: false,
      icon: "⚡",
      color: "from-orange-400 to-orange-500",
    },
    {
      id: 16,
      question: "Срок действия одобренной заявки?",
      answer:
        "После одобрения заявки у вас обычно есть от 24 часов до нескольких дней, чтобы принять предложение и подписать договор, в зависимости от банка.",
      category: "Сроки",
      isOpen: false,
      icon: "📆",
      color: "from-yellow-500 to-yellow-600",
    },
    {
      id: 17,
      question: "Как узнать статус своей заявки?",
      answer:
        "Статус можно отслеживать в личном кабинете на сайте. Также уведомления приходят на указанный номер телефона или email.",
      category: "Сроки",
      isOpen: false,
      icon: "🔔",
      color: "from-amber-400 to-amber-500",
    },
  
    // Документы
    {
      id: 3,
      question: "Какие документы нужны для получения кредита?",
      answer:
        "Базовый пакет документов включает: паспорт гражданина Украины, идентификационный код, справку о доходах. Некоторые организации могут запросить дополнительные документы в зависимости от суммы кредита.",
      category: "Документы",
      isOpen: false,
      icon: "📄",
      color: "from-green-500 to-green-600",
    },
    {
      id: 18,
      question: "Нужны ли дополнительные справки о доходах?",
      answer:
        "Для крупных сумм кредитов некоторые банки могут запросить справку 2-НДФЛ или выписку из банка о доходах.",
      category: "Документы",
      isOpen: false,
      icon: "📑",
      color: "from-green-400 to-green-500",
    },
    {
      id: 19,
      question: "Можно ли подать заявку без паспорта?",
      answer:
        "Нет, паспорт является обязательным документом для идентификации заемщика.",
      category: "Документы",
      isOpen: false,
      icon: "🚫",
      color: "from-red-400 to-red-500",
    },
    {
      id: 20,
      question: "Нужен ли идентификационный код иностранцам?",
      answer:
        "Иностранные граждане должны предоставить паспорт и документы, подтверждающие легальное пребывание в Украине. Идентификационный код может понадобиться в зависимости от банка.",
      category: "Документы",
      isOpen: false,
      icon: "🌍",
      color: "from-teal-400 to-teal-500",
    },
    {
      id: 21,
      question: "Какие документы нужны для повторного кредита?",
      answer:
        "Для повторного кредита может потребоваться минимальный пакет: паспорт и идентификационный код. Дополнительные документы зависят от условий банка.",
      category: "Документы",
      isOpen: false,
      icon: "🔁",
      color: "from-green-300 to-green-400",
    },
  
    // Кредитная история
    {
      id: 4,
      question: "Можно ли получить кредит с плохой кредитной историей?",
      answer:
        "Да, среди наших партнеров есть организации, которые работают с заемщиками с негативной кредитной историей. Однако условия кредитования могут отличаться (более высокие процентные ставки, меньшие суммы).",
      category: "Кредитная история",
      isOpen: false,
      icon: "📊",
      color: "from-purple-500 to-purple-600",
    },
    {
      id: 22,
      question: "Как улучшить кредитную историю перед подачей заявки?",
      answer:
        "Погашайте текущие кредиты вовремя, уменьшите количество активных заявок и избегайте просрочек.",
      category: "Кредитная история",
      isOpen: false,
      icon: "📈",
      color: "from-purple-400 to-purple-500",
    },
    {
      id: 23,
      question: "Будет ли новая заявка влиять на кредитный рейтинг?",
      answer:
        "Да, каждая поданная заявка фиксируется и может временно снижать кредитный рейтинг.",
      category: "Кредитная история",
      isOpen: false,
      icon: "⚖️",
      color: "from-purple-300 to-purple-400",
    },
    {
      id: 24,
      question: "Можно ли закрыть старый кредит для улучшения истории?",
      answer:
        "Да, закрытие действующих кредитов положительно влияет на кредитную историю, но важно учитывать сроки закрытия и отчетность банка.",
      category: "Кредитная история",
      isOpen: false,
      icon: "🗂️",
      color: "from-purple-500 to-purple-600",
    },
    {
      id: 25,
      question: "Работают ли микрокредиты на улучшение кредитной истории?",
      answer:
        "Некоторые микрофинансовые организации предоставляют небольшие кредиты для формирования положительной кредитной истории при своевременном погашении.",
      category: "Кредитная история",
      isOpen: false,
      icon: "💳",
      color: "from-purple-400 to-purple-500",
    },
  
    // Стоимость
    {
      id: 5,
      question: "Взимает ли Фіногляд комиссию за свои услуги?",
      answer:
        "Нет, использование нашего сервиса полностью бесплатно для клиентов. Мы получаем вознаграждение от партнеров за привлечение клиентов, но это не влияет на стоимость кредита для заемщика.",
      category: "Стоимость",
      isOpen: false,
      icon: "💰",
      color: "from-red-500 to-red-600",
    },
    {
      id: 27,
      question: "Есть ли скрытые платежи при использовании сервиса?",
      answer:
        "Нет, все платежи и комиссии зависят только от условий кредитора и отображаются перед подтверждением заявки.",
      category: "Стоимость",
      isOpen: false,
      icon: "🔍",
      color: "from-red-400 to-red-500",
    },
    {
      id: 28,
      question: "Влияет ли Фіногляд на процентную ставку кредита?",
      answer:
        "Нет, процентная ставка устанавливается банком или МФО и не зависит от использования нашего сервиса.",
      category: "Стоимость",
      isOpen: false,
      icon: "📊",
      color: "from-red-300 to-red-400",
    },
    {
      id: 29,
      question: "Можно ли получить скидку на кредит через Фіногляд?",
      answer:
        "Иногда партнеры предлагают специальные акции или условия, информация о которых отображается на сайте при выборе кредита.",
      category: "Стоимость",
      isOpen: false,
      icon: "🏷️",
      color: "from-red-400 to-red-500",
    },
    {
      id: 30,
      question: "Как сравниваются комиссии разных кредиторов?",
      answer:
        "На Фіногляд представлены прозрачные условия кредитования каждого партнера, включая все комиссии и процентные ставки, чтобы вы могли выбрать оптимальный вариант.",
      category: "Стоимость",
      isOpen: false,
      icon: "⚖️",
      color: "from-red-500 to-red-600",
    },
  
    // Погашение
    {
      id: 6,
      question: "Как можно погасить кредит досрочно?",
      answer:
        "Возможность досрочного погашения зависит от условий конкретной финансовой организации. Большинство наших партнеров предоставляют такую возможность. Обратитесь напрямую к кредитору для уточнения условий.",
      category: "Погашение",
      isOpen: false,
      icon: "✅",
      color: "from-teal-500 to-teal-600",
    },
    {
      id: 31,
      question: "Можно ли частично погашать кредит?",
      answer:
        "Да, большинство кредиторов позволяют частичное погашение, при этом сумма процентов пересчитывается пропорционально.",
      category: "Погашение",
      isOpen: false,
      icon: "➗",
      color: "from-teal-400 to-teal-500",
    },
    {
      id: 32,
      question: "Какая ответственность при просрочке платежа?",
      answer:
        "Просрочка может привести к начислению штрафов, увеличению процентов и негативно сказаться на кредитной истории.",
      category: "Погашение",
      isOpen: false,
      icon: "⚠️",
      color: "from-teal-300 to-teal-400",
    },
    {
      id: 33,
      question: "Можно ли изменить дату платежа по кредиту?",
      answer:
        "Некоторые кредиторы предоставляют возможность переноса даты платежа, обратившись к ним заранее.",
      category: "Погашение",
      isOpen: false,
      icon: "📅",
      color: "from-teal-400 to-teal-500",
    },
    {
      id: 34,
      question: "Можно ли подключить автоматическое списание платежей?",
      answer:
        "Да, если ваш банк или кредитор поддерживает такую функцию, вы можете настроить автоматическое списание с банковского счета.",
      category: "Погашение",
      isOpen: false,
      icon: "🔁",
      color: "from-teal-500 to-teal-600",
    },
  
    // Проблемы с погашением
    {
      id: 7,
      question: "Что делать, если не могу вовремя погасить кредит?",
      answer:
        "Немедленно свяжитесь с вашим кредитором для обсуждения возможных вариантов. Многие организации предоставляют отсрочку или реструктуризацию. Не игнорируйте проблему - это может привести к дополнительным штрафам.",
      category: "Проблемы с погашением",
      isOpen: false,
      icon: "⚠️",
      color: "from-orange-500 to-orange-600",
    },
    {
      id: 35,
      question: "Как реструктуризировать кредит при финансовых трудностях?",
      answer:
        "Свяжитесь с кредитором и обсудите возможность изменения графика платежей или суммы ежемесячного платежа.",
      category: "Проблемы с погашением",
      isOpen: false,
      icon: "🔧",
      color: "from-orange-400 to-orange-500",
    },
    {
      id: 36,
      question: "Можно ли временно приостановить выплаты?",
      answer:
        "Некоторые кредиторы предоставляют временную отсрочку платежей по уважительным причинам, необходимо согласовать с ними.",
      category: "Проблемы с погашением",
      isOpen: false,
      icon: "⏸️",
      color: "from-orange-300 to-orange-400",
    },
    {
      id: 37,
      question: "К кому обращаться при споре с кредитором?",
      answer:
        "Если кредитор нарушает условия договора, обращайтесь в службу поддержки Фіногляд и, при необходимости, в государственные контролирующие органы.",
      category: "Проблемы с погашением",
      isOpen: false,
      icon: "📞",
      color: "from-orange-400 to-orange-500",
    },
    {
      id: 38,
      question: "Можно ли объединить несколько кредитов в один?",
      answer:
        "Да, некоторые банки и МФО предлагают услуги рефинансирования, объединяя несколько займов в один с новым графиком платежей.",
      category: "Проблемы с погашением",
      isOpen: false,
      icon: "🔗",
      color: "from-orange-500 to-orange-600",
    },
  
    // Безопасность
    {
      id: 8,
      question: "Безопасно ли передавать личные данные через ваш сайт?",
      answer:
        "Да, мы используем современные технологии шифрования данных и соблюдаем все требования по защите персональной информации. Все данные передаются по защищенному соединению и не передаются третьим лицам без вашего согласия.",
      category: "Безопасность",
      isOpen: false,
      icon: "🔒",
      color: "from-indigo-500 to-indigo-600",
    },
    {
      id: 39,
      question: "Как защищены мои платежные данные?",
      answer:
        "Все платежные данные шифруются и передаются напрямую кредиторам без хранения на нашем сервере.",
      category: "Безопасность",
      isOpen: false,
      icon: "💳",
      color: "from-indigo-400 to-indigo-500",
    },
    {
      id: 40,
      question: "Можно ли удалить мои личные данные с сайта?",
      answer:
        "Да, вы можете отправить запрос на удаление данных через форму обратной связи на сайте, и мы удалим их в соответствии с законом.",
      category: "Безопасность",
      isOpen: false,
      icon: "🗑️",
      color: "from-indigo-300 to-indigo-400",
    },
    {
      id: 41,
      question: "Какие меры защиты от мошенников применяются?",
      answer:
        "Мы проверяем всех партнеров, используем SSL-шифрование и информируем клиентов о признаках мошенничества.",
      category: "Безопасность",
      isOpen: false,
      icon: "🛡️",
      color: "from-indigo-400 to-indigo-500",
    },
    {
      id: 42,
      question: "Передаются ли данные третьим лицам?",
      answer:
        "Нет, данные клиентов не передаются третьим лицам без их согласия, за исключением случаев, предусмотренных законом.",
      category: "Безопасность",
      isOpen: false,
      icon: "🚫",
      color: "from-indigo-500 to-indigo-600",
    },
  
    // Режим работы
    {
      id: 10,
      question: "Работает ли Фіногляд в выходные дни?",
      answer:
        "Наш сайт работает круглосуточно, заявки можно подавать в любое время. Техническая поддержка работает 24/7. Однако решения по заявкам партнеры принимают в рабочие часы.",
      category: "Режим работы",
      isOpen: false,
      icon: "⏰",
      color: "from-cyan-500 to-cyan-600",
    },
    {
      id: 43,
      question: "В какое время принимаются заявки банками?",
      answer:
        "Банки обычно рассматривают заявки в рабочие часы с понедельника по пятницу, но наша система подает их автоматически.",
      category: "Режим работы",
      isOpen: false,
      icon: "🏦",
      color: "from-cyan-400 to-cyan-500",
    },
    {
      id: 44,
      question: "Есть ли поддержка в праздничные дни?",
      answer:
        "Да, техподдержка Фіногляд работает круглосуточно, но решения по заявкам принимаются партнерами в рабочие часы.",
      category: "Режим работы",
      isOpen: false,
      icon: "🎉",
      color: "from-cyan-300 to-cyan-400",
    },
    {
      id: 45,
      question: "Можно ли подать заявку ночью?",
      answer:
        "Да, заявки принимаются круглосуточно, независимо от времени суток. Обработка осуществляется в рабочие часы кредиторов.",
      category: "Режим работы",
      isOpen: false,
      icon: "🌙",
      color: "from-cyan-400 to-cyan-500",
    },
    {
      id: 46,
      question: "Как быстро отвечают на запросы в поддержку?",
      answer:
        "Среднее время ответа техподдержки Фіногляд составляет 10-15 минут в рабочее время, но может увеличиваться в пиковые часы.",
      category: "Режим работы",
      isOpen: false,
      icon: "📩",
      color: "from-cyan-500 to-cyan-600",
    }
  ];
  

  // Пользовательские вопросы (в реальном приложении это будет из API)
  const [userQuestions, setUserQuestions] = useState<
    {
      id: number;
      question: string | undefined;
      author: string;
      date: string;
      category: string;
      hasAnswer: boolean | undefined;
      answersCount: number;
      icon: string;
      color: string;
    }[]
  >([]);

  const [faqItems, setFaqItems] = useState(faqData);

  const categories = [
    "Все категории",
    "Подача заявки",
    "Сроки",
    "Документы",
    "Кредитная история",
    "Стоимость",
    "Погашение",
    "Проблемы с погашением",
    "Безопасность",
    "Режим работы",
  ];

  useEffect(() => {
    const fetchQuestionsOnlyModerated = async () => {
      const response = await SiteQuestionService.getAllQuestions({
        onlyModerated: true,
      });
      console.log(response);
      const mappedQuestions = response.map((question) => {
        const hasAnswer = question.answers && question.answers.length > 0;

        return {
          id: question.id,
          question: question.textRu,
          author: question.name,
          date: question.createdAt,
          category: question.category,
          hasAnswer,
          answersCount: question.answers?.length || 0,
          icon: "👤",
          color: "from-blue-500 to-blue-600",
        };
      });

      setUserQuestions(mappedQuestions);
    };

    fetchQuestionsOnlyModerated();
  }, []); // Не забудь массив зависимостей!

  const filteredFAQ = faqItems.filter(
    (item) =>
      selectedFilter === "Все категории" || item.category === selectedFilter
  );

  const handleInputChange = (e: { target: { name: any; value: any } }) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async () => {
    const { name, email, subject, category, text } = formData;

    if (!name || !email || !subject || !category || !text) {
      alert("Пожалуйста, заполните все поля");
      return;
    }

    try {
      await SiteQuestionService.create({
        name: name,
        email,
        subject,
        category,
        textOriginal: text,
      });

      setIsModalOpen(false);
      setFormData({ name: "", email: "", subject: "", category: "", text: "" });
    } catch (error) {
      console.error("Ошибка при отправке вопроса:", error);
      alert("Произошла ошибка при отправке вопроса. Попробуйте позже.");
    }
  };

  const toggleFAQ = (id: number) => {
    setFaqItems(
      faqItems.map((item) =>
        item.id === id ? { ...item, isOpen: !item.isOpen } : item
      )
    );
  };
  const router = useRouter();
  const pathname = usePathname(); // например "/ru/ask-question/test"

  const localePrefix = pathname.split("/")[1]; // "ru"

  const handleQuestionClick = (id: number) => {
    router.push(`/${localePrefix}/ask-question/${id}`);
  };
  

  return (
    <div className="min-h-screen ">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4 relative inline-block">
            Часто задаваемые вопросы
            <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-20 h-1 bg-gradient-to-r from-blue-500 to-yellow-400 rounded-full"></div>
          </h1>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Найдите ответы на популярные вопросы или задайте свой вопрос нашим
            экспертам
          </p>
        </div>

        {/* Controls */}
        <div className="flex flex-col sm:flex-row justify-between items-center mb-12 gap-4">
          {/* Filter Dropdown */}

          <div></div>
          {/* Ask Question Button */}
          <button
            onClick={() => setIsModalOpen(true)}
            className="bg-gradient-to-r cursor-pointer from-blue-500 to-yellow-400 text-white px-8 py-3 rounded-2xl font-semibold flex items-center gap-3 hover:shadow-lg transition-all duration-300 hover:scale-105"
          >
            <span className="text-xl">?</span>
            Задать вопрос
          </button>
        </div>

        {/* User Questions Section */}
        <div className="mb-16">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-gray-800 mb-4 relative inline-block">
              Вопросы пользователей
              <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-20 h-1 bg-gradient-to-r from-green-500 to-teal-400 rounded-full"></div>
            </h2>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
              Актуальные вопросы от наших пользователей
            </p>
          </div>

          <div className="grid gap-4">
            {userQuestions
              .slice(0, userQuestionsVisibleCount)
              .map((question, index) => (
                <div
                  key={question.id}
                  className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 p-6 group"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className="flex items-start gap-4">
                    {/* Icon */}
                    <div
                      className={`w-12 h-12 bg-gradient-to-br ${question.color} rounded-xl flex items-center justify-center text-white text-xl group-hover:scale-110 transition-transform duration-300 flex-shrink-0`}
                    >
                      {question.icon}
                    </div>

                    {/* Content */}
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <span className="text-sm font-medium text-gray-500">
                          {question.author}
                        </span>
                        <span className="text-xs text-gray-400">•</span>
                        <span className="text-sm text-gray-400">
                          {new Date(question.date).toLocaleString("ru-RU", {
                            day: "2-digit",
                            month: "2-digit",
                            year: "numeric",
                            hour: "2-digit",
                            minute: "2-digit",
                          })}{" "}
                        </span>
                        <span
                          className={`text-xs px-2 py-1 rounded-full font-medium bg-gradient-to-r ${question.color} text-white`}
                        >
                          {question.category}
                        </span>
                      </div>

                      <h3 className="font-semibold text-gray-800 mb-3 text-lg group-hover:text-blue-600 transition-colors duration-300">
                        {question.question}
                      </h3>

                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                          <span
                            className={`text-sm px-3 py-1 rounded-full font-medium ${
                              question.hasAnswer
                                ? "bg-green-100 text-green-700"
                                : "bg-yellow-100 text-yellow-700"
                            }`}
                          >
                            {question.hasAnswer
                              ? "✅ Есть ответ"
                              : "⏳ Ожидает ответа"}
                          </span>

                          {question.answersCount > 0 && (
                            <span className="text-sm text-gray-500">
                              {question.answersCount} ответ
                              {question.answersCount > 1 ? "а" : ""}
                            </span>
                          )}
                        </div>

                        <button
                          onClick={() => handleQuestionClick(question.id)}
                          className="bg-gradient-to-r cursor-pointer from-blue-500 to-blue-600 text-white px-4 py-2 rounded-xl text-sm font-medium hover:shadow-lg transition-all duration-300 hover:scale-105"
                        >
                          Ответы
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
          </div>

          {/* Show More Button for User Questions */}
          {userQuestionsVisibleCount < userQuestions.length && (
            <div className="text-center mt-8">
              <button
                onClick={() => setUserQuestionsVisibleCount((prev) => prev + 3)}
                className="bg-gradient-to-r from-green-500 to-teal-400 text-white px-8 py-3 rounded-2xl font-semibold hover:shadow-lg transition-all duration-300 hover:scale-105"
              >
                Показать еще +3
              </button>
            </div>
          )}
        </div>

        {/* FAQ Section */}
        <div className="mb-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4 relative inline-block">
              Популярные вопросы
              <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-24 h-1 bg-gradient-to-r from-blue-500 to-yellow-400 rounded-full"></div>
            </h2>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
              Самые частые вопросы наших клиентов с подробными ответами
            </p>
          </div>
          <div className="relative">
            <button
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              className="bg-white cursor-pointer border-2 border-gray-200 rounded-2xl px-6 py-3 flex items-center gap-3 hover:border-blue-300 transition-all duration-200 shadow-sm"
            >
              <span className="text-gray-700 font-medium">
                {selectedFilter}
              </span>
              <svg
                className={`w-4 h-4 text-gray-500 transition-transform duration-200 ${
                  isDropdownOpen ? "rotate-180" : ""
                }`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </button>

            {isDropdownOpen && (
              <div className="absolute top-full left-0 mt-2 w-64 bg-white rounded-2xl shadow-lg border border-gray-200 z-10">
                {categories.map((category) => (
                  <button
                    key={category}
                    onClick={() => {
                      setSelectedFilter(category);
                      setIsDropdownOpen(false);
                    }}
                    className="w-full text-left px-4 py-2 cursor-pointer hover:bg-gray-50 first:rounded-t-2xl last:rounded-b-2xl text-gray-700 transition-colors duration-200"
                  >
                    {category}
                  </button>
                ))}
              </div>
            )}
          </div>
          <div className="grid gap-6 mt-3">
            {filteredFAQ.slice(0, faqVisibleCount).map((item, index) => (
              <div
                key={item.id}
                className="group"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 overflow-hidden">
                  <button
                    onClick={() => toggleFAQ(item.id)}
                    className="w-full duration-700 ease-in-out p-6 text-left cursor-pointer hover:bg-gradient-to-r hover:from-gray-50 hover:to-blue-50 transition-all  flex items-center gap-4 "
                  >
                    {/* Icon */}
                    <div
                      className={`w-12 h-12 bg-gradient-to-br ease-in-out ${item.color} rounded-xl flex items-center justify-center text-white text-xl group-hover:scale-110 transition-transform duration-300 flex-shrink-0`}
                    >
                      {item.icon}
                    </div>

                    {/* Content */}
                    <div className="flex-1">
                      <h3 className="font-semibold text-gray-800 mb-2 text-lg group-hover:text-blue-600 transition-colors duration-300">
                        {item.question}
                      </h3>
                      <span
                        className={`text-xs bg-gradient-to-r ${item.color} text-white px-3 py-1 rounded-full font-medium`}
                      >
                        {item.category}
                      </span>
                    </div>

                    {/* Arrow */}
                    <div className="flex-shrink-0">
                      <svg
                        className={`w-6 h-6 text-gray-400 group-hover:text-blue-500 transition-all duration-300 ${
                          item.isOpen ? "rotate-180" : ""
                        }`}
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M19 9l-7 7-7-7"
                        />
                      </svg>
                    </div>
                  </button>

                  {/* Answer */}
                  {item.isOpen && (
                    <div className="px-6 pb-6">
                      <div className="ml-16 bg-gradient-to-r from-gray-50 to-blue-50 rounded-xl p-4 border-l-4 border-blue-500">
                        <p className="text-gray-700 leading-relaxed">
                          {item.answer}
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* Show More Button for FAQ */}
          {faqVisibleCount < filteredFAQ.length && (
            <div className="text-center mt-8">
              <button
                onClick={() => setFaqVisibleCount((prev) => prev + 6)}
                className="bg-gradient-to-r from-blue-500 to-yellow-400 text-white px-8 py-3 rounded-2xl font-semibold hover:shadow-lg transition-all duration-300 hover:scale-105"
              >
                Показать еще +6
              </button>
            </div>
          )}
        </div>

        {/* Contact Section */}
        <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-3xl p-8 text-white shadow-xl">
          <div className="text-center">
            <h2 className="text-3xl font-bold mb-4">
              Не нашли ответ на свой вопрос?
            </h2>
            <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
              Свяжитесь с нашей службой поддержки - мы работаем 24/7 и готовы
              помочь вам
            </p>

            <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
              <div className="bg-white/10 rounded-2xl p-6 backdrop-blur-sm hover:bg-white/20 transition-all duration-300">
                <div className="text-3xl mb-4">📞</div>
                <h3 className="text-lg font-semibold mb-2">Телефон</h3>
                <p className="text-blue-100">+38 (044) 555-77-99</p>
              </div>

              <div className="bg-white/10 rounded-2xl p-6 backdrop-blur-sm hover:bg-white/20 transition-all duration-300">
                <div className="text-3xl mb-4">📧</div>
                <h3 className="text-lg font-semibold mb-2">Email</h3>
                <p className="text-blue-100">support@Фіногляд.ua</p>
              </div>

              <div className="bg-white/10 rounded-2xl p-6 backdrop-blur-sm hover:bg-white/20 transition-all duration-300">
                <div className="text-3xl mb-4">💬</div>
                <h3 className="text-lg font-semibold mb-2">Онлайн-чат</h3>
                <p className="text-blue-100">Доступен 24/7</p>
              </div>
            </div>
          </div>
        </div>

        {/* Modal */}
        {isModalOpen && (
          <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-3xl p-8 max-w-md w-full scrollbar-hidden max-h-[90vh] overflow-y-auto shadow-2xl">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-2xl font-bold text-gray-800">
                  Задать вопрос
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
                    Email
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Введите ваш email"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Тема вопроса
                  </label>
                  <input
                    type="text"
                    name="subject"
                    value={formData.subject}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Кратко опишите тему"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Категория
                  </label>
                  <select
                    name="category"
                    value={formData.category}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="">Выберите категорию</option>
                    <option value="Подача заявки">Подача заявки</option>
                    <option value="Сроки">Сроки</option>
                    <option value="Документы">Документы</option>
                    <option value="Кредитная история">Кредитная история</option>
                    <option value="Стоимость">Стоимость</option>
                    <option value="Погашение">Погашение</option>
                    <option value="Проблемы с погашением">
                      Проблемы с погашением
                    </option>
                    <option value="Безопасность">Безопасность</option>
                    <option value="Режим работы">Режим работы</option>
                    <option value="Другое">Другое</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Ваш вопрос
                  </label>
                  <textarea
                    name="text"
                    value={formData.text}
                    onChange={handleInputChange}
                    rows={4}
                    className="w-full px-4 py-3 border border-gray-300 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                    placeholder="Опишите ваш вопрос подробно..."
                  />
                </div>

                <button
                  onClick={handleSubmit}
                  className="w-full bg-gradient-to-r from-blue-500 to-yellow-400 text-white py-3 rounded-2xl font-semibold hover:shadow-lg transition-all duration-300 hover:scale-105"
                >
                  Отправить вопрос
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
