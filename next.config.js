/** @type {import('next').NextConfig} */
const nextConfig = {
  optimizeFonts: false,
  reactStrictMode: true,
  transpilePackages: ['dexie', 'lodash-es', 'rxdb', 'lodash.clonedeep']
}

module.exports = nextConfig
