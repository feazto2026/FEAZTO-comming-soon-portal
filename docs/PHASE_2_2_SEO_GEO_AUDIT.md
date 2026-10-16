# Feazto Phase 2.2 — Comprehensive SEO, GEO, and Production Readiness Audit

**Project:** Feazto Coming Soon Portal
**Target Canonical URL:** `https://feazto.com/`
**Production Host:** Vercel Edge Network
**Technology Stack:** React 19 + TypeScript + Vite (Client-Side Rendered SPA)
**Audit Date:** October 2026
**Auditor Role:** Senior Software Architect, Technical SEO Specialist, GEO/AEO Engineer, Performance & Accessibility Reviewer
**Audit Mode:** Inspection & Evidence-Based Audit Only (Zero Code/Infrastructure Changes)

---

## 1. Executive Summary

Following the deployment of Phase 2.1 to GitHub and Vercel, this Phase 2.2 audit conducts a comprehensive evaluation of Technical SEO, Generative Engine Optimization (GEO/AEO), Search Console readiness, Core Web Vitals, accessibility, and content architecture.

The foundation established in Phase 2.1 is strong:
- SSL/TLS is active via Let's Encrypt (valid through January 2027).
- Vercel production headers (`X-Content-Type-Options`, `X-Frame-Options`, `Referrer-Policy`, `Permissions-Policy`, and CSP) are verified active on live HTTP responses.
- All 15 illustration assets have been converted to WebP with RGBA transparency, saving **52.7% (1.14 MB)** of artwork payload.
- Contact email is consolidated to `feazto26@gmail.com` with obsolete addresses eliminated.
- Brand social card (`public/og-image.png`, 1200×630) and `public/llms.txt` exist and are accessible live.

However, this audit has uncovered **5 primary areas of improvement** that must be addressed to maximize indexation speed, search ranking, and AI answer engine discovery:
1. **Critical Canonical-Redirect Conflict**: Live apex `https://feazto.com` returns HTTP 308 redirecting to `https://www.feazto.com/`, while all page tags, Open Graph, and sitemaps declare `https://feazto.com/` as canonical.
2. **Client-Side Rendering (CSR) Indexing Delay**: `<div id="root"></div>` in raw HTML is empty. Raw HTTP crawlers and AI summarizers that do not execute a headless JavaScript browser see zero plain-text body content.
3. **Content Asymmetry (Core Pillars Missing from Landing Page)**: While `llms.txt` outlines the 4 planned concepts (*Regional Food Delivery, CareFe, Book-a-Cook, Fiso AI*), the visible homepage contains only poetic tagline copy.
4. **Structured Data Enrichment**: JSON-LD lacks `description`, `slogan`, and `inLanguage` properties in the `Organization` and `WebSite` schemas.
5. **Crawl Optimization**: `sitemap.xml` lacks the `<lastmod>` timestamp, and `index.html` does not provide an HTML `<link>` tag pointing to `llms.txt`.

---

## 2. Evidence-Based Audit Findings

### A. Technical SEO Audit

#### [FINDING-01] Critical Canonical-Redirect Mismatch on Vercel
- **Category**: Technical SEO / Indexation Architecture
- **Severity**: **Critical**
- **Affected Endpoints**: `https://feazto.com/` & `https://www.feazto.com/`
- **Evidence**:
  Running a live HTTP inspection reveals:
  ```bash
  $ curl -sI https://feazto.com
  HTTP/2 308
  location: https://www.feazto.com/

  $ curl -sI https://www.feazto.com
  HTTP/2 200
  # Serving HTML with:
  <link rel="canonical" href="https://feazto.com/" />
  ```
- **Analysis**:
  There is a direct conflict between the infrastructure routing and the document metadata:
  - The web server directs clients: *"The real URL is `www.feazto.com`"* (via 308 Permanent Redirect).
  - The document canonical tag informs search engines: *"The real URL is `feazto.com`"* (via `<link rel="canonical">`).
  - Google Search Console will flag this as *"Page with redirect"* or *"Duplicate without user-selected canonical"*, delaying or preventing clean indexation of the apex domain.
