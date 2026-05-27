/** @type {import('next').NextConfig} */
const nextConfig = {
  /* your other config options here */

  experimental: {
    // Only applies the turbo disable flag if we are running locally 'development'
    turbo: process.env.NODE_ENV === 'development' ? { enabled: false } : undefined
  }
};

module.exports = nextConfig;