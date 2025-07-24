'use client';
import { BlueButton } from '@/app/ui/Buttons/BlueButton';
import { useRouter } from 'next/navigation';
import React from 'react';

const ArticleDetailPage = () => {
  const router = useRouter();

  // Основная статья
  const article = {
    id: 1,
    title: "Альфа-Банк представил новое приложение для айфонов",
    excerpt: "Обновленное мобильное приложение с расширенным функционалом и улучшенным интерфейсом",
    date: "11.07.2025",
    category: "Новости",
    author: "Ольга Пиходская",
    views: 36,
    image: "🏦",
    color: "bg-gradient-to-br from-blue-500 to-blue-600",
    readTime: "5 мин чтения",
    content: `
      <p>Альфа-Банк анонсировал запуск обновленной версии мобильного приложения для устройств на iOS. Новое приложение получило расширенный функционал и значительно улучшенный пользовательский интерфейс.</p>
      
      <h3>Основные нововведения</h3>
      <p>В обновленном приложении пользователи найдут множество полезных функций, которые сделают банковские операции еще более удобными и быстрыми. Особое внимание разработчики уделили безопасности и стабильности работы.</p>
      
      <ul>
        <li>Новый интуитивно понятный интерфейс с темной темой</li>
        <li>Улучшенная система уведомлений и push-сообщений</li>
        <li>Расширенные возможности управления картами и счетами</li>
        <li>Интеграция с Apple Pay и другими платежными системами</li>
        <li>Персонализированные финансовые рекомендации</li>
      </ul>
      
      <h3>Безопасность превыше всего</h3>
      <p>Новое приложение использует самые современные технологии защиты данных. Внедрена двухфакторная аутентификация, биометрическая идентификация и шифрование данных на уровне банка.</p>
      
      <p>По словам представителей банка, разработка велась более 8 месяцев с участием ведущих специалистов по UX/UI дизайну и кибербезопасности. Приложение прошло множество тестов и получило положительные отзывы от фокус-групп.</p>
      
      <h3>Доступность и системные требования</h3>
      <p>Обновленное приложение доступно для скачивания в App Store и поддерживает устройства с iOS 14.0 и выше. Пользователи Android смогут воспользоваться аналогичным обновлением в ближайшие недели.</p>
      
      <p>Банк также объявил о планах по интеграции с популярными финтех-сервисами и запуску программы лояльности для активных пользователей мобильного приложения.</p>
    `
  };

  // Похожие статьи
  const relatedArticles = [
    {
      id: 2,
      title: "Что делать, если нечем платить кредит",
      excerpt: "Подробная инструкция по решению проблем с просроченными кредитными обязательствами",
      date: "11.07.2025",
      category: "Пособия",
      author: "Ирина Калимулина",
      views: 79100,
      image: "💳",
      color: "bg-gradient-to-br from-purple-500 to-purple-600",
    },
    {
      id: 4,
      title: "Рейтинг надежности банков Украины — июль 2025",
      excerpt: "Актуальная информация о финансовой устойчивости и рейтингах банковских учреждений",
      date: "09.07.2025",
      category: "Аналитика",
      author: "Максим Петров",
      views: 12800,
      image: "🏆",
      color: "bg-gradient-to-br from-yellow-400 to-yellow-500",
    },
    {
      id: 7,
      title: "Новые банковские карты с кэшбэком",
      excerpt: "Сравнение дебетовых карт с максимальным кэшбэком и бонусными программами",
      date: "06.07.2025",
      category: "Дебетовые карты",
      author: "Елена Козлова",
      views: 9300,
      image: "💳",
      color: "bg-gradient-to-br from-red-500 to-red-600",
    },
  ];

  const formatViews = (views: number) => {
    if (views >= 1000) {
      return `${(views / 1000).toFixed(1)}K`;
    }
    return views.toString();
  };

  return (
    <div className="min-h-screen">
      {/* Breadcrumbs */}
      <div className="border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center text-sm text-gray-600 py-4">
            <button 
              onClick={() => router.push('/')}
              className="hover:text-blue-600 transition-colors"
            >
              Главная
            </button>
            <span className="mx-2">-</span>
            <button 
              onClick={() => router.push('/journal')}
              className="hover:text-blue-600 transition-colors"
            >
              Журнал GroshiZaraz
            </button>
            <span className="mx-2">-</span>
            <span>{article.category}</span>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4">
        {/* Article Header */}
        <article className="bg-white rounded-2xl shadow-md overflow-hidden border border-gray-100 my-8">
          {/* Hero Image */}
          <div className={`${article.color} h-96 md:h-[500px] flex items-center justify-center text-8xl md:text-9xl text-white relative overflow-hidden`}>
            <div className="text-center transform hover:scale-110 transition-transform duration-300">
              {article.image}
            </div>
            
            {/* Category Badge - теперь с белым фоном для читаемости */}
            <div className="absolute top-6 left-6">
              <span className="bg-white text-gray-800 px-4 py-2 rounded-full text-sm font-bold shadow-lg">
                {article.category}
              </span>
            </div>

            {/* Date */}
            <div className="absolute top-6 right-6">
              <span className="bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full text-sm font-medium text-white border border-white/20">
                {article.date}
              </span>
            </div>

            {/* Article Info Overlay */}
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 via-black/30 to-transparent p-8">
              <div className="max-w-4xl mx-auto">
                <h1 className="text-3xl md:text-5xl font-bold mb-6 leading-tight !text-white drop-shadow-lg">
                  {article.title}
                </h1>
                <div className="flex flex-wrap items-center gap-6 text-white/90">
                  <span className="flex items-center gap-2 bg-white/10 backdrop-blur-sm px-3 py-2 rounded-full text-sm">
                    👤 {article.author}
                  </span>
                  <span className="flex items-center gap-2 bg-white/10 backdrop-blur-sm px-3 py-2 rounded-full text-sm">
                    👁️ {formatViews(article.views)} просмотров
                  </span>
                  <span className="flex items-center gap-2 bg-white/10 backdrop-blur-sm px-3 py-2 rounded-full text-sm">
                    ⏱️ {article.readTime}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Article Content */}
          <div className="p-8 md:p-12">
            {/* Article Excerpt */}
            <div className="bg-gray-50 rounded-2xl p-6 mb-8 border-l-4 border-blue-500">
              <p className="text-lg text-gray-700 leading-relaxed italic">
                {article.excerpt}
              </p>
            </div>

            <div className="prose prose-lg max-w-none">
              <div 
                className="text-gray-700 leading-relaxed"
                dangerouslySetInnerHTML={{ __html: article.content }}
              />
            </div>

            {/* Social Share */}
            <div className="mt-12 pt-8 border-t border-gray-100">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                <div className="text-sm text-gray-500 font-medium">
                  Поделиться статьей:
                </div>
                <div className="flex items-center gap-3">
                  <button className="w-12 h-12 bg-blue-500 text-white rounded-full flex items-center justify-center hover:bg-blue-600 transition-all duration-200 hover:scale-110 shadow-lg">
                    📘
                  </button>
                  <button className="w-12 h-12 bg-blue-400 text-white rounded-full flex items-center justify-center hover:bg-blue-500 transition-all duration-200 hover:scale-110 shadow-lg">
                    🐦
                  </button>
                  <button className="w-12 h-12 bg-green-500 text-white rounded-full flex items-center justify-center hover:bg-green-600 transition-all duration-200 hover:scale-110 shadow-lg">
                    💬
                  </button>
                  <button className="w-12 h-12 bg-gray-600 text-white rounded-full flex items-center justify-center hover:bg-gray-700 transition-all duration-200 hover:scale-110 shadow-lg">
                    🔗
                  </button>
                </div>
              </div>
            </div>
          </div>
        </article>

        <div className="flex flex-col lg:flex-row gap-8 mb-8">
          {/* Author Info */}
          <div className="flex-1 bg-white rounded-2xl shadow-md p-8 border border-gray-100 hover:shadow-lg transition-shadow">
            <div className="flex items-start gap-6">
              <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white text-3xl font-bold shadow-lg">
                {article.author.charAt(0)}
              </div>
              <div className="flex-1">
                <h3 className="text-2xl font-bold text-gray-800 mb-3">{article.author}</h3>
                <p className="text-gray-600 mb-4 leading-relaxed">
                  Финансовый журналист с более чем 5-летним опытом освещения банковской сферы. 
                  Специализируется на анализе банковских продуктов и технологических инноваций в финансах.
                </p>
                <div className="flex items-center gap-6">
                  <div className="bg-blue-50 px-4 py-2 rounded-full">
                    <span className="text-sm font-medium text-blue-600">Статей: 47</span>
                  </div>
                  <div className="bg-green-50 px-4 py-2 rounded-full">
                    <span className="text-sm font-medium text-green-600">Просмотров: 1.2M</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="lg:w-80 bg-white rounded-2xl shadow-md p-8 border border-gray-100">
            <h3 className="text-xl font-bold text-gray-800 mb-6 relative inline-block">
              Действия
              <div className="absolute -bottom-2 left-0 w-12 h-1 bg-gradient-to-r from-blue-500 to-yellow-400 rounded-full"></div>
            </h3>
            <div className="space-y-4">
              <button className="w-full bg-gradient-to-r from-blue-500 to-blue-600 text-white py-3 px-4 rounded-xl font-medium hover:from-blue-600 hover:to-blue-700 transition-all duration-200 shadow-lg hover:shadow-xl">
                💾 Сохранить статью
              </button>
              <button className="w-full bg-gradient-to-r from-green-500 to-green-600 text-white py-3 px-4 rounded-xl font-medium hover:from-green-600 hover:to-green-700 transition-all duration-200 shadow-lg hover:shadow-xl">
                📧 Подписаться на автора
              </button>
              <button className="w-full bg-gradient-to-r from-purple-500 to-purple-600 text-white py-3 px-4 rounded-xl font-medium hover:from-purple-600 hover:to-purple-700 transition-all duration-200 shadow-lg hover:shadow-xl">
                🔔 Уведомления
              </button>
            </div>
          </div>
        </div>

        {/* Related Articles */}
        <div className="bg-white rounded-2xl shadow-md p-8 border border-gray-100 mb-8">
          <div className="mb-8">
            <h2 className="text-3xl font-bold text-gray-800 mb-4 relative inline-block">
              Похожие статьи
              <div className="absolute -bottom-2 left-0 w-16 h-1 bg-gradient-to-r from-blue-500 to-yellow-400 rounded-full"></div>
            </h2>
            <p className="text-gray-600 text-lg">Другие материалы, которые могут вас заинтересовать</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            {relatedArticles.map((relatedArticle) => (
              <article
                key={relatedArticle.id}
                className="group cursor-pointer bg-white rounded-2xl shadow-md hover:shadow-lg transition-all duration-300 overflow-hidden border border-gray-100 hover:border-blue-200"
                onClick={() => router.push(`/journal/article/${relatedArticle.id}`)}
              >
                <div className="relative">
                  <div className={`${relatedArticle.color} h-48 flex items-center justify-center text-6xl text-white relative overflow-hidden`}>
                    <div className="transform group-hover:scale-110 transition-transform duration-300">
                      {relatedArticle.image}
                    </div>
                    <div className="absolute top-4 left-4">
                      <span className="bg-white text-gray-800 px-3 py-1 rounded-full text-sm font-bold shadow-lg">
                        {relatedArticle.category}
                      </span>
                    </div>
                    <div className="absolute top-4 right-4 text-white/80 text-sm bg-white/20 backdrop-blur-sm px-3 py-1 rounded-full">
                      {relatedArticle.date}
                    </div>
                  </div>
                </div>

                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-800 mb-3 line-clamp-2 group-hover:text-blue-600 transition-colors">
                    {relatedArticle.title}
                  </h3>
                  <p className="text-gray-600 mb-4 text-sm leading-relaxed line-clamp-3">
                    {relatedArticle.excerpt}
                  </p>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4 text-sm text-gray-500">
                      <span className="flex items-center gap-1">
                        👁️ {formatViews(relatedArticle.views)}
                      </span>
                      <span>{relatedArticle.author}</span>
                    </div>
                    <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center group-hover:bg-blue-500 group-hover:text-white transition-all">
                      →
                    </div>
                  </div>
                </div>
              </article>
            ))}
          </div>

          {/* Back to Journal Button */}
          <div className="text-center pt-8 border-t border-gray-100">
          <BlueButton text="Вернуться к журналу" />

          </div>
        </div>
      </div>
    </div>
  );
};

export default ArticleDetailPage;