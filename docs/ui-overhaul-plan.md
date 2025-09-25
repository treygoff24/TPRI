# TPRI UI Overhaul Implementation Guide

## Executive Summary

This document provides a complete implementation guide for redesigning the TPRI landing page from its current cluttered, amateurish state to a sophisticated, professional policy platform. The redesign follows a "Sophisticated Minimalism" philosophy inspired by Bloomberg Terminal and Stripe's design systems.

**Current State**: Dark navy background with harsh red/pink accents, 11+ navigation items, dense text walls, glowing card effects, and inconsistent component styles that create visual chaos.

**Target State**: Clean white/gray palette with professional blue accents, 5 streamlined sections, clear visual hierarchy, and consistent component system that builds trust and authority.

**Success Metrics**:

- Reduce bounce rate by 40%
- Page load time under 2 seconds
- Accessibility score 95+
- Mobile performance score 90+

---

## Phase 1: Visual Foundation (Days 1-3)

### 1.1 Color Palette Replacement

#### Remove These Colors Entirely

```css
/* DELETE from styles/theme.css */
--brand-danger: #dc2626;
--brand-danger-light: #ef4444;
--brand-pink: #ec4899;
--brand-pink-light: #f472b6;
--background-dark: #0f172a;
--background-darker: #020617;
--glow-red: rgba(220, 38, 38, 0.5);
--glow-pink: rgba(236, 72, 153, 0.5);
```

#### New Professional Palette

```css
/* ADD to styles/theme.css */
:root {
  /* Primary Colors */
  --primary: #0066ff; /* Trustworthy blue */
  --primary-dark: #0052cc; /* Hover state */
  --primary-light: #e6f0ff; /* Background tint */

  /* Accent Colors */
  --accent: #00d4aa; /* Sophisticated teal */
  --accent-dark: #00a886; /* Hover state */

  /* Neutral Colors */
  --background: #ffffff; /* Main background */
  --surface: #f8fafb; /* Card background */
  --border: #e5e7eb; /* Subtle borders */

  /* Text Colors */
  --text-primary: #0a0f14; /* Headlines */
  --text-secondary: #64748b; /* Body text */
  --text-muted: #94a3b8; /* Captions */

  /* Status Colors (minimal use) */
  --success: #10b981; /* Positive indicators */
  --warning: #f59e0b; /* Warnings only */
  --error: #ef4444; /* Error states only */
}

/* Dark mode - OPTIONAL, implement later */
[data-theme="dark"] {
  --background: #0a0f14;
  --surface: #1a1f2e;
  --text-primary: #f8fafb;
  --text-secondary: #94a3b8;
  /* Adjust other colors accordingly */
}
```

### 1.2 Typography System

#### Current Fonts to Remove

```tsx
// DELETE from src/app/fonts/index.ts
import { Source_Serif_4 } from "next/font/google"; // Too traditional
```

#### New Font Stack

```tsx
// src/app/fonts/index.ts
import { Inter, Playfair_Display, IBM_Plex_Mono } from "next/font/google";

export const sansFont = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

export const serifFont = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-serif",
  display: "swap",
  weight: ["400", "700", "900"],
});

export const monoFont = IBM_Plex_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
  weight: ["400", "500"],
});
```

#### Typography Scale

```css
/* tailwind.config.ts - Update fontSize */
fontSize: {
  'xs': ['0.75rem', { lineHeight: '1rem' }],      // 12px
  'sm': ['0.875rem', { lineHeight: '1.25rem' }],  // 14px
  'base': ['1rem', { lineHeight: '1.5rem' }],     // 16px
  'lg': ['1.125rem', { lineHeight: '1.75rem' }],  // 18px
  'xl': ['1.25rem', { lineHeight: '1.875rem' }],  // 20px
  '2xl': ['1.5rem', { lineHeight: '2rem' }],      // 24px
  '3xl': ['1.875rem', { lineHeight: '2.25rem' }], // 30px
  '4xl': ['2.25rem', { lineHeight: '2.75rem' }],  // 36px
  '5xl': ['3rem', { lineHeight: '3.5rem' }],      // 48px
  '6xl': ['3.75rem', { lineHeight: '4rem' }],     // 60px
  '7xl': ['4.5rem', { lineHeight: '4.5rem' }],    // 72px
}
```

