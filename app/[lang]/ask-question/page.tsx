/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'
import React, { useState } from 'react';

export default function AskQuestionPage (){
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [selectedFilter, setSelectedFilter] = useState('Все категории');
  const [faqVisibleCount, setFaqVisibleCount] = useState(6); // Показываем только 6 FAQ изначально
  const [userQuestionsVisibleCount, setUserQuestionsVisibleCount] = useState(3); // Показываем 3 пользовательских вопроса
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    category: '',
    text: ''
  });

  const faqData = [
    {
      id: 1,
      question: "Как подать заявку на кредит через GroshiZaraz?",
      answer: "Для подачи заявки заполните короткую анкету на нашем сайте, укажите желаемую сумму и срок кредитования. Наша система автоматически подберет лучшие предложения от партнеров. Выберите подходящий вариант и подайте заявку напрямую в выбранную организацию.",
      category: "Подача заявки",
      isOpen: false,
      icon: "📝",
      color: "from-blue-500 to-blue-600"
    },
    {
      id: 2,
      question: "Сколько времени занимает рассмотрение заявки?",
      answer: "Время рассмотрения зависит от выбранной финансовой организации. Большинство наших партнеров принимают решение в течение 15-30 минут. Некоторые банки могут рассматривать заявки до 24 часов.",
      category: "Сроки",
      isOpen: false,
      icon: "⏱️",
      color: "from-yellow-400 to-yellow-500"
    },
    {
      id: 3,
      question: "Какие документы нужны для получения кредита?",
      answer: "Базовый пакет документов включает: паспорт гражданина Украины, идентификационный код, справку о доходах. Некоторые организации могут запросить дополнительные документы в зависимости от суммы кредита.",
      category: "Документы",
      isOpen: false,
      icon: "📄",
      color: "from-green-500 to-green-600"
    },
    {
      id: 4,
      question: "Можно ли получить кредит с плохой кредитной историей?",
      answer: "Да, среди наших партнеров есть организации, которые работают с заемщиками с негативной кредитной историей. Однако условия кредитования могут отличаться (более высокие процентные ставки, меньшие суммы).",
      category: "Кредитная история",
      isOpen: false,
      icon: "📊",
      color: "from-purple-500 to-purple-600"
    },
    {
      id: 5,
      question: "Взимает ли GroshiZaraz комиссию за свои услуги?",
      answer: "Нет, использование нашего сервиса полностью бесплатно для клиентов. Мы получаем вознаграждение от партнеров за привлечение клиентов, но это не влияет на стоимость кредита для заемщика.",
      category: "Стоимость",
      isOpen: false,
      icon: "💰",
      color: "from-red-500 to-red-600"
    },
    {
      id: 6,
      question: "Как можно погасить кредит досрочно?",
      answer: "Возможность досрочного погашения зависит от условий конкретной финансовой организации. Большинство наших партнеров предоставляют такую возможность. Обратитесь напрямую к кредитору для уточнения условий.",
      category: "Погашение",
      isOpen: false,
      icon: "✅",
      color: "from-teal-500 to-teal-600"
    },
    {
      id: 7,
      question: "Что делать, если не могу вовремя погасить кредит?",
      answer: "Немедленно свяжитесь с вашим кредитором для обсуждения возможных вариантов. Многие организации предоставляют отсрочку или реструктуризацию. Не игнорируйте проблему - это может привести к дополнительным штрафам.",
      category: "Проблемы с погашением",
      isOpen: false,
      icon: "⚠️",
      color: "from-orange-500 to-orange-600"
    },
    {
      id: 8,
      question: "Безопасно ли передавать личные данные через ваш сайт?",
      answer: "Да, мы используем современные технологии шифрования данных и соблюдаем все требования по защите персональной информации. Все данные передаются по защищенному соединению и не передаются третьим лицам без вашего согласия.",
      category: "Безопасность",
      isOpen: false,
      icon: "🔒",
      color: "from-indigo-500 to-indigo-600"
    },
    {
      id: 9,
      question: "Можно ли подать несколько заявок одновременно?",
      answer: "Да, вы можете подать заявки в несколько организаций одновременно, чтобы увеличить шансы на одобрение. Однако помните, что каждая заявка может повлиять на вашу кредитную историю.",
      category: "Подача заявки",
      isOpen: false,
      icon: "🎯",
      color: "from-pink-500 to-pink-600"
    },
    {
      id: 10,
      question: "Работает ли GroshiZaraz в выходные дни?",
      answer: "Наш сайт работает круглосуточно, заявки можно подавать в любое время. Техническая поддержка работает 24/7. Однако решения по заявкам партнеры принимают в рабочие часы.",
      category: "Режим работы",
      isOpen: false,
      icon: "⏰",
      color: "from-cyan-500 to-cyan-600"
    }
  ];

  // Пользовательские вопросы (в реальном приложении это будет из API)
  const [userQuestions, setUserQuestions] = useState([
    {
      id: 1,
      question: "Можно ли получить кредит без справки о доходах?",
      author: "Александр М.",
      date: "2 часа назад",
      category: "Документы",
      hasAnswer: true,
      answersCount: 2,
      icon: "👤",
      color: "from-blue-500 to-blue-600"
    },
    {
      id: 2,
      question: "Какие банки дают кредиты с 18 лет?",
      author: "Мария К.",
      date: "5 часов назад",
      category: "Возрастные ограничения",
      hasAnswer: false,
      answersCount: 0,
      icon: "🎓",
      color: "from-green-500 to-green-600"
    },
    {
      id: 3,
      question: "Влияет ли количество запросов на кредитную историю?",
      author: "Иван П.",
      date: "1 день назад",
      category: "Кредитная история",
      hasAnswer: true,
      answersCount: 4,
      icon: "📈",
      color: "from-purple-500 to-purple-600"
    },
    {
      id: 4,
      question: "Можно ли переоформить кредит на супруга?",
      author: "Елена В.",
      date: "2 дня назад",
      category: "Переоформление",
      hasAnswer: false,
      answersCount: 0,
      icon: "👨‍👩‍👧",
      color: "from-pink-500 to-pink-600"
    },
    {
      id: 5,
      question: "Какие штрафы за просрочку платежа?",
      author: "Дмитрий Л.",
      date: "3 дня назад",
      category: "Штрафы",
      hasAnswer: true,
      answersCount: 3,
      icon: "⚖️",
      color: "from-red-500 to-red-600"
    },
    {
      id: 6,
      question: "Работают ли банки с ФОП?",
      author: "Ольга С.",
      date: "1 неделю назад",
      category: "ФОП",
      hasAnswer: true,
      answersCount: 1,
      icon: "💼",
      color: "from-teal-500 to-teal-600"
    }
  ]);

  const [faqItems, setFaqItems] = useState(faqData);

  const categories = [
    'Все категории',
    'Подача заявки',
    'Сроки',
    'Документы',
    'Кредитная история',
    'Стоимость',
    'Погашение',
    'Проблемы с погашением',
    'Безопасность',
    'Режим работы'
  ];

  const filteredFAQ = faqItems.filter(item => 
    selectedFilter === 'Все категории' || item.category === selectedFilter
  );

  const handleInputChange = (e: { target: { name: any; value: any; }; }) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = () => {
    if (formData.name && formData.email && formData.subject && formData.category && formData.text) {
      // Добавляем новый вопрос в список пользовательских вопросов
      const newQuestion = {
        id: userQuestions.length + 1,
        question: formData.subject,
        author: formData.name,
        date: "только что",
        category: formData.category,
        hasAnswer: false,
        answersCount: 0,
        icon: "❓",
        color: "from-gray-500 to-gray-600"
      };
      
      setUserQuestions([newQuestion, ...userQuestions]);
      setIsModalOpen(false);
      setFormData({ name: '', email: '', subject: '', category: '', text: '' });
    } else {
      alert('Пожалуйста, заполните все поля');
    }
  };

  const toggleFAQ = (id: number) => {
    setFaqItems(faqItems.map(item => 
      item.id === id ? { ...item, isOpen: !item.isOpen } : item
    ));
  };

  const handleQuestionClick = (questionId: number) => {
    // Здесь будет редирект на страницу с вопросом и ответами
    console.log(`Переход на страницу вопроса ${questionId}`);
    // window.location.href = `/questions/${questionId}`;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white">
      <div className="max-w-6xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4 relative inline-block">
            Часто задаваемые вопросы
            <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-20 h-1 bg-gradient-to-r from-blue-500 to-yellow-400 rounded-full"></div>
          </h1>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Найдите ответы на популярные вопросы или задайте свой вопрос нашим экспертам
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
            {userQuestions.slice(0, userQuestionsVisibleCount).map((question, index) => (
              <div 
                key={question.id} 
                className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 p-6 group"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="flex items-start gap-4">
                  {/* Icon */}
                  <div className={`w-12 h-12 bg-gradient-to-br ${question.color} rounded-xl flex items-center justify-center text-white text-xl group-hover:scale-110 transition-transform duration-300 flex-shrink-0`}>
                    {question.icon}
                  </div>
                  
                  {/* Content */}
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-sm font-medium text-gray-500">{question.author}</span>
                      <span className="text-xs text-gray-400">•</span>
                      <span className="text-sm text-gray-400">{question.date}</span>
                      <span className={`text-xs px-2 py-1 rounded-full font-medium bg-gradient-to-r ${question.color} text-white`}>
                        {question.category}
                      </span>
                    </div>
                    
                    <h3 className="font-semibold text-gray-800 mb-3 text-lg group-hover:text-blue-600 transition-colors duration-300">
                      {question.question}
                    </h3>
                    
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <span className={`text-sm px-3 py-1 rounded-full font-medium ${question.hasAnswer ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'}`}>
                          {question.hasAnswer ? '✅ Есть ответ' : '⏳ Ожидает ответа'}
                        </span>
                        
                        {question.answersCount > 0 && (
                          <span className="text-sm text-gray-500">
                            {question.answersCount} ответ{question.answersCount > 1 ? 'а' : ''}
                          </span>
                        )}
                      </div>
                      
                      <button
                        onClick={() => handleQuestionClick(question.id)}
                        className="bg-gradient-to-r from-blue-500 to-blue-600 text-white px-4 py-2 rounded-xl text-sm font-medium hover:shadow-lg transition-all duration-300 hover:scale-105"
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
                onClick={() => setUserQuestionsVisibleCount(prev => prev + 3)}
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
              <span className="text-gray-700 font-medium">{selectedFilter}</span>
              <svg className={`w-4 h-4 text-gray-500 transition-transform duration-200 ${isDropdownOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
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
                    className="w-full text-left px-4 py-2 hover:bg-gray-50 first:rounded-t-2xl last:rounded-b-2xl text-gray-700 transition-colors duration-200"
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
                    className="w-full p-6 text-left hover:bg-gradient-to-r hover:from-gray-50 hover:to-blue-50 transition-all duration-300 flex items-center gap-4"
                  >
                    {/* Icon */}
                    <div className={`w-12 h-12 bg-gradient-to-br ${item.color} rounded-xl flex items-center justify-center text-white text-xl group-hover:scale-110 transition-transform duration-300 flex-shrink-0`}>
                      {item.icon}
                    </div>
                    
                    {/* Content */}
                    <div className="flex-1">
                      <h3 className="font-semibold text-gray-800 mb-2 text-lg group-hover:text-blue-600 transition-colors duration-300">
                        {item.question}
                      </h3>
                      <span className={`text-xs bg-gradient-to-r ${item.color} text-white px-3 py-1 rounded-full font-medium`}>
                        {item.category}
                      </span>
                    </div>
                    
                    {/* Arrow */}
                    <div className="flex-shrink-0">
                      <svg 
                        className={`w-6 h-6 text-gray-400 group-hover:text-blue-500 transition-all duration-300 ${item.isOpen ? 'rotate-180' : ''}`} 
                        fill="none" 
                        stroke="currentColor" 
                        viewBox="0 0 24 24"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </div>
                  </button>
                  
                  {/* Answer */}
                  {item.isOpen && (
                    <div className="px-6 pb-6">
                      <div className="ml-16 bg-gradient-to-r from-gray-50 to-blue-50 rounded-xl p-4 border-l-4 border-blue-500">
                        <p className="text-gray-700 leading-relaxed">{item.answer}</p>
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
                onClick={() => setFaqVisibleCount(prev => prev + 6)}
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
            <h2 className="text-3xl font-bold mb-4">Не нашли ответ на свой вопрос?</h2>
            <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
              Свяжитесь с нашей службой поддержки - мы работаем 24/7 и готовы помочь вам
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
                <p className="text-blue-100">support@groshizaraz.ua</p>
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
            <div className="bg-white rounded-3xl p-8 max-w-md w-full max-h-[90vh] overflow-y-auto shadow-2xl">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-2xl font-bold text-gray-800">Задать вопрос</h3>
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
                    <option value="Проблемы с погашением">Проблемы с погашением</option>
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
};