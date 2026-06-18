import type { Prompt } from './types';

export type PromptImportRow = Omit<Prompt, 'id' | 'created_at' | 'updated_at'> & {
  id?: string;
  created_at?: string;
  updated_at?: string;
};

export type PromptImportResult = {
  total: number;
  inserted: number;
  skipped: number;
  errors: Array<{ slug: string; reason: string }>;
};

export function normalizePromptSlug(input: string) {
  return input.trim().toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-_]/g, '');
}

export function dedupePromptImports(items: PromptImportRow[]) {
  const seen = new Set<string>();
  const deduped: PromptImportRow[] = [];

  for (const item of items) {
    const slug = normalizePromptSlug(item.slug);
    if (seen.has(slug)) {
      continue;
    }

    seen.add(slug);
    deduped.push({ ...item, slug });
  }

  return deduped;
}

export function validatePromptImportRow(row: PromptImportRow) {
  if (!row.slug || !row.title || !row.description || !row.category || !row.file_url) {
    return 'missing_required_fields';
  }

  if (typeof row.price !== 'number' || Number.isNaN(row.price) || row.price < 0) {
    return 'invalid_price';
  }

  if (row.currency !== 'USD' && row.currency !== 'RUB') {
    return 'invalid_currency';
  }

  return null;
}
