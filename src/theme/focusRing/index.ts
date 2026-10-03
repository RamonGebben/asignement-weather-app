import { css } from 'styled-components';

/** The keyboard focus indicator every interactive element shares. */
export const focusRing = css`
  &:focus-visible {
    outline: ${({ theme }) => theme.borderWidth('base')} solid
      ${({ theme }) => theme.color('tertiary')};
    outline-offset: 2px;
  }
`;
