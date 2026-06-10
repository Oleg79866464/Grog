export type ToolCategorySlug =
  | 'marketing'
  | 'smm'
  | 'text'
  | 'seo'
  | 'content'
  | 'images'
  | 'video'
  | 'business';

export type Tool = {
  id: string;
  slug: string;
  name: string;
  description: string;
  url: string;
  affiliate_url: string;
  category: ToolCategorySlug;
  categoryLabel: string;
  pricing: string;
  tags: string[];
  commission_rate: number;
  featured: boolean;
  verified: boolean;
  use_cases: string[];
  benefits: string[];
  country: string;
  device_type: string;
  referer?: string;
  utm_source?: string;
  utm_medium?: string;
  utm_campaign?: string;
  click_count: number;
  created_at: string;
  updated_at: string;
};

export type Category = {
  slug: ToolCategorySlug;
  title: string;
  description: string;
  keyword: string;
};

export type PromptCategorySlug =
  | 'marketing'
  | 'seo'
  | 'copywriting'
  | 'smm'
  | 'business'
  | 'product'
  | 'growth'
  | 'design';

export type Prompt = {
  id: string;
  slug: string;
  title: string;
  description: string;
  category: PromptCategorySlug;
  categoryLabel: string;
  tags: string[];
  price: number;
  currency: 'USD' | 'RUB';
  featured: boolean;
  file_url: string;
  preview_text: string;
  created_at: string;
  updated_at: string;
};
