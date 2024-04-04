/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "www.themoviedb.org",
      },
      {
        protocol: "https",
        hostname: "placehold.co",
      },
      {
        protocol: "https",
        hostname: "image.tmdb.org",
      },
      {
        protocol: "https",
        hostname: "cdn.myanimelist.net",
      },
      {
        protocol: "https",
        hostname: "via.placeholder.com",
      }
    ],
  },
  reactStrictMode: false,
  // i18n: {
  //   locales: ["en-US", "fr"],
  //   defaultLocale: "en-US",
  // },
};

export default nextConfig;