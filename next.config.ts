/* eslint-disable @typescript-eslint/no-require-imports */

const withNextIntl = require("next-intl/plugin")("./app/i18n/request.ts");
const isProduction = process.env.NODE_ENV === "production";

const nextConfig = {
  compiler: {
    removeConsole: isProduction, 
  },
  images: {
    domains: [
      "ledhqdqnwiedolkdffie.supabase.co",
      "img.freepik.com", 
    ],
  },

};

module.exports = withNextIntl(nextConfig);
