'use client';

import type { ComponentPropsWithRef, ReactNode } from 'react';
import styled, { css } from 'styled-components';
import type { IconName } from '~/atoms/Icon';
import { Icon } from '~/atoms/Icon';
import { VisuallyHidden } from '~/atoms/VisuallyHidden';
import { focusRing } from '~/theme/focusRing';

// quaternary/error double as a status color, e.g. the locate button turning
// positive/negative with the outcome - there's no dedicated success token.
type ButtonVariant = 'primary' | 'secondary' | 'quaternary' | 'error';

const StyledButton = styled.button.attrs(({ type = 'button' }) => ({ type }))<{
  $variant: ButtonVariant;
  $iconOnly: boolean;
}>`
  display: flex;
  flex-shrink: 0;
  justify-content: center;
  align-items: center;
  gap: ${({ theme }) => theme.spacing('xs')};
  width: ${({ $iconOnly }) => ($iconOnly ? '40px' : 'fit-content')};
  height: 40px;
  padding: ${({ $iconOnly, theme }) =>
    $iconOnly ? '0' : `0 ${theme.spacing('base')}`};
  border-radius: ${({ theme }) => theme.borderRadius('full')};
  border: ${({ theme }) => theme.borderWidth('s')} solid transparent;
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

  ${({ $variant, theme }) => css`
    background: ${theme.color($variant)};
    color: ${theme.color($variant, 'text')};
  `}

  /* Enable hover only on non-touch devices */
  @media (hover: hover) and (pointer: fine) {
    &:hover {
      background: ${({ $variant, theme }) => theme.color($variant, 'emphasis')};
      border-color: transparent;
    }
  }
`;

export interface ButtonProps extends Omit<
  ComponentPropsWithRef<'button'>,
  'children'
> {
  $variant: ButtonVariant;
  /** Shown before the label, looked up via `Icon`. */
  icon?: IconName;
  /**
   * Custom markup instead of `icon`, for anything fancier - e.g. a pair of
   * icons a parent styles to swap between with CSS. Takes priority over
   * `icon` if both are somehow given.
   */
  iconSlot?: ReactNode;
  /** Hides the label visually - it still names the button for screen readers. */
  $iconOnly?: boolean;
  /** The label. Always required, even icon-only - it's the accessible name. */
  children: ReactNode;
}

/** A real `<button>`; `type` defaults to `button`, so it never submits by accident. */
export const Button = ({
  $variant,
  icon,
  iconSlot,
  $iconOnly = false,
  children,
  ...props
}: ButtonProps) => (
  <StyledButton $variant={$variant} $iconOnly={$iconOnly} {...props}>
    {iconSlot ?? (icon && <Icon name={icon} />)}
    {$iconOnly ? <VisuallyHidden>{children}</VisuallyHidden> : children}
  </StyledButton>
);
