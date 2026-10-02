'use client';

import styled from 'styled-components';
import { glass } from '~/theme/glass';
import { Stack } from '../Stack';

/**
 * Fine grain from SVG fractal noise, greyed out. Over the blur it breaks up
 * banding and gives the glass a physical, slightly matte surface.
 *
 * @see https://developer.mozilla.org/en-US/docs/Web/SVG/Element/feTurbulence
 */
const noise = `url("data:image/svg+xml,${encodeURIComponent(
  "<svg xmlns='http://www.w3.org/2000/svg' width='160' height='160'>" +
    "<filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='2' stitchTiles='stitch'/>" +
    "<feColorMatrix type='saturate' values='0'/></filter>" +
    "<rect width='100%' height='100%' filter='url(#n)'/></svg>",
)}")`;

/**
 * A frosted glass surface floating over the weather scene: the theme
 * background as a translucent tint, the sky behind it blurred, a hairline
 * edge and faint grain. Text on it keeps WCAG AA contrast over any sky (see
 * `theme/glass`). Layout props come from `Stack`.
 *
 * Without `backdrop-filter` support, the tint alone still guarantees the
 * contrast. Only the frosting is lost.
 *
 * @see https://developer.mozilla.org/en-US/docs/Web/CSS/color_value/color-mix
 */
export const GlassPanel = styled(Stack)`
  position: relative;
  isolation: isolate;
  min-width: 0;
  padding: ${({ theme }) => theme.spacing('m')};
  border: ${({ theme }) => theme.getTokens().border?.width.s} solid
    color-mix(
      in srgb,
      ${({ theme }) => theme.color('background', 'text')} 14%,
      transparent
    );
  border-radius: ${glass.radius};
  color: ${({ theme }) => theme.color('background', 'text')};
  background-color: color-mix(
    in srgb,
    ${({ theme }) => theme.color('background')} ${glass.tintOpacity * 100}%,
    transparent
  );
  box-shadow: ${({ theme }) => theme.boxShadow('card')};
  backdrop-filter: blur(${glass.blur}) saturate(${glass.saturation});

  &::before {
    content: '';
    position: absolute;
    inset: 0;
    z-index: -1;
    border-radius: inherit;
    background-image: ${noise};
    opacity: ${glass.noiseOpacity};
    pointer-events: none;
  }
`;
