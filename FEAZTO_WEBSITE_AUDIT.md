# FEAZTO COMING SOON WEBSITE — COMPLETE AUDIT REPORT

**Target Production Domain**: `https://feazto.com`  
**Hosting Target**: Hostinger  
**Repository Working Directory**: `/Users/rahulr/Documents/feazt`  
**Audit Date**: October 2026  
**Auditor Roles**: Senior Software Architect, Full-Stack Engineer, Technical SEO Specialist, GEO Specialist, Web Performance Engineer, Security Reviewer, Production Deployment Consultant.

---

## 1. Executive Summary

This comprehensive, evidence-based audit evaluates the **Feazto Coming Soon website** codebase before production deployment to **`https://feazto.com`** hosted on Hostinger.

The application is an aesthetically crafted, single-page React 19 application built with Vite and TypeScript, featuring WebGL shader typography (`WarpText` via OGL) and rich South Asian cultural illustrations (heritage chariot, banana trees, kolam line art, and regional food doodles).

### Key Audit Highlights
1. **Build & Runtime**: The application builds cleanly (`npm run build` passes in 391ms) and runs on Vite 8.3 with zero compilation errors.
2. **Critical Accessibility Defect**: The hero headline renders the word `"SOON"` in `#FFFFFF` (White) directly over the yellow background (`#F8B504`), yielding a contrast ratio of **1.84:1**, severely failing WCAG 2.2 AA (minimum 3.0:1 for large text).
3. **Severe Mobile Display Issue**: On mobile screens (<768px down to 320px), unconstrained 500x1400 banana tree assets (`.showcase-tree`) span across >75% of the mobile viewport, overlapping and obscuring the statement and contact cards.
4. **SEO & Indexing Deficits**:
   - Missing `robots.txt` and `sitemap.xml`.
   - Missing `<link rel="canonical">`.
   - Relative Open Graph / Twitter image paths (`/feazto-logo-transparent.png`), which cause social sharing previews (WhatsApp, X/Twitter, LinkedIn, Facebook) to fail.
   - Missing Schema.org JSON-LD structured data.
   - The primary `<h1>` heading contains only a WebGL `<canvas>` without raw DOM text, obscuring heading semantics from basic search bots.
5. **GEO / AI Search Invisibility**: The four core pillars of the Feazto ecosystem documented in architecture reference documents—**Regional Food Delivery**, **CareFe (Cloud Kitchens)**, **Book-a-Cook (On-Demand Cooks)**, and **Fiso AI**—are completely absent from public-facing copy. AI search engines cannot categorize what Feazto actually provides.
6. **Lead Capture Friction**: The sole call-to-action redirects to a `mailto:hello@feazto.com` link rather than an embedded email signup form, introducing substantial drop-off for visitors without configured desktop email clients.
7. **Repository & Asset Hygiene**: 42 preview screenshot PNG files (~20 MB) and an obsolete PowerShell script (`sample_white.ps1`) clutter the root directory, while 18 unused high-resolution images (~5.5 MB) in `public/` are unconditionally copied into the production `dist/` bundle.

---

## 2. Technology Stack & Architecture Overview

| Layer | Detected Technology | Version | Notes / Assessment |
|---|---|---|---|
| **Framework** | React | `^19.2.8` | Latest React 19 release |
| **Build Tool** | Vite | `^8.3.0` | High-performance ES module bundler |
| **Language** | TypeScript | `~6.0.2` | Configured with `target: es2023`, `moduleResolution: bundler` |
| **Graphics Engine** | OGL | `^1.0.11` | Lightweight WebGL library used for `WarpText` text effects |
| **Linter** | Oxlint | `^1.81.0` | Rust-based high-speed linter; reports 2 warnings |
| **Styling** | Vanilla CSS | Custom tokens | CSS variables in `src/index.css`, modular styles in `src/App.css` |
| **Fonts** | Google Fonts | Web | Inter (400–700) & Poppins (600–900) via Google CDN |
| **Hosting Mode** | Static SPA | N/A | Static files in `dist/` uploaded to Hostinger `public_html` |
| **Deployment Server** | Apache / LiteSpeed | Hostinger standard | Requires `.htaccess` for security headers, caching, and redirects |

