'use client';

import { COLOR_MODE_META } from '@pindakaasman/design-system';
import styled from 'styled-components';
import { focusRing } from '~/theme/focusRing';

const rootForced = (mode: 'light' | 'dark') =>
  `:root:has(meta[name='${COLOR_MODE_META}'][content='${mode}'])`;

/**
 * Shows whichever of its two icon children matches the color mode - the
 * first while light, the second while dark. Visibility mirrors
 * `theme.colorModeCss()` exactly: light by default, dark when the OS
 * prefers it, either overridden by the saved color-mode meta tag - so
 * there's nothing for a JS guess to go stale or disagree with the server
 * on.
 */
export const ToggleButton = styled.button.attrs({ type: 'button' })`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  width: 40px;
  height: 40px;
  padding: 0;
  color: inherit;
  background: transparent;
  border: none;
  border-radius: ${({ theme }) => theme.borderRadius('full')};
  cursor: pointer;

  svg:last-of-type {
    display: none;
  }

  @media (prefers-color-scheme: dark) {
    :root:not(${rootForced('light')}) & {
      svg:first-of-type {
        display: none;
      }

      svg:last-of-type {
        display: block;
      }
    }
  }

  ${rootForced('dark')} & {
    svg:first-of-type {
      display: none;
    }

    svg:last-of-type {
      display: block;
    }
  }

  ${focusRing}

  @media (hover: hover) and (pointer: fine) {
    &:hover {
      background: ${({ theme }) => theme.color('secondary')};
    }
  }
`;
