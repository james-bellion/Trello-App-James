const { linkSync } = require("fs");

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ["cloud.appwrite.io", "links.papareact.com"],
  },
};

module.exports = nextConfig;