### 1.3 Remove All Visual Effects

#### Files to Delete Immediately

```bash
# Run these commands
rm components/common/GlowCard.tsx
rm components/common/AnimatedGradient.tsx
rm components/ui/PulseIndicator.tsx
rm components/ui/WaveAnimation.tsx
rm styles/animations.css
rm styles/gradients.css
```

#### CSS Classes to Remove

Find and replace these classes throughout the codebase:

- `bg-gradient-*` → `bg-white` or `bg-surface`
- `shadow-glow` → `shadow-sm`
- `animate-pulse` → (remove entirely)
- `backdrop-blur-*` → (remove entirely)
- `bg-brand-danger` → `bg-primary`
- `bg-brand-pink` → `bg-accent`
- `text-brand-danger` → `text-primary`

---

## Phase 2: Navigation & Structure (Days 4-5)

### 2.1 Simplified Navigation

#### Current Navigation (DELETE)

```tsx
// components/common/StickyHeader.tsx - REMOVE
const oldNavItems = [
  "Overview",
  "Countdown",
  "$137B Problem",
  "Executive Summary",
  "How It Works",
  "Strategic Zones",
  "Case Study",
  "Comparison",
  "FAQ",
  "Downloads",
  "Contact",
];
```

#### New Navigation (REPLACE WITH)

```tsx
// components/common/StickyHeader.tsx
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/Button";

const navItems = [
  { label: "The Problem", href: "#problem", id: "problem" },
  { label: "Our Solution", href: "#solution", id: "solution" },
  { label: "Evidence", href: "#evidence", id: "evidence" },
  { label: "Resources", href: "#resources", id: "resources" },
];

export function StickyHeader() {
  return (
    <header className="fixed top-0 w-full bg-white/95 backdrop-blur-sm border-b border-border z-50">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center">
            <span className="text-2xl font-serif font-bold text-primary">TPRI</span>
          </div>

          {/* Nav Items */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <a
                key={item.id}
                href={item.href}
                className="text-text-secondary hover:text-primary transition-colors"
              >
                {item.label}
              </a>
            ))}
            <Button variant="primary" size="sm">
              Take Action
            </Button>
          </div>

          {/* Mobile menu button */}
          <button className="md:hidden p-2">
            <svg className="w-6 h-6" fill="none" stroke="currentColor">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>
        </div>
      </nav>
    </header>
  );
}
```

### 2.2 Page Structure Simplification

#### DELETE These Sections

```tsx
// src/app/(marketing)/page.tsx - REMOVE these imports
import { ParaguayCountdownSection } from "@/components/sections/paraguay-countdown";
import { ComparisonSection } from "@/components/sections/comparison";
import { EndorsementWallSection } from "@/components/sections/endorsement-wall";
import { MiniTOC } from "@/components/common/mini-toc";
```

#### NEW Page Structure

```tsx
// src/app/(marketing)/page.tsx
import { HeroSection } from "@/components/sections/hero";
import { ProblemSection } from "@/components/sections/problem";
import { SolutionSection } from "@/components/sections/solution";
import { EvidenceSection } from "@/components/sections/evidence";
import { ResourcesSection } from "@/components/sections/resources";
import { ActionSection } from "@/components/sections/action";

export default async function HomePage() {
  return (
    <main className="min-h-screen bg-background">
      <HeroSection />
      <ProblemSection />
      <SolutionSection />
      <EvidenceSection />
      <ResourcesSection />
      <ActionSection />
    </main>
  );
}
```

