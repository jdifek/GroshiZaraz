/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: process.env.BASE || 'http://localhost:3000',
  generateRobotsTxt: true,
  exclude: ['/admin/*', '/api/*'],

  additionalPaths: async () => {
    const result = [];
    const API_URL = process.env.NEXT_PUBLIC_API_URL;
    const subPaths = [
      "reviews",
      "contacts",
      "questions",
      "promocodes",
    ];

    if (!API_URL || API_URL.includes('localhost')) {
      console.log('⚠️ API недоступен – динамические пути пропускаем');
      return result;
    }

    try {
      //
      // 1) MFO
      //
      const mfosResponse = await fetch(`${API_URL}api/mfos/sitemap`, { signal: AbortSignal.timeout(5000) });
      if (mfosResponse.ok) {
        const mfos = await mfosResponse.json();
        for (const mfo of mfos) {
          result.push({ loc: `/uk/mfo/${mfo.slug}`, lastmod: mfo.updatedAt, priority: 0.9 });
          result.push({ loc: `/ru/mfo/${mfo.slug}`, lastmod: mfo.updatedAt, priority: 0.9 });

          // 🔥 вложенные пути
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

      }


      //
      // 2) NEWS
      //
      const newsResponse = await fetch(`${API_URL}api/news/sitemap`, { signal: AbortSignal.timeout(5000) });
      if (newsResponse.ok) {
        const news = await newsResponse.json();
        for (const post of news) {
          result.push({ loc: `/uk/journal/${post.slug}`, lastmod: post.updatedAt, priority: 0.8 });
          result.push({ loc: `/ru/journal/${post.slug}`, lastmod: post.updatedAt, priority: 0.8 });
        }
      }

      //
      // 3) mfo-satellite-keys
      //
      const satellitesKeysResponse = await fetch(`${API_URL}api/mfo-satellite-keys/sitemap`, {
        signal: AbortSignal.timeout(5000),
      });
      if (satellitesKeysResponse.ok) {
        const satellitesKeys = await satellitesKeysResponse.json();
        console.log(`📡 Satellite keys pages: ${satellitesKeys.length}`);

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
      }

      //
      // 4) mfo-satellites
      //
      const satellitesResponse = await fetch(`${API_URL}api/mfo-satellites/sitemap`, {
        signal: AbortSignal.timeout(5000),
      });
      if (satellitesResponse.ok) {
        const satellites = await satellitesResponse.json();
        console.log(`📡 MFO satellites pages: ${satellites.length}`);

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
      }

      console.log(`✨ Всего динамических путей: ${result.length}`);
    } catch (err) {
      console.error('❌ Ошибка загрузки dynamic sitemap:', err.message);
    }

    return result;
  },
};
