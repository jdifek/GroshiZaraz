/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: 'https://finoglyad.com.ua',
  generateRobotsTxt: true,
  exclude: ['/admin/*', '/api/*'],
  
  // Статические пути обеих языковых версий
  additionalPaths: async () => {
    const result = [];
    
    // 🔥 Статические страницы для UK и RU
    const staticPages = [
      { path: '/', priority: 1.0 },
      { path: '/about', priority: 0.8 },
      { path: '/privacy', priority: 0.5 },
      { path: '/terms', priority: 0.5 },
      { path: '/reviews', priority: 0.7 },
      { path: '/journal', priority: 0.8 },
      { path: '/mfos', priority: 0.9 }, // если есть листинг
    ];

    for (const page of staticPages) {
      result.push({
        loc: `/uk${page.path}`,
        priority: page.priority,
        changefreq: 'weekly',
      });
      result.push({
        loc: `/ru${page.path}`,
        priority: page.priority,
        changefreq: 'weekly',
      });
    }

    const API_URL = process.env.NEXT_PUBLIC_API_URL_SITEMAP;
    const subPaths = ["reviews", "contacts", "questions", "promocodes"];

    if (!API_URL) {
      console.log('⚠️ API недоступен – динамические пути пропускаем');
      return result;
    }

    try {
      // 1) MFO
      const mfosResponse = await fetch(`${API_URL}api/mfos/sitemap`, { 
        signal: AbortSignal.timeout(5000) 
      });
      
      if (mfosResponse.ok) {
        const mfos = await mfosResponse.json();
        for (const mfo of mfos) {
          // Главные страницы МФО
          result.push({ 
            loc: `/uk/mfo/${mfo.slug}`, 
            lastmod: mfo.updatedAt, 
            priority: 0.9 
          });
          result.push({ 
            loc: `/ru/mfo/${mfo.slug}`, 
            lastmod: mfo.updatedAt, 
            priority: 0.9 
          });

          // Вложенные страницы
          for (const sub of subPaths) {
            result.push({
              loc: `/uk/mfos/${mfo.slug}/${sub}`,
              lastmod: mfo.updatedAt,
              priority: 0.7,
            });
            result.push({
              loc: `/ru/mfos/${mfo.slug}/${sub}`,
              lastmod: mfo.updatedAt,
              priority: 0.7,
            });
          }
        }
        console.log(`✅ MFO pages: ${mfos.length * 2 * (1 + subPaths.length)}`);
      }

      // 2) NEWS/Journal
      const newsResponse = await fetch(`${API_URL}api/news/sitemap`, { 
        signal: AbortSignal.timeout(5000) 
      });
      
      if (newsResponse.ok) {
        const news = await newsResponse.json();
        for (const post of news) {
          result.push({ 
            loc: `/uk/journal/${post.slug}`, 
            lastmod: post.updatedAt, 
            priority: 0.8 
          });
          result.push({ 
            loc: `/ru/journal/${post.slug}`, 
            lastmod: post.updatedAt, 
            priority: 0.8 
          });
        }
        console.log(`✅ News articles: ${news.length * 2}`);
      }

      // 3) MFO Satellite Keys
      const satellitesKeysResponse = await fetch(
        `${API_URL}api/mfo-satellite-keys/sitemap`,
        { signal: AbortSignal.timeout(5000) }
      );
      
      if (satellitesKeysResponse.ok) {
        const satellitesKeys = await satellitesKeysResponse.json();
        
        for (const sat of satellitesKeys) {
          if (sat.slugUk) {
            result.push({
              loc: `/uk/mfo/${sat.slugUk}`,
              lastmod: sat.updatedAt,
              priority: 0.7,
              changefreq: 'weekly',
            });
          }
          if (sat.slugRu) {
            result.push({
              loc: `/ru/mfo/${sat.slugRu}`,
              lastmod: sat.updatedAt,
              priority: 0.7,
              changefreq: 'weekly',
            });
          }
        }
        console.log(`✅ Satellite keys: ${satellitesKeys.length * 2}`);
      }

      // 4) MFO Satellites
      const satellitesResponse = await fetch(
        `${API_URL}api/mfo-satellites/sitemap`,
        { signal: AbortSignal.timeout(5000) }
      );
      
      if (satellitesResponse.ok) {
        const satellites = await satellitesResponse.json();
        
        for (const sat of satellites) {
          if (sat.slugUk) {
            result.push({
              loc: `/uk/mfo/${sat.slugUk}`,
              lastmod: sat.updatedAt,
              priority: 0.7,
              changefreq: 'weekly',
            });
          }
          if (sat.slugRu) {
            result.push({
              loc: `/ru/mfo/${sat.slugRu}`,
              lastmod: sat.updatedAt,
              priority: 0.7,
              changefreq: 'weekly',
            });
          }
        }
        console.log(`✅ MFO satellites: ${satellites.length * 2}`);
      }

      console.log(`✨ TOTAL paths in sitemap: ${result.length}`);
      
    } catch (err) {
      console.error('❌ Ошибка загрузки dynamic sitemap:', err.message);
    }

    return result;
  },

  // Настройки robots.txt
  robotsTxtOptions: {
    policies: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/admin', '/api'],
      },
    ],
    additionalSitemaps: [
      // Если будут дополнительные sitemap
    ],
  },
};