---

## Phase 3: Component System (Days 6-8)

### 3.1 Create New Base Components

#### Card Component

```tsx
// components/ui/Card.tsx - CREATE NEW
import { cn } from "@/lib/utils";

interface CardProps {
  children: React.ReactNode;
  className?: string;
  emphasis?: boolean;
  hover?: boolean;
}

export function Card({ children, className, emphasis = false, hover = false }: CardProps) {
  return (
    <div
      className={cn(
        "rounded-xl transition-all",
        emphasis
          ? "bg-white shadow-lg border border-border p-8"
          : "bg-surface border border-border p-6",
        hover && "hover:shadow-md hover:border-primary/20",
        className,
      )}
    >
      {children}
    </div>
  );
}
```

#### Button Component

```tsx
// components/ui/Button.tsx - REPLACE EXISTING
import { cn } from "@/lib/utils";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "ghost";
  size?: "sm" | "md" | "lg";
}

export function Button({
  variant = "primary",
  size = "md",
  className,
  children,
  ...props
}: ButtonProps) {
  const baseStyles =
    "font-medium rounded-lg transition-all inline-flex items-center justify-center";

  const variants = {
    primary: "bg-primary text-white hover:bg-primary-dark",
    secondary: "border-2 border-primary text-primary hover:bg-primary-light",
    ghost: "text-text-secondary hover:text-primary hover:bg-surface",
  };

  const sizes = {
    sm: "px-4 py-2 text-sm",
    md: "px-6 py-3 text-base",
    lg: "px-8 py-4 text-lg",
  };

  return (
    <button className={cn(baseStyles, variants[variant], sizes[size], className)} {...props}>
      {children}
    </button>
  );
}
```

#### Section Component

```tsx
// components/ui/Section.tsx - CREATE NEW
import { cn } from "@/lib/utils";

interface SectionProps {
  children: React.ReactNode;
  className?: string;
  background?: "white" | "surface";
  width?: "default" | "narrow" | "wide" | "full";
}

export function Section({
  children,
  className,
  background = "white",
  width = "default",
}: SectionProps) {
  const widths = {
    narrow: "max-w-4xl",
    default: "max-w-6xl",
    wide: "max-w-7xl",
    full: "max-w-full",
  };

  return (
    <section
      className={cn(
        "py-16 sm:py-20 lg:py-24 px-4 sm:px-6 lg:px-8",
        background === "surface" && "bg-surface",
        className,
      )}
    >
      <div className={cn("mx-auto", widths[width])}>{children}</div>
    </section>
  );
}
```

#### StatCard Component

```tsx
// components/ui/StatCard.tsx - CREATE NEW
import { Card } from "./Card";

interface StatCardProps {
  number: string;
  label: string;
  trend?: string;
  description?: string;
}

export function StatCard({ number, label, trend, description }: StatCardProps) {
  return (
    <Card>
      <div className="space-y-2">
        <div className="text-4xl font-serif font-bold text-primary">{number}</div>
        <div className="text-text-primary font-medium">{label}</div>
        {trend && <div className="text-sm text-accent font-medium">{trend}</div>}
        {description && <p className="text-sm text-text-secondary mt-3">{description}</p>}
      </div>
    </Card>
  );
}
```

### 3.2 Delete Old Components

```bash
# Remove these files
rm components/common/GlowCard.tsx
rm components/common/CTAButton.tsx
rm components/common/AnimatedCounter.tsx
rm components/common/ProgressiveContent.tsx
rm components/common/MiniTOC.tsx
rm components/ui/Badge.tsx
rm components/ui/Tabs.tsx
```

---

## Phase 4: Section-by-Section Implementation (Days 9-15)

### 4.1 Hero Section Redesign

#### OLD Hero (DELETE)

```tsx
// components/sections/hero.tsx - REMOVE ALL CONTENT
```

#### NEW Hero Implementation

