import { css, keyframes } from 'styled-components';

const fadeInKeyframes = keyframes`
  from { opacity: 0; }
`;

/**
 * Fades an element in on mount, for content that replaces a loading state.
 */
export const fadeIn = css`
  animation: ${fadeInKeyframes} 0.3s ease-out;

  @media (prefers-reduced-motion: reduce) {
    animation: none;
  }
`;
