import { describe, expect, it } from 'vitest';
import {
  composite,
  contrastRatio,
  minimumTextContrast,
  parseHex,
  type Rgb,
} from '~/utils/contrast';
import theme from '..';
import { glass } from '.';

const black: Rgb = [0, 0, 0];
const white: Rgb = [255, 255, 255];
const extremes = [black, white];

const modes = ['light', 'dark'] as const;

/** Every tone `Typography` can put on a panel. */
const tones = {
  default: ['background', 'text'],
  muted: ['secondary', 'text'],
  error: ['error', 'emphasis'],
} as const;

/**
 * The lowest contrast a text colour can get on the glass: any sky (black and
 * white are the extremes; blur and saturation only move colours between
 * them), under the tint, under the noise at its darkest or lightest.
 */
const worstContrast = (text: Rgb, tint: Rgb) =>
  Math.min(
    ...extremes.flatMap(sky =>
      extremes.map(grain =>
        contrastRatio(
          text,
          composite(
            grain,
            composite(tint, sky, glass.tintOpacity),
            glass.noiseOpacity,
          ),
        ),
      ),
    ),
  );

describe('glass', () => {
  describe.each(modes)('in %s mode', mode => {
    const tint = parseHex(theme.rawColor('background', 'base', mode));

    it.each(Object.entries(tones))(
      'keeps %s text readable over any sky',
      (_, [hue, variant]) => {
        const text = parseHex(theme.rawColor(hue, variant, mode));
        expect(worstContrast(text, tint)).toBeGreaterThanOrEqual(
          minimumTextContrast,
        );
      },
    );
  });

  it('stays translucent enough to read as glass', () => {
    expect(glass.tintOpacity).toBeLessThanOrEqual(0.8);
  });
});
