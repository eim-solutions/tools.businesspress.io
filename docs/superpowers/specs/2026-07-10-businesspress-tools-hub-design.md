# BusinessPress Tools Hub Design

## Objective

Create and deploy `tools.businesspress.io` as the public directory for five BusinessPress utilities: PDF, CSV, VAT, QR, and Clock.

## Experience

The page opens with a direct promise: practical tools for everyday business work. The hero immediately exposes all five destinations and uses real interface previews as proof. Below it, each tool receives an alternating showcase row with a screenshot, a concise job-focused description, and a direct launch link.

## Architecture

Ship a static site from `public/` with semantic HTML, one stylesheet, and a small progressive-enhancement script. No build step or application runtime is required. Product screenshots are captured from the current live services, optimized into WebP assets, and served locally for stable performance.

## Content

- PDF: work with PDF documents online.
- CSV: inspect and validate CSV data.
- VAT: look up EU VAT information.
- QR: create practical QR codes.
- Clock: use a clear browser-based clock.

Copy must avoid unsupported claims about privacy, pricing, speed, or feature depth. Every tool URL must be represented exactly and open in the same tab.

## Quality Requirements

- Responsive from 320px through large desktop widths.
- WCAG 2.2 AA semantics, focus treatment, contrast, and reduced-motion support.
- Valid direct links for all five tools.
- Fast static delivery with locally hosted, compressed screenshots.
- Helpful page metadata, canonical URL, Open Graph fields, favicon, and structured data.

## Deployment

Create a GitHub repository under the `eim-solutions` organization, push the main branch, provision the domain in the supplied Forge server, and add/update the Cloudflare DNS record for `tools.businesspress.io`. Verify the public HTTPS page, its assets, and every external product link before sending the completion email.
