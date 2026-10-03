'use client';

import type {
  BaseColor,
  BaseColorVariant,
  SystemSize,
} from '@pindakaasman/design-system';
import { Icon } from '~/atoms/Icon';
import type { WeatherCondition } from '~/weather/model';
import { conditionIcons } from './conditionIcons';

export interface ConditionIconProps {
  condition: WeatherCondition;
  /** Size from the type scale. Defaults to `'base'`. */
  size?: SystemSize;
  /** `[hue, variant]` from the palette. Defaults to `currentColor`. */
  color?: [BaseColor, BaseColorVariant?];
}

export const ConditionIcon = ({
  condition,
  size,
  color,
}: ConditionIconProps) => (
  <Icon name={conditionIcons[condition]} size={size} color={color} />
);
