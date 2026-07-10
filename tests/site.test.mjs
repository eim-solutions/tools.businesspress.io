import assert from 'node:assert/strict';
import { access, readFile } from 'node:fs/promises';
import { test } from 'node:test';

const root = new URL('../', import.meta.url);
const htmlPath = new URL('public/index.html', root);
const cssPath = new URL('public/assets/css/site.css', root);
const logoPath = new URL('public/assets/brand/businesspress-logo.png', root);

const tools = [
  ['PDF tools', 'https://pdf.businesspress.io/', 'pdf.webp'],
  ['CSV tools', 'https://csv.businesspress.io/', 'csv.webp'],
  ['EU VAT info', 'https://vat.businesspress.io/', 'vat.webp'],
  ['QR generator', 'https://qr.businesspress.io/', 'qr.webp'],
  ['Just Clock', 'https://clock.businesspress.io/', 'clock.webp'],
];

test('page contains the required semantic structure and metadata', async () => {
  const html = await readFile(htmlPath, 'utf8');

  assert.match(html, /<title>BusinessPress Tools — Practical tools for everyday work<\/title>/);
  assert.match(html, /<meta name="description" content="[^"]+">/);
  assert.match(html, /<link rel="canonical" href="https:\/\/tools\.businesspress\.io\/">/);
  assert.match(html, /<meta property="og:title" content="[^"]+">/);
  assert.match(html, /href="assets\/css\/site\.css\?v=5"/);
  assert.match(html, /<header\b/);
  assert.match(html, /<nav\b[^>]*aria-label="Primary"/);
  assert.match(html, /<main\b[^>]*id="main-content"/);
  assert.match(html, /<footer\b/);
  assert.match(html, /application\/ld\+json/);
  assert.match(html, /Skip to content/);
});

test('all five tools have exact direct links and local screenshots', async () => {
  const html = await readFile(htmlPath, 'utf8');

  for (const [name, url, screenshot] of tools) {
    assert.match(html, new RegExp(`href="${url.replaceAll('.', '\\.')}`));
    assert.match(html, new RegExp(`src="assets/screenshots/${screenshot.replace('.', '\\.')}`));
    assert.match(html, new RegExp(`alt="[^"]*${name.split(' ')[0]}[^"]*"`, 'i'));
    await access(new URL(`public/assets/screenshots/${screenshot}`, root));
  }
});

test('interactive and image elements include accessibility affordances', async () => {
  const html = await readFile(htmlPath, 'utf8');

  assert.doesNotMatch(html, /target="_blank"/);
  assert.match(html, /aria-label="BusinessPress Tools home"/);
  assert.match(html, /width="1470" height="775"/);
  assert.match(html, /loading="lazy"/);
  assert.match(html, /<noscript>/);
});

test('header and footer use the locally stored official BusinessPress logo', async () => {
  const html = await readFile(htmlPath, 'utf8');
  const logoReferences = [...html.matchAll(/src="assets\/brand\/businesspress-logo\.png"/g)];

  assert.equal(logoReferences.length, 2);
  assert.doesNotMatch(html, /class="brand-mark"/);
  await access(logoPath);
});

test('styles include responsive, focus, and reduced-motion behavior', async () => {
  const css = await readFile(cssPath, 'utf8');

  assert.match(css, /:focus-visible/);
  assert.match(css, /@media \(prefers-reduced-motion: reduce\)/);
  assert.match(css, /@media \(max-width: 959px\)/);
  assert.match(css, /@media \(max-width: 639px\)/);
  assert.match(css, /oklch\(/);
  assert.match(css, /--accent: oklch\(0\.51 0\.23 264\);/);
  assert.doesNotMatch(css, /oklch\([^)]* 35(?:\s|\))/);
});

test('screenshots remain fully visible and typography uses a restrained scale', async () => {
  const css = await readFile(cssPath, 'utf8');

  assert.doesNotMatch(css, /object-fit:\s*cover/);
  assert.match(css, /\.screenshot-wrap img\s*{[^}]*height:\s*auto;[^}]*object-fit:\s*contain;/s);
  assert.match(css, /h1\s*{[^}]*font-size:\s*clamp\(3rem,\s*5\.4vw,\s*4\.4rem\);/s);
  assert.match(css, /\.tool-copy h3\s*{[^}]*font-size:\s*clamp\(1\.75rem,\s*2\.6vw,\s*2\.55rem\);/s);
});

test('polished hierarchy avoids decorative metrics and numbering', async () => {
  const html = await readFile(htmlPath, 'utf8');

  assert.doesNotMatch(html, /class="tool-count"/);
  assert.doesNotMatch(html, /\b0[1-5]\s*\/\s*(Documents|Data|Finance|Sharing|Time)/);
  assert.doesNotMatch(html, /<span>0[1-5]<\/span>\s*(PDF|CSV|VAT|QR|Clock)/);
  assert.match(html, /class="header-cta" href="#toolbox">Browse tools/);
});

test('polished interactions use shared motion, touch, and shape tokens', async () => {
  const css = await readFile(cssPath, 'utf8');
  const revealRule = css.match(/\.motion-ready \[data-reveal\]\s*{([^}]*)}/s)?.[1] ?? '';
  const screenshotHoverRule = css.match(/\.screenshot-wrap:hover\s*{([^}]*)}/s)?.[1] ?? '';

  assert.doesNotMatch(css, /^@import/m);
  assert.match(css, /--radius-lg:\s*16px;/);
  assert.match(css, /--ease-out-quart:\s*cubic-bezier\(\.25,\s*1,\s*\.5,\s*1\);/);
  assert.match(css, /\.button:active/);
  assert.match(css, /\.quick-links a\s*{[^}]*min-height:\s*44px;/s);
  assert.match(css, /\.footer-links a\s*{[^}]*min-height:\s*44px;/s);
  assert.doesNotMatch(revealRule, /opacity:\s*0/);
  assert.doesNotMatch(screenshotHoverRule, /transform:/);
});
