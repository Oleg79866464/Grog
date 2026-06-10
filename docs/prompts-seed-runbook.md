# Prompts seed runbook

## Input files
- `prompts-clean.json`
- optional `parsing_errors.json`

## Required normalization
- slug: lowercase, kebab-case
- category: one of `marketing`, `seo`, `copywriting`, `smm`, `business`, `product`, `growth`, `design`
- price: numeric
- currency: `USD` or `RUB`
- file_url: downloadable source or storage URL

## Import order
1. Apply Supabase schema for `prompts`
2. Load cleaned JSON into staging or seed script
3. Validate duplicates by slug
4. Insert new rows
5. Refresh `prompts_analytics`

## Validation rules
- no missing `slug`, `title`, `description`, `category`, `file_url`
- no invalid currency values
- no negative prices
- preserve featured flag for hero cards

## Admin workflow
- update prompts catalog from Supabase only
- review analytics in `/admin/prompts`
- use `/import` as the operator entrypoint
