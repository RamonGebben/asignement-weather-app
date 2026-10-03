'use client';

import type {
  BaseColor,
  BaseColorVariant,
  SystemSize,
} from '@pindakaasman/design-system';
import styled from 'styled-components';
import { icons, type IconName } from './icons';

export type { IconName } from './icons';

export interface IconProps {
  /** Which icon to render - see `icons` for the available names. */
  name: IconName;
  /** Size from the type scale. Defaults to `'base'`. */
  size?: SystemSize;
  /** `[hue, variant]` from the palette. Defaults to `currentColor`. */
  color?: [BaseColor, BaseColorVariant?];
}

const StyledIcon = styled.svg<{
  $size: SystemSize;
  $color: IconProps['color'];
}>`
  width: ${({ theme, $size }) => theme.fontSize($size)};
  height: ${({ theme, $size }) => theme.fontSize($size)};
  color: ${({ theme, $color }) =>
    $color ? theme.color(...$color) : 'currentColor'};
`;

export const Icon = ({ name, size = 'base', color }: IconProps) => (
  <StyledIcon as={icons[name]} $size={size} $color={color} aria-hidden />
);
