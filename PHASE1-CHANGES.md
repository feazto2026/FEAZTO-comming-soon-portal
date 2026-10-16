# Feazto Phase 1 Remediation Notes

This source package includes initial production-readiness fixes. It has **not** been deployed.

## Changes made
- Added canonical URL, robots directives, `og:url`, absolute social image URLs, and corrected Twitter card metadata attributes in `index.html`.
- Added `public/robots.txt` and `public/sitemap.xml`.
- Changed the `SOON` segment to dark ink for stronger contrast against the yellow background.
- Added visually hidden semantic text for the main heading and marked the animated WebGL rendering decorative for assistive technology.
- Hid the decorative banana-tree border assets at viewport widths of 600px and below to reduce mobile crowding.
- Added a conservative Apache `.htaccess` with HTTPS/apex redirects, SPA fallback, baseline security headers, and static asset caching. It intentionally does not add a Content Security Policy until the required resources are tested.
- Corrected the package name typo in `package.json` and `package-lock.json`.

## Before production deployment
1. Confirm the Hostinger document root and current DNS/SSL state.
2. Confirm the apex and `www` domain redirect behavior. Do not change mail-related DNS records.
3. Test `.htaccess` on the actual Hostinger plan; remove or adjust directives if the host does not support the relevant modules.
4. Replace the social image with a dedicated 1200×630 Open Graph asset when one is approved.
5. Run `npm ci` and `npm run build` in a complete Node environment, then inspect `dist/` and test it in desktop and mobile browsers.
6. Back up the currently deployed files before upload.

## Verification status
The build could not be completed in this working environment because dependency installation timed out and left missing TypeScript/Vite type definitions. This is an environment/dependency-installation blocker; it does not establish whether the source build passes or fails. Re-run the build after a complete successful `npm ci`.
