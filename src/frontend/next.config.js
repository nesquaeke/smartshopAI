/** @type {import('next').NextConfig} */
const nextConfig = {
  // Temporarily disable static export for GitHub Pages
  // output: 'export',
  trailingSlash: true,
  images: {
    unoptimized: true
  },
  // Use simple configuration
  distDir: 'out',
  // Add basePath for GitHub Pages  
  basePath: process.env.NODE_ENV === 'production' ? '/smartshopAI' : '',
  assetPrefix: process.env.NODE_ENV === 'production' ? '/smartshopAI/' : '',
}

module.exports = nextConfig 