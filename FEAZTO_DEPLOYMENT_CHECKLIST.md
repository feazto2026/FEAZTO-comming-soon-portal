# FEAZTO COMING SOON WEBSITE — PRODUCTION DEPLOYMENT CHECKLIST

**Target Domain**: `https://feazto.com` (and `https://www.feazto.com`)  
**Hosting Platform**: Hostinger (LiteSpeed / Apache Web Server)  
**Deployment Model**: Static SPA Build (`dist/` deployed to `public_html/`)  
**Detected Stack**: React 19 + Vite 8.3 + TypeScript 6.0

---

## 1. Pre-Deployment Verification Matrix

Before initiating production build and upload, verify all items below:

| # | Check Item | Verification Command / Step | Status |
|---|---|---|---|
| 1 | Production Build | Run `npm run build` in clean tree | [ ] PASS / [ ] FAIL |
| 2 | TypeScript Type Check | Run `npx tsc -b` | [ ] PASS / [ ] FAIL |
| 3 | Linter Inspection | Run `npm run lint` | [ ] PASS / [ ] FAIL |
| 4 | Asset Integrity | Ensure all used images exist in `public/` | [ ] PASS / [ ] FAIL |
| 5 | Contrast Verification | Confirm headline text passes WCAG AA | [ ] PASS / [ ] FAIL |
| 6 | Mobile Viewport Check | Confirm banana trees do not overlap cards | [ ] PASS / [ ] FAIL |
| 7 | SEO Metadata | Check absolute URLs for `og:image` and canonical | [ ] PASS / [ ] FAIL |
| 8 | Indexing Files | Verify `robots.txt` and `sitemap.xml` are in `public/` | [ ] PASS / [ ] FAIL |
| 9 | Contact Link / Form | Test `hello@feazto.com` action | [ ] PASS / [ ] FAIL |
| 10 | Security Headers | Verify `.htaccess` is present in `public/` | [ ] PASS / [ ] FAIL |

---

## 2. Production Build Execution

Execute the clean build command locally:

```bash
# 1. Clean any previous build artifacts
rm -rf dist

# 2. Run TypeScript compilation and Vite production bundler
npm run build
```

Expected build output:
```text
dist/
├── assets/
│   ├── index-[hash].css      (~12 KB)
│   └── index-[hash].js       (~290 KB)
├── .htaccess                 (Security & Caching rules)
├── robots.txt                (Crawler directives)
├── sitemap.xml               (Search engine sitemap)
├── favicon.svg               (Favicon)
├── feazto-logo-transparent.png
└── [optimized web assets]
```

---

## 3. Hostinger Production Server Configuration (`.htaccess`)

Hostinger Web Hosting environments run on LiteSpeed / Apache. To ensure HTTPS enforcement, canonical domain routing, browser caching, and security headers, create the following `.htaccess` file inside the `public/` folder before running `npm run build`:

```apache
# ==============================================================================
# FEAZTO PRODUCTION .HTACCESS CONFIGURATION FOR HOSTINGER
# ==============================================================================

# 1. ENFORCE HTTPS & CANONICAL DOMAIN (feazto.com)
<IfModule mod_rewrite.c>
  RewriteEngine On
  RewriteBase /

  # Redirect HTTP to HTTPS
  RewriteCond %{HTTPS} off
  RewriteRule ^(.*)$ https://feazto.com/$1 [L,R=301]

  # Redirect www.feazto.com to feazto.com
  RewriteCond %{HTTP_HOST} ^www\.feazto\.com$ [NC]
  RewriteRule ^(.*)$ https://feazto.com/$1 [L,R=301]

  # SPA Routing Fallback (Ensure refreshing routes returns index.html)
  RewriteCond %{REQUEST_FILENAME} !-f
  RewriteCond %{REQUEST_FILENAME} !-d
  RewriteRule . /index.html [L]
</IfModule>

# 2. SECURITY HEADERS
<IfModule mod_headers.c>
  # Prevent MIME-type sniffing
  Header set X-Content-Type-Options "nosniff"

  # Prevent Clickjacking / Framing
  Header set X-Frame-Options "SAMEORIGIN"

  # Enforce Referrer Policy
  Header set Referrer-Policy "strict-origin-when-cross-origin"

  # Restrict Unused Browser Features
  Header set Permissions-Policy "geolocation=(), microphone=(), camera=()"

  # Content Security Policy (Allows Google Fonts, Inline WebGL Canvas, Self Assets)
  Header set Content-Security-Policy "default-src 'self'; script-src 'self' 'unsafe-inline'; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; font-src 'self' https://fonts.gstatic.com data:; img-src 'self' data: https:; connect-src 'self'; frame-ancestors 'self';"
</IfModule>

# 3. BROWSER CACHING (LEVERAGE BROWSER CACHE)
<IfModule mod_expires.c>
  ExpiresActive On

  # HTML files - Do not cache (ensure users receive new builds immediately)
  ExpiresByType text/html "access plus 0 seconds"

  # Hashed CSS and JS files - Cache for 1 year (immutable)
  ExpiresByType text/css "access plus 1 year"
  ExpiresByType application/javascript "access plus 1 year"
  ExpiresByType text/javascript "access plus 1 year"

  # Media & Images - Cache for 6 months
  ExpiresByType image/png "access plus 6 months"
  ExpiresByType image/jpeg "access plus 6 months"
  ExpiresByType image/webp "access plus 6 months"
  ExpiresByType image/svg+xml "access plus 6 months"
  ExpiresByType image/x-icon "access plus 1 year"
</IfModule>

# 4. GZIP / BROTLI COMPRESSION
<IfModule mod_deflate.c>
  AddOutputFilterByType DEFLATE text/html text/plain text/xml text/css application/javascript application/json image/svg+xml
</IfModule>
```

