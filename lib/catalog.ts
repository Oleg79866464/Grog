import type { Category, Tool } from './types';

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

export function getToolBySlug(slug: string, tools: Tool[]) {
  return tools.find((tool) => tool.slug === slug);
}

export function getCategoryBySlug(slug: string) {
  return categories.find((category) => category.slug === slug);
}

export function getToolsByCategory(slug: string, tools: Tool[]) {
  return tools.filter((tool) => tool.category === slug);
}

export function getFeaturedTools(tools: Tool[]) {
  return tools.filter((tool) => tool.featured).slice(0, 6);
}

export function getRelatedTools(currentSlug: string, categorySlug: string, tools: Tool[]) {
  return tools.filter((tool) => tool.slug !== currentSlug && tool.category === categorySlug).slice(0, 4);
}
