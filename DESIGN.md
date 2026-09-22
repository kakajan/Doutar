---
name: Doutar (Miras Sahrasy)
description: Authentic Turkmen musical heritage meets modern cinematic electronic experience
colors:
  primary: "#d4af37"
  primary-deep: "#b4941f"
  surface-light: "#f9f7f2"
  surface-sand: "#ebe5ce"
  surface-card: "rgba(255, 255, 255, 0.85)"
  surface-dark: "#121212"
  surface-charcoal: "#1a1a1a"
  text-primary: "#1a1a1a"
  text-secondary: "#4b5563"
  text-on-dark: "#ffffff"
  text-on-dark-muted: "#a3a3a3"
  border-subtle: "rgba(0, 0, 0, 0.05)"
  overlay-dark: "rgba(0, 0, 0, 0.8)"
  viz-bar: "rgba(212, 175, 55, 0.3)"
typography:
  display:
    fontFamily: "Cinzel, Vazirmatn, Tahoma, sans-serif"
    fontSize: "clamp(2rem, 6vw, 4.5rem)"
    fontWeight: 900
    lineHeight: 1.1
    letterSpacing: "0.02em"
  headline:
    fontFamily: "Vazirmatn, Tahoma, sans-serif"
    fontSize: "clamp(1.5rem, 3vw, 2.5rem)"
    fontWeight: 700
    lineHeight: 1.3
  body:
    fontFamily: "Vazirmatn, Tahoma, sans-serif"
    fontSize: "1rem"
    fontWeight: 400
    lineHeight: 1.7
  label:
    fontFamily: "Vazirmatn, Tahoma, sans-serif"
    fontSize: "0.75rem"
    fontWeight: 600
    lineHeight: 1.4
    letterSpacing: "0.05em"
rounded:
  xs: "4px"
  sm: "8px"
  md: "16px"
  lg: "24px"
  pill: "999px"
  full: "9999px"
spacing:
  xs: "4px"
  sm: "8px"
  md: "16px"
  lg: "24px"
  xl: "32px"
  "2xl": "48px"
  "3xl": "64px"
components:
  button-primary:
    backgroundColor: "{colors.surface-charcoal}"
    textColor: "{colors.text-on-dark}"
    rounded: "{rounded.full}"
    padding: "16px 36px"
  button-primary-hover:
    backgroundColor: "{colors.primary}"
    textColor: "{colors.surface-charcoal}"
  button-secondary:
    backgroundColor: "rgba(255, 255, 255, 0.8)"
    textColor: "{colors.text-primary}"
    rounded: "{rounded.full}"
    padding: "14px 28px"
---

# Design System: Doutar (Miras Sahrasy)

## Overview

The Doutar design system bridges 18th-century Turkmen poetic tradition with forward-thinking web craft. The aesthetic is tactile, atmospheric, and respectful — evoking the warm sands of the Karakum desert, the resonant mulberry wood and silk strings of the Doutar, and the celestial clarity of nighttime nomad poetry.

**Creative North Star:** *The Desert Atelier (کارگاه صحرا)* — an uncompromisingly crafted audio pavilion where ancient instruments and electronic synthesis co-exist without decorative digital clutter.

## Colors

- **Primary Gold (`#d4af37`)**: Reflects polished brass tuning pegs and silk embroidery; used for interactive focus, playback indicators, and purposeful highlights.
- **Deep Gold (`#b4941f`)**: Deeper tonal step for hover and high-contrast accents.
- **Desert Sand Light (`#f9f7f2`)**: The foundational daylight parchment tone, avoiding sterile hospital-white without falling into synthetic yellow-beige.
- **Charcoal Black (`#121212` / `#1a1a1a`)**: Mulberry wood in shadow; grounds audio controls, tactile player surfaces, and footer contrast.
- **Text Tones**: Main body text uses `#1a1a1a` (contrast ratio 15.2:1 against sand). Secondary and helper text uses `#4b5563` (contrast ratio ≥ 5.1:1, strictly exceeding WCAG AA).

## Typography

- **Display & Titles (`Cinzel` + `Vazirmatn Bold/Black`)**: Classical, proud, and authoritative. English titles employ the sculpted serif curves of `Cinzel`, while Persian titles leverage the balanced humanist geometry of `Vazirmatn`.
- **Reading Measure**: Line lengths are capped between 60ch and 75ch for effortless scanning across both Persian RTL prose and Turkmen poetry.
- **Hierarchy Distinction**: Headings achieve prominence strictly through typographic scale and weight — **never through decorative gradient text**.

## Layout

- **Flow & Rhythm**: RTL-first layout with natural Persian eye-tracking.
- **Generous Proximity**: Related items (album titles, track meta) sit intimately together; sections breathe with generous padding (`py-24` to `py-32`). Headings always carry more whitespace above than below.
- **Responsive Touch Targets**: All interactive elements maintain a minimum bounding box of 44×44px for reliable mobile handling.

## Elevation & Depth

- **Tonal Layering over Fake Shadows**: Surfaces achieve depth through subtle translucent boundaries (`border: 1px solid rgba(255, 255, 255, 0.6)`) and light ambient diffusion rather than harsh offset drop-shadows.
- **Zero Halo Clutter**: No arbitrary zero-offset neon glow orbs or colored halos.

## Shapes

- **Contoured Curves**: Fluid capsules (`rounded-full`) for persistent player controls, tabs, and action buttons.
- **Card Radii**: Consistent `rounded-2xl` (16px) and `rounded-3xl` (24px) that preserve generous internal padding without pinching inner content.

## Components

- **Sticky & Fullscreen Player**: Tactile, persistent audio deck with GPU-accelerated progress and volume scrubbers.
- **Track Cards**: High-density scanning with numbered index, audio title, subtitle, duration, and direct download/share actions.
- **Equalizer**: Smooth, non-elastic equalizer wave reacting to sound state.

## Do's and Don'ts

### Do:
- Use solid, confident colors for headings and buttons.
- Ensure all text passes WCAG AA contrast (≥ 4.5:1).
- Accelerate visualizer and audio transitions using `transform: scaleY()` rather than animating layout properties.
- Decelerate motion smoothly using exponential easing curves (`cubic-bezier(0.16, 1, 0.3, 1)`).
- Preserve user state and seamless audio streaming across routes.

### Don't:
- **Don't use gradient text** as an AI shortcut for visual interest.
- **Don't place floating kickers / eyebrows** above major headlines.
- **Don't animate images on hover** (no zoom/tilt on album covers).
- **Don't use elastic/bouncing easings** that make interfaces feel juvenile.
- **Don't clutter interfaces with faux status dots** or decorative dot-matrix grids.
