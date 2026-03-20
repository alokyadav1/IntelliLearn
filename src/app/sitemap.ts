import type { MetadataRoute } from 'next';
import { courses } from "@/config/platform.config";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://intelli-learn-jet.vercel.app';
  
  // Root and Category pages
  const staticPages = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 1,
    },
  ];

  // Dynamic Course Pages
  const coursePages = courses.filter(c => c.published).map((course) => ({
    url: `${baseUrl}/courses/${course.slug}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.8,
  }));

  // Course Module Detail Pages (Prerequisites, Building, etc.)
  const subPages = courses.flatMap(course => 
    course.navLinks.slice(1).map(link => ({
      url: `${baseUrl}${link.href}`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.6,
    }))
  );

  return [...staticPages, ...coursePages, ...subPages];
}
