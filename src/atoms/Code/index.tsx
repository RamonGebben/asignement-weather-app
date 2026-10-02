'use client';

import styled from 'styled-components';

export const Code = styled.code`
  font-family: ${({ theme }) => theme.getTokens().type.fontFamily.mono};
  font-size: 0.9em;
  background: color-mix(in srgb, currentColor 8%, transparent);
  padding: 0.1em 0.4em;
  border-radius: ${({ theme }) => theme.getTokens().border?.radius.s};
`;
