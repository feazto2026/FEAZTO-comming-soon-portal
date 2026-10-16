# FEAZTO COMING SOON WEBSITE — PRIORITIZED REMEDIATION PLAN

**Target Domain**: `https://feazto.com`  
**Hosting Target**: Hostinger  
**Implementation Methodology**: Phased, Non-Destructive Remediation

---

## 1. Remediation Roadmap Overview

The remediation tasks are sequenced into three distinct phases based on severity and launch dependencies:

```
[ PHASE 1: Pre-Launch Blockers ] ──> [ PHASE 2: SEO, GEO & UX ] ──> [ PHASE 3: Polish & Hygiene ]
- Contrast fix on "SOON"             - Waitlist lead capture form   - Prune unused images
- Mobile banana trees fix            - Add 4 core service pillars   - Remove pngjs dependency
- Fix absolute OG image URLs         - Convert assets to WebP       - Clean root screenshots
- Add robots.txt & sitemap.xml       - Add Schema.org JSON-LD       - Resolve Oxlint warnings
- Add Hostinger .htaccess            - Accessible H1 heading text   - Fix package name typo
```

---

## 2. Phase 1 — Pre-Launch Blockers (Immediate Execution)

### Task 1.1: Fix Contrast Failure on Hero Heading "SOON" [FINDING-01]
- **Severity**: Critical
- **Estimated Effort**: Small (10 minutes)
- **Dependencies**: None
- **Affected File**: [`src/App.tsx#L101-L104`](file:///Users/rahulr/Documents/feazt/src/App.tsx#L101-L104)
- **Implementation**:
  Update segment color from `#FFFFFF` (1.84:1 contrast on yellow) to `#121212` (9.8:1 contrast on yellow):
  ```tsx
  segments={[
    { text: 'COMING ', color: '#121212' },
    { text: 'SOON', color: '#121212' }
  ]}
  ```
- **Verification**: Run WebAIM Contrast Checker to verify ratio $>4.5:1$.

---

### Task 1.2: Constrain Mobile Banana Tree Illustrations [FINDING-02]
- **Severity**: High
- **Estimated Effort**: Small (15 minutes)
- **Dependencies**: None
- **Affected File**: [`src/App.css#L534-L557`](file:///Users/rahulr/Documents/feazt/src/App.css#L534-L557)
- **Implementation**:
  Add responsive media query rules in `src/App.css`:
  ```css
  @media (max-width: 900px) {
    .showcase-tree {
      height: clamp(400px, 60vh, 650px);
      opacity: 0.22;
    }
    .tree-left { left: -60px; }
    .tree-right { right: -60px; }
  }

  @media (max-width: 600px) {
    .showcase-border-trees {
      display: none; /* Prevents visual collision with statement and contact cards */
    }
  }
  ```
- **Verification**: Test viewports 320px, 375px, 414px in browser DevTools.

---

### Task 1.3: Fix Open Graph & Twitter Social Image Absolute URLs [FINDING-03]
- **Severity**: High
- **Estimated Effort**: Small (10 minutes)
- **Dependencies**: None
- **Affected File**: [`index.html#L21-L28`](file:///Users/rahulr/Documents/feazt/index.html#L21-L28)
- **Implementation**:
  Update Open Graph and Twitter tags in `index.html` to point to `https://feazto.com/feazto-logo-transparent.png` (or dedicated 1200x630 OG image) and use `name="twitter:card"` etc.
- **Verification**: Test in Facebook Sharing Debugger and Twitter Card Validator.

---

### Task 1.4: Add Indexing Infrastructure (`robots.txt` & `sitemap.xml`) [FINDING-04]
- **Severity**: High
- **Estimated Effort**: Small (15 minutes)
- **Dependencies**: None
- **Affected Files**: `public/robots.txt`, `public/sitemap.xml`, [`index.html`](file:///Users/rahulr/Documents/feazt/index.html)
- **Implementation**:
  1. Create `public/robots.txt` with standard crawler permissions and sitemap link.
  2. Create `public/sitemap.xml` with canonical entry `https://feazto.com/`.
  3. Add `<link rel="canonical" href="https://feazto.com/" />` to `index.html`.
- **Verification**: Run `npm run build` and verify files are copied to `dist/`.

---

### Task 1.5: Configure Hostinger Server Rules (`.htaccess`) [FINDING-10]
- **Severity**: Medium
- **Estimated Effort**: Small (20 minutes)
- **Dependencies**: None
- **Affected File**: `public/.htaccess`
- **Implementation**:
  Create `public/.htaccess` containing:
  - 301 Redirect HTTP -> HTTPS
  - 301 Redirect www -> non-www
  - Security headers (CSP, X-Frame-Options, X-Content-Type-Options)
  - Browser caching rules (`max-age=31536000` for `/assets/*`, `no-cache` for `index.html`)
  - Gzip/Deflate compression
- **Verification**: Test response headers using `curl -I`.

---

## 3. Phase 2 — SEO, GEO & Conversion Enhancements

### Task 2.1: Implement Client-Side Waitlist Email Capture Form [FINDING-05]
- **Severity**: High
- **Estimated Effort**: Medium (45 minutes)
- **Dependencies**: Approved endpoint (e.g. Formspree, Mailchimp webhook, or simple PHP mailer)
- **Affected File**: [`src/App.tsx#L256-L268`](file:///Users/rahulr/Documents/feazt/src/App.tsx#L256-L268)
- **Implementation**:
  Replace or supplement the current `mailto:` link with an interactive email input field:
  - Email input with regex validation
  - Submit button with loading spinner
  - Accessible success and error states
  - Fallback to `mailto:hello@feazto.com`
- **Verification**: Submit test emails and verify confirmation message.

---

### Task 2.2: Add High-Level Service Preview Cards (GEO & AI Readiness) [FINDING-06]
- **Severity**: Medium
- **Estimated Effort**: Medium (40 minutes)
- **Dependencies**: Brand owner approval of copy
- **Affected Files**: [`src/App.tsx`](file:///Users/rahulr/Documents/feazt/src/App.tsx), [`src/App.css`](file:///Users/rahulr/Documents/feazt/src/App.css)
- **Implementation**:
  Add a clean, accessible 4-card or 4-bullet grid introducing Feazto's core offerings:
  1. **Regional Food Delivery**: Authentic regional kitchens and local food creators.
  2. **CareFe**: Community cloud kitchens bringing culinary concepts to life.
  3. **Book-a-Cook**: On-demand cooks for gatherings, events, and everyday meals.
  4. **Fiso AI**: Intelligent dish discovery and culinary recommendations.
- **Verification**: Review page copy against Reference Architecture document.

---

### Task 2.3: Add Schema.org JSON-LD Structured Data & Semantic H1 [FINDING-08]
- **Severity**: Medium
- **Estimated Effort**: Small (20 minutes)
- **Dependencies**: None
- **Affected Files**: [`index.html`](file:///Users/rahulr/Documents/feazt/index.html), [`src/App.tsx`](file:///Users/rahulr/Documents/feazt/src/App.tsx)
- **Implementation**:
  1. Insert Schema.org `Organization` and `WebSite` JSON-LD blocks in `index.html`.
  2. Add `<span className="sr-only">Feazto — Food, Culture, Connect | Coming Soon</span>` inside `<h1>` in `src/App.tsx`.
- **Verification**: Validate with Google Rich Results Test.

---

### Task 2.4: Image Optimization & Lazy Loading [FINDING-07]
- **Severity**: Medium
- **Estimated Effort**: Medium (30 minutes)
- **Dependencies**: None
- **Affected Files**: [`src/App.tsx`](file:///Users/rahulr/Documents/feazt/src/App.tsx), `public/`
- **Implementation**:
  1. Add `loading="lazy"` and `decoding="async"` to all below-the-fold images (`skyline-doodle.png`, `banana-tree-*.png`, `kolam-*.png`).
  2. Convert heavy PNG files to modern `.webp` format (reduces image payload from 2.2MB to ~450KB).
- **Verification**: Measure bundle transfer size in Chrome Network tab.

---

## 4. Phase 3 — Codebase Polish & Repository Hygiene

### Task 3.1: Remove Unused Runtime Dependency (`pngjs`) [FINDING-09]
- **Severity**: Medium
- **Estimated Effort**: Small (5 minutes)
- **Dependencies**: None
- **Affected File**: [`package.json#L14`](file:///Users/rahulr/Documents/feazt/package.json#L14)
- **Implementation**:
  Run `npm uninstall pngjs`.
- **Verification**: Run `npm run build` to confirm zero regressions.

---

### Task 3.2: Prune Unused Images in `public/` and Clean `src/assets/` [FINDING-13, 15]
- **Severity**: Low
- **Estimated Effort**: Small (15 minutes)
- **Dependencies**: None
- **Affected Directories**: `public/`, `src/assets/`
- **Implementation**:
  1. Remove 18 unreferenced images in `public/` (`south-indian-art-bg.jpg`, `skyline-seamless.png`, `plate-*.png`, `indian-art-*.png`).
  2. Delete unused files in `src/assets/`.
- **Verification**: Check `dist/` size after `npm run build` (should drop by ~5.5 MB).

---

### Task 3.3: Resolve Oxlint Code Warnings [FINDING-14]
- **Severity**: Low
- **Estimated Effort**: Small (10 minutes)
- **Dependencies**: None
- **Affected Files**: [`src/App.tsx#L5`](file:///Users/rahulr/Documents/feazt/src/App.tsx#L5), [`src/components/WarpText.jsx#L446`](file:///Users/rahulr/Documents/feazt/src/components/WarpText.jsx#L446)
- **Implementation**:
  1. Move `const currentYear = new Date().getFullYear();` outside component body to ensure render purity.
  2. Resolve state setter within effect catch block in `WarpText.jsx`.
- **Verification**: Run `npm run lint` and verify 0 warnings.

---

### Task 3.4: Move 42 Root Screenshots out of Git Root [FINDING-12]
- **Severity**: Low
- **Estimated Effort**: Small (10 minutes)
- **Dependencies**: None
- **Implementation**:
  Move `preview_*.png` files into an ignored design archive directory or remove from tracking.
- **Verification**: Verify clean root directory listing.

---

## 5. Verification Matrix Summary

| Task ID | Item | Primary Success Metric | Tool / Method |
|---|---|---|---|
| **1.1** | Contrast Fix | Contrast $\ge 4.5:1$ on all text | WebAIM Contrast Tool |
| **1.2** | Mobile Banana Trees | Zero overlap on screens $<600\text{ px}$ | Chrome DevTools Responsive |
| **1.3** | Absolute OG URLs | Social previews render thumbnail card | Facebook Debugger / X Validator |
| **1.4** | robots.txt & sitemap | Returns HTTP 200 with valid directives | curl / Google Search Console |
| **1.5** | Hostinger .htaccess | HTTPS redirect + Security headers | curl -I https://feazto.com |
| **2.1** | Lead Capture Form | Captures emails without bouncing | Interactive Form Test |
| **2.2** | 4 Service Pillars | AI crawlers identify Feazto services | Content Review / Perplexity Test |
| **2.3** | Schema.org JSON-LD | Valid Organization and WebSite markup | Google Rich Results Test |
| **2.4** | Image Optimization | Initial page weight $<800\text{ KB}$ | Chrome DevTools Network Tab |
| **3.1** | Remove pngjs | Zero compilation errors | `npm run build` |
| **3.3** | Oxlint Warnings | 0 warnings, 0 errors | `npm run lint` |
