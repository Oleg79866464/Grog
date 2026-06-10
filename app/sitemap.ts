import { categories, tools } from '@/lib/catalog';

export default function sitemap() {
  const baseUrl = 'https://groggrowth.example';

  return [
    { url: `${baseUrl}/`, lastModified: new Date() },
    ...categories.map((category) => ({ url: `${baseUrl}/category/${category.slug}`, lastModified: new Date() })),
    ...tools.map((tool) => ({ url: `${baseUrl}/tool/${tool.slug}`, lastModified: new Date(tool.updated_at) })),
  ];
}
