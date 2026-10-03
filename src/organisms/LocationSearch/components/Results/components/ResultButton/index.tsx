'use client';

import styled from 'styled-components';
import { focusRing } from '~/theme/focusRing';

/**
 * `role="option"` and `tabIndex={-1}` make this a listbox option, not a
 * tab stop: real focus stays on the search input, moved here only
 * virtually via `aria-activedescendant` (see `LocationSearch`). `$active`
 * mirrors that virtual focus visually, since `:focus-visible` never fires.
 */
export const ResultButton = styled.button.attrs({
  type: 'button',
  role: 'option',
  tabIndex: -1,
})<{ $active?: boolean }>`
  width: 100%;
  padding: ${({ theme }) => theme.spacing('xs')}
    ${({ theme }) => theme.spacing('s')};
  font: inherit;
  font-size: ${({ theme }) => theme.fontSize('s')};
  text-align: left;
  color: inherit;
  background: ${({ $active, theme }) =>
    $active ? theme.color('secondary') : 'transparent'};
  border: ${({ theme }) => theme.borderWidth('s')} solid
    ${({ theme }) => theme.color('secondary')};
  border-radius: ${({ theme }) => theme.borderRadius('base')};
  cursor: pointer;

  @media (hover: hover) and (pointer: fine) {
    &:hover {
      background: ${({ theme }) => theme.color('secondary')};
    }
  }

  ${focusRing}
`;
