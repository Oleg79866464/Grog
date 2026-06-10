import type { Category, Tool } from './types';
import rawTools from '../ai-tools-clean.json';

const categoryMap: Record<string, Category> = {
  marketing: {
    slug: 'marketing',
    title: 'Нейросети для маркетинга',
    description: 'Инструменты для growth-команд, performance-маркетинга и product-marketing.',
    keyword: 'нейросети для маркетинга',
  },
  smm: {
    slug: 'smm',
    title: 'AI для SMM',
    description: 'Генераторы постов, визуалов и контент-планов для соцсетей.',
    keyword: 'AI для SMM',
  },
  text: {
    slug: 'text',
    title: 'Генератор текста',
    description: 'AI-инструменты для копирайтинга, email-рассылок и коммерческих текстов.',
    keyword: 'генератор текста',
  },
  seo: {
    slug: 'seo',
    title: 'AI для SEO',
    description: 'Сервисы для кластеризации, оптимизации и SEO-аналитики.',
    keyword: 'AI для SEO',
  },
  content: {
    slug: 'content',
    title: 'AI для контента',
    description: 'Платформы для статей, сценариев, лендингов и контент-маркетинга.',
    keyword: 'AI для контента',
  },
  images: {
    slug: 'images',
    title: 'Генератор изображений',
    description: 'Сервисы для креативов, рекламных баннеров и product visuals.',
    keyword: 'генератор изображений',
  },
  video: {
    slug: 'video',
    title: 'AI для видео',
    description: 'Инструменты для монтажа, генерации роликов и repurposing контента.',
    keyword: 'AI для видео',
  },
  business: {
    slug: 'business',
    title: 'AI для бизнеса',
    description: 'Автоматизация, support, sales и ops для B2B-команд.',
    keyword: 'AI для бизнеса',
  },
};

export const categories = Object.values(categoryMap);

export const tools = (rawTools as Array<Record<string, string | boolean | number | string[]>>).map((tool, index) => {
  const category = (tool.category as keyof typeof categoryMap) || 'business';
  const now = new Date('2026-01-01T00:00:00.000Z').toISOString();

  return {
    id: String(tool.id ?? `tool-${index + 1}`),
    slug: String(tool.slug ?? `tool-${index + 1}`),
    name: String(tool.name ?? 'AI Tool'),
    description: String(tool.description ?? ''),
    url: String(tool.url ?? tool.affiliate_url ?? '#'),
    affiliate_url: String(tool.affiliate_url ?? tool.url ?? '#'),
    category,
    categoryLabel: categoryMap[category]?.title ?? 'AI инструменты',
    pricing: String(tool.pricing ?? 'Freemium'),
    tags: Array.isArray(tool.tags) ? tool.tags.map(String) : [],
    commission_rate: Number(tool.commission_rate ?? 0.15),
    featured: Boolean(tool.featured ?? index < 6),
    verified: Boolean(tool.verified ?? true),
    use_cases: Array.isArray(tool.use_cases) ? tool.use_cases.map(String) : [],
    benefits: Array.isArray(tool.benefits) ? tool.benefits.map(String) : [],
    country: String(tool.country ?? 'Global'),
    device_type: String(tool.device_type ?? 'Web'),
    click_count: Number(tool.click_count ?? 0),
    created_at: String(tool.created_at ?? now),
    updated_at: String(tool.updated_at ?? now),
  } as Tool;
});

export function getToolBySlug(slug: string) {
  return tools.find((tool) => tool.slug === slug);
}

export function getCategoryBySlug(slug: string) {
  return categories.find((category) => category.slug === slug);
}

export function getToolsByCategory(slug: string) {
  return tools.filter((tool) => tool.category === slug);
}

export function getFeaturedTools() {
  return tools.filter((tool) => tool.featured).slice(0, 6);
}

export function getRelatedTools(currentSlug: string, categorySlug: string) {
  return tools.filter((tool) => tool.slug !== currentSlug && tool.category === categorySlug).slice(0, 4);
}
