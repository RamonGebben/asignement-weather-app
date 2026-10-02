'use client';

import styled from 'styled-components';
import type { TextProps } from './components/textStyles';
import { textStyles } from './components/textStyles';

export type { TextProps, TextTone } from './components/textStyles';

/**
 * All text styling, one export per role. Each renders its natural element;
 * `as` swaps the element while keeping the look (e.g. an `H2` as `h3`), and
 * `$tone` sets the colour.
 */

/** Hero numbers, like the current temperature. */
export const Display = styled.p<TextProps>`
  ${textStyles({ size: 'xl', weight: 'regular', lineHeight: 'tight' })}
  font-size: calc(${({ theme }) => theme.fontSize('xl')} * 2.5);
`;

export const H1 = styled.h1<TextProps>`
  ${textStyles({ size: 'l', weight: 'semibold', lineHeight: 'tight' })}
`;

export const H2 = styled.h2<TextProps>`
  ${textStyles({ size: 'm', weight: 'semibold', lineHeight: 'tight' })}
`;

/** An introductory paragraph, a step up from body text. */
export const Lead = styled.p<TextProps>`
  ${textStyles({ size: 'base', weight: 'regular', lineHeight: 'base' })}
`;

export const P = styled.p<TextProps>`
  ${textStyles({ size: 's', weight: 'regular', lineHeight: 'base' })}
`;

export const Label = styled.label<TextProps>`
  ${textStyles({ size: 's', weight: 'medium', lineHeight: 'base' })}
`;

/** Small supporting text: statuses, hints, metadata. */
export const Caption = styled.p<TextProps>`
  ${textStyles({ size: 'xs', weight: 'regular', lineHeight: 'base' })}
`;
