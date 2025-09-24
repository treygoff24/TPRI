# Goal & Audience

- **Goal:** Create a campaign tool that persuades policymakers, staff, and think-tank analysts that TPRI + Strategic Economic Zones is an urgently needed U.S. policy instrument to counter China's economic expansion, while building coalition momentum for legislative passage.
- **Primary actions:** (1) Understand the $3 trillion opportunity immediately; (2) Download stakeholder-specific materials; (3) Book a briefing or join the coalition; (4) Access draft legislative materials.
- **Constraints:** Professional patriotic aesthetic (subtle red/white/blue), mobile-first for Hill staff, fast (<1s TTFB on Vercel), AA contrast minimum, minimal JS, offline-capable PDFs for Metro rides.

---

# Project Blueprint

## Tech Stack (opinionated, production-ready)

- **Framework:** Next.js (App Router) + TypeScript
- **Styling:** Tailwind CSS + CSS variables for the palette; light/dark mode support
- **UI kit:** shadcn/ui (Radix under the hood) for accessible components
- **Content:** MDX for longform sections with progressive disclosure; YAML/JSON for FAQs, stats, endorsements; Open Graph image auto-gen
- **Icons:** lucide-react (simple line icons)
- **Analytics/SEO:** Standard GA4 configuration; Vercel Analytics; `next-sitemap`, `next-seo`
- **Testing/Quality:** ESLint, Prettier, comprehensive Playwright tests, Lighthouse budgets (≥95 all categories)
- **Deploy:** Vercel (CI from GitHub), Preview Deployments on PRs, offline PDF caching via service worker

---

## Information Architecture (single-page with smart anchor sections)

1. **Hero** – Flag-inspired layout with immediate value proposition:
   - H1: **"Total Political Risk Insurance: The $3 Trillion Unlock for American Investment"**
   - Subhead: "How Congress can mobilize private capital to counter China without spending taxpayer dollars"
   - Three power CTAs:
     - Primary: **Book a Congressional Briefing**
     - Secondary: **Download Staff Backgrounder Kit**
     - Tertiary: **Join the TPRI Coalition**

2. **The Paraguay Countdown** (memorable hook element)
   - Live counter: "X days since Paraguay became the last South American ally of Taiwan"
   - Subtle animation drawing attention to the strategic stakes

3. **The $137 Billion Problem** (new political narrative section)
   - Visual timeline: China's Western Hemisphere expansion 2000-2024
   - Interactive map: Countries that switched Taiwan recognition (with dates)
   - Key stat callouts: Chancay megaport, BRI investments, diplomatic pressure examples
   - Bottom line: "Every month Congress delays = $X billion more Chinese influence"

4. **Executive Summary** – Restructured for instant comprehension:
   - "What it is: Full-value investment insurance lasting 25-99 years"
   - "How it works: Private capital deployment backed by U.S. recovery power"
   - "Why now: Outcompete China's state-driven model with market solutions"
   - "The innovation: Zone-level umbrella coverage + mandatory 3× recovery"
   - "The safeguards: 70% U.S. ownership, OECD standards, permanent adversary exclusions"

5. **How TPRI Works** – Three-tier architecture with progressive disclosure:
   - **Quick Take** (30 seconds): Simple diagram of coverage → claim → recovery
   - **Full Explanation** (2 minutes): Accession mechanisms, coverage types, enforcement tools
   - **Technical Deep Dive** (10 minutes): Legal frameworks, precedents, implementation details
   - Interactive elements: Toggle between reading modes; glossary tooltips for technical terms

6. **Strategic Economic Zones** – Reframed for political audience:
   - "Not tax havens: Full transparency and fair taxation"
   - "Not sovereignty violations: Host country partnership model"
   - Five pillars with America-first framing
   - Certification criteria with national security emphasis
   - Visual: "Good Zones vs Bad Zones" comparison chart

7. **Case Study: Próspera Proves It Works**
   - Lead with jobs number and FDI percentage
   - Survey data on local support
   - Direct comparison to failed Chinese projects in region
   - "What TPRI would mean for Próspera" projection box

8. **Compare: TPRI Makes PRI Work for Business** (stronger framing)
   - Enhanced comparison table with color coding
   - "Why traditional PRI fails American business" intro
   - Bottom line calculation: "10-20× more capital mobilized per federal dollar"

9. **FAQ for Policymakers** – Rewritten with political framing:
   - "How does this differ from corporate welfare?"
   - "Why should fiscal conservatives support this?"
   - "How does this avoid OPIC/Ex-Im mistakes?"
   - "What prevents China-aligned companies from benefiting?"
   - "How quickly can this be implemented after passage?"
   - "What's the federal budget impact?"
   - "How does Congressional oversight work?"
   - "What are the labor and environmental safeguards?"
   - "How does this respect host nation sovereignty?"
   - "Why is this constitutional?"
   - Technical questions relegated to expandable "Advanced FAQ" section

10. **Downloads & Resources**
    - PDF brief (with offline caching)
    - 1-pager for Hill meetings
    - Detailed fact sheet
    - Legislative text
    - CBO scoring estimates
    - Select citations with "View in Brief" links

