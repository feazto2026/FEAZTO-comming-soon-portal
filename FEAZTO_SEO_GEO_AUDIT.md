# FEAZTO COMING SOON WEBSITE — TECHNICAL SEO & GEO AUDIT

**Target Production Domain**: `https://feazto.com`  
**Evaluation Standards**: Google Search Essentials, Schema.org Standards, WCAG 2.2 Level AA, AI Search Engine Optimization (GEO) Guidelines.

---

## 1. Executive SEO & GEO Summary

The current landing page for Feazto has high visual appeal but significant technical SEO and Generative Engine Optimization (GEO) gaps. 

Currently:
1. **Critical Social Sharing Defect**: Social sharing images use relative paths (`/feazto-logo-transparent.png`), which causes preview cards on WhatsApp, X/Twitter, Facebook, LinkedIn, Slack, and Discord to fail.
2. **Missing Crawl Infrastructure**: There is no `robots.txt` file and no `sitemap.xml`.
3. **Missing Canonicalization**: No `<link rel="canonical">` tag exists in `index.html`.
4. **No Structured Data**: Zero Schema.org JSON-LD structured data is present.
5. **Heading Hierarchy Obscured**: The primary `<h1>` element renders text via WebGL on a `<canvas>` element without raw text content in the DOM.
6. **Zero AI Knowledge Entity Recognition**: Generative AI engines (Perplexity, ChatGPT Search, Gemini, Claude, Google SGE) cannot recognize Feazto as a food-tech ecosystem because the page contains zero mentions of its actual services: **Regional Food Delivery**, **CareFe (Cloud Kitchens)**, **Book-a-Cook (On-Demand Cooks)**, or **Fiso AI**.

---

## 2. Technical SEO Checklist & Findings

| SEO Element | Current Status | Finding / Evidence | Target Specification |
|---|---|---|---|
| `<title>` | ⚠️ Sub-optimal | `feazto — Food, Culture, Connect` | `Feazto — Regional Food, Cloud Kitchens & On-Demand Cooks \| Coming Soon` |
| `<meta name="description">` | ⚠️ Vague | Describes "creating a new way to connect with food... feeling of home" | Specific, high-intent description naming regional food delivery, CareFe, and Book-a-Cook. |
| Canonical Tag | ❌ Missing | No `<link rel="canonical">` in `index.html` | `<link rel="canonical" href="https://feazto.com/" />` |
| `robots.txt` | ❌ Missing | File does not exist in `public/` (HTTP 404) | Full `robots.txt` with sitemap reference |
| `sitemap.xml` | ❌ Missing | File does not exist in `public/` (HTTP 404) | Valid XML sitemap with lastmod date |
| Open Graph Image | ❌ Broken | Relative URL: `/feazto-logo-transparent.png` | Absolute URL: `https://feazto.com/og-image.jpg` (1200x630) |
| Open Graph URL | ❌ Missing | Property `og:url` is omitted | `<meta property="og:url" content="https://feazto.com/" />` |
| Twitter Meta Format | ⚠️ Inaccurate | Uses `property="twitter:..."` instead of `name` | `<meta name="twitter:card" content="summary_large_image" />` |
| Robots Meta Tag | ❌ Missing | No `<meta name="robots">` defined | `<meta name="robots" content="index, follow, max-image-preview:large" />` |
| Heading Structure | ⚠️ Obscured | `H1` contains only WebGL canvas | Semantic `H1` with clear entity name and purpose |
| Structured Data | ❌ Missing | Zero JSON-LD tags present | `Organization`, `WebSite`, `WebPage` Schema |
| Apple Touch Icon | ❌ Missing | Only `favicon.svg` is linked | `<link rel="apple-touch-icon" href="/apple-touch-icon.png">` |
| Web App Manifest | ❌ Missing | No `manifest.webmanifest` | Web App Manifest with brand theme color `#F8B504` |

---

## 3. Generative Engine Optimization (GEO) & AI Search Readiness

### Current AI Discovery Status: **Opaque**

