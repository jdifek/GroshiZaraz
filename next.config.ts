/* eslint-disable @typescript-eslint/no-require-imports */

const withNextIntl = require("next-intl/plugin")("./app/i18n/request.ts");
const isProduction = process.env.NODE_ENV === "production";

const nextConfig = {
  compiler: {
    // ✅ Оставляем console.error и console.warn для отладки
    removeConsole: isProduction 
      ? { exclude: ['error', 'warn'] } 
      : false,
  },
  
  images: {
    domains: [
      "ledhqdqnwiedolkdffie.supabase.co",
      "img.freepik.com", 
    ],
  },
  
  // ✅ ДОБАВЛЕНО: Headers для Google Analytics
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          {
            key: 'X-DNS-Prefetch-Control',
            value: 'on'
          },
          {
            key: 'X-Frame-Options',
            value: 'SAMEORIGIN'
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff'
          },
          {
            key: 'Referrer-Policy',
            value: 'origin-when-cross-origin'
          },
          // ✅ ВАЖНО: CSP для Google Analytics
          {
            key: 'Content-Security-Policy',
            value: [
              "default-src 'self'",
              "script-src 'self' 'unsafe-eval' 'unsafe-inline' https://www.googletagmanager.com https://www.google-analytics.com",
              "style-src 'self' 'unsafe-inline'",
              "img-src 'self' data: https: blob:",
              "font-src 'self' data:",
              "connect-src 'self' https://www.google-analytics.com https://analytics.google.com https://*.supabase.co wss://*.supabase.co",
              "frame-src 'self' https://www.google.com",
            ].join('; ')
          },
        ],
      },
    ];
  },

  async redirects() {
    return [
      {
        source: '/:path*',
        has: [
          {
            type: 'header',
            key: 'x-forwarded-proto',
            value: 'http',
          },
        ],
        destination: 'https://finoglyad.com.ua/:path*',
        permanent: true,
      },
      {
        source: '/:path((?!uk|ru|api|_next|.*\\..*).*)',
        destination: '/uk/:path*',
        permanent: true,
      },
    ];
  },
};

module.exports = withNextIntl(nextConfig);