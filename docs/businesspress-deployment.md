# BusinessPress deployment runbook

This note captures the working GitHub → Laravel Forge → Cloudflare pattern for `businesspress.io` projects. It was verified against the live configuration on 2026-07-11. Treat IP addresses, branches, PHP versions, and Cloudflare settings as a snapshot and re-check them before each deployment.

## Verified infrastructure snapshot

- GitHub organization: `eim-solutions`
- Forge organization/server: `BusinessPress` / `eim-jbn/eu-vat-info`
- Forge server: Ubuntu 22.04, PHP 8.3, Helsinki
- Server IP at verification time: `65.109.164.56`
- Standard web directory: `/public`
- Deployment trigger: push-to-deploy
- Cloudflare zone: `businesspress.io`
- Cloudflare account path: `https://dash.cloudflare.com/708eb9b41423abcd585ce0922aa2c2b9`

Never copy credentials, deploy hooks, SSH keys, API tokens, or `.env` values into documentation, commits, or task messages.

## Before configuring infrastructure

1. Inspect the project and classify it as static HTML or Laravel.
2. Run the project's tests, linting, and production build locally.
3. Confirm the intended GitHub repository and branch. Existing BusinessPress projects do not all use the same default branch.
4. Inspect a working sibling site on the same Forge server. Copy the relevant framework, PHP, repository, branch, root, web directory, deployment, domain, and certificate pattern.
5. Check Cloudflare for conflicting DNS records before adding new ones.

## Static HTML sites

The working `tools.businesspress.io` configuration is:

- Forge framework: HTML
- Repository: `eim-solutions/tools.businesspress.io`
- Branch: `main`
- Root directory: `/`
- Web directory: `/public`
- Zero-downtime retention: 4 releases

Deployment script:

```bash
$CREATE_RELEASE()
cd $FORGE_RELEASE_DIRECTORY
$ACTIVATE_RELEASE()
```

Static tests must run before the push, not during the Forge deployment.

## Laravel sites

The working `csv.businesspress.io` configuration uses Laravel, PHP 8.3, repository `eim-solutions/csv-check`, branch `master`, root `/`, and web directory `/public`.

Its deployment script is:

```bash
$CREATE_RELEASE()
cd $FORGE_RELEASE_DIRECTORY
mkdir -p bootstrap/cache
mkdir -p storage/framework/{cache/data,sessions,views}
chmod -R 775 bootstrap/cache storage
$FORGE_COMPOSER install --no-dev --no-interaction --prefer-dist --optimize-autoloader
$FORGE_PHP artisan optimize
$FORGE_PHP artisan storage:link
$FORGE_PHP artisan migrate --force
npm install
npm run build
rm -rf node_modules
$ACTIVATE_RELEASE()
```

Remove commands the project genuinely does not need—for example npm commands in a backend-only project—but preserve the release ordering. Do not add the test suite to this deployment script.

When the local PHP version is newer than Forge, pin `config.platform.php` in `composer.json` to the Forge version and regenerate `composer.lock`. Before pushing, run:

```bash
composer prohibits php 8.3.22
composer install --dry-run --no-dev --no-interaction
composer validate --strict
```

Use the actual Forge patch version rather than assuming `8.3.22` is still current.

## Domain, DNS, and TLS

1. Add `<project>.businesspress.io` as the Forge custom domain.
2. Configure the `www` redirect or alias only when the product needs one.
3. Obtain a Forge Let's Encrypt certificate using the method already working for a sibling. `tools.businesspress.io` uses HTTP-01.
4. In Cloudflare, create a proxied `A` record from the subdomain to the currently verified Forge IP with TTL Auto.
5. If needed, create a proxied `www.<project>.businesspress.io` CNAME pointing to `<project>.businesspress.io` with TTL Auto.

The zone's encryption mode was Flexible when this note was recorded. Do not change that zone-wide setting while deploying one project; a future migration to a stricter mode must be audited and coordinated separately because it affects every proxied hostname.

## Release and verification

1. Commit only the intended files and push the configured branch.
2. Confirm Forge received the same commit and the deployment completed.
3. Check the DNS answer and HTTPS status from outside Forge.
4. Open the production URL in a browser and verify the homepage, static assets, console, responsive layout, canonical redirect, and any application-specific health check.
5. If the release fails, compare it with a working sibling before introducing new CI, hooks, certificate methods, or zone settings.

Useful checks:

```bash
dig +short <project>.businesspress.io
curl -I https://<project>.businesspress.io/
git rev-parse HEAD
```