11. **Contact & Coalition**
    - Smart contact form detecting organization type
    - Calendly integration for briefing requests
    - Coalition signup with automated welcome packet
    - Newsletter signup (privacy-first, GDPR compliant)

---

## Visual System (patriotic elegance, zero corporate Memphis)

- Creative direction: Full latitude for new patriotic assets; no legacy branding constraints
- **Palette (CSS variables with dark mode variants):**

  ```css
  /* Light mode */
  --patriot-blue: #0a3161;
  --patriot-red: #b31942;
  --patriot-white: #ffffff;
  --gold: #c9a227; /* For CTAs and highlights */
  --sky: #e6eef7;
  --text: #0f172a;
  --muted: #475569;
  --bg: #ffffff;
  --surface: #f1f5f9;
  --success: #059669;
  --warning: #d97706;

  /* Dark mode */
  --dark-patriot-blue: #1e40af;
  --dark-patriot-red: #7f1d1d;
  --dark-text: #f1f5f9;
  --dark-bg: #0f172a;
  --dark-surface: #1e293b;
  ```

- **Typography System:**
  - Display: "Source Serif 4" (headlines, section titles)
  - Body: "Inter" (optimized for screen reading)
  - Monospace: "JetBrains Mono" (for technical/legal citations)
  - Responsive scale: 1.250 ratio for desktop, 1.200 for mobile

- **Visual Elements:**
  - Hero: Subtle animated flag wave overlay (CSS only, no JS)
  - Section dividers: Thin diagonal stripes evoking flag motion
  - Stat cards: Embossed seal watermarks at 8% opacity
  - Buttons: Gold accents on hover with subtle shadow lift
  - Tables: Zebra striping with highlight on hover
  - Mobile: Collapsible sections with smooth transitions

- **Component Library:**
  - StickyHeader (with progress indicator)
  - MiniTOC (desktop-only floating navigation)
  - StatCard (with animated number counting)
  - ComparisonTable (with mobile-responsive design)
  - EndorsementWall (logo grid with hover effects)
  - FAQAccordion (with deep-linking support)
  - ProgressiveContent (reading mode toggles)
  - CoalitionForm (multi-step with stakeholder type tagging)

---

### Mobile Optimization for Hill Staff

- One-thumb navigation for all primary actions
- Smart dark mode that respects system preferences

---

### Analytics Implementation

- Leverage GA4 default events (page_view, session_start) with minimal custom configuration
- Enable GA4 enhanced measurement for scroll and outbound link tracking
- Use Vercel Analytics dashboards for performance snapshots
- Review standard GA4 engagement reports monthly

### Key Metrics Dashboard

- Conversion funnel: Visit → Understand (scroll) → Engage (download) → Convert (join/contact)
- Content effectiveness: Time on section and scroll depth via GA4 enhanced measurement
- Stakeholder segmentation: Manual tagging in CRM based on form submissions
- CTA performance: GA4 event summaries by CTA label

---

## Implementation Phases

### Phase 1: Static Education Site

- Core content and navigation
- Basic analytics
- PDF downloads
- Contact forms
- Manual policy-team refresh cadence for timeline and map data

### Phase 2: Coalition Features

- Endorsement wall
- Coalition signup flow

### Phase 3: Campaign Hub

- Legislative tracking integration
- Whip count tools
- Media monitoring feed
- A/B testing framework

---

## Risk Mitigation

### Political Risks

- Partisan framing → Maintain strict bipartisan language
- Corporate welfare perception → Lead with SME benefits
- Sovereignty concerns → Emphasize partnership model

### Technical Risks

- Site downtime during crucial moments → Multi-CDN redundancy
- Mobile performance issues → Progressive enhancement approach
- Accessibility complaints → WCAG 2.1 AA compliance from day 1

### Content Risks

- Fact disputes → Every claim cited to brief or authoritative source
- Message confusion → A/B test all major messaging
- Stakeholder conflicts → Separate tracks for different audiences

---

## Technical Implementation Details

### Performance Optimization

```javascript
// Implement progressive hydration
const LazySection = dynamic(() => import("./Section"), {
  loading: () => <SectionSkeleton />,
  ssr: false,
});

// Optimize images with Next.js Image
<Image
  src="/hero-flag.webp"
  alt="American flag"
  priority
  placeholder="blur"
  blurDataURL={flagBlurData}
/>;

// Implement service worker for offline PDFs
if ("serviceWorker" in navigator) {
  navigator.serviceWorker.register("/sw.js");
}
```

### SEO Optimization

```tsx
// Dynamic OG images per section
export async function generateMetadata({ params }) {
  return {
    title: `TPRI - ${params.section}`,
    openGraph: {
      images: [`/api/og?section=${params.section}`],
    },
  };
}

// Structured data for Google
<script type="application/ld+json">
  {JSON.stringify({
    "@context": "https://schema.org",
    "@type": "GovernmentService",
    name: "Total Political Risk Insurance",
    description: "U.S. investment protection program",
    provider: {
      "@type": "GovernmentOrganization",
      name: "U.S. Development Finance Corporation",
    },
  })}
</script>;
```
