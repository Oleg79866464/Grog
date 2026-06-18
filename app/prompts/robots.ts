import type { MetadataRoute } from 'next';
import { siteUrl } from '@/lib/config';

export default function promptsRobots(): MetadataRoute.Robots {
  return {
    rules: [{ userAgent: '*', allow: '/prompts' }],
    sitemap: `${siteUrl}/prompts/sitemap.xml`,
  };
}
