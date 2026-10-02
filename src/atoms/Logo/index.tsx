'use client';

import styled from 'styled-components';

// Drawn as a mask in currentColor, so the logo follows the color mode
// through whatever color its parent sets.
export const Logo = styled.span.attrs({ role: 'img' })<{
  $src: string;
  $width: number;
  $height: number;
}>`
  display: inline-block;
  flex-shrink: 0;
  width: ${({ $width }) => $width}px;
  height: ${({ $height }) => $height}px;
  background-color: currentColor;
  mask: url(${({ $src }) => $src}) center / contain no-repeat;
`;
