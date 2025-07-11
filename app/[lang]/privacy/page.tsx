export default function PrivacyPage() {
  return (
    (
      <div className="space-y-8">
        <div className="bg-white rounded-2xl shadow-md p-8 border border-gray-100">
          <h1 className="text-3xl font-bold text-gray-800 mb-6">
            Политика конфиденциальности
          </h1>
          <p className="text-gray-600 mb-6">
            Последнее обновление: 11 июля 2025 года
          </p>
          
          <div className="space-y-6">
            <section>
              <h2 className="text-xl font-bold text-gray-800 mb-4">1. Общие положения</h2>
              <p className="text-gray-600 leading-relaxed mb-4">
                Настоящая Политика конфиденциальности определяет порядок обработки персональных данных пользователей агрегатора финансовых услуг GroshiZaraz (далее - &ldquo;Сервис&ldquo;). Мы уважаем право на конфиденциальность и стремимся защитить персональные данные наших пользователей.
              </p>
              <p className="text-gray-600 leading-relaxed">
                Используя наш сервис, вы соглашаетесь с условиями данной Политики конфиденциальности.
              </p>
            </section>
    
            <section>
              <h2 className="text-xl font-bold text-gray-800 mb-4">2. Какие данные мы собираем</h2>
              <div className="bg-gray-50 rounded-xl p-6">
                <h3 className="font-semibold text-gray-800 mb-3">Персональные данные:</h3>
                <ul className="space-y-2 text-gray-600">
                  <li>• Имя и фамилия</li>
                  <li>• Адрес электронной почты</li>
                  <li>• Номер телефона</li>
                  <li>• Данные документов, удостоверяющих личность</li>
                  <li>• Финансовая информация (доходы, расходы, кредитная история)</li>
                  <li>• Данные о трудоустройстве</li>
                </ul>
              </div>
              <div className="bg-blue-50 rounded-xl p-6 mt-4">
                <h3 className="font-semibold text-gray-800 mb-3">Техническая информация:</h3>
                <ul className="space-y-2 text-gray-600">
                  <li>• IP-адрес и геолокация</li>
                  <li>• Информация о браузере и устройстве</li>
                  <li>• Данные о посещении сайта и поведении пользователя</li>
                  <li>• Cookies и аналогичные технологии</li>
                  <li>• Данные о кликах и переходах к партнерам</li>
                </ul>
              </div>
            </section>
    
            <section>
              <h2 className="text-xl font-bold text-gray-800 mb-4">3. Цели обработки данных</h2>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="bg-white border-2 border-blue-100 rounded-xl p-6">
                  <h3 className="font-semibold text-gray-800 mb-3">Основные цели:</h3>
                  <ul className="space-y-2 text-gray-600 text-sm">
                    <li>• Подбор персонализированных финансовых предложений</li>
                    <li>• Обработка заявок на кредиты и займы</li>
                    <li>• Верификация личности и проверка платежеспособности</li>
                    <li>• Связь с пользователями по заявкам</li>
                    <li>• Передача данных партнерам для рассмотрения заявок</li>
                  </ul>
                </div>
                <div className="bg-white border-2 border-yellow-100 rounded-xl p-6">
                  <h3 className="font-semibold text-gray-800 mb-3">Дополнительные цели:</h3>
                  <ul className="space-y-2 text-gray-600 text-sm">
                    <li>• Улучшение качества сервиса и алгоритмов подбора</li>
                    <li>• Персонализация пользовательского опыта</li>
                    <li>• Маркетинговые исследования и аналитика</li>
                    <li>• Предотвращение мошенничества</li>
                    <li>• Соблюдение законодательных требований</li>
                  </ul>
                </div>
              </div>
            </section>
    
            <section>
              <h2 className="text-xl font-bold text-gray-800 mb-4">4. Передача данных третьим лицам</h2>
              <div className="bg-yellow-50 rounded-xl p-6">
                <h3 className="font-semibold text-gray-800 mb-3">Мы передаем ваши данные:</h3>
                <ul className="space-y-2 text-gray-600">
                  <li>• Банкам и МФО для рассмотрения заявок на кредиты</li>
                  <li>• Кредитным бюро для проверки кредитной истории</li>
                  <li>• Сервисам аналитики для улучшения работы платформы</li>
                  <li>• Государственным органам при наличии законных требований</li>
                </ul>
                <p className="text-gray-600 mt-4 text-sm">
                  Все наши партнеры обязуются соблюдать конфиденциальность ваших данных.
                </p>
              </div>
            </section>
    
            <section>
              <h2 className="text-xl font-bold text-gray-800 mb-4">5. Защита данных</h2>
              <p className="text-gray-600 leading-relaxed mb-4">
                Мы применяем современные технические и организационные меры для защиты ваших персональных данных:
              </p>
              <div className="bg-gradient-to-r from-green-50 to-blue-50 rounded-xl p-6">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <h3 className="font-semibold text-gray-800 mb-2">Технические меры:</h3>
                    <ul className="space-y-1 text-gray-600 text-sm">
                      <li>• SSL-шифрование данных</li>
                      <li>• Многофакторная аутентификация</li>
                      <li>• Регулярные обновления безопасности</li>
                      <li>• Защищенные каналы передачи данных</li>
                    </ul>
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-800 mb-2">Организационные меры:</h3>
                    <ul className="space-y-1 text-gray-600 text-sm">
                      <li>• Ограниченный доступ к данным</li>
                      <li>• Обучение сотрудников вопросам безопасности</li>
                      <li>• Регулярные аудиты безопасности</li>
                      <li>• Соглашения о конфиденциальности</li>
                    </ul>
                  </div>
                </div>
              </div>
            </section>
    
            <section>
              <h2 className="text-xl font-bold text-gray-800 mb-4">6. Ваши права</h2>
              <div className="bg-white border-2 border-gray-100 rounded-xl p-6">
                <p className="text-gray-600 mb-4">В соответствии с законодательством Украины, вы имеете право:</p>
                <ul className="space-y-2 text-gray-600">
                  <li>• Получить информацию о обработке ваших данных</li>
                  <li>• Запросить исправление неточных данных</li>
                  <li>• Потребовать удаления персональных данных</li>
                  <li>• Ограничить обработку данных</li>
                  <li>• Отозвать согласие на обработку</li>
                  <li>• Подать жалобу в надзорный орган</li>
                </ul>
              </div>
            </section>
    
            <section>
              <h2 className="text-xl font-bold text-gray-800 mb-4">7. Cookies и аналогичные технологии</h2>
              <div className="bg-purple-50 rounded-xl p-6">
                <p className="text-gray-600 mb-4">Мы используем cookies для:</p>
                <ul className="space-y-2 text-gray-600">
                  <li>• Обеспечения функциональности сайта</li>
                  <li>• Персонализации контента</li>
                  <li>• Анализа трафика и поведения пользователей</li>
                  <li>• Ремаркетинга и показа релевантной рекламы</li>
                </ul>
                <p className="text-gray-600 mt-4 text-sm">
                  Вы можете управлять cookies через настройки браузера.
                </p>
              </div>
            </section>
    
            <section>
              <h2 className="text-xl font-bold text-gray-800 mb-4">8. Контактная информация</h2>
              <div className="bg-blue-50 rounded-xl p-6">
                <p className="text-gray-600 mb-4">
                  По вопросам защиты персональных данных обращайтесь:
                </p>
                <div className="space-y-2 text-gray-600">
                  <p><strong>Email:</strong> privacy@groshizaraz.ua</p>
                  <p><strong>Телефон:</strong> +38 (044) 555-77-99</p>
                  <p><strong>Онлайн-чат:</strong> Доступен 24/7 на сайте</p>
                </div>
              </div>
            </section>
          </div>
        </div>
      </div>
    )
  )
} 

