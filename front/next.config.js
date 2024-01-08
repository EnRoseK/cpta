/** @type {import('next').NextConfig} */
const nextConfig = {
  i18n: {
    locales: ['en', 'mn'],
    defaultLocale: 'mn',
    localeDetection: false,
  },
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: 'http',
        hostname: process.env.ATTACHMENT_DOMAIN,
        pathname: '/uploads/**',
      },
      {
        protocol: 'https',
        hostname: process.env.ATTACHMENT_DOMAIN,
        pathname: '/uploads/**',
      },
    ],
  },
};

module.exports = nextConfig;
