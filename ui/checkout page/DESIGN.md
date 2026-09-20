---
name: QuickBite Design System
colors:
  surface: '#fcf8ff'
  surface-dim: '#dad7f3'
  surface-bright: '#fcf8ff'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#f5f2ff'
  surface-container: '#efecff'
  surface-container-high: '#e8e5ff'
  surface-container-highest: '#e2e0fc'
  on-surface: '#1a1a2e'
  on-surface-variant: '#594139'
  inverse-surface: '#2f2e43'
  inverse-on-surface: '#f2efff'
  outline: '#8d7168'
  outline-variant: '#e1bfb5'
  surface-tint: '#ab3500'
  primary: '#ab3500'
  on-primary: '#ffffff'
  primary-container: '#ff6b35'
  on-primary-container: '#5f1900'
  inverse-primary: '#ffb59d'
  secondary: '#635d59'
  on-secondary: '#ffffff'
  secondary-container: '#e7ded9'
  on-secondary-container: '#68615e'
  tertiary: '#5d5f5f'
  on-tertiary: '#ffffff'
  tertiary-container: '#999a9a'
  on-tertiary-container: '#303233'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#ffdbd0'
  primary-fixed-dim: '#ffb59d'
  on-primary-fixed: '#390c00'
  on-primary-fixed-variant: '#832600'
  secondary-fixed: '#eae1dc'
  secondary-fixed-dim: '#cec5c0'
  on-secondary-fixed: '#1f1b18'
  on-secondary-fixed-variant: '#4b4642'
  tertiary-fixed: '#e2e2e2'
  tertiary-fixed-dim: '#c6c6c7'
  on-tertiary-fixed: '#1a1c1c'
  on-tertiary-fixed-variant: '#454747'
  background: '#fcf8ff'
  on-background: '#1a1a2e'
  surface-variant: '#e2e0fc'
typography:
  h1:
    fontFamily: Poppins
    fontSize: 48px
    fontWeight: '700'
    lineHeight: '1.2'
    letterSpacing: -0.02em
  h1-mobile:
    fontFamily: Poppins
    fontSize: 32px
    fontWeight: '700'
    lineHeight: '1.2'
  h2:
    fontFamily: Poppins
    fontSize: 32px
    fontWeight: '700'
    lineHeight: '1.3'
  h3:
    fontFamily: Poppins
    fontSize: 24px
    fontWeight: '600'
    lineHeight: '1.4'
  body-lg:
    fontFamily: Poppins
    fontSize: 18px
    fontWeight: '400'
    lineHeight: '1.6'
  body-md:
    fontFamily: Poppins
    fontSize: 16px
    fontWeight: '400'
    lineHeight: '1.6'
  label-md:
    fontFamily: Poppins
    fontSize: 14px
    fontWeight: '600'
    lineHeight: '1.2'
    letterSpacing: 0.01em
  caption:
    fontFamily: Poppins
    fontSize: 12px
    fontWeight: '400'
    lineHeight: '1.2'
rounded:
  sm: 0.25rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.5rem
  full: 9999px
spacing:
  unit: 8px
  container-max: 1200px
  gutter: 24px
  margin-mobile: 16px
  margin-desktop: 40px
---

## Brand & Style

The design system is anchored in a **Premium Minimalist** aesthetic, specifically tailored to elevate the culinary experience through digital interfaces. The brand personality is appetizing, intelligent, and effortless. It aims to evoke a sense of "culinary luxury" while maintaining the approachability of a daily utility.

The visual narrative relies on high-quality, "hero" food photography set against a warm, sophisticated palette. By combining generous whitespace with soft, organic shapes, the design system ensures that the AI-powered recommendations feel like personal suggestions from a concierge rather than data-driven outputs. The interface should feel "airy" and "breathable," prioritizing content over containers.

## Colors

The palette for the design system is designed to stimulate appetite and convey warmth. 

- **Primary (Coral Orange):** Used for primary actions, progress indicators, and key brand moments. It is the "flavor" of the app.
- **Background (Blush Cream):** The primary canvas. This off-white, warm base reduces eye strain and distinguishes the app from standard "white-label" competitors.
- **Secondary Background (Light Gray):** Reserved for subtle grouping of elements or secondary content areas like sidebars or footers.
- **Typography:** **Dark Charcoal** provides high-contrast legibility for headings, while **Body Blue-Gray** softens the reading experience for descriptions.

## Typography

The design system utilizes **Poppins** exclusively to ensure a clean, geometric, yet friendly personality. 

- **Headings:** Utilize Bold weights with tight letter-spacing to create a strong visual anchor for food titles and restaurant names.
- **Subheads:** Utilize SemiBold weights to create a clear hierarchy between the title and the description.
- **Body:** Utilizes a generous 1.6 line-height to ensure readability, especially when describing ingredients or AI-generated dietary insights.
- **Scaling:** On mobile devices, H1 styles should scale down significantly to prevent awkward word breaks in long dish names.

## Layout & Spacing

The design system follows a **12-column fluid grid** for desktop and a **4-column grid** for mobile. 

- **Rhythm:** An 8px linear scale is used for all spacing. 
- **Generous Whitespace:** Elements should be given room to breathe. Section margins should lean towards the higher end of the scale (40px+) to maintain the premium feel.
- **Alignment:** Content is centered in a max-width container on desktop to prevent eye fatigue on ultra-wide monitors. 
- **Reflow:** On mobile, side-by-side card layouts reflow into a single vertical stack, or a horizontally scrollable carousel if the intent is "discovery."

## Elevation & Depth

The design system uses **Ambient Shadows** to create a sense of layering without the harshness of traditional borders.

- **Soft Depth:** The standard elevation uses a very diffused shadow: `0 4px 20px rgba(0,0,0,0.08)`. This makes cards appear as if they are floating gently above the Blush Cream background.
- **Interactive States:** On hover, the shadow should slightly expand and darken (`0 8px 30px rgba(0,0,0,0.12)`) to provide tactile feedback.
- **Tonal Layering:** For elements like search bars or secondary inputs, the system uses "inset" tonal layering (Primary Background on top of Secondary Background) rather than shadows to keep the interface clean.

## Shapes

The shape language is defined by **High Roundedness**, reflecting the organic nature of food and a friendly user experience.

- **Cards:** Use a consistent 16px radius.
- **Bottom Sheets:** Use a 24px radius on the top corners to feel soft and approachable when swiped up on mobile.
- **Pill Buttons:** Primary and secondary buttons are fully rounded (pill-shaped) to distinguish them from content containers.
- **Selection States:** Checkboxes and radio buttons should retain a slight 4px rounding to match the overall soft language of the design system.

## Components

- **Buttons:** Primary buttons use the Coral Orange background with white text. They are always pill-shaped and have a subtle shadow. 
- **Cards:** White background, 16px radius, and the standard soft shadow. Content inside cards (like food photos) should have a 12px internal radius to create a nested "inner-rounding" effect.
- **Chips:** Used for food categories (e.g., "Vegan," "Gluten-Free"). Use the Secondary Background (Light Gray) with Body Text, switching to Primary Color with White Text when selected.
- **Inputs:** Search bars and text fields should be pill-shaped with a subtle 1px border in Light Gray or a solid Blush Cream fill.
- **AI Recommendation Badge:** A special component featuring a subtle gradient or a "sparkle" icon to denote an AI-powered suggestion, using a soft version of the primary color.
- **Bottom Sheets:** For mobile filters and cart summaries, utilizing a 24px top-corner radius and a darkened backdrop overlay.