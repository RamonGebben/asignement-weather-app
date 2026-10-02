'use client';

import { Code } from '~/atoms/Code';
import { Caption, H2 } from '~/atoms/Typography';

export interface HeaderProps {
  /** Id of the heading, for the panel's `aria-labelledby`. */
  id: string;
  title: string;
  procedure: string;
  input?: unknown;
}

export const Header = ({ id, title, procedure, input }: HeaderProps) => (
  <header>
    <H2 id={id}>{title}</H2>
    <Caption $tone="muted">
      <Code>{procedure}</Code>
      {input === undefined ? ' not called' : ' with '}
      {input === undefined ? null : <Code>{JSON.stringify(input)}</Code>}
    </Caption>
  </header>
);
