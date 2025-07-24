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
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-800 mb-4">Автор не найден</h1>
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
      <div className="">
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
            <span>Авторы</span>
            <span className="mx-2">-</span>
            <span >{author.name}</span>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Author Hero Section */}
        <div className="bg-white rounded-2xl shadow-md overflow-hidden border border-gray-100 mb-8">
          {/* Hero Background */}
          <div className={`${author.color} h-64 md:h-80 relative overflow-hidden`}>
            <div className="absolute inset-0 bg-gradient-to-br from-black/20 to-black/50"></div>
            
            {/* Author Avatar and Basic Info */}
            <div className="absolute bottom-0 left-0 right-0 p-8">
              <div className="flex flex-col md:flex-row md:items-end gap-6">
                <div className="w-32 h-32 md:w-40 md:h-40 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center text-white text-5xl md:text-6xl font-bold border-4 border-white/30 shadow-2xl">
                  {author.avatar}
                </div>
                <div className="flex-1 text-white">
                  <h1 className="text-3xl md:text-5xl font-bold mb-2 !text-white drop-shadow-lg">
                    {author.name}
                  </h1>
                  <p className="text-xl md:text-2xl text-white/90 mb-4 drop-shadow">
                    {author.position}
                  </p>
                  <div className="flex flex-wrap gap-4">
                    <div className="bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full border border-white/20">
                      <span className="text-sm font-medium">📚 {author.articlesCount} статей</span>
                    </div>
                    <div className="bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full border border-white/20">
                      <span className="text-sm font-medium">👁️ {author.totalViews} просмотров</span>
                    </div>
                    <div className="bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full border border-white/20">
                      <span className="text-sm font-medium">👥 {formatNumber(author.followers)} подписчиков</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Author Details */}
          <div className="p-8 md:p-12">
            <div className="grid lg:grid-cols-3 gap-8">
              {/* Bio and Description */}
              <div className="lg:col-span-2">
                <h2 className="text-2xl font-bold text-gray-800 mb-4 relative inline-block">
                  О авторе
                  <div className="absolute -bottom-2 left-0 w-12 h-1 bg-gradient-to-r from-blue-500 to-yellow-400 rounded-full"></div>
                </h2>
                <p className="text-gray-700 text-lg leading-relaxed mb-6">
                  {author.bio}
                </p>

                {/* Expertise */}
                <h3 className="text-xl font-bold text-gray-800 mb-4">Экспертиза</h3>
                <div className="flex flex-wrap gap-3 mb-8">
                  {author.expertise.map((skill, index) => (
                    <span
                      key={index}
                      className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-4 py-2 rounded-full text-sm font-medium shadow-lg"
                    >
                      {skill}
                    </span>
                  ))}
                </div>

                {/* Achievements */}
                <h3 className="text-xl font-bold text-gray-800 mb-4">Достижения</h3>
                <div className="space-y-3">
                  {author.achievements.map((achievement, index) => (
                    <div key={index} className="flex items-start gap-3">
                      <div className="w-2 h-2 bg-gradient-to-r from-blue-500 to-yellow-400 rounded-full mt-2"></div>
                      <p className="text-gray-700">{achievement}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Sidebar with Stats and Social */}
              <div className="space-y-6">
                {/* Stats Card */}
                <div className="bg-gray-50 rounded-2xl p-6 border border-gray-100">
                  <h3 className="text-lg font-bold text-gray-800 mb-4 relative inline-block">
                    Статистика
                    <div className="absolute -bottom-1 left-0 w-8 h-0.5 bg-gradient-to-r from-blue-500 to-yellow-400 rounded-full"></div>
                  </h3>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">Опыт работы:</span>
                      <span className="font-bold text-gray-800">{author.experience}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">Статей написано:</span>
                      <span className="font-bold text-gray-800">{author.articlesCount}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">Всего просмотров:</span>
                      <span className="font-bold text-gray-800">{author.totalViews}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">Подписчиков:</span>
                      <span className="font-bold text-gray-800">{formatNumber(author.followers)}</span>
                    </div>
                  </div>
                </div>

                {/* Social Media Card */}
                <div className="bg-gray-50 rounded-2xl p-6 border border-gray-100">
                  <h3 className="text-lg font-bold text-gray-800 mb-4 relative inline-block">
                    Социальные сети
                    <div className="absolute -bottom-1 left-0 w-8 h-0.5 bg-gradient-to-r from-blue-500 to-yellow-400 rounded-full"></div>
                  </h3>
                  <div className="space-y-3">
                    {author.socialMedia.telegram && (
                      <a href={`https://t.me/${author.socialMedia.telegram.replace('@', '')}`} 
                         className="flex items-center gap-3 p-3 bg-white rounded-xl hover:bg-blue-50 transition-colors border border-gray-100 hover:border-blue-200">
                        <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center text-white">
                          📱
                        </div>
                        <div>
                          <div className="font-medium text-gray-800">Telegram</div>
                          <div className="text-sm text-gray-600">{author.socialMedia.telegram}</div>
                        </div>
                      </a>
                    )}
                    {author.socialMedia.linkedin && (
                      <a href={`https://linkedin.com/in/${author.socialMedia.linkedin}`}
                         className="flex items-center gap-3 p-3 bg-white rounded-xl hover:bg-blue-50 transition-colors border border-gray-100 hover:border-blue-200">
                        <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center text-white">
                          💼
                        </div>
                        <div>
                          <div className="font-medium text-gray-800">LinkedIn</div>
                          <div className="text-sm text-gray-600">{author.socialMedia.linkedin}</div>
                        </div>
                      </a>
                    )}
                    {author?.socialMedia?.twitter && (
                      <a href={`https://twitter.com/${author.socialMedia.twitter.replace('@', '')}`}
                         className="flex items-center gap-3 p-3 bg-white rounded-xl hover:bg-blue-50 transition-colors border border-gray-100 hover:border-blue-200">
                        <div className="w-10 h-10 bg-blue-400 rounded-full flex items-center justify-center text-white">
                          🐦
                        </div>
                        <div>
                          <div className="font-medium text-gray-800">Twitter</div>
                          <div className="text-sm text-gray-600">{author.socialMedia.twitter}</div>
                        </div>
                      </a>
                    )}
                    <a href={`mailto:${author.socialMedia.email}`}
                       className="flex items-center gap-3 p-3 bg-white rounded-xl hover:bg-blue-50 transition-colors border border-gray-100 hover:border-blue-200">
                      <div className="w-10 h-10 bg-gray-600 rounded-full flex items-center justify-center text-white">
                        ✉️
                      </div>
                      <div>
                        <div className="font-medium text-gray-800">Email</div>
                        <div className="text-sm text-gray-600">{author.socialMedia.email}</div>
                      </div>
                    </a>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="space-y-3">
                  <button className="w-full bg-gradient-to-r from-blue-500 to-blue-600 text-white py-3 px-4 rounded-xl font-medium hover:from-blue-600 hover:to-blue-700 transition-all duration-200 shadow-lg hover:shadow-xl">
                    📧 Подписаться на автора
                  </button>
                  <button className="w-full bg-gradient-to-r from-green-500 to-green-600 text-white py-3 px-4 rounded-xl font-medium hover:from-green-600 hover:to-green-700 transition-all duration-200 shadow-lg hover:shadow-xl">
                    🔔 Уведомления о новых статьях
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Author's Articles */}
        <div className="bg-white rounded-2xl shadow-md p-8 border border-gray-100">
          <div className="mb-8">
            <h2 className="text-3xl font-bold text-gray-800 mb-4 relative inline-block">
              Статьи автора
              <div className="absolute -bottom-2 left-0 w-16 h-1 bg-gradient-to-r from-blue-500 to-yellow-400 rounded-full"></div>
            </h2>
            <p className="text-gray-600 text-lg">Последние публикации {author.name}</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            {authorArticles.map((article) => (
              <article
                key={article.id}
                className="group cursor-pointer bg-white rounded-2xl shadow-md hover:shadow-lg transition-all duration-300 overflow-hidden border border-gray-100 hover:border-blue-200"
                onClick={() => router.push(`/journal/article/${article.id}`)}
              >
                <div className="relative">
                  <div className={`${article.color} h-48 flex items-center justify-center text-6xl text-white relative overflow-hidden`}>
                    <div className="transform group-hover:scale-110 transition-transform duration-300">
                      {article.image}
                    </div>
                    <div className="absolute top-4 left-4">
                      <span className="bg-white text-gray-800 px-3 py-1 rounded-full text-sm font-bold shadow-lg">
                        {article.category}
                      </span>
                    </div>
                    <div className="absolute top-4 right-4 text-white/80 text-sm bg-white/20 backdrop-blur-sm px-3 py-1 rounded-full">
                      {article.date}
                    </div>
                  </div>
                </div>

                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-800 mb-3 line-clamp-2 group-hover:text-blue-600 transition-colors">
                    {article.title}
                  </h3>
                  <p className="text-gray-600 mb-4 text-sm leading-relaxed line-clamp-3">
                    {article.excerpt}
                  </p>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4 text-sm text-gray-500">
                      <span className="flex items-center gap-1">
                        👁️ {formatNumber(article.views)}
                      </span>
                      <span className="flex items-center gap-1">
                        ⏱️ {article.readTime}
                      </span>
                    </div>
                    <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center group-hover:bg-blue-500 group-hover:text-white transition-all">
                      →
                    </div>
                  </div>
                </div>
              </article>
            ))}
          </div>

          {/* Load More Articles */}
          <div className="text-center pt-8 border-t border-gray-100">
            <button className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-8 py-3 rounded-xl font-medium hover:from-blue-600 hover:to-purple-700 transition-all duration-200 shadow-lg hover:shadow-xl">
              Показать больше статей
            </button>
          </div>
        </div>

        {/* Back Button */}
        <div className="text-center mt-8">
          <BlueButton text="Вернуться к журналу" />
        </div>
      </div>
    </div>
  );
};

export default AuthorPage;