/** @type {import('next').NextConfig} */
const nextConfig = {
  i18n: {
    locales: ['en', 'mn'],
    defaultLocale: 'mn',
    localeDetection: false,
  },
  reactStrictMode: true,
};

module.exports = nextConfig;
