import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = "https://mittal.website";
  const now = new Date();
  const sections = ["", "#services", "#projects", "#pricing", "#process", "#contact"];

  return sections.map((section) => ({
    url: `${base}/${section}`,
    lastModified: now,
    changeFrequency: "monthly",
    priority: section === "" ? 1 : 0.8,
  }));
}
