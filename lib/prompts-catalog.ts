import type { PromptCategorySlug } from './types';

export type PromptCategory = {
  slug: PromptCategorySlug;
  title: string;
  description: string;
  keyword: string;
  seoTitle: string;
  seoDescription: string;
};

const categoryMap: Record<PromptCategorySlug, PromptCategory> = {
  marketing: {
    slug: 'marketing',
    title: 'Промпты для маркетинга',
    description: 'Промпты для growth-команд, performance-маркетинга, лидогенерации и воронок.',
    keyword: 'промпты для маркетинга',
    seoTitle: 'Промпты для маркетинга — готовые AI-инструкции для growth и performance',
    seoDescription:
      'Каталог премиальных промптов для маркетологов: лидогенерация, email, офферы, лендинги, performance и аналитика.',
  },
  seo: {
    slug: 'seo',
    title: 'Промпты для SEO',
    description: 'Промпты для кластеризации, текстов, мета-данных, контент-планов и SERP-аналитики.',
    keyword: 'промпты для SEO',
    seoTitle: 'Промпты для SEO — AI промпты для трафика, кластеров и контента',
    seoDescription:
      'SEO-промпты для аналитики запросов, контент-планов, мета-тегов, коммерческих страниц и структурирования сайта.',
  },
  copywriting: {
    slug: 'copywriting',
    title: 'Промпты для копирайтинга',
    description: 'Коммерческие тексты, офферы, статьи, лендинги, описания товаров и писем.',
    keyword: 'промпты для копирайтинга',
    seoTitle: 'Промпты для копирайтинга — AI промпты для текстов, лендингов и email',
    seoDescription:
      'Профессиональные промпты для копирайтеров: продающие тексты, посты, лендинги, сценарии и email-цепочки.',
  },
  smm: {
    slug: 'smm',
    title: 'Промпты для SMM',
    description: 'Посты, контент-планы, прогревы, сторис, UGC и сценарии для соцсетей.',
    keyword: 'промпты для SMM',
    seoTitle: 'Промпты для SMM — AI промпты для постов, прогревов и соцсетей',
    seoDescription:
      'Каталог промптов для SMM-специалистов: контент-план, hooks, stories, reels, engagement и воронки.',
  },
  business: {
    slug: 'business',
    title: 'Промпты для бизнеса',
    description: 'Операции, поддержка, sales, аналитика, документация и внутренние процессы.',
    keyword: 'промпты для бизнеса',
    seoTitle: 'Промпты для бизнеса — AI промпты для ops, sales и support',
    seoDescription:
      'Готовые промпты для B2B-команд: поддержка, продажи, аналитика, процессы, SOP и управление.',
  },
  product: {
    slug: 'product',
    title: 'Промпты для product',
    description: 'PRD, JTBD, research, discovery, roadmap и гипотезы роста.',
    keyword: 'промпты для product',
    seoTitle: 'Промпты для product — AI промпты для product management и discovery',
    seoDescription:
      'Промпты для product-менеджеров: исследование пользователей, roadmap, PRD, hypothesis generation и prioritization.',
  },
  growth: {
    slug: 'growth',
    title: 'Промпты для growth',
    description: 'Эксперименты, воронки, retention, activation и монетизация.',
    keyword: 'промпты для growth',
    seoTitle: 'Промпты для growth — AI промпты для экспериментов, retention и revenue',
    seoDescription:
      'Growth-промпты для постановки экспериментов, анализа воронки, retention, activation и revenue-оптимизации.',
  },
  design: {
    slug: 'design',
    title: 'Промпты для дизайна',
    description: 'UI-концепты, арт-дирекшн, баннеры, креативы и visual prompts.',
    keyword: 'промпты для дизайна',
    seoTitle: 'Промпты для дизайна — AI промпты для креативов и UI-концептов',
    seoDescription:
      'Промпты для дизайнеров и креативных команд: визуальные концепции, баннеры, moodboard и AI-арт.',
  },
};

export const promptCategories = Object.values(categoryMap);

export function getPromptCategoryBySlug(slug: string) {
  return promptCategories.find((category) => category.slug === slug);
}
