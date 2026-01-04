/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: 'https://finoglyad.com.ua',
  generateRobotsTxt: true,
  exclude: ['/admin/*', '/api/*'],
  generateIndexSitemap: true, // ✅ Создаст главный sitemap.xml как индекс
  
  additionalPaths: async () => {
    const API_URL = process.env.NEXT_PUBLIC_API_URL_SITEMAP;
    const subPaths = ["reviews", "contacts", "questions", "promocodes"];

    if (!API_URL) {
      console.log('⚠️ API недоступен');
      return [];
    }

    try {
      const response = await fetch(`${API_URL}api/sitemap/human`, { 
        signal: AbortSignal.timeout(10000) 
      });
      
      if (!response.ok) return [];
      const data = await response.json();

      const results = [];

      // 1️⃣ Статические страницы
      const staticPages = [
        { path: '/', priority: 1.0 },
        { path: '/mfos', priority: 0.8 },
        { path: '/about', priority: 0.8 },
        { path: '/privacy', priority: 0.5 },
        { path: '/terms', priority: 0.5 },
        { path: '/reviews', priority: 0.7 },
        { path: '/journal', priority: 0.8 },
        { path: '/sitemap', priority: 0.6 },
        { path: '/currency-exchange', priority: 0.7 },
      ];

      for (const page of staticPages) {
        results.push({
          loc: `/uk${page.path}`,
          priority: page.priority,
          changefreq: 'weekly',
        });
        results.push({
          loc: `/ru${page.path}`,
          priority: page.priority,
          changefreq: 'weekly',
        });
      }

      // 2️⃣ МФО + подстраницы
      if (data.mfos?.length > 0) {
        for (const mfo of data.mfos) {
          results.push({ 
            loc: `/uk/mfos/${mfo.slug}`, 
            lastmod: mfo.updatedAt, 
            priority: 0.9 
          });
          results.push({ 
            loc: `/ru/mfos/${mfo.slug}`, 
            lastmod: mfo.updatedAt, 
            priority: 0.9 
          });

          for (const sub of subPaths) {
            results.push({
              loc: `/uk/mfos/${mfo.slug}/${sub}`,
              lastmod: mfo.updatedAt,
              priority: 0.7,
            });
            results.push({
              loc: `/ru/mfos/${mfo.slug}/${sub}`,
              lastmod: mfo.updatedAt,
              priority: 0.7,
            });
          }
        }
      }

      // 3️⃣ Новости
      if (data.news?.length > 0) {
        for (const post of data.news) {
          results.push({ 
            loc: `/uk/journal/article/${post.slugUk}`, 
            lastmod: post.updatedAt, 
            priority: 0.8 
          });
          results.push({ 
            loc: `/ru/journal/article/${post.slug}`, 
            lastmod: post.updatedAt, 
            priority: 0.8 
          });
        }
      }

      // 4️⃣ Категории новостей
      if (data.newsCategories?.length > 0) {
        for (const cat of data.newsCategories) {
          results.push({
            loc: `/uk/journal/${cat.slug}`,
            priority: 0.7,
            changefreq: 'weekly',
          });
          results.push({
            loc: `/ru/journal/${cat.slug}`,
            priority: 0.7,
            changefreq: 'weekly',
          });
        }
      }

      // 5️⃣ Авторы
      if (data.authors?.length > 0) {
        for (const author of data.authors) {
          results.push({
            loc: `/uk/author/${author.slug}`,
            priority: 0.6,
            changefreq: 'monthly',
          });
          results.push({
            loc: `/ru/author/${author.slug}`,
            priority: 0.6,
            changefreq: 'monthly',
          });
        }
      }

      // 6️⃣ Satellite Keys
      if (data.satelliteKeys?.length > 0) {
        for (const sat of data.satelliteKeys) {
          if (sat.slugUk) {
            results.push({
              loc: `/uk/mfo/${sat.slugUk}`,
              lastmod: sat.updatedAt,
              priority: 0.8,
              changefreq: 'weekly',
            });
          }
          if (sat.slugRu) {
            results.push({
              loc: `/ru/mfo/${sat.slugRu}`,
              lastmod: sat.updatedAt,
              priority: 0.8,
              changefreq: 'weekly',
            });
          }
        }
      }

      // 7️⃣ Satellites
      if (data.satellites?.length > 0) {
        for (const sat of data.satellites) {
          if (sat.slugUk) {
            results.push({
              loc: `/uk/mfo/${sat.slugUk}`,
              lastmod: sat.updatedAt,
              priority: 0.7,
              changefreq: 'weekly',
            });
          }
          if (sat.slugRu) {
            results.push({
              loc: `/ru/mfo/${sat.slugRu}`,
              lastmod: sat.updatedAt,
              priority: 0.7,
              changefreq: 'weekly',
            });
          }
        }
      }

      console.log(`✨ TOTAL: ${results.length}`);
      return results;
      
    } catch (err) {
      console.error('❌ Ошибка sitemap:', err.message);
      return [];
    }
  },

  // ✅ Трансформация: разбиваем по типам контента
  transform: async (config, path) => {
    // Определяем к какому sitemap относится путь
    let sitemapFile = 'sitemap-pages.xml'; // дефолт для статических страниц

    if (path.includes('/mfos/') && !path.includes('/mfo/')) {
      sitemapFile = 'sitemap-mfos.xml';
    } else if (path.includes('/journal/article/')) {
      sitemapFile = 'sitemap-news.xml';
    } else if (path.includes('/journal/') && !path.includes('/article/')) {
      sitemapFile = 'sitemap-categories.xml';
    } else if (path.includes('/author/')) {
      sitemapFile = 'sitemap-authors.xml';
    } else if (path.includes('/mfo/')) {
      sitemapFile = 'sitemap-satellites.xml';
    }

    return {
      loc: path,
      changefreq: config.changefreq,
      priority: config.priority,
      lastmod: config.autoLastmod ? new Date().toISOString() : undefined,
      alternateRefs: config.alternateRefs ?? [],
      sitemapFile, // ✅ Указываем в какой файл попадёт этот URL
    };
  },

  robotsTxtOptions: {
    policies: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/admin', '/api'],
      },
    ],
  },
};