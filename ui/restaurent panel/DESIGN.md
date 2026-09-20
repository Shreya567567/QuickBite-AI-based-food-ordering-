---
name: QuickBite
colors:
  surface: '#f9f9f9'
  surface-dim: '#dadada'
  surface-bright: '#f9f9f9'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#f3f3f3'
  surface-container: '#eeeeee'
  surface-container-high: '#e8e8e8'
  surface-container-highest: '#e2e2e2'
  on-surface: '#1a1c1c'
  on-surface-variant: '#594139'
  inverse-surface: '#2f3131'
  inverse-on-surface: '#f0f1f1'
  outline: '#8d7168'
  outline-variant: '#e1bfb5'
  surface-tint: '#ab3500'
  primary: '#ab3500'
  on-primary: '#ffffff'
  primary-container: '#ff6b35'
  on-primary-container: '#5f1900'
  inverse-primary: '#ffb59d'
  secondary: '#555f6f'
  on-secondary: '#ffffff'
  secondary-container: '#d6e0f3'
  on-secondary-container: '#596373'
  tertiary: '#7b5800'
  on-tertiary: '#ffffff'
  tertiary-container: '#c29224'
  on-tertiary-container: '#422e00'
  error: '#EF4444'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#ffdbd0'
  primary-fixed-dim: '#ffb59d'
  on-primary-fixed: '#390c00'
  on-primary-fixed-variant: '#832600'
  secondary-fixed: '#d9e3f6'
  secondary-fixed-dim: '#bdc7d9'
  on-secondary-fixed: '#121c2a'
  on-secondary-fixed-variant: '#3d4756'
  tertiary-fixed: '#ffdea4'
  tertiary-fixed-dim: '#f4be4e'
  on-tertiary-fixed: '#261900'
  on-tertiary-fixed-variant: '#5d4200'
  background: '#f9f9f9'
  on-background: '#1a1c1c'
  surface-variant: '#e2e2e2'
  ai-glow: '#5E6AD2'
  success: '#22C55E'
  text-primary: '#08090A'
  text-secondary: '#6B7280'
  border-subtle: '#E5E7EB'
typography:
  display-lg:
    fontFamily: Inter
    fontSize: 48px
    fontWeight: '700'
    lineHeight: 56px
    letterSpacing: -0.04em
  display-lg-mobile:
    fontFamily: Inter
    fontSize: 32px
    fontWeight: '700'
    lineHeight: 40px
    letterSpacing: -0.02em
  headline-md:
    fontFamily: Inter
    fontSize: 24px
    fontWeight: '600'
    lineHeight: 32px
    letterSpacing: -0.02em
  body-lg:
    fontFamily: Inter
    fontSize: 18px
    fontWeight: '400'
    lineHeight: 28px
  body-md:
    fontFamily: Inter
    fontSize: 16px
    fontWeight: '400'
    lineHeight: 24px
  label-sm:
    fontFamily: Inter
    fontSize: 13px
    fontWeight: '600'
    lineHeight: 16px
    letterSpacing: 0.02em
  mono-ui:
    fontFamily: JetBrains Mono
    fontSize: 12px
    fontWeight: '500'
    lineHeight: 16px
rounded:
  sm: 0.25rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.5rem
  full: 9999px
spacing:
  base: 8px
  container-max: 1200px
  gutter: 24px
  margin-mobile: 16px
  stack-sm: 4px
  stack-md: 12px
  stack-lg: 24px
---

## Brand & Style
The design system embodies a "2026 Startup" aesthetic: ultra-modern, high-precision, and hyper-functional. It blends the structural rigor of high-end productivity tools with the fluid, organic motion of AI-driven interfaces. 

The visual language follows a **Modern/Minimalist** approach with **Glassmorphism** accents. It prioritizes clarity through generous whitespace and a "fintech-premium" feel, utilizing subtle depth and high-contrast typography to create a sense of reliability and speed. AI interactions are distinguished by soft glowing gradients and translucent surfaces, signaling intelligence without overwhelming the user.

## Colors
The palette is anchored by a vibrant energetic orange, used sparingly for primary actions to maintain a premium feel. The background is a crisp, soft off-white that reduces eye strain compared to pure white. 

Deep charcoal provides the grounding for structural elements and high-contrast typography. We introduce a "Logic Blue" (#5E6AD2) inherited from technical workflows to represent AI-driven states, creating a visual distinction between human-led navigation and machine-led suggestions.

## Typography
The system uses **Inter** for its neutral, systematic clarity. Headings utilize tight letter-spacing and heavy weights to evoke a modern, authoritative tone. For technical metadata or AI status codes, a monospaced font is used to provide a "under-the-hood" feel.

Scale transitions are aggressive; large display type is used for marketing and onboarding, while internal application UI remains compact and information-dense, mirroring high-productivity SaaS tools.

## Layout & Spacing
A 12-column fluid grid is used for desktop layouts with a strict 8px base unit. Spacing follows a geometric progression to ensure rhythmic consistency.

- **Desktop:** 24px margins, 24px gutters. Content is centered with a 1200px max-width.
- **Tablet:** 24px margins, 16px gutters.
- **Mobile:** 16px margins, 12px gutters.

Layouts emphasize vertical stacks and "bento-box" grid groupings for dashboard views.

## Elevation & Depth
Depth is communicated through **Tonal Layering** and **Glassmorphism**, moving away from heavy, dark shadows.

- **Level 0 (Base):** Soft Off-white (#FAFAFA).
- **Level 1 (Cards):** White surface, 1px subtle border (#E5E7EB), and a very diffused 4% opacity shadow.
- **Level 2 (Modals/AI Overlays):** Glassmorphic blur (20px) with 80% opacity white fill and a 1px bright inner stroke to catch highlights.
- **Level 3 (Popovers):** High-diffusion "ambient" shadows with a slight tint of the primary orange color to suggest active interaction.

## Shapes
The shape language is friendly yet structured. We use a **Rounded** scale (16px base for cards) to soften the technical nature of the AI platform. 

Large containers and main feed cards use `rounded-xl` (24px) to create a distinct, modern silhouette that stands out from legacy platforms. Interactive elements like buttons and chips utilize `rounded-lg` (16px) or full pills.

## Components

### Buttons
Primary buttons use the Orange (#FF6B35) with white text and a subtle 2px bottom "push" shadow. Hover states involve a slight scale-up (1.02x) and a brightness increase. AI-action buttons feature a faint peripheral glow.

### Cards & AI Interaction
Cards are white with a 1px border. AI-generated responses are housed in cards with a subtle blue-to-yellow gradient border. Use "Skeleton" loaders that pulse with a soft shimmer effect during AI processing.

### Navigation
The navigation bar is a floating glassmorphic element at the top or bottom of the screen. It uses a `backdrop-filter: blur(12px)` and high-contrast charcoal icons.

### Interactive Chips
Category pills use a secondary grey background with a sharp 1px border. When active, they transition to the primary orange with a high-contrast white label.

### Form Inputs
Minimalist fields with no background; only a 1px bottom border that transforms into a full 2px stroke on focus. Error states use a soft red wash and a shaking animation.