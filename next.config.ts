/* eslint-disable @typescript-eslint/no-require-imports */

const withNextIntl = require("next-intl/plugin")("./app/i18n/request.ts");

const nextConfig = {
  experimental: {
    esmExternals: false,
  },
  images: {
    domains: [
      "via.placeholder.com",
      "mfo.qissseee.tech"
    ],
  },
  swcMinify: false,
  // Отключаем lightningcss
  compiler: {
    // Включаем поддержку tailwindcss и отключаем lightningcss
    styledComponents: false,
    // Отключить lightningcss (Next.js >=15)
    emotion: false,
    // Важно:
    // useLightningCss: false
    useLightningCss: false,
  },

};

module.exports = withNextIntl(nextConfig);
