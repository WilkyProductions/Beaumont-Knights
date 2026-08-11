import type { MetadataRoute } from "next";
import { siteConfig } from "@/data/site";
import { newsPosts } from "@/data/news";

const staticRoutes = [
  "",
  "/about",
  "/teams/9u",
  "/teams/10u",
  "/schedule",
  "/tryouts",
  "/signup",
  "/sponsors",
  "/donate",
  "/gallery",
  "/news",
  "/faq",
  "/contact",
];

export default function sitemap(): MetadataRoute.Sitemap {
  const staticEntries: MetadataRoute.Sitemap = staticRoutes.map((route) => ({
    url: `${siteConfig.url}${route}`,
    changeFrequency: route === "/schedule" || route === "/news" ? "weekly" : "monthly",
    priority: route === "" ? 1 : 0.7,
  }));

  const newsEntries: MetadataRoute.Sitemap = newsPosts.map((post) => ({
    url: `${siteConfig.url}/news/${post.slug}`,
    lastModified: post.date,
    changeFrequency: "monthly",
    priority: 0.5,
  }));

  return [...staticEntries, ...newsEntries];
}
