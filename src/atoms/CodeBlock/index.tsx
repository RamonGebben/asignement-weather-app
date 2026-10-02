'use client';

import styled from 'styled-components';
import { focusRing } from '~/theme/focusRing';

/**
 * A scrollable block of preformatted code. Focusable, so keyboard users can
 * scroll it horizontally.
 */
export const CodeBlock = styled.pre.attrs({ tabIndex: 0 })`
  margin: 0;
  padding: ${({ theme }) => theme.spacing('base')};
  overflow: auto;
  max-height: 32rem;
  font-family: ${({ theme }) => theme.getTokens().type.fontFamily.mono};
  font-size: ${({ theme }) => theme.fontSize('xs')};
  line-height: ${({ theme }) => theme.getTokens().type.lineHeight.base};
  color: ${({ theme }) => theme.color('formBackground', 'text')};
  background: ${({ theme }) => theme.color('formBackground')};
  border-radius: ${({ theme }) => theme.getTokens().border?.radius.base};

  /* The UA stylesheet gives a nested <code> its own monospace font. */
  & > code {
    font: inherit;
  }

  ${focusRing}
`;
