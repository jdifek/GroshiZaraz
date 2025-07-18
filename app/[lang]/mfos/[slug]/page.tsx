'use client'
import React, { useState } from 'react';
import { Star, Clock, Shield, CheckCircle, Calculator, Phone, Globe, Award, CreditCard, Users, TrendingUp } from 'lucide-react';

const HurmaCreditDetails = () => {
  const [activeTab, setActiveTab] = useState('about');
  const [loanAmount, setLoanAmount] = useState(15000);
  const [loanTerm, setLoanTerm] = useState(15);

  const companyInfo = {
    name: "Hurma Credit",
    logo: "🍎",
    rating: 5.0,
    reviews: 1,
    color: "from-orange-400 to-orange-600",
    minAmount: "5 000",
    maxAmount: "30 000",
    term: "5-30 дней",
    rate: "0 - 292%",
    approval: "98%",
    responseTime: "5 минут",
    commission: "0%",
    ageLimit: "18-75 лет",
    firstLoanFree: true,
    phone: "8 800 550-72-68",
    website: "hurmacredit.ru",
    license: "№ 22-033-22-009972"
  };

  const advantages = [
    "Первый займ 0%",
    "Мгновенное одобрение",
    "Без справок о доходах",
    "Круглосуточная поддержка",
    "Безопасные транзакции",
    "Гибкие условия"
  ];

  const tabs = [
    { id: 'about', label: 'О займе', icon: <CreditCard className="w-4 h-4" /> },
    { id: 'reviews', label: 'Отзывы', icon: <Star className="w-4 h-4" /> },
    { id: 'questions', label: 'Вопросы', icon: <Shield className="w-4 h-4" /> },
    { id: 'contacts', label: 'Контакты', icon: <Phone className="w-4 h-4" /> }
  ];

  const calculatePayment = () => {
    const dailyRate = 0.008; // 0.8% в день для примера
    const totalAmount = loanAmount * (1 + dailyRate * loanTerm);
    const overpayment = totalAmount - loanAmount;
    return { totalAmount, overpayment };
  };

  const { totalAmount, overpayment } = calculatePayment();

  return (
    <div className="min-h-screen ">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-3xl shadow-lg p-8 mb-8">
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Company Info */}
            <div className="flex-1">
            <div className={`block md:hidden mb-3 w-20 h-20 bg-gradient-to-br ${companyInfo.color} rounded-2xl flex items-center justify-center text-white text-2xl shadow-lg`}>
                  {companyInfo.logo}
                </div>
              <div className="flex items-center gap-4 mb-6">
                <div className={`md:block hidden w-20 h-20 bg-gradient-to-br ${companyInfo.color} rounded-2xl flex items-center justify-center text-white text-2xl shadow-lg`}>
                  {companyInfo.logo}
                </div>
                <div>
                  <h1 className="text-3xl font-bold text-gray-800 mb-2">{companyInfo.name}</h1>
                  <div className="flex items-center gap-2 mb-2">
                    <div className="flex items-center gap-1">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 text-yellow-400 fill-current" />
                      ))}
                    </div>
                    <span className="font-semibold text-gray-800">{companyInfo.rating}</span>
                    <span className="text-gray-500">({companyInfo.reviews})</span>
                  </div>
                  <div className="text-gray-600">Лицензия: {companyInfo.license}</div>
                </div>
              </div>

              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                <div className="bg-blue-50 rounded-2xl p-4 text-center">
                  <div className="text-2xl font-bold text-blue-600 mb-1">{companyInfo.maxAmount} ₽</div>
                  <div className="text-sm text-gray-600">Максимум</div>
                </div>
                <div className="bg-green-50 rounded-2xl p-4 text-center">
                  <div className="text-2xl font-bold text-green-600 mb-1">{companyInfo.term}</div>
                  <div className="text-sm text-gray-600">Срок</div>
                </div>
                <div className="bg-purple-50 rounded-2xl p-4 text-center">
                  <div className="text-2xl font-bold text-purple-600 mb-1">{companyInfo.responseTime}</div>
                  <div className="text-sm text-gray-600">Решение</div>
                </div>
                <div className="bg-orange-50 rounded-2xl p-4 text-center">
                  <div className="text-2xl font-bold text-orange-600 mb-1">{companyInfo.approval}</div>
                  <div className="text-sm text-gray-600">Одобрение</div>
                </div>
              </div>

              {companyInfo.firstLoanFree && (
                <div className="bg-gradient-to-r from-green-50 to-green-100 border border-green-200 rounded-2xl p-4 mb-6">
                  <div className="flex items-center gap-2 mb-2">
                    <CheckCircle className="w-5 h-5 text-green-600" />
                    <span className="font-bold text-green-800">Первый займ бесплатно</span>
                  </div>
                  <p className="text-green-700 text-sm">
                    Новые клиенты получают первый займ под 0% на срок до 30 дней
                  </p>
                </div>
              )}
            </div>

            {/* Calculator */}
            <div className="lg:w-96">
              <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-2xl p-6 border border-blue-200">
                <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                  <Calculator className="w-5 h-5 text-blue-600" />
                  Калькулятор займа
                </h3>
                
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Сумма займа: {loanAmount.toLocaleString()} ₽
                    </label>
                    <input
                      type="range"
                      min="5000"
                      max="30000"
                      step="1000"
                      value={loanAmount}
                      onChange={(e) => setLoanAmount(Number(e.target.value))}
                      className="w-full h-2 bg-blue-200 rounded-lg appearance-none cursor-pointer"
                    />
                    <div className="flex justify-between text-xs text-gray-500 mt-1">
                      <span>5 000 ₽</span>
                      <span>30 000 ₽</span>
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Срок займа: {loanTerm} дней
                    </label>
                    <input
                      type="range"
                      min="5"
                      max="30"
                      step="1"
                      value={loanTerm}
                      onChange={(e) => setLoanTerm(Number(e.target.value))}
                      className="w-full h-2 bg-blue-200 rounded-lg appearance-none cursor-pointer"
                    />
                    <div className="flex justify-between text-xs text-gray-500 mt-1">
                      <span>5 дней</span>
                      <span>30 дней</span>
                    </div>
                  </div>

                  <div className="bg-white rounded-xl p-4 space-y-2">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Вы берете:</span>
                      <span className="font-semibold">{loanAmount.toLocaleString()} ₽</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Переплата:</span>
                      <span className="font-semibold">{overpayment.toLocaleString()} ₽</span>
                    </div>
                    <div className="flex justify-between text-lg font-bold">
                      <span className="text-gray-800">К возврату:</span>
                      <span className="text-blue-600">{totalAmount.toLocaleString()} ₽</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 mb-4">
                    <CheckCircle className="w-4 h-4 text-green-600" />
                    <span className="text-sm text-green-700 font-medium">Первый займ бесплатно</span>
                  </div>

                  <button className="w-full bg-gradient-to-r from-orange-400 to-orange-600 hover:from-orange-500 hover:to-orange-700 text-white font-bold py-4 px-6 rounded-2xl transition-all duration-300 hover:shadow-lg hover:scale-105">
                    Получить деньги
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="bg-white rounded-3xl shadow-lg mb-8">
          <div className="flex overflow-x-auto">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex-1 cursor-pointer min-w-0 px-6 py-4 text-center font-medium transition-all duration-300 first:rounded-l-3xl last:rounded-r-3xl ${
                  activeTab === tab.id
                    ? 'bg-gradient-to-r from-blue-500 to-blue-600 text-white shadow-lg'
                    : 'text-gray-600 hover:text-gray-800 hover:bg-gray-50'
                }`}
              >
                <div className="flex items-center justify-center gap-2">
                  {tab.icon}
                  <span>{tab.label}</span>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Content */}
        <div className="bg-white rounded-3xl shadow-lg p-8">
          {activeTab === 'about' && (
            <div>
              <h2 className="text-2xl font-bold text-gray-800 mb-6">О займе в Hurma Credit</h2>
              
              <div className="grid lg:grid-cols-2 gap-8 mb-8">
                <div>
                  <h3 className="text-xl font-semibold text-gray-800 mb-4">Условия займа</h3>
                  <div className="space-y-3">
                    <div className="flex justify-between py-2 border-b border-gray-100">
                      <span className="text-gray-600">Максимальная сумма</span>
                      <span className="font-semibold text-gray-800">{companyInfo.maxAmount} ₽</span>
                    </div>
                    <div className="flex justify-between py-2 border-b border-gray-100">
                      <span className="text-gray-600">Минимальная сумма</span>
                      <span className="font-semibold text-gray-800">{companyInfo.minAmount} ₽</span>
                    </div>
                    <div className="flex justify-between py-2 border-b border-gray-100">
                      <span className="text-gray-600">Срок займа</span>
                      <span className="font-semibold text-gray-800">{companyInfo.term}</span>
                    </div>
                    <div className="flex justify-between py-2 border-b border-gray-100">
                      <span className="text-gray-600">Процентная ставка</span>
                      <span className="font-semibold text-gray-800">{companyInfo.rate}</span>
                    </div>
                    <div className="flex justify-between py-2 border-b border-gray-100">
                      <span className="text-gray-600">Возраст заемщика</span>
                      <span className="font-semibold text-gray-800">{companyInfo.ageLimit}</span>
                    </div>
                    <div className="flex justify-between py-2">
                      <span className="text-gray-600">Решение по займу</span>
                      <span className="font-semibold text-gray-800">{companyInfo.responseTime}</span>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-xl font-semibold text-gray-800 mb-4">Преимущества</h3>
                  <div className="space-y-3">
                    {advantages.map((advantage, index) => (
                      <div key={index} className="flex items-start gap-3">
                        <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                        <span className="text-gray-700">{advantage}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="bg-gradient-to-r from-blue-50 to-blue-100 rounded-2xl p-6 border border-blue-200">
                <h3 className="text-xl font-semibold text-gray-800 mb-4">О компании</h3>
                <p className="text-gray-700 leading-relaxed">
                  ООО «Hurma Credit МКК» — российская микрофинансовая организация, которая выдает срочные займы на карту по всей России. 
                  Компания специализируется на предоставлении быстрых микрозаймов с минимальными требованиями к заемщикам. 
                  Особенностью является предоставление первого займа под 0% для новых клиентов.
                </p>
              </div>
            </div>
          )}

          {activeTab === 'reviews' && (
            <div>
              <h2 className="text-2xl font-bold text-gray-800 mb-6">Отзывы о Hurma Credit</h2>
              <div className="text-center py-12">
                <div className="text-6xl mb-4">📝</div>
                <h3 className="text-xl font-semibold text-gray-800 mb-2">Отзывы пока отсутствуют</h3>
                <p className="text-gray-600 mb-6">Станьте первым, кто оставит отзыв об этой компании</p>
                <button className="bg-gradient-to-r from-blue-500 to-blue-600 text-white px-8 py-3 rounded-2xl font-semibold hover:shadow-lg transition-all duration-300">
                  Оставить отзыв
                </button>
              </div>
            </div>
          )}

          {activeTab === 'questions' && (
            <div>
              <h2 className="text-2xl font-bold text-gray-800 mb-6">Часто задаваемые вопросы</h2>
              <div className="space-y-4">
                <div className="bg-gray-50 rounded-2xl p-6">
                  <h3 className="font-semibold text-gray-800 mb-2">Как получить займ?</h3>
                  <p className="text-gray-600">Заполните онлайн-заявку, получите решение за 5 минут, деньги поступят на карту в течение 15 минут.</p>
                </div>
                <div className="bg-gray-50 rounded-2xl p-6">
                  <h3 className="font-semibold text-gray-800 mb-2">Какие документы нужны?</h3>
                  <p className="text-gray-600">Только паспорт гражданина РФ и банковская карта для получения средств.</p>
                </div>
                <div className="bg-gray-50 rounded-2xl p-6">
                  <h3 className="font-semibold text-gray-800 mb-2">Первый займ действительно бесплатный?</h3>
                  <p className="text-gray-600">Да, новые клиенты получают первый займ под 0% на срок до 30 дней.</p>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'contacts' && (
            <div>
              <h2 className="text-2xl font-bold text-gray-800 mb-6">Контакты</h2>
              <div className="grid md:grid-cols-2 gap-8">
                <div className="space-y-4">
                  <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-2xl">
                    <Phone className="w-8 h-8 text-blue-600" />
                    <div>
                      <div className="font-semibold text-gray-800">Телефон</div>
                      <div className="text-blue-600">{companyInfo.phone}</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-2xl">
                    <Globe className="w-8 h-8 text-blue-600" />
                    <div>
                      <div className="font-semibold text-gray-800">Сайт</div>
                      <div className="text-blue-600">{companyInfo.website}</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-2xl">
                    <Award className="w-8 h-8 text-blue-600" />
                    <div>
                      <div className="font-semibold text-gray-800">Лицензия</div>
                      <div className="text-gray-600">{companyInfo.license}</div>
                    </div>
                  </div>
                </div>
                <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-2xl p-6 border border-blue-200">
                  <h3 className="text-xl font-semibold text-gray-800 mb-4">Режим работы</h3>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Пн-Пт:</span>
                      <span className="font-semibold">09:00 - 21:00</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Сб-Вс:</span>
                      <span className="font-semibold">10:00 - 18:00</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Онлайн заявки:</span>
                      <span className="font-semibold text-green-600">24/7</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Stats Section */}
        <div className="mt-8 bg-white rounded-3xl shadow-lg p-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">Статистика компании</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            <div className="p-4">
              <div className="text-3xl font-bold text-blue-600 mb-2 flex items-center justify-center gap-2">
                <TrendingUp className="w-8 h-8" />
                {companyInfo.approval}
              </div>
              <div className="text-gray-600">Процент одобрения</div>
            </div>
            <div className="p-4">
              <div className="text-3xl font-bold text-green-600 mb-2 flex items-center justify-center gap-2">
                <Clock className="w-8 h-8" />
                {companyInfo.responseTime}
              </div>
              <div className="text-gray-600">Время решения</div>
            </div>
            <div className="p-4">
              <div className="text-3xl font-bold text-orange-600 mb-2 flex items-center justify-center gap-2">
                <CreditCard className="w-8 h-8" />
                30К+
              </div>
              <div className="text-gray-600">Выдано займов</div>
            </div>
            <div className="p-4">
              <div className="text-3xl font-bold text-purple-600 mb-2 flex items-center justify-center gap-2">
                <Users className="w-8 h-8" />
                15К+
              </div>
              <div className="text-gray-600">Довольных клиентов</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HurmaCreditDetails;