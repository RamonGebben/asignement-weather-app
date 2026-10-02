/*
 * WCAG colour contrast, for proving that text stays readable on the
 * translucent glass panels whatever the sky behind them does.
 *
 * Contrast ratio compares the relative luminance (perceived brightness, 0 for
 * black to 1 for white) of two colours: (lighter + 0.05) / (darker + 0.05),
 * from 1:1 to 21:1. WCAG level AA asks for at least 4.5:1 for body text.
 *
 * @see https://www.w3.org/TR/WCAG22/#dfn-contrast-ratio
 * @see https://www.w3.org/TR/WCAG22/#dfn-relative-luminance
 * @see https://www.w3.org/WAI/WCAG22/Understanding/contrast-minimum.html
 * @see https://en.wikipedia.org/wiki/Relative_luminance
 */

/** Red, green and blue, each 0-255 as in CSS (gamma-encoded sRGB). */
export type Rgb = readonly [number, number, number];

/** WCAG AA's minimum for body text. */
export const minimumTextContrast = 4.5;

/** `#rrggbb` (as the theme tokens are written) to channels. */
export const parseHex = (hex: string): Rgb => {
  const match = /^#([\da-f]{2})([\da-f]{2})([\da-f]{2})$/i.exec(hex);
  if (!match) throw new Error(`Expected a #rrggbb colour, got "${hex}"`);
  const [, red, green, blue] = match;
  return [parseInt(red!, 16), parseInt(green!, 16), parseInt(blue!, 16)];
};

/**
 * A channel back to linear light. sRGB stores values gamma-encoded, spending
 * more of the 0-255 range on dark tones, where eyes are more sensitive, so
 * brightness has to be decoded before it can be weighed.
 *
 * @see https://en.wikipedia.org/wiki/SRGB#Transfer_function_(%22gamma%22)
 */
const toLinear = (channel: number) => {
  const value = channel / 255;
  return value <= 0.04045 ? value / 12.92 : ((value + 0.055) / 1.055) ** 2.4;
};

/**
 * 0 (black) to 1 (white). Green counts most and blue least, matching how
 * sensitive eyes are to each.
 */
export const relativeLuminance = ([red, green, blue]: Rgb) =>
  0.2126 * toLinear(red) + 0.7152 * toLinear(green) + 0.0722 * toLinear(blue);

/** 1 (identical) to 21 (black on white), the same either way round. */
export const contrastRatio = (first: Rgb, second: Rgb) => {
  const [lighter, darker] = [
    relativeLuminance(first),
    relativeLuminance(second),
  ].sort((a, b) => b - a);
  return (lighter! + 0.05) / (darker! + 0.05);
};

/**
 * `top` drawn over `bottom` at `opacity` (0-1): the "over" operator of alpha
 * compositing. Browsers blend these gamma-encoded values directly, so this
 * matches what's on screen, e.g. a `color-mix(…, transparent)` tint over the
 * sky.
 *
 * @see https://en.wikipedia.org/wiki/Alpha_compositing#Description
 * @see https://en.wikipedia.org/wiki/Alpha_compositing#Gamma_correction
 */
export const composite = (top: Rgb, bottom: Rgb, opacity: number): Rgb => [
  opacity * top[0] + (1 - opacity) * bottom[0],
  opacity * top[1] + (1 - opacity) * bottom[1],
  opacity * top[2] + (1 - opacity) * bottom[2],
];
