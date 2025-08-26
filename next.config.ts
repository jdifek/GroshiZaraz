/* eslint-disable @typescript-eslint/no-require-imports */

const withNextIntl = require("next-intl/plugin")("./app/i18n/request.ts");

const nextConfig = {
 
  images: {
    domains: [
      "via.placeholder.com",
      "mfo.qissseee.tech"
    ],
  },
  typescript: {
    ignoreBuildErrors: true,
  },
};

module.exports = withNextIntl(nextConfig);
