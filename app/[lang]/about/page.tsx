import { BlueButton } from "@/app/ui/Buttons/BlueButton";

export default function AboutPage() {
  return (
    <div className="space-y-12">
    {/* Hero Section */}
    <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl p-8 md:p-12 text-white">
      <div className="max-w-4xl">
        <h1 className="text-3xl !text-blue-100 md:text-4xl font-bold mb-4">
          О компании GroshiZaraz
        </h1>
        <p className="text-xl text-blue-100 leading-relaxed">
          Мы - агрегатор кредитов и займов онлайн с умным подбором финансовых
          услуг. Создаем прозрачную и доступную финансовую экосистему для всех
          украинцев.
        </p>
      </div>
    </div>

    {/* Mission Section */}
    <div className="grid md:grid-cols-2 gap-8">
      <div className="bg-white rounded-2xl shadow-md p-8 border border-gray-100">
        <div className="text-4xl mb-4">🎯</div>
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Наша миссия</h2>
        <p className="text-gray-600 leading-relaxed">
          Предоставить каждому украинцу возможность быстро и легко найти самые
          выгодные условия кредитования, сравнив предложения десятков
          проверенных партнеров на одной платформе.
        </p>
      </div>

      <div className="bg-white rounded-2xl shadow-md p-8 border border-gray-100">
        <div className="text-4xl mb-4">👁️</div>
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Наше видение</h2>
        <p className="text-gray-600 leading-relaxed">
          Стать главным финансовым агрегатором в Украине, где каждый может найти
          персонализированные финансовые решения, основанные на умном анализе и
          актуальной информации.
        </p>
      </div>
    </div>

    {/* Why Choose Us Section */}
    <div className="bg-white rounded-2xl shadow-md p-8 border border-gray-100">
      <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
        Почему выбирают GroshiZaraz?
      </h2>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="text-center">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <span className="text-2xl">✓</span>
          </div>
          <h3 className="text-lg font-semibold text-gray-800 mb-2">
            Проверенные партнеры
          </h3>
          <p className="text-gray-600 text-sm">
            Работаем только с лицензированными банками и МФО
          </p>
        </div>
        <div className="text-center">
          <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <span className="text-2xl">⚡</span>
          </div>
          <h3 className="text-lg font-semibold text-gray-800 mb-2">
            Быстрое сравнение
          </h3>
          <p className="text-gray-600 text-sm">
            Сравните условия десятков предложений за несколько минут
          </p>
        </div>
        <div className="text-center">
          <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <span className="text-2xl">📊</span>
          </div>
          <h3 className="text-lg font-semibold text-gray-800 mb-2">
            Актуальная информация
          </h3>
          <p className="text-gray-600 text-sm">
            Обновляем данные о процентных ставках и условиях ежедневно
          </p>
        </div>
        <div className="text-center">
          <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <span className="text-2xl">🏆</span>
          </div>
          <h3 className="text-lg font-semibold text-gray-800 mb-2">
            Экспертные обзоры
          </h3>
          <p className="text-gray-600 text-sm">
            Детальные обзоры и рейтинги от наших финансовых экспертов
          </p>
        </div>
        <div className="text-center">
          <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <span className="text-2xl">🕐</span>
          </div>
          <h3 className="text-lg font-semibold text-gray-800 mb-2">
            Поддержка 24/7
          </h3>
          <p className="text-gray-600 text-sm">
            Наши консультанты готовы помочь вам в любое время
          </p>
        </div>
        <div className="text-center">
          <div className="w-16 h-16 bg-indigo-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <span className="text-2xl">🔒</span>
          </div>
          <h3 className="text-lg font-semibold text-gray-800 mb-2">
            Безопасность данных
          </h3>
          <p className="text-gray-600 text-sm">
            Защищаем вашу личную информацию современными технологиями
          </p>
        </div>
      </div>
    </div>

    {/* Values Section */}
    <div className="bg-white rounded-2xl shadow-md p-8 border border-gray-100">
      <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
        Наши ценности
      </h2>
      <div className="grid md:grid-cols-3 gap-6">
        <div className="text-center">
          <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <span className="text-2xl">🤝</span>
          </div>
          <h3 className="text-lg font-semibold text-gray-800 mb-2">
            Прозрачность
          </h3>
          <p className="text-gray-600 text-sm">
            Открытые условия без скрытых комиссий и честная информация о всех
            финансовых продуктах
          </p>
        </div>
        <div className="text-center">
          <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <span className="text-2xl">🎯</span>
          </div>
          <h3 className="text-lg font-semibold text-gray-800 mb-2">
            Персонализация
          </h3>
          <p className="text-gray-600 text-sm">
            Умный подбор финансовых услуг, учитывающий ваши индивидуальные
            потребности
          </p>
        </div>
        <div className="text-center">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <span className="text-2xl">💡</span>
          </div>
          <h3 className="text-lg font-semibold text-gray-800 mb-2">
            Инновации
          </h3>
          <p className="text-gray-600 text-sm">
            Постоянное развитие платформы и внедрение новых технологий для
            вашего удобства
          </p>
        </div>
      </div>
    </div>

    {/* Stats Section */}
    <div className="bg-gradient-to-r from-yellow-400 to-orange-400 rounded-2xl p-8 text-white">
      <h2 className="text-2xl font-bold mb-6 text-center">
        GroshiZaraz в цифрах
      </h2>
      <div className="grid md:grid-cols-4 gap-6 text-center">
        <div>
          <div className="text-3xl font-bold mb-2">3+</div>
          <div className="text-sm opacity-90">года успешной работы</div>
        </div>
        <div>
          <div className="text-3xl font-bold mb-2">500K+</div>
          <div className="text-sm opacity-90">довольных клиентов</div>
        </div>
        <div>
          <div className="text-3xl font-bold mb-2">50+</div>
          <div className="text-sm opacity-90">проверенных партнеров</div>
        </div>
        <div>
          <div className="text-3xl font-bold mb-2">24/7</div>
          <div className="text-sm opacity-90">техподдержка</div>
        </div>
      </div>
    </div>

    {/* How It Works Section */}
    <div className="bg-white rounded-2xl shadow-md p-8 border border-gray-100">
      <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
        Как работает GroshiZaraz
      </h2>
      <div className="grid md:grid-cols-4 gap-6">
        <div className="text-center">
          <div className="w-16 h-16 bg-blue-500 rounded-full flex items-center justify-center mx-auto mb-4 text-white font-bold text-xl">
            1
          </div>
          <h3 className="text-lg font-semibold text-gray-800 mb-2">
            Заполните анкету
          </h3>
          <p className="text-gray-600 text-sm">
            Укажите желаемую сумму и срок кредитования
          </p>
        </div>
        <div className="text-center">
          <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4 text-white font-bold text-xl">
            2
          </div>
          <h3 className="text-lg font-semibold text-gray-800 mb-2">
            Получите предложения
          </h3>
          <p className="text-gray-600 text-sm">
            Наша система подберет лучшие варианты от партнеров
          </p>
        </div>
        <div className="text-center">
          <div className="w-16 h-16 bg-yellow-500 rounded-full flex items-center justify-center mx-auto mb-4 text-white font-bold text-xl">
            3
          </div>
          <h3 className="text-lg font-semibold text-gray-800 mb-2">
            Сравните условия
          </h3>
          <p className="text-gray-600 text-sm">
            Выберите самое выгодное предложение из списка
          </p>
        </div>
        <div className="text-center">
          <div className="w-16 h-16 bg-purple-500 rounded-full flex items-center justify-center mx-auto mb-4 text-white font-bold text-xl">
            4
          </div>
          <h3 className="text-lg font-semibold text-gray-800 mb-2">
            Оформите кредит
          </h3>
          <p className="text-gray-600 text-sm">
            Подайте заявку напрямую в выбранную организацию
          </p>
        </div>
      </div>
    </div>

    {/* Contact Section */}
    <div className="bg-white rounded-2xl shadow-md p-8 border border-gray-100">
      <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
        Связаться с нами
      </h2>
      <div className="grid md:grid-cols-2 gap-6">
        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
              <span className="text-lg">📧</span>
            </div>
            <div>
              <div className="font-semibold text-gray-800">Email</div>
              <div className="text-gray-600">info@groshizaraz.ua</div>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
              <span className="text-lg">📞</span>
            </div>
            <div>
              <div className="font-semibold text-gray-800">Телефон</div>
              <div className="text-gray-600">+38 (044) 555-77-99</div>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-yellow-100 rounded-full flex items-center justify-center">
              <span className="text-lg">💬</span>
            </div>
            <div>
              <div className="font-semibold text-gray-800">Онлайн-чат</div>
              <div className="text-gray-600">Доступен 24/7 на сайте</div>
            </div>
          </div>
        </div>
        <div className="bg-gray-50 rounded-xl p-6">
          <h3 className="font-semibold text-gray-800 mb-3">Написать нам</h3>
          <div className="space-y-3">
            <input
              type="text"
              placeholder="Ваше имя"
              className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:border-blue-500 focus:outline-none"
            />
            <input
              type="email"
              placeholder="Email"
              className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:border-blue-500 focus:outline-none"
            />
            <textarea
              placeholder="Ваше сообщение"
              rows={3}
              className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:border-blue-500 focus:outline-none"
            />
            <BlueButton text="Отправить" />
          </div>
        </div>
      </div>
    </div>
  </div>
  )
}
