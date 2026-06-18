import { promptCategories } from '@/lib/prompts-catalog';
import { getPromptsData } from '@/lib/prompts';
import { siteUrl } from '@/lib/config';

export default async function promptsSitemap() {
  const prompts = await getPromptsData();
  const baseUrl = siteUrl;

  return [
    { url: `${baseUrl}/prompts`, lastModified: new Date() },
    ...promptCategories.map((category) => ({ url: `${baseUrl}/prompts/category/${category.slug}`, lastModified: new Date() })),
    ...prompts.map((prompt) => ({
      url: `${baseUrl}/prompts/${prompt.slug}`,
      lastModified: Number.isNaN(Date.parse(prompt.updated_at)) ? new Date() : new Date(prompt.updated_at),
    })),
  ];
}
