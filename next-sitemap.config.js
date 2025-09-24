/** @type {import('next-sitemap').IConfig} */
const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://tpri.example.com";

module.exports = {
  siteUrl,
  generateRobotsTxt: true,
  sitemapSize: 5000,
  exclude: ["/api/*"],
  transform: async (_, path) => {
    return {
      loc: `${siteUrl.replace(/\/$/, "")}${path}`,
      changefreq: path === "/" ? "daily" : "weekly",
      priority: path === "/" ? 1.0 : 0.7,
      lastmod: new Date().toISOString(),
    };
  },
};
