'use client';

import styled, { css } from 'styled-components';
import { focusRing } from '~/theme/focusRing';

type ButtonVariant = 'primary' | 'secondary';

/** A real `<button>`; `type` defaults to `button`, so it never submits by accident. */
export const Button = styled.button.attrs(({ type = 'button' }) => ({ type }))<{
  $variant: ButtonVariant;
}>`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: ${({ theme }) => theme.spacing('xs')};
  width: fit-content;
  height: 40px;
  padding: 0 ${({ theme }) => theme.spacing('base')};
  border-radius: ${({ theme }) => theme.getTokens().border?.radius.full};
  border: ${({ theme }) => theme.getTokens().border?.width.s} solid transparent;
  font-size: ${({ theme }) => theme.fontSize('xs')};
  font-weight: ${({ theme }) => theme.fontWeight('medium')};
  font-family: inherit;
  color: inherit;
  background: transparent;
  transition: 0.2s;
  cursor: pointer;

  ${focusRing}

  &:disabled {
    cursor: not-allowed;
    opacity: 0.6;
  }

  ${({ $variant, theme }) =>
    $variant === 'primary'
      ? css`
          background: ${theme.color('primary')};
          color: ${theme.color('primary', 'text')};
        `
      : css`
          border-color: ${theme.color('secondary')};
        `}

  /* Enable hover only on non-touch devices */
  @media (hover: hover) and (pointer: fine) {
    &:hover {
      background: ${({ $variant, theme }) => theme.color($variant, 'emphasis')};
      border-color: transparent;
    }
  }
`;