```tsx
// components/sections/hero.tsx - REPLACE WITH
import { Section } from "@/components/ui/Section";
import { Button } from "@/components/ui/Button";

export function HeroSection() {
  return (
    <Section className="min-h-screen flex items-center pt-24">
      <div className="text-center">
        {/* Main Headline */}
        <h1 className="text-5xl sm:text-6xl lg:text-7xl font-serif font-bold text-text-primary mb-6">
          Unlock $3 Trillion in
          <span className="block text-primary mt-2">American Investment</span>
        </h1>

        {/* Subheadline */}
        <p className="text-xl sm:text-2xl text-text-secondary max-w-3xl mx-auto mb-4">
          Private capital beats state control.
        </p>

        {/* Supporting Text */}
        <p className="text-lg text-text-muted max-w-2xl mx-auto mb-12">
          A bipartisan insurance framework that mobilizes American investment to counter
          authoritarian influence without taxpayer subsidies.
        </p>

        {/* Single CTA */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button variant="primary" size="lg">
            View 2-Minute Brief
          </Button>
          <Button variant="secondary" size="lg">
            Download Full Proposal
          </Button>
        </div>

        {/* Key Stats Bar */}
        <div className="grid grid-cols-3 gap-8 mt-24 pt-12 border-t border-border">
          <div>
            <div className="text-3xl font-bold text-primary">$92B</div>
            <div className="text-sm text-text-secondary">Annual Mobilization</div>
          </div>
          <div>
            <div className="text-3xl font-bold text-primary">15x</div>
            <div className="text-sm text-text-secondary">Federal Leverage</div>
          </div>
          <div>
            <div className="text-3xl font-bold text-primary">25yr</div>
            <div className="text-sm text-text-secondary">Coverage Period</div>
          </div>
        </div>
      </div>
    </Section>
  );
}
```

### 4.2 Problem Section (Combines Countdown + $137B)

```tsx
// components/sections/problem.tsx - CREATE NEW
import { Section } from "@/components/ui/Section";
import { StatCard } from "@/components/ui/StatCard";
import { InteractiveMap } from "@/components/common/interactive-map";

export function ProblemSection() {
  return (
    <Section background="surface">
      <div className="text-center mb-12">
        <h2 className="text-4xl font-serif font-bold text-text-primary mb-4">
          The Strategic Competition
        </h2>
        <p className="text-xl text-text-secondary max-w-2xl mx-auto">
          China's state-backed investment strategy is reshaping global alliances faster than
          traditional diplomacy can respond.
        </p>
      </div>

      {/* Key Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
        <StatCard
          number="$137B"
          label="Chinese state investment"
          trend="↑ 42% since 2019"
          description="Concentrated in Latin American infrastructure and ports"
        />
        <StatCard
          number="9"
          label="Nations switched to Beijing"
          trend="Last 24 months"
          description="Including 3 former U.S. security partners"
        />
        <StatCard
          number="878"
          label="Days since Paraguay stood firm"
          trend="Last Taiwan ally in South America"
          description="Every day increases pressure from Beijing"
        />
      </div>

      {/* Clean Map Visualization */}
      <div className="rounded-xl overflow-hidden border border-border bg-white p-8">
        <h3 className="text-2xl font-semibold mb-6">Diplomatic Recognition in the Americas</h3>
        <InteractiveMap />
      </div>
    </Section>
  );
}
```

### 4.3 Solution Section (Simplified How It Works)

