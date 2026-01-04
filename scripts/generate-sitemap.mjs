import fs from 'fs';
import path from 'path';
import { config } from 'dotenv';


// ✅ Загружаем переменные окружения из .env.local
config({ path: path.join(process.cwd(), '.env') });

async function generateSitemap() {
  // ✅ Теперь будет работать
  const API_URL = process.env.NEXT_PUBLIC_API_URL_SITEMAP ;
  const subPaths = ["reviews", "contacts", "questions", "promocodes"];
  
  console.log(`🔍 Using API URL: ${API_URL}`);
  
  try {
    console.log('🔄 Fetching sitemap data from API...');
    const response = await fetch(`${API_URL}api/sitemap/human`, {
      signal: AbortSignal.timeout(10000)
    });
    
    if (!response.ok) {
      throw new Error(`API returned ${response.status}`);
    }
    
    const data = await response.json();

    const sitemaps = {
      pages: [],
      mfos: [],
      news: [],
      categories: [],
      authors: [],
      satellites: [],
    };

    // 1️⃣ Статические страницы
    const staticPages = [
      { path: '/', priority: '1.0' },
      { path: '/mfos', priority: '0.8' },
      { path: '/about', priority: '0.8' },
      { path: '/privacy', priority: '0.5' },
      { path: '/terms', priority: '0.5' },
      { path: '/reviews', priority: '0.7' },
      { path: '/journal', priority: '0.8' },
      { path: '/sitemap', priority: '0.6' },
      { path: '/currency-exchange', priority: '0.7' },
    ];
    
    staticPages.forEach(page => {
      sitemaps.pages.push({
        loc: `https://finoglyad.com.ua/uk${page.path}`,
        priority: page.priority,
        changefreq: 'weekly'
      });
      sitemaps.pages.push({
        loc: `https://finoglyad.com.ua/ru${page.path}`,
        priority: page.priority,
        changefreq: 'weekly'
      });
    });

    // 2️⃣ МФО + подстраницы
    if (data.mfos?.length > 0) {
      data.mfos.forEach(mfo => {
        sitemaps.mfos.push({
          loc: `https://finoglyad.com.ua/uk/mfos/${mfo.slug}`,
          lastmod: mfo.updatedAt,
          priority: '0.9',
          changefreq: 'daily'
        });
        sitemaps.mfos.push({
          loc: `https://finoglyad.com.ua/ru/mfos/${mfo.slug}`,
          lastmod: mfo.updatedAt,
          priority: '0.9',
          changefreq: 'daily'
        });

        subPaths.forEach(sub => {
          sitemaps.mfos.push({
            loc: `https://finoglyad.com.ua/uk/mfos/${mfo.slug}/${sub}`,
            lastmod: mfo.updatedAt,
            priority: '0.7',
            changefreq: 'weekly'
          });
          sitemaps.mfos.push({
            loc: `https://finoglyad.com.ua/ru/mfos/${mfo.slug}/${sub}`,
            lastmod: mfo.updatedAt,
            priority: '0.7',
            changefreq: 'weekly'
          });
        });
      });
    }

    // 3️⃣ Новости
    if (data.news?.length > 0) {
      data.news.forEach(post => {
        sitemaps.news.push({
          loc: `https://finoglyad.com.ua/uk/journal/article/${post.slugUk}`,
          lastmod: post.updatedAt,
          priority: '0.8',
          changefreq: 'monthly'
        });
        sitemaps.news.push({
          loc: `https://finoglyad.com.ua/ru/journal/article/${post.slug}`,
          lastmod: post.updatedAt,
          priority: '0.8',
          changefreq: 'monthly'
        });
      });
    }

    // 4️⃣ Категории новостей
    if (data.newsCategories?.length > 0) {
      data.newsCategories.forEach(cat => {
        sitemaps.categories.push({
          loc: `https://finoglyad.com.ua/uk/journal/${cat.slug}`,
          priority: '0.7',
          changefreq: 'weekly'
        });
        sitemaps.categories.push({
          loc: `https://finoglyad.com.ua/ru/journal/${cat.slug}`,
          priority: '0.7',
          changefreq: 'weekly'
        });
      });
    }

    // 5️⃣ Авторы
    if (data.authors?.length > 0) {
      data.authors.forEach(author => {
        sitemaps.authors.push({
          loc: `https://finoglyad.com.ua/uk/author/${author.slug}`,
          priority: '0.6',
          changefreq: 'monthly'
        });
        sitemaps.authors.push({
          loc: `https://finoglyad.com.ua/ru/author/${author.slug}`,
          priority: '0.6',
          changefreq: 'monthly'
        });
      });
    }

    // 6️⃣ Satellite Keys
    if (data.satelliteKeys?.length > 0) {
      data.satelliteKeys.forEach(sat => {
        if (sat.slugUk) {
          sitemaps.satellites.push({
            loc: `https://finoglyad.com.ua/uk/mfo/${sat.slugUk}`,
            lastmod: sat.updatedAt,
            priority: '0.8',
            changefreq: 'weekly'
          });
        }
        if (sat.slugRu) {
          sitemaps.satellites.push({
            loc: `https://finoglyad.com.ua/ru/mfo/${sat.slugRu}`,
            lastmod: sat.updatedAt,
            priority: '0.8',
            changefreq: 'weekly'
          });
        }
      });
    }

    // 7️⃣ Satellites
    if (data.satellites?.length > 0) {
      data.satellites.forEach(sat => {
        if (sat.slugUk) {
          sitemaps.satellites.push({
            loc: `https://finoglyad.com.ua/uk/mfo/${sat.slugUk}`,
            lastmod: sat.updatedAt,
            priority: '0.7',
            changefreq: 'weekly'
          });
        }
        if (sat.slugRu) {
          sitemaps.satellites.push({
            loc: `https://finoglyad.com.ua/ru/mfo/${sat.slugRu}`,
            lastmod: sat.updatedAt,
            priority: '0.7',
            changefreq: 'weekly'
          });
        }
      });
    }

    // Генерируем XML файлы
    const publicDir = path.join(process.cwd(), 'public');
    
    Object.entries(sitemaps).forEach(([name, urls]) => {
      if (urls.length === 0) return;

      const urlsXml = urls.map(url => {
        let xml = `  <url>\n    <loc>${url.loc}</loc>`;
        if (url.lastmod) xml += `\n    <lastmod>${url.lastmod}</lastmod>`;
        if (url.priority) xml += `\n    <priority>${url.priority}</priority>`;
        if (url.changefreq) xml += `\n    <changefreq>${url.changefreq}</changefreq>`;
        xml += '\n  </url>';
        return xml;
      }).join('\n');

      const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urlsXml}
</urlset>`;
      
      fs.writeFileSync(path.join(publicDir, `sitemap-${name}.xml`), xml);
      console.log(`✅ Created sitemap-${name}.xml (${urls.length} URLs)`);
    });

    // Создаем индексный sitemap
    const sitemapFiles = Object.keys(sitemaps).filter(name => sitemaps[name].length > 0);
    const indexXml = `<?xml version="1.0" encoding="UTF-8"?>
<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${sitemapFiles.map(name => `  <sitemap>\n    <loc>https://finoglyad.com.ua/sitemap-${name}.xml</loc>\n  </sitemap>`).join('\n')}
</sitemapindex>`;

    fs.writeFileSync(path.join(publicDir, 'sitemap.xml'), indexXml);
    console.log('✅ Created sitemap.xml (index)');

    // Создаем robots.txt
    const robotsTxt = `User-agent: *
Allow: /
Disallow: /admin
Disallow: /api

Sitemap: https://finoglyad.com.ua/sitemap.xml
`;
    fs.writeFileSync(path.join(publicDir, 'robots.txt'), robotsTxt);
    console.log('✅ Created robots.txt');

    console.log('\n📊 Summary:');
    console.log('─────────────────────────────');
    Object.entries(sitemaps).forEach(([name, urls]) => {
      if (urls.length > 0) {
        console.log(`${name.padEnd(15)} ${urls.length} URLs`);
      }
    });
    console.log('─────────────────────────────');
    console.log(`TOTAL: ${Object.values(sitemaps).reduce((sum, arr) => sum + arr.length, 0)} URLs`);

  } catch (error) {
    console.error('❌ Error generating sitemap:', error.message);
    process.exit(1);
  }
}

generateSitemap();