---

## 4. Hostinger DNS & Domain Configuration

Log in to Hostinger hPanel -> **Websites** -> **feazto.com** -> **DNS Zone Editor**.

### Required DNS Records:

| Record Type | Host / Name | Target / Points To | TTL | Purpose |
|---|---|---|---|---|
| **A** | `@` | `[Hostinger Server IP]` | 14400 | Directs apex domain (`feazto.com`) to Hostinger |
| **CNAME** | `www` | `feazto.com` | 14400 | Directs `www.feazto.com` to apex domain |

> [!CAUTION]
> **DO NOT DELETE OR OVERWRITE EXISTING MX RECORDS!**  
> If an email provider (such as Google Workspace, Titan, or Hostinger Business Mail) is handling `hello@feazto.com`, deleting or modifying MX / TXT (SPF/DKIM) records will immediately disrupt incoming contact emails.

---

## 5. SSL / TLS Certificate Setup

1. In Hostinger hPanel, navigate to **Security** -> **SSL**.
2. Ensure **Lifetime Free SSL (Let's Encrypt)** is installed and active for:
   - `feazto.com`
   - `www.feazto.com`
3. Toggle on **Force HTTPS** in Hostinger hPanel dashboard.

---

## 6. Deployment Step-by-Step (Uploading Build to Hostinger)

### Method A: Hostinger hPanel File Manager (Recommended for Single Landing Page)
1. Run `npm run build` locally to produce the fresh `dist/` directory.
2. Compress the contents of `dist/` into a single zip file:
   ```bash
   cd dist && zip -r ../feazto-build.zip . && cd ..
   ```
3. Open Hostinger hPanel -> **File Manager** -> navigate to `domains/feazto.com/public_html/`.
4. If there are default placeholder files (`default.php`, `index.php`), create a backup folder `_backup_legacy/` and move them there.
5. Upload `feazto-build.zip` into `public_html/`.
6. Right-click `feazto-build.zip` -> select **Extract** directly into `public_html/`.
7. Verify that `index.html`, `assets/`, `robots.txt`, and `.htaccess` are directly inside `public_html/` (not nested inside a subfolder like `public_html/dist/`).
8. Delete `feazto-build.zip` from the server.

### Method B: Git Deployment via Hostinger hPanel (Automated)
1. In hPanel, go to **Advanced** -> **Git**.
2. Connect repository: `https://github.com/feazto2026/FEAZTO-comming-soon-portal.git`.
3. Branch: `main`.
4. Directory: `/public_html`.
5. Note: Since Hostinger basic Git deployment pulls repository files directly, you must ensure that either `dist` contents are deployed, or Hostinger build scripts are configured. (Method A is simpler and safer for Vite SPAs on shared hosting).

---

## 7. Post-Deployment Smoke Test Protocol

Perform these verification checks immediately after deployment:

```bash
# 1. Test HTTPS redirect and response code
curl -I https://feazto.com/

# 2. Test www to non-www 301 redirect
curl -I https://www.feazto.com/

# 3. Test robots.txt availability
curl -s -o /dev/null -w "%{http_code}\n" https://feazto.com/robots.txt

# 4. Test sitemap.xml availability
curl -s -o /dev/null -w "%{http_code}\n" https://feazto.com/sitemap.xml

# 5. Test security headers
curl -I https://feazto.com/ | grep -E "(X-Frame-Options|X-Content-Type-Options|Content-Security-Policy)"
```

### Manual Visual Verification:
- [ ] Open `https://feazto.com/` in an incognito window.
- [ ] Verify that the centered logo, WebGL animated "COMING SOON" text, chariot animation, and food doodles render smoothly.
- [ ] Test on an iPhone (Safari) and an Android device (Chrome).
- [ ] Verify that clicking "Stay in the loop" smooth-scrolls to `#notify-me`.
- [ ] Verify that clicking "Contact our Launch Team" opens the email compose window with `hello@feazto.com` and subject pre-filled.
- [ ] Inspect console in DevTools to confirm zero 404 image errors and zero WebGL shader errors.

---

## 8. Rollback Strategy

If an unexpected critical defect or broken layout is detected after deployment:
1. In Hostinger File Manager, retain the previous deployment zip as `feazto-build-previous.zip`.
2. To roll back:
   - Select all files in `public_html/` (except `_backup_legacy/` and `feazto-build-previous.zip`).
   - Delete current files.
   - Extract `feazto-build-previous.zip` into `public_html/`.
3. Clear browser cache and re-verify.
