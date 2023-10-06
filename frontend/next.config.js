/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    BASE_URL: process.env.NEXT_PUBLIC_API_URL,
  },
  images: {
    domains: ["www.google.com"],
  },
  compiler: {
    styledComponents: true,
  },
};

module.exports = nextConfig;