---

## 3. Findings Register

### Critical Severity Findings

#### [FINDING-01] Contrast Ratio Failure on Hero Headline "SOON"
- **Category**: Accessibility / WCAG 2.2 AA
- **Severity**: **Critical**
- **Affected File**: [`src/App.tsx#L101-L104`](file:///Users/rahulr/Documents/feazt/src/App.tsx#L101-L104)
- **Evidence**:
  ```tsx
  segments={[
    { text: 'COMING ', color: '#121212' },
    { text: 'SOON', color: '#FFFFFF' }
  ]}
  ```
  Background color: `#F8B504` (`--color-brand-yellow`).
  Contrast calculation: Relative luminance of `#FFFFFF` is 1.0; relative luminance of `#F8B504` is 0.52.
  Contrast Ratio = $(1.0 + 0.05) / (0.52 + 0.05) = \mathbf{1.84:1}$.
  WCAG 2.2 Level AA requires at least **3.0:1** for large text and **4.5:1** for normal text.
- **Impact**: The word "SOON" is nearly invisible to users with low vision, color vision deficiency, or users viewing the screen under direct sunlight.
- **Recommended Remediation**:
  Change the segment color of `'SOON'` to `#121212` (Ink Black, 9.8:1 contrast) or introduce an ink black pill badge/underlay behind the word if dual-tone treatment is retained.
- **Verification Method**: Run Chrome DevTools Lighthouse Accessibility audit and WebAIM Color Contrast Checker.
- **Effort**: Small.

---

### High Severity Findings

#### [FINDING-02] Mobile Layout Breakdown from Unconstrained Banana Tree Assets
- **Category**: UI / Mobile Responsiveness
- **Severity**: **High**
- **Affected Files**: [`src/App.css#L534-L557`](file:///Users/rahulr/Documents/feazt/src/App.css#L534-L557), [`src/App.tsx#L172-L187`](file:///Users/rahulr/Documents/feazt/src/App.tsx#L172-L187)
- **Evidence**:
  ```css
  .showcase-tree {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    height: clamp(800px, 95%, 1400px);
    width: auto;
    pointer-events: none;
    opacity: 0.52;
    mix-blend-mode: multiply;
    filter: contrast(1.2);
  }
  .tree-left { left: 0; }
  .tree-right { right: 0; }
  ```
  Original dimensions of `banana-tree-left.png` are $500 \times 1400\text{ px}$. At $800\text{ px}$ height, width is approximately $286\text{ px}$. On mobile viewports ($320\text{ px} - 430\text{ px}$), the left and right trees combined occupy $>570\text{ px}$, causing the dark illustrated foliage to overlap centrally behind the white cards and text, rendering card copy illegible.
- **Impact**: Poor mobile user experience on small and standard mobile devices.
- **Recommended Remediation**:
  Add responsive media queries in `src/App.css`:
  ```css
  @media (max-width: 900px) {
    .showcase-tree {
      height: clamp(400px, 60vh, 600px);
      opacity: 0.18;
    }
    .tree-left { left: -80px; }
    .tree-right { right: -80px; }
  }
  @media (max-width: 480px) {
    .showcase-border-trees {
      display: none; /* Hide background border trees on small mobile to preserve readability */
    }
  }
  ```
- **Verification Method**: Inspect on viewport widths 320px, 375px, 390px, and 414px in Chrome Responsive Mode.
- **Effort**: Small.

#### [FINDING-03] Broken Social Sharing Previews (Relative Open Graph Image URLs)
- **Category**: Technical SEO / Social Graph
- **Severity**: **High**
- **Affected File**: [`index.html#L21-L27`](file:///Users/rahulr/Documents/feazt/index.html#L21-L27)
- **Evidence**:
  ```html
  <meta property="og:image" content="/feazto-logo-transparent.png" />
  <meta property="twitter:image" content="/feazto-logo-transparent.png" />
  ```
  Open Graph protocol specification and Twitter/X card parsers (along with WhatsApp, Facebook, iMessage, and LinkedIn) require absolute URLs (`https://feazto.com/...`). Relative paths result in missing thumbnails or broken image cards when links are shared.
- **Impact**: Zero brand visual presence when the website URL is shared on social networks and messaging platforms.
- **Recommended Remediation**:
  Update to absolute URL `https://feazto.com/feazto-logo-transparent.png` (or dedicated 1200x630 OG image). Also fix Twitter meta tags to use `name="twitter:card"` etc. instead of `property`.
- **Verification Method**: Validate using Facebook Sharing Debugger and Twitter/X Card Validator.
- **Effort**: Small.

#### [FINDING-04] Missing Indexing Infrastructure (`robots.txt`, `sitemap.xml`, Canonical)
- **Category**: Technical SEO
- **Severity**: **High**
- **Affected Directory**: `public/` and `index.html`
- **Evidence**:
  - `public/robots.txt` does not exist. Requests to `https://feazto.com/robots.txt` return 404.
  - `public/sitemap.xml` does not exist.
  - `index.html` lacks `<link rel="canonical" href="https://feazto.com/" />`.
  - `index.html` lacks `<meta name="robots" content="index, follow" />`.
- **Impact**: Search engine crawlers cannot discover crawl directives or sitemaps; duplicate content indexing risks between `http`, `https`, `www`, and root domain.
- **Recommended Remediation**:
  Create `public/robots.txt` referencing `https://feazto.com/sitemap.xml`, create `public/sitemap.xml`, and add `<link rel="canonical">` to `index.html`.
- **Verification Method**: Fetch `/robots.txt` and `/sitemap.xml` using curl; inspect DOM for canonical tag.
- **Effort**: Small.

#### [FINDING-05] High Friction Call-To-Action (Mailto Link vs. Lead Capture Form)
- **Category**: UX / Lead Generation
- **Severity**: **High**
- **Affected File**: [`src/App.tsx#L257-L267`](file:///Users/rahulr/Documents/feazt/src/App.tsx#L257-L267)
- **Evidence**:
  ```tsx
  <a
    href="mailto:hello@feazto.com?subject=feazto%20Early%20Access%20Inquiry"
    className="contact-team-btn"
    id="contact-email-btn"
  >
  ```
  The primary CTA "Stay in the loop" jumps to `#notify-me`, which only contains a `mailto:` link. On modern web browsers (specifically desktop Chrome, Firefox, and Android devices without default mail clients configured), clicking a mailto link produces no response or an operating system error modal.
- **Impact**: Significant loss of prospective user leads and early-access interest during the critical pre-launch phase.
- **Recommended Remediation**:
  Implement a lightweight client-side waitlist email form (with email input, submit button, loading state, and success confirmation message) connected to a serverless endpoint (e.g. Formspree, Mailchimp, or Hostinger PHP webhook), keeping `mailto:hello@feazto.com` as secondary contact info.
- **Verification Method**: Test interactive form submission with valid and invalid email addresses.
- **Effort**: Medium.

---

### Medium Severity Findings

#### [FINDING-06] Absence of Core Service Pillars in Public Content (GEO & AI Readiness)
- **Category**: Content / GEO / Branding
- **Severity**: **Medium**
- **Affected File**: [`src/App.tsx`](file:///Users/rahulr/Documents/feazt/src/App.tsx)
- **Evidence**:
  Inspection of `src/App.tsx` shows poetic branding language ("authentic regional kitchens", "warmth of home", "flavours, kitchens, and stories"), but **zero mentions** of:
  - Regional Food Delivery
  - CareFe (Cloud Kitchens)
  - Book-a-Cook (On-Demand Cooks)
  - Fiso AI
- **Impact**: Generative search engines (Perplexity, ChatGPT Search, Gemini, Claude, Google AI Overviews) cannot identify Feazto's business model or service offerings, classifying it vaguely as an unidentifiable food blog or concept.
- **Recommended Remediation**:
  Add an informative preview section or expandable cards introducing the four pillars: Regional Delivery, CareFe Cloud Kitchens, Book-a-Cook services, and Fiso AI assistance.
- **Verification Method**: Content review against Feazto reference architecture documents.
- **Effort**: Medium.

#### [FINDING-07] Heavy Initial Image Weight (~2.2 MB PNGs) and Lack of Lazy Loading
- **Category**: Web Performance
- **Severity**: **Medium**
- **Affected Files**: [`src/App.tsx`](file:///Users/rahulr/Documents/feazt/src/App.tsx), `public/*.png`
- **Evidence**:
  Initial landing page loads 16 PNG images totaling $>2.2\text{ MB}$:
  - `skyline-doodle.png`: $537\text{ KB}$
  - `chariot-cutout.png`: $272\text{ KB}$
  - `doodle-biryani.png`: $221\text{ KB}$
  - `doodle-samosa.png`: $155\text{ KB}$
  - `kolam-brown-hd.png`: $130\text{ KB}$
  - None have `loading="lazy"` or `decoding="async"`.
  - No WebP or AVIF formats are used.
- **Impact**: Increased Largest Contentful Paint (LCP) and high data consumption on 3G/4G mobile connections.
- **Recommended Remediation**:
  Convert PNG assets to optimized WebP format (typically reducing size by 70–85%), add `loading="lazy"` and `decoding="async"` to below-the-fold images (`skyline-doodle.png`, `banana-tree-*.png`, `kolam-*.png`).
- **Verification Method**: Run Lighthouse Performance audit; measure transferred bytes in Network tab.
- **Effort**: Medium.

#### [FINDING-08] WebGL Canvas Heading Obscures H1 Text from Basic Crawlers
- **Category**: Technical SEO / Accessibility
- **Severity**: **Medium**
- **Affected Files**: [`src/App.tsx#L98-L126`](file:///Users/rahulr/Documents/feazt/src/App.tsx#L98-L126), [`src/components/WarpText.jsx#L694-L713`](file:///Users/rahulr/Documents/feazt/src/components/WarpText.jsx#L694-L713)
- **Evidence**:
  In `App.tsx`:
  `<h1 id="hero-main-title" className="grand-coming-soon-title"><WarpText text="COMING SOON" ... /></h1>`
  Inside `WarpText.jsx`, the text is rasterized to an HTML5 `<canvas>` via WebGL. The fallback DOM text `<span className="warp-text__fallback">` is only rendered if WebGL initialization fails (`failed === true`).
  Crawlers that do not execute WebGL shaders or parse `aria-label` see an empty `<h1>` container.
- **Impact**: Loss of search engine heading semantics.
- **Recommended Remediation**:
  Include a visually hidden, accessible DOM text span `<span className="sr-only">Feazto — Coming Soon</span>` inside the `<h1>` or alongside `WarpText` so search engines and assistive technology always find semantic text.
- **Verification Method**: Inspect page DOM with JavaScript disabled.
- **Effort**: Small.

#### [FINDING-09] Unused Runtime Dependency (`pngjs`) in Client Package
- **Category**: Architecture & Dependencies
- **Severity**: **Medium**
- **Affected File**: [`package.json#L14`](file:///Users/rahulr/Documents/feazt/package.json#L14)
- **Evidence**:
  `"pngjs": "^7.0.0"` is listed under `"dependencies"`. Grepping `src/` confirms zero occurrences of `pngjs`. It is a Node.js server-side PNG parsing library that has no role in client-side React code.
- **Impact**: Unnecessary dependency bloat and potential security audit false alarms.
- **Recommended Remediation**: Remove `"pngjs"` from `package.json` dependencies.
- **Verification Method**: Run `npm run build` after removal to ensure clean compilation.
- **Effort**: Small.

#### [FINDING-10] Missing Security and Caching Headers Configuration (`.htaccess`)
- **Category**: Security & Performance
- **Severity**: **Medium**
- **Affected Directory**: `public/`
- **Evidence**:
  No `.htaccess` file exists in `public/`. When deployed to Hostinger (Apache/LiteSpeed), default server settings will serve static files without Content Security Policy (CSP), `X-Frame-Options`, `X-Content-Type-Options`, or long-term caching headers for hashed assets in `/assets/`.
- **Impact**: Vulnerability to clickjacking, MIME-type sniffing, lack of HTTPS enforcement, and sub-optimal client caching.
- **Recommended Remediation**:
  Provide an optimized `.htaccess` in `public/` that enables HTTPS rewrite, sets security headers, and configures `Cache-Control: public, max-age=31536000, immutable` for `/assets/*` while enforcing `no-cache` on `index.html`.
- **Verification Method**: Inspect HTTP response headers using curl or browser DevTools.
- **Effort**: Small.

#### [FINDING-11] Continuous RAF Loop in WebGL Shaders Consumes CPU/GPU Idle
- **Category**: Performance / Battery
- **Severity**: **Medium**
- **Affected File**: [`src/components/WarpText.jsx#L597-L635`](file:///Users/rahulr/Documents/feazt/src/components/WarpText.jsx#L597-L635)
- **Evidence**:
  `WarpText.jsx` runs `requestAnimationFrame(loop)` continuously while visible. Even when the user is idle, it computes 4 octaves of Fractional Brownian Motion (`fbm`) per fragment across the full resolution canvas at 60/120 fps.
- **Impact**: Noticeable battery drain and thermal rise on laptops and mobile devices left open on the page.
- **Recommended Remediation**:
  Slow down animation loop or pause rendering when the pointer is inactive and intro settles, re-activating on mouse move or touch.
- **Verification Method**: Monitor GPU/CPU utilization in Chrome DevTools Performance panel.
- **Effort**: Medium.

---

### Low Severity Findings

#### [FINDING-12] Repository Root Cluttered with 42 Preview Screenshots (~20 MB)
- **Category**: Repository Hygiene
- **Severity**: **Low**
- **Affected Directory**: Repository Root (`/Users/rahulr/Documents/feazt/preview_*.png`)
- **Evidence**:
  42 files named `preview_*.png` (e.g. `preview_art_desktop.png` [1.5MB], `preview_enlarged_logo_desktop.png` [1.2MB]) totaling $\approx 20\text{ MB}$ are committed directly in the project root.
- **Impact**: Bloats git clone operations and repository size without serving any production purpose.
- **Recommended Remediation**: Move screenshots to an external design folder or add to `.gitignore` and remove from tracking.
- **Verification Method**: `git status` check.
- **Effort**: Small.

#### [FINDING-13] 18 Unused High-Resolution Images in `public/` (~5.5 MB Copied to `dist/`)
- **Category**: Build Output Hygiene
- **Severity**: **Low**
- **Affected Directory**: `public/`
- **Evidence**:
  Files such as `south-indian-art-bg.jpg` (1.1MB), `skyline-seamless.png` (693KB), `indian-art-cutout.png` (665KB), `indian-art-backdrop.png` (649KB), `plate-thali.png` (316KB), and `plate-biryani.png` (260KB) are present in `public/` but never imported or referenced in code. Vite copies all files in `public/` directly into `dist/`.
- **Impact**: Unnecessary build artifact size on Hostinger web server.
- **Recommended Remediation**: Prune unreferenced images from `public/` or archive them in a separate assets repository.
- **Verification Method**: Verify `dist/` file count and total size before and after.
- **Effort**: Small.

#### [FINDING-14] Oxlint Warnings in Codebase (Impure Render & State in Effect)
- **Category**: Code Quality
- **Severity**: **Low**
- **Affected Files**: [`src/App.tsx#L5`](file:///Users/rahulr/Documents/feazt/src/App.tsx#L5), [`src/components/WarpText.jsx#L446`](file:///Users/rahulr/Documents/feazt/src/components/WarpText.jsx#L446)
- **Evidence**:
  1. `src/App.tsx`: `const currentYear = new Date().getFullYear();` triggers `react(purity)` because `new Date()` is evaluated during component render.
  2. `src/components/WarpText.jsx`: `setFailed(true)` called synchronously within `useEffect` catch block triggers `react(set-state-in-effect)`.
- **Impact**: May interfere with future React Compiler memoization.
- **Recommended Remediation**:
  1. Define `const currentYear = new Date().getFullYear();` outside the `App` component function.
  2. Guard `setFailed` or handle error boundary appropriately.
- **Verification Method**: Run `npm run lint`.
- **Effort**: Small.

#### [FINDING-15] Orphaned Legacy Assets Directory (`src/assets/`)
- **Category**: Code Cleanliness
- **Severity**: **Low**
- **Affected Directory**: `src/assets/`
- **Evidence**:
  `src/assets/` contains `react.svg`, `vite.svg`, `hero.png`, `feazto-logo.png`, `feazto-logo-transparent.png`, and `indian-art-backdrop.png`. None are imported in any `.tsx` or `.css` file.
- **Impact**: Developer confusion and wasted storage.
- **Recommended Remediation**: Delete orphaned files in `src/assets/`.
- **Verification Method**: Search codebase for `src/assets`.
- **Effort**: Small.

#### [FINDING-16] Package Name Spelling Typo in `package.json`
- **Category**: Configuration
- **Severity**: **Low**
- **Affected File**: [`package.json#L2`](file:///Users/rahulr/Documents/feazt/package.json#L2)
- **Evidence**:
  `"name": "feazto-comming-soon-portal"` (spelled with double 'm').
- **Impact**: Minor aesthetic inconsistency in project metadata.
- **Recommended Remediation**: Update to `"name": "feazto-coming-soon-portal"`.
- **Verification Method**: Inspect `package.json`.
- **Effort**: Small.

---

## 4. Prioritized Remediation Summary

```
+---------------------------------------------------------------------------------------+
| PHASE 1: PRE-LAUNCH BLOCKERS (Immediate)                                              |
| 1. Fix contrast failure on "SOON" (#121212 or high-contrast underlay) [FINDING-01]    |
| 2. Constrain/hide mobile banana trees to prevent card overlap [FINDING-02]            |
| 3. Fix Open Graph / Twitter image URLs to absolute https://feazto.com/ [FINDING-03]   |
| 4. Create robots.txt, sitemap.xml, and add canonical tag [FINDING-04]                 |
| 5. Add .htaccess for HTTPS redirects, security headers, and caching [FINDING-10]      |
+---------------------------------------------------------------------------------------+
                                           |
                                           v
+---------------------------------------------------------------------------------------+
| PHASE 2: SEO, GEO & CONVERSION ENHANCEMENTS (Pre-Deployment)                          |
| 6. Replace mailto link with interactive waitlist email capture form [FINDING-05]      |
| 7. Introduce the 4 core pillars (Delivery, CareFe, Book-a-Cook, Fiso AI) [FINDING-06] |
| 8. Add Schema.org JSON-LD (Organization, WebSite) and hidden H1 text [FINDING-08]     |
| 9. Convert images to WebP and enable lazy loading on below-the-fold assets [FINDING-07]|
+---------------------------------------------------------------------------------------+
                                           |
                                           v
+---------------------------------------------------------------------------------------+
| PHASE 3: CODEBASE & REPOSITORY POLISH (Maintenance)                                   |
| 10. Remove unused `pngjs` dependency from package.json [FINDING-09]                   |
| 11. Prune unused images from public/ and delete orphaned src/assets/ [FINDING-13, 15] |
| 12. Fix Oxlint warnings and package name typo [FINDING-14, 16]                        |
| 13. Move 42 root preview screenshots out of repository [FINDING-12]                   |
+---------------------------------------------------------------------------------------+
```

---
*Report generated and validated against local codebase `/Users/rahulr/Documents/feazt`.*
