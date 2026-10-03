/**
 * The glass panels' recipe: the theme background as a translucent tint,
 * frosted with a blur, plus a faint film of noise. The numbers are tied to
 * contrast. `index.test.ts` proves that every text tone stays at WCAG AA
 * (4.5:1) on the tint, in both colour modes, even with pure black or pure
 * white behind it and the noise at its darkest or lightest. Change them
 * together.
 *
 * @see https://developer.mozilla.org/en-US/docs/Web/CSS/backdrop-filter
 * @see https://en.wikipedia.org/wiki/Glassmorphism
 */
export const glass = {
  /** How much of the theme background covers the sky, 0-1. */
  tintOpacity: 0.72,
  /** How strongly the grain shows, 0-1. Kept faint: texture, not pattern. */
  noiseOpacity: 0.04,
  /** Frosts the sky behind the panel into soft colour. */
  blur: '20px',
  /** Brings back the colour that blurring and tinting wash out. */
  saturation: 1.4,
  /**
   * Softer than the theme's 8px card corners, which suits large floating
   * panels. The design system's radius scale has no larger step.
   */
  radius: '16px',
} as const;
