/** @type {import('next').NextConfig} */
const nextConfig = {};

module.exports = {
  reactStrictMode: true,
  // experimental: {
  //   appDir: true,
  //   serverActions: true,
  // },
  webpack: (config) => {
    config.module.rules.push({
      test: /\.svg$/,
      use: ['@svgr/webpack'],
    })
    return config
  },
};
