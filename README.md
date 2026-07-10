# BusinessPress Tools

The public directory for BusinessPress utilities at `tools.businesspress.io`.

![BusinessPress Tools landing page](docs/screenshots/landing-desktop.jpg)

## Local development

```bash
python3 -m http.server 4173 --directory public
```

Then open `http://127.0.0.1:4173/`.

## Tests

```bash
node --test tests/site.test.mjs
```

## Deployment

The repository is a static site. Point the web server root to `/public`; no build command or runtime process is required.
