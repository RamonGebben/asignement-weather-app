'use client';

import { COLOR_MODE_META } from '@pindakaasman/design-system';
import styled from 'styled-components';

const rootForced = (mode: 'light' | 'dark') =>
  `:root:has(meta[name='${COLOR_MODE_META}'][content='${mode}'])`;

/**
 * Wraps a secondary icon-only `Button` to show whichever of its two icons
 * matches the color mode. `display: contents` keeps it out of layout, so
 * `Button` behaves as ColorModeToggle's direct child.
 */
export const ToggleButton = styled.span`
  display: contents;

  button svg:last-of-type {
    display: none;
  }

  @media (prefers-color-scheme: dark) {
    :root:not(${rootForced('light')}) & {
      button svg:first-of-type {
        display: none;
      }

      button svg:last-of-type {
        display: block;
      }
    }
  }

  ${rootForced('dark')} & {
    button svg:first-of-type {
      display: none;
    }

    button svg:last-of-type {
      display: block;
    }
  }
`;
