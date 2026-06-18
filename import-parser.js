const fs = require('fs');
const path = require('path');

const inputPath = path.join(process.cwd(), 'taaft-export.md');
const outputPath = path.join(process.cwd(), 'ai-tools-clean.json');
const errorsPath = path.join(process.cwd(), 'parsing_errors.json');

function slugify(value) {
  return String(value)
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9а-яё]+/gi, '-')
    .replace(/^-+|-+$/g, '');
}

function normalizePricing(value) {
  const pricing = String(value || '').toLowerCase();
  if (!pricing || pricing.includes('free')) return 'Free';
  if (pricing.includes('freemium')) return 'Freemium';
  return 'Paid';
}

function normalizeCategory(value) {
  const map = {
    marketing: 'AI для маркетинга',
    smm: 'AI для SMM',
    seo: 'AI для SEO',
    content: 'AI для контента',
    business: 'AI для бизнеса',
    video: 'AI для видео',
    images: 'Генератор изображений',
    text: 'Генератор текста',
  };
  const normalized = String(value || '').toLowerCase();
  return map[normalized] || value || 'AI для бизнеса';
}

function parseMarkdown(content) {
  const blocks = content.split(/\n(?=###\s+)/g);
  const tools = [];
  const errors = [];
  const seen = new Set();

  for (const block of blocks) {
    const nameMatch = block.match(/###\s+(.+)/);
    const urlMatch = block.match(/URL:\s*(.+)/i);
    if (!nameMatch || !urlMatch) {
      if (block.trim()) errors.push({ block, reason: 'Missing required title or URL' });
      continue;
    }

    const name = nameMatch[1].trim();
    const slug = slugify(name);
    if (seen.has(slug)) {
      errors.push({ name, reason: 'Duplicate tool' });
      continue;
    }
    seen.add(slug);

    const description = (block.match(/Description:\s*(.+)/i) || [])[1] || `${name} — AI tool for marketing and content.`;
    const category = normalizeCategory((block.match(/Category:\s*(.+)/i) || [])[1]);
    const pricing = normalizePricing((block.match(/Pricing:\s*(.+)/i) || [])[1]);
    const affiliateUrl = (block.match(/Affiliate:\s*(.+)/i) || [])[1] || urlMatch[1].trim();
    const tags = Array.from(new Set((block.match(/Tags:\s*(.+)/i) || [])[1]?.split(',').map((tag) => tag.trim()).filter(Boolean) || []));

    tools.push({
      id: slug,
      slug,
      name,
      description,
      category,
      pricing,
      tags,
      url: urlMatch[1].trim(),
      affiliate_url: affiliateUrl.trim(),
      commission_rate: 0.15,
      click_count: 0,
      featured: false,
      verified: false,
      country: '',
      device_type: '',
      referer: '',
      utm_source: '',
      utm_medium: '',
      utm_campaign: '',
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    });
  }

  return { tools, errors };
}

function main() {
  if (!fs.existsSync(inputPath)) {
    fs.writeFileSync(errorsPath, JSON.stringify([{ reason: 'Input file not found', inputPath }], null, 2));
    process.exit(1);
  }

  const raw = fs.readFileSync(inputPath, 'utf8');
  const { tools, errors } = parseMarkdown(raw);
  fs.writeFileSync(outputPath, JSON.stringify(tools, null, 2));
  fs.writeFileSync(errorsPath, JSON.stringify(errors, null, 2));
  console.log(`Parsed ${tools.length} tools, ${errors.length} errors`);
}

main();
