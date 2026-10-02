import type {
  SystemFontWeight,
  SystemLineHeight,
  SystemSize,
} from '@pindakaasman/design-system';
import { css } from 'styled-components';

export type TextTone = 'default' | 'muted' | 'error';

export interface TextProps {
  /** Colour. Defaults to `default`, which inherits. */
  $tone?: TextTone;
}

interface TextStyle {
  size: SystemSize;
  weight: SystemFontWeight;
  lineHeight: SystemLineHeight;
}

/** Size, weight and line height from the theme, plus the tone's colour. */
export const textStyles = ({
  size,
  weight,
  lineHeight,
}: TextStyle) => css<TextProps>`
  font-size: ${({ theme }) => theme.fontSize(size)};
  font-weight: ${({ theme }) => theme.fontWeight(weight)};
  line-height: ${({ theme }) => theme.lineHeight(lineHeight)};
  color: ${({ $tone = 'default', theme }) => {
    if ($tone === 'muted') return theme.color('secondary', 'text');
    if ($tone === 'error') return theme.color('error', 'emphasis');
    return 'inherit';
  }};
  /* Long unbroken strings (URLs, JSON) wrap instead of overflowing. */
  overflow-wrap: anywhere;
`;
