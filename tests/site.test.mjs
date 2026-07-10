import assert from 'node:assert/strict';
import { access, readFile } from 'node:fs/promises';
import { test } from 'node:test';

const root = new URL('../', import.meta.url);
const htmlPath = new URL('public/index.html', root);
const cssPath = new URL('public/assets/css/site.css', root);
const logoPath = new URL('public/assets/brand/businesspress-logo.png', root);
const robotsPath = new URL('public/robots.txt', root);
const sitemapPath = new URL('public/sitemap.xml', root);
const trackingQuery = 'utm_source=tools.businesspress.io&amp;utm_medium=referral&amp;utm_campaign=businesspress_tools_hub';
const trackedUrl = (url) => `${url}?${trackingQuery}`;

const tools = [
  ['PDF tools', 'https://pdf.businesspress.io/', 'pdf.webp'],
  ['CSV tools', 'https://csv.businesspress.io/', 'csv.webp'],
  ['EU VAT info', 'https://vat.businesspress.io/', 'vat.webp'],
  ['QR generator', 'https://qr.businesspress.io/', 'qr.webp'],
  ['Just Clock', 'https://clock.businesspress.io/', 'clock.webp'],
];

test('page contains the required semantic structure and metadata', async () => {
  const html = await readFile(htmlPath, 'utf8');

  assert.match(html, /<title>BusinessPress Tools — PDF, CSV, VAT, QR &amp; Clock<\/title>/);
  assert.match(html, /<meta name="description" content="[^"]+">/);
  assert.match(html, /<link rel="canonical" href="https:\/\/tools\.businesspress\.io\/">/);
  assert.match(html, /<meta property="og:title" content="[^"]+">/);
  assert.match(html, /href="assets\/css\/site\.css\?v=7"/);
  assert.match(html, /<header\b/);
  assert.match(html, /<nav\b[^>]*aria-label="Primary"/);
  assert.match(html, /<main\b[^>]*id="main-content"/);
  assert.match(html, /<footer\b/);
  assert.match(html, /application\/ld\+json/);
  assert.match(html, /Skip to content/);
});

test('homepage uses the bold blue second-generation hero', async () => {
  const [html, css] = await Promise.all([
    readFile(htmlPath, 'utf8'),
    readFile(cssPath, 'utf8'),
  ]);

  assert.match(html, /<section class="hero hero-v2">/);
  assert.match(html, /<div class="shell hero-inner">/);
  assert.match(html, /The BusinessPress toolbox/);
  assert.match(html, /Privacy first\.<br><em>Everyday tools\.<\/em>/);
  assert.match(css, /\.hero-v2\s*{[^}]*background:/s);
  assert.match(css, /\.hero-inner\s*{[^}]*display:\s*grid;/s);
  assert.doesNotMatch(css, /background-clip:\s*text/);
});

test('all five tools have exact direct links and local screenshots', async () => {
  const html = await readFile(htmlPath, 'utf8');

  for (const [name, url, screenshot] of tools) {
    const trackedHref = `href="${trackedUrl(url).replaceAll('.', '\\.').replaceAll('?', '\\?')}`;
    assert.equal([...html.matchAll(new RegExp(trackedHref, 'g'))].length, 3);
    assert.match(html, new RegExp(`src="assets/screenshots/${screenshot.replace('.', '\\.')}`));
    assert.match(html, new RegExp(`alt="[^"]*${name.split(' ')[0]}[^"]*"`, 'i'));
    await access(new URL(`public/assets/screenshots/${screenshot}`, root));
  }
});

test('interactive and image elements include accessibility affordances', async () => {
  const html = await readFile(htmlPath, 'utf8');
  const externalLinks = [...html.matchAll(/<a\b[^>]*href="https:\/\/[^"#]+"[^>]*>/g)].map((match) => match[0]);

  assert.ok(externalLinks.length >= 17);
  for (const link of externalLinks) {
    assert.match(link, /target="_blank"/);
    assert.match(link, /rel="noopener noreferrer"/);
    assert.match(link, /utm_source=tools\.businesspress\.io/);
  }
  assert.match(html, /aria-label="BusinessPress Tools home"/);
  assert.match(html, /width="1470" height="775"/);
  assert.match(html, /loading="lazy"/);
  assert.match(html, /<noscript>/);
});

test('copy names concrete tasks and uses consistent actions', async () => {
  const html = await readFile(htmlPath, 'utf8');

  assert.match(html, /Check a PDF, validate a CSV, calculate EU VAT, create a QR code, or keep time/);
  assert.match(html, /Check a PDF before you rely on it\./);
  assert.match(html, /Find CSV issues before they reach your workflow\./);
  assert.match(html, /Calculate EU VAT with the right country rate\./);
  assert.match(html, /Create a QR code for anything you need to share\./);
  assert.match(html, /Keep time without the clutter\./);
});

test('toolbox starts directly with the tools without a redundant introduction', async () => {
  const [html, css] = await Promise.all([
    readFile(htmlPath, 'utf8'),
    readFile(cssPath, 'utf8'),
  ]);

  assert.match(html, /<section class="toolbox shell" id="toolbox" aria-label="BusinessPress tools">/);
  assert.doesNotMatch(html, /Choose the task/);
  assert.doesNotMatch(html, /Five tools for the tasks that should take seconds\./);
  assert.doesNotMatch(html, /class="section-heading"/);
  assert.match(css, /\.toolbox\s*{[^}]*padding-block:\s*clamp\(32px,\s*4vw,\s*56px\)\s+clamp\(92px,\s*11vw,\s*148px\);/s);
});

test('analytics and search discovery assets are configured', async () => {
  const [html, robots, sitemap] = await Promise.all([
    readFile(htmlPath, 'utf8'),
    readFile(robotsPath, 'utf8'),
    readFile(sitemapPath, 'utf8'),
  ]);

  assert.match(html, /<script defer data-domain="tools\.businesspress\.io" src="https:\/\/stats\.businesspress\.io\/js\/script\.js"><\/script>/);
  assert.match(robots, /Sitemap: https:\/\/tools\.businesspress\.io\/sitemap\.xml/);
  assert.match(sitemap, /<loc>https:\/\/tools\.businesspress\.io\/<\/loc>/);
  assert.match(sitemap, /<lastmod>2026-07-11<\/lastmod>/);
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