Generative search engines (such as Perplexity, ChatGPT Search, Claude, Gemini, and Google AI Overviews) process web content by extracting factual entity relationships, core service categories, and structured answers to user prompts.

#### Why the Current Website Fails AI Retrieval:
1. **Lack of Entity Naming**: The page describes "a new way to connect with food, culture, regional flavours" but fails to state *what* Feazto is (e.g. "a regional food-tech platform connecting consumers with authentic home kitchens, cloud kitchens, and professional cooks").
2. **Missing Service Pillars**: Reference documents outline four core service pillars:
   - **Regional Food Delivery**: Authentic regional meals and local kitchen discovery.
   - **CareFe**: Cloud-kitchen operations within the Feazto ecosystem.
   - **Book-a-Cook**: On-demand cooks for everyday meals and private gatherings.
   - **Fiso AI**: Intelligent recommendations, conversational search, and vendor insights.
   *None of these four terms appear on the website.*
3. **No Direct Answer Snippets**: When a user asks an AI engine, *"What is Feazto and what services does it offer?"*, the AI crawler finds no clear, declarative statement to quote.

### Recommended GEO Content Additions

To establish strong brand authority without revealing confidential trade secrets, add a clean **"What We're Building"** preview section to the Coming Soon page:

```
[ What to Expect from Feazto ]

1. Regional Food Delivery
Discover authentic, time-honoured dishes crafted by verified regional food creators and home chefs.

2. CareFe Cloud Kitchens
Fresh, hygienic culinary concepts brought to life through dedicated community cloud kitchens.

3. Book-a-Cook
Connect with verified culinary professionals and home cooks for private gatherings, parties, and everyday meals.

4. Fiso AI
Personalized dish recommendations, seamless meal planning, and smart culinary discovery.
```

---

## 4. Recommended Code Implementations

### A. Production `index.html` Metadata & Head Tags

