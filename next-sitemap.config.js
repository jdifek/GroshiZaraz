/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: 'https://finoglyad.com.ua',
  generateRobotsTxt: true,
  exclude: ['/admin/*', '/api/*'],
  generateIndexSitemap: true,
  
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

      // 1️⃣ Статические страницы → sitemap-pages.xml
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
          __sitemapFile: 'sitemap-pages', // ✅ Указываем файл
        });
        results.push({
          loc: `/ru${page.path}`,
          priority: page.priority,
          changefreq: 'weekly',
          __sitemapFile: 'sitemap-pages',
        });
      }

      // 2️⃣ МФО → sitemap-mfos.xml
      if (data.mfos?.length > 0) {
        for (const mfo of data.mfos) {
          results.push({ 
            loc: `/uk/mfos/${mfo.slug}`, 
            lastmod: mfo.updatedAt, 
            priority: 0.9,
            __sitemapFile: 'sitemap-mfos',
          });
          results.push({ 
            loc: `/ru/mfos/${mfo.slug}`, 
            lastmod: mfo.updatedAt, 
            priority: 0.9,
            __sitemapFile: 'sitemap-mfos',
          });

          // Подстраницы МФО
          for (const sub of subPaths) {
            results.push({
              loc: `/uk/mfos/${mfo.slug}/${sub}`,
              lastmod: mfo.updatedAt,
              priority: 0.7,
              __sitemapFile: 'sitemap-mfos',
            });
            results.push({
              loc: `/ru/mfos/${mfo.slug}/${sub}`,
              lastmod: mfo.updatedAt,
              priority: 0.7,
              __sitemapFile: 'sitemap-mfos',
            });
          }
        }
      }

      // 3️⃣ Новости → sitemap-news.xml
      if (data.news?.length > 0) {
        for (const post of data.news) {
          results.push({ 
            loc: `/uk/journal/article/${post.slugUk}`, 
            lastmod: post.updatedAt, 
            priority: 0.8,
            __sitemapFile: 'sitemap-news',
          });
          results.push({ 
            loc: `/ru/journal/article/${post.slug}`, 
            lastmod: post.updatedAt, 
            priority: 0.8,
            __sitemapFile: 'sitemap-news',
          });
        }
      }

      // 4️⃣ Категории → sitemap-categories.xml
      if (data.newsCategories?.length > 0) {
        for (const cat of data.newsCategories) {
          results.push({
            loc: `/uk/journal/${cat.slug}`,
            priority: 0.7,
            changefreq: 'weekly',
            __sitemapFile: 'sitemap-categories',
          });
          results.push({
            loc: `/ru/journal/${cat.slug}`,
            priority: 0.7,
            changefreq: 'weekly',
            __sitemapFile: 'sitemap-categories',
          });
        }
      }

      // 5️⃣ Авторы → sitemap-authors.xml
      if (data.authors?.length > 0) {
        for (const author of data.authors) {
          results.push({
            loc: `/uk/author/${author.slug}`,
            priority: 0.6,
            changefreq: 'monthly',
            __sitemapFile: 'sitemap-authors',
          });
          results.push({
            loc: `/ru/author/${author.slug}`,
            priority: 0.6,
            changefreq: 'monthly',
            __sitemapFile: 'sitemap-authors',
          });
        }
      }

      // 6️⃣ Satellite Keys → sitemap-satellites.xml
      if (data.satelliteKeys?.length > 0) {
        for (const sat of data.satelliteKeys) {
          if (sat.slugUk) {
            results.push({
              loc: `/uk/mfo/${sat.slugUk}`,
              lastmod: sat.updatedAt,
              priority: 0.8,
              changefreq: 'weekly',
              __sitemapFile: 'sitemap-satellites',
            });
          }
          if (sat.slugRu) {
            results.push({
              loc: `/ru/mfo/${sat.slugRu}`,
              lastmod: sat.updatedAt,
              priority: 0.8,
              changefreq: 'weekly',
              __sitemapFile: 'sitemap-satellites',
            });
          }
        }
      }

      // 7️⃣ Satellites → sitemap-satellites.xml
      if (data.satellites?.length > 0) {
        for (const sat of data.satellites) {
          if (sat.slugUk) {
            results.push({
              loc: `/uk/mfo/${sat.slugUk}`,
              lastmod: sat.updatedAt,
              priority: 0.7,
              changefreq: 'weekly',
              __sitemapFile: 'sitemap-satellites',
            });
          }
          if (sat.slugRu) {
            results.push({
              loc: `/ru/mfo/${sat.slugRu}`,
              lastmod: sat.updatedAt,
              priority: 0.7,
              changefreq: 'weekly',
              __sitemapFile: 'sitemap-satellites',
            });
          }
        }
      }

      console.log(`✨ TOTAL: ${results.length} URLs`);
      return results;
      
    } catch (err) {
      console.error('❌ Ошибка sitemap:', err.message);
      return [];
    }
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