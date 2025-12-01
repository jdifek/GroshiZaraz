/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: process.env.BASE || 'http://localhost:3000',
  generateRobotsTxt: true,
  exclude: ['/admin/*', '/api/*'],
  
  additionalPaths: async () => {
    const result = [];
    const API_URL = process.env.NEXT_PUBLIC_API_URL;
    
    // ✅ Проверка доступности API
    if (!API_URL || API_URL.includes('localhost')) {
      console.log(API_URL, 'API_URL');
      
      console.log('⚠️ Skipping dynamic routes: API not available');
      return result;
    }
    
    try {
      // Fetch MFO
      const mfosResponse = await fetch(`${API_URL}/api/mfos/sitemap`, {
        signal: AbortSignal.timeout(5000) // ✅ Таймаут 5 секунд
      });
      
      if (!mfosResponse.ok) {
        throw new Error(`MFO API returned ${mfosResponse.status}`);
      }
      
      const mfos = await mfosResponse.json();
      console.log(`✅ Fetched ${mfos.length} MFOs`);
      
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
      const newsResponse = await fetch(`${API_URL}/api/news/sitemap`, {
        signal: AbortSignal.timeout(5000)
      });
      
      if (!newsResponse.ok) {
        throw new Error(`News API returned ${newsResponse.status}`);
      }
      
      const news = await newsResponse.json();
      console.log(`✅ Fetched ${news.length} news items`);
      
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
      
      console.log(`✅ Total generated: ${result.length} dynamic entries`);
    } catch (error) {
      console.error('❌ Error fetching dynamic routes:', error.message);
      console.log('⚠️ Sitemap will be generated without dynamic routes');
    }
    
    return result;
  }
}