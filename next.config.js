/** @type {import('next').NextConfig} */
const nextConfig = {
  images: { domains: ["s3-us-west-2.amazonaws.com"] },
  reactStrictMode: true,
  env: {
    USER_BRANCH: process.env.USER_BRANCH,
  },
};

module.exports = nextConfig;
