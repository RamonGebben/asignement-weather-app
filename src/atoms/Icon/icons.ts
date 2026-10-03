import { LocateFixed, Moon, Sun } from 'lucide-react';

/** The subset of lucide icons available through `Icon`, keyed by name. */
export const icons = {
  locate: LocateFixed,
  moon: Moon,
  sun: Sun,
} as const;

export type IconName = keyof typeof icons;