Replace lines 8–28 in [`index.html`](file:///Users/rahulr/Documents/feazt/index.html) with:

```html
    <!-- Primary Page Metadata -->
    <title>Feazto — Regional Food Delivery, Cloud Kitchens & On-Demand Cooks</title>
    <meta name="title" content="Feazto — Regional Food Delivery, Cloud Kitchens & On-Demand Cooks" />
    <meta name="description" content="Feazto connects you with authentic regional kitchens, CareFe cloud dining, and verified Book-a-Cook culinary professionals. Something delicious is coming soon." />
    <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" />
    <link rel="canonical" href="https://feazto.com/" />
    
    <!-- Theme & Mobile App Icons -->
    <meta name="theme-color" content="#F8B504" />
    <meta name="color-scheme" content="light" />
    <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
    <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
    <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
    <link rel="manifest" href="/manifest.webmanifest" />

    <!-- Open Graph / Facebook / WhatsApp -->
    <meta property="og:type" content="website" />
    <meta property="og:site_name" content="Feazto" />
    <meta property="og:url" content="https://feazto.com/" />
    <meta property="og:title" content="Feazto — Food, Culture, Connect" />
    <meta property="og:description" content="A new way to connect with authentic regional kitchens, CareFe cloud dining, and on-demand cooks. Coming soon to feazto.com." />
    <meta property="og:image" content="https://feazto.com/og-image.jpg" />
    <meta property="og:image:width" content="1200" />
    <meta property="og:image:height" content="630" />
    <meta property="og:image:alt" content="Feazto — Food, Culture, Connect Coming Soon" />
    <meta property="og:locale" content="en_IN" />

    <!-- Twitter / X -->
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:site" content="@feazto" />
    <meta name="twitter:url" content="https://feazto.com/" />
    <meta name="twitter:title" content="Feazto — Food, Culture, Connect" />
    <meta name="twitter:description" content="A new way to connect with authentic regional kitchens, CareFe cloud dining, and on-demand cooks. Coming soon." />
    <meta name="twitter:image" content="https://feazto.com/og-image.jpg" />
    <meta name="twitter:image:alt" content="Feazto Coming Soon" />
```

---

### B. Production Schema.org Structured Data (JSON-LD)

Place this JSON-LD script inside the `<head>` of `index.html`:

```html
    <!-- Structured Data: Organization & WebSite Schema -->
    <script type="application/ld+json">
    {
      "@context": "https://schema.org",
      "@graph": [
        {
          "@type": "Organization",
          "@id": "https://feazto.com/#organization",
          "name": "Feazto",
          "url": "https://feazto.com",
          "logo": {
            "@type": "ImageObject",
            "@id": "https://feazto.com/#logo",
            "url": "https://feazto.com/feazto-logo-transparent.png",
            "caption": "Feazto Logo"
          },
          "email": "hello@feazto.com",
          "description": "Feazto is a regional food-tech ecosystem connecting consumers with authentic home kitchens, CareFe cloud kitchens, and Book-a-Cook on-demand culinary professionals."
        },
        {
          "@type": "WebSite",
          "@id": "https://feazto.com/#website",
          "url": "https://feazto.com",
          "name": "Feazto",
          "publisher": {
            "@id": "https://feazto.com/#organization"
          },
          "description": "Authentic regional food discovery, cloud dining, and on-demand cooking professionals.",
          "inLanguage": "en-IN"
        },
        {
          "@type": "WebPage",
          "@id": "https://feazto.com/#webpage",
          "url": "https://feazto.com",
          "name": "Feazto — Food, Culture, Connect | Coming Soon",
          "isPartOf": {
            "@id": "https://feazto.com/#website"
          },
          "about": {
            "@id": "https://feazto.com/#organization"
          },
          "description": "feazto is creating a new way to connect with food, culture, regional flavours, and the feeling of home.",
          "inLanguage": "en-IN"
        }
      ]
    }
    </script>
```

---

### C. Recommended `public/robots.txt`

Create file at `public/robots.txt`:

```txt
# Robots.txt for https://feazto.com
User-agent: *
Allow: /

# Disallow build and preview directories if hosted
Disallow: /dist/
Disallow: /assets/*.map$

# Host and Sitemap
Host: https://feazto.com
Sitemap: https://feazto.com/sitemap.xml
```

---

### D. Recommended `public/sitemap.xml`

Create file at `public/sitemap.xml`:

```xml
<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>https://feazto.com/</loc>
    <lastmod>2026-10-16</lastmod>
    <changefreq>weekly</changefreq>
    <priority>1.0</priority>
  </url>
</urlset>
```

---

### E. Semantic Heading Fix in `App.tsx`

To preserve the visual WebGL animation while providing clean semantics to search engine indexers:

```tsx
<h1 id="hero-main-title" className="grand-coming-soon-title">
  {/* Visually hidden semantic text for search engine crawlers and screen readers */}
  <span className="sr-only">Feazto — A New Food Experience Is Coming Soon</span>
  
  {/* Interactive visual WebGL animation */}
  <WarpText
    text="COMING SOON"
    aria-hidden="true"
    segments={[
      { text: 'COMING ', color: '#121212' },
      { text: 'SOON', color: '#121212' } /* Fixed contrast */
    ]}
    ...
  />
</h1>
```

Add the standard utility class in `src/index.css`:
```css
.sr-only {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border-width: 0;
}
```

---

## 5. Verification & Testing Procedures

1. **Rich Results Test**: Test `https://feazto.com` against [Google Rich Results Test](https://search.google.com/test/rich-results) to confirm `Organization` and `WebSite` JSON-LD syntax.
2. **Crawl Validation**: Run `curl -I https://feazto.com/robots.txt` and `curl -I https://feazto.com/sitemap.xml` to verify HTTP 200 responses.
3. **Social Unfurl**: Test URL previews in Facebook Sharing Debugger, Twitter/X Card Validator, and WhatsApp Web to verify absolute OG image resolution.
4. **Heading Validation**: View page source (`curl -s https://feazto.com`) to confirm `<h1>Feazto — A New Food Experience Is Coming Soon</h1>` appears directly in the static initial HTML.
