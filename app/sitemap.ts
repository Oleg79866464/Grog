import { categories } from '@/lib/catalog';
import { getToolsData } from '@/lib/data';
import { siteUrl } from '@/lib/config';

export default async function sitemap() {
  const tools = await getToolsData();
  const baseUrl = siteUrl;

  return [
    { url: `${baseUrl}/`, lastModified: new Date() },
    ...categories.map((category) => ({ url: `${baseUrl}/category/${category.slug}`, lastModified: new Date() })),
    ...tools.map((tool) => ({
      url: `${baseUrl}/tool/${tool.slug}`,
      lastModified: Number.isNaN(Date.parse(tool.updated_at)) ? new Date() : new Date(tool.updated_at),
    })),
  ];
}
