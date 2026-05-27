/** @type {import('next').NextConfig} */
const nextConfig = {
  /* your other config options here */

  experimental: {
    turbo: {
      enabled: false
    }
  }
};

module.exports = nextConfig;