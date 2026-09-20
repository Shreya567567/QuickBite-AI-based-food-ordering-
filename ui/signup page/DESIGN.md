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

The sign up page maintains the core **Premium Minimalist** aesthetic, mirroring the design language of the login page. The page utilizes a split-screen container, where the left column showcases appetizing, high-resolution food photography (e.g., a fresh, vibrant healthy salad to symbolize wellness and choice) with custom branding statements, while the right column houses the interactive card containing the registration form.

## Sign Up Page Features

- **Split Screen Layout:** Retains the 50/50 desktop layout. The left column displays:
  - Header: "Start Your Culinary Journey Today."
  - Description: "Create an account to unlock personalized AI-driven menus and real-time smart logistics."
  - Icons and bullet points highlight personalization, tracking, and rewards.
- **Brand Identity:** The right column keeps the centered logo/branding icon, app name ("QuickBite"), and registration-focused welcome message: "Create your account to get started!"
- **Interactive Switch Tab:** Features a toggle pill-container, setting the active selection to "Sign Up" and the inactive selection to "Login", matching the custom transitions.
- **Form Inputs:**
  - **Full Name:** Text field with a `person` icon prefix.
  - **Email Address:** Text field with a `mail` icon prefix.
  - **Password:** Password field with a `lock` icon prefix and an toggleable eye icon suffix for visibility control.
  - **Confirm Password:** Symmetrical confirmation password field with a `lock` icon prefix and eye toggle.
- **Social Onboarding:** Symmetrical custom buttons for OAuth onboarding via Google and Apple.
