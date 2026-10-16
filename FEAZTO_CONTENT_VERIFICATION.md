# FEAZTO COMING SOON WEBSITE — PUBLIC CONTENT & BRAND VERIFICATION MATRIX

**Reference Documents**:
- FEAZTO System Architecture
- FEAZTO Workflow Process
- Food Feazto Invention Disclosure Form
- Food Feazto Prior Art & Competitor Analysis
- FEAZTO Trade Secret and Confidential Information Register

---

## 1. Public Content Verification Matrix

| # | Public Statement / Claim on Website | Source Document / Reference | Verification Status | Risk Level | Action & Guidance |
|---|---|---|---|---|---|
| 1 | **Brand Name**: "feazto" (lowercase) vs "Feazto" (Title) vs "FEAZTO" (Caps) | Logo artwork & Reference docs | ⚠️ **Needs Confirmation** | Low | Align brand capitalization. Code uses lowercase `feazto`, while documentation uses `FEAZTO` and `Feazto`. Recommend standardizing on Title Case **Feazto** in body text and lowercase **feazto** only where matching brand wordmark. |
| 2 | **Tagline**: "Food, Culture, Connect" | Logo SVG & Page Title | ✅ **Verified** | None | Approved for public use. Preserves core brand positioning without disclosing operational mechanics. |
| 3 | **Tagline Whisper**: "A little closer to the flavours of home." | `src/App.tsx#L147` | ✅ **Verified** | None | Approved for public use as secondary brand slogan. |
| 4 | **Brand Headline**: "More than a meal. A connection to home." | `src/App.tsx#L217` | ✅ **Verified** | None | Approved for public use as brand statement heading. |
| 5 | **Mission Statement**: "feazto is building a space where food brings people closer to the flavours, kitchens, and stories that make every region special." | Reference Architecture / Workflow | ✅ **Verified** | None | Approved for public use. Conveys regional food-tech mission accurately. |
| 6 | **Launch Timeline**: "COMING SOON" / "A NEW FOOD EXPERIENCE IS ON ITS WAY" | Landing Page Copy | ✅ **Verified** | None | Appropriate for pre-launch portal. Does not commit to an unsupported specific date. |
| 7 | **Specific Launch Date** (e.g. Month, Quarter, or Day) | N/A | ⚠️ **Unsupported** | High | **Do not publish** a specific launch date until executive confirmation is provided. |
| 8 | **Specific Launch Cities** (e.g. Chennai, Bangalore, Hyderabad) | Reference Architecture | ⚠️ **Needs Confirmation** | Medium | Keep launch location claims general at this stage. Do not announce specific cities until vendor and operational onboarding is complete. |
| 9 | **Service Pillar**: Regional Food Delivery (Home-style meals, local food creators) | System Architecture Concept A | 🟡 **Planned** | Low | **Request Approval** to introduce a brief high-level preview bullet on the landing page for SEO/GEO benefit. |
| 10 | **Service Pillar**: CareFe (Cloud-Kitchen concept) | System Architecture Concept B | 🟡 **Planned** | Low | **Request Approval** to describe CareFe as a community cloud-kitchen concept without disclosing kitchen unit economics or confidential partner details. |
| 11 | **Service Pillar**: Book-a-Cook (On-Demand Cooking Services) | System Architecture Concept C | 🟡 **Planned** | Low | **Request Approval** to describe Book-a-Cook as on-demand culinary assistance for meals and gatherings. |
| 12 | **Service Pillar**: Fiso AI (AI culinary recommendations) | System Architecture Concept D | 🟡 **Planned** | Low | **Request Approval** to mention AI-assisted food discovery. Do not disclose proprietary algorithm details, training pipelines, or patent claims from the Invention Disclosure Form. |
| 13 | **Safety / Verification Claims**: "100% Certified / FSSAI compliant / Verified Cooks" | Workflow Process | ⚠️ **Needs Confirmation** | High | Do not make blanket legal verification claims on the landing page until onboarding and compliance pipelines are formally operational. |
| 14 | **Customer / Chef Numbers**: (e.g. "Over 500+ home chefs", "Thousands of meals") | N/A | ❌ **Unsupported** | High | **Do not publish** invented traction or vendor statistics. |
| 15 | **Contact Email**: `hello@feazto.com` | `src/App.tsx#L258` | ⚠️ **Needs Confirmation** | Medium | Verify that the MX records, Google Workspace/Titan mailbox, or email forwarding for `hello@feazto.com` is actively configured before deployment so user inquiries do not bounce. |
| 16 | **Official Company Address / Registered Legal Entity** | Trade Secret / Corporate Docs | ⚠️ **Needs Confirmation** | Low | If required for footer compliance (e.g. in India or EU), confirm official registered entity name and jurisdiction. Do not invent an address. |
| 17 | **Official Social Media Profiles** (Instagram, LinkedIn, X) | Public Accounts | ⚠️ **Needs Confirmation** | Low | Verify official handles before adding social icons to footer to prevent linking to placeholder or squatted accounts. |

---

## 2. Confidentiality & Trade Secret Safeguards

In accordance with the **FEAZTO Trade Secret and Confidential Information Register** and **Invention Disclosure Form**:

> [!CAUTION]
> **STRICT CONFIDENTIALITY DIRECTIVES FOR PUBLIC CODE & DEPLOYMENT**
> 1. **Proprietary Algorithms**: Never mention internal algorithmic details, scoring models, prompt engineering pipelines, or matching formulas of **Fiso AI** in client-side code, comments, or public copy.
> 2. **Kitchen Operations & Commission Models**: Never disclose CareFe kitchen financial splits, vendor margins, commission tiers, or delivery partner rate cards in public web pages or scripts.
> 3. **Cook Verification Mechanics**: Mention verified professionals generally; do not publish internal background-check vendor relationships or proprietary screening criteria.
> 4. **Credentials & Tokens**: Never commit `.env` files, API keys, webhook URLs, database connection strings, or personal access tokens to GitHub or public assets.
> 5. **Patent & IP Disclosures**: Avoid publishing technical claim terminology from the Food Feazto Invention Disclosure Form prior to official patent filings and legal clearance.

---

## 3. Brand Identity & Copy Recommendations

### Current Tagline Alignment
- **Official Wordmark**: `feazto` (Stylized lowercase in logo with leaf/flame accent)
- **Official Descriptor**: `FOOD • CULTURE • CONNECT`
- **Recommended Tone of Voice**: Warm, culturally anchored, inviting, modern, and trustworthy.

### Proposed Low-Risk Content Update for Landing Page
To substantially improve SEO and AI search understanding while maintaining 100% brand safety:

```markdown
### About Feazto
feazto is a regional food-tech ecosystem bringing authentic home-style flavours, 
dedicated CareFe cloud kitchens, and verified Book-a-Cook culinary professionals 
together on one platform. Something delicious is coming soon.
```