- **Root Cause**:
  In Vercel Project Settings > Domains, `www.feazto.com` is configured as the "Production/Primary Domain" and `feazto.com` is set to redirect to `www`.
- **Recommended Remediation**:
  The project owner must switch the Primary Domain in the Vercel Dashboard to `feazto.com` and set `www.feazto.com` to redirect permanently (308) to `feazto.com`.

---

#### [FINDING-02] Empty Raw HTML Body in Client-Side Rendered (CSR) SPA
- **Category**: Crawlability / Rendering Budget
- **Severity**: **High**
- **Affected File**: [`index.html#L72-L75`](file:///Users/rahulr/Documents/feazt/index.html#L72-L75)
- **Evidence**:
  Inspecting the initial raw HTML returned before JavaScript execution:
  ```html
  <body>
    <div id="root"></div>
    <script type="module" src="/src/main.tsx"></script>
  </body>
  ```
- **Analysis**:
  - Googlebot uses a two-phase indexing pipeline: Phase 1 indexes raw HTML; Phase 2 (Web Rendering Service) executes JavaScript via headless Chromium when resources allow.
  - Basic scrapers, social crawlers (Telegram, Discord, Twitterbot), and many AI crawler agents (GPTBot, ClaudeBot, PerplexityBot) parse raw HTTP response bodies without executing JavaScript.
  - Because `<div id="root">` is empty in raw HTML, these crawlers extract only `<title>` and `<meta name="description">`, seeing zero on-page body text.
- **Recommended Remediation**:
  Provide an accessible, semantic HTML fallback inside `<div id="root">` or a `<noscript>` block in `index.html` summarizing Feazto's identity, tagline, and planned concepts. When React mounts, `createRoot().render()` cleanly hydrates or replaces this container.

---

#### [FINDING-03] Heading Hierarchy Association in Hero Section
- **Category**: On-Page SEO / Semantic Heading Structure
- **Severity**: **Medium**
- **Affected File**: [`src/App.tsx#L107-L136`](file:///Users/rahulr/Documents/feazt/src/App.tsx#L107-L136)
- **Evidence**:
  ```tsx
  <h1 id="hero-main-title" className="grand-coming-soon-title">
    <span className="sr-only">COMING SOON</span>
    <WarpText text="COMING SOON" ... />
  </h1>
  ```
- **Analysis**:
  The primary `<h1>` tag carries the text `"COMING SOON"`. From a search engine perspective, the `<h1>` defines the single most important topic of the webpage. `"COMING SOON"` communicates a temporal status, but fails to identify the entity name ("Feazto") or its core industry ("Regional Food & Culinary Connection").
- **Recommended Remediation**:
  Enrich the accessible text inside the `<h1>` tag:
  ```tsx
  <h1 id="hero-main-title" className="grand-coming-soon-title">
    <span className="sr-only">Feazto — Food, Culture, Connect | Coming Soon</span>
    <WarpText text="COMING SOON" ... />
  </h1>
  ```

---

#### [FINDING-04] Incomplete Knowledge Graph Properties in Schema.org JSON-LD
- **Category**: Structured Data / Semantic Web
- **Severity**: **Medium**
- **Affected File**: [`index.html#L43-L70`](file:///Users/rahulr/Documents/feazt/index.html#L43-L70)
- **Evidence**:
  ```json
  {
    "@type": "Organization",
    "@id": "https://feazto.com/#organization",
    "name": "Feazto",
    "url": "https://feazto.com/",
    "email": "feazto26@gmail.com",
    "logo": { "@type": "ImageObject", "url": "https://feazto.com/feazto-logo-transparent.png" },
    "image": "https://feazto.com/og-image.png"
  }
  ```
- **Analysis**:
  The JSON-LD provides verified properties, but omits key standard schema attributes that Google's Knowledge Graph uses for entity disambiguation:
  - `description`: Missing from both `Organization` and `WebSite`.
  - `slogan`: Missing (`"Food • Culture • Connect"`).
  - `inLanguage`: Missing (`"en"`).
- **Recommended Remediation**:
  Add verified `description`, `slogan`, and `inLanguage` properties without fabricating address or phone data.

---

#### [FINDING-05] Missing `<lastmod>` Timestamp in `sitemap.xml`
- **Category**: Crawl Budget / Recrawl Optimization
- **Severity**: **Low**
- **Affected File**: [`public/sitemap.xml#L1-L9`](file:///Users/rahulr/Documents/feazt/public/sitemap.xml#L1-L9)
- **Evidence**:
  ```xml
  <url>
    <loc>https://feazto.com/</loc>
    <changefreq>monthly</changefreq>
    <priority>1.0</priority>
  </url>
  ```
- **Analysis**:
  Search engines largely ignore `<priority>` and `<changefreq>`, but actively prioritize URLs based on valid W3C Datetime `<lastmod>` tags (e.g. `2026-10-16`). Without `<lastmod>`, Googlebot cannot determine if the page has changed since its last crawl pass.
- **Recommended Remediation**:
  Include `<lastmod>2026-10-16</lastmod>` (or the current build date) in `public/sitemap.xml`.

---

### B. Search Console Readiness Audit

#### [FINDING-06] Distinguishing "Live Test" from Actual Google Indexing
- **Category**: Search Console Operations
- **Severity**: **Informational / Operational**
- **Context**: The owner reported: *"homepage live URL test reports successful fetching, crawling allowed, and indexing allowed. The homepage indexing request has been submitted; actual indexing is not yet confirmed."*
- **Analysis & Educational Guidance for Owner**:
  1. **What "Test Live URL" Means**:
     - The "Test Live URL" feature sends an on-demand probe to your server.
     - A result of *"URL is available to Google"* only means: HTTP status was 200/308, no `noindex` tag was present, robots.txt permitted access, and Googlebot was able to fetch the file.
     - **It is NOT confirmation that the page is in Google's search index.**
  2. **What "Indexing Request" Means**:
     - Submitting an indexing request merely queues the URL in Google's crawl backlog.
     - For new domains without an established backlink profile, Google does not guarantee an immediate crawl. Indexing typically takes between **24 hours and 7 days**, and can take longer if canonical conflicts exist.
  3. **How to Verify True Indexing**:
     - Check the **Google Index tab** in URL Inspection (not the "Test Live URL" tab). It must state: **"URL is on Google"**.
     - Perform a search in Google: `site:feazto.com`. If results appear, the page is indexed.
  4. **Key Reports to Monitor in Search Console**:
     - **Pages (Page Indexing) Report**: Monitor whether the URL transitions from "Discovered - currently not indexed" or "Page with redirect" to "Indexed".
     - **Sitemaps Report**: Confirm status is "Success" with 1 discovered URL.
     - **Security & Manual Actions**: Confirm "No issues detected".

---

### C. Generative Engine Optimization (GEO) & AI Discoverability

#### [FINDING-07] Content Asymmetry Between `llms.txt` and Visible Webpage
- **Category**: GEO / Answer Engine Optimization (AEO)
- **Severity**: **High**
- **Affected Files**: [`public/llms.txt`](file:///Users/rahulr/Documents/feazt/public/llms.txt) vs [`src/App.tsx`](file:///Users/rahulr/Documents/feazt/src/App.tsx)
- **Evidence**:
  - `public/llms.txt` describes Feazto through 4 distinct service concepts:
    1. *Regional Food Delivery* (discovery of regional cuisine and local food creators)
    2. *CareFe* (cloud kitchen concept for curated food concepts)
    3. *Book-a-Cook* (on-demand culinary professionals)
    4. *Fiso AI* (personalized culinary search and recommendations)
  - The rendered homepage in `src/App.tsx` contains none of these names or descriptions. It features only:
    - *"A new food experience is on its way"*
    - *"More than a meal. A connection to home."*
    - *"Stay connected and be among the first to hear when feazto is ready."*
- **Analysis**:
  - Generative search engines (Perplexity, SearchGPT, Claude, Gemini) cross-correlate machine-readable files (`llms.txt`, JSON-LD) against actual DOM content to assess factual authenticity and prevent hallucinations.
  - If `llms.txt` claims Feazto provides CareFe, Book-a-Cook, and Fiso AI, but the landing page does not mention these services anywhere, AI engines downgrade confidence in the entity data.
- **Recommended Remediation**:
  Add an elegant "Planned Concepts" or "What We're Building" section to the homepage introducing the 4 pillars with transparent pre-launch language (e.g. *"Upcoming Services"* / *"In Development"*).

---

#### [FINDING-08] Missing Discoverability Link to `llms.txt` in HTML Head
- **Category**: AI Discoverability / Semantic Link Relations
- **Severity**: **Low**
- **Affected File**: [`index.html`](file:///Users/rahulr/Documents/feazt/index.html)
- **Evidence**:
  `public/llms.txt` exists and returns HTTP 200, but is not referenced in `index.html`.
- **Analysis**:
  While some AI scrapers check standard `/llms.txt` paths by default, many parsers only discover auxiliary documents through HTML link relations.
- **Recommended Remediation**:
  Add a link tag to `index.html`:
  ```html
  <link rel="alternate" type="text/plain" href="https://feazto.com/llms.txt" title="LLM Context" />
  ```

---

### D. Performance, Accessibility & Asset Hygiene

#### [FINDING-09] 23 Unused Legacy Image Assets (6.1 MB) Bloating Public Directory
- **Category**: Repository Hygiene / Build Output Size
- **Severity**: **Medium**
- **Affected Directory**: [`public/`](file:///Users/rahulr/Documents/feazt/public)
- **Evidence**:
  Vite copies all files in `public/` directly into `dist/` during `vite build`. The following 23 legacy uncompressed PNG/JPG files exist in `public/` and are copied to `dist/`, but are never referenced in `App.tsx` or `App.css`:
  - `banana-tree-half.png` (110 KB)
  - `banana-tree-left.png` (109 KB)
  - `banana-tree-right.png` (109 KB)
  - `chariot-cutout.png` (272 KB)
  - `doodle-biryani.png` (221 KB)
  - `doodle-chai.png` (136 KB)
  - `doodle-dosa.png` (123 KB)
  - `doodle-idli.png` (113 KB)
  - `doodle-naan.png` (132 KB)
  - `doodle-samosa.png` (155 KB)
  - `indian-art-backdrop.png` (649 KB)
  - `indian-art-cutout.png` (665 KB)
  - `indian-art-no-text.png` (558 KB)
  - `indian-art-reference.png` (649 KB)
  - `kolam-1.png` (57 KB)
  - `kolam-2.png` (42 KB)
  - `kolam-3.png` (69 KB)
  - `kolam-brown.png` (8.4 KB)
  - `plate-biryani.png` (260 KB)
  - `plate-idli.png` (113 KB)
  - `plate-samosa.png` (154 KB)
  - `plate-thali.png` (316 KB)
  - `skyline-seamless.png` (693 KB)
  - `south-indian-art-bg.jpg` (1.1 MB)
  **Total unreferenced payload: 6.1 MB**.
- **Impact**:
  While users only download assets requested by the HTML/CSS, these unreferenced files lengthen build times and unnecessarily inflate the deployment archive.
- **Recommended Remediation**:
  Prune or move unreferenced legacy PNG/JPG assets out of `public/` into an archive folder or delete them.

---

#### [FINDING-10] Unused Dependencies in `package.json`
- **Category**: Dependency Maintenance / Security Footprint
- **Severity**: **Low**
- **Affected File**: [`package.json#L12-L17`](file:///Users/rahulr/Documents/feazt/package.json#L12-L17)
- **Evidence**:
  ```json
  "dependencies": {
    "ogl": "^1.0.11",
    "pngjs": "^7.0.0",
    "react": "^19.2.8",
    "react-dom": "^19.2.8"
  }
  ```
  Codebase search confirms `pngjs` is not imported anywhere in `src/`.
- **Analysis**:
  Unused dependencies increase supply-chain audit surface area without providing application value. (Vite tree-shakes it from the client bundle, so it does not affect end-user bundle size).
- **Recommended Remediation**:
  Remove `pngjs` from `dependencies` via `npm uninstall pngjs`.

---

#### [FINDING-11] 42 Root Directory Preview Screenshots Tracked in Git
- **Category**: Repository Hygiene
- **Severity**: **Low**
- **Affected Location**: Repository root (`preview_*.png`)
- **Evidence**:
  `git ls-files preview_*.png` lists 42 files totaling ~25 MB in the repository root.
- **Analysis**:
  These screenshots are not in `public/` (so they are not included in `dist/`), but they bloat repository clone times and create visual noise in the project root.
- **Recommended Remediation**:
  Move screenshots to a dedicated `docs/screenshots/` directory or add them to an asset archive branch.

---

#### [FINDING-12] Core Web Vitals: Lab Metrics vs Real-User Field Data
- **Category**: Web Performance / User Experience
- **Severity**: **Informational**
- **Analysis & Educational Guidance**:
  - **Lab Data (Lighthouse / PageSpeed Insights)**: Measures synthetic page performance in a simulated mobile/desktop environment with throttled CPU and 4G network. Useful for diagnosing rendering bottlenecks, bundle sizes, and unused CSS/JS.
  - **Field Data (Chrome User Experience Report - CrUX / Core Web Vitals)**: Measures actual performance experienced by real-world Chrome users over a 28-day rolling window:
    - **LCP (Largest Contentful Paint)**: Target $\le 2.5\text{s}$. (In Feazto, LCP is either the hero logo or chariot visual; both are eagerly loaded with `decoding="async"`).
    - **INP (Interaction to Next Paint)**: Target $\le 200\text{ms}$. (Feazto has minimal JS interaction beyond WarpText pointer events).
    - **CLS (Cumulative Layout Shift)**: Target $\le 0.1$. (Hero logo, chariot, and images have explicit `width` and `height` attributes, preventing layout shifts).
  - **Current Status**: As a brand-new domain, `feazto.com` will not have CrUX field data until sufficient real-world Chrome user visits accumulate over 28 days.

---

## 3. Prioritized Classification of Findings

| ID | Finding Description | Severity | Target Area |
| :---: | :--- | :---: | :--- |
| **01** | Apex vs WWW redirect conflict on Vercel (308 to www vs canonical to apex) | **Critical** | Technical SEO / Vercel |
| **02** | Empty raw HTML body (`<div id="root">`) impairs non-JS crawlers & AI bots | **High** | Technical SEO / GEO |
| **07** | Information asymmetry: 4 core pillars in `llms.txt` absent from homepage | **High** | GEO / Content Strategy |
| **03** | Primary H1 tag contains only `"COMING SOON"` without entity branding | **Medium** | On-Page SEO |
| **04** | Schema.org JSON-LD missing `description`, `slogan`, and `inLanguage` | **Medium** | Structured Data |
| **09** | 23 unreferenced legacy images (6.1 MB) copied to `dist/` build output | **Medium** | Build & Asset Hygiene |
| **05** | `sitemap.xml` missing `<lastmod>` timestamp | **Low** | Crawl Optimization |
| **08** | Missing `<link rel="alternate">` tag in HTML `<head>` for `llms.txt` | **Low** | GEO Discovery |
| **10** | Unused `pngjs` dependency in `package.json` | **Low** | Dependency Hygiene |
| **11** | 42 preview screenshots in root directory | **Low** | Repository Hygiene |

---

## 4. Prioritized Remediation Plan

### Phase 2.3 — Critical Infrastructure & SEO Alignment (Immediate)
1. **Resolve Vercel Domain Configuration (Owner Action)**:
   - Navigate to Vercel Dashboard > Feazto Project > Settings > Domains.
   - Designate `feazto.com` (apex) as **Primary Domain**.
   - Set `www.feazto.com` to **Redirect to feazto.com** (308 Permanent).
   - *Acceptance Criteria*: `curl -sI https://feazto.com` returns `HTTP/2 200`, and `curl -sI https://www.feazto.com` returns `HTTP/2 308` redirecting to `https://feazto.com/`.

2. **Add Raw HTML Fallback in `index.html`**:
   - Provide clean semantic fallback HTML inside `<div id="root">` containing Feazto's branding, tagline, mission statement, and planned concepts.
   - *Acceptance Criteria*: `curl -sL https://feazto.com` shows readable body text even with JavaScript completely disabled.

3. **Enrich Structured Data & Heading Association**:
   - Update Schema.org JSON-LD with verified `description`, `slogan`, and `inLanguage`.
   - Update H1 accessible screen-reader text to `"Feazto — Food, Culture, Connect | Coming Soon"`.
   - Add `<lastmod>` to `sitemap.xml` and `<link rel="alternate">` for `llms.txt` to `index.html`.

### Phase 2.4 — GEO & Content Enrichment
1. **Introduce "Upcoming Concepts" Homepage Section**:
   - Add an accessible, responsive teaser card grid on the landing page representing the 4 core concepts:
     1. *Regional Food Delivery* (Heritage recipes, authentic home creators)
     2. *CareFe Cloud Kitchens* (Curated regional culinary concepts)
     3. *Book-a-Cook* (Verified on-demand culinary talent)
     4. *Fiso AI* (Smart culinary discovery & dish recommendations)
   - Preserve existing visual aesthetics, color palette (`#F8B504`), and kolam motifs.
   - Strictly frame all 4 services as upcoming/planned concepts.

### Phase 2.5 — Repository Hygiene & Dependency Cleanup
1. **Prune Unused Assets**: Delete or archive 23 unreferenced legacy PNG/JPG files from `public/`.
2. **Clean Dependencies**: Remove unused `pngjs` from `package.json`.
3. **Organize Root Directory**: Relocate root preview PNGs to `docs/screenshots/`.

---

## 5. Manual Checks Requiring Owner Access

The following verification steps cannot be executed by an automated agent and require the owner's credentials:

1. **Vercel Dashboard Domain Routing**:
   - **Where**: [vercel.com](https://vercel.com) > Project > Settings > Domains.
   - **Check**: Verify whether `feazto.com` or `www.feazto.com` has the "Production" badge. Ensure `feazto.com` is primary.
2. **Google Search Console Indexing Status**:
   - **Where**: [search.google.com/search-console](https://search.google.com/search-console).
   - **Check 1**: URL Inspection > Enter `https://feazto.com/` > View "Google Index" tab (not Live Test) to confirm whether the page has been indexed.
   - **Check 2**: Sitemaps report > Confirm `https://feazto.com/sitemap.xml` has status "Success" with 1 discovered URL.
   - **Check 3**: Page Indexing report > Check for any "Page with redirect" or "Excluded" notices.
3. **Google Search Query Test**:
   - Query: `site:feazto.com` in Google Search. If the title and meta description appear in the results, the page is indexed.

---

## 6. Items That Cannot Be Verified From Repository Alone

1. **Google Indexing Timeframe**: Google determines crawl frequency dynamically; no repository file can force instant indexing.
2. **Vercel Analytics & Real-User Performance (CrUX)**: Field Core Web Vitals require real user traffic over 28 days.
3. **Third-Party Email Inbox State**: DNS records verify that `feazto.com` has no MX records, confirming `feazto26@gmail.com` was the right choice. Verification that Gmail is actively receiving mail depends on the owner's Google account.

---
*Report generated and validated for Feazto Coming Soon Portal.*
