import type { MetadataRoute } from 'next';
import { getAllPosts, getAllProjects } from '@/lib/content';

export default function sitemap(): MetadataRoute.Sitemap {
  const base = 'https://example.com';

  const staticRoutes = ['', '/about', '/projects', '/blog', '/resume', '/contact', '/privacy'].map((route) => ({
    url: `${base}${route}`,
    lastModified: new Date()
  }));

  const projectRoutes = getAllProjects().map((project) => ({
    url: `${base}/projects/${project.slug}`,
    lastModified: new Date()
  }));

  const blogRoutes = getAllPosts().map((post) => ({
    url: `${base}/blog/${post.slug}`,
    lastModified: new Date(post.date)
  }));

  return [...staticRoutes, ...projectRoutes, ...blogRoutes];
}
