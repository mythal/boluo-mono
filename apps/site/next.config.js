const path = require('path');
const withMDX = require('@next/mdx')();
const withTM = require('next-transpile-modules')(['ui']);

const ANALYZE = Boolean(process.env.ANALYZE);
const BACKEND_URL = process.env.BACKEND_URL || 'https://test.boluo.chat';

/** @type {import('next').NextConfig} */
const config = {
  reactStrictMode: true,
  poweredByHeader: false,
  trailingSlash: true,
  swcMinify: false,
  i18n: {
    locales: ['en', 'ja', 'zh-CN'],
    defaultLocale: 'en',
  },
  eslint: {
    dirs: ['src', 'tests'],
  },
  output: 'standalone',
  experimental: {
    outputFileTracingRoot: path.join(__dirname, '../../'),
  },
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: `${BACKEND_URL}/api/:path*`, // Proxy to Backend
      },
    ];
  },
  webpack: (config) => {
    if (ANALYZE) {
      const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');
      const plugin = new BundleAnalyzerPlugin({
        analyzerMode: 'static',
      });
      config.plugins.push(plugin);
    }

    // `react-intl` without parser
    // https://formatjs.io/docs/guides/advanced-usage#react-intl-without-parser-40-smaller
    // https://github.com/vercel/next.js/issues/30434
    config.resolve.alias['@formatjs/icu-messageformat-parser'] = '@formatjs/icu-messageformat-parser/no-parser';

    // avoid extra bundle cost, see https://github.com/reduxjs/react-redux/releases/tag/v8.0.0
    config.resolve.alias['react-redux'] = 'react-redux/es/next';
    return config;
  },
};

module.exports = withTM(withMDX(config));