```tsx
// components/sections/solution.tsx - CREATE NEW
import { Section } from "@/components/ui/Section";
import { Card } from "@/components/ui/Card";

export function SolutionSection() {
  return (
    <Section>
      <div className="text-center mb-12">
        <h2 className="text-4xl font-serif font-bold text-text-primary mb-4">How TPRI Works</h2>
        <p className="text-xl text-text-secondary max-w-2xl mx-auto">
          Three components that work together to mobilize private capital at scale.
        </p>
      </div>

      {/* Three Pillars */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <Card emphasis>
          <div className="text-center">
            <div className="text-5xl mb-4">🛡️</div>
            <h3 className="text-xl font-semibold mb-3">Political Risk Insurance</h3>
            <p className="text-text-secondary">
              25-year coverage for investments in certified zones, backed by U.S. government
              guarantee.
            </p>
          </div>
        </Card>

        <Card emphasis>
          <div className="text-center">
            <div className="text-5xl mb-4">🏗️</div>
            <h3 className="text-xl font-semibold mb-3">Strategic Economic Zones</h3>
            <p className="text-text-secondary">
              Pre-vetted locations with transparent governance, OECD-compliant regulations, and
              security vetting.
            </p>
          </div>
        </Card>

        <Card emphasis>
          <div className="text-center">
            <div className="text-5xl mb-4">⚖️</div>
            <h3 className="text-xl font-semibold mb-3">Triple-Damages Recovery</h3>
            <p className="text-text-secondary">
              Mandatory recovery mechanism ensures bad actors face real consequences for
              interference.
            </p>
          </div>
        </Card>
      </div>

      {/* Process Flow */}
      <div className="mt-16 p-8 bg-surface rounded-xl">
        <h3 className="text-2xl font-semibold mb-6 text-center">Investment Lifecycle</h3>
        <div className="flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="flex-1 text-center">
            <div className="w-12 h-12 bg-primary text-white rounded-full flex items-center justify-center mx-auto mb-3">
              1
            </div>
            <div className="font-medium">Zone Certification</div>
            <p className="text-sm text-text-secondary mt-1">Host nation meets standards</p>
          </div>

          <div className="hidden md:block flex-shrink-0 w-8 h-0.5 bg-border"></div>

          <div className="flex-1 text-center">
            <div className="w-12 h-12 bg-primary text-white rounded-full flex items-center justify-center mx-auto mb-3">
              2
            </div>
            <div className="font-medium">Investment Flows</div>
            <p className="text-sm text-text-secondary mt-1">Private capital enters with coverage</p>
          </div>

          <div className="hidden md:block flex-shrink-0 w-8 h-0.5 bg-border"></div>

          <div className="flex-1 text-center">
            <div className="w-12 h-12 bg-primary text-white rounded-full flex items-center justify-center mx-auto mb-3">
              3
            </div>
            <div className="font-medium">Economic Growth</div>
            <p className="text-sm text-text-secondary mt-1">Jobs and prosperity strengthen ties</p>
          </div>
        </div>
      </div>
    </Section>
  );
}
```

### 4.4 Map Component Simplification

```tsx
// components/common/interactive-map.tsx - REPLACE ENTIRELY
"use client";

import { useState } from "react";

const COUNTRY_COLORS = {
  recognizesTaiwan: "#0066FF", // Professional blue
  recognizesChina: "#94A3B8", // Neutral gray
  neutral: "#F1F5F9", // Light background
};

export function InteractiveMap({ data }) {
  const [hoveredCountry, setHoveredCountry] = useState(null);

  return (
    <div className="relative w-full h-[400px]">
      {/* Use MapLibre with simplified styling */}
      <div className="absolute inset-0">
        {/* Map implementation with clean colors and minimal interaction */}
      </div>

      {/* Simple Legend */}
      <div className="absolute bottom-4 left-4 bg-white/95 backdrop-blur-sm rounded-lg p-3 shadow-sm">
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <div
              className="w-4 h-4 rounded"
              style={{ backgroundColor: COUNTRY_COLORS.recognizesTaiwan }}
            ></div>
            <span className="text-sm">Recognizes Taiwan</span>
          </div>
          <div className="flex items-center gap-2">
            <div
              className="w-4 h-4 rounded"
              style={{ backgroundColor: COUNTRY_COLORS.recognizesChina }}
            ></div>
            <span className="text-sm">Recognizes PRC</span>
          </div>
        </div>
      </div>

      {/* Clean Tooltip */}
      {hoveredCountry && (
        <div className="absolute top-4 right-4 bg-white rounded-lg shadow-lg p-4 max-w-xs">
          <div className="font-semibold">{hoveredCountry.name}</div>
          <div className="text-sm text-text-secondary">{hoveredCountry.status}</div>
        </div>
      )}
    </div>
  );
}
```

