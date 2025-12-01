/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: process.env.BASE || 'http://localhost:3000',
  generateRobotsTxt: true,
  generateIndexSitemap: true, // ✅ Добавьте это для создания sitemap index
  exclude: ['/admin/*', '/api/*', '/sitemaps/*'], // ✅ Исключите ваши ручные sitemap
  siteUrl: (() => {
    const url = process.env.BASE || 'http://localhost:3000';
    console.log('🌐 Using siteUrl:', url);
    return url;
  })(),
  // Динамические маршруты
  additionalPaths: async () => {
    const result = [];
    const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';
    
    try {
      // Fetch MFO
      const mfos = await fetch(`${API_URL}/api/mfos/sitemap`)
        .then(r => r.json())
        .catch(() => []); // ✅ Обработка ошибок
      
      for (const mfo of mfos) {
        result.push({
          loc: `/uk/mfo/${mfo.slug}`,
          lastmod: mfo.updatedAt || new Date().toISOString(),
          priority: 0.9,
          changefreq: 'weekly'
        });
        result.push({
          loc: `/ru/mfo/${mfo.slug}`,
          lastmod: mfo.updatedAt || new Date().toISOString(),
          priority: 0.9,
          changefreq: 'weekly'
        });
      }
      
      // Fetch News
      const news = await fetch(`${API_URL}/api/news/sitemap`)
        .then(r => r.json())
        .catch(() => []); // ✅ Обработка ошибок
      
      for (const post of news) {
        result.push({
          loc: `/uk/journal/${post.slug}`,
          lastmod: post.updatedAt || new Date().toISOString(),
          priority: 0.8,
          changefreq: 'weekly'
        });
        result.push({
          loc: `/ru/journal/${post.slug}`,
          lastmod: post.updatedAt || new Date().toISOString(),
          priority: 0.8,
          changefreq: 'weekly'
        });
      }
      
      console.log(`✅ Generated ${result.length} dynamic sitemap entries`);
    } catch (error) {
      console.error('❌ Error fetching dynamic routes:', error);
    }
    
    return result;
  },
  
  // ✅ Трансформация URL для правильного формата
  transform: async (config, path) => {
    return {
      loc: path,
      changefreq: config.changefreq,
      priority: config.priority,
      lastmod: config.autoLastmod ? new Date().toISOString() : undefined,
    }
  },
}