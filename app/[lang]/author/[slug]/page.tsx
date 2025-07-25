'use client';
import { BlueButton } from '@/app/ui/Buttons/BlueButton';
import { useRouter, useParams } from 'next/navigation';
import React from 'react';

const AuthorPage = () => {
  const router = useRouter();
  const params = useParams();
  const authorSlug = params.slug as string;

  // Данные авторов (в реальном приложении будут получаться из API)
  const authors = {
    'olga-pikhodskaya': {
      id: 1,
      name: 'Ольга Пиходская',
      slug: 'olga-pikhodskaya',
      avatar: 'О',
      color: 'bg-gradient-to-br from-blue-500 to-purple-600',
      position: 'Старший финансовый журналист',
      bio: 'Финансовый журналист с более чем 8-летним опытом освещения банковской сферы. Специализируется на анализе банковских продуктов, технологических инноваций в финансах и цифровых платежных решениях. Магистр экономических наук, выпускница КНУ им. Тараса Шевченко.',
      experience: '8+ лет',
      articlesCount: 127,
      totalViews: '2.8M',
      followers: 1543,
      expertise: ['Банковские продукты', 'Финтех', 'Цифровые платежи', 'Кредитование', 'Инвестиции'],
      socialMedia: {
        telegram: '@olga_banking',
        linkedin: 'olga-pikhodskaya',
        twitter: '@olga_finance',
        email: 'olga@groshizaraz.ua'
      },
      achievements: [
        'Лауреат премии "Финансовый журналист года 2024"',
        'Автор бестселлера "Банки будущего"',
        'Спикер на FinTech Conference Ukraine'
      ]
    },
    'irina-kalimulina': {
      id: 2,
      name: 'Ирина Калимулина',
      slug: 'irina-kalimulina',
      avatar: 'И',
      color: 'bg-gradient-to-br from-purple-500 to-pink-600',
      position: 'Эксперт по кредитованию',
      bio: 'Эксперт в области кредитования и управления долгами с 6-летним опытом работы в банковской сфере. Помогает людям решать сложные финансовые ситуации и находить оптимальные решения для погашения кредитов.',
      experience: '6+ лет',
      articlesCount: 89,
      totalViews: '1.5M',
      followers: 892,
      expertise: ['Кредитование', 'Управление долгами', 'Реструктуризация', 'Финансовое планирование'],
      socialMedia: {
        telegram: '@irina_credit',
        linkedin: 'irina-kalimulina',
        twitter: '@olga_finance',
        email: 'irina@groshizaraz.ua'
      },
      achievements: [
        'Сертифицированный консультант по долгам',
        'Автор курса "Выход из долговой ямы"',
        'Эксперт программы "Финансовая грамотность"'
      ]
    }
  };

  const author = authors[authorSlug as keyof typeof authors];

  if (!author) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4">
        <div className="text-center">
          <h1 className="text-xl md:text-2xl font-bold text-gray-800 mb-4">Автор не найден</h1>
          <BlueButton text="Вернуться к журналу" />
        </div>
      </div>
    );
  }

  // Статьи автора (заглушка)
  const authorArticles = [
    {
      id: 1,
      title: "Альфа-Банк представил новое приложение для айфонов",
      excerpt: "Обновленное мобильное приложение с расширенным функционалом и улучшенным интерфейсом",
      date: "11.07.2025",
      category: "Новости",
      views: 36000,
      image: "🏦",
      color: "bg-gradient-to-br from-blue-500 to-blue-600",
      readTime: "5 мин"
    },
    {
      id: 2,
      title: "Как выбрать лучшую дебетовую карту в 2025 году",
      excerpt: "Подробное сравнение популярных дебетовых карт украинских банков",
      date: "08.07.2025",
      category: "Дебетовые карты",
      views: 24000,
      image: "💳",
      color: "bg-gradient-to-br from-green-500 to-green-600",
      readTime: "7 мин"
    },
    {
      id: 3,
      title: "Тренды мобильного банкинга в Украине",
      excerpt: "Анализ новых функций и возможностей банковских приложений",
      date: "05.07.2025",
      category: "Аналитика",
      views: 18000,
      image: "📱",
      color: "bg-gradient-to-br from-purple-500 to-purple-600",
      readTime: "6 мин"
    }
  ];

  const formatNumber = (num: number) => {
    if (num >= 1000000) {
      return `${(num / 1000000).toFixed(1)}M`;
    }
    if (num >= 1000) {
      return `${(num / 1000).toFixed(1)}K`;
    }
    return num.toString();
  };

  return (
    <div className="min-h-screen">
      {/* Breadcrumbs */}
      <div className="px-4 md:px-0">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center text-xs sm:text-sm text-gray-600 py-4 overflow-x-auto">
            <button 
              onClick={() => router.push('/')}
              className="hover:text-blue-600 transition-colors whitespace-nowrap"
            >
              Главная
            </button>
            <span className="mx-1 sm:mx-2">-</span>
            <button 
              onClick={() => router.push('/journal')}
              className="hover:text-blue-600 transition-colors whitespace-nowrap"
            >
              Журнал GroshiZaraz
            </button>
            <span className="mx-1 sm:mx-2">-</span>
            <span className="whitespace-nowrap">Авторы</span>
            <span className="mx-1 sm:mx-2">-</span>
            <span className="truncate">{author.name}</span>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto">
        {/* Author Hero Section */}
        <div className="bg-white rounded-xl md:rounded-2xl shadow-md overflow-hidden border border-gray-100 mb-6 md:mb-8">
          {/* Hero Background */}
          <div className={`${author.color} h-48 sm:h-56 md:h-64 lg:h-80 relative overflow-hidden`}>
            <div className="absolute inset-0 bg-gradient-to-br from-black/20 to-black/50"></div>
            
            {/* Author Avatar and Basic Info */}
            <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-6 md:p-8">
              <div className="flex flex-col sm:flex-row sm:items-end gap-4 md:gap-6">
                <div className="w-20 h-20 sm:w-24 sm:h-24 md:w-32 md:h-32 lg:w-40 lg:h-40 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center text-white text-2xl sm:text-3xl md:text-5xl lg:text-6xl font-bold border-2 md:border-4 border-white/30 shadow-2xl mx-auto sm:mx-0">
                  {author.avatar}
                </div>
                <div className="flex-1 text-white text-center sm:text-left">
                  <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-5xl font-bold mb-1 md:mb-2 !text-white drop-shadow-lg">
                    {author.name}
                  </h1>
                  <p className="text-sm sm:text-base md:text-xl lg:text-2xl text-white/90 mb-3 md:mb-4 drop-shadow">
                    {author.position}
                  </p>
                  <div className="flex flex-wrap justify-center sm:justify-start gap-2 md:gap-4">
                    <div className="bg-white/10 backdrop-blur-sm px-2 sm:px-3 md:px-4 py-1 md:py-2 rounded-full border border-white/20">
                      <span className="text-xs sm:text-sm font-medium">📚 {author.articlesCount} статей</span>
                    </div>
                    <div className="bg-white/10 backdrop-blur-sm px-2 sm:px-3 md:px-4 py-1 md:py-2 rounded-full border border-white/20">
                      <span className="text-xs sm:text-sm font-medium">👁️ {author.totalViews} просмотров</span>
                    </div>
                    <div className="bg-white/10 backdrop-blur-sm px-2 sm:px-3 md:px-4 py-1 md:py-2 rounded-full border border-white/20">
                      <span className="text-xs sm:text-sm font-medium">👥 {formatNumber(author.followers)} подписчиков</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Author Details */}
          <div className="p-4 sm:p-6 md:p-8 lg:p-12">
            <div className="grid lg:grid-cols-3 gap-6 md:gap-8">
              {/* Bio and Description */}
              <div className="lg:col-span-2">
                <h2 className="text-xl md:text-2xl font-bold text-gray-800 mb-3 md:mb-4 relative inline-block">
                  О авторе
                  <div className="absolute -bottom-1 md:-bottom-2 left-0 w-8 md:w-12 h-0.5 md:h-1 bg-gradient-to-r from-blue-500 to-yellow-400 rounded-full"></div>
                </h2>
                <p className="text-gray-700 text-sm sm:text-base md:text-lg leading-relaxed mb-4 md:mb-6">
                  {author.bio}
                </p>

                {/* Expertise */}
                <h3 className="text-lg md:text-xl font-bold text-gray-800 mb-3 md:mb-4">Экспертиза</h3>
                <div className="flex flex-wrap gap-2 md:gap-3 mb-6 md:mb-8">
                  {author.expertise.map((skill, index) => (
                    <span
                      key={index}
                      className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-3 md:px-4 py-1.5 md:py-2 rounded-full text-xs md:text-sm font-medium shadow-lg"
                    >
                      {skill}
                    </span>
                  ))}
                </div>

                {/* Achievements */}
                <h3 className="text-lg md:text-xl font-bold text-gray-800 mb-3 md:mb-4">Достижения</h3>
                <div className="space-y-2 md:space-y-3">
                  {author.achievements.map((achievement, index) => (
                    <div key={index} className="flex items-start gap-3">
                      <div className="w-1.5 h-1.5 md:w-2 md:h-2 bg-gradient-to-r from-blue-500 to-yellow-400 rounded-full mt-2 flex-shrink-0"></div>
                      <p className="text-gray-700 text-sm md:text-base">{achievement}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Sidebar with Stats and Social */}
              <div className="space-y-4 md:space-y-6">
                {/* Stats Card */}
                <div className="bg-gray-50 rounded-xl md:rounded-2xl p-4 md:p-6 border border-gray-100">
                  <h3 className="text-base md:text-lg font-bold text-gray-800 mb-3 md:mb-4 relative inline-block">
                    Статистика
                    <div className="absolute -bottom-0.5 md:-bottom-1 left-0 w-6 md:w-8 h-0.5 bg-gradient-to-r from-blue-500 to-yellow-400 rounded-full"></div>
                  </h3>
                  <div className="space-y-3 md:space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600 text-sm md:text-base">Опыт работы:</span>
                      <span className="font-bold text-gray-800 text-sm md:text-base">{author.experience}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600 text-sm md:text-base">Статей написано:</span>
                      <span className="font-bold text-gray-800 text-sm md:text-base">{author.articlesCount}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600 text-sm md:text-base">Всего просмотров:</span>
                      <span className="font-bold text-gray-800 text-sm md:text-base">{author.totalViews}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600 text-sm md:text-base">Подписчиков:</span>
                      <span className="font-bold text-gray-800 text-sm md:text-base">{formatNumber(author.followers)}</span>
                    </div>
                  </div>
                </div>

                {/* Social Media Card */}
                <div className="bg-gray-50 rounded-xl md:rounded-2xl p-4 md:p-6 border border-gray-100">
                  <h3 className="text-base md:text-lg font-bold text-gray-800 mb-3 md:mb-4 relative inline-block">
                    Социальные сети
                    <div className="absolute -bottom-0.5 md:-bottom-1 left-0 w-6 md:w-8 h-0.5 bg-gradient-to-r from-blue-500 to-yellow-400 rounded-full"></div>
                  </h3>
                  <div className="space-y-2 md:space-y-3">
                    {author.socialMedia.telegram && (
                      <a href={`https://t.me/${author.socialMedia.telegram.replace('@', '')}`} 
                         className="flex items-center gap-3 p-2 md:p-3 bg-white rounded-lg md:rounded-xl hover:bg-blue-50 transition-colors border border-gray-100 hover:border-blue-200">
                        <div className="w-8 h-8 md:w-10 md:h-10 bg-blue-500 rounded-full flex items-center justify-center text-white text-sm md:text-base">
                          📱
                        </div>
                        <div className="min-w-0 flex-1">
                          <div className="font-medium text-gray-800 text-sm md:text-base">Telegram</div>
                          <div className="text-xs md:text-sm text-gray-600 truncate">{author.socialMedia.telegram}</div>
                        </div>
                      </a>
                    )}
                    {author.socialMedia.linkedin && (
                      <a href={`https://linkedin.com/in/${author.socialMedia.linkedin}`}
                         className="flex items-center gap-3 p-2 md:p-3 bg-white rounded-lg md:rounded-xl hover:bg-blue-50 transition-colors border border-gray-100 hover:border-blue-200">
                        <div className="w-8 h-8 md:w-10 md:h-10 bg-blue-600 rounded-full flex items-center justify-center text-white text-sm md:text-base">
                          💼
                        </div>
                        <div className="min-w-0 flex-1">
                          <div className="font-medium text-gray-800 text-sm md:text-base">LinkedIn</div>
                          <div className="text-xs md:text-sm text-gray-600 truncate">{author.socialMedia.linkedin}</div>
                        </div>
                      </a>
                    )}
                    {author?.socialMedia?.twitter && (
                      <a href={`https://twitter.com/${author.socialMedia.twitter.replace('@', '')}`}
                         className="flex items-center gap-3 p-2 md:p-3 bg-white rounded-lg md:rounded-xl hover:bg-blue-50 transition-colors border border-gray-100 hover:border-blue-200">
                        <div className="w-8 h-8 md:w-10 md:h-10 bg-blue-400 rounded-full flex items-center justify-center text-white text-sm md:text-base">
                          🐦
                        </div>
                        <div className="min-w-0 flex-1">
                          <div className="font-medium text-gray-800 text-sm md:text-base">Twitter</div>
                          <div className="text-xs md:text-sm text-gray-600 truncate">{author.socialMedia.twitter}</div>
                        </div>
                      </a>
                    )}
                    <a href={`mailto:${author.socialMedia.email}`}
                       className="flex items-center gap-3 p-2 md:p-3 bg-white rounded-lg md:rounded-xl hover:bg-blue-50 transition-colors border border-gray-100 hover:border-blue-200">
                      <div className="w-8 h-8 md:w-10 md:h-10 bg-gray-600 rounded-full flex items-center justify-center text-white text-sm md:text-base">
                        ✉️
                      </div>
                      <div className="min-w-0 flex-1">
                        <div className="font-medium text-gray-800 text-sm md:text-base">Email</div>
                        <div className="text-xs md:text-sm text-gray-600 truncate">{author.socialMedia.email}</div>
                      </div>
                    </a>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="space-y-2 md:space-y-3">
                  <button className="w-full bg-gradient-to-r from-blue-500 to-blue-600 text-white py-2.5 md:py-3 px-4 rounded-lg md:rounded-xl text-sm md:text-base font-medium hover:from-blue-600 hover:to-blue-700 transition-all duration-200 shadow-lg hover:shadow-xl">
                    📧 Подписаться на автора
                  </button>
                  <button className="w-full bg-gradient-to-r from-green-500 to-green-600 text-white py-2.5 md:py-3 px-4 rounded-lg md:rounded-xl text-sm md:text-base font-medium hover:from-green-600 hover:to-green-700 transition-all duration-200 shadow-lg hover:shadow-xl">
                    🔔 Уведомления о новых статьях
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Author's Articles */}
        <div className="bg-white rounded-xl md:rounded-2xl shadow-md p-4 sm:p-6 md:p-8 border border-gray-100">
          <div className="mb-6 md:mb-8">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-2 md:mb-4 relative inline-block">
              Статьи автора
              <div className="absolute -bottom-1 md:-bottom-2 left-0 w-12 md:w-16 h-0.5 md:h-1 bg-gradient-to-r from-blue-500 to-yellow-400 rounded-full"></div>
            </h2>
            <p className="text-gray-600 text-sm md:text-lg">Последние публикации {author.name}</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 mb-6 md:mb-8">
            {authorArticles.map((article) => (
              <article
                key={article.id}
                className="group cursor-pointer bg-white rounded-xl md:rounded-2xl shadow-md hover:shadow-lg transition-all duration-300 overflow-hidden border border-gray-100 hover:border-blue-200"
                onClick={() => router.push(`/journal/article/${article.id}`)}
              >
                <div className="relative">
                  <div className={`${article.color} h-32 sm:h-40 md:h-48 flex items-center justify-center text-4xl sm:text-5xl md:text-6xl text-white relative overflow-hidden`}>
                    <div className="transform group-hover:scale-110 transition-transform duration-300">
                      {article.image}
                    </div>
                    <div className="absolute top-2 md:top-4 left-2 md:left-4">
                      <span className="bg-white text-gray-800 px-2 md:px-3 py-0.5 md:py-1 rounded-full text-xs md:text-sm font-bold shadow-lg">
                        {article.category}
                      </span>
                    </div>
                    <div className="absolute top-2 md:top-4 right-2 md:right-4 text-white/80 text-xs md:text-sm bg-white/20 backdrop-blur-sm px-2 md:px-3 py-0.5 md:py-1 rounded-full">
                      {article.date}
                    </div>
                  </div>
                </div>

                <div className="p-4 md:p-6">
                  <h3 className="text-base md:text-xl font-bold text-gray-800 mb-2 md:mb-3 line-clamp-2 group-hover:text-blue-600 transition-colors">
                    {article.title}
                  </h3>
                  <p className="text-gray-600 mb-3 md:mb-4 text-xs md:text-sm leading-relaxed line-clamp-3">
                    {article.excerpt}
                  </p>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 md:gap-4 text-xs md:text-sm text-gray-500">
                      <span className="flex items-center gap-1">
                        👁️ {formatNumber(article.views)}
                      </span>
                      <span className="flex items-center gap-1">
                        ⏱️ {article.readTime}
                      </span>
                    </div>
                    <div className="w-6 h-6 md:w-8 md:h-8 bg-gray-100 rounded-full flex items-center justify-center group-hover:bg-blue-500 group-hover:text-white transition-all text-sm md:text-base">
                      →
                    </div>
                  </div>
                </div>
              </article>
            ))}
          </div>

          {/* Load More Articles */}
          <div className="text-center pt-6 md:pt-8 border-t border-gray-100">
            <button className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-6 md:px-8 py-2.5 md:py-3 rounded-lg md:rounded-xl text-sm md:text-base font-medium hover:from-blue-600 hover:to-purple-700 transition-all duration-200 shadow-lg hover:shadow-xl">
              Показать больше статей
            </button>
          </div>
        </div>

        {/* Back Button */}
        <div className="text-center mt-6 md:mt-8">
          <BlueButton text="Вернуться к журналу" />
        </div>
      </div>
    </div>
  );
};

export default AuthorPage;