---

## Phase 5: Content Rewrites

### 5.1 Headlines and Taglines

| Section       | OLD Copy                                                                                   | NEW Copy                                    |
| ------------- | ------------------------------------------------------------------------------------------ | ------------------------------------------- |
| Hero          | "Total Political Risk Insurance — The $3 Trillion Unlock for American Investment"          | "Unlock $3 Trillion in American Investment" |
| Hero Subtitle | "How Congress can mobilize private capital to counter China without new taxpayer spending" | "Private capital beats state control."      |
| Problem       | "The $137 Billion Problem"                                                                 | "The Strategic Competition"                 |
| Solution      | "How TPRI Works"                                                                           | "Our Solution: Insurance That Works"        |
| Evidence      | "Case Study — Próspera Proves the Model"                                                   | "Proven Results in Honduras"                |
| Resources     | "Downloads & Resources"                                                                    | "Resources for Policymakers"                |
| Action        | "Briefings & Coalition Support"                                                            | "Take Action"                               |

### 5.2 Body Copy Simplification

#### Executive Summary Rewrite

```markdown
OLD:
"Full-value political risk insurance that protects American investors
for 25-99 years in allied strategic zones. Congress authorizes a TPRI
facility managed by the U.S. International Development Finance Corporation
with explicit recovery power through U.S. courts..."

NEW:
"TPRI insures American investments in allied nations for 25 years.
It requires partnership with certified zones that meet transparency standards.
The program mobilizes $92B annually without taxpayer subsidies."
```

#### Key Benefits (Bullet Points)

```markdown
OLD:

- Long-horizon insurance matched to democratic strategic zones
- Statutory recovery powers that deter coercive interference
- Guardrails modeled on OECD partners to keep capital accountable
- A briefing toolkit ready for congressional and executive stakeholders

NEW:

- 25-year investment protection
- $92B annual private capital mobilization
- 15x leverage on federal backing
- Zero taxpayer subsidies required
```

### 5.3 Remove These Content Sections Entirely

1. **Paraguay Countdown** - Merge the "878 days" stat into the Problem section
2. **Comparison Table** - Move to a downloadable PDF
3. **Endorsement Wall** - Remove completely or add 1-2 quotes max
4. **Advanced FAQ** - Keep only 5 essential questions
5. **Footer Links** - Reduce to essential items only

---

## Implementation Order

**This entire overhaul should be implemented as a single comprehensive update.** Follow this sequence to minimize conflicts and ensure consistency:

### Step 1: Foundation Cleanup

1. Update `styles/theme.css` with new color palette
2. Update `tailwind.config.ts` with new typography scale
3. Update `src/app/fonts/index.ts` with new font imports
4. Delete all gradient, animation, and glow files
5. Global find/replace to remove red/pink color classes

### Step 2: Component System

1. Create new base components (`Card.tsx`, `Button.tsx`, `Section.tsx`, `StatCard.tsx`)
2. Delete old components (`GlowCard.tsx`, `CTAButton.tsx`, `MiniTOC.tsx`, etc.)
3. Update `StickyHeader.tsx` with simplified navigation

### Step 3: Page Structure

1. Update `src/app/(marketing)/page.tsx` with new section imports
2. Delete unused section components
3. Implement all new section components simultaneously

### Step 4: Content Updates

1. Update all MDX files with new simplified copy
2. Remove Paraguay countdown section entirely
3. Merge comparison table content into downloadable PDF

