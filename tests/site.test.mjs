import assert from 'node:assert/strict';
import { access, readFile } from 'node:fs/promises';
import { test } from 'node:test';

const root = new URL('../', import.meta.url);
const htmlPath = new URL('public/index.html', root);
const cssPath = new URL('public/assets/css/site.css', root);
const jsPath = new URL('public/assets/js/site.js', root);
const logoPath = new URL('public/assets/brand/businesspress-logo.png', root);
const chromeBadgePath = new URL('public/assets/extensions/chrome-web-store-badge.png', root);
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
  assert.match(html, /href="assets\/css\/site\.css\?v=14"/);
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

test('hero presents a sphere-free five-tool preview deck', async () => {
  const [html, css] = await Promise.all([
    readFile(htmlPath, 'utf8'),
    readFile(cssPath, 'utf8'),
  ]);
  const hero = html.match(/<section class="hero hero-v2">[\s\S]*?<\/section>/)?.[0] ?? '';
  const previewOptions = [...hero.matchAll(/data-tool-preview-option/g)];
  const heroRule = css.match(/\.hero-v2\s*\{([^}]*)\}/s)?.[1] ?? '';
  const heroVisualTag = hero.match(/<div class="hero-visual"[^>]*>/)?.[0] ?? '';

  assert.match(hero, /data-tool-deck/);
  assert.match(hero, /data-tool-preview-image/);
  assert.match(hero, /data-tool-preview-domain/);
  assert.match(hero, /data-tool-preview-category/);
  assert.equal(previewOptions.length, 5);
  assert.equal([...hero.matchAll(/data-preview-src="assets\/screenshots\/(?:pdf|csv|vat|qr|clock)\.webp"/g)].length, 5);
  assert.equal([...hero.matchAll(/data-preview-alt="[^"]+"/g)].length, 5);
  assert.equal([...hero.matchAll(/data-preview-domain="(?:pdf|csv|vat|qr|clock)\.businesspress\.io"/g)].length, 5);
  assert.equal([...hero.matchAll(/data-preview-category="(?:Documents|Data|Finance|Sharing|Time)"/g)].length, 5);
  assert.match(html, /src="assets\/js\/site\.js\?v=3"/);
  assert.match(css, /\.tool-deck-option\s*\{[^}]*min-height:\s*44px;/s);
  assert.match(css, /\.tool-deck-option\.is-active/);
  assert.match(css, /\.tool-deck-option:focus-visible/);
  assert.match(css, /@media \(max-width: 639px\)[\s\S]*?\.tool-deck-options\s*\{[^}]*overflow-x:\s*auto;[^}]*scroll-snap-type:\s*x mandatory;/s);
  assert.doesNotMatch(hero, /\borbit\b|\bpreview-side\b/);
  assert.doesNotMatch(css, /\.orbit\b|\.preview-side\b/);
  assert.doesNotMatch(heroRule, /radial-gradient/);
  assert.doesNotMatch(css, /\.hero-visual::before/);
  assert.doesNotMatch(css, /\.preview[^,{]*\{[^}]*transform:\s*rotate\(/s);
  assert.doesNotMatch(heroVisualTag, /data-reveal/);
});

test('hero tool deck switches its preview on pointer entry and keyboard focus', async () => {
  const js = await readFile(jsPath, 'utf8');

  assert.match(js, /querySelector\('\[data-tool-deck\]'\)/);
  assert.match(js, /function activateToolPreview\(option\)/);
  assert.match(js, /option\.classList\.add\('is-active'\)/);
  assert.match(js, /previewImage\.src = option\.dataset\.previewSrc/);
  assert.match(js, /previewImage\.alt = option\.dataset\.previewAlt/);
  assert.match(js, /previewDomain\.textContent = option\.dataset\.previewDomain/);
  assert.match(js, /previewCategory\.textContent = option\.dataset\.previewCategory/);
  assert.match(js, /addEventListener\('pointerenter', \(\) => activateToolPreview\(option\)\)/);
  assert.match(js, /addEventListener\('focus', \(\) => activateToolPreview\(option\)\)/);
});

test('first conversion path avoids a duplicate chooser and makes tool actions explicit', async () => {
  const [html, css] = await Promise.all([
    readFile(htmlPath, 'utf8'),
    readFile(cssPath, 'utf8'),
  ]);

  assert.doesNotMatch(html, /class="tool-strip"/);
  assert.doesNotMatch(css, /\.tool-strip(?:-|\s|\{)/);
  assert.equal([...html.matchAll(/class="tool-deck-option(?: is-active)?"/g)].length, 5);
  assert.equal([...html.matchAll(/aria-label="Open [^"]+ in a new tab"/g)].length, 5);
  assert.equal([...html.matchAll(/<small>Open ↗<\/small>/g)].length, 5);
});

test('hero answers common trust objections with verified, specific assurances', async () => {
  const [html, css] = await Promise.all([
    readFile(htmlPath, 'utf8'),
    readFile(cssPath, 'utf8'),
  ]);

  assert.match(html, /<ul class="hero-assurances" aria-label="Tool assurances">/);
  assert.match(html, /<li>Free to use<\/li>/);
  assert.match(html, /<li>No account needed<\/li>/);
  assert.match(html, /<li>PDF &amp; CSV files aren’t stored<\/li>/);
  assert.match(css, /\.hero-assurances\s*\{[^}]*display:\s*flex;[^}]*list-style:\s*none;/s);
  assert.match(css, /\.hero-assurances li::before\s*\{[^}]*content:\s*'✓';/s);
});

test('tool opens are measured by tool, page location, and link type', async () => {
  const [html, js] = await Promise.all([
    readFile(htmlPath, 'utf8'),
    readFile(jsPath, 'utf8'),
  ]);

  assert.equal([...html.matchAll(/data-track-tool-open/g)].length, 20);
  for (const tool of ['pdf', 'csv', 'vat', 'qr', 'clock']) {
    assert.equal([...html.matchAll(new RegExp(`data-track-tool="${tool}"`, 'g'))].length, 4);
  }
  assert.equal([...html.matchAll(/data-track-location="hero"/g)].length, 5);
  assert.equal([...html.matchAll(/data-track-location="details"/g)].length, 10);
  assert.equal([...html.matchAll(/data-track-location="footer"/g)].length, 5);
  assert.equal([...html.matchAll(/data-track-element="tile"/g)].length, 5);
  assert.equal([...html.matchAll(/data-track-element="button"/g)].length, 5);
  assert.equal([...html.matchAll(/data-track-element="screenshot"/g)].length, 5);
  assert.equal([...html.matchAll(/data-track-element="text-link"/g)].length, 5);
  assert.match(js, /querySelectorAll\('\[data-track-tool-open\]'\)/);
  assert.match(js, /window\.plausible\('Tool Open',/);
  assert.match(js, /tool:\s*link\.dataset\.trackTool/);
  assert.match(js, /location:\s*link\.dataset\.trackLocation/);
  assert.match(js, /element:\s*link\.dataset\.trackElement/);
});

test('each directory entry is a top-level section in the heading outline', async () => {
  const html = await readFile(htmlPath, 'utf8');
  const toolbox = html.match(/<section class="toolbox shell"[\s\S]*?<\/section>/)?.[0] ?? '';

  assert.equal([...toolbox.matchAll(/<h2>/g)].length, 5);
  assert.doesNotMatch(toolbox, /<h3>/);
});

test('homepage uses the native system font stack without webfont requests', async () => {
  const [html, css] = await Promise.all([
    readFile(htmlPath, 'utf8'),
    readFile(cssPath, 'utf8'),
  ]);

  assert.doesNotMatch(html, /fonts\.googleapis\.com|fonts\.gstatic\.com|assets\/fonts\/|rel="preload"[^>]*as="font"/);
  assert.doesNotMatch(css, /@font-face|Onest|url\([^)]*fonts\//);
  assert.match(css, /font-family:\s*ui-sans-serif,\s*system-ui,\s*-apple-system,\s*BlinkMacSystemFont,\s*'Segoe UI',\s*sans-serif;/);
});

test('all five tools have exact direct links and local screenshots', async () => {
  const html = await readFile(htmlPath, 'utf8');

  for (const [name, url, screenshot] of tools) {
    const trackedHref = `href="${trackedUrl(url).replaceAll('.', '\\.').replaceAll('?', '\\?')}`;
    assert.equal([...html.matchAll(new RegExp(trackedHref, 'g'))].length, 4);
    assert.match(html, new RegExp(`src="assets/screenshots/${screenshot.replace('.', '\\.')}`));
    assert.match(html, new RegExp(`alt="[^"]*${name.split(' ')[0]}[^"]*"`, 'i'));
    await access(new URL(`public/assets/screenshots/${screenshot}`, root));
  }
});

test('PDF section includes local Chrome extension artwork and both extension destinations', async () => {
  const [html, css] = await Promise.all([
    readFile(htmlPath, 'utf8'),
    readFile(cssPath, 'utf8'),
  ]);
  const pdfSection = html.match(/<article class="tool-row tool-pdf"[\s\S]*?<\/article>/)?.[0] ?? '';
  const storeUrl = trackedUrl('https://chromewebstore.google.com/detail/pdfcheck-pdf-analysis-too/nggkjpbbjpgkicbmmagejepipmjnfkbi');
  const overviewUrl = trackedUrl('https://pdf.businesspress.io/chrome-extension');

  assert.match(pdfSection, new RegExp(`href="${storeUrl.replaceAll('.', '\\.').replaceAll('?', '\\?')}`));
  assert.match(pdfSection, new RegExp(`href="${overviewUrl.replaceAll('.', '\\.').replaceAll('?', '\\?')}`));
  assert.match(pdfSection, /src="assets\/extensions\/chrome-web-store-badge\.png" width="567" height="171" loading="lazy" decoding="async" alt="Available in the Chrome Web Store"/);
  assert.match(pdfSection, /See how the extension works/);
  assert.match(css, /\.tool-actions\s*\{[^}]*display:\s*flex;[^}]*flex-wrap:\s*wrap;/s);
  assert.match(css, /\.chrome-store-badge img\s*\{[^}]*width:\s*174px;[^}]*height:\s*auto;/s);
  await access(chromeBadgePath);
});

test('VAT section includes its Chrome Web Store and extension overview links', async () => {
  const html = await readFile(htmlPath, 'utf8');
  const vatSection = html.match(/<article class="tool-row tool-vat"[\s\S]*?<\/article>/)?.[0] ?? '';
  const storeUrl = trackedUrl('https://chromewebstore.google.com/detail/eu-vat-calculator/fifmbbpgopnifnoginhmjjedjnabdkka');
  const overviewUrl = trackedUrl('https://vat.businesspress.io/chrome-extension');

  assert.match(vatSection, new RegExp(`href="${storeUrl.replaceAll('.', '\\.').replaceAll('?', '\\?')}`));
  assert.match(vatSection, new RegExp(`href="${overviewUrl.replaceAll('.', '\\.').replaceAll('?', '\\?')}`));
  assert.match(vatSection, /src="assets\/extensions\/chrome-web-store-badge\.png" width="567" height="171" loading="lazy" decoding="async" alt="Available in the Chrome Web Store"/);
  assert.match(vatSection, /See how the extension works/);
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

test('closing section invites visitors to create with the BusinessPress platform', async () => {
  const [html, css] = await Promise.all([
    readFile(htmlPath, 'utf8'),
    readFile(cssPath, 'utf8'),
  ]);

  assert.match(html, /Create with BusinessPress/);
  assert.match(html, /Build what your business needs next\./);
  assert.match(html, /Explore the BusinessPress platform to turn your ideas and workflows into tools and websites of your own\./);
  assert.match(html, /class="button button-primary" href="https:\/\/businesspress\.io\/\?utm_source=tools\.businesspress\.io&amp;utm_medium=referral&amp;utm_campaign=businesspress_tools_hub" target="_blank" rel="noopener noreferrer">Explore BusinessPress/);
  assert.match(css, /\.closing-intro\s*{[^}]*max-width:\s*58ch;/s);
  assert.doesNotMatch(html, /Keep work moving/);
  assert.doesNotMatch(html, /Open a tool\.<br>Finish the task\. Move on\./);
  assert.doesNotMatch(html, /Ready when work gets fiddly/);
  assert.doesNotMatch(html, /One bookmark\.<br>Five practical tools\./);
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
  const [html, css] = await Promise.all([
    readFile(htmlPath, 'utf8'),
    readFile(cssPath, 'utf8'),
  ]);
  const logoReferences = [...html.matchAll(/src="assets\/brand\/businesspress-logo\.png"/g)];
  const header = html.match(/<header\b[\s\S]*?<\/header>/)?.[0] ?? '';
  const footer = html.match(/<footer\b[\s\S]*?<\/footer>/)?.[0] ?? '';

  assert.equal(logoReferences.length, 2);
  assert.doesNotMatch(html, /class="brand-mark"/);
  assert.doesNotMatch(header, /href="https:\/\/businesspress\.io\//);
  assert.match(header, /class="header-cta" href="#toolbox"/);
  assert.match(footer, new RegExp(`class="powered-by" href="${trackedUrl('https://businesspress.io/').replaceAll('.', '\\.').replaceAll('?', '\\?')}`));
  assert.match(footer, /target="_blank" rel="noopener noreferrer" aria-label="Powered by BusinessPress, opens in a new tab"/);
  assert.match(footer, /class="powered-label">Powered by<\/span>/);
  assert.match(css, /\.powered-by\s*{[^}]*min-height:\s*52px;[^}]*background:\s*var\(--white\);/s);
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
  assert.match(css, /\.tool-copy h2\s*{[^}]*font-size:\s*clamp\(1\.75rem,\s*2\.6vw,\s*2\.55rem\);/s);
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
  assert.match(css, /\.tool-deck-option\s*{[^}]*min-height:\s*44px;/s);
  assert.match(css, /\.footer-links a\s*{[^}]*min-height:\s*44px;/s);
  assert.doesNotMatch(revealRule, /opacity:\s*0/);
  assert.doesNotMatch(screenshotHoverRule, /transform:/);
});
