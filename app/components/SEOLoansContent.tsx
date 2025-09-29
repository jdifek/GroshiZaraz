import React from "react";
import {
  Check,
  X,
  Calculator,
  Shield,
  Clock,
  Star,
  TrendingUp,
  AlertCircle,
  Users,
} from "lucide-react";

export default function SEOLoansContent() {
  const comparisonData = [
    {
      criteria: "Швидкість розгляду",
      mfo: "До 15 хвилин",
      bank: "До 7 днів",
      advantage: "mfo",
    },
    {
      criteria: "Документи",
      mfo: "Тільки паспорт",
      bank: "Довідка + документи",
      advantage: "mfo",
    },
    {
      criteria: "Відсотки",
      mfo: "0,01% - 2,5% на день",
      bank: "15% - 35% річних",
      advantage: "bank",
    },
    {
      criteria: "Максимальна сума",
      mfo: "До 50 000 ₴",
      bank: "До 500 000 ₴",
      advantage: "bank",
    },
    {
      criteria: "Термін погашення",
      mfo: "7-365 днів",
      bank: "До 5 років",
      advantage: "bank",
    },
    {
      criteria: "Кредитна історія",
      mfo: "Не важлива",
      bank: "Обов'язково",
      advantage: "mfo",
    },
  ];

  const faqData = [
    {
      question: "Як швидко можна отримати позику онлайн?",
      answer:
        "Онлайн-заявка розглядається від 5 до 15 хвилин. Після схвалення гроші надходять на карту протягом 15-60 хвилин залежно від МФО та часу подачі заявки.",
    },
    {
      question: "Які документи потрібні для оформлення позики?",
      answer:
        "Для базової позики достатньо паспорта громадянина України та індивідуального податкового номера (ІПН). Деякі МФО можуть запитати номер телефону та банківську карту для зарахування коштів.",
    },
    {
      question: "Що означає «перший займ без відсотків»?",
      answer:
        "Це акційна пропозиція для нових клієнтів, коли за перший займ на певну суму (зазвичай до 3000-5000 ₴) та термін (до 30 днів) відсотки не нараховуються. Повернути потрібно тільки основну суму.",
    },
    {
      question: "Чи можна оформити позику цілодобово?",
      answer:
        "Так, більшість МФО працює 24/7, але автоматичне схвалення зазвичай відбувається в робочі години. У вихідні та святкові дні розгляд може зайняти більше часу.",
    },
    {
      question: "Як обрати найкращу МФО?",
      answer:
        "Звертайте увагу на відсоткову ставку, наявність першого безкоштовного займу, терміни розгляду, відгуки клієнтів, наявність ліцензії НБУ та прозорість умов договору.",
    },
    {
      question: "Чи безпечні онлайн-позики?",
      answer:
        "Так, якщо ви обираєте ліцензовані МФО. Перед оформленням перевірте наявність ліцензії на сайті НБУ, читайте договір та не передавайте дані сторонім особам.",
    },
    {
      question: "Яка середня відсоткова ставка по МФО?",
      answer:
        "Середня ставка коливається від 0,01% до 2,5% на день залежно від МФО, суми та терміну займу. Річна ставка може становити від 0,01% до 730%.",
    },
    {
      question: "Що робити, якщо не можу вчасно повернути позику?",
      answer:
        "Негайно зверніться до МФО для реструктуризації боргу. Більшість компаній готові піти назустріч та запропонувати індивідуальний графік погашення.",
    },
  ];

  const instructionSteps = [
    {
      number: 1,
      title: "Обрати МФО",
      description: "Порівняйте умови різних компаній на нашому сайті",
      details:
        "Звертайте увагу на відсоткову ставку, максимальну суму, термін та наявність акцій",
    },
    {
      number: 2,
      title: "Заповнити заявку",
      description: "Вкажіть особисті дані та бажану суму позики",
      details:
        "Необхідні: ПІБ, дата народження, номер телефону, паспортні дані, ІПН",
    },
    {
      number: 3,
      title: "Дочекатися рішення",
      description: "Розгляд займає від 5 до 15 хвилин",
      details: "МФО автоматично перевірить ваші дані та прийме рішення",
    },
    {
      number: 4,
      title: "Отримати гроші",
      description: "Кошти надійдуть на вашу банківську карту",
      details: "Зазвичай це займає від 15 хвилин до 1 години",
    },
  ];

  return (
    <div className="max-w-7xl mx-auto space-y-16 py-12">
      {/* Вводный блок */}
      <section className="space-y-6">
        <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-6 relative inline-block">
          Що таке позики онлайн
          <div className="absolute -bottom-2 left-0 w-20 h-1 bg-gradient-to-r from-blue-500 to-yellow-400 rounded-full"></div>
        </h2>

        <div className="space-y-4 text-gray-700 text-lg leading-relaxed">
          <p>
            <strong>Позики онлайн</strong> — це швидкі мікрокредити на карту,
            які можна отримати через інтернет без відвідування офісів банків або
            МФО. Такі <strong>позики на карту</strong> стали популярним рішенням
            для термінових фінансових потреб українців.
          </p>
          <p>
            <strong>Швидкі позики</strong> доступні 24/7 і підходять для
            покриття непередбачених витрат, від оплати комунальних послуг до
            медичних послуг. Всі <strong>МФО України</strong> на нашій платформі
            мають офіційні ліцензії та дотримуються вимог НБУ.
          </p>
          <p>
            Оформлення займає лише кілька хвилин, а схвалення отримує понад 80%
            заявників. Більшість компаній пропонують{" "}
            <strong>перший займ безкоштовно</strong> для нових клієнтів.
          </p>
        </div>
      </section>

      <section className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-3xl p-8 space-y-8">
        <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-8 relative inline-block">
          Як працюють мікропозики в Україні
          <div className="absolute -bottom-2 left-0 w-20 h-1 bg-gradient-to-r from-blue-500 to-yellow-400 rounded-full"></div>
        </h2>

        <div className="grid md:grid-cols-2 gap-8">
          <div className="space-y-6">
            <div className="bg-white rounded-2xl p-6 shadow-lg">
              <h3 className="font-semibold text-gray-800 text-xl mb-4 flex items-center gap-3">
                <Calculator className="w-6 h-6 text-blue-500" />
                Умови та розміри позик
              </h3>
              <div className="space-y-4 text-gray-700">
                <p>
                  <strong>Отримати позику онлайн</strong> можна на суму від 500
                  до 50 000 ₴ терміном від 7 до 365 днів. Розмір та термін
                  залежать від обраної МФО та вашої кредитної історії.
                </p>
                <p>
                  Відсоткові ставки варіюються від 0,01% до 2,5% на день.{" "}
                  <strong>Позики без відмови</strong> доступні навіть клієнтам з
                  негативною кредитною історією, але під вищий відсоток.
                </p>
              </div>
            </div>

            <div className="bg-white rounded-2xl p-6 shadow-lg">
              <h3 className="font-semibold text-gray-800 text-xl mb-4 flex items-center gap-3">
                <Shield className="w-6 h-6 text-green-500" />
                Безпека та ліцензування
              </h3>
              <div className="space-y-4 text-gray-700">
                <p>
                  Всі <strong>МФО України</strong> на нашому сайті мають
                  офіційні ліцензії НБУ. Ми регулярно перевіряємо статус
                  компаній та оновлюємо інформацію про умови кредитування.
                </p>
                <p>
                  Дані клієнтів захищені за стандартами SSL-шифрування, а всі
                  операції проходять через захищені платіжні системи.
                </p>
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <div className="bg-white rounded-2xl p-6 shadow-lg">
              <h3 className="font-semibold text-gray-800 text-xl mb-4 flex items-center gap-3">
                <Clock className="w-6 h-6 text-orange-500" />
                Швидкість та зручність
              </h3>
              <div className="space-y-4 text-gray-700">
                <p>
                  Оформлення <strong>позики онлайн</strong> займає 5-15 хвилин.
                  Автоматична система оцінки ризиків дає миттєву відповідь у 70%
                  випадків.
                </p>
                <p>
                  <strong>Перший займ без відсотків</strong> — це можливість
                  отримати до 5000 ₴ безкоштовно терміном до 30 днів для нових
                  клієнтів більшості МФО.
                </p>
              </div>
            </div>

            <div className="bg-white rounded-2xl p-6 shadow-lg">
              <h3 className="font-semibold text-gray-800 text-xl mb-4 flex items-center gap-3">
                <TrendingUp className="w-6 h-6 text-purple-500" />
                Поради експертів
              </h3>
              <div className="space-y-4 text-gray-700">
                <p>
                  Обирайте суму та термін для мінімальної переплати.
                  Короткострокові позики до 30 днів часто мають нижчу загальну
                  вартість.
                </p>
                <p>
                  Завжди перевіряйте наявність ліцензії МФО на офіційному сайті
                  НБУ перед оформленням будь-якого фінансового продукту.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Таблица сравнения */}
      <section className="space-y-8">
        <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 relative inline-block">
          Порівняння МФО з банками
          <div className="absolute -bottom-2 left-0 w-20 h-1 bg-gradient-to-r from-blue-500 to-yellow-400 rounded-full"></div>
        </h2>

        <div className="bg-white rounded-3xl shadow-xl overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gradient-to-r from-blue-500 to-blue-600 text-white">
                <tr>
                  <th className="px-6 py-4 text-left font-semibold">
                    Критерій
                  </th>
                  <th className="px-6 py-4 text-center font-semibold">МФО</th>
                  <th className="px-6 py-4 text-center font-semibold">Банк</th>
                  <th className="px-6 py-4 text-center font-semibold">
                    Переможець
                  </th>
                </tr>
              </thead>
              <tbody>
                {comparisonData.map((row, index) => (
                  <tr
                    key={index}
                    className="border-b border-gray-100 hover:bg-gray-50 transition-colors"
                  >
                    <td className="px-6 py-4 font-medium text-gray-800">
                      {row.criteria}
                    </td>
                    <td className="px-6 py-4 text-center">
                      <span
                        className={`inline-block ${
                          row.advantage === "mfo"
                            ? "text-green-600 font-semibold"
                            : "text-gray-600"
                        }`}
                      >
                        {row.mfo}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-center">
                      <span
                        className={`inline-block ${
                          row.advantage === "bank"
                            ? "text-green-600 font-semibold"
                            : "text-gray-600"
                        }`}
                      >
                        {row.bank}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-center">
                      {row.advantage === "mfo" ? (
                        <div className="inline-flex items-center gap-2 text-green-600 font-semibold">
                          <Check className="w-5 h-5" />
                          МФО
                        </div>
                      ) : (
                        <div className="inline-flex items-center gap-2 text-blue-600 font-semibold">
                          <Check className="w-5 h-5" />
                          Банк
                        </div>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Преимущества */}
      <section className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-3xl p-8 space-y-8">
        <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 relative inline-block">
          Переваги позик онлайн
          <div className="absolute -bottom-2 left-0 w-20 h-1 bg-gradient-to-r from-green-500 to-emerald-400 rounded-full"></div>
        </h2>

        <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">
          {[
            {
              icon: <Clock className="w-8 h-8 text-blue-500" />,
              title: "Швидке оформлення",
              description: "Всього 15 хвилин від заявки до отримання коштів",
            },
            {
              icon: <Star className="w-8 h-8 text-yellow-500" />,
              title: "Перший займ безкоштовно",
              description: "Новим клієнтам доступні безвідсоткові позики",
            },
            {
              icon: <Shield className="w-8 h-8 text-green-500" />,
              title: "Цілодобовий доступ",
              description: "Подавайте заявки у будь-який час доби",
            },
            {
              icon: <TrendingUp className="w-8 h-8 text-purple-500" />,
              title: "Високий рівень схвалення",
              description: "Понад 80% заявок отримують позитивне рішення",
            },
            {
              icon: <Users className="w-8 h-8 text-indigo-500" />,
              title: "Зручне порівняння",
              description: "Порівнюйте МФО за сумою, ставкою та термінами",
            },
            {
              icon: <AlertCircle className="w-8 h-8 text-red-500" />,
              title: "Без довідок про доходи",
              description: "Мінімальний пакет документів для оформлення",
            },
          ].map((advantage, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
            >
              <div className="flex items-center gap-4 mb-4">
                {advantage.icon}
                <h3 className="font-semibold text-gray-800 text-lg">
                  {advantage.title}
                </h3>
              </div>
              <p className="text-gray-600">{advantage.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Пошагова инструкция */}
      <section className="space-y-8">
        <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 relative inline-block">
          Покрокова інструкція: як оформити позику онлайн
          <div className="absolute -bottom-2 left-0 w-20 h-1 bg-gradient-to-r from-blue-500 to-yellow-400 rounded-full"></div>
        </h2>

        <div className="grid md:grid-cols-2 gap-8">
          {instructionSteps.map((step, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl p-6 shadow-lg border-l-4 border-blue-500 hover:shadow-xl transition-shadow"
            >
              <div className="flex items-start gap-4">
                <div className="bg-blue-500 text-white w-10 h-10 rounded-full flex items-center justify-center font-bold text-lg flex-shrink-0">
                  {step.number}
                </div>
                <div className="space-y-3">
                  <h3 className="font-semibold text-gray-800 text-xl">
                    {step.title}
                  </h3>
                  <p className="text-gray-700 text-lg">{step.description}</p>
                  <p className="text-gray-600 text-sm bg-gray-50 p-3 rounded-xl">
                    <strong>Деталі:</strong> {step.details}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="bg-yellow-50 border border-yellow-200 rounded-2xl p-6">
          <div className="flex items-start gap-3">
            <AlertCircle className="w-6 h-6 text-yellow-600 flex-shrink-0 mt-1" />
            <div>
              <h3 className="font-semibold text-yellow-800 mb-2">
                Важливо знати
              </h3>
              <p className="text-yellow-700">
                Перед оформленням уважно ознайомтеся з умовами договору.
                Переконайтеся, що зможете вчасно повернути позику, щоб уникнути
                додаткових комісій та штрафів.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ блок */}
      <section className="bg-gradient-to-br from-gray-50 to-blue-50 rounded-3xl p-8 space-y-8">
        <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 relative inline-block">
          Поширені питання про позики онлайн
          <div className="absolute -bottom-2 left-0 w-20 h-1 bg-gradient-to-r from-blue-500 to-yellow-400 rounded-full"></div>
        </h2>
        <div className="space-y-4">
          {faqData.map((faq, index) => (
            <div key={index} className="bg-white rounded-2xl shadow-lg p-6">
              <h3 className="font-semibold text-gray-800 text-lg mb-2 flex items-center justify-between">
                {faq.question}
              </h3>
              <p className="text-gray-700">{faq.answer}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Таблица сравнения */}
      <section className="space-y-8">
        <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 relative inline-block">
          Порівняння МФО з банками
          <div className="absolute -bottom-2 left-0 w-20 h-1 bg-gradient-to-r from-blue-500 to-yellow-400 rounded-full"></div>
        </h2>
        <div className="bg-white rounded-3xl shadow-xl overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gradient-to-r from-blue-500 to-blue-600 text-white">
                <tr>
                  <th className="px-6 py-4 text-left font-semibold">
                    Критерій
                  </th>
                  <th className="px-6 py-4 text-center font-semibold">МФО</th>
                  <th className="px-6 py-4 text-center font-semibold">Банк</th>
                  <th className="px-6 py-4 text-center font-semibold">
                    Переможець
                  </th>
                </tr>
              </thead>
              <tbody>
                {comparisonData.map((row, index) => (
                  <tr key={index} className="border-b border-gray-100">
                    <td className="px-6 py-4 font-medium text-gray-800">
                      {row.criteria}
                    </td>
                    <td
                      className={`px-6 py-4 text-center ${
                        row.advantage === "mfo"
                          ? "text-green-600 font-semibold"
                          : "text-gray-600"
                      }`}
                    >
                      {row.mfo}
                    </td>
                    <td
                      className={`px-6 py-4 text-center ${
                        row.advantage === "bank"
                          ? "text-green-600 font-semibold"
                          : "text-gray-600"
                      }`}
                    >
                      {row.bank}
                    </td>
                    <td className="px-6 py-4 text-center">
                      <div
                        className={`inline-flex items-center gap-2 ${
                          row.advantage === "mfo"
                            ? "text-green-600"
                            : "text-blue-600"
                        } font-semibold`}
                      >
                        <Check className="w-5 h-5" />
                        {row.advantage === "mfo" ? "МФО" : "Банк"}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Пошаговая инструкция */}
      <section className="space-y-8">
        <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 relative inline-block">
          Покрокова інструкція: як оформити позику онлайн
          <div className="absolute -bottom-2 left-0 w-20 h-1 bg-gradient-to-r from-blue-500 to-yellow-400 rounded-full"></div>
        </h2>
        <div className="grid md:grid-cols-2 gap-8">
          {instructionSteps.map((step, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl p-6 shadow-lg border-l-4 border-blue-500"
            >
              <div className="flex items-start gap-4">
                <div className="bg-blue-500 text-white w-10 h-10 rounded-full flex items-center justify-center font-bold text-lg flex-shrink-0">
                  {step.number}
                </div>
                <div className="space-y-3">
                  <h3 className="font-semibold text-gray-800 text-xl">
                    {step.title}
                  </h3>
                  <p className="text-gray-700 text-lg">{step.description}</p>
                  <p className="text-gray-600 text-sm bg-gray-50 p-3 rounded-xl">
                    <strong>Деталі:</strong> {step.details}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Дополнительная экспертная информация */}
      <section className="space-y-8">
        <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 relative inline-block">
          Експертні поради: як правильно користуватися мікрокредитами
          <div className="absolute -bottom-2 left-0 w-20 h-1 bg-gradient-to-r from-blue-500 to-yellow-400 rounded-full"></div>
        </h2>

        <div className="grid lg:grid-cols-2 gap-8">
          <div className="space-y-6">
            <div className="bg-green-50 border border-green-200 rounded-2xl p-6">
              <h3 className="font-semibold text-green-800 mb-4 flex items-center gap-3">
                <Check className="w-6 h-6" />
                Що ПОТРІБНО робити
              </h3>
              <ul className="space-y-3 text-green-700">
                <li className="flex items-start gap-3">
                  <Check className="w-5 h-5 flex-shrink-0 mt-0.5" />
                  <span>Перевіряйте наявність ліцензії МФО на сайті НБУ</span>
                </li>
                <li className="flex items-start gap-3">
                  <Check className="w-5 h-5 flex-shrink-0 mt-0.5" />
                  <span>Читайте договір повністю перед підписанням</span>
                </li>
                <li className="flex items-start gap-3">
                  <Check className="w-5 h-5 flex-shrink-0 mt-0.5" />
                  <span>Порівнюйте умови кількох МФО</span>
                </li>
                <li className="flex items-start gap-3">
                  <Check className="w-5 h-5 flex-shrink-0 mt-0.5" />
                  <span>Розраховуйте свої можливості погашення</span>
                </li>
                <li className="flex items-start gap-3">
                  <Check className="w-5 h-5 flex-shrink-0 mt-0.5" />
                  <span>Користуйтеся першим безкоштовним займом</span>
                </li>
              </ul>
            </div>

            <div className="bg-blue-50 border border-blue-200 rounded-2xl p-6">
              <h3 className="font-semibold text-blue-800 mb-4">
                Корисні калькулятори
              </h3>
              <p className="text-blue-700 mb-4">
                Перед оформленням позики скористайтеся онлайн-калькулятором для
                розрахунку повної вартості кредиту:
              </p>
              <ul className="space-y-2 text-blue-700 mb-4">
                <li>
                  • Сума до повернення = Основний борг + Відсотки + Комісії
                </li>
                <li>• Денна ставка × Кількість днів = Відсотки</li>
                <li>• Завжди враховуйте всі додаткові платежі</li>
              </ul>
              <p className="text-blue-700">
                Використовуйте калькулятори для точного планування ваших
                фінансів.
              </p>
            </div>
          </div>

          <div className="space-y-6">
            <div className="bg-red-50 border border-red-200 rounded-2xl p-6">
              <h3 className="font-semibold text-red-800 mb-4 flex items-center gap-3">
                <X className="w-6 h-6" />
                Чого НЕ ВАРТО робити
              </h3>
              <ul className="space-y-3 text-red-700">
                <li className="flex items-start gap-3">
                  <X className="w-5 h-5 flex-shrink-0 mt-0.5" />
                  <span>Брати позики у неліцензованих організацій</span>
                </li>
                <li className="flex items-start gap-3">
                  <X className="w-5 h-5 flex-shrink-0 mt-0.5" />
                  <span>Оформляти кілька позик одночасно</span>
                </li>
                <li className="flex items-start gap-3">
                  <X className="w-5 h-5 flex-shrink-0 mt-0.5" />
                  <span>Ігнорувати терміни погашення</span>
                </li>
                <li className="flex items-start gap-3">
                  <X className="w-5 h-5 flex-shrink-0 mt-0.5" />
                  <span>Передавати особисті дані третім особам</span>
                </li>
                <li className="flex items-start gap-3">
                  <X className="w-5 h-5 flex-shrink-0 mt-0.5" />
                  <span>Підписувати договір не прочитавши</span>
                </li>
              </ul>
            </div>

            <div className="bg-yellow-50 border border-yellow-200 rounded-2xl p-6">
              <h3 className="font-semibold text-yellow-800 mb-4">
                Альтернативи мікрокредитам
              </h3>
              <p className="text-yellow-700 mb-4">
                Розгляньте інші варіанти перед оформленням позики:
              </p>
              <ul className="space-y-2 text-yellow-700">
                <li>• Кредитна карта з пільговим періодом</li>
                <li>• Позика від друзів чи родичів</li>
                <li>• Продаж непотрібних речей</li>
                <li>• Додаткова підробітка</li>
                <li>• Банківський овердрафт</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Заключение + призыв к действию */}
      <section className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-3xl p-8 text-white text-center space-y-6">
        <h2 className="text-2xl sm:text-3xl font-bold mb-4">
          Оформлюйте позику онлайн прямо зараз
        </h2>

        <div className="max-w-3xl mx-auto space-y-4 text-lg text-blue-100">
          <p>
            Оберіть найзручнішу <strong>МФО України</strong> з нашого списку,
            порівняйте умови та отримайте <strong>позику на карту</strong> без
            зайвих затримок та бюрократії.
          </p>
          <p>
            Всі <strong>позики онлайн</strong> на нашій платформі від
            перевірених та ліцензованих компаній. Скористайтеся{" "}
            <strong>першим займом безкоштовно</strong> та отримайте гроші вже
            сьогодні!
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-6">
          <button className="bg-white text-blue-600 px-8 py-4 rounded-2xl font-semibold text-lg hover:bg-gray-50 transition-all duration-200 hover:scale-105 shadow-lg">
            Порівняти МФО
          </button>
          <div className="flex items-center gap-2 text-blue-200">
            <Shield className="w-5 h-5" />
            <span className="text-sm">Всі МФО ліцензовані НБУ</span>
          </div>
        </div>
      </section>

      {/* Дополнительные внутренние ссылки */}
      <section className="bg-gray-50 rounded-3xl p-8 space-y-6">
        <h2 className="text-xl font-bold text-gray-800 text-center mb-8">
          Інші фінансові продукти
        </h2>

        <div className="grid md:grid-cols-3 gap-6">
          <div className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <TrendingUp className="w-8 h-8 text-white" />
              </div>
              <h3 className="font-semibold text-gray-800 mb-2">
                Кредитні карти
              </h3>
              <p className="text-gray-600 text-sm mb-4">
                Порівняйте умови кредитних карт від українських банків
              </p>
              <button className="text-blue-600 hover:text-blue-700 font-medium text-sm">
                Дивитися карти →
              </button>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <Shield className="w-8 h-8 text-white" />
              </div>
              <h3 className="font-semibold text-gray-800 mb-2">Депозити</h3>
              <p className="text-gray-600 text-sm mb-4">
                Найвигідніші депозитні програми банків України
              </p>
              <button className="text-blue-600 hover:text-blue-700 font-medium text-sm">
                Обрати депозит →
              </button>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="w-8 h-8 text-white" />
              </div>
              <h3 className="font-semibold text-gray-800 mb-2">Іпотека</h3>
              <p className="text-gray-600 text-sm mb-4">
                Іпотечні кредити на житло з мінімальними ставками
              </p>
              <button className="text-blue-600 hover:text-blue-700 font-medium text-sm">
                Розрахувати іпотеку →
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Статистика и цифры */}
      <section className="space-y-8">
        <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 text-center relative inline-block w-full">
          Статистика ринку мікрокредитування в Україні
          <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-20 h-1 bg-gradient-to-r from-blue-500 to-yellow-400 rounded-full"></div>
        </h2>

        <div className="grid md:grid-cols-2 xl:grid-cols-4 gap-6">
          <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl p-6 text-white text-center">
            <div className="text-3xl font-bold mb-2">150+</div>
            <div className="text-blue-100 text-sm">Ліцензованих МФО</div>
          </div>

          <div className="bg-gradient-to-br from-green-500 to-green-600 rounded-2xl p-6 text-white text-center">
            <div className="text-3xl font-bold mb-2">85%</div>
            <div className="text-green-100 text-sm">
              Середній рівень схвалення
            </div>
          </div>

          <div className="bg-gradient-to-br from-orange-500 to-orange-600 rounded-2xl p-6 text-white text-center">
            <div className="text-3xl font-bold mb-2">15 хв</div>
            <div className="text-orange-100 text-sm">Середній час розгляду</div>
          </div>

          <div className="bg-gradient-to-br from-purple-500 to-purple-600 rounded-2xl p-6 text-white text-center">
            <div className="text-3xl font-bold mb-2">₴8,500</div>
            <div className="text-purple-100 text-sm">Середня сума позики</div>
          </div>
        </div>

        <div className="bg-white rounded-3xl p-8 shadow-lg">
          <h3 className="text-xl font-bold text-gray-800 mb-6 text-center">
            Динаміка розвитку ринку мікрокредитування
          </h3>

          <div className="space-y-6 text-gray-700">
            <p>
              Ринок <strong>мікрофінансових організацій України</strong> показує
              стабільне зростання протягом останніх років. Збільшення попиту на{" "}
              <strong>швидкі позики онлайн</strong> пов&rsquo;язане з
              цифровізацією фінансових послуг та зміною споживчих звичок
              українців.
            </p>

            <div className="grid md:grid-cols-2 gap-8">
              <div className="space-y-4">
                <h4 className="font-semibold text-gray-800">
                  Ключові тренди 2024 року:
                </h4>
                <ul className="space-y-2 text-gray-600">
                  <li className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                    <span>Зростання частки цифрових каналів до 90%</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0"></div>
                    <span>Підвищення лояльності клієнтів до 65%</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-orange-500 rounded-full mt-2 flex-shrink-0"></div>
                    <span>Зменшення середнього терміну позики до 45 днів</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-purple-500 rounded-full mt-2 flex-shrink-0"></div>
                    <span>Впровадження ШІ для оцінки ризиків</span>
                  </li>
                </ul>
              </div>

              <div className="space-y-4">
                <h4 className="font-semibold text-gray-800">
                  Регуляторні зміни:
                </h4>
                <ul className="space-y-2 text-gray-600">
                  <li className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-red-500 rounded-full mt-2 flex-shrink-0"></div>
                    <span>Посилення вимог до ліцензування МФО</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                    <span>Обмеження максимальної ставки до 365% річних</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0"></div>
                    <span>Впровадження додаткового захисту споживачів</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-yellow-500 rounded-full mt-2 flex-shrink-0"></div>
                    <span>Підвищення прозорості тарифів</span>
                  </li>
                </ul>
              </div>
            </div>

            <p>
              Національний банк України активно працює над створенням
              збалансованого регуляторного середовища, яке захищає права
              споживачів і водночас дозволяє <strong>МФО</strong> розвиватися та
              надавати якісні фінансові послуги.
            </p>
          </div>
        </div>
      </section>

      {/* Глоссарий терминов */}
      <section className="bg-gradient-to-br from-gray-50 to-slate-50 rounded-3xl p-8 space-y-8">
        <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 relative inline-block">
          Глосарій термінів мікрокредитування
          <div className="absolute -bottom-2 left-0 w-20 h-1 bg-gradient-to-r from-blue-500 to-yellow-400 rounded-full"></div>
        </h2>

        <div className="grid md:grid-cols-2 gap-6">
          {[
            {
              term: "МФО (Мікрофінансова організація)",
              definition:
                "Небанківська фінансова установа, яка має ліцензію НБУ на надання мікрокредитів фізичним та юридичним особам.",
            },
            {
              term: "Ефективна річна ставка (ЕРС)",
              definition:
                "Повна вартість кредиту у відсотках річних, включає всі обов'язкові платежі, комісії та інші витрати позичальника.",
            },
            {
              term: "Овердрафт",
              definition:
                "Кредитування рахунку клієнта понад залишок коштів на ньому, тобто можливість витрачати більше, ніж є на рахунку.",
            },
            {
              term: "Пролонгація",
              definition:
                "Продовження терміну дії кредитного договору на визначений період за додатковою комісією.",
            },
            {
              term: "Скорінг",
              definition:
                "Автоматизована система оцінки кредитоспроможності позичальника на основі статистичних методів.",
            },
            {
              term: "Тіло кредиту",
              definition:
                "Основна сума заборгованості за кредитом без урахування нарахованих відсотків та комісій.",
            },
            {
              term: "Кредитна історія",
              definition:
                "Інформація про всі кредитні зобов'язання особи, їх виконання та порушення в БКІ (Бюро кредитних історій).",
            },
            {
              term: "Реструктуризація боргу",
              definition:
                "Зміна умов погашення заборгованості за взаємною згодою кредитора та позичальника для полегшення виплат.",
            },
          ].map((item, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow"
            >
              <h3 className="font-semibold text-blue-600 text-lg mb-3">
                {item.term}
              </h3>
              <p className="text-gray-700 text-sm leading-relaxed">
                {item.definition}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Сравнение процентных ставок */}
      <section className="space-y-8">
        <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 relative inline-block">
          Порівняння відсоткових ставок МФО
          <div className="absolute -bottom-2 left-0 w-20 h-1 bg-gradient-to-r from-blue-500 to-yellow-400 rounded-full"></div>
        </h2>

        <div className="bg-white rounded-3xl shadow-xl overflow-hidden">
          <div className="bg-gradient-to-r from-blue-500 to-blue-600 text-white p-6">
            <h3 className="text-xl font-semibold text-center">
              Середні ставки за типами позик (на день)
            </h3>
          </div>

          <div className="p-6">
            <div className="grid md:grid-cols-3 gap-6">
              <div className="text-center p-4 bg-green-50 rounded-2xl border border-green-200">
                <div className="text-2xl font-bold text-green-600 mb-2">
                  0,01% - 0,5%
                </div>
                <div className="text-gray-700 font-medium mb-2">
                  Перший займ
                </div>
                <div className="text-sm text-gray-600">
                  Для нових клієнтів з акціями
                </div>
              </div>

              <div className="text-center p-4 bg-yellow-50 rounded-2xl border border-yellow-200">
                <div className="text-2xl font-bold text-yellow-600 mb-2">
                  0,5% - 1,5%
                </div>
                <div className="text-gray-700 font-medium mb-2">
                  Повторні позики
                </div>
                <div className="text-sm text-gray-600">
                  Для постійних клієнтів
                </div>
              </div>

              <div className="text-center p-4 bg-red-50 rounded-2xl border border-red-200">
                <div className="text-2xl font-bold text-red-600 mb-2">
                  1,5% - 2,5%
                </div>
                <div className="text-gray-700 font-medium mb-2">
                  Ризикові позики
                </div>
                <div className="text-sm text-gray-600">При негативній КІ</div>
              </div>
            </div>

            <div className="mt-8 bg-blue-50 rounded-2xl p-6">
              <h4 className="font-semibold text-blue-800 mb-4 flex items-center gap-2">
                <Calculator className="w-5 h-5" />
                Приклад розрахунку переплати
              </h4>
              <div className="space-y-3 text-blue-700">
                <div className="flex justify-between items-center">
                  <span>Сума позики:</span>
                  <span className="font-semibold">5 000 ₴</span>
                </div>
                <div className="flex justify-between items-center">
                  <span>Термін:</span>
                  <span className="font-semibold">30 днів</span>
                </div>
                <div className="flex justify-between items-center">
                  <span>Ставка на день:</span>
                  <span className="font-semibold">1%</span>
                </div>
                <div className="border-t border-blue-200 pt-3 flex justify-between items-center font-bold text-lg">
                  <span>До повернення:</span>
                  <span>6 500 ₴</span>
                </div>
                <div className="text-sm text-blue-600">
                  Переплата: 1 500 ₴ (30%)
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