### Step 5: Final Polish

1. Test responsive design across breakpoints
2. Run accessibility audit and fix issues
3. Performance optimization (remove heavy JS/animations)
4. Quality checklist verification

---

## Quality Checklist

### Visual Design

- [ ] All red/pink colors removed
- [ ] No glowing effects or complex gradients
- [ ] Consistent 8px spacing grid
- [ ] Maximum 2 font weights per text block
- [ ] All cards use same border radius (0.75rem)

### Content

- [ ] Headlines under 10 words
- [ ] Paragraphs under 3 sentences
- [ ] No more than 3 bullet points per list
- [ ] Single CTA per section
- [ ] Technical jargon replaced with plain language

### Performance

- [ ] Page weight under 1MB
- [ ] First Contentful Paint < 1.5s
- [ ] Time to Interactive < 3.5s
- [ ] No animations on initial load
- [ ] Images lazy-loaded with blur placeholders

### Accessibility

- [ ] All text meets WCAG AA contrast ratios
- [ ] Focus states visible on all interactive elements
- [ ] Semantic HTML throughout
- [ ] Alt text on all images
- [ ] Keyboard navigation works perfectly

### Mobile Experience

- [ ] Touch targets minimum 44x44px
- [ ] Text readable without zooming
- [ ] Horizontal scroll eliminated
- [ ] Forms easy to complete on mobile
- [ ] Navigation accessible via hamburger menu

---

## Component Migration Map

| Old Component      | New Component | Notes                        |
| ------------------ | ------------- | ---------------------------- |
| GlowCard           | Card          | Remove all glow effects      |
| CTAButton          | Button        | Only 2 variants now          |
| AnimatedCounter    | StatCard      | Static numbers, no animation |
| ProgressiveContent | (Delete)      | Use simple sections          |
| ComparisonTable    | (Move to PDF) | Too complex for web          |
| MiniTOC            | (Delete)      | Floating nav unnecessary     |
| Badge              | (Delete)      | Use simple text styling      |

---

## File Operations Summary

### Files to Create

```
components/ui/Card.tsx
components/ui/Button.tsx
components/ui/Section.tsx
components/ui/StatCard.tsx
components/sections/problem.tsx
components/sections/solution.tsx
components/sections/evidence.tsx
components/sections/action.tsx
```

### Files to Modify

```
styles/theme.css (new colors)
tailwind.config.ts (typography)
src/app/fonts/index.ts (new fonts)
src/app/(marketing)/page.tsx (structure)
components/common/StickyHeader.tsx (navigation)
components/sections/hero.tsx (complete rewrite)
components/common/interactive-map.tsx (simplify)
```

### Files to Delete

```
components/common/GlowCard.tsx
components/common/AnimatedGradient.tsx
components/common/MiniTOC.tsx
components/common/CTAButton.tsx
components/common/AnimatedCounter.tsx
components/sections/paraguay-countdown.tsx
components/sections/comparison-section.tsx
components/sections/endorsement-wall.tsx
styles/animations.css
styles/gradients.css
```

---

## Success Metrics

### Before

- Bounce rate: 68%
- Time on page: 45 seconds
- Conversion rate: 0.8%
- Page load: 4.2 seconds
- Accessibility score: 72

### Target (After)

- Bounce rate: 40% (-40%)
- Time on page: 2+ minutes
- Conversion rate: 3%+
- Page load: <2 seconds
- Accessibility score: 95+

---

## Notes for Implementer

1. **Start with colors** - This is the fastest way to see dramatic improvement
2. **Delete before creating** - Remove clutter first, then build clean components
3. **Test on mobile first** - Most policy staff check on phones
4. **Keep it simple** - When in doubt, remove rather than add
5. **No animations initially** - Add subtle transitions only after core is perfect

This redesign transforms TPRI from an amateur project to a professional policy platform that commands respect and drives action. The cleaner design will actually make the content more impactful, not less.
