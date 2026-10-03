'use client';

import styled, { keyframes } from 'styled-components';

export interface SkeletonProps {
  /** Defaults to filling its container. */
  $width?: string;
  /** Defaults to one line of text. */
  $height?: string;
}

const shimmer = keyframes`
  0% { background-position: 200% 0; }
  100% { background-position: -200% 0; }
`;

/**
 * A placeholder block for content that hasn't loaded yet. Decorative
 * only: pair it with a `role="status"` announcement for screen readers.
 */
export const Skeleton = styled.div<SkeletonProps>`
  width: ${({ $width = '100%' }) => $width};
  height: ${({ $height = '1em' }) => $height};
  border-radius: ${({ theme }) => theme.getTokens().border?.radius.s};
  background: linear-gradient(
    90deg,
    color-mix(in srgb, currentcolor 12%, transparent) 25%,
    color-mix(in srgb, currentcolor 20%, transparent) 50%,
    color-mix(in srgb, currentcolor 12%, transparent) 75%
  );
  background-size: 200% 100%;
  animation: ${shimmer} 1.6s ease-in-out infinite;

  @media (prefers-reduced-motion: reduce) {
    animation: none;
  }
`;
